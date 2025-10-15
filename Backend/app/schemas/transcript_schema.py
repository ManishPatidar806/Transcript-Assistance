from pydantic import BaseModel

class TranscriptUpload(BaseModel):
    videoId:str

class AskQuestion(BaseModel):
    question:str

class TranscriptUploadResponse(BaseModel):
    message:str
    status:int
    success:bool
class QuestionResponse(BaseModel):
    message:str
    status:int
    success:bool
    data:str = ""