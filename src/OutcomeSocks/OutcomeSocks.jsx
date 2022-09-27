import { useState } from "react";
import instance from "../Api/Axios";
import moment from "moment";
import { Card, Col, message, Row, Statistic } from "antd";
import CustomTable from "../Module/Table/Table";
import { useNavigate } from "react-router-dom";
import { useData } from "../Hook/UseData";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

const OutcomeSocks = () => {
    const [outcomeFuel, setOutcomeFuel] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalFruit, setTotalFruit] = useState({});
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const {
        socksData,
        measurementData,
        clientData,
    } = useData();
    const navigate = useNavigate();

    const getOutcomeDryFruits = (current, pageSize) => {
        setLoading(true);
        instance
            .get(
                `api/socks/factory/outcome/pageable?page=${current}&size=${pageSize}`
            )
            .then((data) => {
                // const fuelsData = {
                //     totalSumma: data.data.data.dryFruits.totalSumma,
                //     totalCash: data.data.data.dryFruits.totalCash,
                //     totalPlastic: data.data.data.dryFruits.totalPlastic,
                //     totalDollar: data.data.data.dryFruits.totalDollar,
                // };
                // setTotalFruit(fuelsData);
                const fuel =
                    data.data.data.outcomeSocks.map(
                        (item) => {
                            return {
                                ...item,
                                date: moment(item.date).format("DD-MM-YYYY"),
                            };
                        }
                    );
                setOutcomeFuel(fuel);
                setTotalItems(data.data.data.totalItems);
            })
            .catch((error) => {
                console.error(error);
                if (error.response.status === 500) navigate("/server-error");
                message.error(
                    "Sotilgan naskilarni yuklashda muammo bo'ldi"
                );
            })
            .finally(() => setLoading(false));
    };

    // const getOutcomeFruitTimely = (value, current, pageSize) => {
    //     instance
    //         .get(
    //             `api/socks/factory/outcome/pageable?page=${current}&size=${pageSize}`
    //         )
    //         .then((data) => {
    //             const fuelsData = {
    //                 totalSumma: data.data.data.dryFruits.totalSumma,
    //                 totalCash: data.data.data.dryFruits.totalCash,
    //                 totalPlastic: data.data.data.dryFruits.totalPlastic,
    //                 totalDollar: data.data.data.dryFruits.totalDollar,
    //             };
    //             setTotalFruit(fuelsData);
    //             const fuel =
    //                 data.data.data.dryFruits.outcomeSocks.map(
    //                     (item) => {
    //                         return {
    //                             ...item,
    //                             date: moment(item.date).format("DD-MM-YYYY"),
    //                         };
    //                     }
    //                 );
    //             setOutcomeFuel(fuel);
    //             setTotalItems(data.data.data.totalItems);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //             if (error.response.status === 500) navigate("/server-error");
    //             message.error(
    //                 "Sotilgan quruq mevalarni yuklashda muammo bo'ldi"
    //             );
    //         })
    //         .finally(() => setLoading(false));
    // };

    // const dateFilter = (date, current, pageSize) => {
    //     setLoading(true);
    //     instance
    //         .get(
    //             `api/socks/factory/outcome/pageable/between?page=${current}&size=${pageSize}&startDate=${date[0]}&endDate=${date[1]}`
    //         )
    //         .then((data) => {
    //             const fuelsData = {
    //                 totalSumma: data.data.data.dryFruits.totalSumma,
    //                 totalCash: data.data.data.dryFruits.totalCash,
    //                 totalPlastic: data.data.data.dryFruits.totalPlastic,
    //                 totalDollar: data.data.data.dryFruits.totalDollar,
    //             };
    //             setTotalFruit(fuelsData);
    //             const fuel =
    //                 data.data.data.fuelReports.outcomeDryFruitGetDtoList.map(
    //                     (item) => {
    //                         return {
    //                             ...item,
    //                             date: moment(item.date).format("DD-MM-YYYY"),
    //                         };
    //                     }
    //                 );
    //             setOutcomeFuel(fuel);
    //             setTotalItems(data.data.data.totalItems);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //             message.error("Sotilgan quruq mevalarni yuklashda muammo bo'ldi");
    //         })
    //         .finally(() => setLoading(false));
    // };

    const columns = [
        {
            title: "Naski turi",
            dataIndex: "socksId",
            key: "socksId",
            width: "15%",
            search: false,
        },
        {
            title: "Klient ismi",
            dataIndex: "clientId",
            key: "clientId",
            width: "20%",
            search: false,
        },
        {
            title: "O'lchovi",
            dataIndex: "measurementId",
            key: "measurementId",
            width: "15%",
            search: false,
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
        },
        {
            title: "Sotilish vaqti",
            dataIndex: "date",
            key: "date",
            width: "15%",
            search: false,
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
        },
    ];

    const onCreate = (values) => {
        setLoading(true);
        const value = {
            ...values,
            date: values.date.toISOString(),
            debt: values.debt.target.value,
        };
        console.log(value);
        instance
            .post("api/socks/factory/outcome", { ...value })
            .then(function (response) {
                getOutcomeDryFruits(current - 1, pageSize);
                message.success("Sotilgan naski muvaffaqiyatli qo'shildi");
            })
            .catch(function (error) {
                console.error(error);
                if (error.response.status === 500) navigate("/server-error");
                message.error("Sotilgan naskini qo'shishda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onEdit = (values, initial) => {
        setLoading(true);
        const time = moment(values.date, "DD-MM-YYYY").toISOString();
        const data = {
            ...values,
            date: time,
            debt: values.debt.target.value,
        };
        instance
            .put(`api/socks/factory/outcome?id=${initial.id}`, {
                ...data,
            })
            .then((res) => {
                message.success(
                    "Sotilgan naski muvaffaqiyatli taxrirlandi"
                );
                getOutcomeDryFruits(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error("Error in edit: ", error);
                if (error.response.status === 500) navigate("/server-error");
                message.error(
                    "Sotilgan naskini taxrirlashda muammo bo'ldi"
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
                .delete(`api/socks/factory/outcome?id=${item}`)
                .then((data) => {
                    getOutcomeDryFruits(current - 1, pageSize);
                    message.success(
                        "Sotilgan quruq meva muvaffaqiyatli o'chirildi"
                    );
                })
                .catch((error) => {
                    console.error(error);
                    if (error.response.status === 500)
                        navigate("/server-error");
                    message.error(
                        "Sotilgan quruq mevani o'chirishda muammo bo'ldi"
                    );
                });
            return null;
        });
        setLoading(false);
    };

    // const timelySelect = [
    //     { title: "Kunlik", value: "daily" },
    //     { title: "Haftalik", value: "weekly" },
    //     { title: "Oylik", value: "monthly" },
    //     { title: "Yillik", value: "annually" },
    // ];

    return (
        <>
            {/* <div className="site-statistic-demo-card">
                <Row gutter={16} className="statistic" style={{marginBottom: '20px'}}>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Umumiy summa"
                                value={totalFruit.totalSumma}
                                valueStyle={{
                                    color: "#3f8600",
                                }}
                                prefix={<ArrowUpOutlined />}
                                suffix="so'm"
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Jami naqd summa"
                                value={totalFruit.totalCash}
                                valueStyle={{
                                    color: "#cf1322",
                                }}
                                prefix={<ArrowDownOutlined />}
                                suffix="so'm"
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Jami plastik summa"
                                value={totalFruit.totalPlastic}
                                valueStyle={{
                                    color: "#3f8600",
                                }}
                                prefix={<ArrowUpOutlined />}
                                suffix="so'm"
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Jami dollar"
                                value={totalFruit.totalDollar}
                                valueStyle={{
                                    color: "#3f8600",
                                }}
                                prefix={<ArrowUpOutlined />}
                                suffix="dollar"
                            />
                        </Card>
                    </Col>
                </Row>
            </div> */}
            <CustomTable
                // dateFilter={dateFilter}
                onEdit={onEdit}
                onCreate={onCreate}
                onDelete={handleDelete}
                getData={getOutcomeDryFruits}
                // getDataTimely={getOutcomeFruitTimely}
                columns={columns}
                tableData={outcomeFuel}
                current={current}
                pageSize={pageSize}
                totalItems={totalItems}
                loading={loading}
                setLoading={setLoading}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                pageSizeOptions={[10, 20]}
                // timelySelect={timelySelect}
            />
        </>
    );
};

export default OutcomeSocks;
