export enum DateMode {
    day = 'day',
    month = 'month',
    time = 'time',
    daytime = 'daytime',
  }
  
  export enum DateDisplayFormat {
    shamsiDate = 'jYYYY/jMM/jDD',
    shamsiDateTime = 'jYYYY/jMM/jDD  HH:mm:ss',
    shamsiDateTimeNoSecond = 'jYYYY/jMM/jDD  HH:mm',
    date = 'YYYY/MM/DD',
    dateTime = 'YYYY/MM/DD  HH:mm:ss',
    dateTimeDash = 'YYYY-MM-DD  HH:mm:ss',
  }
  
  export enum DateOutputType {
    shamsiDate = 'shamsiDate',
    shamsiDateTime = 'shamsiDateTime',
    dateTime = 'dateTime',
    dateTimeDash = 'dateTimeDash',
    date = 'date',
    dateRunFormat = 'dateRunFormat',
    dateRunFormatWithTime = 'dateRunFormatWithTime',
    dateTimeRunFormat = 'dateTimeRunFormat',
    utc = 'utc',
  }
  