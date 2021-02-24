import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React from 'react';
import PageLayout from '../layout/PageLayout';


//const store = DataLinkStore.create({})

const SignIn = () => {

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <PageLayout title="Вход">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        style = {{maxWidth: '300px', margin: "auto"}}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" style = {{width: "100%"}}>
            Войти
          </Button>
          Или <Link to="/signup">Зарегистрироваться</Link>
        </Form.Item>
      </Form>
    </PageLayout>
  );
}

// About.propTypes = {
//   location: PropTypes.object.isRequired,
// };

export default SignIn;
