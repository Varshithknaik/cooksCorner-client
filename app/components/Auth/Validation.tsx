import { useAppSelector } from '@/app/hooks/useCustomRedux';
import { styles } from '@/app/styles/style';
import { errorBlock } from '@/config/errorBlock';
import { useValidateUserMutation } from '@/redux/features/auth/authApiSlice';
import { selectRegistrationInfo } from '@/redux/features/auth/authSlice';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { GrClose } from 'react-icons/gr';
import { useSelector } from 'react-redux';

type Props = {
  handleClose: () => void;
  handleTabChange: (tab: string) => void
}

const OTP_FIELD = 6;

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number , inputRef: React.MutableRefObject<HTMLInputElement[]>, otp: string[]) => {
  const  keyCode  = e.key;
  const isBackspace = keyCode === 'Backspace';
  const isArrowLeft = keyCode === 'ArrowLeft';
  const isArrowNext = keyCode === 'ArrowRight';     

  if (isArrowLeft) inputRef.current[index - 1]?.focus();
  else if ( isArrowNext) inputRef.current[index + 1]?.focus();
  else if( isBackspace && !otp[index] ) inputRef.current[index - 1]?.focus();
}

const handleClick = (index:number, inputRef: React.MutableRefObject<HTMLInputElement[]>, otp: string[]) => {
  inputRef.current[index]?.setSelectionRange(1, 1);

  if(index > 0 && !otp[index] ){
    inputRef.current[ otp.indexOf("")]?.focus();
  }
} 

const Validation = (props: Props) => {
  const [ otp , setOtp ] = useState<string[]>(new Array(OTP_FIELD).fill(''));
  const inputRef = useRef<HTMLInputElement[]>([]);

  const [ validation , { error , isSuccess , isLoading }] = useValidateUserMutation();
  const registrationInfo = useSelector(selectRegistrationInfo);
  useEffect(() => {
    (inputRef.current[0] as any)?.focus();
  }, [])

  useEffect(() => {
    if(isSuccess) {
      toast.success('Registration Successful');
      props.handleTabChange('');
    }
    if(error){
      errorBlock(error);
    }
  }, [error, isSuccess, props])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> , index: number) => {
    const value  = e.target.value;
    if( isNaN(Number(value))) return; 
    const newOtp = [...otp];
    newOtp[index] = value.length > 2 ? value[ value.length - 1] : value ;
    setOtp(newOtp);
    if(!value) return 
    if( index < OTP_FIELD - 1 && inputRef.current[index + 1]  ){
      (inputRef.current[index + 1] as any)?.focus();
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      activationCode: otp.join(''),
      name: registrationInfo.name,
      password: registrationInfo.password
    }
    await validation(body);
  }

  return (
    <div className='flex justify-center items-center w-full h-full min-h-[100vh] relative bg-[#212121f0] z-10'>
      <div className='glassmorphism-login-container p-2 px-4 pop-up'>
        <div className='flex w-full items-center justify-center px-2 py-2 my-1'>
          <h1 className='text-xl font-bold text-white m-auto'>Join with <span style={{ color: 'hsla(0, 86%, 41%, 0.862)'}}>Food</span>Chilli</h1>
          <button onClick={props.handleClose}> <GrClose /></button>
        </div>
        <form onSubmit={handleSubmit} className='otp-form flex flex-col w-full items-center justify-center px-2 py-2 my-1 gap-2'>
          <div className='flex gap-2 px-2 py-2 my-1'>
            {
              otp.map((value:string , index:number) => (
                <input 
                  key={index} 
                  value={value ?? ''} 
                  ref={(input) => inputRef.current[index] = input! } 
                  onChange={(e) => handleChange(e , index)}
                  onKeyDown={(e) => handleKeyDown(e , index , inputRef , otp)}
                  onClick={() => handleClick(index , inputRef , otp)}
                  className={`${styles.input} w-[3.5rem] h-[3.5rem] p-4 px-4 text-center `}
                  />
              ))
            }
          </div>
          <div className='w-full mt-5'>
            <input type="submit" 
              disabled={isLoading}
              className={`${styles.button} text-white bg-button-black ${ isLoading ? 'opacity-40': '' }`} 
              value="Register"/>
          </div>
          <h5 className='text-center pt-3 font-Poppins text-[14px text-white'> 
              Already have an account?{" "}
              <button className='text-primary-red cursor-pointer' 
                onKeyDown={(e) => { if(e.key === 'Enter') { props.handleTabChange("login") } }} 
                onClick={() => props.handleTabChange("login")}>
                Sign In 
              </button>
          </h5>
        </form>
      </div>
    </div>
  )
}

export default Validation