import { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Home.css";
import students from "../data/students";

function Home() {
  const location = useLocation();
  const username = location.state?.username || "Teacher";

  const [attendance, setAttendance] = useState({});
  const [filter, setFilter] = useState("all");

  const markAttendance = (id, status) => {
    setAttendance({ ...attendance, [id]: status });
  };

  const filteredStudents = students.filter((student) => {
    if (filter === "all") return true;
    return attendance[student.id] === filter;
  });

  return (
    <div className="home-container">
      <h2>Welcome, {username}</h2>

      <div className="students-list">
        {filteredStudents.map((student) => (
          <div key={student.id} className="student-card">
            <div className="student-info">
              <span className="student-name">{student.name}</span>
              <span
                className={`status ${
                  attendance[student.id] === "present"
                    ? "present"
                    : attendance[student.id] === "absent"
                    ? "absent"
                    : attendance[student.id] === "late"
                    ? "late"
                    : ""
                }`}
              >
                {attendance[student.id] ? attendance[student.id] : "None"}
              </span>
            </div>
            <div className="buttons">
              <button className="present-btn" onClick={() => markAttendance(student.id, "present")}>
                Present
              </button>
              <button className="absent-btn" onClick={() => markAttendance(student.id, "absent")}>
                Absent
              </button>
              <button className="late-btn" onClick={() => markAttendance(student.id, "late")}>
                Late
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="filter-buttons">
        <button onClick={() => setFilter("present")}>Show Present</button>
        <button onClick={() => setFilter("absent")}>Show Absent</button>
        <button onClick={() => setFilter("late")}>Show Late</button>
        <button onClick={() => setFilter("all")}>Show All</button>
      </div>
    </div>
  );
}

export default Home;
