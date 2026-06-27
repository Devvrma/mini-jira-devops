# setup_devops_stage1.py
import os

files_content = {
    # 1. Docker Compose Configuration at Root
    "docker/docker-compose.yml": """version: '3.8'

services:
  db:
    image: postgres:15-alpine
    container_name: jira_postgres
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: minijira
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ../database/init.sql:/docker-entrypoint-initdb.d/init.sql

  backend:
    build:
      context: ../backend
      dockerfile: Dockerfile
    container_name: jira_backend
    restart: always
    ports:
      - "8000:8000"
    environment:
      - POSTGRES_SERVER=db
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=minijira
    depends_on:
      - db

  frontend:
    build:
      context: ../frontend
      dockerfile: Dockerfile
    container_name: jira_frontend
    restart: always
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  postgres_data:
""",

    # 2. Database Initialization Script
    "database/init.sql": """-- Create tables if they don't exist (Backup for safety)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'TODO',
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE
);
"""
}

for path, content in files_content.items():
    dir_name = os.path.dirname(path)
    if dir_name and not os.path.exists(dir_name):
        os.makedirs(dir_name)
    
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

print("💥 Boom! Docker-Compose aur Database Init files ready hain!")
print("Ab tum 'docker' folder me jaakar single command se sab start kar sakte ho.")