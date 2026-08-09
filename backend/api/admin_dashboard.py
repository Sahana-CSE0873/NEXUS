from fastapi import APIRouter
from db import get_connection

router = APIRouter(
    prefix="/admin-dashboard",
    tags=["Administrator Dashboard"]
)


@router.get("/summary")
def dashboard_summary():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT COUNT(*) AS total FROM patient")
    total_patients = cursor.fetchone()["total"]

    cursor.execute("SELECT COUNT(*) AS total FROM doctor")
    total_doctors = cursor.fetchone()["total"]

    cursor.execute("SELECT COUNT(*) AS total FROM receptionist")
    total_receptionists = cursor.fetchone()["total"]

    cursor.execute("SELECT COUNT(*) AS total FROM appointment")
    total_appointments = cursor.fetchone()["total"]

    cursor.execute("""
        SELECT COUNT(*) AS total
        FROM queue
        WHERE queue_status='Waiting'
    """)
    waiting_patients = cursor.fetchone()["total"]

    cursor.close()
    conn.close()

    return {
        "total_patients": total_patients,
        "total_doctors": total_doctors,
        "total_receptionists": total_receptionists,
        "total_appointments": total_appointments,
        "waiting_patients": waiting_patients
    }
@router.get("/appointments")
def all_appointments():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            a.appointment_id,
            p.patient_name,
            d.doctor_name,
            dept.department_name,
            a.appointment_date,
            a.appointment_time,
            a.status
        FROM appointment a
        JOIN patient p
            ON a.patient_id = p.patient_id
        JOIN doctor d
            ON a.doctor_id = d.doctor_id
        JOIN department dept
            ON a.department_id = dept.department_id
        ORDER BY a.appointment_date DESC, a.appointment_time ASC
    """)

    appointments = cursor.fetchall()

    cursor.close()
    conn.close()

    return appointments
@router.get("/queue")
def all_queue():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            q.queue_id,
            q.queue_number,
            p.patient_name,
            d.doctor_name,
            dept.department_name,
            q.queue_status,
            q.current_position,
            q.estimated_wait_time
        FROM queue q
        JOIN appointment a
            ON q.appointment_id = a.appointment_id
        JOIN patient p
            ON a.patient_id = p.patient_id
        JOIN doctor d
            ON a.doctor_id = d.doctor_id
        JOIN department dept
            ON a.department_id = dept.department_id
        ORDER BY q.queue_sequence
    """)

    queue = cursor.fetchall()

    cursor.close()
    conn.close()

    return queue