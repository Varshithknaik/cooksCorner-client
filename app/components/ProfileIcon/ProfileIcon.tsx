import { useAppSelector } from '@/app/hooks/useCustomRedux'
import { useLogoutMutation } from '@/redux/features/auth/authApiSlice';
import { selectUser } from '@/redux/features/auth/authSlice';
import Image from 'next/image';
import React from 'react'

type Props = {}

const ProfileIcon = (props: Props) => {
  const user = useAppSelector(selectUser) as any;
  const [ logout ] = useLogoutMutation({});
  return (
    <>  
      {
        user?.avatar?.url ? (
          <Image 
            width={120} 
            height={120} 
            src={user.avatar.url} 
            alt={'user'}
            className={'w-[30px] h-[30px] 800px:w-[40px] 800px:h-[40px] cursor-pointer rounded-full'}
            onClick={() => logout({})}/>
        ) : 
        (
          <div className='w-[30px] h-[30px] 800px:w-[40px] 800px:h-[40px] cursor-pointer rounded-full bg-[wheat] flex items-center justify-center'
            onClick={() => logout({})}>
              <span className='w-full h-full text-center text-[1.5rem] font-bold'>{user?.name?.slice(0,2)}</span>
          </div>
        )
      }
    </>
  )
}

export default ProfileIcon