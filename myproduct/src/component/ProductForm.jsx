import React, { useState, useEffect } from 'react';
import '../color.css'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box, Grid } from '@mui/material';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {FormControl,InputLabel,Select,MenuItem } from '@mui/material';
// import CssBaseline from '@mui/material/CssBaseline';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';


export default function ProductForm() {
  const [Product, setProduct] = useState({
    photos: [],});
  const [users, setUsers] = useState('');
  const navigate = useNavigate()
  console.log(Product);

  useEffect(() => {
    if (localStorage.getItem("Login") === null) {
      navigate('/SigninForm')
    } else {
      setUsers(JSON.parse(localStorage.getItem("Login")))
    }
  }, [])

  const [category, setCategory] = useState([]);//category
  
  useEffect(() => {
    Axios.get('http://localhost:7001/api/category/view')
        .then((res) => {
          setCategory(res.data) 
        })
        .catch((error) => {
            console.error('View Error', error)
        })
},[])

console.log(category,'category')

  //store input data to value in key "product"
  let initialValue;
  if (localStorage.getItem("Products") === null) {
    initialValue = [];
  } else {
    initialValue = JSON.parse(localStorage.getItem("Products"));
  }

  const [value, setValue] = useState(initialValue);
  //console.log(value);


  const Click = (e) => {
    // setProduct(e.target.value) 
    setProduct({ ...Product, [e.target.name]: e.target.value });
  }

  const handleProfile = (e,index) => {
    // const files=[...Product.photos]
    // files[index]=Array.form(e.target.files);
    // setProduct({ ...Product, photos:files });
    // console.log('files',files)
    setProduct({ ...Product, [e.target.name]: e.target.files[3] });
    // setSingleprofile(e.target.files[0]) //use new state
  }
  //Front end connection

  const [selcat, setSelcat] = useState(''); //selected category
  const handleCat = (e) => {
    setSelcat(e.target.value)
  }

  const Handlesubmit = async (e) => {
    e.preventDefault()
    try {
      const Data = new FormData();
      Data.append("name", Product.name);
      Data.append("category", selcat);
      Data.append("description", Product.description);
      Data.append("quantity", Product.quantity);
      Data.append("price", Product.price);
      Data.append("photo", Product.photo);
      // Product.photos.forEach((photo) => {
      //   Data.append(`photo`, photo);
      // });

      const response = await Axios.post('http://localhost:7001/api/productnew/insert', Data, { headers: { "Login": users } })
      if (response.status === 200) {
        const responseData = response.Product
        console.log(responseData, 'responseData');
        navigate('/ProductTable')
      }
      else {
        console.log('value does not insert')
      }
    } catch (error) {
      console.error('Error', error)
    }

    const newId = value.length === 0 ? 1 : value[value.length - 1].id + 1;
    let newuser = {
      id: newId,
      ...Product
    }

    const value1 = [...value, newuser];//new value1 variable
    setValue(value1);
    // localStorage.setItem("Product", JSON.stringify(value1));//object getting
    await navigate('/ProductTable')
  };

  console.log(Product, 'product');

 

  return (
    <div>
      <Grid
        container
        sx={{
          display: 'flex',
          height: '800px',
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
        <div>
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
            <h4>PRODUCT FORM</h4>
            <TextField
              margin="normal"
              required
              fullWidth
              id="input-with-sx"
              label="Name"
              name="name"
              type="text"
              onChange={(e) => Click(e)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="input-with-sx"
              label="description"
              name="description"
              type="text"
              onChange={(e) => Click(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="quantity"
              label="Quantity"
              type="number"
              id="input-with-sx"
              onChange={(e) => Click(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="price"
              label="Price"
              type="number"
              id="input-with-sx"
              onChange={(e) => Click(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="input-with-sx"
              name="photo"
              label="Photo"
              type="file"
              onChange={(e) => handleProfile(e)}
            />
            {/* <TextField
            margin="normal"
            required
            id="input-with-sx"
            name="photo"
            label="Photo"
            type="file"
            onChange={(e) => handleProfile(e,0)}
          />
          <TextField
            margin="normal"
            id="input-with-sx"
            name="photo"
            label="Photo"
            type="file"
            onChange={(e) => handleProfile(e,1)}
           />
            <TextField
            margin="normal"
            required
            id="input-with-sx"
            name="photo"
            label="Photo"
            type="file"
            onChange={(e) => handleProfile(e,2)}
          />
          <TextField
            margin="normal"
            id="input-with-sx"
            name="photo"
            label="Photo"
            type="file"
            onChange={(e) => handleProfile(e,3)}
           /> */}
            <Grid >
                <FormControl fullWidth variant="filled">
                  <InputLabel htmlFor="category-label">Category</InputLabel>
                  <Select
                    //  margin="normal"
                     required
                     fullWidth
                     id="input-with-sx"
                     label="Category"
                     name="category"
                     variant="outlined"
                     autoComplete="type" 
                     onChange={(e) => handleCat(e)}
                     value={selcat}
                  >
                   {category.map((item)=>{
                    return( <MenuItem value={item._id}>{item.name}</MenuItem>)

                   })}
                       
                  </Select>
                </FormControl>
              </Grid>

            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => Handlesubmit(e)}
            >
              SUBMIT
            </Button>
            <Link to='/ProductTable'>
              <Button
                fullWidth
                type='button'
                variant="contained"
                color="primary"
              >
                Back To Table
              </Button >
            </Link>  
            <br />
            {/* <div>
              <Link to='/'> <Button type='button' variant="contained" color="primary" > Home </Button > </Link>
            </div> */}
          </Box>
        </div>
      </Grid>
    </div>
  );
}