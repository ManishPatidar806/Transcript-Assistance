import os
from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough, RunnableLambda, RunnableParallel
from langchain.prompts import PromptTemplate
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_chroma import Chroma
from app.schemas.transcript_schema import QuestionResponse,TranscriptUploadResponse
from app.core.config import settings
videoId = "dZqa_9H803w"

embedding_model = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-001",google_api_key=settings.GOOGLE_API_KEY)

persist_directory = "chroma_db"
store = Chroma(
    collection_name="vectorembeddingstore",
    embedding_function=embedding_model,
    persist_directory=persist_directory
)


def uploadTranscript(videoId: str):
    try:
        api = YouTubeTranscriptApi()
        transcriptList = api.fetch(video_id=videoId, languages=['en'])
        transcript = " ".join(chunk.text for chunk in transcriptList.snippets)
    except TranscriptsDisabled:
        return TranscriptUploadResponse(message="NO CONTENT FOUND OR NO TRANSCRIPT FOUND",status=404,success=False)
    except Exception:
        return TranscriptUploadResponse(message="Video is Not Available",status=404,success=False)    
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = splitter.create_documents([transcript])
    store.add_documents(chunks)
    return TranscriptUploadResponse(message="Transcript Uploaded Successfully",status=201,success=True)
   


def formatDocs(retrieved_docs):
    return "\n\n".join(doc.page_content for doc in retrieved_docs)


async def getAnswer(question: str):
    try:
        retrieved_docs = RunnableLambda(lambda q: store.similarity_search(q, k=4))
        model = ChatGoogleGenerativeAI(model='gemini-2.5-flash',google_api_key=settings.GOOGLE_API_KEY)

        prompt = PromptTemplate(
            template="""
            You are a helpful assistant.
            Answer ONLY from the provided transcript context.
            If the context is insufficient, just say you I do not have knowledge about this.

            {context}
            Question:{question}
            """,
            input_variables=["context", "question"]
        )
        parser = StrOutputParser()
        parallelChain = RunnableParallel(
            {
                "question": RunnablePassthrough(),
                "context": retrieved_docs | RunnableLambda(formatDocs)
            }
        )

        chain = parallelChain | prompt | model | parser
        result = chain.invoke(question)
        return QuestionResponse(message="Response Generated Successfully",status=200,success=True,data=result)
    except Exception:
        return QuestionResponse(message="There is problem in server. Try again Later!",status=500,success=False)