import React ,{useState, useEffect} from 'react'
import { ToastContainer,toast } from "react-toastify";
import  styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { registerRoute } from '../util/APIRoute';


function Register() {

// VARIABLES
const navigate = useNavigate();
    const [values, setValues] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
    })

    const toastOptions ={
    position:'bottom-right',
    autoClose: 5000,
    pauseOnHover: true,
    theme:"dark",
}
    // END OF VARIABLES

    // FOMR SUBMIT HANDLER
    const handleSubmit= async (event)=>{
        event.preventDefault();
    if (handleValidation()){
        const {username,password,email} = values;
        const {data} = await axios.post(registerRoute,{
            username,email,password  
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
    const {username,password,confirmPassword,email} = values;

    // PASSWORD VALIDATION
    if(password!==confirmPassword){
toast.error("password did not match",toastOptions )
return false;

 } else if(username.length<4){
    toast.error("Username should > 4",toastOptions )
return false;
 }else if(email=="") {
    toast.error("Email is required",toastOptions )
return false;
 }else if(password<5){
    toast.error("password must have more than  Character",toastOptions )
return false;
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
            <h1>Chatty</h1>
        </div>
        {/* username */}
        <input type="text"  
        name='username' 
        placeholder='username'
        onChange={e=>handleChanges(e)} 
         />
         {/* email */}
         <input type="email" 
        name='email' 
        placeholder='Email'
        onChange={e=>handleChanges(e)} 
         />
         {/* password */}
          <input type="password" 
        name='password' 
        placeholder='Password'
        onChange={e=>handleChanges(e)} 
         />
         {/* confirm password */}
          <input type="password" 
        name='confirmPassword' 
        placeholder='Confirm Password'
        onChange={e=>handleChanges(e)} 
         />
         <button type="submit">Create User</button> 
         <span>Already have  an account? <Link className='link' to="/login">Login</Link></span>


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
export default Register