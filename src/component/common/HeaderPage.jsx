import Link from 'next/link'
import React from 'react'
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa'

const HeaderPage = () => {
  return (
    <div>
        <>
  {/* Hello world */}
  <header className="fixed top-0 left-0 right-0 z-50">
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 shadow-md">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <Link href="/" className="flex items-center">
          <img
            src="/images/logochua.jpg"
            className="mr-3 h-6 sm:h-9"
            alt="Bái đính logo"
          />
           <span className="text-sm md:text-base font-serif italic tracking-wide font-medium self-center text-[#800000] text-[12px] text-xl  whitespace-nowrap dark:text-white">
            Khu Du Lịch Văn Hóa Tâm Linh  Bái Đính 
          </span> 
        </Link>
        <div className="flex items-center lg:order-2">
        <Link
            href="/login"
            className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 flex items-center"
            title="Đăng nhập"
          >
            <FaSignInAlt className="text-lg text-[#800000]" />
           
          </Link>
        
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
           
          
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div
          className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
          id="mobile-menu-2"
        >
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
           
          </ul>
        </div>
      </div>
    </nav>
  </header>
  {/* Thêm padding-top để nội dung không bị che khuất bởi header cố định */}
  <div className="pt-16"></div>
</>
    </div>
  )
}

export default HeaderPage
