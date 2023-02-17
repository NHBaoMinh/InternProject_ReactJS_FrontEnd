import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext, useLayoutEffect } from "react";

import {
    Container,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Grid,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import EmailIcon from "@mui/icons-material/Email";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { getProductHandler } from "../../services/productServices.js";
import { getBrandHandler } from "../../services/brandServices.js";
import Alert from "../alert/alert.js";
import "./ProductPage.scss";
import { StoreContext, actions } from "../../store";

const ProductPage = () => {
    let { id } = useParams();
    const navigate = useNavigate();

    const [productData, setProductData] = useState(null);
    const [brandData, setBrandData] = useState(null);
    const [errCode, setErrCode] = useState(false);
    const [errMessage, setErrMessage] = useState("");

    //Global State: Cart Data
    const [state, dispatch] = useContext(StoreContext);

    //Component HTML elements:
    let qtyInputNumber =
        document.getElementsByClassName("input-group-field")[0];
    let btnMinusQTY = document.getElementsByClassName(
        "product-page__detail__btn-remove"
    )[0];
    let btnAddQTY = document.getElementsByClassName(
        "product-page__detail__btn-add"
    )[0];

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = await getProductHandler(id);
                console.log(data.data[0]);
                if (data.errCode !== 0) {
                    // window.location.reload();
                }
                await setProductData(data.data[0]);

                let brandID = productData.ProductBrand;
                let data2 = await getBrandHandler(brandID);

                if (data2.errCode !== 0) {
                    // window.location.reload();
                }
                await setBrandData(data2.data[0]);
            } catch (error) {
                console.log(error);
            }

            // return new Promise(async (resolve, reject) => {
            //     try {
            //         let data = await getProductHandler(id);
            //         console.log(data.data[0]);
            //         if (data.errCode !== 0) {
            //             // window.location.reload();
            //         }
            //         await setProductData(data.data[0]);
            //     } catch (error) {
            //         console.log(error);
            //         // await setTimeout(5000);
            //         // window.location.reload();
            //     }
            //     resolve("Yeah");
            // }).then(async () => {
            //     try {
            //         let brandID = productData.ProductBrand;
            //         let data2 = await getBrandHandler(brandID);

            //         if (data2.errCode !== 0) {
            //             // window.location.reload();
            //         }
            //         await setBrandData(data2.data[0]);
            //     } catch (error) {
            //         console.log(error);
            //         // await setTimeout(5000);
            //         // window.location.reload();
            //     }
            // });
        };
        fetchData();
    }, []);

    const plusProductHandler = () => {
        if (btnAddQTY.hasAttribute("disabled")) {
            if (btnAddQTY.getAttribute("disabled") === "true") {
                return;
            }
        }
        if (qtyInputNumber.value === "99") {
            return;
        }
        qtyInputNumber.value = (parseInt(qtyInputNumber.value) + 1).toString();
        //disable remove button
        if (qtyInputNumber.value === "1") {
            btnMinusQTY.setAttribute("disabled", "true");
            btnMinusQTY.classList.remove("product-page__detail__btn-hoverable");
        }

        //disable add button
        if (qtyInputNumber.value === "99") {
            btnAddQTY.setAttribute("disabled", "true");
            btnAddQTY.classList.remove("product-page__detail__btn-hoverable");
        }

        //active remove button
        if (qtyInputNumber.value !== "1") {
            btnMinusQTY.setAttribute("disabled", "false");
            btnMinusQTY.classList.add("product-page__detail__btn-hoverable");
        }

        //active add button
        if (qtyInputNumber.value !== "99") {
            btnAddQTY.setAttribute("disabled", "false");
            btnAddQTY.classList.add("product-page__detail__btn-hoverable");
        }
    };

    const minusProductHandler = () => {
        if (qtyInputNumber.value === "1") {
            return;
        } else {
            qtyInputNumber.value = (
                parseInt(qtyInputNumber.value) - 1
            ).toString();
            //disable remove button
            if (qtyInputNumber.value === "1") {
                btnMinusQTY.setAttribute("disabled", "true");
                btnMinusQTY.classList.remove(
                    "product-page__detail__btn-hoverable"
                );
            }

            //disable add button
            if (qtyInputNumber.value === "99") {
                btnAddQTY.setAttribute("disabled", "true");
                btnAddQTY.classList.remove(
                    "product-page__detail__btn-hoverable"
                );
            }

            //active remove button
            if (qtyInputNumber.value !== "1") {
                btnMinusQTY.setAttribute("disabled", "false");
                btnMinusQTY.classList.add(
                    "product-page__detail__btn-hoverable"
                );
            }

            //active add button
            if (qtyInputNumber.value !== "99") {
                btnAddQTY.setAttribute("disabled", "false");
                btnAddQTY.classList.add("product-page__detail__btn-hoverable");
            }
        }
    };

    const addProductHandler = () => {
        let data = {};
        data.ProductID = productData.ProductID;
        data.ProductName = productData.ProductName;
        data.ProductImg = productData.ProductImg;
        data.ProductPrice = productData.ProductPrice;
        data.ProductAvailable =
            productData.ProductAvailable ? 1 : 0;
        data.QTY = qtyInputNumber.value;
        dispatch(actions.addItem(data));
        navigate("/cart");
    };
