import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import { useFormikContext } from 'formik';
import propTypes from 'prop-types';

function SubmitBtn({ isLoading, label }) {
  const { isSubmitting } = useFormikContext();

  const isSelfLoading = isLoading || isSubmitting;

  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      sx={{ maxWidth: '150px', width: '100%' }}
      startIcon={isSelfLoading ? <CircularProgress size={20} color="secondary" /> : undefined}
    >
      {isSelfLoading ? 'Loading...' : label}
    </Button>
  );
}

SubmitBtn.propTypes = {
  label: propTypes.string.isRequired,
  isLoading: propTypes.bool,
};

SubmitBtn.defaultProps = {
  isLoading: false,
};

export default SubmitBtn;
