import * as React from 'react';
import {useState } from 'react';
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'; 
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios'


export default function SigninForm({ handleUserDataModalClose }) {
  const nav = useNavigate();

  const [item, setItem] = useState("")
  const Click = (e) => {
    setItem(e.target.value)
    setItem({ ...item, [e.target.name]: e.target.value })
  }

  const Handlesubmit = async (e) => {
    e.preventDefault();
    try {
      await Axios.post('http://localhost:7001/api/logins/Login', item)
        .then(async (res) => {
          if (res.data.success == true) {
            console.log('Login success');
            console.log(res.data)
            localStorage.setItem('Login', JSON.stringify(res.data.authotoken));
            localStorage.setItem('User', JSON.stringify(res.data.user));
            // console.log(res.data.authotoken)
            nav('/ProductTable')

          } else {
            console.log('login unsuccessful')
            alert('Please Register your account')
            nav('/Register')
          }
        })
    } catch (error) {
      console.log('error', error)
    }
  };

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        height: '600px',
        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: (t) =>
          t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      alignItems="center"
      justifyContent="center"
    >
      <Box
        sx={{
          width: 400,
          padding: '30px',
          borderRadius: '10px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'whitesmoke',
        }}
      >
        <Typography component="h1" variant="h4">
          SIGN IN FORM
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            onChange={(e) => Click(e)}
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            autoComplete=""
            autoFocus
          />
          <TextField
            onChange={(e) => Click(e)}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete=""
          />
          <Button onClick={Handlesubmit} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            SUBMIT
          </Button>
          <div>
            <Link to="/Register">
              <Button type="button" variant="contained" color="primary" fullWidth>
                Register Here
              </Button>
            </Link>
          </div>
          <Link to="/"> <Button variant="outlined" onClick={handleUserDataModalClose} sx={{ mt: 3, mb: 2 }}>
            Close
          </Button> </Link>
        </Box>
      </Box>
    </Grid>
  );
}
