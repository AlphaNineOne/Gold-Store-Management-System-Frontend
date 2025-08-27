/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */
import React, { useEffect, useMemo, useState } from 'react';
import { Clear, Download, FilterAlt } from '@mui/icons-material';
import { IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { useMutation } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

// COMPONENTS & SERVICES
import { getAccountDetailsByIdQuery, getAccountDetailKey } from 'services/mainKhata';
import DateRange from 'shared/DateRange';
import { getSearchParamObj } from 'utilities/helpers';
import DateRangeContext from 'contexts/DateRangeContext';
import DownloadPdf from 'containers/pdf';
import AccountTable from './components/AccountTable';

function AccountDetals() {
  const { accountName, accountId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setFilterOpen] = useState(false);
  const searchParamsObj = getSearchParamObj(searchParams);

  const dateRangeContextValue = useMemo(
    () => ({ searchParams, setSearchParams, searchParamsObj }),
    [searchParams]
  );

  // API SERVICES
  const { data, mutateAsync: handler } = useMutation(getAccountDetailKey, getAccountDetailsByIdQuery);

  const getAsyncAccountDetails = async () => {
    await handler({ ...searchParamsObj, accountId });
  };

  useEffect(() => {
    getAsyncAccountDetails();
  }, []);

  useEffect(() => {
    if (searchParams?.size > 0) {
      getAsyncAccountDetails();
    }
  }, [searchParams]);

  const handleToggleFilter = () => {
    setFilterOpen(prev => !prev);
  };

  const handleResetFilters = async () => {
    setSearchParams('');
    await handler({ accountId });
  };

  const handleDownload = async () => {
    const doc = <DownloadPdf data={data} />;
    const toPdfBlob = await pdf(doc).toBlob();
    const pdfBlobUrl = URL.createObjectURL(toPdfBlob);
    saveAs(pdfBlobUrl, 'Reports.pdf');
  };

  return (
    <Paper elevation={10} className="p-3" sx={{ minHeight: '50vh' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" className="text-capitalize">
          {accountName}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1}>
          {Object.values(searchParamsObj)?.length > 0 && (
            <Tooltip title="Reset">
              <IconButton onClick={handleResetFilters}>
                <Clear />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Filters">
            <IconButton onClick={handleToggleFilter}>
              <FilterAlt />
            </IconButton>
          </Tooltip>

          <Tooltip title="Download Pdf">
            <IconButton onClick={handleDownload}>
              <Download />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <AccountTable onUpdate={() => getAsyncAccountDetails()} data={data} />

      <DateRangeContext.Provider value={dateRangeContextValue}>
        <DateRange isOpen={isFilterOpen} toggle={handleToggleFilter} />
      </DateRangeContext.Provider>
    </Paper>
  );
}

export default AccountDetals;
