// src/pages/ProtectedRoutes.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserInfo } from '../features/auth/authSlice';

function ProtectedRoutes({ children }) {
//   const userInfo = useSelector((state) => state.auth.userInfo);
//   const loading = useSelector((state) => state.auth.loading);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

// console.log("bahr");
// console.log(loading);
// // if(loading) return <div>Loading...</div>
// useEffect(() => {
// console.log("TEst")
// },[])

  return <div>{children}</div>;
}

export default ProtectedRoutes;
