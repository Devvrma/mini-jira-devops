from pydantic import BaseModel
from typing import Optional
from enum import Enum

class TaskStatus(str, Enum):
    TODO = "TODO"
    IN_PROGRESS = "IN_PROGRESS"
    DONE = "DONE"

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: TaskStatus = TaskStatus.TODO

class TaskCreate(TaskBase):
    pass

class TaskResponse(TaskBase):
    id: int
    project_id: int

    class Config:
        from_attributes = True
