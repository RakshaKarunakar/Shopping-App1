import React,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import {FormControl,InputLabel,Select,MenuItem } from '@mui/material';
// import Userprofile from './Userprofile';

const defaultTheme = createTheme();

export default function Register() {
  const [userData, setUserData] = useState({ });

  // Front end connection
  const nav = useNavigate();

  // Handle form input changes
  const Click = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Handle file input (photo)
  const handleProfile = (e) => {
    setUserData({
      ...userData,
      photo: e.target.files[0],
    });
  };

  const [selrole, setSelrole] = useState(''); //selected roleegory
  const handleRole = (e) => {
    setSelrole(e.target.value)
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const Data = new FormData();
      Data.append('name', userData.name);
      Data.append('phone', userData.phone);
      Data.append('email', userData.email);
      Data.append('password', userData.password);
      Data.append('photo', userData.photo);
      Data.append('role', selrole);

      // Use Axios to send the  data to the server
      Axios.post('http://localhost:7001/api/users/insert', Data)
        .then((res) => {
          console.log(res.data);
          nav('/SigninForm');
        })
        .catch((error) => {
          console.log(error);
        });
        nav(`/userprofile/${JSON.stringify(userData)}`);
    } catch (error) {
      console.error('Registration Error', error);
    }
  };

  
console.log(userData,'userData');

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="photo"
                label="Photo"
                name="photo"
                type='file'
                autoComplete="photo"
                autoFocus
                onChange={(e) => handleProfile(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={(e) => Click(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="phone"
                label="Phone"
                type="Number"
                id="phone"
                autoComplete="phone"
                onChange={(e) => Click(e)}
              />
               <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => Click(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                // type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => Click(e)}
              />
               <Grid >
                <FormControl fullWidth variant="filled">
                  <InputLabel htmlFor="Role-label">Role</InputLabel>
                  <Select
                    //  margin="normal"
                     required
                     fullWidth
                     id="input-with-sx"
                     label="role"
                     name="role"
                     variant="outlined"
                     autoComplete="type" 
                     onChange={(e) => handleRole(e)}
                     value={selrole}
                  >
                   <MenuItem value="Seller">Seller</MenuItem>
                   <MenuItem value="Buyer">Buyer</MenuItem>  
                  </Select>
                </FormControl>
              </Grid>

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
             <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
                noValidate onClick={handleSubmit} 
              >
                Sign In
              </Button>
              <Link to='/'> <Button type='button' variant="contained" color="primary" fullWidth > back To Home To Login </Button > </Link>
            </Box><br />
            <div>
              <Link to='/ProductForm'> <Button fullWidth >ProductForm</Button > </Link><br />
            </div>
          </Box>

        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
