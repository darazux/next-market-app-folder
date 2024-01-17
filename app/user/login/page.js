// app/user/login/page.js

'use client';

import { useState } from 'react';

const Login = () => {
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(`${api_url}api/user/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      const jsonData = await resp.json();
      localStorage.setItem('token', jsonData.token);
      alert(jsonData.message);
    } catch (error) {
      console.log(error);
      alert('ログイン失敗');
    }
  };
  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={loginData.email}
          onChange={handleChange}
          type="text"
          name="email"
          placeholder="メールアドレス"
          required
        />
        <input
          value={loginData.password}
          onChange={handleChange}
          type="text"
          name="password"
          placeholder="パスワード"
          required
        />
        <button>ログイン</button>
      </form>
    </div>
  );
};

export default Login;
