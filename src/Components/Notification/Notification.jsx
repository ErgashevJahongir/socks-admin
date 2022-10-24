import { useEffect, useRef, useState } from "react";
import instance from "../../Api/Axios";
// material-ui
import { useTheme } from "@mui/material/styles";
import {
    Avatar,
    Badge,
    Box,
    ClickAwayListener,
    Divider,
    IconButton,
    List,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    Paper,
    Popper,
    Typography,
    useMediaQuery,
} from "@mui/material";

// project import
import Transitions from "../@extended/Transitions";

// assets
import {
    BellOutlined,
    CloseOutlined,
    GiftOutlined,
    MessageOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import MainCard from "../MainCard";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { nullFormat } from "numeral";
import Iconify from "../Iconify";

// sx styles
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

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const Notification = () => {
    const Arr = [];
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down("md"));

    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [showCount, setShowCount] = useState(false);
    const [messageCount, setMessageCount] = useState(0);
    const [show, setShow] = useState(false);
    const [raedIndex, setReadIndex] = useState(0);
    const [badge, setBadge] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
        setBadge(null);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const getNotification = () => {
        setLoading(true);
        instance
            .get(`api/socks/factory/notification/list`)
            .then((data) => {
                setData(data.data.data);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => setLoading(false));
    };

    const iconBackColorOpen = "grey.300";
    const iconBackColor = "grey.100";
    useEffect(() => {
        getNotification();
        Arr.push(...data);
        setBadge(Arr.length);
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
                    badgeContent={!open ? badge : (Arr.length = 0)}
                    color="error"
                >
                    {/* <NotificationBadge
                        count={data?.length}
                        effect={Effect.SCALE}
                    /> */}
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
                                // boxShadow: theme.customShadows.z1,
                                width: "100%",
                                minWidth: 285,
                                maxWidth: 420,
                                [theme.breakpoints.down("md")]: {
                                    maxWidth: 285,
                                },
                            }}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard
                                    title="Notification socks"
                                    elevation={0}
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
                                            paddingLeft: "15px",
                                            paddingRight: "15px",
                                        }}
                                    >
                                        {!data.length && "No New Message"}
                                        {data.map((item) => (
                                            <ListItemButton
                                                sx={{
                                                    padding: "10px !important",
                                                    // bgcolor: item ? item.color : 0,
                                                }}
                                                key={item.id}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar
                                                        sx={{
                                                            color: "success.main",
                                                            color: item
                                                                ? item.color
                                                                : 0,
                                                        }}
                                                    >
                                                        <MessageOutlined />
                                                    </Avatar>
                                                </ListItemAvatar>

                                                <ListItemText
                                                    primary={
                                                        <Typography variant="h6">
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
                                                                icon="eva:clock-outline"
                                                                sx={{
                                                                    mr: 0.5,
                                                                    width: 16,
                                                                    height: 16,
                                                                }}
                                                            />
                                                            {
                                                                item.measurementName
                                                            }
                                                        </Typography>
                                                    }
                                                />
                                            </ListItemButton>
                                        ))}
                                        <Divider />
                                        <ListItemButton
                                            sx={{
                                                textAlign: "center",
                                                py: `${12}px !important`,
                                                padding: "8px !important",
                                            }}
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

// import React, { useState, useEffect, useRef } from "react";
// import PropTypes from "prop-types";

// import Overlay from "react-bootstrap/Overlay";
// import Popover from "react-bootstrap/Popover";
// import Button from "react-bootstrap/Button";

// import moment from "moment";

// import { reactLocalStorage } from "reactjs-localstorage";

// import { Bell, BookOpen, AlertTriangle } from "react-feather";
// // import NotifyMe from "react-notification-timeline";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Notification.css";

// const Notification = (props) => {
//     moment.locale(navigator.languages[0].toLowerCase());

//     // State variabls
//     const [showCount, setShowCount] = useState(false);
//     const [messageCount, setMessageCount] = useState(0);
//     const [show, setShow] = useState(false);
//     const [target, setTarget] = useState(null);
//     const [raedIndex, setReadIndex] = useState(0);

//     // Useref for the overlay
//     const ref = useRef(null);

//     // Props passed to the component
//     const data = props.data;
//     const storageKey = props.storageKey || 'notification_timeline_storage_id';
//     const key = props.notific_key;
//     const notificationMsg = props.notific_value;
//     const sortedByKey = props.sortedByKey;
//     const heading = props.heading || 'Notifications';
//     const bellSize = props.size || 32;
//     const theme = props.theme || {color:'yellow',backgroundColor:'#282828'};
//     const multiLineSplitter = props.multiLineSplitter || '\n';
//     const showDate = props.showDate || false;
//     const Icon = props.icon || Bell;

//     useEffect(() => {
//         if (!sortedByKey) {
//             data.sort((a, b) => b[key] - a[key]);
//         }

//         // We read if any last read item id is in the local storage
//         let readItemLs = reactLocalStorage.getObject(storageKey);
//         let readMsgId = Object.keys(readItemLs).length > 0 ? readItemLs['id'] : '';

//         // if the id found, we check what is the index of that message in the array and query it. If not found,
//         // nothing has been read. Hence count should be same as all the message count.
//         let readIndex = (readMsgId === '') ? data.length : data.findIndex(elem => elem[key] === readMsgId);

