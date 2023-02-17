import axios from "axios";

const handleGetAllBrand = async () => {
    console.log("called handleGetAllBrand");
    return axios
        .get(process.env.REACT_APP_BACKEND_URL + "/api/get_all_brand")
        .then((response) => {
            console.log("Brand data: ", response.data);
            return response.data;
        });
};

const createNewBrand = async (name, description, image) => {
    console.log("Called createNewBrand");
    let formData = new FormData();

    await formData.append("name", name);
    await formData.append("description", description);
    await formData.append("image", image);
    console.log(formData.get("image"));

    return axios
        .post(
            process.env.REACT_APP_BACKEND_URL + "/api/create_brand",
            formData,
            {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            }
        )
        .then((response) => {
            return response.data;
        });
};

const updateBrand = async (id, name, description, image) => {
    console.log("Called updateBrand");
    console.log(id, name, description, image);

    if (typeof image === "string") {
        console.log("image is string");
        return axios
            .put(process.env.REACT_APP_BACKEND_URL + "/api/update_brand", {
                id,
                name,
                description,
                image,
            })
            .then((response) => {
                return response.data;
            });
    } else {
        let formData = new FormData();

        await formData.append("id", id);
        await formData.append("name", name);
        await formData.append("description", description);
        await formData.append("image", image);
        console.log("image is file");

        return axios
            .put(
                process.env.REACT_APP_BACKEND_URL + "/api/update_brand_2",
                formData,
                {
                    headers: {
                        "Content-type": "multipart/form-data",
                    },
                }
            )
            .then((response) => {
                return response.data;
            });
    }
};

const getBrandHandler = (id) => {
    return axios
        .post(process.env.REACT_APP_BACKEND_URL + "/api/get_brand", { id })
        .then((response) => {
            return response.data;
        });
};

export { handleGetAllBrand, createNewBrand, updateBrand, getBrandHandler };
