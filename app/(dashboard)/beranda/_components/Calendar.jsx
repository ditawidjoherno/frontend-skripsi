"use client";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Calendar = () => {
  return (
    <div className="bg-white md:flex-row flex-col md:text-sm md:mx-4 rounded-2xl py-4 px-4 ">
      <div className="py-6 w-96">
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