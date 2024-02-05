"use client";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Calendar = () => {
  return (
    <div className="bg-white md:flex-row flex-col sm:ml-5 ml-4 sm:mt-10 mt-4 rounded-2xl sm:h-[500px] h-[200px] sm:w-[650px] w-full">
      <div>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={[
            { title: "Event 1", date: "2024-02-01" },
            { title: "Event 2", date: "2024-02-05" },
          ]}
        />
      </div>
    </div>
  );
};

export default Calendar;
