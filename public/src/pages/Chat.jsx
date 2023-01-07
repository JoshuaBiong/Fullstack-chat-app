import React from 'react'

const logout=()=>{
  localStorage.clear();
 
  }
    


function Chat() {
  return (
    <div>Chat
<a href="/login" onClick={logout}>Logout</a>
    </div>
    
  )
}

export default Chat