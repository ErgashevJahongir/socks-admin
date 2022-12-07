import { Fragment, useState } from "react";
import instance from "../../Api/Axios";
import { Col, message, Row } from "antd";
import CustomTable from "../../Module/Table/Table";
import { useData } from "../../Hook/UseData";
import { useNavigate } from "react-router-dom";

const SocksResource = () => {
    const [socksResource, setSocksResource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const { measurementData, socksData, createMaterialData } = useData();
    const navigate = useNavigate();

    const getSocksResource = (current, pageSize) => {
        setLoading(true);
        instance
            .get("api/socks/factory/resources")
            .then((data) => {
                console.log(data);
                setSocksResource(
                    data.data?.data?.map((item) => {
                        return {
                            ...item,
                            id: item.socksId,
                        };
                    })
                );
                setTotalItems(data.data?.data?.totalItems);
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error(
                    "Naski tayyorlashda ishlatiladigan materiallarni yuklashda muammo bo'ldi"
                );
            })
            .finally(() => setLoading(false));
    };

    const columns = [
        {
            title: "Naski nomi",
            dataIndex: "socksId",
            key: "socksId",
            width: "100%",
            search: false,
            render: (record) => {
                const data = socksData?.filter((item) => item.id === record);
                return data[0]?.name;
            },
            sorter: (a, b) => {
                if (a.socksId < b.socksId) {
                    return -1;
                }
                if (a.socksId > b.socksId) {
                    return 1;
                }
                return 0;
            },
        },
    ];

    const onCreate = (values) => {
        setLoading(true);
        console.log(values);
        instance
            .post(
                `api/socks/factory/resources?materialId=${values.materialId}&amount=${values.amount}&measurementId=${values.measurementId}&socksId=${values.socksId}`
            )
            .then(function (response) {
                message.success(
                    "Naski tayyorlashda ishlatiladigan material muvaffaqiyatli qo'shildi"
                );
                getSocksResource(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error(
                    "Naski tayyorlashda ishlatiladigan materialni qo'shishda muammo bo'ldi"
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onEdit = (values, initial) => {
        setLoading(true);
        instance
            .put(
                `/api/socks/factory/resources?socksId=${values.socksId}&oldMaterialId=${values.oldMaterialId}`,
                {
                    materialId: values.materialId,
                    amount: values.amount,
                    measurementId: values.measurementId,
                }
            )
            .then((res) => {
                message.success(
                    "Naski tayyorlashda ishlatiladigan material muvaffaqiyatli taxrirlandi"
                );
                getSocksResource(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error("Error in edit: ", error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error(
                    "Naski tayyorlashda ishlatiladigan materialni taxrirlashda muammo bo'ldi"
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDelete = (arr) => {
        setLoading(true);
        arr.map((item) => {
            instance
                .delete(
                    `api/socks/factory/api/socks/factory/material/delete${item}`
                )
                .then((data) => {
                    getSocksResource(current - 1, pageSize);
                    message.success(
                        "Naski tayyorlashda ishlatiladigan material muvaffaqiyatli o'chirildi"
                    );
                })
                .catch((error) => {
                    console.error(error);
                    if (error.response?.status === 500)
                        navigate("/server-error");
                    message.error(
                        "Naski tayyorlashda ishlatiladigan materialni o'chirishda muammo bo'ldi"
                    );
                })
                .finally(() => setLoading(false));
            return null;
        });
    };

    return (
        <>
            <CustomTable
                onEdit={onEdit}
                onCreate={onCreate}
                onDelete={handleDelete}
                getData={getSocksResource}
                columns={columns}
                tableData={socksResource}
                current={current}
                pageSize={pageSize}
                totalItems={totalItems}
                loading={loading}
                setLoading={setLoading}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                pageSizeOptions={[10, 20]}
                expandable={{
                    expandedRowRender: (record) => {
                        return (
                            <Row>
                                <Col
                                    span={8}
                                    style={{ margin: "5px 0", fontWeight: 600 }}
                                >
                                    Material nomi
                                </Col>
                                <Col
                                    span={8}
                                    style={{ margin: "5px 0", fontWeight: 600 }}
                                >
                                    Material o'lchov birligi
                                </Col>
                                <Col
                                    span={8}
                                    style={{ margin: "5px 0", fontWeight: 600 }}
                                >
                                    Material miqdori
                                </Col>
                                {record.resources.map((item) => {
                                    const materialName =
                                        createMaterialData?.filter(
                                            (qism) =>
                                                qism.id === item.materialId
                                        );
                                    const measurementName =
                                        measurementData?.filter(
                                            (qism) =>
                                                qism.id === item.measurementId
                                        );
                                    return (
                                        <Fragment key={item.materialId}>
                                            <Col
                                                span={8}
                                                style={{ margin: "5px 0" }}
                                            >
                                                {materialName[0]?.name}
                                            </Col>
                                            <Col
                                                span={8}
                                                style={{ margin: "5px 0" }}
                                            >
                                                {measurementName[0]?.name}
                                            </Col>
                                            <Col
                                                span={8}
                                                style={{ margin: "5px 0" }}
                                            >
                                                {item.amount}
                                            </Col>
                                        </Fragment>
                                    );
                                })}
                            </Row>
                        );
                    },
                }}
            />
        </>
    );
};

export default SocksResource;
