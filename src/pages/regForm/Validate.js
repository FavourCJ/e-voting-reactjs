
export const Validate = (values) =>{
  let error = {};

  if (!values.fullname){
      error.fullname = "Your full name is required"
  }else if (!/^[a-zA-Z ]*$/.test(values.fullname)){
      error.fullname = "Name should not contain number or any special character"
  }else if(values.fullname.length < 5){
    error.fullname = "Full name should be atleast 5"
}

if (!values.email){
    error.email = "Email is required"
}else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(values.email)){
    error.email = "Email is invalid"
}

if (!values.passportNum){
    error.passportNum = "Passport Number is required"
}else if (!/^[A-Za-z0-9]+$/.test(values.passportNum)){
  error.passportNum = "Passport Number should contain only  letters and numbers";
}
else if (values.passportNum.length < 9 || values.passportNum.length>9){
  error.passportNum = "Passport Number must be 9 characters"
}
if (!values.password){
    error.password = "Pasword is required"
  }else if (values.password.length < 8 || values.password.length >12){
    error.password = "Password must be atleast 8 characters and less than 13";
  }

if(!values.category){
    error.category = "Select one category";
}
  return error;
}

export const validateLogin = (loginValues) =>{
  let loginError = {};

  if(!loginValues.loginEmail){
    loginError.loginEmail ="Email is required"
  }else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(loginValues.loginEmail)){
    loginError.loginEmail = "Email is invalid"
}

  if(!loginValues.loginPassword){
    loginError.loginPassword = "Password is required"
  }

  return loginError;
}
