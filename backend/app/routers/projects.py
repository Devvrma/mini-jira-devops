from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.project import ProjectCreate, ProjectResponse
from app.services import project_service

router = APIRouter(prefix="/projects", tags=["Projects"])

@router.get("/", response_model=List[ProjectResponse])
def read_projects(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return project_service.get_projects_by_user(db, user_id=current_user.id)

@router.post("/", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
def create_new_project(project: ProjectCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return project_service.create_project(db, project=project, user_id=current_user.id)
