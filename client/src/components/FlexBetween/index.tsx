import React from "react";
import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/system";

interface FlexBetweenProps extends BoxProps {
  children: React.ReactNode;
}

const FlexBetween = styled((props: FlexBetweenProps) => (
  <Box {...props} />
))<FlexBetweenProps>(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export default FlexBetween;
