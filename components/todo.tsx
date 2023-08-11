"use client";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { MdCancel } from "react-icons/md";
import { Fragment, useEffect, useState } from "react";

export function Todo() {
  const [screenModeState, setScreenModeState] = useState<"dark" | "light">(
    "light"
  );

  const [inputData, setInputData] = useState<string>("");

  const [todoList, setTodoList] = useState<list[]>([]);

  type list = {
    id: number,
    text: string,
    completed: boolean
  }

  const [check, setCheck] = useState<boolean>(false);

  const [isCompletedTask, setisCompletedTask] = useState<boolean>(false);

  const bg = {
    darkDesktopBg: "/bg-desktop-dark.jpg",
    darkMobileBg: "/bg-mobile-dark.jpg",
    lightMobileBg: "/bg-mobile-light.jpg",
    lightDeskBg: "/bg-desktop-light.jpg",
  };

  // mobile header
  const setMobileBgFunction = () => {
    if (screenModeState === "light") {
      return bg.lightMobileBg;
    } else screenModeState === "dark";
    {
      return bg.darkMobileBg;
    }
  };

  // dekstop header
  const setDesktopBgFunction = () => {
    if (screenModeState === "light") {
      return bg.lightDeskBg;
    } else screenModeState === "dark";
    {
      return bg.darkDesktopBg;
    }
  };

  // toggle the theme/mode of screen
  const toggleScreenMode = () => {
    screenModeState === "light"
      ? setScreenModeState("dark")
      : setScreenModeState("light");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(event.target.value);
  };

  // add task on "Enter"
  const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter")
      addTask();
  }

  // to add a task in todo list
  const addTask = () => {

    if (inputData !== "") {

      const newTask: list = {
        id: Date.now(),
        text: inputData,
        completed: false
      };

      setTodoList([...todoList, newTask]);

      console.log(newTask.id);

      setInputData("");
      setCheck(true);
      return todoList;
    } else {
      alert("Please enter some value");
    }
  };

  // when task is completed
  const completeTask = (taskId: number) => {

    todoList.map((task) => {
      if(task.id === taskId){
        task.completed = !task.completed;
        setisCompletedTask(!isCompletedTask)
       console.log("I am task ID ",task.id)
       console.log(task.completed)
      }
    })
    
  };

  // remove task
  const removeTask = (taskId:number) => {
    todoList.map((task) => {
      if(task.id === taskId){
        setTodoList((prevTodoList) =>
      prevTodoList.filter((task) => task.id !== taskId));
      }})
  }

  // incomplete task count
  const incompleteTaskCount = todoList.filter((task) => !task.completed).length;

  // function to filter Completed tasks
  const filterCompletedTodoList = () => {
    todoList.map((task) => {
      if(task.completed){
        setTodoList((prevTodoList) => 
        prevTodoList.filter((task) => task.completed))
        console.log("Completed")
      }
    })
  } 

  // function to filter Completed tasks
  const filterActiveTodoList = () => {
    todoList.map((task) => {
      if(!task.completed){
        setTodoList((prevTodoList) => 
        prevTodoList.filter((task) => !task.completed))
        console.log("active")
      }
    })
  } 
      
  // function to clear completed tasks
  const clearCompletedTodoList = () => {
    todoList.map((task) => {
      if(!task.completed)
      {
        setTodoList((prevTodoList) =>
        prevTodoList.filter((task) => !task.completed))
        console.log("Active")
      }
    })
  }

  useEffect(() => {
    const arr = todoList; 
    setTodoList(arr);
    setCheck(false);
  }, [isCompletedTask, check, ]);

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
              onClick={addTask}
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
              autoComplete="off"
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              className={`w-full focus:outline-none ${
                screenModeState === "dark"
                  ? "bg-lightdark text-lightgrayishblue "
                  : "bg-white text-darkgrayishblue"
              }`}
            />
          </div>
          <div
            className={`list-of-todo flex flex-col justify-center items-center rounded-lg divide-y w-full shadow-lg ${
              screenModeState === "dark" ? "divide-gray-900" : "divide-gray-200"
            } ${
              screenModeState === "dark"
                ? "bg-lightdark text-lightgrayishblue "
                : "bg-white text-darkgrayishblue"
            }`}
          >
            {todoList.map((todoEl, index) => {
              return (
                <div
                  className="todoList flex justify-between items-center space-x-4 p-3 w-full font-normal border-verylightgray"
                  key={index}
                >
                  <div className="flex justify-between space-x-4 items-center">
                  <div
                    className={`flex justify-center items-center rounded-full border w-5 h-5 cursor-pointer ${
                      todoEl.completed === true ? "bg-green-400" : ""
                    }`}
                    onClick={() => completeTask(todoEl.id)}
                  >
                    <Image
                      src="/icon-check.svg"
                      alt="check-icon"
                      width={11}
                      height={9}
                      className={`${
                        todoEl.completed === true ? "block" : "hidden"
                      }`}
                    />
                  </div>
                  <p
                    className={` cursor-pointer ${
                      screenModeState === "dark"
                        ? " text-lightgrayishblue "
                        : " text-darkgrayishblue"
                    } ${
                      todoEl.completed === true ? `line-through ${screenModeState === "dark" ? "text-gray-900" : "text-gray-300"}`: ""
                    }`}
                  >
                    {todoEl.text}
                  </p>

                  </div>
                  <MdCancel className="cursor-pointer" onClick={() => removeTask(todoEl.id)} />
                </div>
              );
            })}
            <div
              className={`flex justify-between items-center w-full space-x-4 p-3 text-gray-600 text-sm font-medium ${
                todoList.length === 0 ? "hidden" : "flex"
              }`}
            >
              <p>{incompleteTaskCount} items left</p>
              {/* for desktop view */}
              <div className="hidden md:flex justify-between items-center space-x-2 text-base font-semibold">
                <button className={`${screenModeState === "dark" ? 'md:hover:text-white' : 'md:hover:text-black'} active:text-blue-700`} >
                  All
                </button>
                <button className={`${screenModeState === "dark" ? 'md:hover:text-white' : 'md:hover:text-black'} active:text-blue-700`} onClick={filterActiveTodoList} >
                  Active
                </button>
                <button className={`${screenModeState === "dark" ? 'md:hover:text-white' : 'md:hover:text-black'} active:text-blue-700`} onClick={filterCompletedTodoList}>
                  Completed
                </button>
              </div>
              <button className={`${screenModeState === "dark" ? 'md:hover:text-white' : 'md:hover:text-black'}`}  onClick={clearCompletedTodoList}>Clear Completed</button>
            </div>
          </div>
         <div className="end-of-taks flex flex-col items-center justify-center space-y-4 w-full">
          {/* for mobile view */}
         <div
            className={`flex md:hidden justify-between rounded-lg w-full items-center shadow-lg p-3 space-x-2 text-base font-semibold ${
              screenModeState === "dark"
                ? "bg-lightdark text-lightgrayishblue "
                : "bg-white text-darkgrayishblue"
            } ${todoList.length === 0 ? "hidden" : "flex"}`}
          >
            <button className="hover:text-blue-800 active:text-blue-700">
              All
            </button>
            <button className="hover:text-blue-800 active:text-blue-700" onClick={filterActiveTodoList}>
              Active
            </button>
            <button className="hover:text-blue-800 active:text-blue-700" onClick={filterCompletedTodoList}>
              Completed
            </button>
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
    </div>
  );
}
