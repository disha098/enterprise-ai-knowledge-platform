from fastapi import FastAPI

app = FastAPI(
    title="Enterprise AI Knowledge Platform API",
    version="0.1.0",
)


@app.get("/")
def root():
    return {"message": "Welcome to the Enterprise AI Knowledge Platform API"}