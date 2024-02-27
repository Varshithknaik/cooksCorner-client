import React from 'react';
import "./Login.css";
import Yup from 'yup';

type Props = {}

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const Login = (props: Props) => {
  return (
    <div className='flex items-center justify-around w-full h-full min-h-[100vh] relative bg-primary'>
      <div className='image1'>cvfg</div>
      <div className='login-container'>
        dfddggggggggggggggg
      </div>
    </div>

  )
}

export default Login