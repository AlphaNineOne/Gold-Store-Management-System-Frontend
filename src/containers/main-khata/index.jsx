import React, { useMemo } from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { useQuery } from 'react-query';

// COMPONENTS & SERVICES
import { getGoldPriceKey, getGoldPriceQuery } from 'services/mainKhata';
import MainKhataTable from './components/MainKhataTable';
import AddAccountModal from './components/AddAccountModal';
import GoldRateForm from './components/GoldRateForm';

function MainKhata() {
  const [isAccountModalOpen, setIsAccountModalOpen] = React.useState(false);

  // API SERVICES
  const { data: todayGoldPrice } = useQuery(getGoldPriceKey, getGoldPriceQuery);

  const toggleAccountModal = () => setIsAccountModalOpen(prev => !prev);

  // CONSTANTS
  const goldPrice = useMemo(
    () => (todayGoldPrice?.length > 0 ? todayGoldPrice[0]?.price : 'NA'),
    [todayGoldPrice]
  );

  return (
    <Paper elevation={10} className="p-3">
      <AddAccountModal open={isAccountModalOpen} toggle={toggleAccountModal} />

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Main Khata</Typography>

        <Button variant="contained" color="secondary" onClick={toggleAccountModal}>
          Add New
        </Button>
      </Stack>

      <Box my={3}>
        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
          <Typography variant="body1">Today&apos;s Gold Rate:</Typography>
          <Typography variant="body1">{goldPrice}</Typography>
        </Stack>

        <GoldRateForm />
      </Box>

      <MainKhataTable />
    </Paper>
  );
}

export default MainKhata;
