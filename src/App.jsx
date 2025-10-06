import React, { useState } from "react";
import "./App.css";
import { v4 as uuid} from "uuid";
const App=()=>{
  const [users, setUsers]=useState([])
  const [buttonState,setButtonState]=useState("add")
  const[userInfo,setUserInfo]=useState({
    id:uuid(),
    name:"",
    age:"",
    email:"",
    phone:""
  })
  const handleChange=(e)=>{
    const {name,value}=e.target
    setUserInfo((currInfo)=>{
      return {
        ...currInfo,
        [name]:value,
      }
    })}

  const addData=()=>{
    setUsers((currUsers)=>[...currUsers,userInfo])
    setUserInfo({
      id:uuid(),
       name:"",
    age:"",
    email:"",
    phone:""
    })
  }
  const deleteData=(id)=>{
    setUsers((currUsers)=>{
      return currUsers.filter((user)=>{
        return user.id!==id
      })
    })
  }
const startEditing=(user)=>{
  setUserInfo(user)
  setButtonState("edit")
}
const cancelEditing=()=>{
  setUserInfo({
      id:uuid(),
       name:"",
    age:"",
    email:"",
    phone:""
    })
    setButtonState("add")
}
const updateData=()=>{
  setUsers((currUsers)=>{
    return currUsers.map((user)=>{
      if(user.id===userInfo.id){
        return userInfo
      }
      return user
    })
  })
  cancelEditing()
  }

  return(
    <div className="container">
      <div className="form">
        <input type="text" placeholder="Enter your name" 
        value={userInfo.name}
        onChange={handleChange}
        name="name"
        />
        <br />
        <input type="number" placeholder="Enter your age" 
        value={userInfo.age}
        onChange={handleChange}
        name="age" />
        <br />
        <input type="email" placeholder="Enter your email" 
        value={userInfo.email}
        onChange={handleChange}
        name="email" />
         <br />
        <input type="number" placeholder="Enter your phone no"
        value={userInfo.phone}
        onChange={handleChange}
        name="phone"/>
        <br />
      {
        buttonState ==="add"?  (<button onClick={addData}>Add</button>):
         (
          <div className="buttonContainer">
            <button onClick={updateData}>Update</button>
            <button onClick={cancelEditing}>Cancel</button>
          </div>
      )}
      </div>
      <div className="dataTable">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>E-mail</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user,index)=>{
                return <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button onClick={()=>startEditing(user)}>Edit</button>
                    <button onClick={()=>deleteData(user.id)}>Delete</button>
                  </td>
                </tr>
              }
              
              )}
            </tbody>
          </table>
      </div>
    </div>
  )
}
export default App