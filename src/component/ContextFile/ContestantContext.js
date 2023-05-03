import { onAuthStateChanged, signOut } from "firebase/auth";
import {  collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { createContext, useCallback, useState } from "react";
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
    const [adminList, setAdminList] = useState([])
   
    //authenticated users
    const getAuthUsers = ()=>{
      onAuthStateChanged (auth, (currentUser) =>{
        setCurrentRegUser(currentUser);
      })
    
    }
  
    //retrieving current user details from registered db collection
  const getCurrentUserData = async()=>{
    const specificData = query(collection(db, "registered"), where("uid", "==", currentRegUser.uid));
      const querySnapshot = await getDocs(specificData);
    querySnapshot.forEach((doc) => {
      setUserDetails(doc.data()); 
    }); 
  }

  //retrieving current user details from registered db collection
  const getAdmin = async()=>{
    const specificData = query(collection(db, "registered"), where("category", "==", "admin"));
      const querySnapshot = await getDocs(specificData);
    querySnapshot.forEach((doc) => {
      setAdminList(querySnapshot.docs.map((doc) =>({
        ...doc.data(), id: doc.id
      }))); 
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
        const specificData = query(collection(db, "approvedContestants"));
          const querySnapshot = await getDocs(specificData);
        querySnapshot.forEach((doc) => {
          setApprovedContestUsestate(querySnapshot.docs.map((doc) =>({
            ...doc.data(), id: doc.id
          }))); 
        });  
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
          }).then(()=>{
            deleteContestant();
          })
           });
        } 
    
       }

        //delete contestants
        const deleteContestant =  useCallback (async() =>{  
          selectedData.map(async(val) =>{
          const deleteProductDocs = doc (contestCollectionRef, val.id);
            await deleteDoc (deleteProductDocs).then(()=>{
              window.location.reload(false);
            })
          })  
              
      });

       //vote
       const vote = async(val)=>{
          const userRef = doc(db, "approvedContestants", val.id);
          await updateDoc(userRef, {
            points: val.points + 10,
            
          }).then(()=>{
            window.location.reload(false);

          }).then(()=>{
            
            var voteList = JSON.parse(localStorage.getItem("vote-button") || "[]");
            // an object
            var iVoted = {
              id: val.id,
             };  

             voteList.push(iVoted)
             
           // save to localStorage
           localStorage.setItem("vote-button", JSON.stringify(voteList));
          })
       
      }
      
     //registered users
     const getRegisteredUsers = async()=>{
      const data = await getDocs(registerCollectionRef)  
      setRegisterList (data.docs.map((doc) =>({
        ...doc.data(),
         id: doc.id
         
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

         //grabbing contestant collection database
         const approvedContestantCollection = query(collection(db, "approvedContestants"), where("email", "==", currentRegUser.email));
         const queryApprovedContestantSnapshot = await getDocs(approvedContestantCollection);
         queryApprovedContestantSnapshot.forEach( async (doc) => {
     
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
                          vote, deleteContestant, getAdmin, adminList};
     
     return(
         <ContestantContext.Provider value ={allExports}>
             {props.children}
         </ContestantContext.Provider>
      )
 }

export default ContestantProvider;