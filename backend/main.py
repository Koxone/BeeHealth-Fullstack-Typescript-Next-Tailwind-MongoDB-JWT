# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import connect_db

app = FastAPI(title="MedTrack Backend", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await connect_db()

@app.get("/")
async def root():
    return {"message": "Backend Python conectado correctamente ✅"}
