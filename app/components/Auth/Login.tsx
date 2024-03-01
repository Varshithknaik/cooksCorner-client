import React, { useState } from 'react';
import "./Auth.css";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { GrClose } from "react-icons/gr";
import { styles } from '@/app/styles/style';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';


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
  const [ show , setShow ] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values)
    },
  });

  const { values , touched , errors , handleChange , handleSubmit} = formik;
  return (
    <div className='flex justify-center items-center w-full h-full min-h-[100vh] relative bg-[#2121218a]'>
      <div className='glassmorphism-login-container p-2 px-4 pop-up'>
        <div className='flex w-full items-center justify-center px-2 py-2 my-1'>
          <h1 className='text-xl font-bold text-white m-auto'>Login with <span style={{ color: 'hsla(0, 86%, 41%, 0.862)'}}>Food</span>Chilli</h1>
          <button onClick={props.handleClick}> <GrClose /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='flex relative flex-col mt-5 mb-1 input-container'>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input type='email' id='email' name='email' placeholder='loginmail@email.com' onChange={handleChange} value={values.email}
              className={`${errors.email && touched.email ? 'border-error-red' : 'border-[#2121218a]' } ${styles.input} `}/>
            {errors.email && touched.email && <span className='text-error-red text-sm'>{errors.email} </span>}
          </div>
          <div className='flex relative flex-col mt-5 mb-1 input-container'>
            <label htmlFor="email" className={styles.label}>Password</label>
            <input type={show ? 'text' : 'password'} id='password' name='password' placeholder='password' onChange={handleChange} value={values.password}
              className={`${errors.password && touched.password ? 'border-error-red' : 'border-[#2121218a]' } ${styles.input} `}/>
              {
                show ?
                  <AiOutlineEyeInvisible className='absolute left-[94%] top-[64%] cursor-pointer' onClick={() => setShow(!show)}/>
                    :
                  <AiOutlineEye className={`absolute cursor-pointer left-[94%] 
                    ${errors.password && touched.password ?'top-[50%]' : ' top-[64%]' } `} 
                    onClick={() => setShow(!show)}/>
              }
            {errors.password && touched.password && <span className='text-error-red text-sm'>{errors.password} </span>}
          </div>
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