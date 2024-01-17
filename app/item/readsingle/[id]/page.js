// app/item/readsingle/[id]/page.js

import Image from 'next/image';
import Link from 'next/link';

const getSingleItem = async (id) => {
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const resp = await fetch(`${api_url}api/item/readsingle/${id}`, {
    cache: 'no-store',
  });
  const jsonData = await resp.json();
  return jsonData.singleItem;
};

const ReadSingleItem = async (context) => {
  const id = context.params.id;
  const singleItem = await getSingleItem(id);
  return (
    <div>
      <div>
        <Image
          src={singleItem.image}
          width={750}
          height={500}
          alt="item-image"
          priority={true}
        />
      </div>
      <div>
        <h1>{singleItem.title}</h1>
        <h2>￥{Number(singleItem.price).toLocaleString()}</h2>
        <hr />
        <p>{singleItem.description}</p>
        <div>
          <Link href={`/item/update/${id}`}>アイテム編集</Link>
          <Link href={`/item/delete/${id}`}>アイテム削除</Link>
        </div>
      </div>
    </div>
  );
};

export default ReadSingleItem;
