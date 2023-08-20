"use client";

import Image from "next/image";
import { MdCancel } from "react-icons/md";
import { useState } from "react";

export default function Todo() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [inputData, setInputData] = useState<string>("");
  const [todoList, setTodoList] = useState<task[]>([]);

  const [currentListState, setCurrentListState] = useState<
    "allTasks" | "completedTasks" | "incompleteTasks"
  >("allTasks");

  type task = {
    id: number;
    taskDescription: string;
    isCompleted: boolean;
  };

  const backgroundImages = {
    darkDesktopBg: "/bg-desktop-dark.jpg",
    darkMobileBg: "/bg-mobile-dark.jpg",
    lightMobileBg: "/bg-mobile-light.jpg",
    lightDeskBg: "/bg-desktop-light.jpg",
  };

  // mobile header
  const setMobileBgFunction = () => {
    if (isDarkMode) {
      return backgroundImages.darkMobileBg;
    }
    return backgroundImages.lightMobileBg;
  };

  // desktop header
  const setDesktopBgFunction = () => {
    if (isDarkMode) {
      return backgroundImages.darkDesktopBg;
    }
    return backgroundImages.lightDeskBg;
  };

  // toggle the theme/mode of screen
  const toggleScreenMode = () => {
    !isDarkMode ? setIsDarkMode(true) : setIsDarkMode(false);
  };

  // to add a task in todo list
  const addTask = () => {
    console.log(inputData);
    if (inputData !== "") {
      const newTask: task = {
        id: Date.now(),
        taskDescription: inputData,
        isCompleted: false,
      };

      setTodoList((prevTodoList) => [...prevTodoList, newTask]);

      setInputData("");
    } else {
      alert("Please enter some value");
    }
  };

  const incompletedTaskCount = todoList.filter(
    (task) => !task.isCompleted
  ).length;

  return (
    <div
      className={`container relative  flex flex-col min-w-max min-h-screen overflow-auto ${
        isDarkMode ? "bg-dark" : "bg-white"
      }`}
    >
      <div className="header flex">
        {/* Mobile Image */}
        <Image
          src={setMobileBgFunction()}
          alt=""
          width={425}
          height={200}
          priority
          className="block md:hidden"
        />
        {/* Desktop Image */}
        <Image
          src={setDesktopBgFunction()}
          alt=""
          width={1440}
          height={300}
          layout="intrinsic"
          priority
          className="hidden md:block"
        />
      </div>
      <div className="todo-tab flex flex-col absolute  justify-center items-center p-3 mt-6 w-full">
        <div className="flex flex-col  justify-center items-center p-3 w-11/12 gap-6 md:gap-4 md:w-1/2">
          <div className="title flex justify-between items-center w-full">
            <h1 className="font-bold text-white text-3xl tracking-widest">
              TODO
            </h1>
            <Image
              src={`${isDarkMode ? "icon-sun.svg" : "/icon-moon.svg"}`}
              alt=""
              width={26}
              height={26}
              onClick={toggleScreenMode}
              className="cursor-pointer"
            />
          </div>
          <div
            className={`flex justify-start space-x-4 items-center py-3 px-3 rounded w-full font-normal border-verylightgray ${
              isDarkMode
                ? "bg-lightdark text-lightgrayishblue "
                : "bg-white text-darkgrayishblue"
            }`}
          >
            <input
              name="todo-task"
              type="text"
              placeholder="Create a new todo..."
              value={inputData}
              autoComplete="off"
              onChange={(event) => setInputData(event.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTask();
              }}
              className={`w-full focus:outline-none ${
                isDarkMode
                  ? "bg-lightdark text-lightgrayishblue "
                  : "bg-white text-darkgrayishblue"
              }`}
            />

            <button
              onClick={addTask}
              className="border-gray-300 w-1/2 bg-indigo-600 text-white px-4 py-1 rounded-md hover:bg-indigo-700 disabled:cursor-not-allowed cursor-pointer"
            >
              Add task
            </button>
          </div>
          <div
            className={`list-of-todo flex flex-col justify-center items-center rounded-lg divide-y w-full shadow-lg ${
              isDarkMode ? "divide-gray-900" : "divide-gray-200"
            } ${
              isDarkMode
                ? "bg-lightdark text-lightgrayishblue"
                : " bg-white text-darkgrayishblue"
            }`}
          >
            {todoList
              .filter((task) => {
                console.log(task);
                if (currentListState === "allTasks") {
                  return true;
                } else if (currentListState === "completedTasks") {
                  return task.isCompleted;
                } else {
                  return !task.isCompleted;
                }
              })
              .map((todoEl, index) => {
                return (
                  <div
                    className="todoList flex justify-between items-center space-x-4 p-3 w-full font-normal border-verylightgray"
                    key={index}
                  >
                    <div className="flex justify-between space-x-4 items-center">
                      <div
                        className={`flex justify-center items-center rounded-full border w-5 h-5 cursor-pointer ${
                          todoEl.isCompleted === true ? "bg-green-400" : ""
                        }`}
                        onClick={() =>
                          // immer.js
                          setTodoList((prevList) => {
                            const taskToUpdate = prevList.find(
                              (task) => task.id === todoEl.id
                            );

                            if (!taskToUpdate) {
                              throw new Error("Impossible condition");
                            }

                            return prevList.map((task) => {
                              if (task.id === taskToUpdate.id) {
                                return {
                                  ...task,
                                  isCompleted: !task.isCompleted,
                                };
                              } else {
                                return task;
                              }
                            });
                          })
                        }
                      >
                        <Image
                          src="/icon-check.svg"
                          alt="check-icon"
                          width={11}
                          height={9}
                          className={`${
                            todoEl.isCompleted === true ? "block" : "hidden"
                          }`}
                        />
                      </div>
                      <p
                        className={` cursor-pointer ${
                          isDarkMode
                            ? "text-lightgrayishblue "
                            : "  text-darkgrayishblue"
                        } ${
                          todoEl.isCompleted === true
                            ? `line-through ${
                                isDarkMode ? "text-gray-700" : "text-gray-300"
                              }`
                            : ""
                        }`}
                      >
                        {todoEl.taskDescription}
                      </p>
                    </div>
                    <MdCancel
                      className="cursor-pointer"
                      onClick={() =>
                        setTodoList((prevTodoList) =>
                          prevTodoList.filter((task) => task.id !== todoEl.id)
                        )
                      }
                    />
                  </div>
                );
              })}
            <div
              className={`flex justify-between items-center w-full space-x-4 p-3 text-gray-600 text-sm font-medium ${
                todoList.length === 0 ? "hidden" : "flex"
              }`}
            >
              <p>{incompletedTaskCount} items left</p>
              {/* for desktop view */}
              <div className="hidden md:flex justify-between items-center space-x-2 text-base font-semibold">
                <button
                  className={`${
                    isDarkMode ? "md:hover:text-black" : "md:hover:text-white"
                  } active:text-blue-700`}
                  onClick={() => setCurrentListState("allTasks")}
                >
                  All
                </button>
                <button
                  className={`${
                    isDarkMode ? "md:hover:text-black" : "md:hover:text-white"
                  } active:text-blue-700`}
                  onClick={() => setCurrentListState("incompleteTasks")}
                >
                  Active
                </button>
                <button
                  className={`${
                    isDarkMode ? "md:hover:text-black" : "md:hover:text-white"
                  } active:text-blue-700 cursor-pointer disabled:cursor-not-allowed`}
                  onClick={() => setCurrentListState("completedTasks")}
                >
                  Completed
                </button>
              </div>
              <button
                className={`${
                  isDarkMode ? "md:hover:text-black" : "md:hover:text-white"
                }`}
                onClick={() => {
                  setTodoList((prevTodos) =>
                    prevTodos.filter((task) => !task.isCompleted)
                  );
                }}
              >
                Clear Completed
              </button>
            </div>
          </div>
          <div className="end-of-taks flex flex-col items-center justify-center space-y-4 w-full">
            {/* for mobile view */}
            <div
              className={`flex md:hidden justify-between rounded-lg w-full items-center shadow-lg p-3 space-x-2 text-base font-semibold ${
                isDarkMode
                  ? "bg-white text-darkgrayishblue"
                  : "bg-lightdark text-lightgrayishblue "
              } ${todoList.length === 0 ? "hidden" : "flex"}`}
            >
              <button
                className="hover:text-blue-800 active:text-blue-700"
                onClick={() => setCurrentListState("allTasks")}
              >
                All
              </button>
              <button
                className="hover:text-blue-800 active:text-blue-700"
                onClick={() => setCurrentListState("incompleteTasks")}
              >
                Active
              </button>
              <button
                className="hover:text-blue-800 active:text-blue-700"
                onClick={() => setCurrentListState("completedTasks")}
              >
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
