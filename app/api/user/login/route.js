// app/api/user/login/route.js

import connectDB from '@/app/utils/database';
import { UserModel } from '@/app/utils/schemaModels';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const reqBody = await request.json();
  try {
    await connectDB();
    const email = reqBody.email;
    const savedUserData = await UserModel.findOne({ email: email });
    // no data
    if (!savedUserData) {
      return NextResponse.json({
        message: 'ログイン失敗：ユーザー登録をしてください',
      });
    }
    const password = reqBody.password;
    // password incorrect
    if (password !== savedUserData.password) {
      return NextResponse.json({
        message: 'ログイン失敗：パスワードが間違っています',
      });
    }
    return NextResponse.json({ message: 'ログイン成功' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'ログイン失敗' });
  }
}
