import { useState } from "react";
import instance from "../Api/Axios";
import { message } from "antd";
import CustomTable from "../Module/Table/Table";
import { useNavigate } from "react-router-dom";

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const navigate = useNavigate();

    const getClients = (values) => {
        setLoading(true);
        instance
            .get(`api/socks/factory/client/getAll`, { ...values })
            .then((data) => {
                setClients(data.data.data);
                // setTotalItems(data.data.data.totalItems);
            })
            .catch((error) => {
                console.error(error);
                if (error.response.status === 500) navigate("/server-error");
                message.error("Klientlarni yuklashda muammo bo'ldi");
            })
            .finally(() => setLoading(false));
    };

    const columns = [
        {
            title: "Klient nomi",
            dataIndex: "fio",
            key: "fio",
            width: "33%",
            search: true,
        },
        {
            title: "Klient nomeri",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            width: "33%",
            search: false,
        },
        {
            title: "Klient addressi",
            dataIndex: "address",
            key: "address",
            width: "33%",
            search: false,
            sorter: (a, b) => {
                if (a.address < b.address) {
                    return -1;
                }
                if (a.address > b.address) {
                    return 1;
                }
                return 0;
            },
        },
    ];

    const onCreate = (values) => {
        setLoading(true);
        instance
            .post(`api/socks/factory/client/add`, { ...values })
            .then(function (response) {
                message.success("Klient muvaffaqiyatli qo'shildi");
                getClients(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error(error);
                if (error.response.status === 500) navigate("/server-error");
                message.error("Klientni qo'shishda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onEdit = (values, initial) => {
        console.log(initial.id);
        setLoading(true);
        instance
            .put(`api/socks/factory/client/update${initial.id}`, { ...values })
            .then((res) => {
                message.success("Klient muvaffaqiyatli taxrirlandi");
                getClients(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error("Error in edit: ", error);
                if (error.response.status === 500) navigate("/server-error");
                message.error("Klientni taxrirlashda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDelete = (arr) => {
        setLoading(true);
        arr.map((item) => {
            instance
                .delete(`api/socks/factory/client/delete${item}`)
                .then((data) => {
                    getClients(current - 1, pageSize);
                    message.success("Klient muvaffaqiyatli o'chirildi");
                })
                .catch((error) => {
                    console.error(error);
                    if (error.response.status === 500)
                        navigate("/server-error");
                    message.error("Klientni o'chirishda muammo bo'ldi");
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
                getData={getClients}
                columns={columns}
                tableData={clients}
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

export default Clients;
