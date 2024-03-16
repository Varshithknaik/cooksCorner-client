import React, { useEffect, useRef } from 'react';
import "./Auth.css";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { GrClose } from "react-icons/gr";
import { styles } from '@/app/styles/style';
import InputField from '../InputField/InputField';
import { useLoginMutation } from '@/redux/features/auth/authApiSlice';
import toast from 'react-hot-toast';
import { errorBlock } from '@/config/errorBlock';


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
  const [ login , { data , isSuccess , error , isLoading } ] = useLoginMutation();
  const emailRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    emailRef.current?.focus();
  }, [])
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: schema,
    onSubmit: async ({ email , password }) => {
      await login({ email , password });
    },
  });

  useEffect(() => {
    if( isSuccess){
      console.log(data);
      toast.success('Login Successful');
      props.handleTabChange('')
    } 
    if(error){
      errorBlock(error);
    }
  }, [data, isSuccess, error, props])

  const { values , touched , errors , handleChange , handleSubmit} = formik;
  return (
    <div className='flex justify-center items-center w-full h-full min-h-[100vh] relative bg-[#212121f0] z-10'>
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
            ref={emailRef}
            autoComplete = {false}
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
            autoComplete = {false}
          />

          <div className='w-full mt-5'>
            <input type="submit" 
              disabled={isLoading}
              className={`${styles.button} text-white bg-button-black ${ isLoading ? 'opacity-40': '' }`} 
              value="Login"
              />
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