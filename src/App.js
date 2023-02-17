import "./App.scss";
import Login from "./components/login/login.js";
import SignUp from "./components/login/signup.js";
import Header from "./components/header-footer/header";
import Footer from "./components/header-footer/footer";
import MainPage from "./components/main/MainPage.js";
import AdminNavbar from "./components/manager/admin-navbar.js";
import AdminHome from "./components/manager/admin-home.js";
import CollectionPage from "./components/manager/collection&category/CollectionList";
import BrandPage from "./components/manager/brand/BrandList";
import ProductManage from "./components/manager/product/ProductManage";
import CollectionList from "./components/Collection&Brand/CollectionList";
import CollectionProduct from "./components/Collection&Brand/CollectionProduct";
import ProductPage from "./components/product/ProductPage";
import Cart from "./components/cart/Cart";

import reducer, { initState } from "./store/reducer";
import { StoreProvider } from "./store";

//Protexted for Admin only route
import Protected from "./components/manager/auth/Protected.js";

import { Route, Routes, useLocation } from "react-router-dom";
import { checkUserRoleHandler } from "./services/userServices.js";
import { useState, useEffect, useReducer } from "react";

function App() {
    const [userData, setUserData] = useState(localStorage.getItem("UserData"));
    const [acceptable, setAcceptable] = useState(false);
    const location = useLocation();

    useEffect(() => {
        async function checkLoggedIn() {
            if (!userData || userData === undefined || userData === null) {
                setAcceptable(false);
                return;
            }
            let jsonUserData = JSON.parse(userData);
            let data = await checkUserRoleHandler(jsonUserData.SessionID);

            if (data.errCode === 0) {
                setAcceptable(true);
                return;
            } else {
                setAcceptable(false);
                return;
            }
        }

        checkLoggedIn();
    }, []);

    return (
        <div className="App">
            <StoreProvider>
                {!acceptable ? <Header></Header> : <></>}
                {!acceptable ? (
                    <Routes>
                        <Route path="/" element={<MainPage />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/signup" element={<SignUp />}></Route>
                        <Route
                            path="/collections"
                            element={<CollectionList />}
                        ></Route>
                        <Route
                            path="/collections/:id"
                            element={<CollectionProduct />}
                        ></Route>
                        <Route
                            path="/product/:id"
                            element={<ProductPage />}
                        ></Route>
                        <Route path="/cart" element={<Cart />}></Route>
                    </Routes>
                ) : (
                    <></>
                )}
                {!acceptable ? <Footer></Footer> : <></>}

                {/* Admin Only */}
                {acceptable ? <AdminNavbar></AdminNavbar> : <></>}
                {acceptable ? (
                    <Routes>
                        <Route
                            path="/admin"
                            element={
                                <Protected
                                    acceptable={acceptable}
                                    children={<AdminHome></AdminHome>}
                                ></Protected>
                            }
                        ></Route>
                        <Route
                            path="/admin/products"
                            element={
                                <Protected acceptable={acceptable}>
                                    <ProductManage></ProductManage>
                                </Protected>
                            }
                        ></Route>
                        <Route
                            path="/admin/categories-collections"
                            element={
                                <Protected acceptable={acceptable}>
                                    <CollectionPage />
                                </Protected>
                            }
                        ></Route>
                        <Route
                            path="/admin/brands"
                            element={
                                <Protected
                                    acceptable={acceptable}
                                    children={<BrandPage />}
                                ></Protected>
                            }
                        ></Route>
                    </Routes>
                ) : (
                    <></>
                )}
            </StoreProvider>
        </div>
    );
}

export default App;
