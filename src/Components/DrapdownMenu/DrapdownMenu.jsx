import { Drawer, Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    DashboardOutlined,
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
} from "@ant-design/icons";
import useToken from "../../Hook/UseToken";
// import { useData } from "../../Hook/UseData";

function DrapdownMenu({ onClose, isVisible }) {
    const { token } = useToken();
    const navigate = useNavigate();
    // const { user } = useData();
    const location = useLocation();

    const handleLogOut = (e) => {
        e.preventDefault();
        sessionStorage.removeItem("dry-fruit", token);
        localStorage.removeItem("dry-fruit", token);
        navigate("/login", { replace: true });
    };
    return (
        <Drawer
            placement="right"
            closable={false}
            size="200px"
            onClose={onClose}
            visible={isVisible}
        >
            <Menu
                style={{
                    height: "100%",
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
                                <ProfileOutlined style={{ fontSize: "18px" }} />
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
                            <AppstoreAddOutlined style={{ fontSize: "18px" }} />
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
                            // {
                            //     label: "Ishchilar",
                            //     key: "/worker",
                            //     icon: (
                            //         <Link to="/worker">
                            //             <TeamOutlined
                            //                 style={{ fontSize: "18px" }}
                            //             />
                            //         </Link>
                            //     ),
                            // },
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
                            // {
                            //     label: "Filiallar",
                            //     key: "/branchs",
                            //     icon: (
                            //         <Link to="/branchs">
                            //             <BranchesOutlined
                            //                 style={{ fontSize: "18px" }}
                            //             />
                            //         </Link>
                            //     ),
                            // },
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
