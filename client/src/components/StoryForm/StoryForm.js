import { createStory, updateStory } from '../../actions/stories';
import { Form, Input, Button, Modal, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';

import styles from './styles';
import MediaLibrary from '../MediaLibrary/MediaLibrary';
const { Title } = Typography;

function StoryForm({ selectedId, setSelectedId, visible, setVisible }) {
  const story = useSelector((state) =>
    selectedId ? state.stories.find((story) => story._id === selectedId) : null
  );

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const user = JSON.parse(localStorage.getItem('profile'));
  const username = user?.result?.username;

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onCancel = () => {
    setVisible(false);
  };

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

  return (
    <Modal
      open={visible}
      title=<Title level={4} style={styles.formTitle}>
        {selectedId ? 'Editing' : 'Share'} a story
      </Title>
      okText='Submit'
      onCancel={reset}
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
          <Input.TextArea allowClear autoSize={{ minRows: 1, maxRows: 2 }} />
        </Form.Item>
        <Form.Item
          name='images'
          label='Images'
          rules={[{ required: true }]}
          valuePropName='fileList'
          getValueFromEvent={normFile}
        >
          <MediaLibrary form={form} story={story} selectedId={selectedId} />
        </Form.Item>
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
