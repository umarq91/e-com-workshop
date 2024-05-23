import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/auth/authSlice'
import {useNavigate} from "react-router-dom"

function LoginPage() {
let [email,setEmail]=React.useState("")
let [password,setPassword]=React.useState("")
const dispatch= useDispatch()
const [loading,setLoading] = useState(false)
const [error,setError]=React.useState("")
const navigate= useNavigate()
const userInfo = useSelector((state)=>state.auth.userInfo)

// useEffect(()=>{
//   if(userInfo){
//     navigate('/')
//   }
// },[userInfo])

const handleLogin=async(e)=>{
    e.preventDefault()

try {
  setLoading(true)
  const res =   await axios.post(`${import.meta.env.VITE_BACKEND}/auth/sign-in`,{email,password})
  if(res.status==200){
    dispatch(login(res.data))
    setLoading(false)
     navigate('/')
  }
} catch (error) {
  setLoading(false)
  console.log(error.response.data.message);
  setError(error.response.data.message)
}
}

    return (
        <>
     
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-blye-900">
                Sign in to your account
              </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                          type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
    
                <div>
                  {/* <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                    <div className="text-sm">
                      <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                      </a>
                    </div>
                  </div> */}
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
    
                <div>
                  <button
                    type="submit"
                    disabled={loading && true}
                    onClick={handleLogin}
                    className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 `}
                  >
                    {loading ? 'Loading...' : 'Sign in'}
                  </button>
                  <p className='text-center text-red-600 font-bold pt-3'>{error && error}</p>
                </div>
              </form>
    
              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{' '}
                <a href="/sign-up" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                 Create an account
                </a>
              </p>
            </div>
          </div>
        </>
  )
}

export default LoginPage