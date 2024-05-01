import React, { useState, useEffect } from "react";
import { IoReceipt } from "react-icons/io5";
import { IoAddOutline } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import Popup from "./PopupReminder";
import useReminder from "@/hooks/use-reminder";
import useDeleteReminder from "@/hooks/delete-reminder";

const TodoList = () => {
  const { loading, error, data, getUserData } = useReminder();
  const { deleteReminder } = useDeleteReminder();

  const [showPopup, setShowPopup] = useState(false);
  const [isDone, setIsDone] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  const handleSetIsDone = async (id) => {
    try {
      await deleteReminder(id);
      setIsDone([...isDone, id]);
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete reminder:", error);
    }
  };

  const handlePopupToggle = () => {
    setShowPopup(!showPopup);
  };

  const addReminder = (reminderText, reminderDate) => {
  };

  return (
    <div className="bg-white md:flex-row flex-col sm:ml-11 sm:mx-0 mx-5 sm:mt-5 mt-4 rounded-2xl sm:h-[350px] h-[220px] sm:w-auto w-auto sm:mb-5 mb-0">
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
      <div className="bg-white rounded-b-2xl sm:h-[200px] h-[160px] overflow-y-scroll">
        {data && data.length > 0 ? (
          <ul className="space-y-2 px-8 py-3 sm:text-base text-xs">
            {data.filter(item => !isDone.includes(item.id)).map((item) => (
              <li
                key={item.id}
                className={`flex items-center pl-4 h-12 transition-all rounded-xl  duration-1000 ${isDone.includes(item.id) ? "bg-green-600" : "bg-red-600"
                  } ${isDone.includes(item.id) ? "opacity-0" : "opacity-100"}`}
              >
                <div className="w-full h-full bg-gray-200 flex px-2 gap-3 rounded-r-xl items-center">
                  <FaRegCheckCircle
                    htmlFor="checklist"
                    onClick={() => handleSetIsDone(item.id)}
                    className="w-6 h-6"
                  />
                  <div className="">
                    <p className={item.reminder.done ? "line-through" : ""}>
                      {item.reminder.task}
                    </p>
                    <div className="flex gap-2 mb-2">
                      <div className="text-xs text-gray-500 flex">
                        <FaRegCalendarAlt className="mr-1" />
                        <p>{item.reminder.deadline}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">Belum ada kegiatan</p>
        )}
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
