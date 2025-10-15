from fastapi import APIRouter, Depends
from app.services.youtube_transcript_service import getAnswer,uploadTranscript
from app.schemas.transcript_schema import QuestionResponse,TranscriptUploadResponse,AskQuestion,TranscriptUpload

router = APIRouter()

@router.get('/')
def read_root():
    return "Server Is running"

@router.post('/ask-question',response_model=QuestionResponse)
async def askQuestion(question:AskQuestion):
   return await getAnswer(question=question.question)

@router.post('/upload',response_model=TranscriptUploadResponse)
def submitTranscript(videoId:TranscriptUpload):
    return  uploadTranscript(videoId=videoId.videoId)
    