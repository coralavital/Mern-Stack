// components/media/MediaLibrary.js
import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const MediaLibrary = ({ form }) => {
  const [imageBase64List, setImageBase64List] = useState([]);

  const props = {
    name: 'images',
    listType: 'picture-card',
    multiple: true,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
          getBase64(info.file.originFileObj, (url) => {
            // Append the new image to the existing list
            imageBase64List.push(url);
            form.setFieldsValue({ images: [ ...imageBase64List] }); // Update the form value with the image list
          });
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
