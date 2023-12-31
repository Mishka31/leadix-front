import React, { useEffect, useRef, useState } from 'react';
import s from './Game.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import lottie from 'lottie-web';
import exitGame from '../../images/png/exitGame.png';
import menGo from '../../images/png/13802-cartoon-boy-walking-cycle.json';
import menGoBag from '../../images/png/withBag.json';
import menGoWood from '../../images/png/withWood.json';
import boyWithAK47 from '../../images/png/boyWithAK47.json';
import { Howl, HowlOptions } from 'howler';
import { createAudio } from './audioUtils';

function Game() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isRun, setIsRun] = useState(false);
  const [isToggle, setisToggle] = useState(false);
  const [x, setX] = useState(340);
  const [y, setY] = useState(320);
  const [xHero, setXHero] = useState(0);
  const [withBag, setWithBag] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  createAudio('');

  useEffect(() => {
    if (heroRef.current) {
      const animation = lottie.loadAnimation({
        container: heroRef.current,
        animationData: withBag ? boyWithAK47 : menGo,
        // animationData: boyWithAK47,
        renderer: 'canvas',
        loop: isRun,
        autoplay: isRun,
      });

      animation.setSpeed(1.3);
      // animation.setDirection(isIconMoved ? 1 : -1); // revers animation

      return () => {
        animation.destroy();
      };
    }
  }, [isRun, withBag]);

  const onExit = () => {
    navigate('/');
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
          } else {
            setIsRun(true);
          }
        }
      }, 500);
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
  }, [isToggle, isRun]);

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setWithBag(false);
    const containerRect = containerRef.current?.getBoundingClientRect();
    const heroRect = heroRef.current?.getBoundingClientRect();

    if (containerRect && heroRect) {
      const xHeroOnContainer = Math.round(heroRect.left - containerRect.left);
      setXHero(xHeroOnContainer);

      setX(Math.round(event.clientX - containerRect.left) - 30);
      setY(Math.round(event.clientY - containerRect.top));
    }
    setIsRun(true);
    setisToggle(!isToggle);
    setTimeout(() => {
      setWithBag(true);
    }, 2000);
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
          width: '680px',
          height: '680px',
          border: '3px solid green',
          borderRadius: '10px',
          position: 'relative',
          cursor: 'pointer',
        }}
        className={s.playField}
        onClick={handleContainerClick}
        ref={containerRef}
      >
        <button onClick={handleIconClick} className={s.customButton}>
          <Box
            sx={{
              position: 'absolute',
              top: `${y}px`,
              left: `${x}px`,
              transition: 'all 3s linear',
              transform: xHero < x ? 'scaleX(1)' : 'scaleX(-1)',
              transitionProperty: 'all, transform',
              transitionDuration: '3s, 0s',
            }}
          >
            <Box
              sx={{
                height: 80,
                width: withBag ? 70 : 50,
                marginTop: '-70px',
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
