import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { server } from '../../../server';

const ActivationPage = () => {

    const { activation_token } = useParams()
    const [error, setError] = useState(false);

    useEffect(() => {
        if (activation_token) {
            const activationEmail = async () => {
                try {
                    const response = await axios.post(`${server}/activation`, {
                        activation_token
                    })
                    if (response.status === 200) {
                        window.location.href = '/'
                    }
                    console.log(response.data.message)
                } catch (error) {
                    console.log(error.response.data.message)
                    setError(true)
                }
            }
            activationEmail();
        }
    }, [activation_token])

    return (
        <div style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }}>
            {
                error ? (
                    <p>Your token is expired</p>
                ) : (
                    <p>Your account has been created successfully</p>
                )
            }
        </div>
    )
}

export default ActivationPage
