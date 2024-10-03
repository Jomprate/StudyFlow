import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';
//import '@fullcalendar/daygrid/main.css';
//import '@fullcalendar/timegrid/main.css';
//import '@fullcalendar/core/main.css';

import './calendar.css';
import { useTheme } from '../../ThemeContext';

const Calendar: React.FC = () => {
    const { theme } = useTheme();
    const [calendarView, setCalendarView] = useState<'dayGridMonth' | 'timeGridWeek' | 'timeGridDay'>('dayGridMonth');
    const [events, setEvents] = useState<any[]>([]);

    const handleDateClick = (selectInfo: DateSelectArg) => {
        const title = prompt('Please enter a new title for your event');
        const calendarApi = selectInfo.view.calendar;

        calendarApi.unselect();

        if (title) {
            setEvents((prevEvents) => [
                ...prevEvents,
                {
                    id: String(events.length + 1),
                    title,
                    start: selectInfo.startStr,
                    end: selectInfo.endStr,
                    allDay: selectInfo.allDay,
                },
            ]);
        }
    };

    const handleEventClick = (clickInfo: EventClickArg) => {
        alert(`Event: ${clickInfo.event.title}`);
    };

    return (
        <div className={`calendar_page ${theme}`}>
            <div className="calendar-container">
                <h1>Calendar</h1>
                <select
                    value={calendarView}
                    onChange={(e) => setCalendarView(e.target.value as 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay')}
                >
                    <option value="dayGridMonth">Month View</option>
                    <option value="timeGridWeek">Week View</option>
                    <option value="timeGridDay">Day View</option>
                </select>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView={calendarView}
                    events={events}
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={true}
                    select={handleDateClick}
                    eventClick={handleEventClick}
                />
            </div>
        </div>
    );
};

export default Calendar;