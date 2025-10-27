import { useState, useEffect } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { type LocationOption } from "../../types/inbound.types";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { FormData } from "../../types/inbound.types";
import { useGetLocationsQuery } from "../../services/apiSlice";

export const SelectLocation = ({
  errors,
  register,
}: {
  errors: FieldErrors<FormData>;
  register: UseFormRegister<FormData>;
}) => {
  const { data: locations } = useGetLocationsQuery();
  const [dataLocations, setDataLocations] = useState<LocationOption[]>([]);
  useEffect(() => {
    if (locations) setDataLocations(locations);
  }, [locations]);

  return (
    <FormControl w="100%" isInvalid={!!errors.location}>
      <FormLabel>Location</FormLabel>
      <Select
        placeholder="Select Location"
        {...register("location", {
          required: "Location is required",
        })}
      >
        {dataLocations.map((loc: LocationOption) => (
          <option key={loc.id} value={loc.id}>
            {loc.label}
          </option>
        ))}
      </Select>
      <FormErrorMessage>
        {errors.location && errors.location.message}
      </FormErrorMessage>
    </FormControl>
  );
};
