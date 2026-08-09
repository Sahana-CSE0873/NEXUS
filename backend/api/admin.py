from fastapi import APIRouter
from db import get_connection
from schemas.admin import AdminRegister

router = APIRouter(
    prefix="/admins",
    tags=["Administrators"]
)


@router.post("/register")
def register_admin(admin: AdminRegister):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    # Check duplicate mobile number
    cursor.execute(
        "SELECT * FROM administrator WHERE mobile_number=%s",
        (admin.mobile_number,)
    )

    existing = cursor.fetchone()

    if existing:
        cursor.close()
        conn.close()

        return {
            "message": "Mobile number already registered"
        }

    # Generate Admin ID
    cursor.execute("SELECT COUNT(*) AS total FROM administrator")
    total = cursor.fetchone()["total"]

    administrator_id = f"NXA{total+1:06d}"

    sql = """
    INSERT INTO administrator
    (
        administrator_id,
        administrator_name,
        mobile_number,
        password,
        gender
    )
    VALUES (%s,%s,%s,%s,%s)
    """

    values = (
        administrator_id,
        admin.admin_name,
        admin.mobile_number,
        admin.password,
        admin.gender
    )

    cursor.execute(sql, values)

    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Administrator Registered Successfully",
        "administrator_id": administrator_id
    }
@router.get("/reports")
def admin_reports():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT COUNT(*) total FROM patient")
    patients = cursor.fetchone()["total"]

    cursor.execute("SELECT COUNT(*) total FROM doctor")
    doctors = cursor.fetchone()["total"]

    cursor.execute("SELECT COUNT(*) total FROM receptionist")
    receptionists = cursor.fetchone()["total"]

    cursor.execute("SELECT COUNT(*) total FROM department")
    departments = cursor.fetchone()["total"]

    cursor.close()
    conn.close()

    return {
        "patients": patients,
        "doctors": doctors,
        "receptionists": receptionists,
        "departments": departments
    }