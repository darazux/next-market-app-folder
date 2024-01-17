// app/item/delete/[id]/page.js

'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const DeleteItem = (context) => {
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const id = context.params.id;
  const [itemData, setItemData] = useState({
    title: '',
    price: '',
    image: '',
    description: '',
    email: '',
  });
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
      const resp = await fetch(`${api_url}api/item/delete/${id}`, {
        method: 'DELETE',
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
      alert('アイテム削除失敗');
    }
  };
  return (
    <div>
      <h1>アイテム削除</h1>
      <form onSubmit={handleSubmit}>
        <h2>{itemData.title}</h2>
        <Image
          src={itemData.image}
          width={750}
          height={500}
          alt="item-image"
          priority={true}
        />
        <h3>￥{Number(itemData.price).toLocaleString()}</h3>
        <p>{itemData.description}</p>
        <button>削除</button>
      </form>
    </div>
  );
};

export default DeleteItem;
