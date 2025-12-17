import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(null);

    const { email, password, confirmPassword } = formData;
    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify({ id: data._id, email: data.email }));
                navigate('/');
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError(err.message || 'Something went wrong');
        }
    };

    return (
        <div style={{ background: 'var(--color-bg)' }}>
            <Navbar />
            <div className="gradient__bg" style={{ minHeight: 'calc(100vh - 100px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="section__padding" style={{ background: '#040C18', padding: '2rem', borderRadius: '1rem', width: '100%', maxWidth: '400px' }}>
                    <h1 className="gradient__text" style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>Register</h1>
                    {error && <p style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
                    <form onSubmit={onSubmit}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <input
                                type="email"
                                className="email"
                                placeholder="Email Address"
                                id="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '5px', border: 'none', background: '#031B34', color: '#fff' }}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <input
                                type="password"
                                className="password"
                                placeholder="Password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '5px', border: 'none', background: '#031B34', color: '#fff' }}
                                required
                            />
                        </div>
                         <div style={{ marginBottom: '1.5rem' }}>
                            <input
                                type="password"
                                className="password"
                                placeholder="Confirm Password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={onChange}
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '5px', border: 'none', background: '#031B34', color: '#fff' }}
                                required
                            />
                        </div>
                        <button type="submit" style={{ width: '100%', padding: '1rem', background: '#FF4820', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 'bold' }}>
                            Sign Up
                        </button>
                        <p style={{ marginTop: '1rem', color: '#fff', textAlign: 'center' }}>
                            Already have an account? <span style={{ color: '#FF4820', cursor: 'pointer' }} onClick={() => navigate('/login')}>Login</span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
