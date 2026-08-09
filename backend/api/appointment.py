from fastapi import APIRouter
from db import get_connection
from schemas.appointment import AppointmentRegister

router = APIRouter(
    prefix="/appointments",
    tags=["Appointments"]
)

@router.post("/register")
def register_appointment(appointment: AppointmentRegister):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT COUNT(*) AS total FROM appointment")
    total = cursor.fetchone()["total"]

    appointment_id = f"APPT{total+1:06d}"

    sql = """
    INSERT INTO appointment
    (
        appointment_id,
        patient_id,
        reason_for_visit,
        service_priority,
        special_care_category,
        emergency_verification_status,
        department_id,
        doctor_id,
        appointment_date,
        appointment_time,
        status
    )
    VALUES
    (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """

    values = (
        appointment_id,
        appointment.patient_id,
        appointment.reason_for_visit,
        appointment.service_priority,
        appointment.special_care_category,
        appointment.emergency_verification_status,
        appointment.department_id,
        appointment.doctor_id,
        appointment.appointment_date,
        appointment.appointment_time,
        appointment.status
    )

    cursor.execute(sql, values)
    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Appointment Booked Successfully",
        "appointment_id": appointment_id
    }