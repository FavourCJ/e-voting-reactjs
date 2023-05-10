
export const Validate = (values) =>{
  let error = {};

  if (!values.firstname){
      error.firstname = "First name is required"
  }else if (!/^[a-zA-Z]*$/.test(values.firstname)){
      error.firstname = "Name should not contain number or any special character or spaces"
  }else if(values.firstname.length < 2){
    error.firstname = "First name should be atleast 2"
}

if (!values.lastname){
  error.lastname = "Last name is required"
}else if (!/^[a-zA-Z- ]*$/.test(values.lastname)){
  error.lastname = "Name should not contain number or any special character except hyphen (-)"
}else if(values.lastname.length < 2){
error.lastname = "Last name should be atleast 2"
}

if (!values.email){
    error.email = "Email is required"
}else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(values.email)){
    error.email = "Email is invalid"
}else if (values.category === "admin"){
  if (!/^\w+([.-]?\w+)*@favourcj.com$/.test(values.email)){
     error.email = "Email must end with @favourcj.com for Admin account"
 }
}

if (!values.password){
    error.password = "Pasword is required"
  }else if (values.password.length < 8 || values.password.length >12){
    error.password = "Password must be atleast 8 characters and less than 13";
  }

  if (!values.confirmP){
    error.confirmP = "Pasword is required"
  }else if (values.confirmP != values.password){
    error.confirmP = "Password does not match";
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
