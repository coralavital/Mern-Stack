import { createStory, updateStory } from '../../actions/stories';
import {
  Card,
  Form,
  Input,
  Typography,
  Button,
  Modal,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import FileBase64 from 'react-file-base64';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles';

const { Title } = Typography;

function StoryForm({ selectedId, setSelectedId, visible, onCancel }) {
  const story = useSelector((state) =>
    selectedId ? state.stories.find((story) => story._id === selectedId) : null
  );

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const user = JSON.parse(localStorage.getItem('profile'));
  const username = user?.result?.username;

  const onSubmit = (formValues) => {
    selectedId
      ? dispatch(updateStory(selectedId, { ...formValues, username }))
      : dispatch(createStory({ ...formValues, username }));

    reset();
  };

  useEffect(() => {
    if (story) {
      form.setFieldsValue(story);
    }
  }, [story, form]);

  const reset = () => {
    onCancel();
    form.resetFields();
    setSelectedId(null);
  };

  if (!user) {
    return (
      <Card style={styles.formCard}>
        <Title level={4}>
          <span style={styles.formTitle}>Welcome to Instaverse!</span> <br />
          Please <Link to='/authform'>login</Link> or{' '}
          <Link to='/authform'>register</Link> for sharing instant moments or
          ideas.
        </Title>
      </Card>
    );
  }

  return (
    <Modal
      open={visible}
      title=<Title level={4} style={styles.formTitle}>
        {selectedId ? 'Editing' : 'Share'} a story
      </Title>
      okText='Submit'
      onCancel={onCancel}
      onOk={onCancel}
      footer={[]}
    >
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        layout='horizontal'
        size='middle'
        onFinish={onSubmit}
      >
        <Form.Item name='caption' label='Caption' rules={[{ required: true }]}>
          <Input.TextArea allowClear autoSize={{ minRows: 2, maxRows: 6 }} />
        </Form.Item>
        <Form.Item name='tags' label='Tags'>
          <Input.TextArea allowClear autoSize={{ minRows: 2, maxRows: 6 }} />
        </Form.Item>
        <Form.Item name='image' label='Image' rules={[{ required: true }]}>
          <FileBase64
            type='file'
            multiple={false}
            onDone={(e) => {
              form.setFieldsValue({ image: e.base64 });
            }}
          />
        </Form.Item>
        {/* <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={getFile}>
          <Upload beforeUpload={false} action={false} listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item> */}
        {!selectedId ? (
          <Form.Item wrapperCol={{ span: 16, offset: 6 }}>
            <Button type='primary' block htmlType='submit'>
              Share
            </Button>
          </Form.Item>
        ) : (
          <Form.Item wrapperCol={{ span: 16, offset: 6 }}>
            <Button type='primary' block htmlType='submit'>
              Save
            </Button>
          </Form.Item>
        )}
        {!selectedId ? null : (
          <Form.Item wrapperCol={{ span: 16, offset: 6 }}>
            <Button
              type='primary'
              block
              htmlType='button'
              danger
              onClick={reset}
            >
              Discard
            </Button>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
}

export default StoryForm;