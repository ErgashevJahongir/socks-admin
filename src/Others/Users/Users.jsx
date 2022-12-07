import { useState } from "react";
import instance from "../../Api/Axios";
import { message, notification } from "antd";
import CustomTable from "../../Module/Table/Table";
import { useData } from "../../Hook/UseData";
import { FrownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Users = () => {
    const [pageData, setPageData] = useState({
        users: [],
        loading: true,
        current: 1,
        pageSize: 10,
        totalItems: 0,
    });
    const { roleData, getUsersData } = useData();
    const navigate = useNavigate();

    const getUsers = () => {
        setPageData((prev) => ({ ...prev, loading: true }));
        instance
            .get(`api/socks/factory/user`)
            .then((data) => {
                setPageData((prev) => ({
                    ...prev,
                    users: data.data?.data,
                }));
                getUsersData();
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Foydalanuvchilarni yuklashda muammo bo'ldi");
            })
            .finally(() =>
                setPageData((prev) => ({ ...prev, loading: false }))
            );
    };

    const columns = [
        {
            title: "Foydalanuvchi nomi",
            dataIndex: "fio",
            key: "fio",
            width: "25%",
            search: true,
            sorter: (a, b) => {
                if (a.fio < b.fio) {
                    return -1;
                }
                if (a.fio > b.fio) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Foydalanuvchi nomeri",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            width: "25%",
            search: false,
            sorter: (a, b) => {
                if (a.phoneNumber < b.phoneNumber) {
                    return -1;
                }
                if (a.phoneNumber > b.phoneNumber) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Role",
            dataIndex: "roleId",
            key: "roleId",
            width: "25%",
            search: false,
            render: (initealValue) => {
                const role = roleData?.filter(
                    (item) => item?.id === initealValue
                );
                return role[0]?.roleName;
            },
            sorter: (a, b) => {
                if (a.roleId < b.roleId) {
                    return -1;
                }
                if (a.roleId > b.roleId) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Bloklangan",
            dataIndex: "block",
            key: "block",
            width: "24%",
            search: false,
            render: (record) => {
                return record ? "Ha" : "Yo'q";
            },
            sorter: (a, b) => {
                if (a.block < b.block) {
                    return -1;
                }
                if (a.block > b.block) {
                    return 1;
                }
                return 0;
            },
        },
    ];

    const onCreate = (values) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        instance
            .post("api/socks/factory/user", {
                ...values,
            })
            .then(function (response) {
                message.success("Foydalanuvchi muvaffaqiyatli qo'shildi");
                getUsers(pageData.current - 1, pageData.pageSize);
            })
            .catch(function (error) {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error(error.response?.data?.message);
            })
            .finally(() => {
                setPageData((prev) => ({ ...prev, loading: false }));
            });
    };

    const onEdit = (values, initial) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        instance
            .put(`api/socks/factory/user/editForUsers/${initial.id}`, {
                ...values,
                id: initial.id,
                deleted: false,
            })
            .then((res) => {
                message.success("Foydalanuvchi muvaffaqiyatli taxrirlandi");
                getUsers(pageData.current - 1, pageData.pageSize);
            })
            .catch(function (error) {
                console.error("Error in edit: ", error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Foydalanuvchini taxrirlashda muammo bo'ldi");
                if (error.response?.status === 405)
                    notification["error"]({
                        message: "Ruxsat berilmagan usul",
                        duration: 5,
                        icon: <FrownOutlined style={{ color: "#f00" }} />,
                    });
            })
            .finally(() => {
                setPageData((prev) => ({ ...prev, loading: false }));
            });
        ((values.block === "true" && initial.block === false) ||
            (values.block === "false" && initial.block === true)) &&
            instance
                .patch(`api/socks/factory/user/${initial.id}`)
                .then((res) => {
                    values.block === "true" && initial.block === false
                        ? message.success(
                              "Foydalanuvchi muvaffaqiyatli blocklandi"
                          )
                        : message.success(
                              "Foydalanuvchi muvaffaqiyatli blockdan ochildi"
                          );
                    getUsers(pageData.current - 1, pageData.pageSize);
                })
                .catch(function (error) {
                    console.error("Error in edit: ", error);
                    if (error.response?.status === 500)
                        navigate("/server-error");
                    message.error("Foydalanuvchini blocklashda muammo bo'ldi");
                    if (error.response?.status === 405)
                        notification["error"]({
                            message: "Ruxsat berilmagan usul",
                            duration: 5,
                            icon: <FrownOutlined style={{ color: "#f00" }} />,
                        });
                })
                .finally(() => {
                    setPageData((prev) => ({ ...prev, loading: false }));
                });
    };

    const handleDelete = (arr) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        arr.map((item) => {
            instance
                .delete(`api/socks/factory/user/${item}`)
                .then((data) => {
                    getUsers(pageData.current - 1, pageData.pageSize);
                    message.success("Foydalanuvchi muvaffaqiyatli o'chirildi");
                })
                .catch((error) => {
                    console.error(error);
                    if (error.response?.status === 500)
                        navigate("/server-error");
                    message.error("Foydalanuvchini o'chirishda muammo bo'ldi");
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
                getData={getUsers}
                columns={columns}
                pageSizeOptions={[10, 20]}
                tableData={pageData.users}
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

export default Users;
