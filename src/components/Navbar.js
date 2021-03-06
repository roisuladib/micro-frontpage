import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import propTypes from 'prop-types';
import Logo from '/public/images/logo.svg';

import DefaultAvatar from '/public/images/ic-default-avatar.svg';

const ItemNavbar = props => {
   const router = useRouter();
   const pathName = router.pathname;
   // const pathName = (router.pathname).split('/[id]')[0];
   const itemNav = props.onLight ? 'text-[#132B50]' : 'text-white';

   return (
      <li>
         <Link href={props.link}>
            <a className={[itemNav, pathName === props.link ? 'item-nav item-nav-active text-[#36C2CF]' : 'item-nav'].join(' ')}>
               {props.name}
            </a>
         </Link>
      </li>
   );
}

const Navbar = () => {
   const router = useRouter();
   const url = process.env.NEXT_PUBLIC_DASHBOARD_URL;
   const linkBtn = router.pathname.indexOf('/login') >= 0 ? `${url}/register` : `${url}/login`;
   const txtBtn = router.pathname.indexOf('/login') >= 0 ? 'Register' : 'Login';

   const [user, setUser] = useState(null);
   useEffect(() => {
      const userCookies = 
         decodeURIComponent(window.document.cookie)
         ?.split(';')
         ?.find
         ?.(item => item.indexOf('ADIBMICRO:user') > -1)
         ?.split('=')[1] ?? null;
      setUser(userCookies ? JSON.parse(userCookies) : null);
   }, []);

   return (
      <nav className="flex flex-col md:flex-row justify-between items-center py-4">
      {/* <nav className="flex flex-col md:flex-row items-center md:justify-between py-4"> */}
         <div>
            <Link href="/">
               <a><Image src="/images/logo.svg" className="cursor-pointer on-dark" height={54} width={54} layout="fixed" priority /></a>
            </Link>
         </div>
         <div className="mt-20 md:mt-0">
            <ul className="flex flex-col md:flex-row md:space-x-5 w-full items-center">
               <ItemNavbar name="Home" link="/" />
               <ItemNavbar name="Classes" link="/classes" />
               <ItemNavbar name="Flas Sale" link="/flash-sale" />
               <ItemNavbar name="Resources" link="/resources" />
               <ItemNavbar name="Randoms" link="/randoms" />
               <li>
                  {
                     user 
                        ? <a href={linkBtn} target="_blank" rel="noopener noreferrer" className="font-normal text-white hover:bg-[#4D55BC] py-2 px-8 rounded-xl transition-colors duration-300 focus:border-2 border-[#4D55BC] items-center inline-flex">
                           <span className="rounded-full overflow-hidden mr-3 border-2 border-[#FE721C]">
                              {
                                 user?.avatar 
                                 ? <img className="object-cover w-8 h-8 inline-block" src={user?.avatar} alt={user?.name} title={user?.name} />
                                 : <DefaultAvatar className="object-cover w-8 h-8 inline-block" />
                              }
                           </span>
                           {user.name}
                          </a>
                        : <a href={linkBtn} target="_blank" rel="noopener noreferrer" className="font-normal text-white bg-[#4D55BC] py-2 px-8 rounded-xl hover:text-[#132B50] hover:bg-[#36C2CF] transition-colors duration-300 focus:border-2 border-[#4D55BC]">{txtBtn}</a>
                  }
               </li>
            </ul>
         </div>
      </nav>
   );
};


 Navbar.propTypes = {
    onLight: propTypes.bool,
 }

 export default Navbar;