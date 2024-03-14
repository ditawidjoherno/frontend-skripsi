import React, { useState } from "react";
import { IoReceipt } from "react-icons/io5";
import { IoAddOutline } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";
import { LuAlarmClock } from "react-icons/lu";
import { FaRegCalendarAlt } from "react-icons/fa";
import Popup from "./PopupReminder";

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "Meeting dengan client", done: false },
    { id: 2, text: "Survey ", done: false },
    { id: 3, text: "Laporan", done: false },
  ]);

  const [showPopup, setShowPopup] = useState(false);

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const [isDone, setIsDone] = useState({});
  const [isDisappear, setIsDisappear] = useState({});

  const activeTodos = todos.filter((todo) => !todo.done);

  const handleSetIsDone = (id) => {
    setIsDone((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handlePopupToggle = () => {
    setShowPopup(!showPopup);
  };

  const addReminder = (reminderText, reminderDate, reminderTime) => {
    const newTodo = {
      id: todos.length + 1,
      text: reminderText,
      date: reminderDate,
      time: reminderTime,
      done: false,
    };
    setTodos([...todos, newTodo]);
    setShowPopup(false);
  };

  return (
    <div className="bg-white md:flex-row flex-col sm:ml-11 sm:mt-10 mt-4 rounded-2xl sm:h-[250px] h-[220px] sm:w-auto w-[300px]">
      <div className="flex sm:mx-9 mx-5 pt-4 justify-between">
        <div className="flex gap-2">
          <IoReceipt className="sm:text-4xl text-2xl" />
          <p className="sm:text-[26px] text-[16px] font-semibold">Reminder</p>
        </div>
        <div className="sm:mt-2 flex gap-4">
          <button>
            <IoAddOutline
              className="sm:text-4xl text-2xl"
              onClick={handlePopupToggle}
            />
          </button>
        </div>
      </div>
      <hr className="border-t border-black my-2 mx-6" />
      <div className="bg-white rounded-b-2xl sm:h-[180px] h-[160px] overflow-y-scroll">
        <ul className="space-y-2 px-8 py-3 sm:text-base text-xs">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center pl-4 h-12 ${isDone[todo.id] ? "bg-green-600" : "bg-red-600"
                } rounded-xl ${isDisappear[todo.id] ? "hidden" : ""}`}
            >
              <div className="w-full h-full bg-gray-200 flex px-2 gap-3 rounded-r-xl items-center">
                <FaRegCheckCircle
                  htmlFor="checklist"
                  onClick={() => handleSetIsDone(todo.id)}
                  className="w-6 h-6"
                />
                <div className="">
                  <p className={todo.done ? "line-through" : ""}>
                    {todo.text}
                  </p>
                  <div className="flex gap-2 mb-2">
                    <div className="text-xs text-gray-500 flex">
                      <FaRegCalendarAlt className="mr-1" />
                      <p>{todo.date}</p>
                    </div>
                    <div className="text-xs text-gray-500 flex">
                      <LuAlarmClock className="mr-1" />
                      <p>{todo.time}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Popup
        showPopup={showPopup}
        handlePopupToggle={handlePopupToggle}
        addReminder={addReminder}
      />
    </div>
  );
};

export default TodoList;
