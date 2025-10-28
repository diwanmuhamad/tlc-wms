import { useState, useEffect } from "react";
import { Box, Heading, Spinner, Text } from "@chakra-ui/react";
import TableInventory from "../components/inventory/Table";
import SearchInput from "../components/inventory/SearchInput";
import { useGetInventoryQuery } from "../services/apiSlice";
import type { InventoryItem } from "../types/inventory.types";

export default function Inventory() {
  const { data: inventory, isLoading, isError } = useGetInventoryQuery();
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>(
    []
  );
  const [inventoryLocal, setInventoryLocal] = useState<InventoryItem[]>([]);
  const inventoryLocalStorage = localStorage.getItem("inbound-data");

  useEffect(() => {
    if (inventoryLocalStorage) {
      const parsedData: InventoryItem[] = JSON.parse(inventoryLocalStorage);
      setFilteredInventory(parsedData);
      setInventoryLocal(parsedData);
    } else if (inventory) {
      setFilteredInventory(inventory);
      localStorage.setItem("inbound-data", JSON.stringify(inventory));
      setInventoryLocal(inventory);
    }
  }, [inventory]);

  if (isLoading)
    return (
      <Box p={8} textAlign="center">
        <Spinner size="xl" />
        <Text mt={4}>Loading Inventory...</Text>
      </Box>
    );

  if (isError)
    return (
      <Box p={8} textAlign="center">
        <Text color="red.400">Failed to load Inventory.</Text>
      </Box>
    );
  return (
    <Box p={4}>
      <Heading mb={4} size={"md"}>
        Inventory List
      </Heading>
      <SearchInput
        inventory={inventoryLocal ?? []}
        setFilteredInventory={setFilteredInventory}
      />
      <TableInventory items={filteredInventory} />
    </Box>
  );
}
