import React, { useState } from 'react';

const Form = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState({});

  const checkInputs = () => {
    const errors = {};

    if (username.trim() === '') {
      errors.username = 'Username cannot be blank';
    }

    if (email.trim() === '') {
      errors.email = 'Email cannot be blank';
    } else if (!isEmail(email)) {
      errors.email = 'Not a valid email';
    }

    if (password.trim() === '') {
      errors.password = 'Password cannot be blank';
    }

    if (password2.trim() === '') {
      errors.password2 = 'Password2 cannot be blank';
    } else if (password.trim() !== password2.trim()) {
      errors.password2 = 'Passwords do not match';
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Proceed with form submission or further actions
      console.log('Form submitted successfully');
    }
  };

  const isEmail = (email) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  };

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        checkInputs();
      }}>
        <div className={`form-control ${errors.username ? 'error' : 'success'}`}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <small>{errors.username}</small>}
        </div>

        <div className={`form-control ${errors.email ? 'error' : 'success'}`}>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <small>{errors.email}</small>}
        </div>

        <div className={`form-control ${errors.password ? 'error' : 'success'}`}>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <small>{errors.password}</small>}
        </div>

        <div className={`form-control ${errors.password2 ? 'error' : 'success'}`}>
          <input
            type="password"
            id="password2"
            placeholder="Confirm Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          {errors.password2 && <small>{errors.password2}</small>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