//
    return (
        <Container className="product-page">
            {productData && (
                <>
                    <div className="product-page__title">
                        {productData.ProductName}
                    </div>
                    <div className="product-page__review">
                        <StarBorderIcon></StarBorderIcon>
                        <StarBorderIcon></StarBorderIcon>
                        <StarBorderIcon></StarBorderIcon>
                        <StarBorderIcon></StarBorderIcon>
                        <StarBorderIcon></StarBorderIcon>
                        <p>(0)</p>
                        <div
                            style={{
                                borderLeft: "1px solid #000",
                                height: "20px",
                                margin: "0 10px",
                            }}
                        ></div>
                        <Link to="/">Thêm Đánh Giá</Link>
                    </div>
                    <div className="product-page__image">
                        <img
                            src={
                                process.env.REACT_APP_BACKEND_URL +
                                productData.ProductImg
                            }
                            alt={productData.ProductName}
                        ></img>
                    </div>
                    <Grid
                        container
                        spacing={3}
                        className="product-page__detail"
                    >
                        <Grid
                            item
                            className="product-page__detail__info"
                            xs={7}
                        >
                            <p className="product-page__detail__info__about">
                                Về sản phẩm
                            </p>
                            <p className="product-page__detail__info__description">
                                {productData.ProductDescription}
                            </p>
                        </Grid>
                        <Grid
                            item
                            className="product-page__detail__action-more"
                            xs={5}
                        >
                            <Grid
                                container
                                className="product-page__detail__add"
                            >
                                <Grid
                                    item
                                    className="product-page__detail__add__price"
                                    xs={9}
                                >
                                    <p className="product-page__detail__add__price__price">
                                        {new Intl.NumberFormat().format(
                                            productData.ProductPrice
                                        )}
                                        đ
                                    </p>
                                    <div>
                                        <ShoppingCartIcon></ShoppingCartIcon>
                                        Mua ngay, trả sau{" "}
                                        <Link to="/" style={{ color: "green" }}>
                                            trả góp 0% lãi suất.
                                        </Link>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "start",
                                            alignItems: "center",
                                        }}
                                    >
                                        <p
                                            style={{
                                                margin: "0 10px 0 0",
                                                fontWeight: "600",
                                            }}
                                        >
                                            Số lượng:
                                        </p>

                                        <button
                                            className="product-page__detail__btn-remove"
                                            onClick={() => {
                                                minusProductHandler();
                                            }}
                                        >
                                            <RemoveIcon></RemoveIcon>
                                        </button>
                                        <input
                                            className="input-group-field"
                                            type="number"
                                            id="Quantity"
                                            name="quantity"
                                            value="1"
                                            min="1"
                                            max="99"
                                            readonly=""
                                        />
                                        <button
                                            className="product-page__detail__btn-add product-page__detail__btn-hoverable"
                                            onClick={() => {
                                                plusProductHandler();
                                            }}
                                        >
                                            <AddIcon></AddIcon>
                                        </button>
                                    </div>
                                </Grid>
                                <Grid
                                    itemclassName="product-page__detail__add__brand"
                                    xs={3}
                                >
                                    {brandData && (
                                        <img
                                            src={
                                                process.env
                                                    .REACT_APP_BACKEND_URL +
                                                brandData.BrandImg
                                            }
                                            alt={brandData.BrandName}
                                            style={{
                                                height: "98px",
                                                width: "98px",
                                            }}
                                        ></img>
                                    )}
                                    <Link
                                        to="/"
                                        style={{
                                            fontSize: "10px",
                                            color: "black",
                                        }}
                                    >
                                        Danh sách các thương hiệu
                                    </Link>
                                </Grid>
                                {productData.ProductAvailability === true ? (
                                    <button className="product-page__detail__more-info__notify-button">
                                        <EmailIcon></EmailIcon>Thông báo khi có
                                        hàng
                                    </button>
                                ) : (
                                    <button
                                        className="product-page__detail__more-info__add-button"
                                        onClick={() => {
                                            addProductHandler();
                                        }}
                                    >
                                        <ShoppingCartIcon></ShoppingCartIcon>
                                        Thêm vào giỏ hàng
                                    </button>
                                )}

                                {productData.ProductAvailability === true ? (
                                    <div style={{ margin: "5px 0" }}>
                                        Cần gợi ý thay thế?{" "}
                                        <Link to="/" style={{ color: "black" }}>
                                            Hãy cho chúng tôi biết!
                                        </Link>
                                    </div>
                                ) : (
                                    <div style={{ margin: "5px 0" }}>
                                        Nếu có mức giá tốt hơn?{" "}
                                        <Link to="/" style={{ color: "black" }}>
                                            Hãy cho chúng tôi biết!
                                        </Link>
                                    </div>
                                )}
                            </Grid>
                            <div className="product-page__detail__more-info">
                                {productData.ProductAvailability === true ? (
                                    <div>
                                        <div style={{ display: "flex" }}>
                                            <InventoryIcon
                                                style={{ marginRight: "10px" }}
                                            ></InventoryIcon>
                                            <p
                                                style={{
                                                    color: "red",
                                                    margin: "0",
                                                }}
                                            >
                                                Xin lỗi, sản phẩm này hiện đang
                                                hết hàng.
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <HourglassBottomIcon
                                                style={{ marginRight: "10px" }}
                                            ></HourglassBottomIcon>
                                            <p style={{ margin: "0" }}>
                                                Sản phẩm đang chờ xác nhận ngày
                                                giao hàng dự kiến. Vui lòng liên
                                                hệ với chúng tôi để đặt trước,
                                                để tìm hiểu hàng B-Stock của sản
                                                phẩm đó hoặc xem các sản phẩm
                                                thay thế.
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div
                                            style={{
                                                display: "flex",
                                                marginBottom: "5px",
                                            }}
                                        >
                                            <InventoryIcon
                                                style={{
                                                    marginRight: "10px",
                                                    color: "#af9966",
                                                }}
                                            ></InventoryIcon>
                                            <p style={{ margin: "0" }}>
                                                Còn hàng
                                            </p>
                                        </div>
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
                                                Miễn phí vận chuyển cho mọi đơn
                                                hàng
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
                                                Sản phẩm sẽ được đóng gói và
                                                chuyển đến bộ phận giao hàng sau
                                                1-2 ngày làm việc
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="product-page__detail_related"></div>
                        </Grid>
                    </Grid>
                </>
            )}
        </Container>
    );
};

export default ProductPage;
