import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loadCata } from "./redux/action";
import { List } from "antd";
function ListCata() {
  const dispatch = useDispatch();
  const { listCatalog } = useSelector((state) => state.catalog);
  useEffect(() => {
    dispatch(loadCata());
  }, [dispatch]);
  return (
    <List
      itemLayout="horizontal"
      dataSource={listCatalog}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            title={<a href="https://ant.design">{item.catalog_name}</a>}
            description={item.status === true ? "Show" : "Hide"}
          />
        </List.Item>
      )}
    />
  );
}

export default ListCata;
