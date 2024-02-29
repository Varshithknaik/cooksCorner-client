import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

type Props = {
  isMobile: boolean
}

const navItems = [
  {
    name: "Home",
    link: "/"
  },
  {
    name: "About Us",
    link: "/about",
  },
  {
    name: "Product",
    link: "/product"
  },
  {
    name: "Recipes",
    link: "/recipes"
  },
  {
    name: "Blog",
    link: "/blog"
  },
  {
    name: "Contact",
    link: "/link"
  }
]

const NavItems = (props: Props) => {
  const pathname = usePathname();
  return (
    <>
      <div className='hidden 800px:flex'>
          {
            navItems.map((item:{ name: string , link:string} , index:number) => 
              <Link key={index} href={item.link} passHref 
                className={`${ (item.name === 'Home' && pathname === '/') || (item.name !== 'Home' && pathname.includes(item.link))? 
                  'text-primary-red': 'text-white'} text-[18px] 1200px:px-6 800px:px-4 font-Poppins font-[400] uppercase`}>
                {item.name}
              </Link>
            )
          }
      </div>
      {
        props.isMobile && (
          <div className='800px:hidden flex flex-start flex-col gap-[10px] mt-5'>
            {
              navItems.map((item:{ name: string , link:string} , index:number) => 
                <Link key={index} href={item.link} passHref 
                  className={`${ (item.name === '/' && pathname === '/') || (item.name !== '/' && pathname.includes(item.name))? 
                    'text-primary-red': 'text-white'} text-[18px] px-6 font-Poppins font-[400] block`}>
                  {item.name}
                </Link>
              )
            }
          </div>
        )

      }
    </>
  )
}

export default NavItems