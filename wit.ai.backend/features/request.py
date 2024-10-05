from pydantic import BaseModel


class GetAnswerRequest(BaseModel):
    content: str