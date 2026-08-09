from fastapi import APIRouter
from db import get_connection
from schemas.patient import PatientRegister
from schemas.login import PatientLogin
from services.otp_service import generate_otp

router = APIRouter(
    prefix="/patients",
    tags=["Patients"]
)


@router.get("/")
def get_patients():
    return {
        "message": "Patient API Working Successfully"
    }


@router.post("/register")
def register_patient(patient: PatientRegister):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    # Check whether mobile number already exists
    cursor.execute(
        "SELECT patient_id FROM patient WHERE mobile_number=%s",
        (patient.mobile_number,)
    )

    existing = cursor.fetchone()

    if existing:
        cursor.close()
        conn.close()

        return {
            "message": "Mobile number already registered"
        }

    # Generate new Patient ID
    cursor.execute("SELECT COUNT(*) AS total FROM patient")
    count = cursor.fetchone()["total"]

    patient_id = f"NXP{count + 1:06d}"

    sql = """
    INSERT INTO patient
    (patient_id, patient_name, mobile_number, password, gender, date_of_birth, address)
    VALUES (%s,%s,%s,%s,%s,%s,%s)
    """

    values = (
        patient_id,
        patient.patient_name,
        patient.mobile_number,
        patient.password,
        patient.gender,
        patient.date_of_birth,
        patient.address
    )

    cursor.execute(sql, values)
    conn.commit()

    cursor.close()
    conn.close()

    otp = generate_otp(patient_id)

    return {
        "message": "Patient Registered Successfully",
        "patient_id": patient_id,
        "otp": otp
    }


@router.post("/login")
def patient_login(patient: PatientLogin):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    sql = """
    SELECT patient_id, patient_name
    FROM patient
    WHERE patient_id=%s AND password=%s
    """

    cursor.execute(sql, (patient.patient_id, patient.password))

    result = cursor.fetchone()

    cursor.close()
    conn.close()

    if result:
        return {
            "message": "Login Successful",
            "patient": result
        }

    return {
        "message": "Invalid Patient ID or Password"
    }
from fastapi import HTTPException

@router.get("/dashboard/{patient_id}")
def patient_dashboard(patient_id: str):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            patient_id,
            patient_name,
            gender,
            date_of_birth,
            address
        FROM patient
        WHERE patient_id=%s
    """, (patient_id,))

    patient = cursor.fetchone()

    cursor.close()
    conn.close()

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient not found"
        )

    return {
        "patient_id": patient["patient_id"],
        "patient_name": patient["patient_name"],
        "gender": patient["gender"],
        "date_of_birth": str(patient["date_of_birth"]),
        "address": patient["address"],

        # Temporary demo values
        "queue_number": 12,
        "assigned_doctor": "Dr. Ravi Kumar",
        "department": "General Physician",
        "appointment_time": "10:30 AM",
        "billing_amount": 850,
        "status": "Waiting"
    }
@router.get("/all")
def get_all_patients():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            patient_id,
            patient_name,
            mobile_number
        FROM patient
        ORDER BY patient_name
    """)

    patients = cursor.fetchall()

    cursor.close()
    conn.close()

    return patients
@router.get("/list")
def patient_list():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT patient_id,
               patient_name,
               mobile_number
        FROM patient
        ORDER BY patient_id
    """)

    patients = cursor.fetchall()

    cursor.close()
    conn.close()

    return patients