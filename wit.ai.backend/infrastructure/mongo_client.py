import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


connection_string = os.getenv("MONGO_CONNECTION_STRING")

def save_message(chat_id, message, type):
    try:
        db = get_db()
        chat = db[chat_id]
        chat.insert_one({
          "text": message,
          "type": type
        })
    except Exception as e:
        print(e)
  
def get_messages(chat_id: str) -> list[dict]:
    try:        
        db = get_db()
        chat = db[chat_id]
        
        messages = chat.find()
        
        return messages
    except Exception as e:
        print(e)
    return []
  
def count_messages(chat_id: str) -> int:
    try:
        db = get_db()
        chat = db[chat_id]
        
        return chat.count_documents({})
    except Exception as e:
        print(e)
    return 0
  
def get_db():
    client = MongoClient(connection_string, server_api=ServerApi('1'))
    return client['email-assistant']