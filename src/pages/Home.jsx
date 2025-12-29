import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Home.css";
import students from "../data/students";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || "Teacher";

  const [attendance, setAttendance] = useState({});
  const [filter, setFilter] = useState("all");
  const [studentsList, setStudentsList] = useState(students);
  const [newStudentName, setNewStudentName] = useState("");

  const markAttendance = (id, status) => {
    setAttendance({ ...attendance, [id]: status });
  };

  const addStudent = () => {
    if (newStudentName.trim()) {
      const newId = Math.max(...studentsList.map(s => s.id)) + 1;
      const newStudent = { id: newId, name: newStudentName.trim() };
      setStudentsList([newStudent, ...studentsList]);
      setNewStudentName("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addStudent();
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  const filteredStudents = studentsList.filter((student) => {
    if (filter === "all") return true;
    if (filter === "none") return !attendance[student.id];
    return attendance[student.id] === filter;
  });

  return (
    <div className="home-container">
      <div className="header">
        <h2>Welcome, {username}</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="filter-buttons">
        <button onClick={() => setFilter("present")}>Show Present</button>
        <button onClick={() => setFilter("absent")}>Show Absent</button>
        <button onClick={() => setFilter("late")}>Show Late</button>
        <button onClick={() => setFilter("none")}>Show Unmarked</button>
        <button onClick={() => setFilter("all")}>Show All</button>
      </div>

      <div className="add-student-section">
        <h3>Add New Student</h3>
        <div className="add-student-form">
          <input
            type="text"
            value={newStudentName}
            onChange={(e) => setNewStudentName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter student name"
            className="student-input"
          />
          <button onClick={addStudent} className="add-student-btn">
            Add Student
          </button>
        </div>
      </div>

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
    </div>
  );
}

export default Home;
