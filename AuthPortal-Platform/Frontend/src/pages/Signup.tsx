import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { toastError, toastSuccess } from '../helpers/utils'
import { EyeOff, Eye } from 'lucide-react';

const Signup = () => {
    const navigate = useNavigate();
    type FormData = {
        name: string;
        email: string;
        password: string;
    };
    const [getSignupInfo, setSignupInfo] = useState<FormData>({
        name: '',
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = { ...getSignupInfo };
        copySignupInfo[name as keyof FormData] = value;    // In copySignupInfo variable we have assign string for every key with help of "type" concept
        setSignupInfo(copySignupInfo);
    }

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { name, email, password } = getSignupInfo;
        if (!name || !email || !password) {
            // alert("All Fleid are Required!")
            // return;
            return toastError("All Fleid are Required!")
        }
        try {
            const API_URL = "https://auth-portal-backend.vercel.app/login"
            const url = `${API_URL}/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(getSignupInfo),
            });
            const data = await response.json();
            const { success, message, error } = data;

            if (!response.ok) {
                throw new Error(data?.message || "Signup failed");
            }
            if (success) {
                toastSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            } else if (error) {

                toastError(error)
            }

            console.log("Success:", data);
        }

        catch (error: unknown) {
            if (error instanceof Error) {
                toastError(error.message)
            }
            else {
                toastError('Something Went Wrong')
            }
        }
    }
    return (

        <div className="signup-wrapper">

            <div className="signup-box">

                <h1>Create Account</h1>
                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="name">Full Name </label>
                        <input
                            onChange={handleChange}
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            autoComplete='name'
                            value={getSignupInfo.name}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email Address </label>
                        <input
                            onChange={handleChange}
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            autoComplete='email'
                            value={getSignupInfo.email}

                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password </label>
                        <input
                            onChange={handleChange}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Create a strong password"
                            value={getSignupInfo.password}
                            autoComplete='new-password'
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: "absolute",
                                right: "23px",
                                top: "73%",
                                transform: "translateY(-50%)",
                                border: "none",
                                background: "none",
                                cursor: "pointer"
                            }}
                        >
                            {showPassword ? <Eye stroke='white' size={20} /> : <EyeOff stroke='white' size={20} />}
                        </button>
                    </div>

                    <button type="submit">Sign Up</button>

                </form>

                {/* <p className="bottom-text">
                    Already have an account? <span style={{ color: "blue", cursor: "pointer",  textDecoration:"underline"}} onClick={()=> navigate('/login')}>Login</span>
                </p> */}

                <p style={{ cursor: "pointer" }} className="bottom-text">
                    Already have an account?{" "} <Link to="/login">Login</Link>
                </p>

                <ToastContainer />
            </div>

        </div>
    )
}

export default Signup
