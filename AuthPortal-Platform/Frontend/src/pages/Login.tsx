import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { toastSuccess, toastError } from '../helpers/utils'
import { EyeOff, Eye } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  type FromData = {
    email: string,
    password: string
  }
  const [getLoginInfo, setLoginInfo] = useState<FromData>({
    email: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target as HTMLInputElement;
    console.log(name, value)
    const copyLoginInfo = { ...getLoginInfo };
    copyLoginInfo[name as keyof FromData] = value;
    setLoginInfo(copyLoginInfo);
  }

  const handleLoginSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { email, password } = getLoginInfo;
    if (!email || !password) {
      // alert("All Fleid are Required!")
      // return;
      return toastError("All Fleid are Required!")
    }
    try {
      
      const url = "https://auth-portal-backend.vercel.app//auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(getLoginInfo),
      });
      const data = await response.json();
      const { success, message, jwtToken, name, error } = data;

      if (!response.ok) {
        throw new Error(data?.message || "Signup failed");
        // toastError(data?.message || "signup failed")  not work it
      }

      if (success) {
        toastSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);

        setTimeout(() => {
          navigate('/home')
        }, 1000)
      } else if (error) {
        const details = error.details[0].message;
        toastError(details)
      }

      console.log("Success:", data);

    }
    catch (error: unknown) {
      if (error instanceof Error) {
        toastError(error.message);
      }
      else {
        toastError("Something went wrong !");
      }
    }
  }

  return (
    <div className="signup-wrapper">

      <div className="signup-box">

        <h1>Welcome Back</h1>

        <form onSubmit={handleLoginSubmit}>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              onChange={handleLogin}
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={getLoginInfo.email}
              autoComplete='email'
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleLogin}
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={getLoginInfo.password}
              autoComplete='current-password'

            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "21px",
                top: "62%",
                transform: "translateY(-50%)",
                border: "none",
                background: "none",
                cursor: "pointer"
              }}
            >
              {showPassword ? <Eye stroke='white' size={20} /> : <EyeOff stroke='white' size={20} />}
            </button>
          </div>

          <button type="submit">Login</button>

        </form>

        {/* <p className="bottom-text">
          Don't have an account?{" "}
          <span
            style={{
              color: "blue",
              cursor: "pointer",
              textDecoration: "underline"
            }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p> */}
        
        <p style={{ cursor: "pointer" }} className='bottom-text'>
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>


        <p style={{ cursor: "pointer" }} className='bottom-text'>
          Don't have an account?{" "}
          <Link to="/signup">Signup</Link>
        </p>

        <ToastContainer />
      </div>
    </div>
  )
}

export default Login
