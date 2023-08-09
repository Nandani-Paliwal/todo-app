"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Header() {
  const [screenModeState, setScreenModeState] = useState<"dark" | "light">(
    "light"
  );

  const [ inputData, setInputData ] = useState<string>("");

  const bg = {
    darkDesktopBg: "/bg-desktop-dark.jpg",
    darkMobileBg: "/bg-mobile-dark.jpg",
    lightMobileBg: "/bg-mobile-light.jpg",
    lightDeskBg: "/bg-desktop-light.jpg",
  };

  const setMobileBgFunction = () => {
    if (screenModeState === "light") {
      return bg.lightMobileBg;
    } else screenModeState === "dark";
    {
      return bg.darkMobileBg;
    }
  };

  const setDesktopBgFunction = () => {
    if (screenModeState === "light") {
      return bg.lightDeskBg;
    } else screenModeState === "dark";
    {
      return bg.darkDesktopBg;
    }
  };

  const toggleScreenMode = () => {
    screenModeState === "light"
      ? setScreenModeState("dark")
      : setScreenModeState("light");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(event.target.value)
  }

  return (
    <div
      className={`container relative flex flex-col w-screen h-screen ${
        screenModeState === "dark" ? "bg-dark" : "bg-white"
      }`}
    >
      <div className="header">
        {/* Mobile Image */}
        <Image
          src={setMobileBgFunction()}
          alt=""
          width={12000}
          height={1200}
          className="block md:hidden"
        />
        {/* Desktop Image */}
        <Image
          src={setDesktopBgFunction()}
          alt=""
          width={12000}
          height={1200}
          className="hidden md:block"
        />
      </div>
      <div className="todo-tab flex flex-col absolute justify-center items-center p-3 w-full">
        <div className="flex flex-col  justify-center items-center p-3 w-11/12 gap-10 md:gap-4 md:w-1/2">
          <div className="title flex justify-between items-center w-full">
            <h1 className="font-bold text-white text-3xl tracking-widest">
              TODO
            </h1>
            <Image
              src={`${
                screenModeState === "light" ? "/icon-moon.svg" : "icon-sun.svg"
              }`}
              alt=""
              width={26}
              height={26}
              onClick={toggleScreenMode}
            />
          </div>
          <div className={`flex justify-start space-x-4 items-center py-3 px-3 rounded w-full font-normal border-verylightgray ${
                screenModeState === "dark" ? "bg-lightdark text-lightgrayishblue " : "bg-white text-darkgrayishblue"
              }`}>
            <div className="flex justify-center items-center rounded-full border w-5 h-5">
                <Image src='/icon-check.svg' alt="check-icon" width={11} height={9} className="hidden"/>
            </div>
            <input
              name="todo-list"
              type="text"
              placeholder="Create a new todo..."
              value={inputData}
              onChange={handleChange}
              className={`focus:ring-none focus:border-none ${
                screenModeState === "dark" ? "bg-lightdark text-lightgrayishblue " : "bg-white text-darkgrayishblue"
              }`}
            />
          </div>
          <div className="list-of-todo"></div>
        </div>
      </div>
    </div>
  );
}
