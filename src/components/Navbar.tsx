import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import ColorModeToggle from "./ColorModeToggle";

export default function Navbar() {
  const bg = useColorModeValue("gray.100", "gray.900");

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={4}
      bg={bg}
      boxShadow="sm"
      position="sticky"
      top="0"
      zIndex="10"
    >
      <Heading size="md">🏥 Warehouse Management System</Heading>

      <ColorModeToggle />
    </Flex>
  );
}
