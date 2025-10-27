import {
  Box,
  Drawer,
  DrawerContent,
  Flex,
  Icon,
  Text,
  useDisclosure,
  useColorModeValue,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { LinkItems } from "../constant/sidebar.menu";
import type {
  SidebarProps,
  SidebarContentProps,
  MobileNavProps,
} from "../types/sidebar.types";
import { Link } from "react-router-dom";

export default function Sidebar({ children }: SidebarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.800")}>
      <SidebarContent
        display={{ base: "none", md: "block" }}
        onClose={onClose}
      />

      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNav onOpen={onOpen} />

      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, display }: SidebarContentProps) => {
  const bg = useColorModeValue("white", "gray.900");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Box
      transition="0.3s ease"
      bg={bg}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      display={display}
    >
      <VStack align="stretch" spacing={1} mt={8}>
        {LinkItems.map((link) => (
          <Link key={link.name} to={link.path} onClick={onClose}>
            <Flex
              key={link.name}
              align="center"
              p="3"
              mx="4"
              borderRadius="md"
              role="group"
              cursor="pointer"
              _hover={{
                bg: hoverBg,
                color: useColorModeValue("blue.600", "blue.300"),
              }}
            >
              <Icon as={link.icon} mr="4" fontSize="16" />
              <Text fontWeight="medium">{link.name}</Text>
            </Flex>
          </Link>
        ))}
      </VStack>
    </Box>
  );
};

const MobileNav = ({ onOpen }: MobileNavProps) => {
  const bg = useColorModeValue("gray.100", "gray.900");

  return (
    <Flex
      px={{ base: 4, md: 24 }}
      height="14"
      alignItems="center"
      bg={bg}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      display={{ base: "flex", md: "none" }}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<HamburgerIcon />}
      />
      <Text fontSize="lg" ml="4" fontWeight="bold">
        Menu
      </Text>
    </Flex>
  );
};
