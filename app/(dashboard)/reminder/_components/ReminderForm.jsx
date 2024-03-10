// components/ReminderForm.js
import { useState } from 'react';

const ReminderForm = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [time, setTime] = useState('');
  const [day, setDay] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || !time.trim() || !day.trim()) return;
    const reminder = {
      text,
      time,
      day,
      details,
    };
    onAdd(reminder);
    setText('');
    setTime('');
    setDay('');
    setDetails('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Add a reminder..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full px-4 py-2 mb-2 rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <input
        type="text"
        placeholder="Time (e.g. 10:00 AM)"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="w-full px-4 py-2 mb-2 rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <input
        type="text"
        placeholder="Day (e.g. Monday)"
        value={day}
        onChange={(e) => setDay(e.target.value)}
        className="w-full px-4 py-2 mb-2 rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <textarea
        placeholder="Details (optional)"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        className="w-full px-4 py-2 mb-2 rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
      ></textarea>
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Add Reminder
      </button>
    </form>
  );
};

export default ReminderForm;
