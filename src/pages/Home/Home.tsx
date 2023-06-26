import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import s from './Home.module.css';
import { Box, Button, FormControl, OutlinedInput } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Home() {
  const [name, setName] = useState<string>();

  const navigate = useNavigate();
  const onStart = () => {
    navigate('/Game', { state: { name } });
    toast.success(`Welcome to Leadix "${name}"`);
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
          disabled={!name}
          sx={{
            color: 'black',
            bgcolor: name ? 'lightgreen' : 'lightgray',
            '&:hover': {
              bgcolor: name ? 'green' : 'lightgreen',
              '@media (hover: none)': {
                bgcolor: name ? 'green' : 'lightgray',
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
