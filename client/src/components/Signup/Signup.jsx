import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { loginThunk, signUpThunk } from '../../store/game'
import { Form, Input, Button } from 'antd'
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'
import axios from 'axios'

const axiosCors = axios.create({ withCredentials: true })

export default function LoginForm() {
  const history = useHistory()
  const dispatch = useDispatch()

  return (
    <div className="background-image">
      <div className="modal-background">
        <div className="login-form">
          <Form
            onFinish={(values) =>
              dispatch(
                signUpThunk(values, () => {
                  history.push('/')
                })
              )
            }
          >
            <Form.Item>
              <h1>Sign Up</h1>
            </Form.Item>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: 'Please input your Username!' },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  required: true,
                  message: 'Please input your Email',
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
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
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
              />
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
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }

                    return Promise.reject(
                      'The two passwords that you entered do not match!'
                    )
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Confirm Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                style={{ marginBottom: '10px' }}
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Sign Up
              </Button>
              Or <a href="/login">Login!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
