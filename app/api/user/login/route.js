// app/api/user/login/route.js

import connectDB from '@/app/utils/database';
import { UserModel } from '@/app/utils/schemaModels';
import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';

const secretKey = new TextEncoder().encode('next-market-app-bookk');

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
    // create token
    const payload = {
      email: email,
    };
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1d')
      .sign(secretKey);
    return NextResponse.json({ message: 'ログイン成功', token: token });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'ログイン失敗' });
  }
}
