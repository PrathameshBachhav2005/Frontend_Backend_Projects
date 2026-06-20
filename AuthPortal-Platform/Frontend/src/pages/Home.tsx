import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import { toastError, toastSuccess } from '../helpers/utils'

const Home = () => {
    type Product = {
        name: string;
        price: number;
    }
    const navigate = useNavigate();
    const [getLoggedIn, setLoggedIn] = useState<string>('');
    const [getProductData, setProductData] = useState<Product[]>([]);


    const fetchData = async () => {
        try {

            const url = `${import.meta.env.VITE_API_URL}/product`;
            const headers = {
                headers: {
                    "authorization": localStorage.getItem('token') || ""
                }
            }
            const response = await fetch(url, headers);
            const data = await response.json();

            setProductData(data);

            console.log(data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                toastError(error.message);
            }
            else {
                toastError("Something went wrong");
            }

        }

    }
    useEffect(() => {
        const savedLogged = localStorage.getItem('loggedInUser') || '';
        setLoggedIn(savedLogged);
        fetchData();
    }, [])

    const handleLogout = () => {

        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        toastSuccess("Logout Successfully..")
        setTimeout(() => {
            navigate('/login')
        }, 1000)
    }
    return (
        <>
            <h1>{getLoggedIn}</h1>
            
            <div className='container'>
                {
                    getProductData.map((item,index) => (
                        <ul key={index}>
                            <li>{item.name} : {item.price}</li>
                        </ul>
                    ))
                }
            </div>
            <button onClick={handleLogout}>Logout</button>
            <ToastContainer />
        </>
    )
}

export default Home
