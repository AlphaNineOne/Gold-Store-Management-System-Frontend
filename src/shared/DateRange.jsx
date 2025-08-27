import React, { useCallback, useState } from 'react';
import { Box, Button, Dialog, Stack } from '@mui/material';
import { DateRangePicker } from 'react-date-range';
import propTypes from 'prop-types';
import moment from 'moment';
import useGetDateRangeContext from 'customHooks/useGetDateRangeContext';

function DateRange({ isOpen, toggle }) {
  const [value, setValue] = useState([{ startDate: new Date(), endDate: new Date(), key: 'selection' }]);

  const { setSearchParams } = useGetDateRangeContext();

  const handleChange = useCallback(
    range => {
      setValue([range.selection]);
    },
    [value]
  );

  const handleSubmit = useCallback(async () => {
    const minDate = moment(value[0].startDate).format('YYYY-MM-DD');
    const maxDate = moment(value[0].endDate).format('YYYY-MM-DD');

    const searchParamsObj = {
      minDate,
      maxDate,
    };

    toggle();
    setSearchParams(searchParamsObj);
  }, [value]);

  const handleReset = useCallback(() => {
    toggle();
    setValue([{ startDate: new Date(), endDate: new Date(), key: 'selection' }]);
  }, []);

  return (
    <Dialog open={isOpen} onClose={handleReset}>
      <Box className="bg-white p-3">
        <DateRangePicker ranges={value} onChange={handleChange} />

        <Stack direction="row" justifyContent="end">
          <Button onClick={handleReset}>Cancel</Button>

          <Button onClick={handleSubmit}>Ok</Button>
        </Stack>
      </Box>
    </Dialog>
  );
}

DateRange.propTypes = {
  isOpen: propTypes.bool.isRequired,
  toggle: propTypes.func.isRequired,
};

export default DateRange;
