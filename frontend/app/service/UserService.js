import axios from "axios";
// const URL = `${process.env.REACT_APP_API}`
const URL = 'http://127.0.0.1:5000'

const login = async(model)=>{
    try{
        const response = await axios.post(`${URL}/login`,model)
        
        if (response.status === 200) {
            const { data } = response;
            const user = data.data
            // Check if the response contains a token
            if (user) {
              // Store the token in local storage or state based on your needs
              localStorage.setItem("token", JSON.stringify(user));
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
const isAuthenticated =  () => {
  const token =  JSON.parse(localStorage.getItem("token"));
  console.log(token)
  if(token && token !== "undefined" && token !== "null") return true

  return false

}
const logout =  () => {
  localStorage.removeItem('token');
}
export const getTokenData = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  if (token) {
    const tokenPayload = JSON.parse(atob(token.token.split('.')[1])); // Decodifica el payload de la token
    return tokenPayload;
  }
  return null;
};

export{
    login,
    isAuthenticated,
    logout
}


