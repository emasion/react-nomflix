import {useQuery} from "react-query";
import {getMoviesNow, getMoviesTop, getMoviesUpcoming, IGetVideosResult} from "../api";
import {filterNullBackdropPath, makeImagePath} from "../utils";
import DetailBox from "../Components/DetailBox";
import Slider from "../Components/Slider";
import React from "react";
import {Wrapper, Banner, Title, Overview, Container, SubTitle, Loader} from "../Components/common.style";

function Home() {
    const {
        data: nowMovies,
        isLoading: isLoadingNow
    } = useQuery<IGetVideosResult>(["movies", "nowPlaying"], getMoviesNow);
    const {
        data: topMovies,
        isLoading: isLoadingTop
    } = useQuery<IGetVideosResult>(["movies", "top"], getMoviesTop);
    const {
        data: upcomingMovies,
        isLoading: isLoadingUpcoming
    } = useQuery<IGetVideosResult>(["movies", "upcoming"], getMoviesUpcoming);

    return (
        <Wrapper>
            <Banner
                bgphoto={makeImagePath(nowMovies?.results[0].backdrop_path || "")}>
                <Title>{nowMovies?.results[0].title}</Title>
                <Overview>{nowMovies?.results[0].overview}</Overview>
            </Banner>
            <Container>
                <SubTitle>현재 상영중인 영화</SubTitle>
                {isLoadingNow ? <Loader>Loading...</Loader> : <Slider type="now" videos={nowMovies ? filterNullBackdropPath(nowMovies.results.slice(1)) : []}/>}
                <div style={{height: "50px"}}></div>
                <SubTitle>최고의 평점을 받은 영화</SubTitle>
                {isLoadingTop ? <Loader>Loading...</Loader> : <Slider type="top" videos={topMovies ? filterNullBackdropPath(topMovies.results) : []}/>}
                <div style={{height: "50px"}}></div>
                <SubTitle>개봉 예정 영화</SubTitle>
                {isLoadingUpcoming ? <Loader>Loading...</Loader> : <Slider type="coming" videos={upcomingMovies ? filterNullBackdropPath(upcomingMovies.results) : []}/>}
            </Container>
            <DetailBox/>
        </Wrapper>
    )
}

export default Home;