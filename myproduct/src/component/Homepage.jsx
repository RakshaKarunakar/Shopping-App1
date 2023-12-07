import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Button from '@mui/material/Button';
//import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { purple } from '@mui/material/colors';
import Modal from '@mui/material/Modal'
import LoginIcon from '@mui/icons-material/Login';
import SigninForm from './SigninForm';

export default function Homepage() {
    // const nav = useNavigate()

    // useEffect(() => {
    //     if (localStorage.getItem('Login') === null) {
    //         nav('/SigninForm')
    //     }
    // })
    // const handleLogout = () => {
    //     localStorage.removeItem('Login');
    // }
    // <button onClick={handleLogout}>Logout</button>

    const [userDataModalOpen, setUserDataModalOpen] = useState(false);

    const handleUserDataModalOpen = () => {
      setUserDataModalOpen(true);
    }
  
    const handleUserDataModalClose = () => {
      setUserDataModalOpen(false);
    }

  return (
    <>
      <div >
        <Box
          sx={{
            display: 'flex',
            height: '800px',
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>

          <div className='Home-header'>
            <h4 >Home</h4><br />
            <div>
              <Button type='button' size='max' /*variant="contained" color="info"*/ onClick={handleUserDataModalOpen}
                startIcon={<LoginIcon sx={{ color: purple[500], fontSize: 30, alignItems: 'center' }} />}
                style={{ margin: '0px 0px 0px 0px', }}> Login  </Button >

              <Link to='/Register'> <Button type='button' variant="contained" color="primary" > Register Here  </Button > </Link>
              {/* <Link to='/SigninForm'> <Button type='button' variant="contained" color="primary" > SigninForm  </Button > </Link> 
                     <Link to='/ProductForm'> <Button type='button' variant="contained" color="primary" > ProductForm  </Button > </Link>
                      <Link to='/ProductTable'> <Button type='button' variant="contained" color="primary" > ProductTable  </Button > </Link> */}
            </div>
          </div>

          <div>
        <Modal
          open={userDataModalOpen}
          onClose={handleUserDataModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
            <Box sx={{
              position: 'absolute',
              top: '20%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 500,
              height: 200,
              boxShadow: 100,
              p: 2,
            }}>
            <div>
              <SigninForm handleUserDataModalClose={() => handleUserDataModalClose()} />
            </div>
          </Box>
        </Modal>
        </div>

        </Box>
      </div>
    </>
  )
}
