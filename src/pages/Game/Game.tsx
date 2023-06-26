import React from 'react';
import s from './Game.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import exitGame from '../../images/png/exitGame.png';

function Game() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const onExit = () => {
    navigate('/');
  };
  return (
    <div className={s.container}>
      <div className={s.verticalNavigationLeft} />
      <div className={s.verticalNavigationRight} />
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
        }}
        className={s.playField}
      ></Box>
    </div>
  );
}

export default Game;
