import {useQuery} from "react-query";
import {
    getTvNow,
    getTvPopular,
    getTvTop,
    IGetVideosResult
} from "../api";
import {filterNullBackdropPath, makeImagePath} from "../utils";
import Slider from "../Components/Slider";
import React from "react";
import {Wrapper, Banner, Title, Overview, Container, SubTitle, Loader} from "../Components/common.style";
import DetailBoxTv from "../Components/DetailBoxTv";

function Tv() {
    const {
        data: nowTv,
        isLoading: isLoadingNow
    } = useQuery<IGetVideosResult>(["tv", "onTheAir"], getTvNow);
    const {
        data: topTv,
        isLoading: isLoadingTop
    } = useQuery<IGetVideosResult>(["tv", "top"], getTvTop);
    const {
        data: popularTv,
        isLoading: isLoadingPopular
    } = useQuery<IGetVideosResult>(["tv", "upcoming"], getTvPopular);

    return (
        <Wrapper>
            <Banner
                bgphoto={makeImagePath(nowTv?.results[0].backdrop_path || "")}>
                <Title>{nowTv?.results[0].title}</Title>
                <Overview>{nowTv?.results[0].overview}</Overview>
            </Banner>
            <Container>
                <SubTitle>현재 방송중인 시리즈</SubTitle>
                {isLoadingNow ? <Loader>Loading...</Loader> : <Slider type="now" videos={nowTv ? filterNullBackdropPath(nowTv.results.slice(1)) : []}/>}
                <div style={{height: "50px"}}></div>
                <SubTitle>최고의 평점을 받은 시리즈</SubTitle>
                {isLoadingTop ? <Loader>Loading...</Loader> : <Slider type="top" videos={topTv ? filterNullBackdropPath(topTv.results) : []}/>}
                <div style={{height: "50px"}}></div>
                <SubTitle>가장 인기 많은 시리즈</SubTitle>
                {isLoadingPopular ? <Loader>Loading...</Loader> : <Slider type="popular" videos={popularTv ? filterNullBackdropPath(popularTv.results) : []}/>}
            </Container>
            <DetailBoxTv/>
        </Wrapper>
    )
}

export default Tv;