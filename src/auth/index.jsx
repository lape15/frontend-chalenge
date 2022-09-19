import { Main } from './auth.styled';
import SignUp from './sign_up';
import { Route, Routes } from 'react-router-dom';
import Login from './sign_in';

export const AuthIndex = () => {
  return (
    <Main>
      <Routes>
        <Route index element={<SignUp />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </Main>
  );
};
