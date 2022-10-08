import { useState } from "react";
import instance from "../Api/Axios";
import { message } from "antd";
import CustomTable from "../Module/Table/Table";
import { useData } from "../Hook/UseData";
import { useNavigate } from "react-router-dom";

const Socks = () => {
    const [incomeDryFruits, setIncomeDryFruits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const { categoryData, getSocksData } = useData();
    const navigate = useNavigate();

    const getIncomeDryFruits = (current, pageSize) => {
        setLoading(true);
        instance
            .get(
                `api/socks/factory/socks/pageable?page=${current}&size=${pageSize}`
            )
            .then((data) => {
                getSocksData();
                setIncomeDryFruits(data.data?.data?.branches);
                setTotalItems(data.data?.data?.totalItems);
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Kelgan naskilarni yuklashda muammo bo'ldi");
            })
            .finally(() => setLoading(false));
    };

    const columns = [
        {
            title: "Naski nomi",
            dataIndex: "name",
            key: "name",
            width: "25%",
            search: true,
            sorter: (a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Naski sorti",
            dataIndex: "categoryId",
            key: "categoryId",
            width: "25%",
            sorter: (a, b) => {
                if (a.categoryId < b.categoryId) {
                    return -1;
                }
                if (a.categoryId > b.categoryId) {
                    return 1;
                }
                return 0;
            },
            render: (id) => {
                const data = categoryData.filter((item) => item.id === id);
                return data[0]?.name;
            },
            search: false,
        },
        {
            title: "Narxi",
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
            title: "Miqdori",
            dataIndex: "amount",
            key: "amount",
            width: "25%",
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
    ];

    const onCreate = (values) => {
        setLoading(true);
        instance
            .post("api/socks/factory/socks/add", { ...values })
            .then(function (response) {
                message.success("Kelgan naski muvaffaqiyatli qo'shildi");
                getIncomeDryFruits(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Kelgan naskini qo'shishda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onEdit = (values, initial) => {
        setLoading(true);
        instance
            .put(`api/socks/factory/socks/update?socksId=${initial.id}`, {
                ...values,
            })
            .then((res) => {
                message.success("Kelgan naski muvaffaqiyatli taxrirlandi");
                getIncomeDryFruits(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error("Error in edit: ", error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Kelgan naskini taxrirlashda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDelete = (arr) => {
        setLoading(true);
        arr.map((item) => {
            instance
                .delete(`api/socks/factory/socks/delete?socksId=${item}`)
                .then((data) => {
                    getIncomeDryFruits(current - 1, pageSize);
                    message.success("Kelgan naski muvaffaqiyatli o'chirildi");
                })
                .catch((error) => {
                    console.error(error);
                    if (error.response?.status === 500)
                        navigate("/server-error");
                    message.error("Kelgan naskini o'chirishda muammo bo'ldi");
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
                getData={getIncomeDryFruits}
                columns={columns}
                tableData={incomeDryFruits}
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

export default Socks;
