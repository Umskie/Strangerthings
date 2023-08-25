
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const COHORT_NAME = '2305-FTB-ET-WEB-PT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`



export default function Register () {

    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");

    const [usernameerror, setusernameerror] = useState(null);
    const [passworderror, setpassworderror] = useState(null);

    const navigate = useNavigate();
    

    const registerUser = async (event) => {
        event.preventDefault();

        if (username.length < 6) {
            setusernameerror("Username must be at least 6 characters in length");
            return;
          } else {
            setusernameerror(null);
          }
          
          // form validation: password
          if (password.length < 8) {
            setpassworderror("Password must be at least 8 characters in length");
            return;
          } else {
            setpassworderror(null);
          }

    try {
        const response = await fetch(
          `${BASE_URL}/users/register`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user: {
              username: username,
              password: password
            }
          })})
        ;
        const result = await response.json();
        console.log(result)
            navigate('/login');
    
        return result
      } catch (err) {
        console.error(err);
        
      }    
};

return(
    <>
    <div>
<h2>Don't have an account? Sign Up</h2>
 <form
 method="POST"
 onSubmit={registerUser} 
        onClick={() => {
            setusername(username)
        }}>
<label>
    Create Username:{""}
    <input 
        placeholder='Create Username'
        value = {username}
        
         onChange={(e)=> 
        setusername(e.target.value)} />
</label>
{usernameerror && <p style={{ color: "red"}}>{usernameerror}</p>} 

<label >
        Create Password:{""}
         <input 
         placeholder='Create Password'
         type='password'
         value={password}
         onChange={(e)=> 
         setpassword(e.target.value)}/>
      </label>
    
         {passworderror && <p style={{ color: "red"}}>{passworderror}</p>}

         <button  type='Submit' style=
            {{width: "80px", height: "37px", padding: "10px", 
            fontSize:"15px"}}
           
            //onClick={() => {
             //   navigate('/login');
            //}}
            >Register</button>
        
 </form>
 </div>
         </>
 );
}
Register;


