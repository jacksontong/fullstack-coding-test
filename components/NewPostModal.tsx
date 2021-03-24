import { useDisclosure } from "@chakra-ui/hooks";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { Button, FormControl, HStack, ModalCloseButton, useToast, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import FormGroup from "./formik/FormGroup";
import { Editor } from "@tinymce/tinymce-react";
import * as Yup from "yup";
import { createPost, Post } from "api";

interface Props {
  onPostCreated?: (post: Post) => void;
}

const NewPostModal: React.FC<Props> = ({ onPostCreated }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        New Post
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />

        <ModalContent>
          <Formik
            initialValues={{ title: "", body: "", image: "" }}
            validationSchema={Yup.object().shape({
              title: Yup.string().min(4).max(100).required(),
              body: Yup.string(),
            })}
            onSubmit={async (values) => {
              try {
                const { data: post } = await createPost(values);
                toast({
                  status: "success",
                  title: "Post saved.",
                });

                if (onPostCreated) {
                  onPostCreated(post);
                }

                onClose();
              } catch (error) {
                toast({
                  status: "error",
                  title: error.message,
                });
              }
            }}>
            {({ isSubmitting, setFieldValue, setFieldTouched }) => (
              <Form noValidate>
                <ModalHeader>New Post</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                  <VStack alignItems="stretch" spacing="3">
                    <FormGroup label="Title" id="title" name="title" />

                    <FormControl>
                      <label>Body</label>
                      <Editor
                        onEditorChange={(content) => {
                          setFieldValue("body", content);
                          setFieldTouched("body", true);
                        }}
                        apiKey="ium1hzxa2o1sionw787zoldp0vi1i5o0wh7eas3ivlbzfge4"
                        init={{
                          height: 500,
                          menubar: false,
                          plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime media table paste code help wordcount",
                          ],
                          toolbar:
                            "undo redo | formatselect | bold italic backcolor | \
alignleft aligncenter alignright alignjustify | \
bullist numlist outdent indent | removeformat | help",
                        }}
                      />
                    </FormControl>
                  </VStack>
                </ModalBody>

                <ModalFooter>
                  <HStack>
                    <Button isLoading={isSubmitting} colorScheme="cyan" type="submit">
                      Save
                    </Button>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Close
                    </Button>
                  </HStack>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewPostModal;
