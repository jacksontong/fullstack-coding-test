import Nav from "components/Nav";
import React, { useEffect, useRef } from "react";
import SwaggerUI from "swagger-ui";
import "swagger-ui/dist/swagger-ui.css";

const Swagger = () => {
  const divRef = useRef();

  useEffect(() => {
    SwaggerUI({
      domNode: divRef.current,
      url: "/openapi.yaml",
    });
  }, []);

  return (
    <div>
      <Nav />
      <div ref={divRef}></div>
    </div>
  );
};

export default Swagger;
