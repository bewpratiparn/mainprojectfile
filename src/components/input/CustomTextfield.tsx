import React, { useState } from 'react';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ClearIconDefault from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

function CustomTextfield(props) {
  const {
    ref,
    label,
    value,
    error,
    helperText,
    onClick,
    onChange,
    onBlur,
    onKeyDown,
    onKeyUp,
    required,
    sx,
    maxLength,
    numberOnly,
    decimal,
    isEmail,
    isPassword,
    currency,
    placeholder,
    search,
    endIcon,
    startIcon,
    outlined = true,
    disabled,
    inputRef,
    inputProps,
    clearIcon,
    onClear,
    readonly,
    multiline,
    rows,
    percentage,
    shrink,
    type,
    ...rest
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    let val = e.target.value;
    if (numberOnly) {
      // Basic number only filter (can be enhanced for decimal)
      val = val.replace(/[^0-9.]/g, '');
    }
    if (maxLength && val.length > maxLength) {
      val = val.slice(0, maxLength);
    }
    // Create synthetic event-like object to pass to onChange
    const newEvent = { ...e, target: { ...e.target, value: val } };
    if (onChange) {
      onChange(newEvent);
    }
  };

  // Determine actual input type
  let inputType = type || 'text';
  if (isPassword) {
    inputType = showPassword ? 'text' : 'password';
  } else if (isEmail) {
    inputType = 'email';
  } else if (numberOnly) {
    inputType = 'text'; // using text to control regex replacing
  }

  // Construct start Adornment
  let resolvedStartIcon = startIcon;
  if (search && !startIcon) {
    resolvedStartIcon = <SearchIcon />;
  }

  const startAdornment = resolvedStartIcon ? (
    <InputAdornment position="start">{resolvedStartIcon}</InputAdornment>
  ) : null;

  // Construct end Adornment
  let resolvedEndIcon = endIcon;
  if (isPassword) {
    resolvedEndIcon = (
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        edge="end"
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    );
  } else if (onClear && value) {
    resolvedEndIcon = (
      <IconButton aria-label="clear input" onClick={onClear} edge="end">
        {clearIcon ? clearIcon : <ClearIconDefault />}
      </IconButton>
    );
  } else if (currency) {
    resolvedEndIcon = <span style={{ marginLeft: 8 }}>{currency === 'baht' ? 'THB' : '$'}</span>;
  } else if (percentage) {
    resolvedEndIcon = <span style={{ marginLeft: 8 }}>%</span>;
  }

  const endAdornment = resolvedEndIcon ? (
    <InputAdornment position="end">{resolvedEndIcon}</InputAdornment>
  ) : null;

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <TextField
        inputRef={inputRef || ref}
        variant={outlined ? 'outlined' : 'filled'}
        fullWidth
        label={label}
        value={value}
        onChange={handleChange}
        onClick={onClick}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        error={error}
        helperText={helperText}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
        multiline={multiline}
        rows={rows}
        type={inputType}
        InputLabelProps={{
          shrink: shrink || !!value || !!placeholder,
        }}
        InputProps={{
          readOnly: readonly,
          startAdornment,
          endAdornment,
          ...inputProps,
        }}
        inputProps={{
          maxLength: maxLength,
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
          },
          ...sx,
        }}
        {...rest}
      />
    </Box>
  );
}

export default CustomTextfield;