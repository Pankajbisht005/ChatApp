
import { useContext, useEffect, useState } from "react"
import assets from "../../assets/assets"
import { logOut } from "../../config/Firebase"
import "./Rightsidebar.css"
import { AppContext } from "../../context/AppContext"

const Rightsidebar = () => {

  const {chatUser,messages} = useContext(AppContext);
  const [msgImages,setMsgImages] = useState([])
  useEffect(()=>{
   let tempVar = [];
   messages.map((msg)=>{
    if(msg.image) {
      tempVar.push(msg.image)
    }
   })
   setMsgImages(tempVar)
  },[messages])

  
  return chatUser ? (
    <div className="rs">
    <div className="rs-profile">
        <img src={chatUser.userData.avatar} alt=""/>
        <h3> {Date.now() - chatUser.userData.lastSeen <= 70000 ? <img src={assets.green_dot} className="dot" alt=""/> : null} {chatUser.userData.name}</h3>
        <p>{chatUser.userData.bio}</p>
    </div>
    <hr />
    <div className="rs-media">
        <p>Media</p>
        <div>
        {msgImages.map((url,index)=>(<img onClick={()=>window.open(url)} src={url} key={index} alt=""/>))}
    {/* <img src={assets.pic1} alt=""/>
    <img src={assets.pic2} alt=""/>
    <img src={assets.pic3} alt=""/>
    <img src={assets.pic4} alt=""/>
    <img src={assets.pic1} alt=""/> */}
        </div>
    </div>
   
      <button onClick={()=>logOut()}>LogOut</button>
    </div>
  )
  : (
    <div className="rs">
          <button onClick={()=>logOut()}>LogOut</button>
    </div>
  )
}

export default Rightsidebar
