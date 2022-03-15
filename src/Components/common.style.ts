import styled from "styled-components";
import React from "react";
import {motion} from "framer-motion";

export const Wrapper = styled.div`
  background-color: black;
  overflow-x: hidden;
`;

export const Loader = styled.div`
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Banner = React.memo(styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.8)), url("${props => props.bgphoto}");
  background-size: cover;
`);

export const Container = styled.div`
  position: relative;
  top: -100px;
  padding: 10px;
`;

export const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

export const Overview = styled.p`
  font-size: 27px;
  width: 50%;
  max-height: 384px;
  word-break: keep-all;
  overflow-y: hidden;
`;

export const SubTitle = styled.h3`
  font-weight: 400;
  font-size: 32px;
  margin-bottom: 10px;
  position: relative;
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 2;
`;

export const BigBox = styled(motion.div)`
  background-color: black;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 50vw;
  height: 80vh;
  border-radius: 15px;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1000;
`;

export const BoxLoading = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    transform: scale(0.2);
    fill: rgba(255, 255, 255, 0.5)
  }
`;

export const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

export const DetailTitle = styled.h3`
  color: ${props => props.theme.white.lighter};
  text-align: left;
  font-size: 42px;
  font-weight: 400;
  position: relative;
  padding: 10px 30px;
  top: -100px;
`;

export const DetailOverview = styled.p`
  color: ${props => props.theme.white.lighter};
  text-align: left;
  position: relative;
  padding: 10px 30px;
  top: -50px;
  word-break: keep-all;
`;

export const DetailInfo = styled.div`
  color: ${props => props.theme.white.lighter};
  padding: 0 30px;
  position: relative;
  top: -70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  flex-direction: row;
}'`;

export const DetailInfoRelease = styled.span`
  color: ${props => props.theme.white.lighter};
  font-weight: 400;
  font-size: 18px;
}'`;

export const DetailInfoRuntime = styled.span`
'`;

export const DetailSubInfo = styled.div`
  position: relative;
  top: -90px;
  text-align: right;
  padding: 0 30px;

  p {
    color: ${props => props.theme.yellow.lighter};
  }

  span {
    color: ${props => props.theme.yellow.darker};
  }
}'`;

export const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  padding: 0px;
`;

export const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url("${props => props.bgphoto}");
  background-size: cover;
  background-position: center center;
  position: relative;
  height: 30vh;
  border-radius: 10px;
  cursor: pointer;
`;

export const SimilarWrapper = styled.div`
  padding: 10px;
`;

export const SliderContainer = styled.div`
  position: relative;
  height: 200px;
`;

export const SliderRow = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  padding: 0px;
`;

export const SliderBox = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url("${props => props.bgphoto}");
  background-size: cover;
  background-position: center center;
  height: 200px;
  border-radius: 10px;
  cursor: pointer;

  &:first-child {
    transform-origin: center left;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  &:last-child {
    transform-origin: center right;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

export const Info = styled(motion.div)`
  padding: 20px 10px 5px 10px;
  opacity: 0;
  position: absolute;
  width: 100%;
  top: 0px;
  bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  background-image: linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.2) 20%, rgba(0, 0, 0, 0.5));

  h4 {
    font-weight: 600;
    font-size: 18px;
    text-align: center;
    text-shadow: 0 1px 3px rgba(240, 240, 240, 0.6);
    margin-bottom: 10px;
  }

  div {
    color: gold;
    font-size: 15px;

    svg {
      fill: gold;
    }
  }
`;

export const SliderButton = styled(motion.div)`
  position: absolute;
  width: 50px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.05);
  cursor: pointer;
  z-index: 1;

  svg {
    transform: scale(0.2);

    path {
      fill: ${props => props.theme.white.darker};
    }
  }
`;



