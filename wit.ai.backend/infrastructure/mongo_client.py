import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


connection_string = os.getenv("MONGO_CONNECTION_STRING")

def save_message(chat_id, message, type):
    client = MongoClient(connection_string, server_api=ServerApi('1'))
    try:
        db = client['email-assistant']
        chat = db[chat_id]
        chat.insert_one({
          "text": message,
          "type": type
        })
    except Exception as e:
        print(e)
  
def get_messages(chat_id: str) -> list[dict]:
    client = MongoClient(connection_string, server_api=ServerApi('1'))
    try:        
        db = client['email-assistant']
        chat = db[chat_id]
        
        messages = chat.find()
        
        return messages
    except Exception as e:
        print(e)
        
    return []