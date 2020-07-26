import React, { Component, useState, Children, useMemo } from 'react';
import { connect } from 'react-redux';
import { useDrop } from 'react-dnd';
import { closeMeeting, setTaskDate } from '../../redux/actions/actions';

import ReactTooltip from 'react-tooltip';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import MeetingModal from './modal';

import moment from 'moment';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const CalendarComponent = ({ meetingList, closeMeeting, setTaskDate }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [meetingSelected, setMeetingSelected] = useState(null);
  const [outsideDrop, setOutsideDrop] = useState(null);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'table-row',
    canDrop: () => true,
    drop: (props, monitor) => {
      const task = monitor.getItem().taskData;
      const { start } = outsideDrop;

      setTaskDate(
        {
          ...task,
          start: moment(start).format('YYYY-MM-DDThh:mm'),
        },
        moment(start).format('YYYY-MM-DDThh:mm')
      );
    },

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const formatedMeeting = {
    ...meetingSelected,
    start: moment(meetingSelected?.start).format('DD.MM.YYYY h:mm:ss'),
    end: moment(meetingSelected?.end).format('DD.MM.YYYY h:mm:ss'),
  };

  const onEventResize = (data) => {
    const { start, end } = data;
  };

  const onEventDrop = (data) => {};

  const onEventClick = (data) => {
    setMeetingSelected(data);
    setModalOpen(true);
  };

  const onModalClose = () => {
    setModalOpen(false);
    setMeetingSelected(null);
  };

  const onMeetingClose = (meeting) => {
    closeMeeting(meeting);
  };

  const ColoredDateCellWrapper = ({ children, value }) =>
    React.cloneElement(Children.only(children), {
      style: {
        ...children.style,
        backgroundColor: ['Sunday', 'Saturday'].includes(
          moment(value).format('dddd')
        )
          ? 'rgba(245, 195, 191, 0.6)'
          : '',
      },
    });

  const TooltipedEvent = ({ children, ...props }) => {
    return React.cloneElement(Children.only(children), props);
  };
  //

  const getEventPropGetter = (event) => {
    return {
      style: {
        backgroundColor:
          (event.result === 'Успех' && 'lightgreen') ||
          (event.result === 'Отказ' && '#f76257'),
      },
    };
  };

  // moment(e).format('DD.MM.YYYYTh:mm:ss')
  return (
    <div>
      <div ref={drop}>
        <DnDCalendar
          defaultDate={moment().toDate()}
          defaultView='month'
          events={meetingList}
          localizer={localizer}
          onEventDrop={onEventDrop}
          onEventResize={onEventResize}
          resizable
          style={{ height: '70vh' }}
          onSelectEvent={onEventClick}
          onDropFromOutside={({ start, end }) => setOutsideDrop({ start, end })}
          components={{
            dateCellWrapper: ColoredDateCellWrapper,
            eventWrapper: ({ event, ...props }) => {
              return (
                <div data-tip={`<p> ${event.comment} </p>`}>
                  <TooltipedEvent {...props} />
                  <ReactTooltip html />
                </div>
              );
            },
          }}
          eventPropGetter={getEventPropGetter}
        />
      </div>
      <MeetingModal
        meetingList={formatedMeeting}
        open={modalOpen}
        onClose={onModalClose}
        onMeetingClose={onMeetingClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
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
  {
    closeMeeting,
    setTaskDate,
  }
)(CalendarComponent);
