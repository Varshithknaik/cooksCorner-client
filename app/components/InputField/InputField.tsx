import { styles } from '@/app/styles/style';
import React, { ForwardedRef, forwardRef, useEffect, useRef, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

type Props = {
  type: string,
  title: string,
  name: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  value: string;
  touched: boolean | undefined;
  error: string | undefined;
  autoComplete?: boolean
}

const InputField = forwardRef<HTMLInputElement, Props>((props: Props , ref: ForwardedRef<HTMLInputElement>) => {
  const [ show , setShow ] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if( ref && 'current' in ref ){
      ref.current?.focus();
    }
  },[ref] )

  return (
    <div className='flex relative flex-col mt-5 mb-1 input-container'>
        <label htmlFor = { props.name} className={styles.label}>{props.title}</label>
        <input type= {!show ? props.type : 'text'} 
          id= { props.name } 
          name={props.name} 
          placeholder= {props.placeholder} 
          onChange={props.onChange}
          value={props.value}
          ref={ref && 'current' in ref ? ref : inputRef}
          autoComplete={props.autoComplete ? 'on' : 'off'}
          className={`${props.error && props.touched ? 'border-error-red' : 'border-[#2121218a]' } ${styles.input} `}/>
        {props.error && props.touched && <span className='text-error-red text-sm'>{ props.error } </span>}
        { 
          !show    ?
          props.type == 'password' && <AiOutlineEyeInvisible className= {`absolute cursor-pointer left-[94%] 
            ${props.error && props.touched ?'top-[50%]' : ' top-[64%]' } `} onClick={() => setShow(!show)}/>
              :
          props.type == 'password' &&  <AiOutlineEye className={`absolute cursor-pointer left-[94%] 
              ${props.error && props.touched ?'top-[50%]' : ' top-[64%]' } `} 
              onClick={() => setShow(!show)}/>
        }
    </div>
  )
})

InputField.displayName = 'InputField';
export default InputField