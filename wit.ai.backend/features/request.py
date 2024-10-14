from pydantic import BaseModel


class GetAnswerRequest(BaseModel):
    content: str
    chat_id: str

class GetChatRequest(BaseModel):
    chat_id: str