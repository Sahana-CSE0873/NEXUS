from fastapi import APIRouter
from db import get_connection
from schemas.receptionist import ReceptionistRegister

router = APIRouter(
    prefix="/receptionists",
    tags=["Receptionists"]
)

@router.post("/register")
def register_receptionist(receptionist: ReceptionistRegister):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    # Check duplicate mobile number
    cursor.execute(
        "SELECT * FROM receptionist WHERE mobile_number=%s",
        (receptionist.mobile_number,)
    )

    existing = cursor.fetchone()

    if existing:
        cursor.close()
        conn.close()

        return {
            "message": "Mobile number already registered"
        }

    cursor.execute("SELECT COUNT(*) AS total FROM receptionist")
    total = cursor.fetchone()["total"]

    receptionist_id = f"NXR{total+1:06d}"

    sql = """
    INSERT INTO receptionist
    (
        receptionist_id,
        receptionist_name,
        mobile_number,
        password,
        gender
    )
    VALUES (%s,%s,%s,%s,%s)
    """

    values = (
        receptionist_id,
        receptionist.receptionist_name,
        receptionist.mobile_number,
        receptionist.password,
        receptionist.gender
    )

    cursor.execute(sql, values)
    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Receptionist Registered Successfully",
        "receptionist_id": receptionist_id
    }
@router.get("/all")
def get_all_receptionists():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            receptionist_id,
            receptionist_name,
            mobile_number
        FROM receptionist
        ORDER BY receptionist_name
    """)

    receptionists = cursor.fetchall()

    cursor.close()
    conn.close()

    return receptionists