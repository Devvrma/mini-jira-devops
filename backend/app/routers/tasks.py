from app.models.user import User 
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session  # type: ignore
from typing import List
from app.core.database import get_db
from app.dependencies.auth import get_current_user
from app.schemas.task import TaskCreate, TaskResponse, TaskStatus
from app.services import task_service

router = APIRouter(prefix="/tasks", tags=["Tasks"])

@router.get("/project/{project_id}", response_model=List[TaskResponse])
def read_tasks(project_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return task_service.get_tasks_by_project(db, project_id=project_id)

@router.post("/project/{project_id}", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_new_task(project_id: int, task: TaskCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return task_service.create_task(db, task=task, project_id=project_id)

@router.put("/{task_id}/status", response_model=TaskResponse)
def update_status(task_id: int, status: TaskStatus, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    updated_task = task_service.update_task_status(db, task_id=task_id, status=status)
    if not updated_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated_task
