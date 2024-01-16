// app/api/item/delete/[id]/route.js

import connectDB from '@/app/utils/database';
import { ItemModel } from '@/app/utils/schemaModels';
import { NextResponse } from 'next/server';

export async function DELETE(request, context) {
  try {
    await connectDB();
    const id = context.params.id;
    await ItemModel.deleteOne({ _id: id });
    return NextResponse.json({ message: 'アイテム削除成功' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'アイテム削除失敗' });
  }
}
