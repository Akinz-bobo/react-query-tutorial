import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import { useInfiniteQuery } from 'react-query'

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  // TODO: get data for InfiniteScroll via React Query
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError } = useInfiniteQuery('sw-species', ({ pageParem = initialUrl }) => fetchUrl(pageParem), { getNextPageParam: (lastPage) => lastPage.next() || undefined });

  if (isLoading) return <h3 className="loading">Loading data...</h3>
  if (isError) return <h3 style={{ color: 'red' }}>Error occured!</h3>

  return <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
    {data.pages.map(pageData => pageData.results.map(specie => (
      <Species key={specie.name} name={specie.name} language={specie.language} averageLifespan={specie.averageLifespan} />
    )))}
    {isFetching && <h3 style={{ color: 'green' }}>Fetching Data...</h3>}
  </InfiniteScroll>;
}
