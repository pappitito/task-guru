import React from 'react'
import {useNavigate} from 'react-router-dom'
import './login.css'

const api_base = "https://taskguru-api.onrender.com/api/users/register" 

//"http://localhost:5000/api/users/register"
export default function Register() {
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const navigate = useNavigate()


    async function continueregister(){
        const data = await fetch(api_base, {
            method: 'POST',
            headers: {"Content-type": "application/json" },  
            body: JSON.stringify({  name: name,  email: email, password: password  })
        }).then(res => res.json())
        .catch(error => console.log(error))

        let headname = data.user.name
        headname = headname.charAt(0).toUpperCase() + headname.slice(1)

        localStorage.setItem('token', data.token)
        localStorage.setItem('name', headname)
        navigate('taskpage')

    }
    return (
        <div className='login'>
              <h1 onClick={()=> navigate(-1)}>TASKGURU</h1>
              <div className='center'>
                <div className='log'>Sign Up</div>
                <input type="text" placeholder="Name" 
                 onChange={e => {
                    return setName(e.target.value)
                }}
                value={name} />
                <input type="text" placeholder="E-mail" 
                onChange={e => {
                    return setEmail(e.target.value)
                }}
                value={email}/>
                <input className='pword' type="text" placeholder="Password"
                    onChange={e => {
                        return setPassword(e.target.value)
                    }}
                    value={password} />
                <div className='forgot'></div>
                <div className='continue' onClick={()=> continueregister()}>Continue</div>

             </div>
        </div>
    )
}