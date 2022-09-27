import { Avatar, Dropdown, Layout, Menu } from "antd";
import React, { useState } from "react";
import {
    DashboardOutlined,
    MenuOutlined,
    UserOutlined,
    LogoutOutlined,
    CloudUploadOutlined,
    CloudDownloadOutlined,
    CloudOutlined,
    ProfileOutlined,
    DollarCircleOutlined,
    AppstoreAddOutlined,
    TeamOutlined,
    AppstoreOutlined,
    BranchesOutlined,
    BellOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useData } from "../../Hook/UseData";
import useToken from "../../Hook/UseToken";
import DrapdownMenu from "../DrapdownMenu/DrapdownMenu";
import socks2 from "./socks2.png";

const { Header } = Layout;

function Navbar() {
    const [isVisible, setIsVisible] = useState(false);
    const { user } = useData();
    const { token } = useToken();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogOut = (e) => {
        e.preventDefault();
        sessionStorage.removeItem("socks", token);
        localStorage.removeItem("socks", token);
        navigate("/login", { replace: true });
    };

    const showDrawer = () => {
        setIsVisible(true);
    };

    const onClose = () => {
        setIsVisible(false);
    };

    const menu = (
        <Menu
            items={[
                {
                    key: "/profil",
                    icon: <UserOutlined />,
                    label: (
                        <Link
                            to="/profil"
                            style={{ width: "100px", display: "inline-block" }}
                        >
                            Profil
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
                    key: "3",
                    danger: true,
                    icon: <LogoutOutlined />,
                    label: (
                        <div
                            onClick={(e) => handleLogOut(e)}
                            style={{ width: "100px" }}
                        >
                            Chiqish
                        </div>
                    ),
                },
            ]}
        />
    );

    return (
        <Header
            style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                position: "sticky",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 99,
            }}
        >
            <div
                className="container"
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <div className="logo" style={{ marginRight: "5%" }}>
                    <Link
                        to="/"
                        style={{ marginTop: "3px", display: "block" }}
                    >
                        <img
                            src={socks2}
                            alt="img-logo"
                            width={70}
                            height={40}
                        />
                    </Link>
                </div>
                <Menu
                    style={{ width: "75%" }}
                    className="inline-navber"
                    theme="dark"
                    defaultSelectedKeys={[location.pathname]}
                    mode="horizontal"
                    items={[
                        {
                            label: "Bosh Sahifa",
                            key: "/",
                            icon: (
                                <Link to="/">
                                    <DashboardOutlined
                                        style={{ fontSize: "18px" }}
                                    />
                                </Link>
                            ),
                        },
                        {
                            label: "Material",
                            key: "/material",
                            icon: (
                                <Link to="/material">
                                    <ProfileOutlined
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
                                    <ProfileOutlined
                                        style={{ fontSize: "18px" }}
                                    />
                                </Link>
                            ),
                        },
                        {
                            label: "Kelgan Mahsulotlar",
                            key: "/income-socks",
                            icon: (
                                <Link to="/income-socks">
                                    <CloudDownloadOutlined
                                        style={{ fontSize: "18px" }}
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
                                        style={{ fontSize: "18px" }}
                                    />
                                </Link>
                            ),
                        },
                        {
                            label: "Tashqi qarzlar",
                            key: "/outdebts",
                            icon: (
                                <Link to="/outdebts">
                                    <DollarCircleOutlined
                                        style={{ fontSize: "18px" }}
                                    />
                                </Link>
                            ),
                        },
                        {
                            label: "Qo'shimchalar",
                            key: "others",
                            icon: (
                                <AppstoreAddOutlined
                                    style={{ fontSize: "18px" }}
                                />
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
                    ]}
                />
                <span
                    className="user inline-navber"
                    style={{ marginLeft: "auto" }}
                >
                    <Dropdown overlay={menu} placement="bottomRight" arrow>
                        <Avatar
                            size="large"
                            style={{
                                color: "#f56a00",
                                backgroundColor: "#fde3cf",
                            }}
                        >
                            {/* {user.username?.charAt(0)} */}
                            Ali
                        </Avatar>
                    </Dropdown>
                </span>
                <div className="burger-menu">
                    <span
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <MenuOutlined
                            onClick={showDrawer}
                            rotate={180}
                            style={{ fontSize: "28px", color: "#fff" }}
                        />
                        <DrapdownMenu onClose={onClose} isVisible={isVisible} />
                    </span>
                </div>
            </div>
        </Header>
    );
}

export default Navbar;
