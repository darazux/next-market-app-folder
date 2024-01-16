// app/api/item/create/route.js

import connectDB from '@/app/utils/database';
import { ItemModel } from '@/app/utils/schemaModels';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const reqBody = await request.json();
  console.log(reqBody);
  try {
    await connectDB();
    const itemData = reqBody;
    await ItemModel.create(itemData);
    return NextResponse.json({ message: 'アイテム作成成功' });
  } catch (error) {
    return NextResponse.json({ message: 'アイテム作成失敗' });
  }
}
