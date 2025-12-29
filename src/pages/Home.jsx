import { useState } from "react";
import "../styles/Home.css";
import students from "../data/students";

function Home() {
  const [attendance, setAttendance] = useState({}); // {id: "present"/"absent"/"late"}
  const [filter, setFilter] = useState("all"); // all / present / absent / late

  const markAttendance = (id, status) => {
    setAttendance({ ...attendance, [id]: status });
  };

  const filteredStudents = students.filter((student) => {
    if (filter === "all") return true;
    return attendance[student.id] === filter;
  });

  return (
    <div className="home-container">
      <h2>Students Attendance</h2>

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
