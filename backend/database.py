# database.py
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
MONGODB_DB = os.getenv("MONGODB_DB", "MedTrack")

# Global connection cache
client = None
db = None

async def connect_db():
    global client, db
    if client is None:
        try:
            client = AsyncIOMotorClient(
                MONGODB_URI,
                maxPoolSize=5,
                minPoolSize=1,
                serverSelectionTimeoutMS=30000
            )
            db = client[MONGODB_DB]
            print("✅ MongoDB Connected")
        except Exception as e:
            print("❌ MongoDB Connection Error:", e)
            raise e
    return db

async def get_db():
    if db is None:
        await connect_db()
    return db
