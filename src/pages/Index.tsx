import { Box, Button, Flex, Heading, Input, VStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const predefinedUsernames = ["John", "Josh", "Joy", "Joe", "Jole", "Joff", "Joke", "Jote", "Jolly", "Joi"];
    if (predefinedUsernames.includes(username) && password === "password") {
      navigate("/chat", { state: { username } });
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Flex direction="column" align="center" justify="center" height="100vh">
      <Box p={6} rounded="md" bg="white" boxShadow="md">
        <Heading mb={6}>Login</Heading>
        <VStack spacing={4}>
          <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <Text color="red.500">{error}</Text>}
          <Button colorScheme="blue" onClick={handleLogin}>Login</Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Index;