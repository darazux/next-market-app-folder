// app/api/item/update/[id]/route.js

import connectDB from '@/app/utils/database';
import { ItemModel } from '@/app/utils/schemaModels';
import { NextResponse } from 'next/server';

export async function PUT(request, context) {
  const reqBody = await request.json();
  try {
    await connectDB();
    const id = context.params.id;
    const singleItem = await ItemModel.findById(id);
    const email = reqBody.email;
    if (singleItem.email !== email) {
      return NextResponse.json({ message: '他の人が作成したアイテムです' });
    }
    const updateData = reqBody;
    await ItemModel.updateOne({ _id: id }, updateData);
    return NextResponse.json({ message: 'アイテム編集成功' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'アイテム編集失敗' });
  }
}
