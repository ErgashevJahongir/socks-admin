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
    const { supplier, usersData } = useData();

    const getDebts = (current, pageSize) => {
        setLoading(true);
        instance
            .get(
                `api/dry/fruit/debt/get-outcome?page=${current}&size=${pageSize}`
            )
            .then((data) => {
                let value = data.data.data.debt?.map((df) => {
                    const givenTime = moment(df.givenTime).format("DD-MM-YYYY");
                    const returnTime = moment(df.returnTime).format(
                        "DD-MM-YYYY"
                    );
                    return {
                        ...df,
                        returnTime: returnTime,
                        givenTime: givenTime,
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
        instance
            .post("api/dry/fruit/debt/post", { ...values, borrower: null })
            .then(function (response) {
                message.success("Tashqi qarz muvofaqiyatli qo'shildi");
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
        const givenTime = moment(values.givenTime, "DD-MM-YYYY").toISOString();
        const returnTime = moment(
            values.returnTime,
            "DD-MM-YYYY"
        ).toISOString();
        instance
            .put(`api/dry/fruit/debt/update${initial.id}`, {
                ...values,
                givenTime: givenTime,
                returnTime: returnTime,
                borrower: null,
            })
            .then(function (response) {
                message.success("Tashqi qarz muvofaqiyatli qo'shildi");
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

    const handleDelete = (arr) => {
        setLoading(true);
        arr.map((item) => {
            instance
                .delete(`api/oil/station/debt/delete${item}`)
                .then((data) => {
                    message.success("Tashqi qarz muvofaqiyatli o'chirildi");
                })
                .catch((error) => {
                    console.error(error);
                    message.error("Tashqi qarzni o'chirishda muammo bo'ldi");
                });
            return null;
        });
        getDebts(current - 1, pageSize);
        setLoading(false);
    };

    const columns = [
        {
            title: "Qarz miqdori",
            dataIndex: "amount",
            key: "amount",
            width: "10%",
            search: false,
        },
        {
            title: "Qarz oluvchi odam",
            dataIndex: "lenderOrBorrowerId",
            key: "lenderOrBorrowerId",
            width: "20%",
            search: false,
            render: (record) => {
                const name = usersData?.filter((item) => item.id === record);
                return name[0]?.fio;
            },
        },
        {
            title: "Qarz beruvchi",
            dataIndex: "lenderId",
            key: "lenderId",
            width: "20%",
            search: false,
            render: (record) => {
                const suppl = supplier.filter((item) => item.id === record);
                return suppl[0]?.name;
            },
        },
        {
            title: "Berilgan vaqt",
            dataIndex: "givenTime",
            key: "givenTime",
            width: "20%",
            search: false,
        },
        {
            title: "Qarz qaytarilish vaqti",
            dataIndex: "returnTime",
            key: "returnTime",
            width: "20%",
            search: false,
        },
        {
            title: "To'liq uzilganmi",
            dataIndex: "given",
            key: "given",
            width: "10%",
            search: false,
            sorter: (a, b) => {
                if (a.given < b.given) {
                    return -1;
                }
                if (a.given > b.given) {
                    return 1;
                }
                return 0;
            },
            render: (record) => {
                return record ? "Ha" : "Yo'q";
            },
        },
    ];

    return (
        <>
            <h3>Tashqi qarzlar</h3>
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
