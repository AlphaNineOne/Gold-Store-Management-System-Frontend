import { useContext } from 'react';
import DateRangeContext from 'contexts/DateRangeContext';

function useGetDateRangeContext() {
  const context = useContext(DateRangeContext);

  return context;
}

export default useGetDateRangeContext;
