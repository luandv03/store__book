import { Routes, Route } from "react-router-dom";
import LayoutApp from "./pages/layout.page";
import { ProductDetail } from "./components/Product/ProductDetail.component";
import Product from "./components/Product/Product.component";
import { ProductFeedback } from "./components/Product/ProductFeedback.component";
import { ProductCreate } from "./components/Product/ProductCreate.component";
import { ProductDes } from "./components/Product/ProductDes.component";
import { ProductImage } from "./components/Product/ProductImage.component";
import { ProductView } from "./components/Product/ProductView.component";
import Customer from "./components/Customer/Customer.component";
import { CustomerList } from "./components/Customer/CustomerList.component";
import { CategoryList } from "./components/Category/CategoryList.component";
import Category from "./components/Category/Category.component";
import { TopNovel } from "./components/website/TopNovel/TopNovel";
import { SearchPage } from "./components/website/SearchPage/SearchPage";
import { RegisterNovel } from "./components/website/RegisterNovel/RegisterNovel";
import { NovelDetail } from "./components/website/NovelDetail/NovelDetail";
import { NovelList } from "./components/website/NovelList/NoverList";
import { CreateChapter } from "./components/website/CreateChapter/CreateChapter";
import { CreateNovel } from "./components/website/CreateNovel/CreateNovel";
import { ChapterContent } from "./components/website/ChapterContent/ChapterContent";
import { NovelByGenre } from "./components/website/NovelByGenre/NovelByGenre";
import { AuthApp, Login, Register } from "./components/Auth";
import { ProtectedRoute } from "./providers/ProtectedRoute/ProtectedRoute";
import WebsiteLayout from "./pages/website.page";
import { NotFound } from "./components/website/NotFound/NotFound";
import AdminProvider from "./providers/AdminProvider/AdminProvider";
import { Profile } from "./components/website/Profile/Profile";
import { ProtectedAdmin } from "./providers/ProtectedAdmin/ProtectedAdmin";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<WebsiteLayout />}>
                    <Route path="/" element={<TopNovel />} />
                    <Route path="/auth" element={<AuthApp />}>
                        <Route path="/auth/login" element={<Login />} />
                        <Route path="/auth/register" element={<Register />} />
                    </Route>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/novel/view" element={<SearchPage />} />

                    <Route
                        path="/upload-novel"
                        element={
                            <ProtectedRoute>
                                <RegisterNovel />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/novel/:novel_id/detail"
                        element={<NovelDetail />}
                    />
                    <Route path="/category" element={<NovelList />} />

                    <Route
                        path="/novel/:novel_id/add_chapter"
                        element={
                            <ProtectedRoute>
                                <CreateChapter />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/novel/create/:trans_id"
                        element={
                            <ProtectedRoute>
                                <CreateNovel />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/novel/view/genre/:genre_id"
                        element={<NovelByGenre />}
                    />
                </Route>
                <Route
                    path="/novel/:novel_id/chapter/:chapter"
                    element={<ChapterContent />}
                />

                <Route
                    path="/dashboard/"
                    element={
                        <AdminProvider>
                            <LayoutApp />
                        </AdminProvider>
                    }
                >
                    <Route path="/dashboard/novel" element={<Category />}>
                        <Route
                            path="/dashboard/novel"
                            element={
                                <ProtectedAdmin>
                                    <CategoryList />
                                </ProtectedAdmin>
                            }
                        />
                    </Route>

                    <Route path="/dashboard/product" element={<Product />}>
                        <Route path="/dashboard/product" />
                        <Route
                            path="/dashboard/product/:product_id"
                            element={<ProductView />}
                        >
                            <Route
                                path="/dashboard/product/:product_id/image"
                                element={<ProductImage />}
                            />
                            <Route
                                path="/dashboard/product/:product_id/detail"
                                element={<ProductDetail />}
                            />
                            <Route
                                path="/dashboard/product/:product_id/description"
                                element={<ProductDes />}
                            />
                            <Route
                                path="/dashboard/product/:product_id/feedback"
                                element={<ProductFeedback />}
                            />
                        </Route>
                        <Route
                            path="/dashboard/product/create"
                            element={<ProductCreate />}
                        />
                    </Route>
                    <Route path="/dashboard/translator" element={<Customer />}>
                        <Route
                            path="/dashboard/translator"
                            element={
                                <ProtectedAdmin>
                                    <CustomerList />
                                </ProtectedAdmin>
                            }
                        ></Route>
                    </Route>
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
