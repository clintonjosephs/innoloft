import React from 'react';
import Image from 'next/image';
import styles from '../styles/Header.module.css';

const Header: React.FC<{mainColor: string}> = (mainColor) => {
  const styler = {
    backgroundColor: mainColor.mainColor
  };
  return (
    <div className='w-full flex items-center py-4' style={styler}>
      <div className="container mx-auto flex-shrink-0 px-4 lg:px-10">
        <div className="flex items-center justify-between">
            <div className={styles.logo}>
                <svg width="140" height="27" viewBox="0 0 140 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0.914282H5.88571V25.1429H0L0 0.914282ZM15.9429 25.1429H10.0571V0.914282H15.9429L24.8 14.5143V0.914282H30.6857V25.1429H24.8L15.9429 11.3143V25.1429ZM40.6857 25.1429H34.8V0.914282H40.6857L49.5429 14.5143V0.914282H55.4286V25.1429H49.5429L40.6857 11.3143V25.1429ZM70.1714 0.514282H73.6V10.1143H70.1714V0.514282ZM102.4 16.7429V18.8H95.8857V6.74285H98.3429V16.7429H102.4ZM105.2 12.8C105.2 15.0286 106.8 16.8 108.914 16.8C110.971 16.8 112.629 15.0857 112.629 12.8571C112.629 10.5143 111.086 8.8 108.914 8.8C106.8 8.8 105.2 10.5143 105.2 12.8ZM113.6 8.51428C114.629 9.65714 115.143 11.0857 115.143 12.8571C115.143 16.2857 112.4 19.0857 108.971 19.0857C105.429 19.0857 102.686 16.3429 102.686 12.8571C102.686 9.25714 105.429 6.51428 109.029 6.51428C110.8 6.51428 112.4 7.2 113.6 8.51428ZM119.6 11.7143H123.829V13.7714H119.6V18.8H117.086V6.74285H123.829V8.74285H119.6V11.7143ZM131.257 18.8H128.8V8.74285H125.886V6.74285H134.114V8.74285H131.257V18.8Z" fill="white"/>
                    <path d="M75.6 0.857178V7.02861C77.5428 8.28575 78.8 10.5715 78.8 13.3143C78.8 17.2572 75.7143 20.4572 71.8857 20.4572C68 20.4572 64.9143 17.2572 64.9143 13.2C64.9143 10.5143 66.1714 8.28575 68.1143 7.02861V0.914321C66.1714 1.48575 64.4 2.45718 62.9714 3.77146C60.2857 6.34289 58.8571 9.65718 58.8571 13.2C58.8571 20.2857 64.6857 25.8857 72.0571 25.8857C79.2 25.8857 84.9714 20.1715 84.9714 13.1429C84.8571 7.08575 81.0857 2.28575 75.6 0.857178Z" fill="white"/>
                    <path d="M137.086 22.6857H88C90.1143 20.6286 91.4286 16.8 91.4286 13.0286C91.4286 9.25716 89.9429 5.31431 88 3.37145H137.086V22.6857ZM139.6 25.1429V0.914307H81.8857C85.6572 3.02859 87.8857 6.74288 88.5143 11.0286C88.6286 11.6572 88.6857 12.3429 88.6857 13.0286C88.6857 13.7143 88.6286 14.4 88.5143 15.0286C87.8857 19.3143 85.6572 23.0286 81.8857 25.1429H139.6Z" fill="white"/>
                </svg>
            </div>
            <div className={`${styles.searchable} hidden lg:block`}>
                <div className="relative flex items-center w-30rem rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                     <input className="outline-none pr-2 p-1" type="text" id="search" placeholder="Enter interests, keywords, company name etc" style={{width: '25rem', fontSize: '12px'}}/> 
                     <div className="grid place-items-center h-full w-12 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className={`${styles.actions} md:flex md:flex-row hidden md:visible`}>
                <Image src="/assets/images/inno_messenger.png" width={16} height={16} alt="flag" style={{ objectFit: 'contain' }} className='mr-4' />
                <span className={`${styles.lang} mr-4`}>EN</span>
                <Image src="/assets/images/inno_accordion-down-light.png" width={16} height={16} alt="flag" style={{ objectFit: 'contain' }} className='mr-4' />
                <Image src="/assets/images/inno_notifications.png" width={16} height={16} alt="notifications" style={{ objectFit: 'contain' }} className='mr-4' />
                <Image src="/assets/images/profile_image.png" width={25} height={25} alt="profile_image" style={{ objectFit: 'cover', borderRadius: '50%' }} className='mr-4' />
                <Image src="/assets/images/inno_accordion-down-light.png" width={16} height={16} alt="flag" style={{ objectFit: 'contain' }} className='mr-4' />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
