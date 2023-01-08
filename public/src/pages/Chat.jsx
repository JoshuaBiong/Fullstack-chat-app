import React , {useEffect}from 'react'
import { useNavigate } from 'react-router-dom'



function Chat() {


    const logout =()=>{
localStorage.clear();
navigate("/login")
    }

const navigate =useNavigate();
 
useEffect(()=>{
if(localStorage.getItem("chat-app-user") ===null){
    navigate("/login")
}

},[])
    





  return (
    <div>Chat
<button onClick={logout}>logout</button>
    </div>
    
  )
}

export default Chat