import React from "react";
import { Form, Formik } from "formik";
import FormGroup from "components/formik/FormGroup";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import { Button, useToast, VStack } from "@chakra-ui/react";
import * as Yup from "yup";
import firebase from "firebase";
import Link from "next/link";

const Signup = () => {
  const toast = useToast();

  return (
    <div className={styles.container}>
      <Head>
        <title>Signup</title>
      </Head>

      <main className={styles.main}>
        <Formik
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
          })}
          initialValues={{ email: "", password: "" }}
          onSubmit={async ({ email, password }) => {
            try {
              const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
              console.log(response);
            } catch (error) {
              toast({
                status: "error",
                title: error.message,
                position: "bottom-right",
              });
            }
          }}>
          {({ isSubmitting }) => (
            <Form noValidate>
              <h1>Signup</h1>
              <VStack spacing="3" padding="3">
                <FormGroup id="email" name="email" type="email" label="Email" />
                <FormGroup id="password" name="password" type="password" label="Password" />

                <Button type="submit" isLoading={isSubmitting}>
                  Submit
                </Button>

                <Link href="/signin">Sign in</Link>
              </VStack>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
};

export default Signup;
