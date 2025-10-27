import { Controller } from "react-hook-form";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { Control, FieldErrors } from "react-hook-form";
import type { FormData } from "../../types/inbound.types";

export const DatePickerField = ({
  control,
  errors,
}: {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // ensure no time difference issues
  return (
    <FormControl w="100%" isInvalid={!!errors.expiry}>
      <FormLabel>Expiry Date</FormLabel>

      <Box
        w="100%"
        sx={{
          ".chakra-datepicker": {
            width: "100%", // make the wrapper full width
          },
        }}
      >
        <Controller
          name="expiry"
          control={control}
          rules={{
            required: "Expiry Date is required",
            validate: (value) => {
              if (!value) return "Expiry Date is required";
              const selected = new Date(value);
              selected.setHours(0, 0, 0, 0);
              return selected >= today || "Expiry Date cannot be in the past";
            },
          }}
          render={({ field }) => (
            <DatePicker
              selected={field.value ? new Date(field.value) : null}
              onChange={(date) => field.onChange(date)}
              dateFormat="yyyy-MM-dd"
              customInput={
                <Input
                  w="100%"
                  placeholder="Select date"
                  value={
                    field.value
                      ? new Date(field.value).toLocaleDateString()
                      : ""
                  }
                  readOnly
                />
              }
              wrapperClassName="chakra-datepicker"
            />
          )}
        />
      </Box>

      <FormErrorMessage>{errors.expiry?.message}</FormErrorMessage>
    </FormControl>
  );
};
