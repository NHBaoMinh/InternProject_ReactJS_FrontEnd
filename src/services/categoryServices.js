import axios from "axios";

const handleGetAllCategory = () => {
    console.log("called");
    return axios
        .get(process.env.REACT_APP_BACKEND_URL + "/api/get_all_category")
        .then((response) => {
            console.log("Category data: ", response.data);
            return response.data;
        });
};

const createNewCategory = (name, collectionID) => {
    console.log("called createNewCategory");
    return axios
        .post(process.env.REACT_APP_BACKEND_URL + "/api/create_category", {
            name,
            collectionID,
        })
        .then((response) => {
            return response.data;
        });
};

const updateCategory = (id, name) => {
    console.log("called updateCategory");
    return axios
        .put(process.env.REACT_APP_BACKEND_URL + "/api/update_category", {
            id,
            name,
        })
        .then((response) => {
            return response.data;
        });
};

export { handleGetAllCategory, createNewCategory, updateCategory };
