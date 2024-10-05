import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';
import './calendar.css';
import { useTheme } from '../../ThemeContext';

import './Views/calendar_month.css';
import './Views/calendar_week.css';
import './Views/calendar_year.css';

const Calendar: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { theme } = useTheme();
    const [calendarView, setCalendarView] = useState<'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'yearGrid'>('yearGrid');
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [events, setEvents] = useState<any[]>([]);
    const calendarRef = useRef<FullCalendar | null>(null);

    const handleDateClick = (selectInfo: DateSelectArg) => {
        const title = prompt(t('text_EnterEventTitle'));
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
        alert(`${t('text_Event')}: ${clickInfo.event.title}`);
    };

    const handleMonthClick = (monthIndex: number) => {
        setCalendarView('dayGridMonth');
        setTimeout(() => {
            if (calendarRef.current) {
                const calendarApi = calendarRef.current.getApi();
                const date = new Date(selectedYear, monthIndex, 1);
                calendarApi.gotoDate(date);
            }
        }, 100);
    };

    const handlePreviousYear = () => {
        setSelectedYear((prevYear) => prevYear - 1);
    };

    const handleNextYear = () => {
        setSelectedYear((prevYear) => prevYear + 1);
    };

    return (
        <div className={`calendar_page ${theme}`}>
            <div className={`calendar-container ${calendarView}-view`}>
                <h1>{t('calendar_CalendarTitle')}</h1>
                <select
                    value={calendarView}
                    onChange={(e) => {
                        const newView = e.target.value as 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'yearGrid';
                        setCalendarView(newView);
                        if (calendarRef.current && newView !== 'yearGrid') {
                            const calendarApi = calendarRef.current.getApi();
                            calendarApi.changeView(newView);
                        }
                    }}
                >
                    <option value="dayGridMonth">{t('button_Month')}</option>
                    <option value="timeGridWeek">{t('button_Week')}</option>
                    <option value="timeGridDay">{t('button_Day')}</option>
                    <option value="yearGrid">{t('button_Year')}</option>
                </select>

                {calendarView === 'yearGrid' ? (
                    <div className="year-grid-container">
                        <p className="year-text">{t('text_Year')}</p>
                        <div className="year-navigation">
                            <button className="navigation-button" onClick={handlePreviousYear}>{"<"}</button>
                            <h2 className="year-label">{selectedYear}</h2>
                            <button className="navigation-button" onClick={handleNextYear}>{">"}</button>
                        </div>
                        <div className="year-grid">
                            {Array.from({ length: 12 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="year-grid-month"
                                    onClick={() => handleMonthClick(index)}
                                >
                                    {new Date(0, index).toLocaleString(i18n.language, { month: 'long' })}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <FullCalendar
                        ref={calendarRef}
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
                        buttonText={{
                            today: t('button_Today'),
                            month: t('button_Month'),
                            week: t('button_Week'),
                            day: t('button_Day'),
                            list: t('button_List'),
                            year: t('button_Year')
                        }}
                        titleFormat={{
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }}
                        weekText={t('Calendar_Week')}
                        allDayText={t('text_AllDay')}
                        moreLinkText={(n) => `+${n} ${t('text_MoreLink')}`}
                        noEventsText={t('text_NoEvents')}
                        locale={i18n.language}
                    />
                )}
            </div>
        </div>
    );
};

export default Calendar;