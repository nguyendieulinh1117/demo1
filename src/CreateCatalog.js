import React, { useState } from "react";
import { Form, Input, Button } from "antd";

import { useDispatch } from "react-redux";
import { addCata } from "./redux/action";
import ListCata from "./ListCata";
function CreateCatalog() {
  const [catalog, setCata] = useState({
    catalog_name: null,
  });
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(addCata(catalog, form.resetFields));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container">
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Catalog name"
          name="catalogname"
          rules={[
            {
              required: true,
              message: "Please input catalog name!",
            },
          ]}
        >
          <Input
            onChange={(e) =>
              setCata({ ...catalog, catalog_name: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <ListCata />
    </div>
  );
}

export default CreateCatalog;
