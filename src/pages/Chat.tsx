import { Box, Flex, Heading, Input, Button, VStack, Text, HStack, Avatar } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const Chat = () => {
  const location = useLocation();
  const { username } = location.state as { username: string };
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    socket.emit("login", username);

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.emit("logout", username);
      socket.off();
    };
  }, [username]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("message", { user: username, text: message });
      setMessage("");
    }
  };

  return (
    <Flex direction="column" height="100vh">
      <Box p={4} bg="blue.500" color="white">
        <Heading>Chat Application</Heading>
      </Box>
      <Flex flex={1}>
        <Box w="20%" p={4} bg="gray.100">
          <Heading size="md" mb={4}>Online Users</Heading>
          <VStack align="start">
            {onlineUsers.map((user) => (
              <HStack key={user}>
                <Avatar size="sm" bg="green.500" />
                <Text>{user}</Text>
              </HStack>
            ))}
          </VStack>
        </Box>
        <Flex direction="column" flex={1} p={4}>
          <Box flex={1} overflowY="auto" mb={4}>
            {messages.map((msg, index) => (
              <Box key={index} p={2} bg={msg.user === username ? "blue.100" : "gray.100"} mb={2} borderRadius="md">
                <Text fontWeight="bold">{msg.user}</Text>
                <Text>{msg.text}</Text>
              </Box>
            ))}
          </Box>
          <HStack>
            <Input placeholder="Type a message" value={message} onChange={(e) => setMessage(e.target.value)} />
            <Button colorScheme="blue" onClick={sendMessage}>Send</Button>
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Chat;