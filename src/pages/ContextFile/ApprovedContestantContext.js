import { collection, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../../firebase-config/firebaseConfig";

 export const ApprovedUserContext = createContext();
 function ContestantListProvider (props){
    const[contestList, setContestList] = useState([]);
    const contestCollectionRef = collection(db, "contestants"); 
    const [selectedData, setSelectedData] = useState({
      checkedData:[]
    });
    
      //retrieving data from database
      const getContestants = async()=>{
        const data = await getDocs(contestCollectionRef)
        setContestList (data.docs.map((doc) =>({
          ...doc.data(), id: doc.id
        })))
      }

    //handling checkbox
    const checkboxHandleChange = (e, val) =>{
      const { checked, value } = e.currentTarget;   
      const approvedDataVariable = 
       {
         id: val.id,
         name: val.name,
         surname: val.surname,
         office: val.Office,
         politicalparty: val.politicalparty,
         points: val.points
       }
       const approvedValue = approvedDataVariable;
       const { checkedData } = selectedData;
      
     if (checked){
        setSelectedData({
          checkedData:[...checkedData, approvedValue]
         });
        }else if(!checked){
          setSelectedData({
            checkedData: checkedData.filter((e) => e !== approvedValue)
           });       
     }}

 
      const allExports = {contestList, getContestants, checkboxHandleChange, selectedData};
     
     return(
         <ApprovedUserContext.Provider value ={allExports}>
             {props.children}
         </ApprovedUserContext.Provider>
      )
 }

export default ContestantListProvider;