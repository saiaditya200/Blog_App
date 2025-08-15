import {createContext,useState,useEffect} from 'react'
import axios from 'axios';

export const AllUsersContextObj = createContext()

function AllUsersContext({children}) {

  let [allUsers,setAllUsers] = useState([])
  let [error,setError] = useState('')

  async function getAllUsers(){
    try{
        let res = await axios.get(`http://localhost:3000/admin-api/allUsers`)
        if(res.data.message==="AllUsers"){
            setAllUsers(res.data.payload)
            setError('')
        }else{
            setError(res.data.message)
        }
    }catch(err){
        setError('Failed to fetch all users. Please try again...')
    }
  }

  useEffect(()=>{
    getAllUsers()
  },[])

  return (
    <AllUsersContextObj.Provider value={{allUsers,setAllUsers,error,setError}}>
        {children}
    </AllUsersContextObj.Provider>
  )
}

export default AllUsersContext