import React from 'react';
import { googleLogout } from '@react-oauth/google';
import { Button } from 'react-bootstrap';


export default function Logout({ setUser }) {
    const handleLogout = () => {
        googleLogout()
        setUser(null);
        console.log("Logged out successfully.");
    }

    return (
        <div>
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </div>
    )
}

