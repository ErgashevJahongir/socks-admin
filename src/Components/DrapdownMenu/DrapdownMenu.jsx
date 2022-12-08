import { Drawer, Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { useData } from "../../Hook/UseData";

function DrapdownMenu({ onClose, isVisible }) {
    const { token } = useToken();
    const { user } = useData();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogOut = (e) => {
        e.preventDefault();
        if (sessionStorage.getItem("socks-token"))
            sessionStorage.removeItem("socks-token", token);
        if (localStorage.getItem("socks-token")) {
            localStorage.removeItem("socks-token", token);
        }
        window.location.href = "/login";
    };

    const onClickGoPage = (e) => {
        navigate(e.key);
    };

    return (
        <Drawer
            placement="left"
            closable={false}
            width="250px"
            onClose={onClose}
            open={isVisible}
        >
            <Menu
                style={{
                    minHeight: "100vh",
                }}
                defaultSelectedKeys={[location.pathname]}
                defaultOpenKeys={["others"]}
                onClick={onClickGoPage}
                mode="inline"
                theme="dark"
                items={[
                    {
                        label: "Bosh Sahifa",
                        key: "/",
                        icon: (
                            <DashboardOutlined style={{ fontSize: "20px" }} />
                        ),
                    },
                    {
                        label: "Material",
                        key: "/material",
                        icon: (
                            <CloudSyncOutlined style={{ fontSize: "20px" }} />
                        ),
                    },
                    {
                        label: "Kelgan Materiallar",
                        key: "/income-material",
                        icon: (
                            <CloudDownloadOutlined
                                style={{ fontSize: "18px" }}
                            />
                        ),
                    },
                    {
                        label: "Ishlatilgan Materiallar",
                        key: "/outcome-material",
                        icon: (
                            <CloudSyncOutlined style={{ fontSize: "18px" }} />
                        ),
                    },
                    {
                        label: "Naskilar",
                        key: "/socks",
                        icon: (
                            <CloudServerOutlined style={{ fontSize: "20px" }} />
                        ),
                    },
                    {
                        label: "Sotilgan Naskilar",
                        key: "/outcome",
                        icon: (
                            <CloudUploadOutlined style={{ fontSize: "18px" }} />
                        ),
                        children: [
                            {
                                label: "Sotilgan Naskilar",
                                key: "/outcome-socks",
                                icon: (
                                    <DollarCircleOutlined
                                        style={{ fontSize: "18px" }}
                                    />
                                ),
                            },
                            {
                                label: "Ko'proq sotish",
                                key: "/outcome-nakladnoy",
                                icon: (
                                    <DollarCircleOutlined
                                        style={{ fontSize: "18px" }}
                                    />
                                ),
                            },
                        ],
                    },
                    {
                        label: "Qarzlar",
                        key: "/debts",
                        icon: (
                            <DollarCircleOutlined
                                style={{ fontSize: "20px" }}
                            />
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
                                label: "Naski uchun ketadigan mahsulotlar",
                                key: "/socks-resource",
                                icon: (
                                    <TeamOutlined
                                        style={{ fontSize: "18px" }}
                                    />
                                ),
                            },
                            {
                                label: "Klientlar",
                                key: "/clients",
                                icon: (
                                    <TeamOutlined
                                        style={{ fontSize: "18px" }}
                                    />
                                ),
                            },
                            user.roleId === 1
                                ? {
                                      label: "Foydalanuvchilar",
                                      key: "/users",
                                      icon: (
                                          <UserOutlined
                                              style={{
                                                  fontSize: "18px",
                                              }}
                                          />
                                      ),
                                  }
                                : null,
                            {
                                label: "Boshqalar",
                                key: "/others",
                                icon: (
                                    <AppstoreOutlined
                                        style={{ fontSize: "18px" }}
                                    />
                                ),
                            },
                        ],
                    },
                    {
                        label: "Profil",
                        key: "/profil",
                        icon: <UserOutlined style={{ fontSize: "18px" }} />,
                    },
                    user.roleId === 1
                        ? {
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
                          }
                        : null,
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
