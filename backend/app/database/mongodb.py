from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "lawmate_db")

class MongoDB:
    client: AsyncIOMotorClient = None
    db = None

    @classmethod
    async def connect(cls):
        try:
            cls.client = AsyncIOMotorClient(MONGO_URI)
            cls.db = cls.client[DB_NAME]
            await cls.client.admin.command('ping')
            print("✅ Connected to MongoDB successfully!")
        except Exception as e:
            print(f"❌ MongoDB connection failed: {e}")
            print("⚠️ Make sure MongoDB is running!")

    @classmethod
    async def close(cls):
        if cls.client:
            cls.client.close()
            print("✅ MongoDB connection closed")

    @classmethod
    def get_collection(cls, name):
        return cls.db[name]
    
    @classmethod
    async def find_user(cls, query):
        """Find a user by email"""
        collection = cls.get_collection("users")
        return await collection.find_one(query)
    
    @classmethod
    async def insert_user(cls, user_data):
        """Insert a new user"""
        collection = cls.get_collection("users")
        result = await collection.insert_one(user_data)
        return {"inserted_id": str(result.inserted_id)}