import { Box, Flex, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="blue.500" p={4} color="white">
      <Flex justify="space-between">
        <Link as={RouterLink} to="/" color="white" fontWeight="bold">Home</Link>
        <Link as={RouterLink} to="/chat" color="white" fontWeight="bold">Chat</Link>
      </Flex>
    </Box>
  );
};

export default Navbar;