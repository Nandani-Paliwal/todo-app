"use client";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

export function Header() {
  const [screenModeState, setScreenModeState] = useState<"dark" | "light">(
    "light"
  );

  const [inputData, setInputData] = useState<string>("");

  const [todoList, setTodoList] = useState<string[]>([]);

  const [check, setCheck] = useState<boolean>(false);

  const [ completedTodo, setCompletedTodo ] = useState<boolean>(false)

  let [isOpen, setIsOpen] = useState<boolean>(true);

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
    setInputData(event.target.value);
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const addTodo = () => {
    if (inputData !== "") {
      setTodoList((todoarr) => [...todoarr, inputData]);
      setInputData("");
      setCheck(true);
      console.log("checked");
      return todoList;
    } else {
      alert("Please enter some value");
    }
  };

  const todoCompleted = () => {
    setCompletedTodo(true)

  }

  useEffect(() => {
    setCheck(false);
  }, [check]);

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
          priority
          className="block md:hidden"
        />
        {/* Desktop Image */}
        <Image
          src={setDesktopBgFunction()}
          alt=""
          width={12000}
          height={1200}
          priority
          className="hidden md:block"
        />
      </div>
      <div className="todo-tab flex flex-col absolute justify-center items-center p-3 mt-6 w-full">
        <div className="flex flex-col  justify-center items-center p-3 w-11/12 gap-6 md:gap-4 md:w-1/2">
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
              className="cursor-pointer"
            />
          </div>
          <div
            className={`flex justify-start space-x-4 items-center py-3 px-3 rounded w-full font-normal border-verylightgray ${
              screenModeState === "dark"
                ? "bg-lightdark text-lightgrayishblue "
                : "bg-white text-darkgrayishblue"
            }`}
          >
            <div
              className={`flex justify-center items-center rounded-full border w-5 h-5 cursor-pointer ${
                check === true ? "bg-blue-400" : ""
              }`}
              onClick={addTodo}
            >
              <Image
                src="/icon-check.svg"
                alt="check-icon"
                width={11}
                height={9}
                className={`${check === true ? "block" : "hidden"}`}
              />
            </div>
            <input
              name="todo-list"
              type="text"
              placeholder="Create a new todo..."
              value={inputData}
              onChange={handleChange}
              className={`focus:ring-none focus:border-none ${
                screenModeState === "dark"
                  ? "bg-lightdark text-lightgrayishblue "
                  : "bg-white text-darkgrayishblue"
              }`}
            />
          </div>
          <div
            className={`list-of-todo flex flex-col justify-center items-center rounded-lg divide-y w-full shadow-lg ${
              screenModeState === "dark" ? "divide-current" : "divide-gray-200"
            } ${
              screenModeState === "dark"
                ? "bg-lightdark text-lightgrayishblue "
                : "bg-white text-darkgrayishblue"
            }`}
          >
            {todoList.map((todoEl) => {
              return (
                <div className="todoList flex justify-start items-center space-x-4 p-3 w-full font-normal border-verylightgray">
                  <div
                    className={`flex justify-center items-center rounded-full border w-5 h-5 cursor-pointer ${
                      completedTodo === true ? "bg-green-400" : ""
                    }`}
                    onClick={todoCompleted}
                  >
                    <Image
                      src="/icon-check.svg"
                      alt="check-icon"
                      width={11}
                      height={9}
                      className={`${completedTodo === true ? "block" : "hidden"}`}
                    />
                  </div>
                  <p
                    className={`${
                      screenModeState === "dark"
                        ? " text-lightgrayishblue "
                        : " text-darkgrayishblue"
                    }`}
                  >
                    {todoEl}
                  </p>
                </div>
              );
            })}
            <div
              className={`flex justify-between items-center w-full space-x-4 p-3 text-gray-600 text-sm font-medium ${
                todoList.length === 0 ? "hidden" : "flex"
              }`}
            >
              <p>{todoList.length} items left</p>
              <div className="hidden md:flex justify-between items-center space-x-2 text-base font-semibold">
                <button className="hover:text-blue-700 active:text-blue-700">All</button>
                <button className="hover:text-blue-700 active:text-blue-700">Active</button>
                <button className="hover:text-blue-700 active:text-blue-700">Completed</button>
              </div>
              <button>Clear Completed</button>
            </div>
          </div>
          <div
            className={`flex md:hidden justify-between rounded-lg w-full items-center shadow-lg p-3 space-x-2 text-base font-semibold ${
              screenModeState === "dark"
                ? "bg-lightdark text-lightgrayishblue "
                : "bg-white text-darkgrayishblue"
            } ${todoList.length === 0 ? "hidden" : "flex"}`}
          >
            <button className="hover:text-blue-700 active:text-blue-700">All</button>
            <button className="hover:text-blue-700 active:text-blue-700">Active</button>
            <button className="hover:text-blue-700 active:text-blue-700">Completed</button>
          </div>
          <p
            className={`text-xs text-gray-600 font-medium ${
              todoList.length <= 2 ? "hidden" : "flex"
            }`}
          >
            Drag and drop to reorder list
          </p>
        </div>
      </div>
    </div>
  );
}
