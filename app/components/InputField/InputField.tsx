import { styles } from '@/app/styles/style';
import React, { useState } from 'react'
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
}

const InputField = (props: Props) => {
  const [ show , setShow ] = useState<boolean>(false);
  return (
    <div className='flex relative flex-col mt-5 mb-1 input-container'>
        <label htmlFor = { props.name} className={styles.label}>{props.title}</label>
        <input type= {show ? props.type : 'text'} id= { props.name } name={props.name} placeholder= {props.placeholder} onChange={props.onChange} value={props.value}
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
}

export default InputField