import {
  Button,
  FormControl,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import FormGroup from "./formik/FormGroup";
import { Editor } from "@tinymce/tinymce-react";
import { Post, updatePost } from "api";

interface Props {
  post: Post;
  onPostUpdated?: (post: Post) => void;
}

const EditPostModal: React.FC<Props> = ({ post, onPostUpdated }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        Edit Post
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />

        <ModalContent>
          <Formik
            initialValues={{ title: post.title, body: post.body }}
            onSubmit={async (values) => {
              try {
                await updatePost(post.id, values);
                toast({ status: "success", title: "Post saved." });

                if (onPostUpdated) {
                  onPostUpdated({
                    ...post,
                    ...values,
                  });
                }

                onClose();
              } catch (error) {
                toast({ status: "error", title: error.message });
              }
            }}
            validationSchema={Yup.object().shape({
              title: Yup.string().min(4).max(100).required(),
              body: Yup.string(),
            })}>
            {({ setFieldTouched, setFieldValue, isSubmitting }) => (
              <Form noValidate>
                <ModalHeader>Edit Post</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                  <VStack alignItems="stretch" spacing="3">
                    <FormGroup label="Title" id="title" name="title" />

                    <FormControl>
                      <label>Body</label>
                      <Editor
                        initialValue={post.body}
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

export default EditPostModal;
