import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Heading } from "@chakra-ui/react";

interface DynamicTextHandle {
  changeValue: (newValue: string) => void;
}

const DynamicText = forwardRef<DynamicTextHandle>((props, ref) => {
  const [value, setValue] = useState("Random Text");

  // const changeValue = (newValue) => {
  //   setValue(newValue);
  // };

  useImperativeHandle(ref, () => ({
    changeValue(newValue: string) {
      setValue(newValue);
    },
  }));

  return <Heading as="h1">{value}</Heading>;
});

export default DynamicText;
