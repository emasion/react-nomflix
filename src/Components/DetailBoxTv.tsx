import {AnimatePresence, useViewportScroll} from "framer-motion";
import {useHistory, useRouteMatch} from "react-router-dom";
import {getCreditTv, getSimilarTv, getTv, IGetVideosResult} from "../api";
import {useQuery} from "react-query";
import {makeImagePath} from "../utils";
import React from "react";
import {
    SubTitle,
    Overlay,
    BigBox,
    BoxLoading,
    BigCover,
    DetailTitle,
    DetailInfo,
    DetailInfoRelease,
    DetailInfoRuntime,
    DetailSubInfo,
    DetailOverview,
    SimilarWrapper,
    Row,
    Box,
    Info
} from "../Components/common.style";

interface IDetailBox {
    videoId: string;
}

interface IDetailInfo {
    genres: {
        id: number;
        name: string;
    }[]
    adult: false
    backdrop_path: string;
    homepage: string;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    last_air_date: string;
    revenue: number;
    runtime: number;
    status: string;
    tagline: string;
    title: string;
    video: boolean
    vote_average: number;
    vote_count: number;
    episode_run_time: number;
}

interface ICreditInfo {
    cast: {
        id: number;
        name: string;
    }[]
}

const infoVariants = {
    hover: {
        opacity: 1,
        transition: {
            duration: 0.3,
            type: "tween"
        }
    }
}

function DetailBoxTv() {
    const tvMatch = useRouteMatch<{ tvId: string, type: string }>("/tv/:type/:tvId");
    const videoId = tvMatch?.params.tvId || "";
    const type = tvMatch?.params.type || "";
    const history = useHistory();
    const {scrollY} = useViewportScroll();
    const onOverlayClick = () => history.push("/tv");
    const {
        data: detail,
        isLoading: isLoadingDetail
    } = useQuery<IDetailInfo>(["tv", videoId], () => getTv(videoId))
    const {
        data: cast,
        isLoading: isLoadingCast
    } = useQuery<ICreditInfo>(["creditTv", videoId], () => getCreditTv(videoId))
    const {
        data: similar,
        isLoading: isLoadingSimilar
    } = useQuery<IGetVideosResult>(["similarTv", videoId], () => getSimilarTv(videoId))
    const isLoading = isLoadingDetail || isLoadingCast || isLoadingSimilar
    const minuteToHour = (minutes: number) => {
        return minutes > 60 ? `${Math.floor(minutes / 60)}시간 ${minutes % 60}분` : `${minutes}분`;
    }
    const onBoxClicked = (movieId: number) => {
        history.push(`/${"tv"}/${movieId}`);
    }
    return (
        <AnimatePresence>
            {tvMatch ? (
                <div>
                    <Overlay
                        onClick={onOverlayClick}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}/>
                    <BigBox layoutId={`${videoId}${type}`}
                            style={{top: scrollY.get() + 100}}>
                        {isLoading ? (
                            <BoxLoading>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512">
                                    <path
                                        d="M304 48C304 74.51 282.5 96 256 96C229.5 96 208 74.51 208 48C208 21.49 229.5 0 256 0C282.5 0 304 21.49 304 48zM304 464C304 490.5 282.5 512 256 512C229.5 512 208 490.5 208 464C208 437.5 229.5 416 256 416C282.5 416 304 437.5 304 464zM0 256C0 229.5 21.49 208 48 208C74.51 208 96 229.5 96 256C96 282.5 74.51 304 48 304C21.49 304 0 282.5 0 256zM512 256C512 282.5 490.5 304 464 304C437.5 304 416 282.5 416 256C416 229.5 437.5 208 464 208C490.5 208 512 229.5 512 256zM74.98 437C56.23 418.3 56.23 387.9 74.98 369.1C93.73 350.4 124.1 350.4 142.9 369.1C161.6 387.9 161.6 418.3 142.9 437C124.1 455.8 93.73 455.8 74.98 437V437zM142.9 142.9C124.1 161.6 93.73 161.6 74.98 142.9C56.24 124.1 56.24 93.73 74.98 74.98C93.73 56.23 124.1 56.23 142.9 74.98C161.6 93.73 161.6 124.1 142.9 142.9zM369.1 369.1C387.9 350.4 418.3 350.4 437 369.1C455.8 387.9 455.8 418.3 437 437C418.3 455.8 387.9 455.8 369.1 437C350.4 418.3 350.4 387.9 369.1 369.1V369.1z"/>
                                </svg>
                            </BoxLoading>) : (
                            <>
                                <BigCover
                                    style={{
                                        backgroundImage: `linear-gradient(transparent, rgba(0,0,0,1)), url(${makeImagePath(detail?.backdrop_path || "", "w500")})`
                                    }}/>
                                <DetailTitle>{detail?.title}</DetailTitle>
                                <DetailInfo>
                                    <DetailInfoRelease>{
                                        detail?.last_air_date.match(/^\d{4}/)
                                    }</DetailInfoRelease>
                                    <DetailInfoRuntime>
                                        에피소드 런타임 {minuteToHour(detail?.episode_run_time || 0)}
                                    </DetailInfoRuntime>
                                </DetailInfo>
                                <DetailSubInfo>
                                    <p>출연 : {cast?.cast.slice(0, 3).map(n => `${n.name}, `)}</p>
                                    <span>장르 : {detail?.genres.map(n => `${n.name}, `)}</span>
                                </DetailSubInfo>
                                <DetailOverview>{detail?.overview}</DetailOverview>
                                <div style={{height: "50px"}}></div>
                                <SimilarWrapper>
                                    <SubTitle>비슷한 콘텐츠</SubTitle>
                                    <AnimatePresence>
                                        <Row>
                                            {similar?.results
                                                .map(video => (
                                                    <Box
                                                        onClick={() => onBoxClicked(video.id)}
                                                        key={video.id}
                                                        transition={{type: "tween"}}
                                                        bgphoto={makeImagePath(video.backdrop_path || "", "w400")}
                                                        layoutId={video.id + ""}
                                                    >
                                                        <Info
                                                            variants={infoVariants}
                                                            whileHover="hover"
                                                            initial="normal">
                                                            <h4>{video.title || video.name} ({
                                                                video.last_air_date
                                                                    ? video.last_air_date.match(/^\d{4}/)
                                                                    : video.first_air_date?.match(/^\d{4}/)
                                                            })</h4>
                                                            <div>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 576 512">
                                                                    <path
                                                                        d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"/>
                                                                </svg>
                                                                {Number(video.vote_average).toFixed(1)}
                                                            </div>
                                                        </Info>
                                                    </Box>
                                                ))}
                                        </Row>
                                    </AnimatePresence>
                                </SimilarWrapper>
                            </>
                        )}
                    </BigBox>
                </div>
            ) : null}
        </AnimatePresence>
    )
}

export default DetailBoxTv;