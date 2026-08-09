from pydantic import BaseModel

class OTPVerify(BaseModel):
    patient_id: str
    otp: str