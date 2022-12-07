import { useState } from "react";
import instance from "../Api/Axios";
import { message } from "antd";
import CustomTable from "../Module/Table/Table";
import moment from "moment/moment";
import { useData } from "../Hook/UseData";
import { useNavigate } from "react-router-dom";

const OutDebt = () => {
    const [pageData, setPageData] = useState({
        debts: [],
        loading: true,
        current: 1,
        pageSize: 10,
        totalItems: 0,
    });
    const [socksDataWith, setSocksDataWith] = useState([]);
    const { clientData, socksData } = useData();
    const navigate = useNavigate();

    const getDebts = (current, pageSize) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        instance
            .get(
                `api/socks/factory/debt/pageable?page=${current}&size=${pageSize}`
            )
            .then((data) => {
                let value = data.data?.data?.branches?.map((df) => {
                    const deadline = moment(df.deadline).format("DD-MM-YYYY");
                    const func = (record) => {
                        instance
                            .get(`api/socks/factory/outcome/get?id=${record}`)
                            .then((data) => {
                                setSocksDataWith((prev) => [
                                    ...prev,
                                    {
                                        record: record,
                                        socksId: data.data.data.socksId,
                                    },
                                ]);
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    };
                    func(df?.outcomeSocksId);
                    return {
                        ...df,
                        deadline,
                    };
                });
                setPageData((prev) => ({
                    ...prev,
                    debts: value,
                    totalItems: data.data?.data?.totalItems,
                }));
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Tashqi qarzni yuklashda muammo bo'ldi");
            })
            .finally(() =>
                setPageData((prev) => ({ ...prev, loading: false }))
            );
    };

    const onCreate = (values) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        const deadline = values.deadline.toISOString();
        const value = {
            ...values,
            deadline,
        };
        instance
            .post("api/socks/factory/debt", { ...value })
            .then(function (response) {
                message.success("Tashqi qarz muvaffaqiyatli qo'shildi");
                getDebts(pageData.current - 1, pageData.pageSize);
            })
            .catch(function (error) {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Tashqi qarzni qo'shishda muammo bo'ldi");
            })
            .finally(() => {
                setPageData((prev) => ({ ...prev, loading: false }));
            });
    };

    const onEdit = (values, initial) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        const deadline = moment(values.deadline, "DD-MM-YYYY").toISOString();
        const value = {
            ...values,
            deadline,
            outcomeSocksId: initial.outcomeSocksId,
            id: initial.id,
        };
        instance
            .put("api/socks/factory/debt", { ...value })
            .then(function (response) {
                message.success("Tashqi qarz muvaffaqiyatli taxrirlandi");
                getDebts(pageData.current - 1, pageData.pageSize);
            })
            .catch(function (error) {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Tashqi qarzni taxrirlashda muammo bo'ldi");
            })
            .finally(() => {
                setPageData((prev) => ({ ...prev, loading: false }));
            });
    };

    const handleDelete = (arr) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        arr.map((item) => {
            instance
                .delete(`api/socks/factory/debt/${item}`)
                .then((data) => {
                    message.success("Tashqi qarz muvaffaqiyatli o'chirildi");
                    getDebts(pageData.current - 1, pageData.pageSize);
                })
                .catch((error) => {
                    console.error(error);
                    if (error.response?.status === 500)
                        navigate("/server-error");
                    message.error("Tashqi qarzni o'chirishda muammo bo'ldi");
                })
                .finally(() =>
                    setPageData((prev) => ({ ...prev, loading: false }))
                );
            return null;
        });
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
            title: "Sotilgan mahsulot",
            dataIndex: "outcomeSocksId",
            key: "outcomeSocksId",
            width: "25%",
            search: false,
            render: (record) => {
                const socks = socksDataWith.filter(
                    (data) => data.record === record
                );
                const socksName = socksData.filter(
                    (item) => item.id === socks[0]?.socksId
                );
                return socksName[0]?.name || "Topilmadi";
            },
            sorter: (a, b) => {
                if (a.outcomeSocksId < b.outcomeSocksId) {
                    return -1;
                }
                if (a.outcomeSocksId > b.outcomeSocksId) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Sotilish narxi",
            dataIndex: "price",
            key: "price",
            width: "25%",
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
            title: "Topshirish muddati",
            dataIndex: "deadline",
            key: "deadline",
            width: "25%",
            search: false,
            sorter: (a, b) => {
                if (a.deadline < b.deadline) {
                    return -1;
                }
                if (a.deadline > b.deadline) {
                    return 1;
                }
                return 0;
            },
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
                pageSizeOptions={[10, 20]}
                tableData={pageData.materials}
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

export default OutDebt;
