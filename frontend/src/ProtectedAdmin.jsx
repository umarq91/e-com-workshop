import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedAdmin({ children }) {
  const user = useSelector((state)=>state.auth.userInfo);
  const loading = useSelector((state) => state.auth.loading);
console.log(loading);

  if (  !loading&& !user) {
    return <Navigate to="/sign-in" replace={true}></Navigate>;
  }
  if (user && !user.isAdmin) {
    return <Navigate to="/" replace={true}></Navigate>;
  }
  return children;
}

export default ProtectedAdmin;