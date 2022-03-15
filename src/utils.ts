import {IVideo} from "./api";

export const makeImagePath = (id: string, format: string = "original") => {
    return `https://image.tmdb.org/t/p/${format}${id}`;
}

export const filterNullBackdropPath = (results:IVideo[]) => {
    const copyResults = [...results];
    copyResults.map((movie, idx) => {
        if (!movie.backdrop_path) {
            return copyResults.splice(idx, 1);
        }
        return copyResults;
    })
    return copyResults;
}
