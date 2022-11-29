import React from 'react'
import {HashRouter,Routes, Route} from 'react-router-dom'
import './App.css';

import  Landing  from './pages/landingPage'
import Login from './pages/login'
import Register from './pages/register'
import TaskPage from './pages/taskPage'






function App() {

 


  return (
    <div className="App">
        <HashRouter basename='/'>
            <Routes>
                <Route exact path='/' element={<Landing />} />
                <Route   path='login' element={<Login />} />
                <Route exact path='register' element={<Register />} />
                <Route exact path='login/taskpage' element={<TaskPage />} />
                <Route exact path='register/taskpage' element={<TaskPage />} />
            </Routes>
        </HashRouter>
        <footer>Copyright @dev.banger by Tito 2022</footer>
      
    </div>
  )
}

export default App;
