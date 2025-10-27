import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useColorModeValue,
} from "@chakra-ui/react";
import { type TableInventoryProps } from "../../types/inventory.types";
import isExpiryClose from "../../services/isExpiryClose";

const TableInventory = ({ items }: TableInventoryProps) => {
  const tableBg = useColorModeValue("white", "gray.800");
  const headerBg = useColorModeValue("gray.200", "gray.700");
  const highlightBg = useColorModeValue("pink.100", "pink.900");

  return (
    <TableContainer>
      <Table variant="simple" bg={tableBg}>
        <TableCaption>Inventory List TLC</TableCaption>
        <Thead bg={headerBg}>
          <Tr>
            <Th>SKU</Th>
            <Th>Nama Barang</Th>
            <Th>Batch</Th>
            <Th>Expiry</Th>
            <Th>Quantity</Th>
            <Th>Location</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.values(items).map((item) => (
            <Tr
              key={item.sku}
              bg={isExpiryClose(item.expiry, 30) ? highlightBg : tableBg}
            >
              <Td>{item.sku}</Td>
              <Td>{item.name}</Td>
              <Td>{item.batch}</Td>
              <Td>{item.expiry}</Td>
              <Td>{item.qty}</Td>
              <Td>{item.location}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableInventory;
