import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CatFactsList from "./components/CatFactsList";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Cat Facts</h1>
        <CatFactsList />
      </div>
    </QueryClientProvider>
  );
};

export default App;
