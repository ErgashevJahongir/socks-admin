import { useState } from "react";
import instance from "../../Api/Axios";
import { message } from "antd";
import CustomTable from "../../Module/Table/Table";
import { useData } from "../../Hook/UseData";

const Users = () => {
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { roleData } = useData();

    const getWorkers = (values) => {
        setLoading(true);
        instance
            .get(
                `api/socks/factory/user`
            )
            .then((data) => {
                setWorkers(data.data.data);
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
                message.error("Foydalanuvchilarni yuklashda muammo bo'ldi");
            })
            .finally(() => setLoading(false));
    };

    const columns = [
        {
            title: "Foydalanuvchi nomi",
            dataIndex: "fio",
            key: "fio",
            width: "25%",
            search: true,
        },
        {
            title: "Foydalanuvchi nomeri",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            width: "25%",
            search: false,
        },
        {
            title: "Role",
            dataIndex: "roleId",
            key: "roleId",
            width: "25%",
            search: false,
            render: (initealValue) => {
                const role = roleData?.filter(
                    (item) => item?.id === initealValue)
                return role[0]?.roleName;
            },
        },
        {
            title: "Bloklangan",
            dataIndex: "block",
            key: "block",
            width: "25%",
            search: false,
            render: (record) => {
                return record ? "Ha" : "Yo'q";
            },
        },
    ];

    const onCreate = (values) => {
        setLoading(true);
        instance
            .post("api/socks/factory/user", {
                ...values,
            })
            .then(function (response) {
                message.success("Foydalanuvchi muvaffaqiyatli qo'shildi");
                getWorkers(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error(error);
                message.error(error.response?.data?.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onEdit = (values, initial) => {
        setLoading(true);
        instance
            .put(`api/socks/factory/user/editForUsers${initial.id}`, {
                ...values,
                // id: initial.id,
                deleted: false,
            })
            .then((res) => {
                message.success("Foydalanuvchi muvaffaqiyatli taxrirlandi");
                getWorkers(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error("Error in edit: ", error);
                message.error("Foydalanuvchini taxrirlashda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDelete = (arr) => {
        setLoading(true);
        arr.map((item) => {
            instance
                .delete(`api/socks/factory/user/${item}`)
                .then((data) => {
                    getWorkers(current - 1, pageSize);
                    message.success("Foydalanuvchi muvaffaqiyatli o'chirildi");
                })
                .catch((error) => {
                    console.error(error);
                    message.error("Foydalanuvchini o'chirishda muammo bo'ldi");
                });
            return null;
        });
        setLoading(false);
    };

    return (
        <>
            <CustomTable
                onEdit={onEdit}
                onCreate={onCreate}
                onDelete={handleDelete}
                getData={getWorkers}
                columns={columns}
                tableData={workers}
                current={current}
                pageSize={pageSize}
                loading={loading}
                setLoading={setLoading}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                pageSizeOptions={[10, 20]}
            />
        </>
    );
};

export default Users;
