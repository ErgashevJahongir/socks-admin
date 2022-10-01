import { useState } from "react";
import instance from "../Api/Axios";
import { message } from "antd";
import CustomTable from "../Module/Table/Table";
import moment from "moment/moment";
import { useData } from "../Hook/UseData";

const OutDebt = () => {
    const [debts, setDebts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const { clientData, otcomeSocksData } = useData();

    const getDebts = (current, pageSize) => {
        setLoading(true);
        instance
            .get(
                `api/socks/factory/debt/pageable?page=${current}&size=${pageSize}`
            )
            .then((data) => {
                let value = data.data.data.branches?.map((df) => {
                    const deadline = moment(df.deadline).format("DD-MM-YYYY");
                    return {
                        ...df,
                        deadline,
                    };
                });
                setDebts(value);
                setTotalItems(data.data.data.totalItems);
            })
            .catch((error) => {
                console.error(error);
                message.error("Tashqi qarzni yuklashda muammo bo'ldi");
            })
            .finally(() => setLoading(false));
    };

    const onCreate = (values) => {
        setLoading(true);
        const deadline = values.deadline.toISOString();
        const value = {
            ...values,
            deadline,
        };
        instance
            .post("api/socks/factory/debt", { ...value })
            .then(function (response) {
                message.success("Tashqi qarz muvaffaqiyatli qo'shildi");
                getDebts(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error(error);
                message.error("Tashqi qarzni qo'shishda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onEdit = (values, initial) => {
        setLoading(true);
        const deadline = moment(values.deadline, "DD-MM-YYYY").toISOString();
        const value = {
            ...values,
            deadline,
            id: initial.id,
        };
        instance
            .put("api/socks/factory/debt", { ...value })
            .then(function (response) {
                message.success("Tashqi qarz muvaffaqiyatli taxrirlandi");
                getDebts(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error(error);
                message.error("Tashqi qarzni taxrirlashda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDelete = (arr) => {
        setLoading(true);
        arr.map((item) => {
            instance
                .delete(`api/socks/factory/debt/${item}`)
                .then((data) => {
                    message.success("Tashqi qarz muvaffaqiyatli o'chirildi");
                    getDebts(current - 1, pageSize);
                })
                .catch((error) => {
                    console.error(error);
                    message.error("Tashqi qarzni o'chirishda muammo bo'ldi");
                });
            return null;
        });
        setLoading(false);
    };

    const columns = [
        {
            title: "Klient ismi",
            dataIndex: "clientId",
            key: "clientId",
            width: "25%",
            search: false,
            render: (record) => {
                const data = clientData?.filter((item) => item.id === record);
                return data[0]?.fio;
            },
        },
        {
            title: "Sotilgan mahsulot",
            dataIndex: "outcomeSocksId",
            key: "outcomeSocksId",
            width: "25%",
            search: false,
            render: (record) => {
                const data = otcomeSocksData?.filter((item) => item.id === record);
                return data[0]?.socksId;
            },
        },
        {
            title: "Sotilish narxi",
            dataIndex: "price",
            key: "price",
            width: "25%",
            search: false,
        },
        {
            title: "Topshirish muddati",
            dataIndex: "deadline",
            key: "deadline",
            width: "25%",
            search: false,
        },
    ];

    return (
        <>
            <CustomTable
                onEdit={onEdit}
                onCreate={onCreate}
                getData={getDebts}
                onDelete={handleDelete}
                columns={columns}
                tableData={debts}
                current={current}
                pageSize={pageSize}
                totalItems={totalItems}
                loading={loading}
                setLoading={setLoading}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                pageSizeOptions={[10, 20]}
            />
        </>
    );
};

export default OutDebt;
