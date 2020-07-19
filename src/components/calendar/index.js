import React, { Component, useState } from 'react';
import { connect } from 'react-redux';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import moment from 'moment';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

// const events = [
//   {
//     title: 'xyu',
//     id: 0,
//     start: moment('2020-07-08 09:30:26').toDate(),
//     end: moment('2020-07-08 09:30:26').add(1, 'day').toDate(),
//   },
// ];

const CalendarComponent = ({ meetingList }) => {
  console.log('meetingList', meetingList);
  console.log(moment('2013-02-08 09:30:26').toDate());

  const onEventResize = (data) => {
    const { start, end } = data;
  };

  const onEventDrop = (data) => {
    console.log(data);
  };

  return (
    <div>
      <DnDCalendar
        defaultDate={moment().toDate()}
        defaultView='month'
        events={meetingList}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        resizable
        style={{ height: '70vh' }}
      />
    </div>
  );
};

export default connect(
  (state) => ({
    meetingList: Object.values(state.meetings).map((meeting) => {
      return {
        ...meeting,
        start: moment(meeting.start).toDate(),
        end: moment(meeting.end).toDate(),
        title: meeting.theme,
      };
    }),
  }),
  null
)(CalendarComponent);
