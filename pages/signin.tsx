import { VStack, Button, useToast } from "@chakra-ui/react";
import FormGroup from "components/formik/FormGroup";
import { Formik, Form } from "formik";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import Link from "next/link";
import * as Yup from "yup";
import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "contexts/useAuth";

const Signin = () => {
  const toast = useToast();
  const router = useRouter();
  const auth = useAuth();

  return (
    <div className={styles.container}>
      <Head>
        <title>Sign in</title>
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
              await auth.signin(email, password);
              toast({
                status: "success",
                title: "Welcome back!",
              });
              router.push("/");
            } catch (error) {
              toast({
                status: "error",
                title: error.message,
              });
            }
          }}>
          {({ isSubmitting }) => (
            <Form noValidate>
              <h1>Sign in</h1>
              <VStack spacing="3" padding="3">
                <FormGroup id="email" name="email" type="email" label="Email" />
                <FormGroup id="password" name="password" type="password" label="Password" />

                <Button type="submit" isLoading={isSubmitting}>
                  Submit
                </Button>

                <Link href="/signup">Signup</Link>
              </VStack>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
};

export default Signin;
