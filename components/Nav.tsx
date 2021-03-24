import { Box, HStack, Link } from "@chakra-ui/layout";
import React from "react";
import NextLink from "next/link";
import { useAuth } from "contexts/useAuth";
import { Button, toast, useToast } from "@chakra-ui/react";
import router from "next/router";

const Nav = () => {
  const { isAdmin, signout } = useAuth();
  const toast = useToast();

  return (
    <nav>
      <HStack spacing="5">
        <Box>
          <Link as={NextLink} href="/swagger">
            Swagger UI
          </Link>
        </Box>

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

        <Button
          onClick={async () => {
            await signout();
            toast({
              status: "warning",
              title: "Goodbye.",
            });
            router.push("/signin");
          }}
          mt="3">
          Logout
        </Button>
      </HStack>
    </nav>
  );
};

export default Nav;
