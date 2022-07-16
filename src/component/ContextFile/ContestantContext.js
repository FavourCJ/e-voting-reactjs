import { onAuthStateChanged, signOut } from "firebase/auth";
import { addDoc, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { createContext, useState } from "react";
import { auth, db } from "../../firebase-config/firebaseConfig";

 export const ContestantContext = createContext();
 function ContestantProvider (props){
  
    const[contestList, setContestList] = useState([]);
    const[registerList, setRegisterList] = useState ([]);
    const [approvedContestUsestate, setApprovedContestUsestate] = useState([]);
    const contestCollectionRef = collection(db, "contestants"); 
    const registerCollectionRef = collection(db, "registered");
    const approvedCollectionRef = collection(db, "approvedContestants");
    const [selectedData, setSelectedData] = useState([]);
    const [userDetails, setUserDetails] = useState([]);
    const [currentRegUser, setCurrentRegUser] = useState ({});
   
    //authenticated users
    const getAuthUsers = ()=>{
      onAuthStateChanged (auth, (currentUser) =>{
        setCurrentRegUser(currentUser);
      })
    
    }
  
    //retrieving current user details from registered db collection
  const getCurrentUserData = async()=>{
    const specificData = query(collection(db, "registered"), where("uid", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(specificData);
    querySnapshot.forEach((doc) => {
      setUserDetails(doc.data()); 
    }); 
  }

      //retrieving data from database
      const getContestants = async()=>{
        const data = await getDocs(contestCollectionRef)
        setContestList (data.docs.map((doc) =>({
          ...doc.data(), id: doc.id
        })))
      }

    //handling checkbox
    const checkboxHandleChange = (e, val) =>{
      const { checked } = e.target;  
       
     if (checked){
      setSelectedData([
        ...selectedData,
        {
          id: val.id,
          email: val.email,
          name: val.name,
          surname: val.surname,
          office: val.Office,
          politicalparty: val.politicalparty,
          points: val.points
        },
      ]);   
        }
        
        else if(!checked){
          setSelectedData(
            selectedData.filter((data) => data.id !== val.id)
          );          
     }
    
    }
  
      //registered users
      const getApprovedContestants = async()=>{
        const data = await getDocs(approvedCollectionRef)  
        setApprovedContestUsestate (data.docs.map((doc) =>({
          ...doc.data(), 
            id: doc.id
        })))
      } 

      // inserting approved data to approvedContestants collection
      const setApprovedContestantsFunc = async()=>{      
        if (selectedData.length != 0){
          selectedData.map(async(val)=>{     
            await setDoc(doc(db, 'approvedContestants', val.id), {
              firstname: val.name,
              lastname: val.surname,
              Office: val.office,
              politicalparty: val.politicalparty,
              email: val.email,
              uid: val.id,
              points: val.points,
          })
           });
        } 
    
       }
      
     //registered users
     const getRegisteredUsers = async()=>{
      const data = await getDocs(registerCollectionRef)  
      setRegisterList (data.docs.map((doc) =>({
        ...doc.data(), id: doc.id
      })))
    } 

     //contestants list
    const geContestants = async()=>{
        const data = await getDocs(contestCollectionRef)
        setContestList (data.docs.map((doc) =>({
          ...doc.data(), id: doc.id
        })))
      }

      //check if user has already applied
      const userAlreadyApplied = async()=>{
          //grabbing contestant collection database
        const contestantCollection = query(collection(db, "contestants"), where("email", "==", currentRegUser.email));
        const queryContestantSnapshot = await getDocs(contestantCollection);
        queryContestantSnapshot.forEach( async (doc) => {
    
          if (doc.data().email === currentRegUser.email){
            window.localStorage.setItem("contest-success", "true");
          }
          else if (doc.data().email !== currentRegUser.email){
            window.localStorage.setItem("contest-success", "false");
          }
        })

      }

    //log user out
    const logout = () =>{
      signOut(auth).then(() =>{
        localStorage.setItem('category',"no-user") 
      })
    }
 
      const allExports = {contestList, getContestants, checkboxHandleChange, 
                          selectedData, getRegisteredUsers, geContestants,
                          registerList, approvedContestUsestate,
                          getCurrentUserData, userDetails, getAuthUsers, currentRegUser,
                          logout, userAlreadyApplied, getApprovedContestants, setApprovedContestantsFunc,
                          };
     
     return(
         <ContestantContext.Provider value ={allExports}>
             {props.children}
         </ContestantContext.Provider>
      )
 }

export default ContestantProvider;