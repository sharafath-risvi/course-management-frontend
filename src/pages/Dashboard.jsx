import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  let[course,setCourse]=useState([])
  let navigate=useNavigate()

useEffect(()=>{
 let a= fetch("http://localhost:8080/api/courses/getcourse")
 a.then(res=>res.json()).then(data=>{
  setCourse(data)})
 .catch(err=>console.log(err)
 )

},[])

console.log(course);



function addCourse(){
  navigate("/addcourse")
}

function logout(){
  navigate("/login")
}

function deleteCourse(id){
  fetch(`http://localhost:8080/api/courses/delete/${id}`,{
    method:"DELETE"
})
.then(()=>{
  alert("Course Deleted Successfully")
  setCourse(course.filter((c)=>c.id!==id))
}).catch(err=>console.log(err)
)
}

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">CoursePanel</h2>

        <ul className="menu">
          <li className="active">Dashboard</li>
          <li onClick={addCourse}>Add Course</li>
          <li onClick={logout}>Logout</li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="main">

        {/* Navbar */}
        <div className="navbar">
          <h1>Course Dashboard</h1>
          <button className="addBtn" onClick={addCourse}>+ Add Course</button>
        </div>

        {/* Summary Cards */}
        <div className="cards">

          <div className="card">
            <h3>Total Courses</h3>
            <p>{course.length}</p>
          </div>

          {/* <div className="card">
            <h3>Frontend Courses</h3>
            <p>3</p>
          </div>

          <div className="card">
            <h3>Backend Courses</h3>
            <p>5</p>
          </div> */}

        </div>

        {/* Course Table */}
        <div className="tableContainer">
          <h2>Course List</h2>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Course Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
                {course.map((c,i)=>{
                  return(
                  <tr>
                    <td>{c.id}</td>
                    <td>{c.title}</td>
                    <td>{c.description}</td> 
                    <td>{c.price}</td>
                    <td>
                     <button 
                        type="button" 
                        className="editBtn" 
                        onClick={() => navigate(`/editcourse/${c.id}`)}
                      >
                        Edit
                    </button>
                      <button className="dltBtn" onClick={()=>deleteCourse(c.id)}>Delete</button>
                    </td>
                  </tr>  
                  )
                })}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
