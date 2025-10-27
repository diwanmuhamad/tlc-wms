import { Box, Heading } from "@chakra-ui/react";
import InboundForm from "../components/inbound/Form";

export default function Dashboard() {
  return (
    <Box p={4} mx="auto">
      <Heading mb={4} size={"lg"} textAlign={"center"}>
        Add Inbound Form
      </Heading>
      <InboundForm />
    </Box>
  );
}
