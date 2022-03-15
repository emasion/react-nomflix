import {useLocation} from "react-router-dom";
import {useQuery} from "react-query";
import {IGetVideosResult, searchMulti} from "../api";

function Search() {
    const {search} = useLocation();
    const keyword = new URLSearchParams(search).get("keyword");
    const {data, isLoading} = useQuery<IGetVideosResult>(["search", keyword], () => searchMulti(keyword + ""));

    return (
        <h1>{keyword}</h1>
    );
}
export default Search;