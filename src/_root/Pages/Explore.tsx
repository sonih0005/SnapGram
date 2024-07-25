import GridPostList from "@/components/Shared/GridPostList";
import Loader from "@/components/Shared/Loader";
import SearchResult from "@/components/Shared/SearchResult";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebouncing";
import {
  useGetPosts,
  useSearchPosts,
} from "@/lib/react-query/queriesAndMutations";
import { useState } from "react";

const Explore = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);
  const { data: searchPosts, isFetching: isSearchFetching } =
    useSearchPosts(debouncedValue);
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

  if(!posts){
    return <Loader />
  }

  const shouldShowSearchResult = searchValue !== "";
  const shouldShowPosts =
    !shouldShowSearchResult &&
    posts.pages.every((item) => item.documents.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-llg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            alt="search-icon"
            width={24}
            height={24}
          />
          <Input
            type="text"
            placeholder="search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>

        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            alt="filter"
            width={20}
            height={20}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResult ? (
          <SearchResult />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">
            End of the Posts
          </p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item?.documents} />
          ))
        )}
      </div>
    </div>
  );
};

export default Explore;
