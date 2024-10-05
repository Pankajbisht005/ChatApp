
import "./Chat.css"
import Leftsidebar from '../../components/Leftsidebar/Leftsidebar'
import Chatbox from '../../components/Chatbox/Chatbox'
import Rightsidebar from '../../components/Rightsidebar/Rightsidebar'
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context/AppContext"

const Chat = () => {

  const{chatData,userData}= useContext(AppContext)
  const[loading,setLoading]=useState(true)

  useEffect(()=>{
    if(chatData && userData){
      setLoading(false)
    }
  },[chatData,userData])
  return (
    <div className='chat'>
    {
      loading
        ?<p className="loading">loading....</p>
        :<div className='chat-container'>
       <Leftsidebar />
       <Chatbox />
       <Rightsidebar />
    </div>
    }
 
      
    </div>
  )
}

export default Chat
