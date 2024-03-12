import { styles } from '@/app/styles/style'
import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { GrClose } from 'react-icons/gr';
import * as Yup from 'yup';
import InputField from '../InputField/InputField';
import { encrypt } from '@/util/encryption';
import { useAppDispatch } from '@/app/hooks/useCustomRedux';
import { setRegistrationInfo } from '@/redux/features/auth/authSlice';
import { useRegistrationMutation } from '@/redux/features/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';

type Props = {
  handleClick: () => void,
  handleTabChange: (tab: string) => void,
}

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Minimum 2 characters")
    .max(30, "Maximum 30 characters")
    .required("Username is required"),
  email: Yup.string().email('Invalid email').required("Email is required"),
  password: Yup.string()
    .min(8, 'Minimum 8 characters' )
    .max(100 , 'Maximum 100 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/,
      "Require uppercase, lowercase, number, special character"
    ).required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], "Passwords must match")
    .required("Confirm password is required"),
});
const SignUp = (props: Props) => {
  const appDispatch = useAppDispatch();
  const [ register, { data , isSuccess , error }  ] = useRegistrationMutation();

  useEffect(() => {
    if( isSuccess){
      console.log(data);
    } else if(error && 'data' in error){
      console.log(error.data);
    }
  }, [ data , isSuccess , error ])

  const formik = useFormik({
    initialValues: { name: '' , email: '' , password: '' , confirmPassword: '' },
    validationSchema: schema,

    onSubmit: async({name , email , password }) => {
      const encrytedRegistrationInfo = encrypt(JSON.stringify({ name , password }));
      appDispatch(setRegistrationInfo(encrytedRegistrationInfo));
      await register({ email });
    },
  })
  const { errors , values , touched , handleChange , handleSubmit } = formik;
  return (
    <div className='flex justify-center items-center w-full h-full min-h-[100vh] relative bg-[#212121f0] z-1'>
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
              value={values.name}
              name='name'
              error={errors.name}
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
              name='confirmPassword'
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />
            <div className='w-full mt-5'>
              <input type="submit" className={`${styles.button} text-white bg-button-black`} value="Login"/>
            </div>
            <h5 className='text-center pt-3 font-Poppins text-[14px text-white'> 
              Already have an account?{" "}
              <button className='text-primary-red cursor-pointer' 
                onKeyDown={(e) => { if(e.key === 'Enter') { props.handleTabChange("login") } }} 
                onClick={() => props.handleTabChange("login")}>
                Login 
              </button>
          </h5>
        </form>
      </div>
    </div>
  )
}

export default SignUp