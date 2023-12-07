import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Axios from 'axios'; 


export default function ProductView(props) {
    // console.log(props.SelectUser)

    const [Sview, setSview] = useState()

    useEffect(() => {
        Axios.get(`http://localhost:7001/api/productnew/sview/${props.SelectUser._id}`)
            .then((res) => {
                setSview(res.data)  //res,data syntax
            })
            .catch((error) => {
                console.error('View Error', error)
            })
    },[])

    return (
        <>
            <Card sx={{ maxWidth: 500 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">

                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <h6 >Name:       {props.SelectUser.name}</h6><br />
                        <h6 >Description:{props.SelectUser.description}</h6><br />
                        <h6 >Quantity:   {props.SelectUser.quantity}</h6><br />
                        <h6 >Price:      {props.SelectUser.price}</h6><br />
                        <h6 >Category:      {props.SelectUser.category}</h6><br />
                    </Typography>

                </CardContent>
                <CardMedia
                    sx={{ height: 250 }}
                    image={`http://localhost:7001/uploads/${props.SelectUser.photo}`}
                    title="Product"
                />
                <CardActions>
                    <Button size="small" className="btn btn-info m-2" onClick={props.Close}> Close</Button>
                </CardActions>
            </Card>
        </>
    );
}
