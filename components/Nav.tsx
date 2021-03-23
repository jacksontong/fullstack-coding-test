import { Box, HStack, Link } from "@chakra-ui/layout";
import React from "react";
import NextLink from "next/link";
import { useAuth } from "contexts/useAuth";

const Nav = () => {
  const { isAdmin } = useAuth();
  return (
    <nav>
      <HStack spacing="4">
        <Box>
          <Link as={NextLink} href="/">
            Index
          </Link>
        </Box>

        <Box>
          <Link as={NextLink} href="/blog">
            Blog
          </Link>
        </Box>

        {isAdmin && (
          <Box>
            <Link as={NextLink} href="/dashboard">
              Dashboard
            </Link>
          </Box>
        )}
      </HStack>
    </nav>
  );
};

export default Nav;
