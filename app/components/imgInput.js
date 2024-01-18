// app/components/imgInput.js

import { useState } from 'react';

const ImgInput = (props) => {
  const [imageFile, setImageFile] = useState('');
  const cloudinaryName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
  const cloudinaryPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const url = `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`;
  const handleClick = async () => {
    try {
      const data = new FormData();
      data.append('file', imageFile);
      data.append('upload_preset', cloudinaryPreset);
      data.append('cloud_name', cloudinaryName);
      const resp = await fetch(url, {
        method: 'POST',
        body: data,
      });
      const jsonData = await resp.json();
      await props.setImage(jsonData.secure_url);
      alert('画像アップロード成功');
    } catch (error) {
      console.log(error);
      alert('画像アップロード失敗');
    }
  };
  return (
    <div className="img-input">
      <input
        type="file"
        onChange={(e) => setImageFile(e.target.files[0])}
        accept="image/png,image/jpg"
      />
      <button onClick={handleClick} disabled={!imageFile}>
        画像Upload
      </button>
    </div>
  );
};

export default ImgInput;
