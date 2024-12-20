import React, { useRef, useCallback } from "react";
import useCatFactsWithUsers from "../hooks/useCatFacts";

const CatFactsList = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useCatFactsWithUsers();

  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastFactRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  if (isLoading) {
    return (
      <div>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="p-4 mb-4 bg-gray-200 animate-pulse rounded-md"
          >
            <div className="h-4 bg-gray-300 w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.pages.map((page: any, i: number) => (
          <React.Fragment key={i}>
            {page.data.map((item: any, index: number) => {
              const isLastFact =
                i === data.pages.length - 1 && index === page.data.length - 1;
              return (
                <div
                  key={index}
                  ref={isLastFact ? lastFactRef : null}
                  className="max-w-sm w-full lg:max-w-full lg:flex"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={item.user.picture.thumbnail}
                      alt={`${item.user.name.first} ${item.user.name.last}`}
                      className="w-16 h-16 rounded-full border-2 border-blue-500"
                    />
                    <div className="ml-4">
                      <p className="text-lg font-bold text-gray-800">
                        {item.user.name.first} {item.user.name.last}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-2">{item.fact}</p>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      {isFetchingNextPage && (
        <p className="text-center mt-4 text-blue-500">Loading more...</p>
      )}
    </div>
  );
};

export default CatFactsList;
