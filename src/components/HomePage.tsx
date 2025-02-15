"use client";

import { Heading, Box } from "@cruk/cruk-react-components";
import { List } from "./List";
import { Form } from "./Form";
import { useState } from "react";
import { NasaSearchParams } from "../types";

export const HomePage = () => {
  const [values, setValues] = useState<NasaSearchParams>();
  console.log(values);

  return (
    <Box marginTop="s" paddingTop="s">
      <Heading h1>React Exercise</Heading>
      <Form setValues={setValues} />
      
      { values && <List searchValues={values}/> }
    </Box>
  );
};

export default HomePage;
