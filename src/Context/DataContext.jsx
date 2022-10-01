import { DatePicker, Input, InputNumber, Radio } from "antd";
import moment from "moment";
import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import instance from "../Api/Axios";
import useToken from "../Hook/UseToken";
import CustomSelect from "../Module/Select/Select";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [valueDebt, setValueDebt] = useState(null);
    const [qarzValue, setQarzValue] = useState("");
    const [user, setUser] = useState({});
    const [measurementData, setMeasurementData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [socksData, setSocksData] = useState([]);
    const [createMaterialData, setMaterialData] = useState([]);
    const [otcomeSocksData, setOutcomeSocksData] = useState([]);
    const [roleData, setRoleData] = useState([]);
    const [clientData, setClientData] = useState([]);
    const { token } = useToken();
    let navigate = useNavigate();

    let location = useLocation();

    const onChangeDebt = (e) => {
        setValueDebt(e.target.value);
    };

    const incomeSocksData = [
        {
            name: "materialId",
            label: "Material nomi",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Materialni tanlang"}
                    selectData={createMaterialData}
                />
            ),
        },
        {
            name: "measurementId",
            label: "Naski o'lchovi",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Naski o'lchovi"}
                    selectData={measurementData}
                />
            ),
        },
        {
            name: "amount",
            label: "Naski miqdori",
            input: <InputNumber style={{ width: "100%" }} />,
        },
        {
            name: "price",
            label: "Naski narxi",
            input: <InputNumber style={{ width: "100%" }} />,
        },
        {
            name: "date",
            label: "Kelish vaqti",
            input: (
                <DatePicker
                    style={{ width: "100%" }}
                    value={moment().format()}
                />
            ),
        },
    ];

    const editIncomeSocksData = [
        {
            name: "materialId",
            label: "Material nomi",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Materialni tanlang"}
                    selectData={createMaterialData}
                />
            ),
        },
        {
            name: "measurementId",
            label: "Naski o'lchovi",
            inputSelect: (defaultId = null) => (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Naski o'lchovi"}
                    selectData={measurementData}
                    DValue={defaultId}
                />
            ),
        },
        {
            name: "amount",
            label: "Naski miqdori",
            input: <InputNumber style={{ width: "100%" }} />,
        },
        {
            name: "price",
            label: "Naski narxi",
            input: <InputNumber style={{ width: "100%" }} />,
        },
        {
            name: "date",
            label: "Kelish vaqti",
            input: <Input />,
        },
    ];

    const outcomeSocksData = [
        {
            name: "socksId",
            label: "Naski nomi",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Naskini tanlang"}
                    selectData={socksData}
                />
            ),
        },
        {
            name: "clientId",
            label: "Klient ismi",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Klientni tanlang"}
                    selectData={clientData}
                />
            ),
        },
        {
            name: "measurementId",
            label: "Naski o'lchovi",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Naski o'lchovi"}
                    selectData={measurementData}
                />
            ),
        },
        {
            name: "amount",
            label: "Naski miqdori",
            input: <InputNumber style={{ width: "100%" }} />,
        },
        {
            name: "price",
            label: "Naski narxi",
            input: <InputNumber style={{ width: "100%" }} />,
        },
        {
            name: "date",
            label: "Sotilish vaqti",
            input: (
                <DatePicker
                    style={{ width: "100%" }}
                    value={moment().format()}
                />
            ),
        },
        // {
        //     name: "debt",
        //     label: "Qarzdorlik",
        //     input: (
        //         <Radio.Group onChange={onChangeDebt}>
        //             <Radio value="false"> Yo'q </Radio>
        //             <Radio value="true">
        //                 {" "}
        //                 <p>Bor</p>
        //                 {valueDebt === "true" ? (
        //                     <div style={{ width: "100%", marginLeft: "-20px" }}>
        //                         Qarzdorlik
        //                         <InputNumber
        //                             value={qarzValue}
        //                             placeholder="Qarzdorlik"
        //                             onChange={(e) => setQarzValue(e)}
        //                             style={{
        //                                 width: "100%",
        //                             }}
        //                         />
        //                     </div>
        //                 ) : null}{" "}
        //             </Radio>
        //         </Radio.Group>
        //     ),
        // },
        {
            name: "debt",
            label: "Qarzdorlik",
            input: (
                <Radio.Group>
                    <Radio value="false"> Yo'q </Radio>
                    <Radio value="true"> Bor </Radio>
                </Radio.Group>
            ),
        },
    ];

    const editOutcomeSocksData = [
        {
            name: "socksId",
            label: "Naski nomi",
            inputSelect: (defaultId = null) => (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Naskini tanlang"}
                    selectData={socksData}
                    DValue={defaultId}
                />
            ),
        },
        {
            name: "clientId",
            label: "Klient ismi",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Klientni tanlang"}
                    selectData={clientData}
                />
            ),
        },
        {
            name: "measurementId",
            label: "Naski o'lchovi",
            inputSelect: (defaultId = null) => (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Naski o'lchovi"}
                    selectData={measurementData}
                    DValue={defaultId}
                />
            ),
        },
        {
            name: "amount",
            label: "Naski miqdori",
            input: <InputNumber style={{ width: "100%" }} />,
        },
        {
            name: "price",
            label: "Naski narxi",
            input: <InputNumber style={{ width: "100%" }} />,
        },
        {
            name: "date",
            label: "Sotilish vaqti",
            input: <Input />,
        },
        {
            name: "debt",
            label: "Qarzdorlik",
            input: (
                <Radio.Group>
                    <Radio value="false"> Yo'q </Radio>
                    <Radio value="true"> Bor </Radio>
                </Radio.Group>
            ),
        },
    ];

    const othersData = [
        {
            name: "name",
            label: "Nomi",
            input: <Input />,
        },
    ];

    const createSocksData = [
        {
            name: "name",
            label: "Nomi",
            input: <Input />,
        },
        {
            name: "categoryId",
            label: "Kategoriyani tanlang",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Kategoriyani tanlang"}
                    selectData={categoryData}
                />
            ),
        },
        {
            name: "price",
            label: "Narxi",
            input: <InputNumber style={{ width: "100%" }} />,
        },
        {
            name: "amount",
            label: "Naski miqdori",
            input: <InputNumber style={{ width: "100%" }} />,
        },
    ];

    const editsocksData = [
        {
            name: "name",
            label: "Nomi",
            input: <Input />,
        },
        {
            name: "categoryId",
            label: "Kategoriyani tanlang",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Kategoriyani tanlang"}
                    selectData={categoryData}
                />
            ),
        },
        {
            name: "amount",
            label: "Naski miqdori",
            input: <InputNumber style={{ width: "100%" }} />,
        },
        {
            name: "price",
            label: "Narxi",
            input: <InputNumber style={{ width: "100%" }} />,
        },
    ];

    const clientsData = [
        {
            name: "fio",
            label: "Klient FIO",
            input: <Input />,
        },
        {
            name: "phoneNumber",
            label: "Klient nomeri",
            input: <Input />,
        },
        {
            name: "address",
            label: "Klient addressi",
            input: <Input />,
        },
    ];

    const usersData = [
        {
            name: "fio",
            label: "Ishchi FIO",
            input: <Input />,
        },
        {
            name: "password",
            label: "Ishchi passwordi",
            input: <Input />,
        },
        {
            name: "phoneNumber",
            label: "Ishchi nomeri",
            input: <Input />,
        },
        {
            name: "roleId",
            label: "roleId",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Roleni tanlang"}
                    selectData={roleData.map((item) => {
                        return { ...item, name: item.roleName };
                    })}
                />
            ),
        },
        {
            name: "block",
            label: "block",
            input: (
                <Radio.Group>
                    <Radio value="false"> Yo'q </Radio>
                    <Radio value="true"> Ha </Radio>
                </Radio.Group>
            ),
        },
    ];

    const editUsersData = [
        {
            name: "fio",
            label: "Ishchi FIO",
            input: <Input />,
        },
        {
            name: "phoneNumber",
            label: "Ishchi nomeri",
            input: <Input />,
        },
    ];

    const materialData = [
        {
            name: "name",
            label: "Nomi",
            input: <Input />,
        },
        {
            name: "measurementId",
            label: "Kategoriyani tanlang",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Kategoriyani tanlang"}
                    selectData={measurementData}
                />
            ),
        },
        {
            name: "amount",
            label: "Naski miqdori",
            input: <InputNumber style={{ width: "100%" }} />,
        },
    ];

    const editmaterialData = [
        {
            name: "name",
            label: "Nomi",
            input: <Input />,
        },
        {
            name: "measurementId",
            label: "Kategoriyani tanlang",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Kategoriyani tanlang"}
                    selectData={measurementData}
                />
            ),
        },
        {
            name: "amount",
            label: "Naski miqdori",
            input: <InputNumber style={{ width: "100%" }} />,
        },
    ];

    const outdebtFormData = [
        {
            name: "clientId",
            label: "Klient ismi",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Klientni tanlang"}
                    selectData={clientData}
                />
            ),
        },
        {
            name: "outcomeSocksId",
            label: "Qarzga olingan mahsulot",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Quruq mevani tanlang"}
                    selectData={otcomeSocksData}
                />
            ),
        },
        {
            name: "price",
            label: "Naski narxi",
            input: <InputNumber style={{ width: "100%" }} />,
        },
        {
            name: "deadline",
            label: "Topshirish muddati",
            input: (
                <DatePicker
                    style={{ width: "100%" }}
                    value={moment().format()}
                />
            ),
        },
    ];

    const editOutdebtFormData = [
        {
            name: "clientId",
            label: "Klient ismi",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Klientni tanlang"}
                    selectData={clientData}
                />
            ),
        },
        {
            name: "outcomeSocksId",
            label: "Qarzga olingan mahsulot",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Sotilgan mahsulot tanlang"}
                    selectData={otcomeSocksData}
                />
            ),
        },
        {
            name: "price",
            label: "Naski narxi",
            input: <InputNumber style={{ width: "100%" }} />,
        },
        {
            name: "deadline",
            label: "Topshirish muddati",
            input: <Input />,
        },
    ];

    const getRoleData = () => {
        instance
            .get("api/socks/factory/role")
            .then((data) => {
                setRoleData(data.data.data);
            })
            .catch((err) => console.error(err));
    };

    const getMeasurementData = () => {
        instance
            .get("api/socks/factory/measurement/getAll")
            .then((data) => {
                setMeasurementData(data.data.data);
            })
            .catch((err) => console.error(err));
    };

    const getCategoryData = () => {
        instance
            .get("api/socks/factory/category/getAll")
            .then((data) => {
                setCategoryData(data.data.data);
            })
            .catch((err) => console.error(err));
    };

    const getClientData = () => {
        instance
            .get("api/socks/factory/client/getAll")
            .then((data) => {
                setClientData(data.data.data);
            })
            .catch((err) => console.error(err));
    };

    const getOutcomeSocksData = () => {
        instance
            .get("api/socks/factory/outcome/list")
            .then((data) => {
                const filtered = data.data.data.filter(
                    (item) => item.debt === true
                );
                setOutcomeSocksData(filtered);
            })
            .catch((err) => console.error(err));
    };

    const getSocksData = () => {
        instance
            .get("api/socks/factory/socks/list")
            .then((data) => {
                setSocksData(data.data.data);
            })
            .catch((err) => console.error(err));
    };

    const getMaterialData = () => {
        instance
            .get("api/socks/factory/api/socks/factory/material/getAll")
            .then((data) => {
                setMaterialData(data.data.data);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        getMaterialData();
        getMeasurementData();
        getCategoryData();
        getOutcomeSocksData();
        getSocksData();
        getRoleData();
        getClientData();
    }, []);

    let formData = {};

    switch (location.pathname) {
        case "/others": {
            formData = {
                formData: othersData,
                editFormData: othersData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "O'zgartirish",
                modalTitle: "Yangi qo'shish",
            };
            break;
        }
        case "/income-dryfruit": {
            formData = {
                formData: othersData,
                editFormData: othersData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "O'zgartirish",
                modalTitle: "Yangi qo'shish",
            };
            break;
        }
        case "/socks": {
            formData = {
                formData: createSocksData,
                editFormData: editsocksData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "Quruq mevanini o'zgartirish",
                modalTitle: "Quruq meva qo'shish",
            };
            break;
        }
        case "/material": {
            formData = {
                formData: materialData,
                editFormData: editmaterialData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "Quruq mevanini o'zgartirish",
                modalTitle: "Quruq meva qo'shish",
            };
            break;
        }
        case "/income-socks": {
            formData = {
                formData: incomeSocksData,
                editFormData: editIncomeSocksData,
                branchData: false,
                timeFilterInfo: true,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: true,
                editModalTitle: "Kelgan naskini o'zgartirish",
                modalTitle: "Kelgan naskini qo'shish",
            };
            break;
        }
        case "/clients": {
            formData = {
                formData: clientsData,
                editFormData: clientsData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "Klientni o'zgartirish",
                modalTitle: "Yangi klient qo'shish",
            };
            break;
        }
        case "/outdebts": {
            formData = {
                formData: outdebtFormData,
                editFormData: editOutdebtFormData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "Tashqi qarzni o'zgartirish",
                modalTitle: "Tashqi qarz qo'shish",
            };
            break;
        }
        case "/users": {
            formData = {
                formData: usersData,
                editFormData: editUsersData,
                branchData: true,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "Foydalanuvchini o'zgartirish",
                modalTitle: "Yangi foydalanuvchi qo'shish",
            };
            break;
        }
        case "/outcome-socks": {
            formData = {
                formData: outcomeSocksData,
                editFormData: editOutcomeSocksData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "Sotilgan quruq mevani o'zgartirish",
                modalTitle: "Sotilgan quruq mevani qo'shish",
            };
            break;
        }
        default: {
            formData = { ...formData };
        }
    }

    const value = {
        formData,
        getMeasurementData,
        measurementData,
        getCategoryData,
        categoryData,
        user,
        roleData,
        setUser,
        qarzValue,
    };

    return (
        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    );
};
