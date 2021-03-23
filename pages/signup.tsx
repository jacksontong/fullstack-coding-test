import React, { useState } from "react";
import { Form, Formik } from "formik";
import FormGroup from "components/formik/FormGroup";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import { Button, FormControl, FormLabel, Input, useToast, VStack } from "@chakra-ui/react";
import * as Yup from "yup";
import Link from "next/link";
import { useAuth } from "contexts/useAuth";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { createUser } from "api";

const Signup = () => {
  const toast = useToast();
  const auth = useAuth();
  const router = useRouter();
  const [dob, setDob] = useState(new Date());

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
            passwordConfirm: Yup.string()
              .oneOf([Yup.ref("password"), null])
              .required("Password confirm is required"),
            name: Yup.string().min(4).max(50).required(),
            dob: Yup.string(),
          })}
          initialValues={{ email: "", password: "", name: "", dob: "" }}
          onSubmit={async ({ email, password, name, dob }) => {
            try {
              const user = await auth.signup(email, password);
              await createUser({
                name,
                uid: user.uid,
                dob,
              });

              router.push("/");
            } catch (error) {
              toast({
                status: "error",
                title: error.message,
              });
            }
          }}>
          {({ isSubmitting, setFieldValue }) => (
            <Form noValidate>
              <h1>Signup</h1>
              <VStack spacing="3" padding="3">
                <FormGroup id="name" name="name" label="Name" />
                <FormGroup id="email" name="email" type="email" label="Email" />
                <FormGroup id="password" name="password" type="password" label="Password" />
                <FormGroup id="passwordConfirm" name="passwordConfirm" type="password" label="Confirm Password" />

                <FormControl>
                  <FormLabel htmlFor="dob">Date of birth</FormLabel>
                  <DatePicker
                    showYearDropdown
                    customInput={<Input id="dob" />}
                    selected={dob}
                    onChange={(date) => {
                      if (date instanceof Date) {
                        setDob(date);
                        setFieldValue("dob", format(date, "yyyy-MM-dd"));
                      }
                    }}
                  />
                </FormControl>

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
