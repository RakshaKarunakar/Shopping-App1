import React, { useState, useEffect } from 'react';
import '../color.css'
import { Link } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import Axios from 'axios';
import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
//import AddCircleIcon from '@mui/icons-material/AddCircle';
//import { useNavigate } from 'react-router-dom';

export default function UserData() {

    const [data, setData] = useState([]);
    const [viewState, setViewState] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [selectedUserId, setSelectedUserId] = useState(null);
    

    useEffect(() => {
        Axios.get('http://localhost:7001/api/users/view')
            .then((res) => {
                setViewState(res.data);
                setData(res.data);
            })
            .catch((error) => {
                console.error('View Error', error);
            });
    }, []);

    const handleEdit = (item) => {
        setIsEditing(true);
        setSelectedUser(item);
        setSelectedUserId(item._id);
    };

    const handleUpdate = () => {
        const Data = new FormData();
        Data.append('name', selectedUser.name);
        Data.append('phone', selectedUser.phone);
        Data.append('email', selectedUser.email);
        if (selectedUser.photo instanceof File) {
            Data.append('photo', selectedUser.photo);
        }

        Axios.put(`http://localhost:7001/api/users/update/${selectedUser._id}`, Data)
            .then((res) => {
                setIsEditing(false);
            })
            .catch((error) => {
                console.error('Update Error', error);
            });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setSelectedUserId(null);
    };

    const handleDelete = () => {
        Axios.delete(`http://localhost:7001/api/users/delete/${selectedUser._id}`)
            .then((res) => {
                setData(data.filter(user => user._id !== selectedUser._id));
                alert('Are you want delete this profile')
            })
            .catch((error) => {
                console.log('error', error);
            });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setSelectedUser({ ...selectedUser, photo: file, photoURL: URL.createObjectURL(file) });
    };

    //const userData = JSON.parse(localStorage.getItem('User'));

    

    return (
        <>
            <div>
                <br />
                <div style={{ margin: '20px', marginTop: '10px', padding: '40px', backgroundColor: 'whitesmoke' }}>

                    <Link to='/ProductTable'> <Button type='button' variant='contained' color='primary' >
                        ProducTable
                    </Button></Link>
                </div>
                <hr />

                {/* <div style={{ textAlign: 'center' }}>
                    <h3>USER PROFILE</h3><br />
                    <Card className="Card" >
                        <CardContent>
                            <img
                                src={`http://localhost:7001/uploads/${userData.photo}`}
                                alt=''
                                style={{ width: '300px', height: '300px' }}
                                className='rounded-circle'
                            /><br /><br />
                            <h4>Name: {userData.name}</h4><br />
                            <h4>Phone: {userData.phone}</h4><br />
                            <h4>Email: {userData.email}</h4><br />
                        </CardContent>
                    </Card>
                </div><hr /> */}

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <center>
                        <h3>ALL PROFILES</h3>
                        {viewState.map((item, index) => (
                            <Card className="Card" key={item._id}>

                                <CardContent>
                                    {selectedUserId === item._id && isEditing ? (
                                        <form>
                                            <CardMedia
                                                sx={{ height: 300 }}
                                                image={selectedUser.photoURL || `http://localhost:7001/uploads/${item.photo}`}
                                                alt=""
                                                style={{ width: '300px', height: '300px' }}
                                                className="rounded-circle"
                                            /><br />
                                            <TextField
                                                style={{ margin: '10px 0px' }}
                                                type="file"
                                                accept="image/*"
                                                id="file-input"
                                                onChange={handlePhotoChange}
                                            /><br />
                                            <TextField
                                                style={{ marginBottom: '10px' }}
                                                type='text'
                                                value={selectedUser.name}
                                                fullWidth
                                                onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                                            /> <br />
                                            <TextField
                                                style={{ marginBottom: '10px' }}
                                                type='text'
                                                value={selectedUser.phone}
                                                fullWidth
                                                onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                                            /> <br />
                                            <TextField
                                                style={{ marginBottom: '10px' }}
                                                type='text'
                                                value={selectedUser.email}
                                                fullWidth
                                                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                                            /> <br />
                                        </form>
                                    ) : (
                                        <Typography variant='body2' color='text.secondary'>
                                            <CardMedia
                                                image={`http://localhost:7001/uploads/${item.photo}`}
                                                alt=''
                                                style={{ width: '300px', height: '300px' }}
                                                className='rounded-circle'
                                            /> <br />
                                            <h4>Name: {item.name}</h4>
                                            <h4>Phone: {item.phone}</h4>
                                            <h4>Email: {item.email}</h4>
                                        </Typography>
                                    )}
                                </CardContent>

                                <CardActions style={{ alignContent: 'center' }}>
                                    {selectedUserId === item._id && isEditing ? (
                                        <>
                                            <Button onClick={handleUpdate} startIcon={<SaveIcon />}>
                                                {/*Update*/}
                                            </Button>
                                            <Button onClick={handleCancelEdit} startIcon={<CancelIcon />}>
                                                {/*Cancel*/}
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button onClick={() => handleEdit(item)} startIcon={<EditIcon />}>
                                                {/*Edit*/}
                                            </Button>
                                            <Button type='button' onClick={() => handleDelete(item)} startIcon={<DeleteIcon />}>
                                                {/*Delete*/}
                                            </Button>
                                        </>
                                    )
                                    }
                                </CardActions>
                            </Card>
                        ))}
                    </center>
                </div>
                <hr />
            </div>
        </>
    );
}
