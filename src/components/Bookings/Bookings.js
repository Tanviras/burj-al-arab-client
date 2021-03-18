import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings,setBookings]=useState([]);
    const [loggedInUser,setLoggedInUser]=useContext(UserContext);
    useEffect(()=>{//Book.js er moddhe backened a data post korar way dekhaisilam,ekhane normal api use kore data niye asha, so normally useEffect toh lagbei. get jehetu kortesi,alada kore get er kotha bola lage na. Post,delete,patch esob korle bola lage Method diye Book.js er moto 
    //kono component theke fetch korle useEffect lagtese.
        //node mongo crud er moddhe index.html er moddhe use effect diye kori nai,direct fetch diye korechilam
        fetch('http://localhost:5000/bookings?email='+loggedInUser.email)
        .then(res=>res.json())
        .then(data=>{
            setBookings(data);
        })
    },[]);

    return (
        <div>
            <h3>You have {bookings.length} bookings </h3>
            <br/>
            {
                bookings.map(booking=><li>{booking.name} from {(new Date(booking.checkIn).toDateString('dd/MM/yyyy'))} to {(new Date(booking.checkOut).toDateString('dd/MM/yyyy'))}</li>)
            }
        </div>
    );
};

export default Bookings;