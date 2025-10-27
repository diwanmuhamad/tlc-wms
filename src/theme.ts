import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light", // can be "dark"
  useSystemColorMode: false, // set to true to follow OS theme
};

const theme = extendTheme({ config });

export default theme;
