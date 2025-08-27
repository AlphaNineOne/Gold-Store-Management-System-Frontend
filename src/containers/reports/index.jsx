import React, { useMemo, useState } from 'react';
import { Clear, Download, FilterAlt } from '@mui/icons-material';
import { IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

// COMPONENTS & SERVICES
import { getBalanceReportQuery, listBalanceReportKey } from 'services/mainKhata';
import DateRange from 'shared/DateRange';
import { getSearchParamObj } from 'utilities/helpers';
import DateRangeContext from 'contexts/DateRangeContext';
import DownloadPdf from 'containers/pdf';
import ReportsTable from './components/ReportsTable';

function Reports() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setFilterOpen] = useState(false);
  const searchParamsObj = getSearchParamObj(searchParams);

  const dateRangeContextValue = useMemo(
    () => ({ searchParams, setSearchParams, searchParamsObj }),
    [searchParams]
  );

  // API SERVICES
  const { data } = useQuery([listBalanceReportKey, searchParamsObj], () => getBalanceReportQuery(searchParamsObj));

  const handleToggleFilter = () => {
    setFilterOpen(prev => !prev);
  };

  const handleResetFilters = async () => {
    setSearchParams('');
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
          Reports
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

      <ReportsTable data={data} />

      <DateRangeContext.Provider value={dateRangeContextValue}>
        <DateRange isOpen={isFilterOpen} toggle={handleToggleFilter} />
      </DateRangeContext.Provider>
    </Paper>
  );
}

export default Reports;
