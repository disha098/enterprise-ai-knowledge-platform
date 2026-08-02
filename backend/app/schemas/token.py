from pydantic import BaseModel


class UserInfo(BaseModel):
    id: int
    full_name: str
    email: str


class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str


class LoginResponse(Token):
    user: UserInfo


class TokenPayload(BaseModel):
    sub: str | None = None