//         // if the id is not found, it all flushed out and start again
//         readIndex = readIndex === -1 &&  data.length;

//         setReadIndex(readIndex);

//         // If there are messages and readIndex is pointing to at least one message, we will show the count bubble.
//         (data.length && readIndex) > 0 ? setShowCount(true) : setShowCount(false);
//         setMessageCount(readIndex);
//     }, [data]);

//     // Handle the click on the notification bell
//     const handleClick = (event) => {
//         setShow(!show);
//         setTarget(event.target);
//     }

//     // Calculate the day diff
//     const getDayDiff = timestamp => {
//         let a = moment();
//         let b = moment(timestamp);
//         let diff = a.diff(b, 'year');
//         if (diff === 0) {
//             diff = a.diff(b, 'month');
//             if (diff === 0) {
//                 diff = a.diff(b, 'days');
//                 if (diff === 0) {
//                     diff = a.diff(b, 'hour');
//                     if (diff === 0) {
//                         diff = a.diff(b, 'minute');
//                         if (diff === 0) {
//                             diff = a.diff(b, 'second');
//                             return `${diff} second(s) before`;
//                         } else {
//                             return `${diff} minute(s) before`;
//                         }
//                     } else {
//                         return `${diff} hour(s) before`;
//                     }
//                 } else {
//                     return `${diff} days(s) before`;
//                 }
//             } else {
//                 return `${diff} month(s) before`;
//             }
//         } else {
//             return `${diff} year(s) before`;
//         }
//     };

//     const getWhen = timestamp => {
//         let when = `${moment(timestamp).format('L')} ${moment(timestamp).format('LTS')}`;
//         return when;
//     }

//     // Get the notification message
//     const getContent = message => {
//         if (message.indexOf(multiLineSplitter) >= 0) {
//             let splitted = message.split(multiLineSplitter);
//             let ret = '<ul>';

//             for (let i = 0; i <= splitted.length - 1; i++) {
//                 if (splitted[i] !== '') {
//                     ret = ret + '<li>' + splitted[i] + '</li>';
//                 }
//             }

//             ret = ret + '</ul>';
//             return {
//                 __html: ret
//             };
//         }
//         return {
//             __html: `<ul><li>${message}</li></ul>`
//         };
//     };

//     // Hide the notification on clicking outside
//     const hide = () => {
//         setShow(false);
//     }

//     // Call the function when mark as read link is clicked
//     const markAsRead = () => {
//         setShowCount(false);
//         reactLocalStorage.setObject(storageKey, { 'id': data[0][key] });
//         setReadIndex(0);
//     }

//     return (
//         <>
//             <div className="notification-container">
//                 <div className={`notification ${showCount ? 'notify show-count' : 'notify'}`}
//                     style={{backgroundColor:theme.backgroundColor}}
//                     data-count={messageCount}
//                     onClick={event => handleClick(event)}>
//                     <Icon color={theme.color} size={bellSize} />
//                 </div>
//             </div>

//             <div ref={ref}>
//                 <Overlay
//                     show={show}
//                     target={target}
//                     placement="bottom"
//                     container={ref.current}
//                     containerPadding={20}
//                     rootClose={true}
//                     onHide={hide}
//                 >
//                     <Popover id="popover-contained">
//                         <Popover.Title as="h3">{heading}</Popover.Title>
//                         <Popover.Content style={{ padding: '3px 3px' }}>
//                             {showCount && <div>
//                                 <Button variant="link" onClick={props.markAsReadFn || markAsRead}>
//                                     <BookOpen size={24} />
//                                     Mark all as read
//                                 </Button>
//                             </div>
//                             }
//                             <ul className="notification-info-panel">
//                                 {
//                                     data.length > 0 ?

//                                     data.map((message, index) =>
//                                         <li
//                                             className={index < raedIndex ? 'notification-message unread' : 'notification-message'}
//                                             key={index}>
//                                             <div className="timestamp">
//                                                 <span>{getDayDiff(message[key])}</span>
//                                                 {showDate && <span>{' ('}{getWhen(message[key])}{')'}</span>}
//                                             </div>
//                                             <div className="content" dangerouslySetInnerHTML={getContent(message[notificationMsg])} />
//                                         </li>
//                                     ) :
//                                     <>
//                                         <AlertTriangle color='#000000' size={32} />
//                                         <h5 className="nodata">No Notifications found!</h5>
//                                     </>
//                                 }
//                             </ul>
//                         </Popover.Content>
//                     </Popover>
//                 </Overlay>
//             </div>
//         </>
//     )
// };

// Notification.propTypes  = {
//     storageKey: PropTypes.string,
//     notific_key: PropTypes.string.isRequired,
//     data: PropTypes.array.isRequired,
//     notific_value: PropTypes.string.isRequired,
//     sortedByKey: PropTypes.bool,
//     theme: PropTypes.shape({
//         color: PropTypes.string,
//         backgroundColor: PropTypes.string
//     }),
//     size: PropTypes.string,
//     heading: PropTypes.string,
//     multiLineSplitter: PropTypes.string,
//     showDate: PropTypes.bool,
//     markAsReadFn: PropTypes.func,
//     icon: PropTypes.func
// }

// export default Notification;
