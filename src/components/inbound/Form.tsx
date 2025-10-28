import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { type FormData } from "../../types/inbound.types";
import { DatePickerField } from "./DatePicker";
import { SelectLocation } from "./Select";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useGetInventoryQuery } from "../../services/apiSlice";
import type { InventoryItem } from "../../types/inventory.types";
import { useEffect, useState } from "react";
import { formatDateToYYYYMMDD } from "../../services/formatDate";

const InboundForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>();

  const { data: inventory } = useGetInventoryQuery();
  const [inventoryLocal, setInventoryLocal] = useState<InventoryItem[]>([]);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (inventory) setInventoryLocal(inventory); // initialize local state
  }, [inventory]);

  const onSubmit = (data: FormData) => {
    try {
      const inventoryLocalStorage = localStorage.getItem("inbound-data");
      let inventoryArray: InventoryItem[] = [];
      if (inventoryLocalStorage) {
        const parsedData: InventoryItem[] = JSON.parse(inventoryLocalStorage);
        inventoryArray = parsedData;
      }
      const newestInventory: InventoryItem[] =
        inventoryArray.length > 0 ? [...inventoryArray] : [...inventoryLocal];
      console.log(newestInventory);
      newestInventory.push({
        sku: data.sku,
        name: data.name,
        batch: data.batch,
        expiry: formatDateToYYYYMMDD(new Date(data.expiry)),
        qty: data.qty,
        location: data.location,
      });

      localStorage.setItem("inbound-data", JSON.stringify(newestInventory));
      toast({
        title: "Success",
        description: "Inbound data saved successfully.",
        status: "success",
        duration: 3000,
        position: "top-right",

        isClosable: true,
      });
      reset();
      // Redirect to /inventory
      navigate("/inventory");
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to save inbound data.",
        status: "error",
        duration: 3000,

        isClosable: true,
      });
      return;
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      maxW="70%"
      mx="auto"
      mt={10}
      p={5}
      borderWidth="1px"
      borderRadius="lg"
    >
      <Stack spacing={4}>
        {/* SKU */}
        <FormControl isInvalid={!!errors.sku}>
          <FormLabel>SKU</FormLabel>
          <Input
            placeholder="SKU"
            {...register("sku", {
              required: "SKU is required",
            })}
          />
          <FormErrorMessage>
            {errors.sku && errors.sku.message}
          </FormErrorMessage>
        </FormControl>

        {/* Product Name */}
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Nama Barang</FormLabel>
          <Input
            placeholder="Nama Barang"
            {...register("name", {
              required: "Nama Barang is required",
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>

        {/* Batch Number */}
        <FormControl isInvalid={!!errors.batch}>
          <FormLabel>Batch Number</FormLabel>
          <Input
            placeholder="Batch Number"
            {...register("batch", {
              required: "Batch Number is required",
            })}
          />
          <FormErrorMessage>
            {errors.batch && errors.batch.message}
          </FormErrorMessage>
        </FormControl>

        {/* Expiry Date */}
        <DatePickerField errors={errors} control={control} />

        {/* Quantity */}
        <FormControl isInvalid={!!errors.qty}>
          <FormLabel>Quantity</FormLabel>
          <Input
            type="number"
            placeholder="Enter quantity"
            {...register("qty", {
              required: "Quantity is required",
              min: { value: 1, message: "Quantity must be at least 1" },
            })}
          />
          <FormErrorMessage>
            {errors.qty && errors.qty.message}
          </FormErrorMessage>
        </FormControl>

        {/* Location */}
        <SelectLocation errors={errors} register={register} />

        <Button type="submit" colorScheme="teal">
          Save
        </Button>
      </Stack>
    </Box>
  );
};

export default InboundForm;
