import { Drawer, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
    DashboardOutlined,
    UserOutlined,
    LogoutOutlined,
    CloudUploadOutlined,
    CloudDownloadOutlined,
    DollarCircleOutlined,
    AppstoreAddOutlined,
    TeamOutlined,
    AppstoreOutlined,
    CloudSyncOutlined,
    CloudServerOutlined,
    BellOutlined,
} from "@ant-design/icons";
import useToken from "../../Hook/UseToken";
// import { useData } from "../../Hook/UseData";

function DrapdownMenu({ onClose, isVisible }) {
    const { token } = useToken();
    // const { user } = useData();
    const location = useLocation();

    const handleLogOut = (e) => {
        e.preventDefault();
        if (sessionStorage.getItem("socks-token"))
            sessionStorage.removeItem("socks-token", token);
        if (localStorage.getItem("socks-token")) {
            localStorage.removeItem("socks-token", token);
        }
        window.location.href = "/login";
    };
    return (
        <Drawer
            placement="left"
            closable={false}
            size="200px"
            onClose={onClose}
            visible={isVisible}
        >
            <Menu
                style={{
                    height: "98%",
                    paddingTop: "80px",
                }}
                defaultSelectedKeys={[location.pathname]}
                defaultOpenKeys={["others"]}
                mode="inline"
                theme="dark"
                items={[
                    {
                        label: "Bosh Sahifa",
                        key: "/",
                        icon: (
                            <Link to="/">
                                <DashboardOutlined
                                    style={{ fontSize: "20px" }}
                                />
                            </Link>
                        ),
                    },
                    {
                        label: "Material",
                        key: "/material",
                        icon: (
                            <Link to="/material">
                                <CloudSyncOutlined
                                    style={{ fontSize: "20px" }}
                                />
                            </Link>
                        ),
                    },
                    {
                        label: "Kelgan Materiallar",
                        key: "/income-material",
                        icon: (
                            <Link to="/income-material">
                                <CloudDownloadOutlined
                                    style={{ fontSize: "18px" }}
                                />
                            </Link>
                        ),
                    },
                    {
                        label: "Ishlatilgan Materiallar",
                        key: "/outcome-material",
                        icon: (
                            <Link to="/outcome-material">
                                <CloudSyncOutlined
                                    style={{ fontSize: "18px" }}
                                />
                            </Link>
                        ),
                    },
                    {
                        label: "Naskilar",
                        key: "/socks",
                        icon: (
                            <Link to="/socks">
                                <CloudServerOutlined
                                    style={{ fontSize: "20px" }}
                                />
                            </Link>
                        ),
                    },

                    {
                        label: "Sotilgan Mahsulotlar",
                        key: "/outcome-socks",
                        icon: (
                            <Link to="/outcome-socks">
                                <CloudUploadOutlined
                                    style={{ fontSize: "20px" }}
                                />
                            </Link>
                        ),
                    },
                    {
                        label: "Qarzlar",
                        key: "/debts",
                        icon: (
                            <Link to="/debts">
                                <DollarCircleOutlined
                                    style={{ fontSize: "20px" }}
                                />
                            </Link>
                        ),
                    },
                    {
                        label: "Qo'shimchalar",
                        key: "others",
                        icon: (
                            <AppstoreAddOutlined style={{ fontSize: "20px" }} />
                        ),
                        children: [
                            {
                                label: "Klientlar",
                                key: "/clients",
                                icon: (
                                    <Link to="/clients">
                                        <TeamOutlined
                                            style={{ fontSize: "18px" }}
                                        />
                                    </Link>
                                ),
                            },
                            {
                                label: "Foydalanuvchilar",
                                key: "/users",
                                icon: (
                                    <Link to="/users">
                                        <UserOutlined
                                            style={{ fontSize: "18px" }}
                                        />
                                    </Link>
                                ),
                            },
                            {
                                label: "Boshqalar",
                                key: "/others",
                                icon: (
                                    <Link to="/others">
                                        <AppstoreOutlined
                                            style={{ fontSize: "18px" }}
                                        />
                                    </Link>
                                ),
                            },
                        ],
                    },
                    {
                        label: "Profil",
                        key: "/profil",
                        icon: (
                            <Link to="/profil">
                                <UserOutlined style={{ fontSize: "18px" }} />
                            </Link>
                        ),
                    },
                    {
                        key: "/notification",
                        icon: <BellOutlined />,
                        label: (
                            <Link
                                to="/notification"
                                style={{
                                    width: "100px",
                                    display: "inline-block",
                                }}
                            >
                                Eslatmalar
                            </Link>
                        ),
                    },
                    {
                        label: "Chiqish",
                        key: "/logout",
                        icon: (
                            <div type="link" onClick={(e) => handleLogOut(e)}>
                                <LogoutOutlined style={{ fontSize: "18px" }} />
                            </div>
                        ),
                    },
                ]}
            />
        </Drawer>
    );
}

export default DrapdownMenu;
