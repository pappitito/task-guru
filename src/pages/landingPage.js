import React from 'react'
import { useNavigate } from 'react-router-dom'
import './landing.css'

function Landing(){

    const navigate = useNavigate() 
    return(
        <div className='landing'>
            <h1>TASKGURU</h1>

            <div className='mainbody'>
                <div className='maintext'>
                    <p>{`This is a project done to showcase both my front end and back end skills and my ability to learn quick.
                        Get more done with task guru. Manage capture and edit your tasks from anywhere in
                         the world at any time. Organize your day-to-day with taskguru, create shopping lists,
                         create assasination lists :) to kill your tasks everytime. This site is powered by a back end API 
                         built enirely by tito in his bedroom using the MERN stack.`}
                    </p>
                    <p className="cite">illustration by "Unblast" via dribble</p>
                    <div className='clickers'>
                         <div className='button' onClick={()=> navigate('login')}>Log in</div>
                         <div className='empty'></div>
                         <div className='button' onClick={()=> navigate('register')}>Sign up</div>
                    </div>
                </div>
                <img src={require('./resources/wbt.png')} alt="clip art" />

            </div>

        </div>
    )
}

export default Landing;