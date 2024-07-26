import { Models } from "appwrite"
import Loader from "./Loader"
import GridPostList from "./GridPostList"

type searchResultsProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.Document[];
}

const SearchResult = ({isSearchFetching, searchedPosts}:searchResultsProps ) => {
  if(isSearchFetching) return <Loader />

  if(searchedPosts && searchedPosts.documents.length > 0) 
    return (
    <GridPostList posts={searchedPosts.documents}/>
  )

  return (
    <p className="text-light-4 mt-10 text-center w-full">No result found</p>
  )
}

export default SearchResult