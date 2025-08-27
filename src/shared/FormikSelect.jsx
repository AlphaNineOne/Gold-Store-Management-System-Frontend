import React from 'react';
import { Box, FormControl, MenuItem, Select } from '@mui/material';
import propTypes from 'prop-types';
import { useField } from 'formik';

function FormikSelect({ options, placeholder, name }) {
  const [field, meta] = useField(name);

  const { value, onChange, onBlur } = field;
  const { error, touched } = meta;

  return (
    <Box width={1}>
      <FormControl variant="filled" fullWidth>
        <Select
          name={name}
          value={value ?? ''}
          onChange={onChange}
          label={placeholder}
          placeholder={placeholder}
          onBlur={onBlur}
        >
          {options?.map(item => (
            <MenuItem key={item?.label} value={item?.value}>
              {item?.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {error && touched && <Box color="red">{error}</Box>}
    </Box>
  );
}

FormikSelect.propTypes = {
  name: propTypes.string.isRequired,
  options: propTypes.arrayOf(propTypes.shape({ label: propTypes.string, value: propTypes.string }))
    .isRequired,
  placeholder: propTypes.string,
};

FormikSelect.defaultProps = {
  placeholder: '',
};

export default FormikSelect;
