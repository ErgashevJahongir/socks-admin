import { useState } from "react";
import instance from "../Api/Axios";
import { message } from "antd";
import CustomTable from "../Module/Table/Table";
import { useData } from "../Hook/UseData";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const OutcomeMaterial = () => {
    const [incomeDryFruits, setIncomeDryFruits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const { measurementData, getMaterialData, socksData, createMaterialData } =
        useData();
    const navigate = useNavigate();

    const getIncomeDryFruits = (current, pageSize) => {
        setLoading(true);
        instance
            .get(
                `api/socks/factory/outcomeMaterial/pageable?page=${current}&size=${pageSize}`
            )
            .then((data) => {
                getMaterialData();
                setIncomeDryFruits(
                    data.data?.data?.outcomeMaterials.map((item) => {
                        return {
                            ...item,
                            date: moment(item?.date).format("DD-MM-YYYY"),
                            materialId: item.resources[0].materialId,
                            materialAmount: item.resources[0].amount,
                        };
                    })
                );
                setTotalItems(data.data?.data?.totalItems);
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error(
                    "Ishlatilgan materiallarni yuklashda muammo bo'ldi"
                );
            })
            .finally(() => setLoading(false));
    };

    const columns = [
        {
            title: "Material nomi",
            dataIndex: "materialId",
            key: "materialId",
            width: "20%",
            search: false,
            render: (record) => {
                const data = createMaterialData?.filter(
                    (item) => item.id === record
                );
                return data[0]?.name;
            },
            sorter: (a, b) => {
                if (a.materialId < b.materialId) {
                    return -1;
                }
                if (a.materialId > b.materialId) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Miqdori",
            dataIndex: "materialAmount",
            key: "materialAmount",
            width: "15%",
            sorter: (a, b) => {
                if (a.materialAmount < b.materialAmount) {
                    return -1;
                }
                if (a.materialAmount > b.materialAmount) {
                    return 1;
                }
                return 0;
            },
            search: false,
        },
        {
            title: "Naski nomi",
            dataIndex: "socksId",
            key: "socksId",
            width: "20%",
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
            width: "15%",
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
            width: "15%",
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
            width: "15%",
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
        setLoading(true);
        const value = {
            resources: [
                {
                    materialId: values.materialId,
                    amount: values.materialAmount,
                },
            ],
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
                getIncomeDryFruits(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error(
                    "Ishlatilgan materialni qo'shishda muammo bo'ldi"
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
                `api/socks/factory/api/socks/factory/material/update${initial.id}`,
                { ...values }
            )
            .then((res) => {
                message.success(
                    "Ishlatilgan material muvaffaqiyatli taxrirlandi"
                );
                getIncomeDryFruits(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error("Error in edit: ", error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error(
                    "Ishlatilgan materialni taxrirlashda muammo bo'ldi"
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
                    getIncomeDryFruits(current - 1, pageSize);
                    message.success(
                        "Ishlatilgan material muvaffaqiyatli o'chirildi"
                    );
                })
                .catch((error) => {
                    console.error(error);
                    if (error.response?.status === 500)
                        navigate("/server-error");
                    message.error(
                        "Ishlatilgan materialni o'chirishda muammo bo'ldi"
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

export default OutcomeMaterial;
