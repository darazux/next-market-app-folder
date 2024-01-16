// app/api/item/readsingle/[id]/route.js

import connectDB from '@/app/utils/database';
import { ItemModel } from '@/app/utils/schemaModels';
import { NextResponse } from 'next/server';

export async function GET(request, context) {
  try {
    await connectDB();
    const id = context.params.id;
    const singleItem = await ItemModel.findById(id);
    return NextResponse.json({
      message: 'アイテム読み取り成功（シングル）',
      singleItem: singleItem,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'アイテム読み取り失敗（シングル）' });
  }
}
