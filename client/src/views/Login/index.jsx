import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import Logo from '../../assets/images/KPMG.png';
const Login = () => {
    const [data, setData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };
    console.log(data);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = 'http://localhost:8080/api/auth';
            const { data: res } = await axios.post(url, data);
            localStorage.setItem('firstname', res.data['firstname']);
            localStorage.setItem('lastname', res.data['lastname']);
            localStorage.setItem('mail', res.data['mail']);
            localStorage.setItem('token', res.data['token']);
            localStorage.setItem('phone', res.data['phone']);
            localStorage.setItem('company', res.data['company']);
            localStorage.setItem('desig', res.data['desig']);
            localStorage.setItem('gender', res.data['gender']);

            window.location = '/pages/dashboard/default';
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };
    return (
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <img src={Logo} alt="logo" style={{ width: '14vw', height: '20vh' }} />
                        <h3>Welcome to Network Dashboard</h3>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
                        />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="submit" className={styles.green_btn}>
                            Sign In
                        </button>
                        <a style={{ color: 'blue' }}>Forgot Password?</a>
                    </form>
                </div>
                <div className={styles.right}>
                    <h1>New Here ?</h1>
                    <Link to="/signup">
                        <button type="button" className={styles.white_btn}>
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default Login;
