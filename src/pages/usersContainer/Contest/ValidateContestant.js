export const validateContestant = (contestValue) =>{
    let contestError = {};

    if (!contestValue.name){
        contestError.name = "Your first name is required"
    }else if (!/^[a-zA-Z]*$/.test(contestValue.name)){
        contestError.name = "Name should not contain number or any special character or spaces"
    }else if(contestValue.name.length < 3){
        contestError.name = "First name should be atleast 3"
  }

  if(!contestValue.surname){
    contestError.surname = "Surname is required"
  }else if (!/^[a-zA-Z- ]*$/.test(contestValue.surname)){
    contestError.surname = "Name should not contain number or any special character except hyphen (-)"
}else if(contestValue.surname.length < 3){
    contestError.surname = "First name should be atleast 3"
}

  if (!contestValue.party){
    contestError.party = "Political Party name is required"
  }else if (!/^[A-Za-z0-9 ]+$/.test(contestValue.party)){
    contestError.party = "Political Party name should contain only  letters and numbers";
  }
  else if (contestValue.party.length < 3 ){
    contestError.party = "Party name must be atleast 3 characters"
  }

  if (!contestValue.politicalOffice){
    contestError.politicalOffice = "Please select the political office you would like to contest for."
  }
  return contestError;
}