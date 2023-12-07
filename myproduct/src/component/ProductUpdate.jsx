import  React,{useState,useEffect}  from 'react';
import '../color.css'
import { Box, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import DescriptionIcon from '@mui/icons-material/Description';
//import CategoryIcon from '@mui/icons-material/Category';
//import PhotoIcon from '@mui/icons-material/Photo';
import LabelIcon from '@mui/icons-material/Label'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {Link,useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {FormControl,InputLabel,Select,MenuItem } from '@mui/material';
import Axios from 'axios'; 


export default function ProductUpdate() {
  const params = useParams();
  const userId = params.id;
  const nav = useNavigate();

  const [update, setUpdate] = useState({});
  const [category, setCategory] = useState([]);
  const [selcat, setSelcat] = useState();

  useEffect(() => {
    Axios.get(`http://localhost:7001/api/productnew/sview/${userId}`)
      .then((res) => {
        setUpdate(res.data);
        setSelcat(res.data?.category_id?._id)
      })
      .catch((error) => {
        console.error('Fetch Error', error);
      });
  }, [userId]);


  useEffect(() => {
    Axios.get('http://localhost:7001/api/category/view')
      .then((res) => {
        setCategory(res.data);
      })
      .catch((error) => {
        console.error('View Error', error);
      });
  }, []);

  const handleCatg = (e) => {
    console.log(e.target.value);
    setSelcat(e.target.value); 
    // setUpdate({ ...update, category: e.target.value });
  };

  const HandleUpdate = (e) => {
    const { name, value } = e.target;
    setUpdate({
      ...update,
      [name]: value,
    });
  };
  
  const HandlePhotoChange = (e) => {
    setUpdate({ ...update, photo: e.target.files[0] });
  };

  const HandleSave = async () => {
    const abc = {...update, category_id: selcat}
    // console.log(update);
    // console.log(abc);
    const formData = new FormData();
    for (const key in abc) {
      formData.append(key, abc[key]);
    }

    Axios.put(`http://localhost:7001/api/productnew/update/${userId}`, formData)
      .then((res) => {
        console.log('Update Successful', res.data);
        nav('/ProductTable')
      })
      .catch((error) => {
        console.error('Update Error', error);
      });

  };

console.log(selcat);
  return (
    <>
      <div  >
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
              <div> <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <LabelIcon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />
                <input
                  type="file"
                  id="input-with-sx"
                  variant="standard"
                  onChange={(e) => HandlePhotoChange(e)}
                />
              </Box></div>

              <div><Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <LabelIcon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />
                <TextField placeholder="Enter Product Name" id="input-with-sx" variant="standard" type='text'
                  onChange={(e) => HandleUpdate(e)} value={update.name} name='name' />
              </Box></div>

              <div><Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <DescriptionIcon sx={{ color: 'action.active', mr: 2, my: 1 }} />
                <TextField placeholder="Enter Description" id="input-with-sx" variant="standard" type='text'
                  onChange={(e) => HandleUpdate(e)} value={update.description} name='description' />
              </Box></div>

              <div><Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <ProductionQuantityLimitsIcon sx={{ color: 'action.active', mr: 2, my: 1 }} />
                <TextField placeholder="Enter Quantity" id="input-with-sx" variant="standard" type='text'
                  onChange={(e) => HandleUpdate(e)} value={update.quantity} name='quantity' />
              </Box></div>

              <div><Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AttachMoneyIcon sx={{ color: 'action.active', mr: 2, my: 1 }} />
                <TextField placeholder="Enter Price" id="input-with-sx" variant="standard" type='number'
                  onChange={(e) => HandleUpdate(e)} value={update.price} name='price' />
              </Box></div><br />

              <FormControl fullWidth variant="filled">
                <InputLabel htmlFor="category-label">{update?.category_id?.name}</InputLabel>
                <Select
                  required
                  fullWidth
                  id="input-with-sx"
                  name="Category"
                  variant="outlined"
                  autoComplete="type"
                  onChange={(e) => handleCatg(e)}  
                  value={selcat}  
                >
                  {category.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <div>
                <Stack spacing={2} direction="row">
                  <Button variant="contained" endIcon={<SendIcon />} onClick={HandleSave} >Save</Button>
                  <Link to='/ProductTable'><Button variant="contained" >Close</Button></Link>
                </Stack>
              </div>
            </Box>
          </div>
        </Grid>
      </div>
    </>
  )
}
