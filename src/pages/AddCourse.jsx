import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./addCourse.css"
const AddCourse = () => {

  let[title,setTitle]=useState("")
  let[description,setDescription]=useState("")
  let[price,setPrice]=useState("")
  let[courseArr,setCourseArr]=useState([])

  let navigate=useNavigate()
  
  function backBtn(){
    navigate("/dashboard")
  }
  
  function addCourse(e){
    e.preventDefault()
    
    if(title==""||description==""||price==""){
      alert("Enter All the fields")
      return;
    }
    
    

    let objAddCourse={
      title,
      description,
      price
    }

    fetch("http://localhost:8080/api/courses/addcourse",

      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(objAddCourse)
      }

    ).then(res=>res.json())
    .then(data=>{
      console.log(data);
      alert("Course Added Successfully")
      navigate("/dashboard")
    }).catch(err=>console.log(err)
    )

    setCourseArr([...courseArr,objAddCourse])
    console.log(courseArr);

    setTitle("")
    setDescription("")
    setPrice("")
    
  }
  
  

  return (
    <div className='addCourse'>

      <main>

        <h1>Add Course</h1>
        <form action="" onSubmit={addCourse}>
        <div className='title'>
            <label htmlFor="">Title</label>
            <input type="text" placeholder='Enter Title' value={title} onChange={(e)=>{
              setTitle(e.target.value)
            }}/>
        </div>
        <div className='desc'>
            <label htmlFor="">Description</label>
            <input type="text" placeholder='Enter Description' value={description} onChange={(e)=>{
              setDescription(e.target.value)
            }}/>
        </div>
        <div className='price'>
            <label htmlFor="">Price</label>
            <input type="text"  placeholder='Enter price' value={price} onChange={(e)=>{
              setPrice(e.target.value)
            }}/>
        </div>
        <div className='addCourseBtn'> 
          <button type='submit'>Add</button>
        </div>
        <div className='backBtn'>

          <button type='button' onClick={backBtn}>Back</button>
        </div>
        </form>
        

      </main>
    </div>
  )
}

export default AddCourse
