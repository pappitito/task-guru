import React from 'react'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import './App.css';

import  Landing  from './pages/landingPage'
import Login from './pages/login'
import Register from './pages/register'
import TaskPage from './pages/taskPage'






function App() {

 


  return (
    <body className="App">
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Landing />} />
                <Route   path='login' element={<Login />} />
                <Route exact path='register' element={<Register />} />
                <Route exact path='login/taskpage' element={<TaskPage />} />
                <Route exact path='register/taskpage' element={<TaskPage />} />
            </Routes>
        </BrowserRouter>
        <footer>Copyright @dev.banger by Tito 2022</footer>
      
    </body>
  )
}

export default App;
