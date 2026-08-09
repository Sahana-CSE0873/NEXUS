from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.patient import router as patient_router
from api.otp import router as otp_router
from api.doctor import router as doctor_router
from api.receptionist import router as receptionist_router
from api.admin import router as admin_router
from api.department import router as department_router
from api.appointment import router as appointment_router
from api.queue import router as queue_router
from api.queue_tracker import router as queue_tracker_router
from api.login import router as login_router
from api.doctor_dashboard import router as doctor_dashboard_router
from api.prescription import router as prescription_router
from api.admin_dashboard import router as admin_dashboard_router
from api.consultation import router as consultation_router
from api.medical_history import router as medical_history_router
from api.billing import router as billing_router

app = FastAPI(
    title="NEXUS - Smart Patient Journey",
    description="AI-powered Hospital Queue Optimization System",
    version="1.0.0"
)

# ---------------------- CORS ----------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# --------------------------------------------------

app.include_router(patient_router)
app.include_router(otp_router)
app.include_router(doctor_router)
app.include_router(receptionist_router)
app.include_router(admin_router)
app.include_router(department_router)
app.include_router(appointment_router)
app.include_router(queue_router)
app.include_router(queue_tracker_router)
app.include_router(login_router)
app.include_router(doctor_dashboard_router)
app.include_router(prescription_router)
app.include_router(admin_dashboard_router)
app.include_router(consultation_router)
app.include_router(medical_history_router)
app.include_router(billing_router)

@app.get("/")
def home():
    return {
        "message": "Welcome to NEXUS - Smart Patient Journey",
        "status": "Backend is running successfully!"
    }