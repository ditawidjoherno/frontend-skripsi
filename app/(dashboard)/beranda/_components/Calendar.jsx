"use client";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Calendar = () => {
  return (
    <div className="bg-white md:flex-row flex-col mx-5 sm:mt-10 mt-4 rounded-2xl  h-auto w-auto sm:mc-0 mb-3">
      <div className="py-8 px-3 sm:w-auto w-[280px]">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={[
            { title: "Event 1", date: "2024-02-01" },
            { title: "Event 2", date: "2024-02-05" },
          ]}
          aspectRatio={1}
        />
      </div>
    </div>
  );
};

export default Calendar;