import React ,{useState, useEffect} from 'react'
import { ToastContainer,toast } from "react-toastify";
import  styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { loginRoute } from '../util/APIRoute';


function Login() {

// VARIABLES
const navigate = useNavigate();

    const [values, setValues] = useState({
        username:"",
        password:"",
    })

    const toastOptions ={
    position:'bottom-right',
    autoClose: 4000,
    pauseOnHover: true,
    theme:"dark",
}
    // END OF VARIABLES

    // FOMR SUBMIT HANDLER
    const handleSubmit= async (event)=>{
        event.preventDefault();
    if (handleValidation()){
        const {username,password} = values;
        const {data} = await axios.post(loginRoute,{
            username,password  

                             
    });
    if(data.status===false){
        toast.error(data.msg, toastOptions)
    }
    if(data.status===true){ 
        localStorage.setItem("chat-app-user",JSON.stringify(data.user))
       navigate('/')
    }

}

}

// FORM VALIDATION USING TOASTIFY 
const handleValidation=()=>{
    const {username,password} = values;

    // PASSWORD VALIDATION
    if (username.length ==""){
      toast.error("Username is required", toastOptions)
      return false
    }else if (password === ""){
        toast.error("Password is required", toastOptions)
      return false
    }

 return true
    
}
// END OF PASSWORD VALIDATION

const  handleChanges=(event)=>{
    setValues({...values,[event.target.name]:event.target.value})
};

  return (
   <>
   <FormContainer>
    <form onSubmit={(event)=> handleSubmit(event)}>
        <div className="brand">
            <img src="" alt=""  />
            <h1>Login</h1>
        </div>
        {/* username */}
        <input type="text"  
        name='username' 
        placeholder='username'
        onChange={e=>handleChanges(e)} 
        min="3"
         />
        
         {/* password */}
          <input type="password" 
        name='password' 
        placeholder='Password'
        onChange={e=>handleChanges(e)} 
         />
         
         <button type="submit">Login</button> 
         <span>Don't have an account? <Link className='link' to="/register">Register</Link></span>


    </form>
   </FormContainer>
   <ToastContainer/>
   </>
  )
}


const FormContainer = styled.div`

height:100vh;
width:100%;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
gap:1rem;
background-color: #131324;

.brand{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:1rem;

    h1{
        color:white;
        text-transform:uppercase;
    }
    
}
form{
        display:flex;
        justify-content:center;
        align-items:center;
        flex-direction:column;
        gap:1rem ;
        background-color:#0a0a42e1;
        padding: 3rem 5rem;

        input{
            padding:1rem;
            background-color:transparent;
            width:20rem;
            border: solid white 1px;
            color:white;
            font-size:1rem;
            transition: ease-in-out .2s;
            &:focus{
                transform:scale(103%);
                transition: ease-in-out .2s;
                border: solid #d4d4d4 1px;

            }
        }
        button{
            padding:10px;
            width:20rem;
        }
        span{
            color:#a2a2aac0;
        }
        .link{
            color:white;
            text-decoration:none;
        }
    }



`
export default Login