import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, fetchProductsBySearch } from '../../features/products/productSlice'
import { logout } from '../../features/auth/authSlice'
import axios from 'axios'
import { fetchCartAsync } from '../../features/cart/cartSlice'


const navigation = [
  { name: 'Dashboard', href: '/', current: true },

]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const [input,setInput] = useState("")
  const dispatch = useDispatch()
  const cart = useSelector(state=>state.cart.cart)
const navigate = useNavigate()

const user = useSelector((state)=>state.auth.userInfo)

const handleInput=(e)=>{
  let value = e.target.value
  setInput(value)

  setTimeout(()=>{
    if(input.length==0){
      dispatch(fetchProducts)
    }else{
      dispatch(fetchProductsBySearch(value))
    }    
  },3000)

}
  

const handleLogout =async()=>{
  await axios.get(`${import.meta.env.VITE_BACKEND}/auth/logout`)
if(status=200){
  dispatch(logout())
  window.location.reload()
}
}



  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
             
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Link  to={"/"} className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </Link>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
      <input type="text" className='h-8 text-black'  value={input} onChange={(e)=>handleInput(e)} />

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Link to="/cart" className="relative">
      <button
        type="button"
        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        <span className="sr-only">View cart</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
        {cart?.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex justify-center items-center text-xs">
            {cart?.length}
          </span>
        )}
      </button>
    </Link>

                {/* Profile dropdown */}

{user ? (
       <Menu as="div" className="relative ml-3">
       <div>
         <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
           <span className="absolute -inset-1.5" />
           <span className="sr-only">Open user menu</span>
           <img
             className="h-8 w-8 rounded-full"
             src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
             alt=""
           />
         </Menu.Button>
       </div>
       <Transition
         as={Fragment}
         enter="transition ease-out duration-100"
         enterFrom="transform opacity-0 scale-95"
         enterTo="transform opacity-100 scale-100"
         leave="transition ease-in duration-75"
         leaveFrom="transform opacity-100 scale-100"
         leaveTo="transform opacity-0 scale-95"
       >
         <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
           <Menu.Item>
             {({ active }) => (
               <Link
                 to="/profile"
                 className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
               >
                 Your Profile
               </Link>
             )}
           </Menu.Item>
           <Menu.Item>
             {({ active }) => (
               <Link
                 to="/orders"
                 className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
               >
                 orders
               </Link>
             )}
           </Menu.Item>
           <Menu.Item>
             {({ active }) => (
               <button
                 onClick={handleLogout}
                 className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
               >
                 Sign out
               </button>
             )}
           </Menu.Item>
         </Menu.Items>
       </Transition>
     </Menu>
): (
<button 
onClick={()=>navigate('/sign-in')}
className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 ml-2 px-4 rounded'>  Login</button>
)}
           
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
             
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}