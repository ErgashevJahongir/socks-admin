import { useState } from "react";
import instance from "../Api/Axios";
import moment from "moment";
import { Button, message, notification } from "antd";
import CustomTable from "../Module/Table/Table";
import { useNavigate } from "react-router-dom";
import { useData } from "../Hook/UseData";
import { FrownOutlined } from "@ant-design/icons";

const OutcomeSocks = () => {
    const [outcomeFuel, setOutcomeFuel] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const { socksData, clientData } = useData();
    const navigate = useNavigate();

    const getOutcomeDryFruits = (current, pageSize) => {
        setLoading(true);
        instance
            .get(
                `api/socks/factory/outcome/pageable?page=${current}&size=${pageSize}`
            )
            .then((data) => {
                const fuel = data.data.data.outcomeSocks.map((item) => {
                    return {
                        ...item,
                        date: moment(item.date).format("DD-MM-YYYY"),
                    };
                });
                setOutcomeFuel(fuel);
                setTotalItems(data.data.data.totalItems);
            })
            .catch((error) => {
                console.error(error);
                if (error.response.status === 500) navigate("/server-error");
                message.error("Sotilgan naskilarni yuklashda muammo bo'ldi");
            })
            .finally(() => setLoading(false));
    };

    const getOutcomeFruitTimely = (value, current, pageSize) => {
        instance
            .get(
                `api/socks/factory/outcome/${value}?page=${current}&size=${pageSize}`
            )
            .then((data) => {
                const fuel = data.data.data.outcomeSocks.map((item) => {
                    return {
                        ...item,
                        date: moment(item.date).format("DD-MM-YYYY"),
                    };
                });
                setOutcomeFuel(fuel);
                setTotalItems(data.data.data.totalItems);
            })
            .catch((error) => {
                console.error(error);
                if (error.response.status === 500) navigate("/server-error");
                message.error("Kelgan naskilarni yuklashda muammo bo'ldi");
            })
            .finally(() => setLoading(false));
    };

    const dateFilter = (date, current, pageSize) => {
        setLoading(true);
        instance
            .get(
                `api/socks/factory/outcome/between?page=${current}&size=${pageSize}&startDate=${date[0]}&endDate=${date[1]}`
            )
            .then((data) => {
                const fuel = data.data.data.outcomeSocks.map((item) => {
                    return {
                        ...item,
                        date: moment(item.date).format("DD-MM-YYYY"),
                    };
                });
                setOutcomeFuel(fuel);
                setTotalItems(data.data.data.totalItems);
            })
            .catch((err) => {
                console.error(err);
                message.error("Kelgan naskilarni yuklashda muammo bo'ldi");
            })
            .finally(() => setLoading(false));
    };

    const columns = [
        // {
        //     title: "Naski turi",
        //     dataIndex: "socksId",
        //     key: "socksId",
        //     width: "15%",
        //     search: false,
        //     render: (record) => {
        //         const data = socksData?.filter((item) => item.id === record);
        //         return data[0]?.name;
        //     },
        // },
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
            debt: values.debt?.target?.value === "false" ? false : true,
        };
        instance
            .put(`api/socks/factory/outcome?id=${initial.id}`, {
                ...data,
            })
            .then((res) => {
                message.success("Sotilgan naski muvaffaqiyatli taxrirlandi");
                getOutcomeDryFruits(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error("Error in edit: ", error);
                if (error.response.status === 500) navigate("/server-error");
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
                setLoading(false);
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
            <CustomTable
                onEdit={onEdit}
                onCreate={onCreate}
                getData={getOutcomeDryFruits}
                columns={columns}
                tableData={outcomeFuel}
                current={current}
                pageSize={pageSize}
                totalItems={totalItems}
                loading={loading}
                getDataTimely={getOutcomeFruitTimely}
                setLoading={setLoading}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                pageSizeOptions={[10, 20]}
                timelySelect={timelySelect}
                dateFilter={dateFilter}
            />
        </>
    );
};

export default OutcomeSocks;
