import { Fragment, useState } from "react";
import instance from "../../Api/Axios";
import { Col, message, Row } from "antd";
import CustomTable from "../../Module/Table/Table";
import { useData } from "../../Hook/UseData";
import { useNavigate } from "react-router-dom";

const SocksResource = () => {
    const [pageData, setPageData] = useState({
        socksResource: [],
        loading: true,
        current: 1,
        pageSize: 10,
        totalItems: 0,
    });
    const { measurementData, socksData, createMaterialData } = useData();
    const navigate = useNavigate();

    const getSocksResource = (current, pageSize) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        instance
            .get("api/socks/factory/resources")
            .then((data) => {
                console.log(data);
                setPageData((prev) => ({
                    ...prev,
                    socksResource: data.data?.data?.map((item) => {
                        return {
                            ...item,
                            id: item.socksId,
                        };
                    }),
                    totalItems: data.data?.data?.totalItems,
                }));
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error(
                    "Naski tayyorlashda ishlatiladigan materiallarni yuklashda muammo bo'ldi"
                );
            })
            .finally(() =>
                setPageData((prev) => ({ ...prev, loading: false }))
            );
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
        setPageData((prev) => ({ ...prev, loading: true }));
        console.log(values);
        instance
            .post(
                `api/socks/factory/resources?materialId=${values.materialId}&amount=${values.amount}&measurementId=${values.measurementId}&socksId=${values.socksId}`
            )
            .then(function (response) {
                message.success(
                    "Naski tayyorlashda ishlatiladigan material muvaffaqiyatli qo'shildi"
                );
                getSocksResource(pageData.current - 1, pageData.pageSize);
            })
            .catch(function (error) {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error(
                    "Naski tayyorlashda ishlatiladigan materialni qo'shishda muammo bo'ldi"
                );
            })
            .finally(() => {
                setPageData((prev) => ({ ...prev, loading: false }));
            });
    };

    const onEdit = (values, initial) => {
        setPageData((prev) => ({ ...prev, loading: true }));
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
                getSocksResource(pageData.current - 1, pageData.pageSize);
            })
            .catch(function (error) {
                console.error("Error in edit: ", error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error(
                    "Naski tayyorlashda ishlatiladigan materialni taxrirlashda muammo bo'ldi"
                );
            })
            .finally(() => {
                setPageData((prev) => ({ ...prev, loading: false }));
            });
    };

    const handleDelete = (arr) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        arr.map((item) => {
            instance
                .delete(
                    `api/socks/factory/api/socks/factory/material/delete${item}`
                )
                .then((data) => {
                    getSocksResource(pageData.current - 1, pageData.pageSize);
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
                .finally(() =>
                    setPageData((prev) => ({ ...prev, loading: false }))
                );
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
                pageSizeOptions={[10, 20]}
                tableData={pageData.socksResource}
                totalItems={pageData.totalItems}
                current={pageData.current}
                pageSize={pageData.pageSize}
                setCurrent={(newProp) =>
                    setPageData((prev) => ({ ...prev, current: newProp }))
                }
                setPageSize={(newProp) =>
                    setPageData((prev) => ({ ...prev, pageSize: newProp }))
                }
                loading={pageData.loading}
                setLoading={(newProp) =>
                    setPageData((prev) => ({ ...prev, loading: newProp }))
                }
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
