import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Stack,
  Flex,
  Box,
} from "@chakra-ui/react";
import { type Temperature } from "../../types/dashboard.types";
import { isTemperatureNormal } from "../../services/isTemperatureNormal";

const CardDashboard = (data: Temperature) => {
  return (
    <Card maxW="sm">
      <CardHeader>
        <Heading size="md">Ruang Penyimpanan</Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing="3">
          <Flex gap={2}>
            <Text>Nama ruang: </Text>
            <Heading size={"md"}>{data.room_id}</Heading>
          </Flex>
          <Text>Suhu terkini: {data.temperature}°C</Text>
          <Flex gap={2}>
            <Text>Status suhu: </Text>
            {isTemperatureNormal(data.temperature) ? (
              <Flex align="center" mb={2}>
                <Box
                  w="12px"
                  h="12px"
                  borderRadius="full"
                  bg="green.400"
                  mr={2}
                />
                <Text>Normal</Text>
              </Flex>
            ) : (
              <Flex align="center">
                <Box
                  w="12px"
                  h="12px"
                  borderRadius="full"
                  bg="red.400"
                  mr={2}
                />
                <Text>Abnormal</Text>
              </Flex>
            )}
          </Flex>
        </Stack>
      </CardBody>
      <CardFooter justifyContent="flex-end" gap="2"></CardFooter>
    </Card>
  );
};

export default CardDashboard;
