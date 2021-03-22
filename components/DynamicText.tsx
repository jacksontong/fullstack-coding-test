import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Heading, useBreakpointValue } from "@chakra-ui/react";

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

  const maxWidth = useBreakpointValue({
    sm: "450px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  });

  return (
    <Heading as="h1" isTruncated style={{ maxWidth }}>
      {value}
    </Heading>
  );
});

export default DynamicText;
