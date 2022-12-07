import { useState } from "react";
import instance from "../Api/Axios";
import { message } from "antd";
import CustomTable from "../Module/Table/Table";
import { useData } from "../Hook/UseData";
import { useNavigate } from "react-router-dom";

const Material = () => {
    const [pageData, setPageData] = useState({
        materials: [],
        loading: true,
        current: 1,
        pageSize: 10,
        totalItems: 0,
    });
    const { measurementData, getMaterialData } = useData();
    const navigate = useNavigate();

    const getMaterials = (current, pageSize) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        instance
            .get(
                `api/socks/factory/api/socks/factory/material/getAllPageable?page=${current}&size=${pageSize}`
            )
            .then((data) => {
                getMaterialData();
                setPageData((prev) => ({
                    ...prev,
                    materials: data.data?.data?.materials,
                    totalItems: data.data?.data?.totalItems,
                }));
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Materiallarni yuklashda muammo bo'ldi");
            })
            .finally(() =>
                setPageData((prev) => ({ ...prev, loading: false }))
            );
    };

    const columns = [
        {
            title: "Material nomi",
            dataIndex: "name",
            key: "name",
            width: "33%",
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
            title: "O'lchov birligi",
            dataIndex: "measurementId",
            key: "measurementId",
            width: "33%",
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
            width: "33%",
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
        setPageData((prev) => ({ ...prev, loading: true }));
        instance
            .post("api/socks/factory/api/socks/factory/material/add", {
                ...values,
                amount: 0,
            })
            .then(function (response) {
                message.success("Material muvaffaqiyatli qo'shildi");
                getMaterials(pageData.current - 1, pageData.pageSize);
            })
            .catch(function (error) {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Materialni qo'shishda muammo bo'ldi");
            })
            .finally(() => {
                setPageData((prev) => ({ ...prev, loading: false }));
            });
    };

    const onEdit = (values, initial) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        instance
            .put(
                `api/socks/factory/api/socks/factory/material/update${initial.id}`,
                { ...values }
            )
            .then((res) => {
                message.success("Material muvaffaqiyatli taxrirlandi");
                getMaterials(pageData.current - 1, pageData.pageSize);
            })
            .catch(function (error) {
                console.error("Error in edit: ", error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Materialni taxrirlashda muammo bo'ldi");
            })
            .finally(() => {
                setPageData((prev) => ({ ...prev, loading: false }));
            });
    };

    const handleDelete = (arr) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        arr.map((item) => {
            instance
                .delete(
                    `api/socks/factory/api/socks/factory/material/delete${item}`
                )
                .then((data) => {
                    getMaterials(pageData.current - 1, pageData.pageSize);
                    message.success("Material muvaffaqiyatli o'chirildi");
                })
                .catch((error) => {
                    console.error(error);
                    if (error.response?.status === 500)
                        navigate("/server-error");
                    message.error("Materialni o'chirishda muammo bo'ldi");
                })
                .finally(() =>
                    setPageData((prev) => ({ ...prev, loading: false }))
                );
            return null;
        });
    };

    return (
        <>
            <CustomTable
                onEdit={onEdit}
                onCreate={onCreate}
                onDelete={handleDelete}
                getData={getMaterials}
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

export default Material;
