import React, {useState, useEffect} from "react";



const COHORT_NAME = '2305-FTB-ET-WEB-PT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

export default function Users({ user, setuser}) {

 

    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
    const myData = async (event) => {
        event.preventDefault();

        try {
          const response = await fetch(`${BASE_URL}/users/me`, {

          
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${TOKEN_STRING_HERE}`
            },
          });
          const result = await response.json();
          setuser(result.user)
          console.log(result.user);
          return result
        } catch (err) {
          console.error(err);
        }
       
      }
      myData;
    }, []);

    return (
        <>
      
     
 
        </>
   );
}
Users