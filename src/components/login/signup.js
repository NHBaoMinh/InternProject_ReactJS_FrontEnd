import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddCardIcon from "@mui/icons-material/AddCard";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./signup.scss";
import { handleSignUpAPI } from "../../services/userServices.js";

import Alert from "../alert/alert.js";

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [lastname, setLastname] = useState("");
    const [surname, setSurname] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [isError, setIsError] = useState(false);
    const [errMessage, setErrMessage] = useState("");

    const navigate = useNavigate();

    const signUpHandler = async () => {
        console.log(email, password, surname, lastname, birthDate, confirmPass);
        console.log(localStorage.getItem("LoggedIn"));
        try {
            if (password !== confirmPass) {
                setIsError(true);
                setErrMessage(
                    "Password and Confirmed Password are not matched!"
                );
                return;
            }

            let data;
            data = await handleSignUpAPI(
                email,
                password,
                surname,
                lastname,
                birthDate,
                confirmPass
            );

            if (data.errCode === 1) {
                setIsError(true);
                setErrMessage(data.message);
                return;
            }

            if (data.errCode === 0) {
                navigate("/login");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getEmail = (event) => {
        setEmail(event.target.value);
    };

    const getPassword = (event) => {
        setPassword(event.target.value);
    };

    const closeMessage = () => {
        setIsError(false);
        setErrMessage("");
    };

    return (
        <div>
            <Container className="error-container" maxWidth="lg">
                {isError === true && (
                    <Alert
                        severity="error"
                        action={closeMessage}
                        message={errMessage}
                    ></Alert>
                )}
            </Container>
            <div className="signup-page">
                <Container maxWidth="lg">
                    <Grid container>
                        <Grid
                            item
                            md={6}
                            xl={5}
                            className="signup-container"
                            style={{ backgroundColor: "#f8f8f8" }}
                        >
                            <h2>Tạo tài khoản</h2>

                            <Stack
                                style={{
                                    marginBottom: "10px",
                                    fontSize: "14px",
                                }}
                            >
                                <Stack style={{ marginBottom: "20px" }}>
                                    <label>Tên</label>
                                    <input
                                        type="text"
                                        placeholder="Tên"
                                        name="lastname"
                                        className="lastname"
                                        onChange={(event) => {
                                            setLastname(event.target.value);
                                        }}
                                    ></input>
                                </Stack>

                                <Stack style={{ marginBottom: "20px" }}>
                                    <label>Họ</label>
                                    <input
                                        type="text"
                                        placeholder="Họ"
                                        name="surname"
                                        className="surname"
                                        onChange={(event) => {
                                            setSurname(event.target.value);
                                        }}
                                    ></input>
                                </Stack>

                                <Stack style={{ marginBottom: "20px" }}>
                                    <label>Ngày sinh</label>
                                    <input
                                        type="date"
                                        name="birthDate"
                                        className="birthDate"
                                        placeholder="mm/dd/yyyy"
                                        onChange={(event) =>
                                            setBirthDate(event.target.value)
                                        }
                                    ></input>
                                </Stack>
                                <Stack style={{ marginBottom: "20px" }}>
                                    <label>Địa chỉ Email</label>
                                    <input
                                        type="text"
                                        placeholder="Địa chỉ Email"
                                        name="email"
                                        className="email"
                                        onChange={getEmail}
                                    ></input>
                                </Stack>
                                <Stack style={{ marginBottom: "20px" }}>
                                    <label>Mật khẩu</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="password"
                                        placeholder="●●●●●●●●●●"
                                        onChange={getPassword}
                                    ></input>
                                </Stack>
                                <Stack style={{ marginBottom: "20px" }}>
                                    <label>Xác nhận mật khẩu</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="password"
                                        placeholder="●●●●●●●●●●"
                                        onChange={(event) =>
                                            setConfirmPass(event.target.value)
                                        }
                                    ></input>
                                </Stack>
                                <Stack style={{ marginBottom: "20px" }}>
                                    <button
                                        className="signup-button"
                                        onClick={signUpHandler}
                                    >
                                        Tạo tài khoản
                                    </button>
                                </Stack>
                                <p
                                    style={{
                                        lineHeight: "1.5",
                                        fontSize: "14px",
                                        textAlign: "left",
                                    }}
                                >
                                    Để hoàn thành việc tạo tải khoản, bạn phải
                                    hoàn toàn đồng ý với các{" "}
                                    <Link
                                        to=""
                                        style={{
                                            color: "#af9966",
                                            textDecoration: "underline",
                                        }}
                                    >
                                        điền kiện và điều khoản
                                    </Link>{" "}
                                    của Swee Lee Vietnam.
                                </p>
                            </Stack>
                        </Grid>
                        <Grid item md={6} xl={5} className="info-container">
                            <Stack>
                                <h2>Lý do đăng ký?</h2>
                            </Stack>
                            <Stack>
                                <Stack className="info-list">
                                    <Grid container className="info-list-item">
                                        <Grid item className="info-icon">
                                            <LocalShippingIcon></LocalShippingIcon>
                                        </Grid>
                                        <Grid item sx={{ fontSize: "14px" }}>
                                            Theo dõi đơn hàng online dễ dàng
                                        </Grid>
                                    </Grid>
                                </Stack>
                                <Stack className="info-list">
                                    <Grid container className="info-list-item">
                                        <Grid item className="info-icon">
                                            <AddShoppingCartIcon></AddShoppingCartIcon>
                                        </Grid>
                                        <Grid item sx={{ fontSize: "14px" }}>
                                            Xem lịch sử mua hàng
                                        </Grid>
                                    </Grid>
                                </Stack>
                                <Stack className="info-list">
                                    <Grid container className="info-list-item">
                                        <Grid item className="info-icon">
                                            <AddCardIcon></AddCardIcon>
                                        </Grid>
                                        <Grid item sx={{ fontSize: "14px" }}>
                                            Thao tác thanh toán nhanh gọn
                                        </Grid>
                                    </Grid>
                                </Stack>
                            </Stack>
                            <Stack sx={{ marginTop: "15px" }}>
                                <p sx={{ fontSize: "14px" }}>
                                    Chưa đăng ký thành viên?
                                </p>
                            </Stack>
                            <Stack>
                                <Link to="/login">
                                    <button>Đăng nhập</button>
                                </Link>
                            </Stack>
                            <Stack>
                                <p>hoặc tiếp tục với</p>
                            </Stack>

                            <Stack>
                                <button className="bandland">
                                    Liên kết với Bandland
                                </button>
                            </Stack>

                            <Stack>
                                <a href="/" className="bandland-link">
                                    Chưa phải thành viên Bandland?
                                </a>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    );
}

export default SignUp;
