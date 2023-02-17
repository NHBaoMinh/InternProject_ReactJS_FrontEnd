import {
    Table,
    TableCell,
    TableBody,
    TableHead,
    TableRow,
    Typography,
    Button,
    TextField,
    Modal,
    Box,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from "@mui/material/";

import { useEffect, useState } from "react";

import {
    handleGetAllProduct,
    handleCreateProduct,
} from "../../../services/productServices.js";

import { handleGetAllCategory } from "../../../services/categoryServices.js";
import { handleGetAllBrand } from "../../../services/brandServices.js";

import "./ProductManage.scss";

const ProductManage = () => {
    const [productData, setProductData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [brandData, setBrandData] = useState([]);
    const [createProductOpen, setCreateProductOpen] = useState(false);
    const [updateProductOpen, setUpdateProductOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productBrand, setProductBrand] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productImage, setProductImage] = useState("");
    const [productID, setProductID] = useState("");
    const [preview, setPreview] = useState();

    useEffect(() => {
        const fetchData = async () => {
            let brandRes, categoryRes, productRes;
            try {
                brandRes = await handleGetAllBrand();
                categoryRes = await handleGetAllCategory();
                productRes = await handleGetAllProduct(1);
                setBrandData(brandRes.data);
                setCategoryData(categoryRes.data);
                setProductData(productRes.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const compareBrand = (productBrand, data) => {
        return data.find((element) => {
            return element.BrandID === productBrand;
        });
    };
    const compareCategory = (productCategory, data) => {
        return data.find((element) => {
            return element.CategoryID === productCategory;
        });
    };

    useEffect(() => {
        if (!imageFile) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(imageFile);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [imageFile]);

    const handleCreateNewProduct = async () => {
        console.log(name, description, brand, category, imageFile, price);
        try {
            let data = await handleCreateProduct(
                name,
                description,
                brand,
                category,
                imageFile,
                price
            );

            alert(data.message);
            if (data.errCode === 0) {
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdateProduct = async () => {};

    const handleDeleteProduct = async () => {};

    const filteredCategory = (id, data) => {
        let filtered = data.filter((item) => {
            return item.CategoryID === id;
        });
        return filtered[0].CategoryName;
    };

    return (
        <div className="product-manage">
            <Button
                variant="contained"
                color="secondary"
                onClick={() => setCreateProductOpen(true)}
                sx={{ margin: "10px 0", marginLeft: "auto" }}
            >
                Create New Product
            </Button>

            <Modal
                open={createProductOpen}
                onClose={() => setCreateProductOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 800,
                        bgcolor: "background.paper",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        maxHeight: "80vh",
                        overflowY: "scroll",
                    }}
                >
                    <Typography align="center" variant="h4">
                        New Product
                    </Typography>
                    <TextField
                        label="Product Name"
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                    />
                    <TextField
                        label="Product Description"
                        multiline
                        onChange={(event) => {
                            setDescription(event.target.value);
                        }}
                    />
                    <TextField
                        label="Product Price"
                        type="number"
                        onChange={(event) => {
                            setPrice(event.target.value);
                        }}
                    />
                    <FormControl>
                        <InputLabel id="create-product-modal__select-brand__label">
                            Brand
                        </InputLabel>
                        <Select
                            labelId="create-product-modal__select-brand__label"
                            id="create-product-modal__select-brand"
                            value={brand}
                            label="Brand"
                            onChange={(event) => setBrand(event.target.value)}
                        >
                            {brandData.map((brand) => {
                                return (
                                    <MenuItem value={brand.BrandID}>
                                        {brand.BrandName}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="create-product-modal__select-category__label">
                            Category
                        </InputLabel>
                        <Select
                            labelId="create-product-modal__select-category__label"
                            id="create-product-modal__select-category"
                            value={category}
                            label="Category"
                            onChange={(event) =>
                                setCategory(event.target.value)
                            }
                        >
                            {categoryData.map((category) => {
                                return (
                                    <MenuItem value={category.CategoryID}>
                                        {category.CategoryName}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    {preview && (
                        <img
                            src={preview}
                            style={{
                                maxWidth: "200px",
                                maxHeight: "200px",
                            }}
                            alt="0"
                        ></img>
                    )}
                    <Button
                        variant="contained"
                        component="label"
                        sx={{ backgroundColor: "green", width: "200px" }}
                    >
                        Upload File
                        <input
                            type="file"
                            hidden
                            onChange={(event) => {
                                console.log(event.target.files[0]);
                                setImageFile(event.target.files[0]);
                            }}
                        />
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleCreateNewProduct}
                    >
                        Create
                    </Button>
                </Box>
            </Modal>
            <Table className="table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Product Brand</TableCell>
                        <TableCell>Product Category</TableCell>
                        <TableCell>Product Price</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {productData.map((product) => {
                        return (
                            <TableRow key={product.productID}>
                                <TableCell align="left">
                                    <Typography
                                        style={{
                                            fontSize: "13px",
                                            margin: "0px",
                                        }}
                                    >
                                        {product.ProductID}
                                    </Typography>
                                </TableCell>
                                <TableCell align="left">
                                    <Typography
                                        style={{
                                            fontSize: "13px",
                                            margin: "0px",
                                        }}
                                    >
                                        {product.ProductName}
                                    </Typography>
                                </TableCell>
                                <TableCell align="left">
                                    <Typography
                                        style={{
                                            fontSize: "13px",
                                            margin: "0px",
                                        }}
                                    >
                                        {
                                            compareBrand(
                                                product.ProductBrand,
                                                brandData
                                            ).BrandName
                                        }
                                    </Typography>
                                </TableCell>
                                <TableCell align="left">
                                    <Typography
                                        style={{
                                            fontSize: "13px",
                                            margin: "0px",
                                        }}
                                    >
                                        {
                                            compareCategory(
                                                product.ProductCategory,
                                                categoryData
                                            ).CategoryName
                                        }
                                    </Typography>
                                </TableCell>
                                <TableCell align="left">
                                    <Typography
                                        style={{
                                            fontSize: "13px",
                                            margin: "0px",
                                        }}
                                    >
                                        {product.ProductPrice}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <div className="table__action-cell">
                                        <Button
                                            variant="contained"
                                            onClick={() => {
                                                setProductName(
                                                    product.ProductName
                                                );
                                                setProductBrand(
                                                    product.ProductBrand
                                                );
                                                setProductDescription(
                                                    product.ProductDescription
                                                );
                                                setProductCategory(
                                                    product.ProductCategory
                                                );
                                                setProductImage(
                                                    product.ProductImg
                                                );
                                                setProductID(product.ProductID);
                                                setUpdateProductOpen(true);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Modal
                                            open={updateProductOpen}
                                            onClose={() =>
                                                setUpdateProductOpen(false)
                                            }
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    left: "50%",
                                                    transform:
                                                        "translate(-50%, -50%)",
                                                    width: 800,
                                                    bgcolor: "background.paper",
                                                    boxShadow:
                                                        "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                                                    p: 4,
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: "10px",
                                                }}
                                            >
                                                <Typography
                                                    align="center"
                                                    variant="h4"
                                                >
                                                    Update Collection{" "}
                                                    {productName} - ID:{" "}
                                                    {productID}
                                                </Typography>
                                                <TextField
                                                    label="Product Name"
                                                    onChange={(event) => {
                                                        setName(
                                                            event.target.value
                                                        );
                                                    }}
                                                    defaultValue={productName}
                                                />
                                                <TextField
                                                    label="Product Description"
                                                    multiline
                                                    onChange={(event) => {
                                                        setDescription(
                                                            event.target.value
                                                        );
                                                    }}
                                                    defaultValue={
                                                        productDescription
                                                    }
                                                />
                                                <FormControl>
                                                    <InputLabel id="create-product-modal__select-brand__label">
                                                        Brand
                                                    </InputLabel>
                                                    <Select
                                                        labelId="create-product-modal__select-brand__label"
                                                        id="create-product-modal__select-brand"
                                                        value={brand}
                                                        label="Brand"
                                                        onChange={(event) =>
                                                            setBrand(
                                                                event.target
                                                                    .value
                                                            )
                                                        }
                                                    >
                                                        {brandData.map(
                                                            (brand) => {
                                                                return (
                                                                    <MenuItem
                                                                        value={
                                                                            brand.BrandID
                                                                        }
                                                                    >
                                                                        {
                                                                            brand.BrandName
                                                                        }
                                                                    </MenuItem>
                                                                );
                                                            }
                                                        )}
                                                    </Select>
                                                </FormControl>
                                                <FormControl>
                                                    <InputLabel id="create-product-modal__select-category__label">
                                                        Category
                                                    </InputLabel>
                                                    <Select
                                                        labelId="create-product-modal__select-category__label"
                                                        id="create-product-modal__select-category"
                                                        value={category}
                                                        label="Category"
                                                        onChange={(event) =>
                                                            setCategory(
                                                                event.target
                                                                    .value
                                                            )
                                                        }
                                                    >
                                                        {categoryData.map(
                                                            (category) => {
                                                                return (
                                                                    <MenuItem
                                                                        value={
                                                                            category.CategoryID
                                                                        }
                                                                    >
                                                                        {
                                                                            category.CategoryName
                                                                        }
                                                                    </MenuItem>
                                                                );
                                                            }
                                                        )}
                                                    </Select>
                                                </FormControl>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "row",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                width: "49%",
                                                            }}
                                                        >
                                                            <Typography variant="h6">
                                                                Old Image (Don't
                                                                upload new one
                                                                if you Do not
                                                                wish to change):
                                                            </Typography>
                                                            <img
                                                                src={
                                                                    process.env
                                                                        .REACT_APP_BACKEND_URL +
                                                                    productImage
                                                                }
                                                                style={{
                                                                    maxWidth:
                                                                        "200px",
                                                                    maxHeight:
                                                                        "200px",
                                                                }}
                                                                alt={"0"}
                                                            ></img>
                                                        </div>
                                                        <div
                                                            style={{
                                                                width: "2%",
                                                                borderLeft:
                                                                    "1px solid #af9966",
                                                                height: "100px",
                                                                margin: "0 20px",
                                                            }}
                                                        ></div>
                                                        <div
                                                            style={{
                                                                width: "49%",
                                                            }}
                                                        >
                                                            <Typography variant="h6">
                                                                Uploaded Image
                                                                Preview:
                                                            </Typography>
                                                            {preview && (
                                                                <img
                                                                    src={
                                                                        preview
                                                                    }
                                                                    style={{
                                                                        maxWidth:
                                                                            "200px",
                                                                        maxHeight:
                                                                            "200px",
                                                                    }}
                                                                    alt={"0"}
                                                                ></img>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <Button
                                                        variant="contained"
                                                        component="label"
                                                        sx={{
                                                            backgroundColor:
                                                                "green",
                                                            width: "200px",
                                                        }}
                                                    >
                                                        Upload Files
                                                        <input
                                                            type="file"
                                                            hidden
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                console.log(
                                                                    event.target
                                                                        .files[0]
                                                                );
                                                                setImageFile(
                                                                    event.target
                                                                        .files[0]
                                                                );
                                                            }}
                                                        />
                                                    </Button>
                                                </div>

                                                <Button
                                                    variant="contained"
                                                    onClick={
                                                        handleUpdateProduct
                                                    }
                                                >
                                                    Update
                                                </Button>
                                            </Box>
                                        </Modal>

                                        <Button
                                            variant="contained"
                                            color="warning"
                                            onClick={() => {
                                                setProductID(product.ProductID);
                                                setDeleteModalOpen(true);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                        <Modal
                                            open={deleteModalOpen}
                                            onClose={() =>
                                                setDeleteModalOpen(false)
                                            }
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    left: "50%",
                                                    transform:
                                                        "translate(-50%, -50%)",
                                                    width: 800,
                                                    bgcolor: "background.paper",
                                                    boxShadow:
                                                        "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                                                    p: 4,
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: "10px",
                                                }}
                                            >
                                                <div>
                                                    <Typography variant="h4">
                                                        Cảnh báo
                                                    </Typography>
                                                </div>

                                                <div>
                                                    <Typography>
                                                        Xác nhận xóa sản phẩm
                                                        <Box
                                                            sx={{
                                                                fontWeight:
                                                                    "bold",
                                                            }}
                                                        >
                                                            {productName}
                                                        </Box>{" "}
                                                        với ID: {productID}
                                                    </Typography>
                                                </div>
                                                <div className="delete-modal__group-button">
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        onClick={
                                                            handleDeleteProduct
                                                        }
                                                    >
                                                        Delete
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        onClick={() => {
                                                            setProductID("");
                                                            setDeleteModalOpen(
                                                                false
                                                            );
                                                        }}
                                                    >
                                                        Close
                                                    </Button>
                                                </div>
                                            </Box>
                                        </Modal>
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default ProductManage;
