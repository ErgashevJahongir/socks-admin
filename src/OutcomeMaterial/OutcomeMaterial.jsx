import { Fragment, useState } from "react";
import instance from "../Api/Axios";
import { Col, message, Row } from "antd";
import CustomTable from "../Module/Table/Table";
import { useData } from "../Hook/UseData";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const OutcomeMaterial = () => {
    const [pageData, setPageData] = useState({
        outcomeMaterials: [],
        loading: true,
        current: 1,
        pageSize: 10,
        totalItems: 0,
    });
    const { measurementData, getMaterialData, socksData, createMaterialData } =
        useData();
    const navigate = useNavigate();

    const getOutcomeMaterials = (current, pageSize) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        instance
            .get(
                `api/socks/factory/outcomeMaterial/pageable?page=${current}&size=${pageSize}`
            )
            .then((data) => {
                getMaterialData();
                setPageData((prev) => ({
                    ...prev,
                    outcomeMaterials: data.data?.data?.outcomeMaterials.map(
                        (item) => {
                            return {
                                ...item,
                                date: moment(item?.date).format("DD-MM-YYYY"),
                            };
                        }
                    ),
                    totalItems: data.data?.data?.totalItems,
                }));
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error(
                    "Ishlatilgan materiallarni yuklashda muammo bo'ldi"
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
            width: "30%",
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
        {
            title: "O'lchov birligi",
            dataIndex: "measurementId",
            key: "measurementId",
            width: "25%",
            sorter: (a, b) => {
                if (a.measurementId < b.measurementId) {
                    return -1;
                }
                if (a.measurementId > b.measurementId) {
                    return 1;
                }
                return 0;
            },
            render: (id) => {
                const data = measurementData.filter((item) => item.id === id);
                return data[0]?.name;
            },
            search: false,
        },
        {
            title: "Miqdori",
            dataIndex: "amount",
            key: "amount",
            width: "20%",
            sorter: (a, b) => {
                if (a.amount < b.amount) {
                    return -1;
                }
                if (a.amount > b.amount) {
                    return 1;
                }
                return 0;
            },
            search: false,
        },
        {
            title: "Sana",
            dataIndex: "date",
            key: "date",
            width: "25%",
            sorter: (a, b) => {
                if (a.date < b.date) {
                    return -1;
                }
                if (a.date > b.date) {
                    return 1;
                }
                return 0;
            },
            search: false,
        },
    ];

    const onCreate = (values) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        const value = {
            socksId: values.socksId,
            measurementId: values.measurementId,
            amount: values.amount,
            date: values.date,
        };
        instance
            .post("api/socks/factory/outcomeMaterial", {
                ...value,
            })
            .then(function (response) {
                message.success(
                    "Ishlatilgan material muvaffaqiyatli qo'shildi"
                );
                getOutcomeMaterials(pageData.current - 1, pageData.pageSize);
            })
            .catch(function (error) {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error(
                    "Ishlatilgan materialni qo'shishda muammo bo'ldi"
                );
            })
            .finally(() => {
                setPageData((prev) => ({ ...prev, loading: false }));
            });
    };

    const onEdit = (values, initial) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        const date = moment(values?.date, "DD-MM-YYYY").toISOString();
        instance
            .put("/api/socks/factory/outcomeMaterial", {
                ...values,
                date: date,
                id: initial.id,
            })
            .then((res) => {
                message.success(
                    "Ishlatilgan material muvaffaqiyatli taxrirlandi"
                );
                getOutcomeMaterials(pageData.current - 1, pageData.pageSize);
            })
            .catch(function (error) {
                console.error("Error in edit: ", error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error(
                    "Ishlatilgan materialni taxrirlashda muammo bo'ldi"
                );
            })
            .finally(() => {
                setPageData((prev) => ({ ...prev, loading: false }));
            });
    };

    return (
        <>
            <CustomTable
                onEdit={onEdit}
                onCreate={onCreate}
                getData={getOutcomeMaterials}
                columns={columns}
                pageSizeOptions={[10, 20]}
                tableData={pageData.outcomeMaterials}
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

export default OutcomeMaterial;
