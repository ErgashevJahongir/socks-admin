import { useState } from "react";
import instance from "../Api/Axios";
import moment from "moment";
import { message } from "antd";
import CustomTable from "../Module/Table/Table";
import { useNavigate } from "react-router-dom";
import { useData } from "../Hook/UseData";

const IncomeSocks = () => {
    const [pageData, setPageData] = useState({
        incomeMaterials: [],
        loading: true,
        current: 1,
        pageSize: 10,
        totalItems: 0,
    });
    const { measurementData, createMaterialData } = useData();
    const navigate = useNavigate();

    const getIncomeMaterials = (current, pageSize) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        instance
            .get(
                `api/socks/factory/incomeMaterial/getAllPageable?page=${current}&size=${pageSize}`
            )
            .then((data) => {
                const fuel = data.data?.data?.dryFruit.map((item) => {
                    return {
                        ...item,
                        date: moment(item.date).format("DD-MM-YYYY"),
                    };
                });
                setPageData((prev) => ({
                    ...prev,
                    incomeMaterials: fuel,
                    totalItems: data.data?.data?.totalItems,
                }));
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Kelgan materiallarni yuklashda muammo bo'ldi");
            })
            .finally(() =>
                setPageData((prev) => ({ ...prev, loading: false }))
            );
    };

    const getOutcomeFruitTimely = (value, current, pageSize) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        instance
            .get(
                `api/socks/factory/incomeMaterial/getAllPageable/${value}?page=${current}&size=${pageSize}`
            )
            .then((data) => {
                const fuel = data.data?.data?.dryFruit.map((item) => {
                    return {
                        ...item,
                        date: moment(item.date).format("DD-MM-YYYY"),
                    };
                });
                setPageData((prev) => ({
                    ...prev,
                    incomeMaterials: fuel,
                    totalItems: data.data?.data?.totalItems,
                }));
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Kelgan materiallarni yuklashda muammo bo'ldi");
            })
            .finally(() =>
                setPageData((prev) => ({ ...prev, loading: false }))
            );
    };

    const dateFilter = (date, current, pageSize) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        instance
            .get(
                `api/socks/factory/incomeMaterial/getAllPageable/dates?page=${current}&size=${pageSize}&startDate=${moment(
                    date[0]
                ).format("YYYY-MM-DD HH:MM:SS")}&endDate=${moment(
                    date[1]
                ).format("YYYY-MM-DD HH:MM:SS")}`
            )
            .then((data) => {
                const fuel = data.data?.data?.dryFruit.map((item) => {
                    return {
                        ...item,
                        date: moment(item.date).format("DD-MM-YYYY"),
                    };
                });
                setPageData((prev) => ({
                    ...prev,
                    incomeMaterials: fuel,
                    totalItems: data.data?.data?.totalItems,
                }));
            })
            .catch((err) => {
                console.error(err);
                message.error("Kelgan materiallarni yuklashda muammo bo'ldi");
            })
            .finally(() =>
                setPageData((prev) => ({ ...prev, loading: false }))
            );
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
            title: "O'lchovi",
            dataIndex: "measurementId",
            key: "measurementId",
            width: "20%",
            render: (record) => {
                const data = measurementData.filter(
                    (item) => item.id === record
                );
                return data[0]?.name;
            },
            search: false,
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
            title: "Kelgan narxi",
            dataIndex: "price",
            key: "price",
            width: "20%",
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
            title: "Kelgan vaqti",
            dataIndex: "date",
            key: "date",
            width: "20%",
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
    ];

    const onCreate = (values) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        const value = {
            ...values,
            date: values.date.toISOString(),
        };
        instance
            .post("api/socks/factory/incomeMaterial/add", { ...value })
            .then(function (response) {
                message.success("Kelgan material muvaffaqiyatli qo'shildi");
                getIncomeMaterials(pageData.current - 1, pageData.pageSize);
            })
            .catch(function (error) {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Kelgan materialni qo'shishda muammo bo'ldi");
            })
            .finally(() => {
                setPageData((prev) => ({ ...prev, loading: false }));
            });
    };

    const onEdit = (values, initial) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        const time = moment(values.date, "DD-MM-YYYY").toISOString();
        const data = {
            ...values,
            date: time,
        };
        instance
            .put(`api/socks/factory/incomeMaterial/update${initial.id}`, {
                ...data,
            })
            .then((res) => {
                message.success("Kelgan material muvaffaqiyatli taxrirlandi");
                getIncomeMaterials(pageData.current - 1, pageData.pageSize);
            })
            .catch(function (error) {
                console.error("Error in edit: ", error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Kelgan materialni taxrirlashda muammo bo'ldi");
            })
            .finally(() => {
                setPageData((prev) => ({ ...prev, loading: false }));
            });
    };

    const handleDelete = (arr) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        arr.map((item) => {
            instance
                .delete(`api/socks/factory/incomeMaterial/delete${item}`)
                .then((data) => {
                    getIncomeMaterials(pageData.current - 1, pageData.pageSize);
                    message.success(
                        "Kelgan material muvaffaqiyatli o'chirildi"
                    );
                })
                .catch((error) => {
                    console.error(error);
                    if (error.response?.status === 500)
                        navigate("/server-error");
                    message.error(
                        "Kelgan materialni o'chirishda muammo bo'ldi"
                    );
                })
                .finally(() =>
                    setPageData((prev) => ({ ...prev, loading: false }))
                );
            return null;
        });
    };

    const timelySelect = [
        { title: "Kunlik", value: "daily" },
        { title: "Haftalik", value: "weekly" },
        { title: "Oylik", value: "monthly" },
        { title: "Yillik", value: "yearly" },
    ];

    return (
        <>
            <CustomTable
                onEdit={onEdit}
                onCreate={onCreate}
                onDelete={handleDelete}
                getData={getIncomeMaterials}
                getDataTimely={getOutcomeFruitTimely}
                dateFilter={dateFilter}
                columns={columns}
                timelySelect={timelySelect}
                pageSizeOptions={[10, 20]}
                tableData={pageData.incomeMaterials}
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

export default IncomeSocks;
