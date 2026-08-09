from fastapi import APIRouter
from db import get_connection

router = APIRouter(
    prefix="/queue",
    tags=["Queue Tracker"]
)


@router.get("/live")
def live_queue():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            queue_id,
            appointment_id,
            department_id,
            queue_number,
            queue_sequence,
            current_position,
            queue_status,
            estimated_wait_time
        FROM queue
        WHERE queue_status IN ('Waiting', 'Called')
        ORDER BY queue_sequence
    """)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return data