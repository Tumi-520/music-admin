import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { loginApi } from "../../store/login";
import { useDispatch } from "react-redux";
import "./index.scss";
const Login = () => {
  const [type, setType] = useState("cellphone");
  // @ts-ignore
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    console.log("Success:", values);
    const {  password, username } = values;
    dispatch(loginApi({type, username, password}));
  };

  
 
  return (
    <div className="login-wrapper">
      <div className="login">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: `${type ? "请输入手机号" : "请输入邮箱"}`,
              },
            ]}
          >
            <Input placeholder={type === "cellphone" ? "手机号" : "邮箱"} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password placeholder="密码" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
            {type !== "cellphone" ? (
              <Button type="primary" onClick={() => setType("cellphone")}>
                {"手机号登录"}
              </Button>
            ) : (
              <Button type="primary" onClick={() => setType("email")}>
                {"邮箱登录"}
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
