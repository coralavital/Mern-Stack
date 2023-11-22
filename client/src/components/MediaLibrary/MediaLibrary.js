// components/media/MediaLibrary.js
import React, { useContext, useState } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
// import { AuthContext } from "../../context/auth";

const { Dragger } = Upload;

const MediaLibrary = ({ form }) => {
  const [imageBase64List, setImageBase64List] = useState([]);

  const props = {
    multiple: true,
    name: 'images',
    listType: 'picture',
    onChange(info) {
      const { status } = info.file;

      if (status === 'done' || status === 'error') {
        try {
          message.success(`${info.file.name} uploaded successfuly.`);
          getBase64(info.file.originFileObj, (url) => {
            // Append the new image to the existing list
            imageBase64List.push(url);
            form.setFieldsValue({ images: [ ...imageBase64List] }); // Update the form value with the image list
          });

        } catch (error) {
          console.error('Error converting to base64:', error);
          message.error('Failed to convert image.');
        }
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
