# Temporary in-memory database for testing
class MemoryDB:
    users = []
    
    @classmethod
    async def insert_user(cls, user_data):
        user_data["_id"] = str(len(cls.users) + 1)
        cls.users.append(user_data)
        return {"inserted_id": user_data["_id"]}
    
    @classmethod
    async def find_user(cls, query):
        for user in cls.users:
            if user.get("email") == query.get("email"):
                return user
        return None