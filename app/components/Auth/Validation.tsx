import { styles } from '@/app/styles/style';
import React, { useEffect, useRef, useState } from 'react'

type Props = {}

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

const Validation = (props: Props) => {
  const [ otp , setOtp ] = useState<string[]>(new Array(OTP_FIELD).fill(''));
  const inputRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    (inputRef.current[0] as any)?.focus();
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> , index: number) => {
    const value  = e.target.value;
    if( isNaN(Number(value))) return; 
    const newOtp = [...otp];
    newOtp[index] = value[ value.length - 1];
    setOtp(newOtp);

    if(!value) return 

    if( index < OTP_FIELD - 1 && inputRef.current[index + 1]  ){
      (inputRef.current[index + 1] as any)?.focus();
    }
  }

  const handleClick = (index:number) => {
    inputRef.current[index]?.setSelectionRange(1, 1);

    if(index > 0 && !otp[index - 1] ){
      inputRef.current[ otp.indexOf("")]?.focus();
    }
  } 

  return (
    <div className='flex justify-center items-center w-full h-full min-h-[100vh] relative bg-[#212121f0] z-1'>
      <div className='glassmorphism-login-container p-2 px-4 pop-up'>
        <div className='flex w-full items-center justify-center px-2 py-2 my-1'>
          <h1 className='text-xl font-bold text-white m-auto'>Join with <span style={{ color: 'hsla(0, 86%, 41%, 0.862)'}}>Food</span>Chilli</h1>
          {/* <button onClick={props.handleClick}> <GrClose /></button> */}
        </div>
        <form className='otp-form flex w-full items-center justify-center px-2 py-2 my-1 gap-2'>
          {
            otp.map((value:string , index:number) => (
              <input 
                key={index} 
                value={value} 
                ref={(input) => inputRef.current[index] = input! } 
                onChange={(e) => handleChange(e , index)}
                onKeyDown={(e) => handleKeyDown(e , index , inputRef , otp)}
                onClick={() => handleClick(index)}
                className={`${styles.input} w-[3.5rem] h-[3.5rem] p-4 px-4 text-center `}
                />
            ))
          }
        </form>
      </div>
    </div>
  )
}

export default Validation