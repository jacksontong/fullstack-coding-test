import { useField, FieldHookConfig } from "formik";
import React, { InputHTMLAttributes } from "react";
import { FormErrorMessage, FormLabel, FormControl, Input } from "@chakra-ui/react";

type Props = FieldHookConfig<string> &
  InputHTMLAttributes<HTMLInputElement> & {
    label: string | React.ReactElement;
  };

const FormGroup: React.FC<Props> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const invalid = meta.touched && !!meta.error;

  return (
    <FormControl isInvalid={invalid}>
      <FormLabel htmlFor={props.id}>{label}</FormLabel>
      <Input {...field} id={props.id} type={props.type} />
      <FormErrorMessage>{invalid && meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default FormGroup;
