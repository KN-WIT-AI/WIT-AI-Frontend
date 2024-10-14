from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from features.get_answer import router as get_answer_router


app = FastAPI()
app.include_router(get_answer_router)

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def main():
    uvicorn.run(app, port=8080, host='127.0.0.1')

if __name__ == '__main__':
    main()