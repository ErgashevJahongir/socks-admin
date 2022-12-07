import { useEffect, useRef, useState } from "react";
import instance from "../../Api/Axios";
import { useTheme } from "@mui/material/styles";
import {
    Badge,
    Box,
    ClickAwayListener,
    IconButton,
    List,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    Paper,
    Popper,
    Typography,
    useMediaQuery,
} from "@mui/material";

import Transitions from "../@extended/Transitions";

import { BellOutlined, CloseOutlined } from "@ant-design/icons";
import MainCard from "../MainCard";
import Iconify from "../Iconify";
import { Button, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { useData } from "../../Hook/UseData";

const avatarSX = {
    width: 36,
    height: 36,
    fontSize: "1rem",
};

const actionSX = {
    mt: "6px",
    ml: 1,
    top: "auto",
    right: "auto",
    alignSelf: "flex-start",

    transform: "none",
};

const Notification = () => {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down("md"));

    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const { user } = useData();
    const navigate = useNavigate();

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const getNotification = () => {
        instance
            .get(`api/socks/factory/notification`)
            .then((data) => {
                setData(data.data.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const iconBackColorOpen = "grey.300";
    const iconBackColor = "grey.100";
    useEffect(() => {
        if (user.roleId === 1) {
            getNotification();
        }
    }, []);

    return (
        <Box sx={{ flexShrink: 0, ml: 0.75 }}>
            <IconButton
                disableRipple
                color="secondary"
                sx={{
                    width: "30px",
                    height: "30px",
                    marginRight: "15px",
                    color: "text.primary",
                    bgcolor: open ? iconBackColorOpen : iconBackColor,
                }}
                aria-label="open profile"
                ref={anchorRef}
                aria-controls={open ? "profile-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                <Badge
                    sx={{ width: "21px", height: "27px", padding: "1px" }}
                    badgeContent={!open ? data.length : 0}
                    color="error"
                >
                    <BellOutlined />
                </Badge>
            </IconButton>
            <Popper
                placement={matchesXs ? "bottom" : "bottom-end"}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: "offset",
                            options: {
                                offset: [matchesXs ? -5 : 0, 9],
                            },
                        },
                    ],
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions type="fade" in={open} {...TransitionProps}>
                        <Paper
                            sx={{
                                width: "100%",
                                minWidth: 285,
                                maxWidth: 420,
                            }}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard
                                    title="Material eslatmalari"
                                    border={false}
                                    content={true}
                                    secondary={
                                        <IconButton
                                            size="small"
                                            onClick={handleToggle}
                                        >
                                            <CloseOutlined />
                                        </IconButton>
                                    }
                                >
                                    <List
                                        component="nav"
                                        sx={{
                                            p: 0,
                                            "& .MuiListItemButton-root": {
                                                py: 0.5,
                                                "& .MuiAvatar-root": avatarSX,
                                                "& .MuiListItemSecondaryAction-root":
                                                    {
                                                        ...actionSX,
                                                        position: "relative",
                                                    },
                                            },
                                        }}
                                    >
                                        {!data.length &&
                                            "Yangi eslatmalar yo'q"}
                                        {data.map((item) => (
                                            <ListItemButton
                                                key={item.id}
                                                style={{ padding: 0 }}
                                            >
                                                <ListItemAvatar>
                                                    <Tooltip title="Yopish">
                                                        <Button
                                                            shape="circle"
                                                            icon={
                                                                <CloseOutlined />
                                                            }
                                                            onClick={() => {
                                                                instance
                                                                    .put(
                                                                        `api/socks/factory/notification?id=${item.id}`
                                                                    )
                                                                    .then(
                                                                        (
                                                                            data
                                                                        ) =>
                                                                            getNotification()
                                                                    )
                                                                    .catch(
                                                                        (err) =>
                                                                            console.error(
                                                                                err
                                                                            )
                                                                    );
                                                            }}
                                                        />
                                                    </Tooltip>
                                                </ListItemAvatar>

                                                <ListItemText
                                                    primary={
                                                        <Typography
                                                            variant="h6"
                                                            color={item.color}
                                                        >
                                                            {item &&
                                                                item.materialName}
                                                        </Typography>
                                                    }
                                                    secondary={
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                mt: 0.5,
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                                color: "text.disabled",
                                                            }}
                                                        >
                                                            <Iconify
                                                                sx={{
                                                                    mr: 0.5,
                                                                    width: 16,
                                                                    height: 16,
                                                                }}
                                                            />
                                                            {`${item.amount} ${item.measurementName}`}
                                                        </Typography>
                                                    }
                                                />
                                            </ListItemButton>
                                        ))}
                                        <ListItemButton
                                            sx={{
                                                textAlign: "center",
                                            }}
                                            onClick={() =>
                                                navigate("/notification")
                                            }
                                        >
                                            <ListItemText
                                                primary={
                                                    <Typography
                                                        variant="h6"
                                                        color="primary"
                                                    >
                                                        View All
                                                    </Typography>
                                                }
                                            />
                                        </ListItemButton>
                                    </List>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </Box>
    );
};

export default Notification;
