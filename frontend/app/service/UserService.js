
import axios from "axios";
// const URL = `${process.env.REACT_APP_API}`
const URL = 'http://127.0.0.1:5000'

const login = async(model)=>{
    try{
        const response = await axios.post(`${URL}/login`,model)
        
        if (response.status === 200) {
            const { data } = response;
            const {token} = data.data
            // Check if the response contains a token
            if (token) {
              // Store the token in local storage or state based on your needs
              localStorage.setItem("token", token);
              console.log("Login successful");
    
              // Close the form after performing the action
            //   onClose();****
            } else {
              console.error("Error in login: Token not found");
              throw new Error("Error in login. Please try again.");
            }
        }
    }
    catch (error) {
        // Handle request errors
        if(error.response.status && error.response.status === 401){
            console.log(error.response.data.error)
            throw  new Error(error.response.data.error)
        }
    
      console.error("Error in request:", error);
      throw new Error("Error in request. Please try again.");
    }
}

export{
    login,
}

