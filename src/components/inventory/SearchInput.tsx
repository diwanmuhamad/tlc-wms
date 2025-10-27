import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { type InventoryItem } from "../../types/inventory.types";

const SearchInput = ({
  inventory,
  setFilteredInventory,
}: {
  inventory: InventoryItem[];
  setFilteredInventory: (item: InventoryItem[]) => void;
}) => {
  const handleSearch = (searchTerm: string) => {
    if (!inventory) return;
    const filtered = inventory.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInventory(filtered);
  };

  return (
    <InputGroup mb={4} maxW="400px">
      <InputLeftElement>
        <LuSearch />
      </InputLeftElement>
      <Input
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search SKU or Name"
      />
    </InputGroup>
  );
};

export default SearchInput;
