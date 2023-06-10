import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import s from './Home.module.css';
import { Box, Button, FormControl, OutlinedInput } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [Name, setName] = useState<string>();

  const navigate = useNavigate();
  const onStart = () => {
    navigate('/Game');
  };
  const handleName: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setName(e.target.value);
  };

  return (
    <div className={s.container}>
      <h1>Welcome to Leadix</h1>
      <p>This is the player registration page.</p>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          height: '30%',
        }}
      >
        <FormControl sx={{ width: '25ch', marginBottom: '20px' }}>
          <OutlinedInput
            onChange={handleName}
            size="small"
            placeholder="Enter your name"
          />
        </FormControl>
        <Button
          onClick={onStart}
          disabled={!Name}
          sx={{
            color: 'black',
            bgcolor: Name ? 'lightgreen' : 'lightgray',
            '&:hover': {
              bgcolor: Name ? 'green' : 'lightgreen',
              '@media (hover: none)': {
                bgcolor: Name ? 'green' : 'lightgray', // Preserve bgcolor on devices without hover support
              },
            },
          }}
        >
          Start Game
        </Button>
      </Box>
    </div>
  );
}

export default Home;
