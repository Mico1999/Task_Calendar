import Header from "./components/Header"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"
import Footer from "./components/Footer"
import About from "./components/About" 

import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {

  const [showAddTask, setShowAddTask] = useState(true)
  const [tasks, setTasks]  = useState([])

  // Fetch tasks from local JSON server, useEffect is used to make effect on page (re)load
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Delete specific task
  const deleteTask = async (id) => {

    // update JSON server
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not, update UI
    res.status === 200 ? setTasks(tasks.filter((task) => task.id !== id))
      : alert('Error Deleting This Task')
  }

  // Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    // update JSON server
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    // update UI
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }
  
  // Add task
  const addTask = async (task) => {
    
    // update JSON server
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    // update UI
    const NewTask = await res.json() // create new object task
    setTasks([...tasks, NewTask])  // add it to existing one
  }

  return (
    <Router>
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask}></Header>
      <Routes>
        <Route path='/' element = {
          <>
            {showAddTask && <AddTask onAdd={addTask}></AddTask>}
            { tasks.length > 0 ? (
            <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
            ) : ('No task to show') }
          </>
        }/>
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
