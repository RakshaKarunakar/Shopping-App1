import React, { useState, useEffect } from 'react';
import '../color.css'
//import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function Image() {

const [images, setImage]=useState({
    image1:[],
    name:"",
})

const Click = (e) => {
    // setProduct(e.target.value) 
    setImage({ ...images, [e.target.name]: e.target.value });
  };

  const handlefilechange=(e,index)=>{
    alert(index)
    const image = [...images.image1];
    image[index]=e.target.files[0]
    setImage({...images,image1:image})
  }
  console.log('images', images)

  const Handlesubmit = async (e) => {
    console.log('images', images)
  }

    return (
        <div>
            <TextField
                margin="normal"
                required
                fullWidth
                name="name"
                label="name"
                type="text"
                id="input-with-sx"
                onChange={(e) => Click(e)}
            />
            <TextField
                margin="normal"
                required
                fullWidth id="input-with-sx"
                name="image1"
                label="image"
                type="file"
            onChange={(e) => handlefilechange(e,0)}
            />
            <TextField
                margin="normal"
                id="input-with-sx"
                name="image2"
                label="image"
                type="file"
            onChange={(e) => handlefilechange(e,1)}
            />
            <TextField
                margin="normal"
                required
                fullWidth id="input-with-sx"
                name="image3"
                label="image"
                type="file"
            onChange={(e) => handlefilechange(e,2)}
            />
            <TextField
                margin="normal"
                id="input-with-sx"
                name="image4"
                label="image"
                type="file"
            onChange={(e) => handlefilechange(e,3)}
            />
            <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => Handlesubmit(e)}
            >
                SUBMIT
            </Button>
            {/* <Link to='/imageTable'> */}
            <Button
                fullWidth
                type='button'
                variant="contained"
                color="primary"
            >
                Back To Table
            </Button >
        </div>
    )
}
