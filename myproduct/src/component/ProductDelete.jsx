import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Axios from 'axios'; 


export default function ProductDelete({ SelectUser, data, setData, Deletes, delFr , setDelFr}) {
    console.log(SelectUser);

    const Delete = async (item) => {
    Deletes()
    Axios.delete(`http://localhost:7001/api/productnew/delete/${SelectUser._id}`)
    .then((res)=>{
        const val = res.data
        setDelFr((prev)=>!prev)
      })
      .catch((error)=>{
      console.log('error',error);
      })
      
    }

    return (
        <div>
            <>
                <Card sx={{ maxWidth: 500 }}>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            <h4>Are you surewant to delete {SelectUser.name}!!! </h4><br />
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={Deletes}>Close</Button>
                        <Button size="small" onClick={() => Delete(SelectUser)} > yes Delete</Button>
                    </CardActions>
                </Card>
            </>
        </div>
    )
}
