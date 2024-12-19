import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CatFactsList from "./components/CatFactsList";
const queryClient = new QueryClient();
const App = () => {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsxs("div", { className: "p-6", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Cat Facts" }), _jsx(CatFactsList, {})] }) }));
};
export default App;
