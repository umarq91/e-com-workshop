import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

function ProtectedRoutes({children}) {


    const userInfo = useSelector((state)=>state.auth.userInfo)


    useEffect(()=>{
        if(!userInfo){
            // window.location.href="/sign-in"
            console.log("Hi");
        }
    },[])

  return (
    <div>
        {children}
    </div>
  )
}

export default ProtectedRoutes