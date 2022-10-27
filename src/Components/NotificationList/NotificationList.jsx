import { useEffect, useState } from "react";
import instance from "../../Api/Axios";
import moment from "moment";
import { List, Row } from "antd";

const NotificationList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const getNotification = (current, pageSize) => {
        setLoading(true);
        instance
            .get("api/socks/factory/notification/list")
            .then((data) => {
                setData(data.data.data);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => setLoading(false));
    };

    const onChange = (pageNumber, page) => {
        setPageSize(page);
        setCurrent(pageNumber);
        getNotification(pageNumber - 1, page);
    };

    useEffect(() => {
        getNotification(current - 1, pageSize);
    }, []);

    return (
        <div style={{ margin: "30px 0" }}>
            <h3>Eslatmalar</h3>
            <List
                loading={loading}
                bordered
                itemLayout="vertical"
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 1,
                    md: 2,
                    lg: 2,
                    xl: 2,
                    xxl: 2,
                }}
                size="small"
                pagination={{
                    showSizeChanger: true,
                    pageSize: pageSize,
                    current: current,
                    pageSizeOptions: [10, 20],
                    onChange: onChange,
                }}
                dataSource={data}
                renderItem={(item) => {
                    return (
                        <List.Item
                            style={{
                                borderBottom: "1px solid #000",
                                marginBottom: 0,
                            }}
                        >
                            <Row justify="space-between">
                                <List.Item.Meta
                                    title={item?.materialName}
                                    description={`${item.amount} ${item.measurementName}`}
                                />
                            </Row>
                        </List.Item>
                    );
                }}
            />
        </div>
    );
};

export default NotificationList;
