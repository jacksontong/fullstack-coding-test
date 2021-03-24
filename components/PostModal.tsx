import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { Post } from "api";

export interface PostModalHandle {
  open: () => void;
  setPost: (post: Post) => void;
}

const PostModal = forwardRef<PostModalHandle>((props, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [post, setPost] = useState({} as Post);

  useImperativeHandle(ref, () => ({
    open() {
      onOpen();
    },
    setPost(post: Post) {
      setPost(post);
    },
  }));

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>{post.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody dangerouslySetInnerHTML={{ __html: post.body }} />
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default PostModal;
