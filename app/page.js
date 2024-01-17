// app/page.js

import Image from 'next/image';
import Link from 'next/link';

const getAllItems = async () => {
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const resp = await fetch(`${api_url}api/item/readall`, { cache: 'no-store' });
  const jsonData = await resp.json();
  return jsonData.allItems;
};

const ReadAllItems = async () => {
  const allItems = await getAllItems();
  return (
    <div>
      {allItems.map((item) => (
        <Link href={`/item/readsingle/${item._id}`} key={item._id}>
          <Image
            src={item.image}
            width={750}
            height={500}
            alt="item-image"
            priority={true}
          />
          <div key={item._id}>
            <h2>{Number(item.price).toLocaleString()}</h2>
            <h3>{item.title}</h3>
            <p>
              {item.description.length >= 80
                ? item.description.substring(0, 80) + '...'
                : item.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ReadAllItems;
