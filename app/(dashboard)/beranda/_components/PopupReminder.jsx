import React, { useState } from "react";

const PopupReminder = ({ showPopup, handlePopupToggle, addReminder }) => {
  const [reminderText, setReminderText] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");

  const handleChangeText = (e) => {
    setReminderText(e.target.value);
  };

  const handleChangeDate = (e) => {
    setReminderDate(e.target.value);
  };

  const handleChangeTime = (e) => {
    setReminderTime(e.target.value);
  };

  const handleAddReminder = () => {
    addReminder(reminderText, reminderDate, reminderTime);
    setReminderText("");
    setReminderDate("");
    setReminderTime("");
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
              <label htmlFor="reminder" className="block mb-2 font-semibold">Reminder:</label>
              <input 
                type="text" 
                id="reminder" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mb-4" 
                placeholder="Enter your reminder"
                value={reminderText}
                onChange={handleChangeText}
              />
              <div className="flex items-center mb-4">
                <label htmlFor="time" className="mr-2">Time:</label>
                <input 
                  type="time" 
                  id="time" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  value={reminderTime}
                  onChange={handleChangeTime}
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="date" className="mr-2">Date:</label>
                <input 
                  type="date" 
                  id="date" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  value={reminderDate}
                  onChange={handleChangeDate}
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
