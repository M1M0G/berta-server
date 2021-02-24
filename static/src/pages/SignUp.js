import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React from 'react';
import PageLayout from '../layout/PageLayout';
import axios from "../core"
import { withRouter } from 'react-router';

const SignUp = ({history}) => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    axios.post('http://localhost:8000/api/user/signup', values).then(res => {
      console.log(res) 
      history.push('/signup/verify')
    })
  };
console.log(history)
  return (
    <PageLayout title="Регистрация">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        style = {{maxWidth: '300px', margin: "auto"}}
        onFinish={onFinish}
      >
        <Form.Item
            name="nickname"
            rules={[{ required: true, message: 'Please input your nickname!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="nickname" />
        </Form.Item>
        <Form.Item
            name="email"
            rules={[
            {
                type: 'email',
                message: 'The input is not valid E-mail!',
            },
            {
                required: true,
                message: 'Please input your E-mail!',
            },
        ]}
        >
            <Input prefix='@' placeholder="E-mail"/>
        </Form.Item>
        <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password prefix = {<LockOutlined/>} placeholder = 'Password'/>
      </Form.Item>

      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('Два этих пароля не совпадают!');
            },
          }),
        ]}
      >
        <Input.Password prefix = {<LockOutlined/>} placeholder = 'Confirm Password'/>
      </Form.Item>
        {/* <Form.Item>
            <a className="login-form-forgot" href="">
                Forgot password
            </a>
        </Form.Item> */}

        <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" style = {{width: "100%"}}>
                Зарегистрироваться
            </Button>
            Или <Link to="/signin">Войти</Link>
        </Form.Item>
        <Form.Item>
            <Button type="primary" className="login-form-button" style = {{width: "100%"}} onClick = {() => history.push('/signup/verify')}>
          Кнопочка
           </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  );
}

// About.propTypes = {
//   location: PropTypes.object.isRequired,
// };

export default withRouter(SignUp);
