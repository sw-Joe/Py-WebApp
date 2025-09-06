import datetime

from pydantic import BaseModel



class Question(BaseModel):
    id: int
    subject: str    # str | None = None
    content: str
    create_date: datetime.datetime 