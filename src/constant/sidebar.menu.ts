import { type LinkItem } from "../types/sidebar.types";
import { AddIcon, InfoIcon, ViewIcon } from "@chakra-ui/icons";

const LinkItems: LinkItem[] = [
  { name: "Dashboard", icon: ViewIcon, path: "/" },
  { name: "Inventory List", icon: InfoIcon, path: "/inventory" },
  { name: "Add Inbound Form", icon: AddIcon, path: "/add-inbound" },
];

export { LinkItems };
