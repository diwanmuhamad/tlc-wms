import { Box, Heading, Grid, Spinner, Text } from "@chakra-ui/react";
import CardDashboard from "../components/dashboard/Card";
import { usePolling } from "../hooks/usePolling";

export default function Dashboard() {
  const { temperatures, isLoading, isError } = usePolling(10000);

  if (isLoading)
    return (
      <Box p={8} textAlign="center">
        <Spinner size="xl" />
        <Text mt={4}>Loading temperatures...</Text>
      </Box>
    );

  if (isError)
    return (
      <Box p={8} textAlign="center">
        <Text color="red.400">Failed to load temperatures.</Text>
      </Box>
    );

  return (
    <Box p={4}>
      <Heading mb={9} size="xl">
        Dashboard
      </Heading>

      <Grid templateColumns="repeat(3, 1fr)" gap="6">
        {temperatures?.map((data, index) => (
          <CardDashboard key={index} {...data} />
        ))}
      </Grid>
    </Box>
  );
}
