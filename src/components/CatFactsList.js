import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useRef, useCallback } from "react";
import useCatFactsWithUsers from "../hooks/useCatFacts";
const CatFactsList = () => {
    const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, } = useCatFactsWithUsers();
    const observerRef = useRef(null);
    const lastFactRef = useCallback((node) => {
        if (isFetchingNextPage)
            return;
        if (observerRef.current)
            observerRef.current.disconnect();
        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        });
        if (node)
            observerRef.current.observe(node);
    }, [isFetchingNextPage, hasNextPage, fetchNextPage]);
    if (isLoading) {
        return (_jsx("div", { children: [...Array(5)].map((_, i) => (_jsxs("div", { className: "p-4 mb-4 bg-gray-200 animate-pulse rounded-md", children: [_jsx("div", { className: "h-4 bg-gray-300 w-3/4 mb-2" }), _jsx("div", { className: "h-4 bg-gray-300 w-1/2" })] }, i))) }));
    }
    if (isError)
        return _jsxs("p", { children: ["Error: ", error.message] });
    return (_jsxs("div", { className: "p-6", children: [_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: data === null || data === void 0 ? void 0 : data.pages.map((page, i) => (_jsx(React.Fragment, { children: page.data.map((item, index) => {
                        const isLastFact = i === data.pages.length - 1 && index === page.data.length - 1;
                        return (_jsxs("div", { ref: isLastFact ? lastFactRef : null, className: "max-w-sm w-full lg:max-w-full lg:flex", children: [_jsxs("div", { className: "flex items-center mb-4", children: [_jsx("img", { src: item.user.picture.thumbnail, alt: `${item.user.name.first} ${item.user.name.last}`, className: "w-16 h-16 rounded-full border-2 border-blue-500" }), _jsx("div", { className: "ml-4", children: _jsxs("p", { className: "text-lg font-bold text-gray-800", children: [item.user.name.first, " ", item.user.name.last] }) })] }), _jsx("p", { className: "text-gray-700 mt-2", children: item.fact })] }, index));
                    }) }, i))) }), isFetchingNextPage && (_jsx("p", { className: "text-center mt-4 text-blue-500", children: "Loading more..." }))] }));
};
export default CatFactsList;
