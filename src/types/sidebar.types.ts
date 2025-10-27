import { AddIcon } from "@chakra-ui/icons";
import { type ReactNode } from "react";

interface SidebarProps {
  children: ReactNode;
}

interface LinkItem {
  name: string;
  icon: typeof AddIcon;
  path: string;
}

interface SidebarContentProps {
  onClose: () => void;
  display?: { base?: string; md?: string };
}

interface MobileNavProps {
  onOpen: () => void;
}

export type { SidebarProps, LinkItem, SidebarContentProps, MobileNavProps };
