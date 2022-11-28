import React from 'react'
import { useEffect } from 'react';
import '../App.css';
import Time from '../time';
import {useNavigate} from 'react-router-dom'
const api_url = "http://localhost:5000/api/tasks"


function Header(){
  let firstTime = new Date().toLocaleTimeString()
  const [time, setTime] = React.useState(firstTime)
  const navigate = useNavigate()

  async function logout(){
    localStorage.setItem('token','');
     navigate(-2)
    navigate('login')
  }
  

  return (
    <nav className='header'>
      <h1 onClick={()=> navigate(-2)}>TASKGURU</h1>
   
      <div className='lefthead'>
            <div className='logoutbutton' onClick={()=> logout()} >Logout</div>
            <Time time={time} setTime={setTime} />
      </div>
    </nav>
  )
}

function Input({newTask, setNewTask, stateSetter}){
  return (
    <div className='inputSection'>
      <input className='firstInput' type="text"  placeholder='Enter New Task' 
      onChange={e => setNewTask(e.target.value)}
      value={newTask} />
      <div className='submit' onClick={()=> createTask(newTask, stateSetter, setNewTask)}>Submit</div>
    </div>
  )
}


/*const setEditActive = (stateSetter, Task)=>{
   stateSetter(prevData => {
    const newArr = prevData.map(obj => {
      if (obj._id === Task._id){
        return {...obj, editActive: true}
      }
      return obj
    })
    console.log(newArr)
    return newArr;

  })
}
*/

function Task({Task, stateSetter }){
  
  const [editActive, setEditActive] = React.useState(false)
  const [editedName, setEditedName] = React.useState(Task.taskName)

  const editNotActive = (
    <div className='task'>
      <div className={Task.isCompleted? 'taskLeftCompleted':'taskLeft'}>
        <img src={Task.isCompleted? require('./resources/icons/complete.png'):require('./resources/icons/incomplete.png')} className='isCompleted' alt="completed"
        onClick={()=> completeTask(Task._id, stateSetter, Task.isCompleted)} />
        <h4>{Task.taskName}</h4>
      </div>

      <div className='taskRight'>
        <img src={require('./resources/icons/edit.png')} className='editIcon' alt="edit"
        onClick={()=> setEditActive(true)} />
        <img src={require('./resources/icons/delete.png')} className='deleteIcon' alt="delete"
        onClick={()=> deleteTask(Task._id, stateSetter)} />
      </div>
    </div>
  )


  const editisActive = (
      <div className='edittask'>
        <input type="text" className='secondInput' 
        onChange={e => {
          
          return setEditedName(e.target.value)}
        }
        value={editedName}
         />
        <div className='middle'>
          <div className='editLeft'>
            <h4>Complete: </h4>
            <img src={Task.isCompleted? require('./resources/icons/complete.png'):require('./resources/icons/incomplete.png')} className='isCompleted' alt="completed"
             onClick={()=> completeTask(Task._id, stateSetter, Task.isCompleted)} />
            
          </div>
          <img src={require('./resources/icons/delete.png')} className='deleteIcon' alt="delete"
          onClick={()=> deleteTask(Task._id, stateSetter)} />  
        </div>
        <div className='done' onClick={async()=>{ 
          await editTask(Task._id, stateSetter, editedName, setEditActive)
          

        }}>Done</div>
      </div>
  )

   return editActive? editisActive : editNotActive
   
}
async function createTask(taskName, stateSetter, setNewTask){
  const data =   await fetch(api_url, {
    method: 'POST',
    headers: {"Content-type": "application/json",
             "authorization": `Bearer ${localStorage.getItem('token')}` },  
    body: JSON.stringify({    taskName: taskName  })
    
  })
  .then(res => res.json())
    .then(data => data.alltasks)
    .catch(err => console.error(err))
 stateSetter(data);

 setNewTask('')

}
// eslint-disable-next-line
async function editTask(id, stateSetter, editedName, editSetter){
    if(editedName){
      const data = await fetch(`${api_url}/${id}`, {
        method: 'PATCH',
        headers: {"Content-type": "application/json",
                     "authorization": `Bearer ${localStorage.getItem('token')}` },  
        body: JSON.stringify({    taskName: editedName  })
        
      })
      .then(res => res.json())
        .then(data => data.alltasks)
        .catch(err => console.error(err))
     await stateSetter(data);
     editSetter(false)
    }
    else{
        editSetter(false)
    }
}

async function completeTask(id, stateSetter, isComplete){
  if(isComplete){
    const data =   await fetch(`${api_url}/${id}`, {
      method: 'PATCH',
      headers: {"Content-type": "application/json",
                "authorization": `Bearer ${localStorage.getItem('token')}` },  
      body: JSON.stringify({    isCompleted: false  })
      
    })
    .then(res => res.json())
      .then(data => data.alltasks)
      .catch(err => console.error(err))
   stateSetter(data);
  }
  else{
    const data =   await fetch(`${api_url}/${id}`, {
      method: 'PATCH',
      headers: {"Content-type": "application/json",
                "authorization": `Bearer ${localStorage.getItem('token')}` },  
      body: JSON.stringify({    isCompleted: true  })
      
    })
    .then(res => res.json())
      .then(data => data.alltasks)
      .catch(err => console.error(err))
   stateSetter(data);
  }

}

async function deleteTask(id, stateSetter){
  const data =   await fetch(`${api_url}/${id}`, {
    method: 'DELETE',
    headers: {"Content-type": "application/json",
                "authorization": `Bearer ${localStorage.getItem('token')}` }
    
  })
  .then(res => res.json())
    .then(data => data.alltasks)
    .catch(err => console.error(err))
 stateSetter(data);
}






function TaskPage() {

 
  const [tasks, setTasks] = React.useState([])
  const [newTask, setNewtask] = React.useState("")
 

 

  useEffect(()=>{
    getTasks()
    
  })
  
  function getTasks(){
    fetch(api_url, {
        method: 'GET',
        headers: {"Content-type": "application/json",
                  "authorization": `Bearer ${localStorage.getItem('token')}` }

    })
      .then(res => res.json())
      .then(data => data.alltasks)
      .then((data) => {
        let newArray = data.map(item =>{
          return{
            ...item,
            editActive: true
           
          }
        })
        return setTasks(newArray)
      })
      .catch(err => console.error(err))

     


  }

 
  
  

  let taskElement = tasks.map((item) =>{
  
    return (
      
      <Task key={item._id} Task={item} stateSetter={setTasks}  />
    )
  }) 


  return (
    <div className="taskApp">

      <Header />
      <main>
        <div className='welcome'>{`Welcome, ${localStorage.getItem('name')}`}</div>
        <Input newTask={newTask} setNewTask={setNewtask} stateSetter={setTasks} />
       {taskElement}
      
      </main>

      
    </div>
  )
}

export default TaskPage;