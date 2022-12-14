import React from 'react';
import { mappls } from 'mappls-web-maps';
import img_avatar from './image/img_avatar.png';
import Avatar from '@mui/material/Avatar';
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import PlaceIcon from '@mui/icons-material/Place';
import DoneSharpIcon from '@mui/icons-material/DoneSharp';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/joy/Box';
import Slider from '@mui/joy/Slider';
import axios from 'axios';




// const marks = [
//     {
//         value: 0,
//         label: '0°C',
//     },
//     {
//         value: 20,
//         label: '20°C',
//     },
//     {
//         value: 37,
//         label: '37°C',
//     },
//     {
//         value: 100,
//         label: 'final',
//     },
// ];

// function valueText(value) {
//     return `${value}°C`;
// }

function Map() {


    let [responseData, setResponseData] = React.useState('');

    React.useEffect(() => {
        axios({
            "method": "GET",
            "url": "http://65.1.129.194:3000/getorderdetails/199",
            // "url" : "https://datausa.io/api/data?drilldowns=Nation&measures=Population",
            // "headers": {
            //   "content-type": "application/octet-stream",
            //   "x-rapidapi-host": "quotes15.p.rapidapi.com",
            // //   "x-rapidapi-key": process.env.REACT_APP_API_KEY
            // }, "params": {
            //   "language_code": "en"
            // }
        })
            .then((response) => {
                setResponseData(response.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }, [setResponseData, responseData])

    const StyledBadge = styled(Badge)(({ theme }) => ({
        "& .MuiBadge-badge": {
            backgroundColor: "#44b700",
            color: "#44b700",
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            "&::after": {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                animation: "ripple 1.2s infinite ease-in-out",
                border: "1px solid currentColor",
                content: '""'
            }
        },
        "@keyframes ripple": {
            "0%": {
                transform: "scale(.8)",
                opacity: 1
            },
            "100%": {
                transform: "scale(2.4)",
                opacity: 0
            }
        }
    }));

    // const content1 = (
    //     <div class=' sm-2 text-muted' style={{ textSize: '1px' }}>
    //         {`+919686862809`}
    //     </div>
    // );
    // const content2 = (
    //     <div class=' sm-2 text-muted'>
    //         {`Vaccinated `}
    //     </div>
    // );

    const styleMap = {
        width: '100%', height: '80vh', display: 'inline-block',
        // borderRadius: '17px' ,
        boxShadow: '10px 10px 10px rgb(220,220,220)',
        marginTop: '20px'
    }
    const mapProps = {
        center: [18.5314, 73.845],
        traffic: false,
        zoom: 4,
        geolocation: false,
        clickableIcons: false,
        
    }

    var mapObject,map, polyline;
    var mapplsClassObject = new mappls();
  
    
    mapplsClassObject.initialize("202253f02c646943d14042ac2a3e4453", () => {
        mapObject = mapplsClassObject.Map({
            id: "map",
        
            map: mapObject,
            var : pts = [
                {
                  lat: 28.55108,
                  lng: 77.26913
                }, {
                  lat: 28.55179,
                  lng: 77.26753
                }
      
              ],
        });


        //load map layers/components after map load, inside this callback (Recommended)
     
        mapObject.on("load", () => {
            // Activites after mapload

            // var pts = [
            //     {
            //       lat: 28.55108,
            //       lng: 77.26913
            //     }, {
            //       lat: 28.55179,
            //       lng: 77.26753
            //     }
      
            //   ];

              polyline = new mappls.Polyline({
                map: mapObject,
                paths: pts,
                strokeColor: 'yellow',
                strokeOpacity: 1.0,
                strokeWeight: 10,
                fitbounds: true,
                steps: false,
                search: true,
                isDraggable: false,
                alternatives: false,
                // start: { label: 'start', geoposition: "28.55108,77.26913" },
                // end: { label: 'end', geoposition: "28.55179,77.26753" },
                animate: {
                  speed: 5,
                  icon_width: 20,
                  icon_height: 50,
                  icon_url: "http://www.mapmyindia.com/api/advanced-maps/doc/sample/map_sdk/car.png",
                  repeat: true,
                },
              });

        })

    });


    return (

        // <div className='container'>
        //     <div id="map" style={styleMap}></div>
        // </div>
        <div class="container text-center">
            {responseData &&
                responseData.data.map((item) => (

                    <div class="row" >
                        <div class="col">
                            <div id="map" style={styleMap}></div>
                        </div>
                        <div class="col" style={{ marginTop: '20px' }}>
                            <div class="card">
                                <div class="card-body shadow p-3 bg-white rounded">
                                    <h4 class="card font-italic font-weight-normal text-left">Order #{item.order_id}</h4>
                                    <div class="row">
                                        <div class="col-sm">
                                            <ol class="list-group list-group">
                                                {/* <li class="list-group-item d-flex justify-content-between align-items-start">
                                        <Box sx={{ mx: 'auto', height: 200 }}>
                                            <Slider
                                                orientation="vertical"
                                                aria-label="Always visible"
                                                defaultValue={80}
                                                getAriaValueText={valueText}
                                                step={10}
                                                marks={marks}
                                                valueLabelDisplay="on"
                                            />
                                        </Box>
                                        </li> */}
                                                {/* <li class="list-group-item d-flex justify-content-between align-items-start">
                                            <PlaceIcon />
                                            <div class="ms-2 me-auto fw-lighter" style={{ fontSize: '0.7rem' }}>
                                                <div class="fw-bold">Office</div>
                                                xyz, east patel nager
                                            </div>

                                        </li> */}
                                                <li class="list-group-item d-flex justify-content-between align-items-start">
                                                    <PlaceIcon />
                                                    <div class="ms-2 me-auto fw-lighter" style={{ fontSize: '0.7rem' }}>
                                                        <div class="fw-bold">Home</div>
                                                        {item.source_address.Adress ? item.source_address.Adress : '-'} <br />
                                                        {item.source_address.house_no ? item.source_address.house_no : '-'}
                                                    </div>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between align-items-start">
                                                    <DoneSharpIcon style={{ color: 'green', textAlign: 'auto' }} />
                                                    <div class="ms-2 me-auto fw-lighter" style={{ fontSize: '0.7rem' }}>
                                                        {/* <div class="fw-bold">Destination</div> */}
                                                        Delivered : &nbsp; &nbsp;
                                                        {item.destination_address.Adress ? item.destination_address.Adress : '-'} &nbsp;
                                                        {item.destination_address.house_no ? item.destination_address.house_no : '-'} <br />
                                                        <span>by {item.deleviery_boy_details.name ? item.deleviery_boy_details.name : '-'}</span>
                                                    </div>
                                                </li>
                                            </ol>
                                            {/* <List >
                                        <ListItemIcon>
                                            <PlaceIcon />
                                            <ListItemText primary="Home address" />
                                        </ListItemIcon>
                                        <ListItemIcon>
                                            <PlaceIcon />
                                            <ListItemText primary="Other address" />
                                        </ListItemIcon>
                                        <DoneSharpIcon style={{ color: 'green', textAlign: 'auto' }} />
                                    </List> */}

                                        </div>
                                        <div class="col-sm">
                                            <StyledBadge
                                                style={{ marginBottom: '-17px' }}
                                                overlap="circular"
                                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                                variant="dot"
                                            >
                                                <Avatar alt="Remy Sharp" src={img_avatar} />
                                            </StyledBadge>
                                            <div class="card-body shadow p-3 bg-white rounded" >
                                                <p class="font-weight-bolder"> {item.deleviery_boy_details.name}</p>
                                                <Rating name="size-small" defaultValue={4} size="small" />
                                                <Grid container>
                                                    <Grid item xs>
                                                        {item.deleviery_boy_details.number}
                                                    </Grid>
                                                    {/* <Divider orientation="vertical" flexItem>

                                            </Divider>
                                            <Grid item xs>
                                                {content2}
                                            </Grid> */}
                                                </Grid>


                                            </div>

                                        </div>
                                    </div>
                                    <br />
                                    <ol class="list-group list-group">
                                        <li class="list-group-item d-flex justify-content-between align-items-start">
                                            <div class="ms-2 me-auto" style={{ fontSize: '0.7rem' }}>
                                                <div class="fw-bold">Item total</div>
                                                <ol class="fw-lighter" style={{ textAlign: 'initial' }}>
                                                    {/* {
                                                        responseData &&
                                                        responseData.data.map((item) => ( */}
                                                    <li>{item.order_details.details.product ? item.order_details.details.product : '-'}  &nbsp;	x {item.order_details.details.quantity ? item.order_details.details.quantity : '-'}</li>
                                                    {/* )
                                                        )
                                                    }  */}
                                                    {/* <li>Rice pack &nbsp;	x 1</li>
                                                    <li>Jeans &nbsp;	 x 2</li> */}
                                                </ol>

                                            </div>
                                            <span class="badge bg-primary rounded-pill"> {item.total_quantity ? item.total_quantity : '-'}</span>
                                        </li>
                                        <br />
                                        <li class="list-group-item-flush d-flex justify-content-between align-items-start ">
                                            <div class="ms-2 me-auto" style={{ fontSize: '0.7rem' }}>
                                                <div class="fw-bold">Total Price</div>

                                            </div>
                                            <span class="badge bg-success rounded-pill">₹ {item.total_price ? item.total_price : '-'}</span>
                                        </li>
                                        {/* <li class="list-group-item d-flex justify-content-between align-items-start">
                                    <div class="ms-2 me-auto" style={{ fontSize: '0.7rem' }}>
                                        <div class="fw-bold">Discount Applied</div>
                                        CODE :<span><q>FR2APA</q></span>
                                    </div>
                                    <span class="badge bg-danger rounded-pill">₹ -120</span>
                                </li> */}
                                        {/* <li class="list-group-item d-flex justify-content-between align-items-start">
                                    <div class="ms-2 me-auto" style={{ fontSize: '0.7rem' }}>
                                        <div class="fw-bold">Delivery Charge</div>
                                       
                                    </div>
                                    <span class="badge bg-primary rounded-pill">₹ 50</span>
                                </li> */}


                                    </ol>
                                    {/* <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" class="card-link">Card link</a>
                            <a href="#" class="card-link">Another link</a>
                            <h5 class="card-title">Card title</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" class="card-link">Card link</a> */}



                                </div>
                            </div>
                            <div class="row">

                                {/* <div className='rcorners2'>
                            <ul class="b">
                            <img src={img_avatar} alt="Avatar" class="avatar"/>
                                <li>Name : SADANAND KUMAR</li>
                                <li>Contact No :  968433222</li>
                            </ul>
                        </div> */}
                            </div>
                            <br />
                            <div class="row">
                                {/* <div className='rcorners2'>
                            <h4></h4>
                            <ul class="b">Order Details **
                               
                                <li>Order id : DSF230G</li>
                                <li>Item :  4</li>
                                <li>Price : 120</li>
                            </ul>
                        </div> */}
                            </div>
                        </div>
                    </div>
                )
                )
            }
        </div>

    );
}

export default React.memo(Map);;

