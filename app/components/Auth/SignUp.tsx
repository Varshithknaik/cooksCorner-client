import { styles } from '@/app/styles/style'
import { useFormik } from 'formik';
import React from 'react'
import { GrClose } from 'react-icons/gr';
import * as Yup from 'yup';
import InputField from '../InputField/InputField';

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
  const formik = useFormik({
    initialValues: { username: '' , email: '' , password: '' , confirmPassword: '' },
    validationSchema: schema,

    onSubmit(values, formikHelpers) {
      console.log(values);
    },
  })

  const { errors , values , touched , handleChange , handleSubmit } = formik;

  return (
    <div className='flex justify-center items-center w-full h-full min-h-[100vh] relative bg-[#212121f0]'>
    <div className='glassmorphism-login-container p-2 px-4 pop-up'>
      <div className='flex w-full items-center justify-center px-2 py-2 my-1'>
        <h1 className='text-xl font-bold text-white m-auto'>Join with <span style={{ color: 'hsla(0, 86%, 41%, 0.862)'}}>Food</span>Chilli</h1>
        <button onClick={props.handleClick}> <GrClose /></button>
      </div>
      <form onSubmit={handleSubmit}>
         <InputField 
            type='text'
            title = 'Username'
            placeholder='Username'
            onChange={handleChange}
            value={values.username}
            name='username'
            error={errors.username}
            touched={touched.email}
          />
          <InputField 
            type='email'
            title='Email'
            placeholder='Email'
            onChange={handleChange}
            value={values.email}
            name='email'
            error={errors.email}
            touched={touched.email}
          />
          <InputField 
            type='password'
            title='Password'
            placeholder='Password'
            onChange={handleChange}
            value={values.password}
            name='password'
            error={errors.password}
            touched={touched.password}
          />
          <InputField 
            type='password'
            title='Confirm Password'
            placeholder='Confirm Password'
            onChange={handleChange}
            value={values.confirmPassword}
            name='confirmpassword'
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
          />
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