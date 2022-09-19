import { Routes, Route } from 'react-router-dom';
import WalletPage from '../wallet';
import ProtectedRoute from './protected';
import { useSelector } from 'react-redux';
import { AuthIndex } from '../auth';

const protectedRoutes = [
  {
    path: 'dashboard',
    element: <WalletPage />
  }
];

const RoutesConfig = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <Routes>
      <Route index element={<AuthIndex />} path="/*" />

      {/* <Route index element={<SignUp />} />
      <Route path="login" element={<Login />} /> */}
      {protectedRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            <ProtectedRoute redirectPath={'/'} allowed={user !== null}>
              {route.element}
            </ProtectedRoute>
          }
        />
      ))}
    </Routes>
  );
};

export default RoutesConfig;
