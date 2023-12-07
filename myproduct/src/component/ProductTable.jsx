import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Box } from '@mui/material';
import { purple } from '@mui/material/colors';
import Axios from 'axios';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import Userprofile from './Userprofile';
import ProductView from './ProductView'
import ProductDelete from './ProductDelete'

export default function ProductTable() {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [viewState, setViewState] = useState([]);
  const [delFr, setDelFr] = useState(true);
  const nav = useNavigate();
  const [users, setUsers] = useState('');

  useEffect(() => {
    if (localStorage.getItem("Login") === null) {
      // navigate('/SigninForm')
    } else {
      setUsers(JSON.parse(localStorage.getItem("Login")))
    }
  }, [users])

  useEffect(() => {
    let users = (JSON.parse(localStorage.getItem("Login")))
    Axios.get('http://localhost:7001/api/productnew/view', { headers: { "Login": users } })
      .then((res) => {
        setViewState(res.data)
      })
      .catch((error) => {
        console.error('View Error', error)
      });

    if (localStorage.getItem('Login') === null) {
      // nav('/SigninForm')
    }
  }, [users])

  //console.log('viewState',viewState)

  const [profile, setProfile] = useState();
  useEffect(() => {
    let userId = JSON.parse(localStorage.getItem('User'));
    setProfile(userId);
  })
  //console.log('profile',profile)


  const handleLogout = () => {
    localStorage.removeItem('Login');
    nav('/')
  }

  //to view Profile Login data
  const userData = JSON.parse(localStorage.getItem('User'));

  const [userDataModalOpen, setUserDataModalOpen] = useState(false);

  const handleUserDataModalOpen = () => {
    setUserDataModalOpen(true);
  }

  const handleUserDataModalClose = () => {
    setUserDataModalOpen(false);
  }

  //Modal 
  const [SelectUser, setSelectUser] = useState('')

  //---View
  const [open, setOpen] = React.useState(false);
  const handleOpen = (item) => {
    setOpen(true);
    console.log(item)
    setSelectUser(item)
  }
  const handleClose = () => setOpen(false);

  //---Delete
  const [selectdelete, setselectDelete] = React.useState(false);
  const handleDelete = (item) => {
    setselectDelete(true);
    console.log(item)
    setSelectUser(item)
  }
  const handleDeletes = () => setselectDelete(false);
  //Modal Style --
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <div>
        <div>
          <div className='Table-header'>
            <div>
              {profile?.role == "Seller" && (<Link to='/ProductForm'> <Button type='button' variant="contained" color="primary"
                startIcon={<AddCircleIcon />} style={{ margin: '10px 0px 0px 100px' }}
              > ProductForm  </Button > </Link>)}
              {profile?.role == "Seller" && (<Link to='/Image'> <Button type='button' variant="contained" color="primary"
                startIcon={<AddCircleIcon />} style={{ margin: '10px 0px 0px 100px' }}
              > Image  </Button > </Link>)}
            </div>
            <br />
            <div>
              <Button onClick={handleUserDataModalOpen}>  <img src={`http://localhost:7001/uploads/${userData.photo}`}
                alt="" className="rounded-circle" style={{ width: '100px', height: '100px', margin: '0px 0px' }} /></Button >
              <Button type='button' size='max' onClick={handleLogout} style={{ margin: '0px 100px' }}
                startIcon={<LogoutIcon sx={{ color: purple[500], fontSize: 40, alignItems: 'center' }} />} > {/*LOG OUT*/}</Button>
              {/* <Link to='/UserData'> <Button type='button' size='max' color="primary" 
             startIcon={<AccountCircleIcon sx={{ color: purple[500], fontSize: 30, alignItems: 'center' }} />} 
             style={{ marginLeft: '100px' }} > </Button > </Link> */}
            </div>
          </div>
          <hr />

          <div>
            <input
              type="text"
              placeholder="Search by Name"
              fullwidth
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <br />
          <div style={{ marginLeft: '10px' }}>
            <center>
              <table className="table align-middle mb-0 bg-blue">
                <thead>
                  <tr className="table-info m-2">
                    <th scope="col">Photo</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Category</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody >
                  {viewState
                    .filter((item) =>
                      item?.name.toLowerCase().includes(searchInput.toLowerCase())
                    )
                    .map((item, index) => {
                      return (
                        <>
                          <tr className="table-" key={item?.id}>
                            <td><img src={`http://localhost:7001/uploads/${item?.photo}`} alt='' 
                            style={{ marginLeft: '40px', width: '100px', height: '100px' }} class='rounded-circle' /></td>
                            {/* <td>
                              {Array.isArray(item.photo) ? (
                                item.photo.map((photo, photoIndex) => (
                                  <img
                                    key={photoIndex}
                                    src={`http://localhost:7001/uploads/${photo}`}
                                    alt={`Photo ${photoIndex + 1}`}
                                    style={{ marginLeft: '40px', width: '100px', height: '100px' }}
                                    className="rounded-circle"
                                  />
                                ))
                              ) : (
                                <img
                                  src={`http://localhost:7001/uploads/${item.photo}`}
                                  alt="Photo"
                                  style={{ marginLeft: '40px', width: '100px', height: '100px' }}
                                  className="rounded-circle"
                                />
                              )}
                            </td> */}
                            <th><h6>{item?.name}</h6></th>
                            <th><h6>{item?.description}</h6></th>
                            <th><h6>{item?.quantity}</h6></th>
                            <th><h6>${item?.price}</h6></th>
                            <th><h6>{item?.category_id?.name}</h6></th>
                            <td>
                            {profile?.role == "Buyer" && (<Button variant="contained" class="btn btn-primary m-2" onClick={() => handleOpen(item)} >VIEW</Button>)}
                              {profile?.role == "Seller" && (<Link to={`/ProductUpdate/${item._id}`}><Button variant="contained" class="btn btn-success m-2" >UPDATE</Button></Link> )}
                              {profile?.role == "Seller" && (<Button type='button' variant="contained" class="btn btn-danger m-2" onClick={() => handleDelete(item)} > Delete  </Button >)}
                            </td>
                          </tr>
                        </>
                      )
                    })}
                </tbody>
              </table>
            </center>
          </div><br /><hr />
        </div>

        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <ProductView SelectUser={SelectUser} Close={handleClose} />
            </Box>
          </Modal>
        </div>

        <div>
          <Modal
            open={selectdelete}
            onClose={handleDeletes}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <ProductDelete data={data} setData={setData} /*setData={setviewState}*/ SelectUser={SelectUser} Deletes={handleDeletes} delFr={delFr} setDelFr={setDelFr} />
            </Box>
          </Modal>
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
              top: '30%',
              left: '88%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              height: 'auto',
              bgcolor: 'background.paper',
              // border: '2px solid #000',
              // boxShadow: 24,
              p: 4,
            }}>
              <div>
                <Userprofile handleUserDataModalClose={() => handleUserDataModalClose()} />
              </div>
            </Box>
          </Modal>
        </div>

      </div>
    </>
  )
}
