/* eslint-disable no-nested-ternary */
import React, { useCallback, useState } from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import { useField } from 'formik';
import propTypes from 'prop-types';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function FormikField({ name, placeholder, type, disabled }) {
  const [showText, setShowText] = useState(false);

  const [field, meta] = useField(name);
  const { value, onChange, onBlur } = field;
  const { error, touched } = meta;

  const handleChange = useCallback(
    e => {
      onChange(e);
    },
    [value]
  );

  const toggleShowText = useCallback(() => {
    setShowText(prev => !prev);
  }, [showText]);

  return (
    <Box width={1}>
      <TextField
        fullWidth
        type={type === 'password' ? (showText ? 'text' : 'password') : type}
        label={placeholder}
        placeholder={placeholder}
        value={value ?? ''}
        name={name}
        variant="filled"
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
        error={!!error && touched}
        helperText={!!error && touched ? error : undefined}
        InputProps={{
          endAdornment:
            type === 'password' ? (
              <IconButton onClick={toggleShowText}>
                {showText ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ) : undefined,
        }}
      />
    </Box>
  );
}

FormikField.propTypes = {
  name: propTypes.string.isRequired,
  placeholder: propTypes.string,
  type: propTypes.string,
  disabled: propTypes.bool,
};

FormikField.defaultProps = {
  placeholder: '',
  type: 'text',
  disabled: false,
};

export default FormikField;
