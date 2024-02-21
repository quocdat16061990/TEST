import React from 'react';
import { Input, InputProps } from "@mui/material";
import { useForm, Controller, FieldValues } from "react-hook-form";

interface MuiInputProps extends InputProps {
  name: string;
  label?: string;
}

const MuiInput = React.forwardRef<HTMLInputElement, MuiInputProps>(
  ({ name, label, ...rest }, ref) => {
    const { control } = useForm<FieldValues>();
   

    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input {...field} {...rest} inputRef={ref} />
        )}
      />
    );
  }
);

export default MuiInput;
