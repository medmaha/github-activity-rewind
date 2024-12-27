"use client";

import React, { ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "react-query";

const client = new QueryClient();

type Props = {
  children: ReactNode;
};

export default function AppQueryProvider(props: Props) {
  return (
    <QueryClientProvider client={client}>{props.children}</QueryClientProvider>
  );
}
