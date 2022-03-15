const API_KEY = "57512756bf0b9989bb5eca064e148476";
const BASE_PATH = "https://api.themoviedb.org/3"

export interface IVideo {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    vote_average: number;
    overview: string;
    release_date: string;
    first_air_date?: string;
    last_air_date: string;
    name?: string;
}

export interface IGetVideosResult {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: IVideo[];
    total_pages: number;
    total_results: number;
}

export function getMoviesNow() {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&region=kr&page=1`).then(
        (response) => response.json()
    );
}

export function getMoviesTop() {
    return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko-KR&region=kr&page=1`).then(
        (response) => response.json()
    );
}

export function getMoviesUpcoming() {
    return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&region=kr&page=1`).then(
        (response) => response.json()
    );
}

export function getTvNow() {
    return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=ko-KR&region=kr&page=1`).then(
        (response) => response.json()
    );
}

export function getTvTop() {
    return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko-KR&region=kr&page=1`).then(
        (response) => response.json()
    );
}

export function getTvPopular() {
    return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko-KR&region=kr&page=1`).then(
        (response) => response.json()
    );
}

export function getMovie(id: string) {
    return fetch(`${BASE_PATH}/movie/${id}?api_key=${API_KEY}&language=ko-KR&region=kr`).then(
        (response) => response.json()
    );
}

export function getCredit(id: string) {
    return fetch(`${BASE_PATH}/movie/${id}/credits?api_key=${API_KEY}&language=ko-KR`).then(
        (response) => response.json()
    );
}

export function getSimilar(id: string) {
    return fetch(`${BASE_PATH}/movie/${id}/similar?api_key=${API_KEY}&language=ko-KR&page=1`).then(
        (response) => response.json()
    );
}

export function getTv(id: string) {
    return fetch(`${BASE_PATH}/tv/${id}?api_key=${API_KEY}&language=ko-KR&region=kr`).then(
        (response) => response.json()
    );
}

export function getCreditTv(id: string) {
    return fetch(`${BASE_PATH}/tv/${id}/credits?api_key=${API_KEY}&language=ko-KR`).then(
        (response) => response.json()
    );
}

export function getSimilarTv(id: string) {
    return fetch(`${BASE_PATH}/tv/${id}/similar?api_key=${API_KEY}&language=ko-KR&page=1`).then(
        (response) => response.json()
    );
}


export function searchMulti(keyword: string) {
    return fetch(`${BASE_PATH}/search/multi?api_key=${API_KEY}&query=${keyword}&language=ko-KR&region=kr`).then(
        (response) => response.json()
    );
}