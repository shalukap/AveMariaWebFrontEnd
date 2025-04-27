import React from 'react'
import { FaPhoneAlt,FaFacebookSquare,FaYoutube   } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiMinutemailer } from "react-icons/si";
import { IoLogoYoutube,IoLogoFacebook } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import './footer.css'

export default function Footer() {
  return (
    <div className=' bgImg relative'>
     <div className='absolute inset-0 bg-menu opacity-70 z-0'></div>

        <div className=' relative grid md:grid-cols-3 sm:grid-cols-1 p-5 opacity-[70%]'>
          <div className='bg-[green] opacity-1'></div>
            <div className='flex items-center '>
              <div className='flex m-[25px]'>
                <img src="./assets/img/logoWhite.png" width={100} height={100} alt="Logo" />
                <div className='flex flex-col justify-center items-center'>
                <p className='text-white text-xl bold font-Amaranth flex m-[15px] '>Ave Maria Convent, Negombo</p>
                <p className='text-white text-xl bold font-Amaranth flex m-[15px] '>-INTHY LIGHT-</p>

                </div>

              </div>
            </div>
            <div className='justify-center items-center text-white text-md font-Amaranth '>
                <p className='font-bold text-center text-2xl'>Contact Us</p>
                <p className='flex text-center'><FaPhoneAlt className='m-2 text-[15px]' /><a href="tel:+94312227747">+94312227747</a></p>
                <p className='flex text-center'><MdEmail className='m-2' />info@avemariaconvent.edu.lk</p>
                <p className='flex text-center cursor-pointer hover:underline' onClick={() => window.open("https://maps.app.goo.gl/K6aBW3Jn7v2Gye9z8")}><IoLocation className='m-2' /> Ave Maria Convent, Old Chilaw Road, Negombo</p>
                <div className='flex justify-center items-center border-2 rounded-lg border-white'>
                  <p>More on</p>
                  <p className=' flex text-2xl gap-10 p-5'><IoLogoFacebook className='cursor-pointer hover:text-primary' onClick={() => window.open("https://www.facebook.com/share/1APWLnXhew/", "_blank")}/><IoLogoYoutube className='cursor-pointer hover:text-red-600' onClick={() => window.open("https://www.youtube.com/@avemariaconvent9230", "_blank")}/></p>
                </div>
                
            </div>
        </div>

      </div>
   
  )
}
