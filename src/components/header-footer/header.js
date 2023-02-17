import {
    AppBar,
    Grid,
    Stack,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Input,
    InputBase,
    TextField,
    // Container
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { styled, alpha } from "@mui/material/styles";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import InputAdornment from "@mui/material/InputAdornment";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Login from "../login/login.js";
import { StoreContext } from "../../store";
import "./header.scss";

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

function Header() {
    const [UserData, setUserData] = useState(localStorage.getItem("UserData"));
    const [UserDataSurname, setUserDataSurname] = useState("");
    const [UserDataLastname, setUserDataLastname] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    let headerElement = document.getElementById("header");
    const [itemCount, setItemCount] = useState(0);
    const navigate = useNavigate();

    //Global State: Cart Data
    const [state, dispatch] = useContext(StoreContext);

    useEffect(() => {
        setItemCount(typeof state.cart.length);
        if (!UserData || UserData === undefined || UserData === null) {
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
            const jsonUserData = JSON.parse(UserData);
            setUserDataSurname(jsonUserData.UserSurname);
            setUserDataLastname(jsonUserData.UserLastname);
        }
    }, []);

    useEffect(() => {
        setItemCount(state.cart.length);
    }, [state.cart]);

    console.log(state.cart);

    const myFunction = () => {
        if (window.pageYOffset !== 0) {
            headerElement.setAttribute("position", "fixed");
        } else {
            headerElement.setAttribute("position", "sticky");
        }
    };

    document.onscroll = function () {
        myFunction();
    };

    const handleClickSearchButton = () => {
        console.log("Search Button Clicked");
    };

    const trigger = useScrollTrigger();

    const handleLogout = async () => {
        await localStorage.removeItem("UserData");
        navigate("/");
    };

    return (
        <AppBar
            id="header"
            maxWidth="xl"
            sx={{ marginBottom: "10" }}
            position={!trigger ? "sticky" : "fixed"}
        >
            <Container
                className="container-header"
                maxWidth="lg"
                sx={{ height: 80 }}
            >
                <Toolbar sx={{ height: "100%" }}>
                    <Container
                    // sx={{
                    //     width: "100%",
                    //     display: "flex",
                    //     flexDirection: "row",
                    //     alignItems: "center",
                    // }}
                    >
                        <Row>
                            <Col xl={3}>
                                <Link to="/">
                                    <img
                                        src="https://cdn.shopify.com/s/files/1/0020/5111/2996/t/46/assets/logo.svg?v=39879060081588443481675238149"
                                        alt="Sweelee VietNam"
                                    ></img>
                                </Link>
                            </Col>

                            <Col
                                xl={6}
                                // sx={{minHeight: "100%", width: "55%"}}
                            >
                                {/* <TextField
                                placeholder="Search"
                                className="search-input"
                                sx={{ padding: 0 }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Button>
                                                <SearchIcon
                                                    onClick={
                                                        handleClickSearchButton
                                                    }
                                                    className="search-icon"
                                                ></SearchIcon>
                                            </Button>
                                        </InputAdornment>
                                    ),
                                    style: {},
                                }}
                                inputProps={{
                                    style: {
                                        padding: "5px 16px 5px 20px",
                                        width: 414,
                                        height: 28,
                                    },
                                }}
                            ></TextField> */}
                                <Box
                                    className="search-unit"
                                    sx={{
                                        width: "fit-content",
                                        height: "fit-content",
                                    }}
                                >
                                    <InputBase
                                        className="search-input"
                                        placeholder="Tìm kiếm sản phẩm hoặc thương hiệu"
                                        sx={{
                                            width: "414px",
                                            padding: "5px 40px 5px 20px",
                                        }}
                                    ></InputBase>
                                    <Button onClick={handleClickSearchButton}>
                                        <SearchIcon className="search-icon"></SearchIcon>
                                    </Button>
                                </Box>
                            </Col>

                            <Col
                                xl={3}
                                className="user-action"
                                // sx={{minHeight: "100%", width: "25%"}}
                            >
                                <Link to="/signup">Đăng ký</Link>
                                <Link to="/contact">Liên hệ</Link>
                                <Link to="/account" className="account-nav">
                                    Tài khoản
                                    <ArrowDropDownIcon></ArrowDropDownIcon>
                                    {!isLoggedIn ? (
                                        <div className="account-nav-item">
                                            <div className="account-nav-greet">
                                                Xin chào
                                            </div>
                                            <div className="account-nav-list">
                                                <ul>
                                                    <li>
                                                        <Link to="/login">
                                                            Đăng nhập
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/signup">
                                                            Tạo tài khoản
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="account-nav-item">
                                            <div className="account-nav-greet">
                                                Xin chào{" "}
                                                {UserDataSurname +
                                                    " " +
                                                    UserDataLastname}
                                            </div>
                                            <div className="account-nav-list">
                                                <ul>
                                                    <li>
                                                        <Link to="/">
                                                            Thông tin tài khoản
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <button
                                                            onClick={() =>
                                                                handleLogout()
                                                            }
                                                            style={{
                                                                backgroundColor:
                                                                    "white",
                                                                border: "none",
                                                                padding: "0",
                                                                "&::hover": {
                                                                    color: "#af9966",
                                                                },
                                                            }}
                                                        >
                                                            Thoát
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </Link>
                                <Link to="/cart" className="shopping-cart">
                                    <ShoppingCartIcon className="shopping-icon"></ShoppingCartIcon>
                                    {itemCount}
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                </Toolbar>
            </Container>
            <Container
                className="nav-container p-0"
                style={{ maxWidth: "1185px" }}
            >
                <ul>
                    <li>
                        <Link to="">Có gì mới</Link>
                    </li>
                    <li>
                        <Link to="">Specials</Link>
                    </li>
                    <li>
                        <Link to="">Thương hiệu</Link>
                    </li>
                    <li>
                        <Link to="/collections">Sản phẩm</Link>
                    </li>
                    <li>
                        <Link to="">Trải nghiệm tại Swee lee</Link>
                    </li>
                    <li>
                        <Link to="">Thông tin chung</Link>
                    </li>
                </ul>
            </Container>
        </AppBar>
    );
}

export default Header;
