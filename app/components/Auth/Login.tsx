import React, { useState } from 'react';
import "./Auth.css";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { GrClose } from "react-icons/gr";
import { styles } from '@/app/styles/style';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import InputField from '../InputField/InputField';


type Props = {
  handleClick: () => void,
  handleTabChange: (tab: string) => void,
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const Login = (props: Props) => {

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values)
    },
  });

  const { values , touched , errors , handleChange , handleSubmit} = formik;
  return (
    <div className='flex justify-center items-center w-full h-full min-h-[100vh] relative bg-[#212121f0]'>
      <div className='glassmorphism-login-container p-2 px-4 pop-up'>
        <div className='flex w-full items-center justify-center px-2 py-2 my-1'>
          <h1 className='text-xl font-bold text-white m-auto'>Login with <span style={{ color: 'hsla(0, 86%, 41%, 0.862)'}}>Food</span>Chilli</h1>
          <button onClick={props.handleClick}> <GrClose /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <InputField 
            type="email" 
            name="email" 
            title= 'Email'
            placeholder="Email" 
            value={values.email} 
            onChange={handleChange} 
            error={errors.email} 
            touched={touched.email} 
          />
          <InputField 
            type='password'
            name="password" 
            title= 'Password'
            placeholder="Password" 
            value={values.password} 
            onChange={handleChange} 
            error={errors.password} 
            touched={touched.password} 
          />

          <div className='w-full mt-5'>
            <input type="submit" className={`${styles.button} text-white bg-button-black`} value="Login"/>
          </div>
          <h5 className='text-center pt-3 font-Poppins text-[14px text-white'> 
            Don&rsquo;t have an account?{" "}
              <span className='text-primary-red cursor-pointer' onClick={() => props.handleTabChange("signup")}>
                Sign Up 
              </span>
          </h5>
        </form>
      </div>
    </div>

  )
}

export default Login