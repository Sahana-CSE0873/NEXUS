from pydantic import BaseModel

class AdminRegister(BaseModel):
    admin_name: str
    mobile_number: str
    password: str
    gender: str