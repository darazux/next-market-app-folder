// app/api/user/register/route.js

import connectDB from '@/app/utils/database';
import { UserModel } from '@/app/utils/schemaModels';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const reqBody = await request.json();
  try {
    await connectDB();
    const userData = reqBody;
    await UserModel.create(userData);
    return NextResponse.json({ message: 'ユーザー登録成功' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'ユーザー登録失敗' });
  }
}
