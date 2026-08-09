from fastapi import APIRouter
from db import get_connection
from schemas.prescription import PrescriptionRegister

router = APIRouter(
    prefix="/prescription",
    tags=["Prescription"]
)


@router.post("/add")
def add_prescription(prescription: PrescriptionRegister):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT COUNT(*) AS total FROM prescription")
    total = cursor.fetchone()["total"]

    prescription_id = f"PRS{total+1:06d}"

    sql = """
    INSERT INTO prescription
    (
        prescription_id,
        appointment_id,
        patient_id,
        doctor_id,
        medicine_name,
        dosage,
        frequency,
        duration,
        instructions
    )
    VALUES
    (%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """

    values = (
        prescription_id,
        prescription.appointment_id,
        prescription.patient_id,
        prescription.doctor_id,
        prescription.medicine_name,
        prescription.dosage,
        prescription.frequency,
        prescription.duration,
        prescription.instructions
    )

    cursor.execute(sql, values)
    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Prescription Added Successfully",
        "prescription_id": prescription_id
    }
@router.get("/patient/{patient_id}")
def patient_prescriptions(patient_id: str):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            prescription_id,
            appointment_id,
            medicine_name,
            dosage,
            frequency,
            duration,
            instructions,
            prescribed_date
        FROM prescription
        WHERE patient_id=%s
        ORDER BY prescribed_date DESC
    """, (patient_id,))

    prescriptions = cursor.fetchall()

    cursor.close()
    conn.close()

    return prescriptions
@router.get("/doctor/{doctor_id}")
def doctor_prescriptions(doctor_id: str):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            prescription_id,
            appointment_id,
            patient_id,
            medicine_name,
            dosage,
            frequency,
            duration,
            instructions,
            prescribed_date
        FROM prescription
        WHERE doctor_id = %s
        ORDER BY prescribed_date DESC
    """, (doctor_id,))

    prescriptions = cursor.fetchall()

    cursor.close()
    conn.close()

    return prescriptions