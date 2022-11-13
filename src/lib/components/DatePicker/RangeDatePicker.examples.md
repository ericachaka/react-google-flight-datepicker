DatePicker examples:

###### RangeDatePicker

```js
import { RangeDatePicker } from 'react-google-flight-datepicker';

<div className="react-google-flight-datepicker-1">
  <div className="date-picker-demo">
    <RangeDatePicker
      // startDatePlaceholder="My from date"
      // onChange={(startDate, endDate) => console.log(startDate, endDate)}
      // onFocus={(inputFocus) => console.log(inputFocus)}
      startDate={new Date('2020-04-20')}
      endDate={new Date('2020-05-25')}
      // startWeekDay="sunday"
      minDate={new Date(2020, 1, 10)}
      maxDate={new Date('2020-07-25')}
      dateFormat="DD/MM/YYYY"
      resetLabel={`Reset`}
      doneLabel={`OK`}
      locale={`fr`}
      theme={`light`}
      onDone={(startDate, endDate) => console.log(startDate, endDate)}
      // monthFormat="MMM --- YY"
    />
  </div>
</div>
```
