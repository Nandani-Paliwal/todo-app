"use client"
import Image from 'next/image'
import { useState } from 'react'


 export function Header(){

    const [screenModeState, setScreenModeState] = useState<"dark" | "light">("light")

    const [ screenType, setScreenType ] = useState<"desktop" | "mobile">("mobile")

    const bg = 
        {
            darkDesktopBg: '/bg-desktop-dark.jpg',
            darkMobileBg: '/bg-mobile-dark.jpg',
            lightMobileBg: '/bg-mobile-light.jpg',
            lightDeskBg: '/bg-desktop-light.jpg'
        }
    

    const setBgFunction = () => {
        if (screenType === "mobile"){
            if (screenModeState === "light"){
                return bg.lightMobileBg;
            }
            else(screenModeState === "dark")
            {
                return bg.darkMobileBg;
            }    
                    
        } 
        else (screenType === "desktop")
        {
            if (screenModeState === "light")
            {
                return bg.lightDeskBg
            }    
        
            else(screenModeState === "dark")
            {
                return bg.darkDesktopBg
            }
            
        }
    }

    const toggleScreenMode = () => {


    }


    return(
        <div className="container flex flex-col">
            <div className='absolute'>
                <Image src={`${setBgFunction}`} alt='' width={12000} height={1200} />
            </div>
            <div className='flex flex-col justify-between items-center relative m-3 p-3 mt-8 '>
                <div className='title flex justify-between items-center w-full'>
                    <h1 className='font-bold text-white text-3xl tracking-widest'>TODO</h1>
                    <Image src={'/icon-moon.svg'} alt='' width={26} height={26}  />

                </div>
                <div className='new-to-do'></div>
                <div className='list-of-todo'>

                </div>

            </div>

        </div>
    )
}