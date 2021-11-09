import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loadProduct } from "./redux/action";

function ListProduct() {
  const dispatch = useDispatch();
  const { listProduct } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(loadProduct());
  }, [dispatch]);
  const style = { padding: "8px 0" };
  return (
    <div>
      <h1>List product</h1>
      <Row gutter={[16, 24]}>
        {listProduct &&
          listProduct.map((item, index) => (
            <Col className="gutter-row" span={6} key={index}>
              <div style={style}>
                {item.image !== null ? (
                  <img
                    src={item.image}
                    alt=""
                    style={{ width: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <img
                    src="/"
                    alt="NoImage"
                    title="No image"
                    style={{ width: "100%", objectFit: "cover" }}
                  />
                )}
                <h3>{item.product_name}</h3>
                <p>${item.price}</p>
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default ListProduct;
