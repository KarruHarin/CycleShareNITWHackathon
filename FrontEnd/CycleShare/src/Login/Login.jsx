import React, { useState } from 'react';
import './Login.css'; // Include custom CSS for responsiveness or use Tailwind/Bootstrap

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [state, setstate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mobilenumber, setmobilenumber] = useState('');

  // Basic email validation
  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    // You can make an API request here to authenticate the user
    // For now, we'll just simulate an API call:
    setTimeout(() => {
      setIsLoading(false);
      alert('Login successful');
      // Redirect or handle the successful login (e.g., routing to dashboard)
    }, 1500);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your college email"
          />
        </div>
        <div className="input-group">
          <label htmlFor="state">State</label>
          <input
            type="Text"
            id="state"
            value={state}
            onChange={(e) => setstate(e.target.value)}
            required
            placeholder="Enter your State"
          />
        </div>
        <div className="input-group">
          <label htmlFor="state">MobileNumber</label>
          <input
            type="tel"
             pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            id="mobilenumber"
            value={mobilenumber}
            onChange={(e) => setmobilenumber(e.target.value)}
            required
            placeholder="Enter your Mobile Number"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
