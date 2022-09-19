import { motion } from 'framer-motion';
import { useState } from 'react';
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { SessionService } from '../services/session.service';
import { useDispatch } from 'react-redux';
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
  Main
} from './auth.styled';

const userObj = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
};

const isEmailVlalid = (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

const SignUp = () => {
  const [user, setUser] = useState(userObj);
  const [errors, setErrors] = useState({ ...userObj, isUnique: true });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  // const handleBlur = e  => {}

  const createUser = async (e) => {
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
      const data = await AuthService.createNewUser(user);
      if (data.data.token) {
        SessionService.saveSession(data.data.token);
        dispatch(setUser(data.data.data));
        navigate('/dashboard');
      } else {
        setErrors((prevErr) => ({ ...prevErr, isUnique: false }));
      }
    } catch (error) {
      console.log(error, 'ERRROR RE OHHHH');
    }
  };
  return (
    <AuthCon>
      <Col>
        <Form onSubmit={createUser}>
          <Label>
            First name
            <Input
              type="text"
              placeholder="Enter your name"
              value={user.firstName}
              name="firstName"
              onChange={handleChange}
            />
          </Label>
          <Label>
            Last name
            <Input
              type="text"
              placeholder="Enter your last name"
              value={user.lastName}
              name="lastName"
              onChange={handleChange}
            />
          </Label>
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
            <Btn>Sign in</Btn>
            <GoogleBtn>Sign in with Google</GoogleBtn>
          </BtnCon>
        </Form>
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

export default SignUp;
