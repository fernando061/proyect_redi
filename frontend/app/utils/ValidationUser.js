export const validateName = (name) => {
    if (!name.trim()) {
      return "Name is required";
    }
    return "";
  };
  
  export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      return "Email is required";
    } else if (!emailRegex.test(email)) {
      return "Invalid email address";
    }
    return "";
  };
  
  export const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };
  
  export const validateNationality = (nationality) => {
    if (nationality === "") {
      return "Please select a nationality";
    }
    return "";
  };
  