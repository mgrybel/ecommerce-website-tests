import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUserDetails } from '@/utilities/AuthUtilities';
import { signUp } from '@/utilities/api/AuthAPIHandlers';

const Register = () => {
  const currentUser = getUserDetails();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.token) navigate('/');
  }, []);

  const handleRegistration = (e) => {
    e.preventDefault();

    if (
      name === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      setError('All fields are required');
      return;
    }

    // regex validation of email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    console.log(
      'Signing up with name: ' +
        name +
        ' email: ' +
        email +
        ' and password: ' +
        password
    );
    setError('');

    const user = signUp({ name, email, password });
    console.log(user);

    navigate('/login');
  };

  return (
    <section className='container'>
      <div className='row py-lg-5'>
        <div className='col-lg-6 col-md-8 mx-auto'>
          <h1 className='text-center pb-3'>Register</h1>
          <p className='text-danger text-center'>{error}</p>
          <form>
            <fieldset>
              <div className='row pb-2'>
                <label htmlFor='name' className='col-sm-2 col-form-label'>
                  Name
                </label>
                <div className='col-sm-10 border border-secondary'>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    className='form-control-plaintext'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className='row pb-2'>
                <label htmlFor='email' className='col-sm-2 col-form-label'>
                  Email
                </label>
                <div className='col-sm-10 border border-secondary'>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    className='form-control-plaintext'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className='row pb-2'>
                <label htmlFor='password' className='col-sm-2 col-form-label'>
                  Password
                </label>
                <div className='col-sm-10 border border-secondary'>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    className='form-control-plaintext'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className='row pb-2'>
                <label
                  htmlFor='confirmPassword'
                  className='col-sm-2 col-form-label'
                >
                  Confirm Password
                </label>
                <div className='col-sm-10 border border-secondary'>
                  <input
                    type='password'
                    id='confirmPassword'
                    name='confirmPassword'
                    className='form-control-plaintext'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </fieldset>
            <div className='text-center'>
              <button
                type='button'
                className='btn btn-success me-2'
                onClick={handleRegistration}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;