// app/item/create/page.js

'use client';

import useAuth from '@/app/utils/useAuth';
import { useState } from 'react';

const CreateItem = () => {
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const loginUserEmail = useAuth();
  const [itemData, setItemData] = useState({
    title: '',
    price: '',
    image: '',
    description: '',
    email: loginUserEmail,
  });
  const handleChange = (e) => {
    setItemData({
      ...itemData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(`${api_url}api/item/create`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(itemData),
      });
      const jsonData = await resp.json();
      alert(jsonData.message);
    } catch (error) {
      console.log(error);
      alert('アイテム作成失敗');
    }
  };
  if (loginUserEmail) {
    return (
      <div>
        <h1>アイテム作成</h1>
        <form onSubmit={handleSubmit}>
          <input
            value={itemData.title}
            onChange={handleChange}
            type="text"
            name="title"
            placeholder="アイテム名"
            required
          />
          <input
            value={itemData.price}
            onChange={handleChange}
            type="text"
            name="price"
            placeholder="価格"
            required
          />
          <input
            value={itemData.image}
            onChange={handleChange}
            type="text"
            name="image"
            placeholder="画像"
            required
          />
          <textarea
            value={itemData.description}
            onChange={handleChange}
            name="description"
            rows={15}
            placeholder="商品説明"
            required
          ></textarea>
          <button>作成</button>
        </form>
      </div>
    );
  }
};

export default CreateItem;
