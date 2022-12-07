import { useState } from "react";
import instance from "../Api/Axios";
import moment from "moment";
import { Button, Card, Col, message, notification, Row, Statistic } from "antd";
import CustomTable from "../Module/Table/Table";
import { useNavigate } from "react-router-dom";
import { useData } from "../Hook/UseData";
import { ArrowUpOutlined, FrownOutlined } from "@ant-design/icons";

const OutcomeSocks = () => {
    const [pageData, setPageData] = useState({
        outcomeSocks: [],
        loading: true,
        current: 1,
        pageSize: 10,
        totalItems: 0,
    });
    const [totalsum, setTotalsum] = useState();
    const {
        socksData,
        clientData,
        measurementData,
        qarzValue,
        deadlineValue,
        setQarzValue,
        setValueDebt,
        setDeadlineValue,
    } = useData();
    const navigate = useNavigate();

    const getOutcomeSocks = (current, pageSize) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        instance
            .get(
                `api/socks/factory/outcome/pageable?page=${current}&size=${pageSize}`
            )
            .then((data) => {
                const fuel =
                    data.data?.data?.outcomeSocks.outcomeSocksGetDTOList?.map(
                        (item) => {
                            return {
                                ...item,
                                date: moment(item?.date).format("DD-MM-YYYY"),
                            };
                        }
                    );
                setTotalsum({
                    totalSumma: data.data?.data?.outcomeSocks?.totalSumma,
                });
                setPageData((prev) => ({
                    ...prev,
                    outcomeSocks: fuel,
                    totalItems: data.data?.data?.totalItems,
                }));
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Sotilgan naskilarni yuklashda muammo bo'ldi");
            })
            .finally(() =>
                setPageData((prev) => ({ ...prev, loading: false }))
            );
    };

    const getOutcomeFruitTimely = (value, current, pageSize) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        instance
            .get(
                `api/socks/factory/outcome/${value}?page=${current}&size=${pageSize}`
            )
            .then((data) => {
                const fuel =
                    data.data?.data?.outcomeSocks.outcomeSocksGetDTOList?.map(
                        (item) => {
                            return {
                                ...item,
                                date: moment(item?.date).format("DD-MM-YYYY"),
                            };
                        }
                    );
                setTotalsum({
                    totalSumma: data.data?.data?.outcomeSocks?.totalSumma,
                });
                setPageData((prev) => ({
                    ...prev,
                    outcomeSocks: fuel,
                    totalItems: data.data?.data?.totalItems,
                }));
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Sotilgan naskilarni yuklashda muammo bo'ldi");
            })
            .finally(() =>
                setPageData((prev) => ({ ...prev, loading: false }))
            );
    };

    const dateFilter = (date, current, pageSize) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        instance
            .get(
                `api/socks/factory/outcome/between?page=${current}&size=${pageSize}&startDate=${moment(
                    date[0]
                ).format("YYYY-MM-DD HH:MM:SS")}&endDate=${moment(
                    date[1]
                ).format("YYYY-MM-DD HH:MM:SS")}`
            )
            .then((data) => {
                const fuel =
                    data.data?.data?.outcomeSocks.outcomeSocksGetDTOList?.map(
                        (item) => {
                            return {
                                ...item,
                                date: moment(item?.date).format("DD-MM-YYYY"),
                            };
                        }
                    );
                setTotalsum({
                    totalSumma: data.data?.data?.outcomeSocks?.totalSumma,
                });
                setPageData((prev) => ({
                    ...prev,
                    outcomeSocks: fuel,
                    totalItems: data.data?.data?.totalItems,
                }));
            })
            .catch((err) => {
                console.error(err);
                message.error("Sotilgan naskilarni yuklashda muammo bo'ldi");
            })
            .finally(() =>
                setPageData((prev) => ({ ...prev, loading: false }))
            );
    };

    const columns = [
        {
            title: "Klient ismi",
            dataIndex: "clientId",
            key: "clientId",
            width: "20%",
            search: false,
            render: (record) => {
                const data = clientData?.filter((item) => item.id === record);
                return data[0]?.fio;
            },
            sorter: (a, b) => {
                if (a.clientId < b.clientId) {
                    return -1;
                }
                if (a.clientId > b.clientId) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Naski turi",
            dataIndex: "socksId",
            key: "socksId",
            width: "15%",
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
            title: "O'lchovi",
            dataIndex: "measurementId",
            key: "measurementId",
            width: "15%",
            search: false,
            render: (record) => {
                const data = measurementData?.filter(
                    (item) => item.id === record
                );
                return data[0]?.name;
            },
            sorter: (a, b) => {
                if (a.measurementId < b.measurementId) {
                    return -1;
                }
                if (a.measurementId > b.measurementId) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Miqdori",
            dataIndex: "amount",
            key: "amount",
            width: "10%",
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
            title: "Sotilish narxi",
            dataIndex: "price",
            key: "price",
            width: "15%",
            search: false,
            sorter: (a, b) => {
                if (a.price < b.price) {
                    return -1;
                }
                if (a.price > b.price) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Sotilish vaqti",
            dataIndex: "date",
            key: "date",
            width: "15%",
            search: false,
            sorter: (a, b) => {
                if (a.date < b.date) {
                    return -1;
                }
                if (a.date > b.date) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Qarzdorlik",
            dataIndex: "debt",
            key: "debt",
            width: "10%",
            search: false,
            render: (record) => {
                return record ? "Bor" : "Yo'q";
            },
            sorter: (a, b) => {
                if (a.debt < b.debt) {
                    return -1;
                }
                if (a.debt > b.debt) {
                    return 1;
                }
                return 0;
            },
        },
    ];

    const onCreate = (values) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        const data = {
            ...values,
            date: values.date.toISOString(),
            debt: values.debt === "true" ? true : false,
        };
        instance
            .post("api/socks/factory/outcome", { ...data })
            .then(function (response) {
                const deadline = deadlineValue;
                const value = {
                    clientId: values.clientId,
                    price: values.price * values.amount - qarzValue,
                    outcomeSocksId: response.data.data,
                    deadline,
                };
                values.debt === "true" &&
                    instance
                        .post("api/socks/factory/debt", { ...value })
                        .then(function (response) {
                            message.success(
                                "Tashqi qarz muvaffaqiyatli qo'shildi"
                            );
                        })
                        .catch(function (error) {
                            console.error(error);
                            if (error.response?.status === 500)
                                navigate("/server-error");
                            message.error(
                                "Tashqi qarzni qo'shishda muammo bo'ldi"
                            );
                        })
                        .finally(() => {
                            setPageData((prev) => ({
                                ...prev,
                                loading: false,
                            }));
                        });
                getOutcomeSocks(pageData.current - 1, pageData.pageSize);
                message.success("Sotilgan naski muvaffaqiyatli qo'shildi");
            })
            .catch(function (error) {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Sotilgan naskini qo'shishda muammo bo'ldi");
            })
            .finally(() => {
                setPageData((prev) => ({ ...prev, loading: false }));
                setQarzValue(null);
                setValueDebt(null);
                setDeadlineValue(null);
            });
    };

    const onEdit = (values, initial) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        const time = moment(values.date, "DD-MM-YYYY").toISOString();
        const data = {
            ...values,
            date: time,
            debt: values.debt === "false" ? false : true,
        };
        instance
            .put(`api/socks/factory/outcome?id=${initial.id}`, {
                ...data,
            })
            .then((res) => {
                const deadline = deadlineValue;
                const value = {
                    clientId: values.clientId,
                    price: values.price * values.amount - qarzValue,
                    outcomeSocksId: res.data.data,
                    deadline,
                };
                values.debt === "true" &&
                    initial.debt === false &&
                    instance
                        .post("api/socks/factory/debt", { ...value })
                        .then(function (response) {
                            message.success(
                                "Tashqi qarz muvaffaqiyatli qo'shildi"
                            );
                        })
                        .catch(function (error) {
                            console.error(error);
                            if (error.response?.status === 500)
                                navigate("/server-error");
                            message.error(
                                "Tashqi qarzni qo'shishda muammo bo'ldi"
                            );
                        })
                        .finally(() => {
                            setPageData((prev) => ({
                                ...prev,
                                loading: false,
                            }));
                        });
                message.success("Sotilgan naski muvaffaqiyatli taxrirlandi");
                getOutcomeSocks(pageData.current - 1, pageData.pageSize);
            })
            .catch(function (error) {
                console.error("Error in edit: ", error);
                if (error.response?.status === 500) navigate("/server-error");
                const btn = (
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => navigate("/socks")}
                    >
                        Narxlarni ko'rish
                    </Button>
                );
                if (error.response?.status === 420)
                    notification["error"]({
                        message: "Mahsulot sotishda xatolik",
                        description: `Mahsulotni o'z narxidan arzonga sotmoqchisiz.`,
                        duration: 5,
                        btn,
                        icon: <FrownOutlined style={{ color: "#f00" }} />,
                    });
                message.error("Sotilgan naskini taxrirlashda muammo bo'ldi");
            })
            .finally(() => {
                setPageData((prev) => ({ ...prev, loading: false }));
                setQarzValue(null);
                setValueDebt(null);
                setDeadlineValue(null);
            });
    };

    const timelySelect = [
        { title: "Kunlik", value: "daily" },
        { title: "Haftalik", value: "weekly" },
        { title: "Oylik", value: "monthly" },
        { title: "Yillik", value: "annually" },
    ];

    return (
        <>
            {totalsum ? (
                <div
                    style={{ marginBottom: "20px" }}
                    className="site-statistic-demo-card"
                >
                    <Row gutter={[10, 10]}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Card>
                                <Statistic
                                    title="Jami sarflangan summa"
                                    value={totalsum?.totalSumma}
                                    valueStyle={{
                                        color: "#3f8600",
                                    }}
                                    prefix={<ArrowUpOutlined />}
                                    suffix="So'm"
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
            ) : null}
            <CustomTable
                onEdit={onEdit}
                onCreate={onCreate}
                getData={getOutcomeSocks}
                getDataTimely={getOutcomeFruitTimely}
                columns={columns}
                pageSizeOptions={[10, 20]}
                timelySelect={timelySelect}
                dateFilter={dateFilter}
                tableData={pageData.outcomeSocks}
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
            />
        </>
    );
};

export default OutcomeSocks;
