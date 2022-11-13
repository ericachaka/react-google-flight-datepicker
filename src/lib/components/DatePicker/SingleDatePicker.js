import React, {
  useState, useRef, useEffect, useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import dayjs from 'dayjs';
import { debounce } from '../../helpers';
import './styles.scss';
import DateInputGroup from './DateInputGroup';
import Dialog from './Dialog';
import DialogWrapper from './DialogWrapper';

const SingleDatePicker = ({
  startDate,
  startDatePlaceholder,
  className,
  disabled,
  onChange,
  onFocus,
  startWeekDay,
  minDate,
  maxDate,
  dateFormat,
  monthFormat,
  highlightToday,
  isOpen,
  onCloseCalendar,
  singleCalendar,
  weekDayFormat,
  resetLabel,
  doneLabel,
  locale,
  theme,
  onDone,
}) => {
  const [complsOpen, setComplsOpen] = useState(false);
  const containerRef = useRef(null);
  const [fromDate, setFromDate] = useState();
  const fromDateRef = useRef();
  const [hoverDate, setHoverDate] = useState();
  const [isMobile, setIsMobile] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);

  function handleResize() {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }

  useLayoutEffect(() => {
    handleResize();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  function handleDocumentClick(e) {
    if (
      containerRef.current
      && containerRef.current.contains(e.target) === false
      && window.innerWidth >= 768
    ) {
      setComplsOpen(false);
    }
  }

  function notifyChange() {
    const _startDate = fromDateRef.current ? fromDateRef.current.toDate() : null;
    onChange(_startDate);
  }

  const debounceNotifyChange = debounce(notifyChange, 20);

  function updateFromDate(dateValue, shouldNotifyChange = false) {
    setFromDate(dateValue);
    fromDateRef.current = dateValue;
    if (shouldNotifyChange) {
      debounceNotifyChange();
    }
  }

  useEffect(() => {
    setComplsOpen(isOpen);
    setIsFirstTime(true);
    if (startDate) {
      updateFromDate(dayjs(startDate), false);
    }

    document.addEventListener('click', handleDocumentClick);

    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  useEffect(() => {
    const _startDateJs = startDate ? dayjs(startDate) : null;
    fromDateRef.current = _startDateJs;
    setFromDate(_startDateJs);
  }, [startDate]);

  useEffect(() => {
    if (!complsOpen && isFirstTime) {
      onCloseCalendar(startDate);
    }
  }, [complsOpen]);

  useEffect(() => {
    setComplsOpen(isOpen);
  }, [isOpen]);

  function toggleDialog() {
    const _startDate = fromDateRef.current ? fromDateRef.current.toDate() : null;
    onDone(_startDate);
    setComplsOpen(!complsOpen);
  }

  function handleClickDateInput() {
    if (disabled) return;

    if (!complsOpen) {
      setComplsOpen(true);
    }

    onFocus('Start Date');
  }

  function onSelectDate(date) {
    if ((minDate && dayjs(minDate).isAfter(date, 'date')) || (maxDate && dayjs(maxDate).isBefore(date, 'date'))) {
      return;
    }
    updateFromDate(date, true);
  }

  function onHoverDate(date) {
    setHoverDate(date);
  }

  function handleReset() {
    updateFromDate(null, true);
    setHoverDate(null);
  }

  function onDateInputFocus() {
    handleClickDateInput();
  }

  return (
    <div className={`${(theme == 'light') ? 'react-google-flight-datepicker' : 'react-google-flight-datepicker-dark'}`}>
      <div
        className={cx('date-picker', className, {
          disabled,
        })}
        ref={containerRef}
      >
        <DateInputGroup
          handleClickDateInput={handleClickDateInput}
          showCalendarIcon
          fromDate={fromDate}
          minDate={minDate}
          maxDate={maxDate}
          handleChangeDate={onSelectDate}
          startDatePlaceholder={startDatePlaceholder}
          dateFormat={dateFormat}
          onFocus={onDateInputFocus}
          isSingle
        />
        <DialogWrapper isMobile={isMobile} theme={theme}>
          <Dialog
            complsOpen={complsOpen}
            toggleDialog={toggleDialog}
            handleClickDateInput={handleClickDateInput}
            inputFocus="from"
            onSelectDate={onSelectDate}
            onHoverDate={onHoverDate}
            fromDate={fromDate}
            hoverDate={hoverDate}
            handleReset={handleReset}
            handleChangeDate={onSelectDate}
            startDatePlaceholder={startDatePlaceholder}
            startWeekDay={startWeekDay}
            minDate={minDate}
            maxDate={maxDate}
            dateFormat={dateFormat}
            monthFormat={monthFormat}
            isMobile={isMobile}
            highlightToday={highlightToday}
            isSingle
            weekDayFormat={weekDayFormat}
            singleCalendar={singleCalendar}
            resetLabel={resetLabel}
            doneLabel={doneLabel}
            locale={locale}
            theme={theme}
          />
        </DialogWrapper>
      </div>
    </div>
  );
};

SingleDatePicker.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  startDatePlaceholder: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onDone: PropTypes.func,
  onFocus: PropTypes.func,
  startWeekDay: PropTypes.oneOf(['monday', 'sunday']),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  dateFormat: PropTypes.string,
  monthFormat: PropTypes.string,
  weekDayFormat: PropTypes.string,
  highlightToday: PropTypes.bool,
  isOpen: PropTypes.bool,
  onCloseCalendar: PropTypes.func,
  singleCalendar: PropTypes.bool,
  resetLabel: PropTypes.string,
  doneLabel: PropTypes.string,
  locale: PropTypes.string,
  theme: PropTypes.string,
};

SingleDatePicker.defaultProps = {
  startDate: null,
  className: '',
  disabled: false,
  startDatePlaceholder: 'Date',
  onChange: () => {},
  onDone: () => {},
  onFocus: () => {},
  startWeekDay: 'monday',
  weekDayFormat: 'dd',
  minDate: null,
  maxDate: null,
  dateFormat: '',
  monthFormat: '',
  highlightToday: false,
  isOpen: false,
  onCloseCalendar: () => {},
  resetLabel: 'Reset',
  doneLabel: 'Done',
  locale: 'en',
  theme: 'light',
};

export default SingleDatePicker;
