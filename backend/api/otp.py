from fastapi import APIRouter
from schemas.otp import OTPVerify
from services.otp_service import verify_otp

router = APIRouter(
    prefix="/otp",
    tags=["OTP Verification"]
)

@router.post("/verify")
def otp_verify(data: OTPVerify):

    if verify_otp(data.patient_id, data.otp):
        return {
            "message": "OTP Verified Successfully",
            "patient_id": data.patient_id
        }

    return {
        "message": "Invalid OTP"
    }