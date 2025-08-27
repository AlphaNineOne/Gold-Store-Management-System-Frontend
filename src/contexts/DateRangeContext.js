import { createContext } from 'react';

const DateRangeContext = createContext({
  searchParams: null,
  setSearchParams: () => {},
  searchParamsObj: null,
});

export default DateRangeContext;
