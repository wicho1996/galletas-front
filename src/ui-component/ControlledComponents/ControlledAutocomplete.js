import React from "react";
import {
  Grid,
  TextField,
  Autocomplete,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";


const ControlledAutocomplete = ({ options = [], renderInput, getOptionLabel, isOptionEqualToValue, onChange: ignored, control, defaultValue, name, renderOption, multiple, freeSolo }) => {

    return (
        <Controller
        render={({ field }) => (
            <Autocomplete
            options={options}
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={isOptionEqualToValue}
            renderOption={renderOption}
            renderInput={renderInput}
            onChange={(e, data) => field.onChange(data)}
            value={field.value || (multiple ? [] : null)}
            multiple={multiple}
            freeSolo={freeSolo}
            />
        )}
        onChange={([, data]) => data}
        defaultValue={defaultValue || null}
        name={name}
        control={control}
        />
    );
}

export default ControlledAutocomplete;