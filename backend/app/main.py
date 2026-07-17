from fastapi import FastAPI

app = FastAPI(
    title="Enterprise AI Knowledge Platform API",
    description="Backend API for the Enterprise AI Knowledge Platform",
    version="0.1.0",
)


@app.get("/")
def root():
    return {
        "message": "Welcome to the Enterprise AI Knowledge Platform API"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "version": "0.1.0"
    }