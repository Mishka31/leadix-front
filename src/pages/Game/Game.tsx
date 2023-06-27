import React, { useEffect, useRef, useState } from "react";
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

  const animationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animationContainer.current) {
      const animation = lottie.loadAnimation({
        container: animationContainer.current,
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

  const onExit = () => {
    navigate("/");
  };

  const handleIconClick = () => {
    setIsIconMoved(!isIconMoved);
    setIsRun(true);

    setTimeout(() => {
      setIsRun(false);
    }, 6000); // Длительность анимации в миллисекундах
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
      >
        <button onClick={handleIconClick} className={s.customButton}>
          <Box
            sx={{
              position: "absolute",
              top: "40%",
              left: isIconMoved ? "calc(100% - 50px)" : 0,
              transition: "left 6s linear", // Длительность и анимационная функция
              transform: isIconMoved ? "scaleX(1)" : "scaleX(-1)",
            }}
          >
            <Box
              sx={{
                height: 80,
                width: 50,
              }}
              ref={animationContainer}
            />
          </Box>
        </button>
      </Box>
    </div>
  );
}

export default Game;
