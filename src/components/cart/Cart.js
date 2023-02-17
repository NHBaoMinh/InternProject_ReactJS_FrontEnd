import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { StoreContext, actions } from "../../store";

import { Container, Grid } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CloseIcon from "@mui/icons-material/Close";

import "./Cart.scss";
import { orderProcessHandler } from "../../services/userServices";

function Cart() {
    //Global State: Cart Data
    const [state, dispatch] = useContext(StoreContext);
    console.log(state.cart);
    let totalPrice = state.cart.reduce((accumulator, object) => {
        return accumulator + object.ProductPrice * object.QTY;
    }, 0);
    const [userData, setUserData] = useState(localStorage.getItem("UserData"));
    const navigate = useNavigate();

    useEffect(() => {}, [state.cart]);

    const handleMakingOrder = async () => {
        if (!userData || userData === undefined || userData === null) {
            alert("You Are Not Logged In");
            navigate("/login");
        }
        let userInfo = JSON.parse(userData);
        if (state.cart.length === 0) {
            alert("No Items Found");
            return;
        }
        let orderData = {};
        orderData.SessionID = userInfo.SessionID;
        orderData.total = totalPrice;
        let products = structuredClone(state.cart);
        products.forEach((element) => {
            delete element.ProductImg;
            delete element.ProductAvailable;
        });
        orderData.Products = products;
        console.log(orderData);
        let resData = orderProcessHandler(orderData);
    };
    //
    const handleRemoveItemFromCart = async (productID) => {
        dispatch(actions.removeItem(productID));
    };

    return (
        <Container className="cart-container">
            <h3
                style={{
                    fontSize: "24px",
                    textAlign: "left",
                    color: "#af9966",
                    textTransform: "uppercase",
                    margin: "15px 0",
                }}
            >
                Giỏ hàng
            </h3>
            <div className="cart__miscellaneous-container">
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                    }}
                >
                    <LocalShippingIcon
                        style={{
                            marginRight: "10px",
                            color: "#af9966",
                        }}
                    ></LocalShippingIcon>
                    <p
                        style={{
                            margin: "0",
                            fontWeight: "600",
                        }}
                    >
                        Miễn phí vận chuyển cho mọi đơn hàng
                    </p>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <CalendarMonthIcon
                        style={{
                            marginRight: "10px",
                            color: "#af9966",
                        }}
                    ></CalendarMonthIcon>
                    <p
                        style={{
                            margin: "0",
                            fontWeight: "600",
                        }}
                    >
                        Sản phẩm sẽ được đóng gói và chuyển đến bộ phận giao
                        hàng sau 1-2 ngày làm việc
                    </p>
                </div>
            </div>
            <Grid container spacing={4}>
                {state.cart.length === 0 ? (
                    <h4
                        style={{
                            margin: "15px 0",
                            textAlign: "center",
                            width: "100%",
                        }}
                    >
                        Không có sản phẩm nào.
                    </h4>
                ) : (
                    <>
                        <Grid item xs={9} className="cart__table-container">
                            <table className="cart__table-product">
                                <thead
                                    style={{
                                        border: "1px solid #d6d6d4",
                                        backgroundColor: "#f4f4f2",
                                        borderRadius: "10px",
                                    }}
                                >
                                    <tr>
                                        <th>Sản phẩm</th>
                                        <th></th>
                                        <th className="cart__table-product__product-price">
                                            Giá
                                        </th>
                                        <th
                                            className="cart__table-product__product-sum"
                                            style={{
                                                textAlign: "right",
                                                marginRight: "20px",
                                            }}
                                        >
                                            <p
                                                style={{
                                                    margin: "0 20px 0 0",
                                                }}
                                            >
                                                Tổng
                                            </p>
                                        </th>
                                    </tr>
                                </thead>
                                {state.cart.map((product) => (
                                    <tbody
                                        style={{
                                            border: "1px solid #d6d6d4",
                                        }}
                                    >
                                        <tr
                                            style={{
                                                height: "145px",
                                            }}
                                        >
                                            <td
                                                style={{
                                                    width: "35%",
                                                }}
                                            >
                                                <div className="cart__table-product__product-info">
                                                    <div>
                                                        <Link
                                                            to={
                                                                "/product" +
                                                                product.ProductID
                                                            }
                                                        >
                                                            <img
                                                                style={{
                                                                    height: "108px",
                                                                    width: "108px",
                                                                }}
                                                                src={
                                                                    process.env
                                                                        .REACT_APP_BACKEND_URL +
                                                                    product.ProductImg
                                                                }
                                                                alt={
                                                                    product.ProductName
                                                                }
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div>
                                                        <div>
                                                            <Link
                                                                to={
                                                                    "/product" +
                                                                    product.ProductID
                                                                }
                                                                style={{
                                                                    textAlign:
                                                                        "left",
                                                                    textDecoration:
                                                                        "none",
                                                                    color: "black",
                                                                    lineHeight:
                                                                        "1",
                                                                }}
                                                            >
                                                                <p>
                                                                    {
                                                                        state
                                                                            .cart[0]
                                                                            .ProductName
                                                                    }
                                                                </p>
                                                            </Link>
                                                        </div>
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent:
                                                                    "space-between",
                                                                width: "100%",
                                                            }}
                                                        >
                                                            <div>
                                                                {product.ProductAvailable ? (
                                                                    <p
                                                                        style={{
                                                                            fontWeight: 500,
                                                                            fontSize:
                                                                                "13px",
                                                                            color: "green",
                                                                            padding: 0,
                                                                        }}
                                                                    >
                                                                        Có hàng
                                                                    </p>
                                                                ) : (
                                                                    <p
                                                                        style={{
                                                                            fontWeight: 500,
                                                                            fontSize:
                                                                                "13px",
                                                                            color: "red",
                                                                            padding: 0,
                                                                        }}
                                                                    >
                                                                        Hết hàng
                                                                    </p>
                                                                )}
                                                            </div>
                                                            <div
                                                                style={{
                                                                    fontWeight: 600,
                                                                    fontSize:
                                                                        "13px",
                                                                }}
                                                            >
                                                                QTY:{" "}
                                                                {product.QTY}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td width="10%"></td>
                                            <td
                                                style={{
                                                    width: "25%",
                                                }}
                                            >
                                                {product.ProductPrice}₫
                                            </td>

                                            <td
                                                style={{
                                                    width: "25%",
                                                    textAlign: "right",
                                                    color: "green",
                                                    fontWeight: "bold",
                                                    position: "relative",
                                                }}
                                            >
                                                <button
                                                    className="cart__table-product__btn-remove"
                                                    onClick={() => {
                                                        handleRemoveItemFromCart(
                                                            product.ProductID
                                                        );
                                                    }}
                                                >
                                                    <CloseIcon></CloseIcon>
                                                </button>
                                                <p
                                                    style={{
                                                        margin: "0 10px 0 0",
                                                    }}
                                                >
                                                    {product.ProductPrice *
                                                        product.QTY}
                                                    ₫
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}

                                <tfoot
                                    style={{
                                        textAlign: "right",
                                        border: "1px solid #d6d6d4",
                                        backgroundColor: "#f4f4f2",
                                    }}
                                >
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td width="35%">
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                marginTop: "15px",
                                            }}
                                        >
                                            <p
                                                style={{
                                                    padding: 0,
                                                }}
                                            >
                                                Tổng tiền &nbsp;
                                            </p>
                                            <p
                                                style={{
                                                    color: "green",
                                                    fontWeight: 600,
                                                    padding: 0,
                                                }}
                                            >
                                                {" "}
                                                {totalPrice}₫
                                            </p>
                                        </div>

                                        <p
                                            style={{
                                                fontSize: "12px",
                                                padding: 0,
                                            }}
                                        >
                                            Bao gồm thuế. Miễn phí vận chuyển
                                            cho mọi đơn hàng!
                                        </p>
                                    </td>
                                </tfoot>
                            </table>
                        </Grid>
                        <Grid item xs={3}>
                            <div className="product-cart__action-pay">
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                    }}
                                >
                                    <p
                                        style={{
                                            margin: "0",
                                        }}
                                    >
                                        Tổng tiền &nbsp;
                                    </p>
                                    <p
                                        style={{
                                            margin: "0",
                                            color: "green",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {totalPrice}₫
                                    </p>
                                </div>
                                <p
                                    style={{
                                        margin: "0",
                                        textAlign: "left",
                                        fontSize: "12px",
                                        lineHeight: "1.2",
                                    }}
                                >
                                    Bao gồm thuế. Miễn phí vận chuyển mọi đơn
                                    hàng!
                                </p>
                                <button
                                    className="product-cart__btn-payment"
                                    onClick={() => {
                                        handleMakingOrder();
                                    }}
                                >
                                    Tiến hành đặt hàng
                                </button>
                            </div>
                            <p
                                style={{
                                    textAlign: "left",
                                    lineHeight: "1.2",
                                    fontSize: "13px",
                                    margin: "20px 0",
                                }}
                            >
                                Bằng việc tiến hành kiểm tra, bạn đã đồng ý Bảo
                                Mật của chúng tôi. Bảo mật của bạn rất quan
                                trọng đối với chúng tôi. Để tìm hiểu thêm về
                                cách bảo vệ các thông tin cá nhân và thanh toán
                                của bạn, xin vui lòng tham khảo Chính Sách Bảo
                                Mật của chúng tôi
                            </p>
                        </Grid>
                    </>
                )}
            </Grid>
        </Container>
    );
}

export default Cart;
