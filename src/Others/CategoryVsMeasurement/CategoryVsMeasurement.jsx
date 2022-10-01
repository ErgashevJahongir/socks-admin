import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../Api/Axios";
import { message } from "antd";
import CustomTable from "../../Module/Table/Table";
import { useData } from "../../Hook/UseData";
import "./CategoryVsMeasurment.css";

const CategoryVsMeasurement = () => {
    const [category, setCategory] = useState([]);
    const [measurement, setMeasurment] = useState([]);
    const [loadingCategory, setLoadingCategory] = useState(true);
    const [loading, setLoading] = useState(true);

    const { getCategoryData, getMeasurementData } = useData();
    const navigate = useNavigate();

    const getCategory = () => {
        setLoadingCategory(true);
        instance
            .get(`api/socks/factory/category/getAll`)
            .then((data) => {
                setCategory(data.data.data);
            })
            .catch((error) => {
                console.error(error);
                if (error.response.status === 500) navigate("/server-error");
                message.error("Kategoriyalarni yuklashda muammo bo'ldi");
            })
            .finally(() => setLoadingCategory(false));
    };

    const onCreateCategory = (values) => {
        setLoadingCategory(true);
        instance
            .post(`api/socks/factory/category/add?name=${values.name}`)
            .then(function (response) {
                getCategory();
                getCategoryData();
                message.success("Kategoriya muvaffaqiyatli qo'shildi");
            })
            .catch(function (error) {
                console.error(error);
                if (error.response.status === 500) navigate("/server-error");
                message.error("Kategoriyani qo'shishda muammo bo'ldi");
            })
            .finally(() => {
                setLoadingCategory(false);
            });
    };

    const onEditCategory = (values, initial) => {
        setLoadingCategory(true);
        instance
            .put(
                `api/socks/factory/category/update${initial.id}?name=${values.name}`
            )
            .then(function (response) {
                getCategory();
                getCategoryData();
                message.success("Kategoriya muvaffaqiyatli qo'shildi");
            })
            .catch(function (error) {
                console.error(error);
                if (error.response.status === 500) navigate("/server-error");
                message.error("Kategoriyani qo'shishda muammo bo'ldi");
            })
            .finally(() => {
                setLoadingCategory(false);
            });
    };

    const handleDeleteCategory = (arr) => {
        console.log(arr);
        setLoadingCategory(true);
        arr.map((item) => {
            instance
                .delete(`api/socks/factory/category/delete${item}`)
                .then((data) => {
                    getCategoryData();
                    getCategory();
                    message.success("Kategoriya muvaffaqiyatli o'chirildi");
                })
                .catch((error) => {
                    console.error(error);
                    if (error.response.status === 500)
                        navigate("/server-error");
                    message.error("Kategoriyani o'chirishda muammo bo'ldi");
                });
            return null;
        });
        setLoadingCategory(false);
    };

    const columnsCategory = [
        {
            title: "Kategoriya nomi",
            dataIndex: "name",
            key: "name",
            width: "100%",
            search: false,
        },
    ];

    const getMeasurment = () => {
        setLoading(true);
        instance
            .get("api/socks/factory/measurement/getAll")
            .then((data) => {
                setMeasurment(data.data.data);
            })
            .catch((error) => {
                console.error(error);
                if (error.response.status === 500) navigate("/server-error");
                message.error("O'lchov birligilarni yuklashda muammo bo'ldi");
            })
            .finally(() => setLoading(false));
    };

    const onCreate = (values) => {
        setLoading(true);
        console.log(values.name);
        instance
            .post(`api/socks/factory/measurement/add?name=${values.name}`)
            .then(function (response) {
                getMeasurment();
                getMeasurementData();
                message.success("O'lchov birligi muvaffaqiyatli qo'shildi");
            })
            .catch(function (error) {
                console.error(error);
                if (error.response.status === 500) navigate("/server-error");
                message.error("O'lchov birligini qo'shishda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onEdit = (values, initial) => {
        setLoading(true);
        instance
            .post(`api/socks/factory/measurement/update${initial.id}?name=${ values.name }`)
            .then(function (response) {
                getMeasurment();
                getMeasurementData();
                message.success("O'lchov birligi muvaffaqiyatli taxrirlandi");
            })
            .catch(function (error) {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("O'lchov birligini taxrirlashda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDelete = (arr) => {
        setLoading(true);
        arr.map((item) => {
            instance
                .delete(`api/socks/factory/measurement/delete${item}`)
                .then((data) => {
                    getMeasurment();
                    getMeasurementData();
                    message.success("O'lchov birligi muvaffaqiyatli o'chirildi");
                })
                .catch((error) => {
                    console.error(error);
                    if (error.response.status === 500)
                        navigate("/server-error");
                    message.error(
                        "O'lchov birligini o'chirishda muammo bo'ldi"
                    );
                });
            return null;
        });
        setLoading(false);
    };

    const columns = [
        {
            title: "O'lchov nomi",
            dataIndex: "name",
            key: "name",
            width: "100%",
            search: false,
        },
    ];

    return (
        <div className="category">
            <div className="others">
                <div>
                    <h3>Kategoriya</h3>
                    <CustomTable
                        onEdit={onEditCategory}
                        onCreate={onCreateCategory}
                        getData={getCategory}
                        onDelete={handleDeleteCategory}
                        columns={columnsCategory}
                        tableData={category}
                        loading={loadingCategory}
                        setLoading={setLoadingCategory}
                    />
                </div>
                <div>
                    <h3>O'lchov birligi</h3>
                    <CustomTable
                        onEdit={onEdit}
                        onCreate={onCreate}
                        getData={getMeasurment}
                        onDelete={handleDelete}
                        columns={columns}
                        tableData={measurement}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default CategoryVsMeasurement;
