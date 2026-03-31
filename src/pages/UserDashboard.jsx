import React, { useEffect, useState } from "react";
import "./userDashboard.css";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  let [courses, setCourses] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/courses/getcourse")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function logout() {
    navigate("/login");
  }

  function joinCourse(title) {
    alert(`You have joined ${title} successfully!`);
  }

  return (
    <div className="userDashboard">
      
      {/* Navbar */}
      <div className="userNavbar">
        <h1>Explore Courses</h1>
        <button className="logoutBtn" onClick={logout}>Logout</button>
      </div>

      {/* Welcome Section */}
      <div className="welcomeSection">
        <h2>Upgrade Your Skills 🚀</h2>
        <p>Choose from our best courses and start learning today.</p>
      </div>

      {/* Course Cards */}
      <div className="courseGrid">
        {courses.map((course) => (
          <div className="courseCard" key={course.id}>
            <div className="courseTop">
              <span className="courseTag">Popular</span>
            </div>

            <h3>{course.title}</h3>
            <p>{course.description}</p>

            <div className="courseBottom">
              <span className="price">₹ {course.price}</span>
              <button
                className="joinBtn"
                onClick={() => joinCourse(course.title)}
              >
                Join Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;