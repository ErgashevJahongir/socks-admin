import { DatePicker, Input, InputNumber, Radio } from "antd";
import moment from "moment";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import instance from "../Api/Axios";
import useToken from "../Hook/UseToken";
import CustomSelect from "../Module/Select/Select";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [usersdata, setUsersData] = useState({});
    const [user, setUser] = useState({});
    const [userLoading, setUserLoading] = useState(true);
    const [measurementData, setMeasurementData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [socksData, setSocksData] = useState([]);
    const [createMaterialData, setMaterialData] = useState([]);
    const [roleData, setRoleData] = useState([]);
    const [clientData, setClientData] = useState([]);
    const [qarzValue, setQarzValue] = useState("");
    const [deadlineValue, setDeadlineValue] = useState("");
    const [valueDebt, setValueDebt] = useState(null);
    const { token } = useToken();
    let location = useLocation();

    const onChangeDebt = (e) => {
        setValueDebt(e.target.value);
    };

    const onChangeDeadline = (e) => {
        setDeadlineValue(moment(e).toISOString());
    };

    const incomeMaterialFormData = [
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
            label: "Material o'lchovi",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Material o'lchovini tanlang"}
                    selectData={measurementData}
                />
            ),
        },
        {
            name: "amount",
            label: "Material miqdori",
            input: <InputNumber style={{ width: "100%" }} />,
        },
        {
            name: "price",
            label: "Material narxi",
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

    const editIncomeMaterialFormData = [
        {
            name: "materialId",
            label: "Material nomi",
            inputSelect: (defaultId = null) => (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Materialni tanlang"}
                    selectData={createMaterialData}
                    DValue={defaultId}
                />
            ),
        },
        {
            name: "measurementId",
            label: "Material o'lchvini tanlang",
            inputSelect: (defaultId = null) => (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Material o'lchvini tanlang"}
                    selectData={measurementData}
                    DValue={defaultId}
                />
            ),
        },
        {
            name: "amount",
            label: "Material miqdori",
            input: <InputNumber style={{ width: "100%" }} />,
        },
        {
            name: "price",
            label: "Material narxi",
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
                    selectData={clientData?.map((item) => ({
                        ...item,
                        name: item.fio,
                    }))}
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
        {
            name: "debt",
            label: "Qarzdorlik",
            input: (
                <Radio.Group onChange={onChangeDebt}>
                    <Radio value="false"> Yo'q </Radio>
                    <Radio value="true">
                        {" "}
                        <p>Bor</p>
                        {valueDebt === "true" ? (
                            <>
                                <div
                                    style={{
                                        width: "115%",
                                        marginLeft: "-25px",
                                    }}
                                >
                                    Qancha pul to'langan
                                    <InputNumber
                                        value={qarzValue}
                                        placeholder="Qancha pul to'langan"
                                        onChange={(e) => setQarzValue(e)}
                                        style={{
                                            width: "100%",
                                        }}
                                    />
                                </div>
                                <div
                                    style={{
                                        width: "115%",
                                        marginLeft: "-25px",
                                    }}
                                >
                                    Qaytarish vaqti
                                    <DatePicker
                                        style={{ width: "100%" }}
                                        onChange={onChangeDeadline}
                                    />
                                </div>
                            </>
                        ) : null}{" "}
                    </Radio>
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
            inputSelect: (defaultId = null) => (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Klientni tanlang"}
                    selectData={clientData?.map((item) => ({
                        ...item,
                        name: item.fio,
                    }))}
                    DValue={defaultId}
                />
            ),
        },
        {
            name: "price",
            label: "Naski narxi",
            input: <InputNumber style={{ width: "100%" }} />,
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
            name: "date",
            label: "Sotilish vaqti",
            input: <Input />,
        },
        {
            name: "debt",
            label: "Qarzdorlik",
            input: (
                <Radio.Group onChange={onChangeDebt}>
                    <Radio value="false"> Yo'q </Radio>
                    <Radio value="true">
                        {" "}
                        <p>Bor</p>
                        {valueDebt === "true" ? (
                            <>
                                <div
                                    style={{
                                        width: "115%",
                                        marginLeft: "-25px",
                                    }}
                                >
                                    Qancha pul to'langan
                                    <InputNumber
                                        value={qarzValue}
                                        placeholder="Qancha pul to'langan"
                                        onChange={(e) => setQarzValue(e)}
                                        style={{
                                            width: "100%",
                                        }}
                                    />
                                </div>
                                <div
                                    style={{
                                        width: "115%",
                                        marginLeft: "-25px",
                                    }}
                                >
                                    Qaytarish vaqti
                                    <DatePicker
                                        style={{ width: "100%" }}
                                        onChange={onChangeDeadline}
                                    />
                                </div>
                            </>
                        ) : null}{" "}
                    </Radio>
                </Radio.Group>
            ),
        },
    ];

    const optomOutcomeSocksData = [
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
    ];

    const editOptomOutcomeSocksData = [
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
            name: "price",
            label: "Naski narxi",
            input: <InputNumber style={{ width: "100%" }} />,
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
            inputSelect: (defaultId = null) => (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Kategoriyani tanlang"}
                    selectData={categoryData}
                    DValue={defaultId}
                />
            ),
        },
        {
            name: "price",
            label: "Narxi",
            input: <InputNumber style={{ width: "100%" }} />,
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

    const usersDataForm = [
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
        {
            name: "password",
            label: "Ishchi passwordi",
            input: <Input />,
        },
        user?.roleId === 1
            ? {
                  name: "roleId",
                  label: "Roleni tanlang",
                  input: (
                      <CustomSelect
                          backValue={"id"}
                          placeholder={"Roleni tanlang"}
                          selectData={roleData
                              ?.filter(
                                  (item) => item?.roleName !== "ROLE_ADMIN"
                              )
                              .map((item) => {
                                  return { ...item, name: item.roleName };
                              })}
                      />
                  ),
              }
            : {
                  name: "roleId",
                  label: "Roleni tanlang",
                  input: (
                      <CustomSelect
                          backValue={"id"}
                          placeholder={"Roleni tanlang"}
                          selectData={roleData
                              ?.filter(
                                  (item) => item?.roleName === "ROLE_EMPLOYEE"
                              )
                              .map((item) => {
                                  return { ...item, name: item.roleName };
                              })}
                      />
                  ),
              },
    ];

    const editUsersDataForm = [
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
        user?.roleId === 1
            ? {
                  name: "roleId",
                  label: "Role",
                  inputSelect: (initial) => (
                      <CustomSelect
                          backValue={"id"}
                          placeholder={"Roleni tanlang"}
                          selectData={roleData
                              ?.filter(
                                  (item) => item?.roleName !== "ROLE_ADMIN"
                              )
                              .map((item) => {
                                  return { ...item, name: item.roleName };
                              })}
                          DValue={initial}
                      />
                  ),
              }
            : {
                  name: "roleId",
                  label: "Role",
                  inputSelect: (initial) => (
                      <CustomSelect
                          backValue={"id"}
                          placeholder={"Roleni tanlang"}
                          DValue={initial}
                          selectData={roleData?.map((item) => ({
                              ...item,
                              name: item.roleName,
                          }))}
                          disabled={true}
                      />
                  ),
              },
        user?.roleId === 1
            ? {
                  name: "block",
                  label: "Bloklanganligi",
                  input: (
                      <Radio.Group>
                          <Radio value="false"> Yo'q </Radio>
                          <Radio value="true"> Ha </Radio>
                      </Radio.Group>
                  ),
              }
            : {
                  name: "block",
                  label: "Bloklanganligi",
                  input: (
                      <Radio.Group disabled>
                          <Radio value="false"> Yo'q </Radio>
                          <Radio value="true"> Ha </Radio>
                      </Radio.Group>
                  ),
              },
    ];

    const materialFormData = [
        {
            name: "name",
            label: "Material nomi",
            input: <Input />,
        },
        {
            name: "measurementId",
            label: "O'lchovini tanlang",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"O'lchovini tanlang"}
                    selectData={measurementData}
                />
            ),
        },
    ];

    const editmaterialFormData = [
        {
            name: "name",
            label: "Material nomi",
            input: <Input />,
        },
        {
            name: "measurementId",
            label: "O'lchovini tanlang",
            inputSelect: (initial = null) => (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"O'lchovini tanlang"}
                    selectData={measurementData}
                    DValue={initial}
                />
            ),
        },
        {
            name: "amount",
            label: "Material miqdori",
            input: <InputNumber style={{ width: "100%" }} />,
        },
    ];

    const editOutdebtFormData = [
        {
            name: "clientId",
            label: "Klient ismi",
            inputSelect: (defaultId = null) => (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Klientni tanlang"}
                    selectData={clientData?.map((item) => ({
                        ...item,
                        name: item.fio,
                    }))}
                    DValue={defaultId}
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

    const outcomeMaterialData = [
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
            name: "date",
            label: "Ishlab chiqarilgan vaqt",
            input: (
                <DatePicker
                    style={{ width: "100%" }}
                    value={moment().format()}
                />
            ),
        },
    ];

    const editOutcomeMaterialData = [
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
            name: "date",
            label: "Ishlab chiqarilgan vaqt",
            input: <Input />,
        },
    ];

    const socksMaterialData = [
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
            label: "Material o'lchovi",
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
            label: "Material miqdori",
            input: <InputNumber style={{ width: "100%" }} />,
        },
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
    ];

    const editSocksMaterialData = [
        {
            name: "oldMaterialId",
            label: "Eski material nomi",
            inputSelect: (defaultId = null) => (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Materialni tanlang"}
                    selectData={createMaterialData}
                    DValue={defaultId}
                />
            ),
        },
        {
            name: "materialId",
            label: "Yangi material nomi",
            inputSelect: (defaultId = null) => (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Materialni tanlang"}
                    selectData={createMaterialData}
                    DValue={defaultId}
                />
            ),
        },
        {
            name: "measurementId",
            label: "Material o'lchovi",
            inputSelect: (defaultId = null) => (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Material o'lchovi"}
                    selectData={measurementData}
                    DValue={defaultId}
                />
            ),
        },
        {
            name: "amount",
            label: "Material miqdori",
            input: <InputNumber style={{ width: "100%" }} />,
        },
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
    ];

    const getUserData = (token) => {
        instance
            .get("api/socks/factory/user/current", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((data) => {
                setUserLoading(false);
                setUser(data.data.data);
            })
            .catch((err) => {
                setUserLoading(false);
                console.error(err);
            });
    };

    const getUsersData = () => {
        instance
            .get("api/socks/factory/user")
            .then((data) => {
                setUsersData(data.data.data);
            })
            .catch((err) => console.error(err));
    };

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
        getUserData(token);
        getMaterialData();
        getMeasurementData();
        getCategoryData();
        getSocksData();
        getRoleData();
        getClientData();
        getUsersData();
    }, []);

    let formData = {};

    switch (location.pathname) {
        case "/others": {
            formData = {
                formData: othersData,
                editFormData: othersData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: false,
                createInfo: false,
                editInfo: false,
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
                deleteInfo: false,
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
                formData: materialFormData,
                editFormData: editmaterialFormData,
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
        case "/income-material": {
            formData = {
                formData: incomeMaterialFormData,
                editFormData: editIncomeMaterialFormData,
                branchData: false,
                timeFilterInfo: true,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: true,
                editModalTitle: "Kelgan materialni o'zgartirish",
                modalTitle: "Kelgan materialni qo'shish",
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
        case "/debts": {
            formData = {
                formData: editOutdebtFormData,
                editFormData: editOutdebtFormData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: false,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "Tashqi qarzni o'zgartirish",
                modalTitle: "Tashqi qarz qo'shish",
            };
            break;
        }
        case "/users": {
            formData = {
                formData: usersDataForm,
                editFormData: editUsersDataForm,
                branchData: false,
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
                timeFilterInfo: true,
                deleteInfo: false,
                createInfo: true,
                editInfo: true,
                timelyInfo: true,
                editModalTitle: "Sotilgan naskini o'zgartirish",
                modalTitle: "Sotilgan naskini qo'shish",
            };
            break;
        }
        case "/outcome-material": {
            formData = {
                formData: outcomeMaterialData,
                editFormData: editOutcomeMaterialData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: false,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "Sotilgan naskini o'zgartirish",
                modalTitle: "Sotilgan naskini qo'shish",
            };
            break;
        }
        case "/outcome-nakladnoy": {
            formData = {
                formData: optomOutcomeSocksData,
                editFormData: editOptomOutcomeSocksData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "Sotilgan naskini o'zgartirish",
                modalTitle: "Sotilgan naskini qo'shish",
            };
            break;
        }
        case "/socks-resource": {
            formData = {
                formData: socksMaterialData,
                editFormData: editSocksMaterialData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "Naskiga ketadigan materialni o'zgartirish",
                modalTitle: "Naskiga ketadigan materiallarni qo'shish",
            };
            break;
        }
        default: {
            formData = { ...formData };
        }
    }

    const value = {
        formData,
        measurementData,
        getCategoryData,
        getMaterialData,
        getUserData,
        getUsersData,
        getSocksData,
        getClientData,
        categoryData,
        user,
        userLoading,
        usersdata,
        roleData,
        setUsersData,
        createMaterialData,
        socksData,
        clientData,
        deadlineValue,
        qarzValue,
        setQarzValue,
        setValueDebt,
        setDeadlineValue,
    };

    return (
        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    );
};
