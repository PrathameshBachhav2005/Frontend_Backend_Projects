import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { toastError, toastSuccess } from '../helpers/utils'
import { Eye, EyeOff } from 'lucide-react'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email || !newPassword) {
      return toastError('All fields are required')
    }

    try {
      setLoading(true)

      const API_URL = "http://localhost:8080";
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          Array.isArray(data?.message)
            ? data.message.join(', ')
            : data?.message || 'Something went wrong'
        )
      }

      toastSuccess(data.message || 'Password updated successfully')
      setEmail('')
      setNewPassword('')

      setTimeout(() => {
        navigate('/login')
      }, 1500)

    } catch (error: unknown) {
      if (error instanceof Error) {
        toastError(error.message)
      } else {
        toastError('Something went wrong')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signup-wrapper">
      <div className="signup-box">

        <h1>Forgot Password</h1>
        <p style={{ color: '#aaa', marginBottom: '1.2rem', fontSize: '0.9rem', textAlign: 'center' }}>
          Enter your email and set a new password directly.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              id="newPassword"
              type={showPassword ? 'text' : 'password'}
              name="newPassword"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '21px',
                top: '62%',
                transform: 'translateY(-50%)',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
              }}
            >
              {showPassword
                ? <Eye stroke="white" size={20} />
                : <EyeOff stroke="white" size={20} />}
            </button>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Password'}
          </button>

        </form>

        <p style={{ cursor: 'pointer' }} className="bottom-text">
          Remember your password? <Link to="/login">Login</Link>
        </p>

        <ToastContainer />
      </div>
    </div>
  )
}

export default ForgotPassword
