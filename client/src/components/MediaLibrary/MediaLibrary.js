// components/media/MediaLibrary.js
import React, { useContext } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
// import { AuthContext } from "../../context/auth";

const { Dragger } = Upload;

const MediaLibrary = ({ form }) => {
  const props = {
    name: 'image',
    listType: 'picture-card',
    multiple: false,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        // console.log("############ ============> ", info.file.response);
        message.success(`${info.file.name} file uploaded successfully.`);
        getBase64(info.file.originFileObj, (url) => {form.setFieldsValue({ image: url })});
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  return (
    <>
      <Dragger {...props} customRequest={({ onSuccess }) => onSuccess('ok')}>
        <p className='ant-upload-drag-icon'>
          <InboxOutlined />
        </p>
        <p className='ant-upload-text'>
          Click or drag file to this area to upload
        </p>
      </Dragger>
    </>
  );
};

export default MediaLibrary;
