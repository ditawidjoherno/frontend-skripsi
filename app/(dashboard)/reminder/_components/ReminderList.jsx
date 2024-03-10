const ReminderList = ({ reminders }) => {
    return (
      <ul className="divide-y divide-gray-300">
        {reminders.map((reminder, index) => (
          <li key={index} className="py-2">
            {reminder}
          </li>
        ))}
      </ul>
    );
  };
  
  export default ReminderList;
  