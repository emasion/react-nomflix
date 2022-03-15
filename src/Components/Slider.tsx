import {makeImagePath} from "../utils";
import {AnimatePresence} from "framer-motion";
import React, {useState} from "react";
import {useHistory, useRouteMatch} from "react-router-dom";
import {IVideo} from "../api";
import {SliderContainer, SliderButton, SliderRow, SliderBox, Info} from "./common.style";

const rowVariants = {
    hidden: (isBack: boolean) => {
        return {
            x: isBack ? -window.innerWidth - 0 : window.innerWidth + 0
        }
    },
    visible: {
        x: 0
    },
    exit: (isBack: boolean) => {
        return {
            x: isBack ? window.innerWidth + 0 : -window.innerWidth - 0
        }
    }
}

const boxVariants = {
    normal: {
        scale: 1
    },
    hover: {
        scale: 1.3,
        y: -50,
        transition: {
            delay: 0.4,
            duration: 0.3,
            type: "tween"
        }
    }
}

const infoVariants = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.5,
            duration: 0.3,
            type: "tween"
        }
    }
}

interface ISliderProps {
    videos: IVideo[];
    type: string;
}

function Slider({videos, type}: ISliderProps) {
    const offset = 6;
    const history = useHistory();
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const [isBack, setIsBack] = useState(false);
    const isTvMatch = useRouteMatch<{ tvId: string }>("/tv");
    const totalMovies = (videos.length || 1) - 1;
    const maxIndex = Math.floor(totalMovies / offset) - 1;
    const decreaseSliderIndex = () => {
        if (leaving) return;
        toggleLeaving();
        setIsBack(true);
        setIndex(prev => prev === 0 ? maxIndex : prev - 1)
    };
    const increaseSliderIndex = () => {
        if (leaving) return;
        toggleLeaving();
        setIsBack(false);
        setIndex(prev => prev === maxIndex ? 0 : prev + 1)
    };
    const toggleLeaving = () => setLeaving((prev) => !prev);
    const onBoxClicked = (videoId: number) => {
        history.push(`/${isTvMatch?.isExact ? "tv" : "movie"}/${type}/${videoId}`);
    }

    return (
        <SliderContainer>
            <SliderButton
                onClick={decreaseSliderIndex}
                style={{left: "0px"}}
                whileHover={{backgroundColor: "rgba(255,255,255,0.3)"}}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 512">
                    <path
                        d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"/>
                </svg>
            </SliderButton>
            <AnimatePresence
                initial={false}
                onExitComplete={toggleLeaving}
                custom={isBack}>
                <SliderRow
                    custom={isBack}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{type: "tween", duration: 0.6}}
                    key={index}>
                    {videos
                        .slice(offset * index, (offset * index) + offset)
                        .map(video => (
                            <SliderBox
                                onClick={() => onBoxClicked(video.id)}
                                key={video.id}
                                variants={boxVariants}
                                whileHover="hover"
                                initial="normal"
                                transition={{type: "tween"}}
                                bgphoto={makeImagePath(video.backdrop_path || "", "w400")}
                                layoutId={`${video.id}${type}`}
                            >
                                <Info variants={infoVariants}>
                                    <h4>{video.title || video.name} ({
                                        video.release_date
                                            ? video.release_date.match(/^\d{4}/)
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
                            </SliderBox>
                        ))}
                </SliderRow>
            </AnimatePresence>
            <SliderButton
                onClick={increaseSliderIndex}
                style={{right: "0px"}}
                whileHover={{backgroundColor: "rgba(255,255,255,0.3)"}}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 512">
                    <path
                        d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"/>
                </svg>
            </SliderButton>
        </SliderContainer>
    )
}

export default React.memo(Slider);