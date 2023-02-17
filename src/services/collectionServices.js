import axios from "axios";

const handleGetAllCollection = () => {
    return axios
        .get(process.env.REACT_APP_BACKEND_URL + "/api/get_all_collection")
        .then((response) => {
            console.log("Collection data: ", response.data);
            return response.data;
        });
};

const createNewCollection = async (name, description, image) => {
    console.log("Called createNewCollection");
    let formData = new FormData();

    await formData.append("name", name);
    await formData.append("description", description);
    await formData.append("image", image);
    console.log(formData.get("image"));

    return axios
        .post(
            process.env.REACT_APP_BACKEND_URL + "/api/create_collection",
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

const updateCollection = async (id, name, description, image) => {
    console.log("Called updateCollection");

    if (typeof image === "string") {
        console.log("image is string");
        return axios
            .put(process.env.REACT_APP_BACKEND_URL + "/api/update_collection", {
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
        console.log(formData.get("id"));
        console.log(formData.get("image"));

        return axios
            .put(
                process.env.REACT_APP_BACKEND_URL + "/api/update_collection_2",
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

    //     axios
    //     .put(
    //         process.env.REACT_APP_BACKEND_URL + "/api/update_collection",
    //         formData,
    //         {
    //             headers: {
    //                 "Content-Type": "application/x-www-form-urlencoded",
    //             },
    //         }
    //     )
    //     .then((response) => {
    //         return response.data;
    //     });
};

const getCollectionWithIDHandler = (id) => {
    return axios
        .post(
            process.env.REACT_APP_BACKEND_URL +
                "/api/get_collection_data_with_id",
            {
                id,
            }
        )
        .then((response) => {
            return response.data;
        });
};

export {
    handleGetAllCollection,
    createNewCollection,
    updateCollection,
    getCollectionWithIDHandler,
};
