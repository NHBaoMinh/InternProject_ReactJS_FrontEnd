import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Container,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Grid,
    IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import SwapVertIcon from "@mui/icons-material/SwapVert";
//
import ProductCard from "./ProductCard.js";

function ProductList(props) {
    const theme = createTheme({
        spacing: 4,
    });

    const [productData, setProductData] = useState(props.data);

    useEffect(() => {
        setProductData(props.data);
    }, [props.data]);

    return (
        <Container disableGutters sx={{ margin: "10px 0" }}>
            {productData.length === 0 ? (
                <h3>
                    Hiện tại chưa có sản phẩm nào, xin hãy thử các loại sản phẩm
                    khác.
                </h3>
            ) : (
                <Grid container>
                    <Grid item xs={3} className="product-side-selection">
                        <Accordion sx={{ boxShadow: "none", margin: "10px 0" }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls=""
                                id=""
                                sx={{
                                    border: "1px solid #d3d3d3",
                                    borderRadius: "3px",
                                    color: "#0a0a0a",
                                    background: "#f8f8f8",
                                }}
                            >
                                <Typography
                                    sx={{
                                        textTransform: "uppercase",
                                        fontSize: "14px",
                                    }}
                                >
                                    Tình trạng
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    padding: "0",
                                    textAlign: "left",
                                    marginTop: "5px",
                                    display: "flex",
                                    flexDirection: "row",
                                }}
                            >
                                <input type="checkbox" />
                                <p
                                    style={{
                                        fontSize: "13px",
                                        margin: "0 0 0 10px",
                                        padding: "0",
                                        alignItems: "center",
                                    }}
                                >
                                    Không bao gồm sản phẩm hết hàng
                                </p>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion sx={{ boxShadow: "none", margin: "10px 0" }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls=""
                                id=""
                                sx={{
                                    border: "1px solid #d3d3d3",
                                    borderRadius: "3px",
                                    color: "#0a0a0a",
                                    background: "#f8f8f8",
                                }}
                            >
                                <Typography
                                    sx={{
                                        textTransform: "uppercase",
                                        fontSize: "14px",
                                    }}
                                >
                                    Thương hiệu
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Suspendisse malesuada lacus
                                    ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid className="product-list" item container xs={9}>
                        <Grid clasName="info-sort-option" item container>
                            <Grid
                                item
                                container
                                xs={5}
                                sx={{ fontSize: "11px" }}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <p style={{ margin: "0" }}>
                                    Trang 1 | <b>1-54 trong số (54)</b> kết quả
                                    hiển thị theo từ khoá tìm kiếm
                                </p>
                            </Grid>
                            <Grid
                                item
                                container
                                xs={5}
                                direction="row"
                                justifyContent="right"
                                alignItems="center"
                            >
                                <p style={{ margin: "0 10px 0 0" }}>
                                    Sắp xếp theo
                                </p>
                                <div
                                    className="selection-sort-container"
                                    style={{
                                        border: "1px solid #d3d3d3",
                                        borderRadius: "5px",
                                        padding: "5px 10px",
                                    }}
                                >
                                    <SwapVertIcon></SwapVertIcon>
                                    <select
                                        name="cars"
                                        id="cars"
                                        className="selection-sort-product"
                                        style={{
                                            fontWeight: "600",
                                            border: "none",
                                            paddingLeft: "20px",
                                            "&::-ms-expand": {
                                                display: "none",
                                            },
                                        }}
                                    >
                                        <option
                                            value=""
                                            selected
                                            disabled
                                            hidden
                                        >
                                            Sản phẩm cùng loại
                                        </option>
                                        <option value="lowest">
                                            Giá thấp nhất
                                        </option>
                                        <option value="highest">
                                            Giá cao nhất
                                        </option>
                                        <option value="newest">Hàng mới</option>
                                        <option value="most_loved">
                                            Được yêu thích
                                        </option>
                                    </select>
                                </div>
                            </Grid>
                            <Grid
                                item
                                container
                                spacing={1}
                                xs={2}
                                justifyContent="right"
                                alignItems="center"
                            >
                                <Grid item>
                                    <IconButton
                                        sx={{
                                            color: "#af9966",
                                            border: "1px solid #d3d3d3",
                                            borderRadius: "5px",
                                            background: "#f8f8f8",
                                            padding: "4px",
                                        }}
                                    >
                                        <ViewModuleIcon></ViewModuleIcon>
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <IconButton
                                        sx={{
                                            color: "#af9966",
                                            border: "1px solid #d3d3d3",
                                            borderRadius: "5px",
                                            background: "#f8f8f8",
                                            padding: "4px",
                                        }}
                                    >
                                        <ViewListIcon></ViewListIcon>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            container
                            spacing={3}
                            sx={{
                                marginTop: 1,
                                marginBottom: 15,
                                marginLeft: "5px",
                            }}
                        >
                            {productData.map((element) => (
                                <Grid item>
                                    <Link
                                        to={"/product/" + element.ProductID}
                                        style={{
                                            textDecoration: "none",
                                            height: 360,
                                        }}
                                    >
                                        <ProductCard
                                            name={element.ProductName}
                                            price={element.ProductPrice}
                                            image={element.ProductImg}
                                            available={element.ProductAvailable}
                                        ></ProductCard>
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
}

export default ProductList;
