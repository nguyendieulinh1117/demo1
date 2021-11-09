import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Upload, Switch, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import ListProduct from "./ListProduct";
import { useDispatch } from "react-redux";
import { addProduct, loadCata } from "./redux/action";
import { useSelector } from "react-redux";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function CreateForm() {
  const dispatch = useDispatch();
  const { listCatalog } = useSelector((state) => state.catalog);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  ///validate form
  const [product, setProduct] = useState({
    product_name: null,
    price: null,
    description: null,
    isHot: false,
    isNew: false,
    catalog_id: null,
    image: null,
  });
  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(addProduct(product, form.resetFields, setFileList));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  /// upload image

  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewVisible(true);
    setPreviewImage(file.url || file.preview);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = async (info) => {
    setFileList(info.fileList);
    const response = await getBase64(info.file.originFileObj);
    setProduct({ ...product, image: response });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  // API

  useEffect(() => {
    dispatch(loadCata());
  }, [dispatch]);
  return (
    <div className="container">
      <Form
        form={form}
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
        layout="horizontal"
      >
        <Form.Item
          label="Product name"
          name="productName"
          rules={[
            {
              required: true,
              message: "Please input product name!",
            },
          ]}
        >
          <Input
            onChange={(e) =>
              setProduct({ ...product, product_name: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input price!",
            },
          ]}
        >
          <Input
            type="number"
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          label="Catalog"
          name="catalog"
          rules={[
            {
              required: true,
              message: "Please select catalog!",
            },
          ]}
        >
          <Select onChange={(e) => setProduct({ ...product, catalog_id: e })}>
            {listCatalog.length > 0 ? (
              <>
                {listCatalog &&
                  listCatalog.map((item, index) => (
                    <Select.Option key={index} value={item._id}>
                      {item.catalog_name}
                    </Select.Option>
                  ))}
              </>
            ) : (
              <></>
            )}
          </Select>
        </Form.Item>
        <Form.Item label="Description" name="desc">
          <Input.TextArea
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item label="Hot" valuePropName="checked" name="hot">
          <Switch
            onChange={(e) =>
              setProduct({
                ...product,
                isHot: e === undefined ? false : e,
              })
            }
          />
        </Form.Item>
        <Form.Item label="New" valuePropName="checked" name="new">
          <Switch
            onChange={(e) =>
              setProduct({
                ...product,
                isNew: e === undefined ? false : e,
              })
            }
          />
        </Form.Item>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
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

      <ListProduct />
    </div>
  );
}

export default CreateForm;
