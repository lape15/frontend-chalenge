import { motion } from 'framer-motion';
import { useState } from 'react';
import AuthService from '../services/auth.service';
import { Link, useNavigate } from 'react-router-dom';
import { SessionService } from '../services/session.service';
import { useDispatch } from 'react-redux';
import { doSetUser } from '../store/user';
import {
  AuthCon,
  Ball,
  Btn,
  BtnCon,
  Col,
  Col2,
  Form,
  GoogleBtn,
  Input,
  Label,
  Other,
  OtherWrapper
} from './auth.styled';

const userObj = {
  email: '',
  password: ''
};
const isEmailVlalid = (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

const Login = () => {
  const [user, setUser] = useState(userObj);
  const [errors, setErrors] = useState({ ...userObj });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const keys = Object.keys(user);
    const userError = {};
    keys.reduce((acc, inc) => {
      if (!user[inc]) acc[inc] = `Please enter your ${inc.toLocaleLowerCase()} `;
      if (inc === 'email' && !isEmailVlalid(user[inc])) {
        userError.email = 'email address must be a valid one!';
      }
      return acc;
    }, userError);
    if (Object.values(userError).length > 0) {
      setErrors({ ...userError });
      return;
    }
    try {
      const data = await AuthService.signInUser(user);
      console.log(data.data);
      if (data.data.token) {
        SessionService.saveSession(data.data.token);

        dispatch(doSetUser(data.data.data));
        navigate('/dashboard');
      } else {
        setErrors((prevErr) => ({ ...prevErr, isUnique: false }));
      }
    } catch (error) {
      console.log(error.response, 'ERRROR RE OHHHH');
    }
  };
  const signUpwithGoogle = async () => {
    window.open(`${import.meta.env.VITE_CONNECT_API}login/federated/google`);
  };

  return (
    <AuthCon>
      <Col>
        <Form onSubmit={loginUser}>
          <Label>
            Email
            <Input
              type="email"
              placeholder="Enter your email"
              value={user.email}
              name="email"
              onChange={handleChange}
            />
          </Label>
          <Label>
            Password
            <Input
              type="password"
              placeholder="Enter password"
              value={user.password}
              name="password"
              onChange={handleChange}
            />
          </Label>
          <BtnCon>
            <Btn type="submit">Sign in</Btn>
            <GoogleBtn type="button" onClick={signUpwithGoogle}>
              Sign in with Google
            </GoogleBtn>
          </BtnCon>
        </Form>
        <OtherWrapper>
          <Other>
            Don&apos;t have an account?&nbsp; <Link to="/">Sign up</Link>
          </Other>
        </OtherWrapper>
      </Col>
      <Col2>
        <Ball
          as={motion.div}
          initial={{ y: -150 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
        />
      </Col2>
    </AuthCon>
  );
};

export default Login;
