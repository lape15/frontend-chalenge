import { Routes, Route } from 'react-router-dom';
import WalletPage from '../wallet';
import ProtectedRoute from './protected';
import { useSelector } from 'react-redux';
import { AuthIndex } from '../auth';
import { useEffect, useState } from 'react';
import { SessionService } from '../services/session.service';

const protectedRoutes = [
  {
    path: 'dashboard',
    element: <WalletPage />
  }
];

const RoutesConfig = () => {
  const userObj = useSelector((state) => state.user.user);
  const [user, setUser] = useState(SessionService.getSession());

  useEffect(() => {
    setUser(SessionService.getSession());
  }, [userObj]);

  return (
    <Routes>
      <Route index element={<AuthIndex />} path="/*" />

      {protectedRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            <ProtectedRoute redirectPath={'/login'} allowed={user ? true : false}>
              {route.element}
            </ProtectedRoute>
          }
        />
      ))}
    </Routes>
  );
};

export default RoutesConfig;
