import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./editCourse.css"

const EditCourse = () => {

  let [title, setTitle] = useState("")
  let [description, setDescription] = useState("")
  let [price, setPrice] = useState("")

  let navigate = useNavigate()
  let { id } = useParams()

  useEffect(() => {
    fetch("http://localhost:8080/api/courses/getcourse")
      .then(res => res.json())
      .then(data => {
        let selectedCourse = data.find((c) => c.id == id)

        if (selectedCourse) {
          setTitle(selectedCourse.title)
          setDescription(selectedCourse.description)
          setPrice(selectedCourse.price)
        }
      })
      .catch(err => console.log(err))
  }, [id])

  function updateCourse(e) {
    e.preventDefault()

    if (title == "" || description == "" || price == "") {
      alert("Enter all the fields")
      return
    }

    let updatedCourse = {
      title,
      description,
      price
    }

    fetch(`http://localhost:8080/api/courses/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedCourse)
    })
      .then(res => res.json())
      .then(data => {
        alert("Course Updated Successfully")
        navigate("/dashboard")
      })
      .catch(err => console.log(err))
  }

  function backBtn() {
    navigate("/dashboard")
  }

  return (
    <div className='editCourse'>
      <main>
        <h1>Edit Course</h1>

        <form onSubmit={updateCourse}>
          <div className='title'>
            <label>Title</label>
            <input
              type="text"
              placeholder='Enter Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className='desc'>
            <label>Description</label>
            <input
              type="text"
              placeholder='Enter Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className='price'>
            <label>Price</label>
            <input
              type="number"
              placeholder='Enter Price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className='btnGroup'>
            <button type='submit' className='updateBtn'>Update</button>
            <button type='button' className='backBtn' onClick={backBtn}>Back</button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default EditCourse