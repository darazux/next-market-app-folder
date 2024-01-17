// app/item/update/[id]/page.js

'use client';

import useAuth from '@/app/utils/useAuth';
import { useEffect, useState } from 'react';

const UpdateItem = (context) => {
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const id = context.params.id;
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
  useEffect(() => {
    const getSingleItem = async (id) => {
      const resp = await fetch(`${api_url}api/item/readsingle/${id}`, {
        cache: 'no-store',
      });
      const jsonData = await resp.json();
      setItemData(jsonData.singleItem);
    };
    getSingleItem(id);
  }, [context]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(`${api_url}api/item/update/${id}`, {
        method: 'PUT',
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
      alert('アイテム編集失敗');
    }
  };
  if (loginUserEmail === itemData.email) {
    return (
      itemData.title && (
        <div>
          <h1>アイテム編集</h1>
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
            <button>編集</button>
          </form>
        </div>
      )
    );
  } else {
    return itemData.title && <h1>権限がありません</h1>;
  }
};

export default UpdateItem;
