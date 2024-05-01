import React, { useState } from "react";
import tambahReminder from "@/hooks/add-reminder";

const PopupReminder = ({ showPopup, handlePopupToggle }) => {
  const { updateData } = tambahReminder();
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleChangeTask = (e) => {
    setTask(e.target.value);
  };

  const handleChangeDeadline = (e) => {
    setDeadline(e.target.value);
  };

  const handleAddReminder = () => {
    updateData(task, deadline);
    setTask("");
    setDeadline("");
    handlePopupToggle();
    window.location.reload()
  };

  return (
    <>
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="bg-blue-500 text-white px-4 py-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Add Reminder</h2>
            </div>
            <div className="p-4">
              <label htmlFor="task" className="block mb-2 font-semibold">Task:</label>
              <input
                type="text"
                id="task"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mb-4"
                placeholder="Enter your task"
                value={task}
                onChange={handleChangeTask}
              />
              <div className="flex items-center mb-4">
                <label htmlFor="deadline" className="mr-2">Deadline:</label>
                <input
                  type="date"
                  id="deadline"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  value={deadline}
                  onChange={handleChangeDeadline}
                />
              </div>
            </div>
            <div className="flex justify-end p-4">
              <button onClick={handlePopupToggle} className="text-blue-500 font-semibold hover:text-blue-700 mr-2">Cancel</button>
              <button onClick={handleAddReminder} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Add</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupReminder;
