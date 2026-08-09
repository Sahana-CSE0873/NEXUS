import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

function ReceptionistQueue() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadQueue = async () => {
    try {
      const response = await axios.get(`${API}/queue/`);
      setQueue(response.data);
    } catch (error) {
      console.error("Error loading queue:", error);
    }
  };

  useEffect(() => {
    loadQueue();
  }, []);

  const callNextPatient = async () => {
    try {
      setLoading(true);

      const response = await axios.put(`${API}/queue/next`);

      alert(
        `${response.data.message}\nQueue Number: ${response.data.queue_number}`
      );

      await loadQueue();
    } catch (error) {
      console.error("Error calling next patient:", error);
      alert("Unable to call next patient");
    } finally {
      setLoading(false);
    }
  };

  const completePatient = async (queueId) => {
    try {
      await axios.put(`${API}/queue/complete/${queueId}`);

      alert("Patient Consultation Completed");

      await loadQueue();
    } catch (error) {
      console.error("Error completing patient:", error);
      alert("Unable to complete consultation");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
        padding: "30px",
        color: "#1f2937",
      }}
    >
      <h1 style={{ marginBottom: "25px" }}>
        Receptionist Queue Dashboard
      </h1>

      <button
        onClick={callNextPatient}
        disabled={loading}
        style={{
          padding: "12px 20px",
          marginBottom: "25px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "15px",
        }}
      >
        {loading ? "Calling..." : "Call Next Patient"}
      </button>

      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "white",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#e5e7eb" }}>
              <th style={cellStyle}>Queue ID</th>
              <th style={cellStyle}>Queue Number</th>
              <th style={cellStyle}>Patient ID</th>
              <th style={cellStyle}>Patient Name</th>
              <th style={cellStyle}>Department</th>
              <th style={cellStyle}>Priority</th>
              <th style={cellStyle}>Status</th>
              <th style={cellStyle}>Wait Time</th>
              <th style={cellStyle}>Action</th>
            </tr>
          </thead>

          <tbody>
            {queue.map((item) => (
              <tr key={item.queue_id}>
                <td style={cellStyle}>{item.queue_id}</td>
                <td style={cellStyle}>{item.queue_number}</td>
                <td style={cellStyle}>{item.patient_id}</td>
                <td style={cellStyle}>{item.patient_name}</td>
                <td style={cellStyle}>{item.department}</td>
                <td style={cellStyle}>{item.service_priority}</td>
                <td style={cellStyle}>{item.queue_status}</td>
                <td style={cellStyle}>
                  {item.estimated_wait_time} min
                </td>

                <td style={cellStyle}>
                  {item.queue_status === "Called" && (
                    <button
                      onClick={() => completePatient(item.queue_id)}
                      style={{
                        padding: "7px 12px",
                        backgroundColor: "#16a34a",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const cellStyle = {
  padding: "12px",
  border: "1px solid #d1d5db",
  textAlign: "left",
  color: "#111827",
};

export default ReceptionistQueue;