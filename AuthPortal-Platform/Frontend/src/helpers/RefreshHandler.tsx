import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import '../App'

const RefreshHandler = ({ setauthRoute }:any) => {
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        const token=localStorage.getItem('token');
        if (token) {
            setauthRoute(true)
            if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup') {
                navigate('/home', { replace: true })
            }
        } else {
            setauthRoute(false)
        } 
    }, [location,navigate,setauthRoute])
    return (
        null
    )
}

export default RefreshHandler