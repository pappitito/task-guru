import React from 'react'
import './App.css';

function Time({time, setTime}){
     
    function changeTime(){
        setInterval(()=>{
            let date = new Date().toLocaleTimeString()
             setTime(date)
        }, 1000)
    }
    return(
        <div>
            <h2 className='time'>{time}</h2>
             {changeTime()}
        </div>

    )
}

export default Time;