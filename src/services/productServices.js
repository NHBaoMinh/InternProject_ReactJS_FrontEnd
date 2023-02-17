import axios from "axios";

const handleGetAllProduct = (number) => {
    return axios
        .get(process.env.REACT_APP_BACKEND_URL + "/api/get_all_product", {
            number,
        })
        .then((response) => {
            console.log("Product data: ", response.data);
            return response.data;
        });
};

const handleCreateProduct = async (
    name,
    description,
    brand,
    category,
    image,
    price
) => {
    let formData = new FormData();
    await formData.append("description", description);
    await formData.append("brand", brand);
    await formData.append("category", category);
    await formData.append("image", image);
    await formData.append("name", name);
    await formData.append("price", price);

    return axios
        .post(
            process.env.REACT_APP_BACKEND_URL + "/api/create_product",
            formData,
            {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            }
        )
        .then((response) => {
            console.log("Product data: ", response.data);
            return response.data;
        });
};

const getProductHandler = (id) => {
    return axios
        .post(process.env.REACT_APP_BACKEND_URL + "/api/get_product_by_id", {
            id,
        })
        .then((response) => {
            console.log(response.data);
            return response.data;
        });
};

const getProductByCollectionHandler = (id, number) => {
    return axios
        .post(
            process.env.REACT_APP_BACKEND_URL +
                "/api/get_products_by_collection",
            { id, number }
        )
        .then((response) => {
            return response.data;
        });
};

const getProductByCategoryHandler = (id, number) => {};

export {
    getProductHandler,
    handleGetAllProduct,
    getProductByCollectionHandler,
    getProductByCategoryHandler,
    handleCreateProduct,
};
