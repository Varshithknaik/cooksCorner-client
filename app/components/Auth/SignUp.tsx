import { styles } from '@/app/styles/style'
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { GrClose } from 'react-icons/gr';
import * as Yup from 'yup';

type Props = {
  handleClick: () => void,
  handleTabChange: (tab: string) => void,
}

const schema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Minimum 2 characters")
    .max(30, "Maximum 30 characters")
    .required("Username is required"),
  email: Yup.string().email('Invalid email').required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], "Passwords must match")
    .required("Confirm password is required"),
});

const SignUp = (props: Props) => {
  const [ show , setShow ] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: { username: '' , email: '' , password: '' , confirmPassword: '' },
    validationSchema: schema,

    onSubmit(values, formikHelpers) {
      console.log(values);
    },
  })

  const { errors , values , touched , handleChange , handleSubmit } = formik;

  return (
    <div className='flex justify-center items-center w-full h-full min-h-[100vh] relative bg-[#2121218a]'>
    <div className='glassmorphism-login-container p-2 px-4 pop-up'>
      <div className='flex w-full items-center justify-center px-2 py-2 my-1'>
        <h1 className='text-xl font-bold text-white m-auto'>Join with <span style={{ color: 'hsla(0, 86%, 41%, 0.862)'}}>Food</span>Chilli</h1>
        <button onClick={props.handleClick}> <GrClose /></button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='flex relative flex-col mt-5 mb-1 input-container'>
          <label htmlFor = "username" className={styles.label}>Username</label>
          <input type='username' id='username' name='username' placeholder='loginmail@email.com' onChange={handleChange} value={values.username}
            className={`${errors.username && touched.username ? 'border-error-red' : 'border-[#2121218a]' } ${styles.input} `}/>
          {errors.username && touched.username && <span className='text-error-red text-sm'>{errors.username} </span>}
        </div>
        <div className='flex relative flex-col mt-5 mb-1 input-container'>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input type='email' id='email' name='email' placeholder='loginmail@email.com' onChange={handleChange} value={values.email}
            className={`${errors.email && touched.email ? 'border-error-red' : 'border-[#2121218a]' } ${styles.input} `}/>
          {errors.email && touched.email && <span className='text-error-red text-sm'>{errors.email} </span>}
        </div>
        <div className='flex relative flex-col mt-5 mb-1 input-container'>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input type={show ? 'text' : 'password'} id='password' name='password' placeholder='password' onChange={handleChange} value={values.password}
            className={`${errors.password && touched.password ? 'border-error-red' : 'border-[#2121218a]' } ${styles.input} `}/>
            {
              !show ?
                <AiOutlineEyeInvisible className= {`absolute cursor-pointer left-[94%] 
                ${errors.password && touched.password ?'top-[50%]' : ' top-[64%]' } `} onClick={() => setShow(!show)}/>
                  :
                <AiOutlineEye className={`absolute cursor-pointer left-[94%] 
                  ${errors.password && touched.password ?'top-[50%]' : ' top-[64%]' } `} 
                  onClick={() => setShow(!show)}/>
            }
          {errors.password && touched.password && <span className='text-error-red text-sm'>{errors.password} </span>}
        </div>
        <div className='flex relative flex-col mt-5 mb-1 input-container'>
          <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
          <input type={'password'} id='confirmPassword' name='confirmPassword' placeholder='confirmPassword' onChange={handleChange} value={values.confirmPassword}
            className={`${errors.confirmPassword && touched.confirmPassword ? 'border-error-red' : 'border-[#2121218a]' } ${styles.input} `}/>
          {errors.confirmPassword && touched.confirmPassword && <span className='text-error-red text-sm'>{errors.confirmPassword} </span>}
        </div>
        <div className='w-full mt-5'>
          <input type="submit" className={`${styles.button} text-white bg-button-black`} value="Register"/>
        </div>
        <h5 className='text-center pt-3 font-Poppins text-[14px text-white'> 
            Already have an account?{" "}
            <span className='text-primary-red cursor-pointer' onClick={() => props.handleTabChange("login")}>
              Login 
            </span>
        </h5>
      </form>
    </div>
  </div>
  )
}

export default SignUp