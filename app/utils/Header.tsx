'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import headerImage from "../../public/pexels-yente-van-eynde-2403392.jpg";
import Link from 'next/link';
import NavItems from './NavItems';
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import { IoIosLogIn } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import Login from '../components/Login/Login';
type Props = {
  title: string;
  landingPage?: boolean
}

const Header = (props: Props) => {
  const [ openSidebar , setOpenSidebar ] = useState<boolean>(false);
  const [ tab , setTab ] = useState<string>("");

  const handleClose = () => {
    setOpenSidebar(false);

  }

  const handleClick = () => {
    setTab("");
  }

  const handleTabChange = ( tab: string) => {
    setTab(tab);
  }

  return (
    <> 
      <div className='absolute top-0 left-0 w-full h-24 z-[1] header-nav'>
        <header>
          <nav className = "flex justify-between items-center py-2 1200px:px-12 px-6">
            <Link
                href={"/"} passHref
                className={`text-[25px] font-Poppins font-[600] cursor-pointer text-white`}
              >
                <span style={{ color: 'hsla(0, 86%, 41%, 0.862)'}}>Food</span>Chilli
            </Link>
            <NavItems isMobile= {false}/>
            <div>
              <HiOutlineUserCircle
                size={25}
                className={
                  "hidden 800px:block cursor-pointer text-white"
                }
                onClick={() => setTab('login')}
                />
                <div className="800px:hidden">
                  <HiOutlineMenuAlt3
                    size={25}
                    className={"cursor-pointer text-white"}
                    onClick={() => setOpenSidebar(true)}
                  />
                </div>
            </div>
          </nav>
          {
            openSidebar && (
              <button onBlur={handleClose} onClick={handleClose} onKeyDown={handleClose} tabIndex={0} 
                className={`h-[27.5rem] w-[80%] max-w-[20rem] fixed top-0 right-0 z-[999] 800px:hidden flex flex-col p-8 pt-10
                  items-center bg-[#240c0099]`}>
                  <Link
                      href={"/"} passHref
                      className={`text-[25px] font-Poppins font-[600] cursor-pointer text-white`}
                    >
                      <span className='text-primary-red'>Food</span>Chilli
                  </Link>
                  <NavItems isMobile= {true}/>
                  <hr className='h-[1px] w-full size-1 mt-2 pt-2'/>
                  <button className='flex w-full items-center justify-center text-white p-1 m-1' 
                    onClick={() => setTab('login')}>
                    <IoIosLogIn size={25} className='mr-2'/>
                    <span >Login</span>
                  </button>
                  <button className='flex w-full items-center justify-center text-white p-1 m-1'
                    onClick={() => setTab('login')}>
                    <IoIosLogOut size={25} className='mr-2'/>
                    <span>Logout</span>
                  </button>
              </button>
            )
          }      
        </header>
      </div>
      <div className='flex w-full text-white'>
        <div className='background-image'>
          <Image src={headerImage} alt='header'/>
        </div>
        <div className = "header-content-wrapper">
          {
            props.landingPage ?
            <div>Some big name</div>
            : <h1> {props.title} </h1>
          }
        </div>
      </div>
      {
        tab === 'login' && (
          <Login handleClick={handleClick} handleTabChange={handleTabChange}/>
        )
      }
    </>

  )
}

export default Header