import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import s from "./Game.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import lottie from "lottie-web";
import exitGame from "../../images/png/exitGame.png";
import menGo from "../../images/png/13802-cartoon-boy-walking-cycle.json";

function Game() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isIconMoved, setIsIconMoved] = useState(false);
  const [isRun, setIsRun] = useState(false);
  const [x, setX] = useState(340);
  const [y, setY] = useState(320);
  const [xHero, setXHero] = useState(0);
  // const [counter, setCounter] = useState(0);
  // const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      const animation = lottie.loadAnimation({
        container: heroRef.current,
        animationData: menGo,
        renderer: "canvas",
        loop: isRun,
        autoplay: isRun,
      });

      animation.setSpeed(1.5);
      // animation.setDirection(isIconMoved ? 1 : -1); // revers animation

      return () => {
        animation.destroy();
      };
    }
  }, [isRun, isIconMoved]);

  // if (x === xHero) {
  // console.log("xHero");
  console.log("x", x);
  // }

  // useEffect(() => {
  //   if (isIconMoved) {
  //     const id = setInterval(() => {
  //       setCounter((prevCounter) => prevCounter + 3);
  //     }, 100);
  //     setIntervalId(id);
  //   } else {
  //     if (intervalId) {
  //       clearInterval(intervalId);
  //     }
  //     setIntervalId(null);
  //   }
  // }, [isIconMoved]);

  const onExit = () => {
    navigate("/");
  };

  const handleIconClick = () => {};

  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRun) {
      const id = setInterval(() => {
        const ssss = containerRef.current?.getBoundingClientRect();
        const aaaa = heroRef.current?.getBoundingClientRect();
        if (aaaa && ssss) {
          if (Math.abs(Math.round(aaaa.left - ssss.left) - x) <= 10) {
            setIsRun(false);
          }
        }
      }, 1000);
      setIntervalId(id);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
      }
      setIntervalId(null);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRun]);

  // setInterval(() => {
  //   // if (heroRef && containerRef) {
  //   const ssss = containerRef.current?.getBoundingClientRect();
  //   const aaaa = heroRef.current?.getBoundingClientRect();
  //   if (aaaa && ssss) {
  //     if (Math.abs(Math.round(aaaa.left - ssss.left) - x) <= 5) {
  //       setIsRun(false);
  //     }
  //   }

  //   // setIsRun(false);
  //   // }
  // }, 1000);

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsRun(false);
    const containerRect = containerRef.current?.getBoundingClientRect();
    const heroRect = heroRef.current?.getBoundingClientRect();

    if (containerRect && heroRect) {
      const xHeroOnContainer = Math.round(heroRect.left - containerRect.left);
      setXHero(xHeroOnContainer);

      setX(Math.round(event.clientX - containerRect.left) - 30);
      setY(Math.round(event.clientY - containerRect.top));
    }
    setIsRun(true);
  };

  return (
    <div className={s.container}>
      <button onClick={onExit} className={s.exitButton}>
        <img src={exitGame} width={50} alt="" />
      </button>
      <h1>Welcome to the Game {state.name}</h1>
      <p>This is the content of the home page.</p>
      <Box
        marginTop={8}
        sx={{
          width: "680px",
          height: "680px",
          border: "3px solid green",
          borderRadius: "10px",
          position: "relative",
        }}
        className={s.playField}
        onClick={handleContainerClick}
        ref={containerRef}
      >
        <button onClick={handleIconClick} className={s.customButton}>
          <Box
            sx={{
              position: "absolute",
              top: `${y}px`,
              left: `${x}px`,
              transition: "all 3s linear",
              transform: xHero < x ? "scaleX(1)" : "scaleX(-1)",
              transitionProperty: "all, transform",
              transitionDuration: "3s, 0s",
            }}
          >
            <Box
              sx={{
                height: 80,
                width: 50,
                marginTop: "-70px",
              }}
              ref={heroRef}
            />
          </Box>
        </button>
      </Box>
    </div>
  );
}

export default Game;
