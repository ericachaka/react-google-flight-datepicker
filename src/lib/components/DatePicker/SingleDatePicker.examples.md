DatePicker examples:

###### SingleDatePicker

```js
import { SingleDatePicker } from 'react-google-flight-datepicker';

<div className="react-google-flight-datepicker-1">
  <div className="date-picker-demo">
    <SingleDatePicker
      singleCalendar
      resetLabel={`Reset`}
      doneLabel={`OK`}
      locale={`fr`}
      theme={`light`}
      onDone={(startDate) => console.log(startDate)}
    />
  </div>
</div>
```
