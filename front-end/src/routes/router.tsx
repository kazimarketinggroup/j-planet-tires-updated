// src/router/router.ts (or wherever your router file is)

import { createBrowserRouter, Outlet } from "react-router-dom";
import MainLayout from "../Components/Layouts/MainLayout";
import Home from "../Components/Pages/Home/Home";
import About from "../Components/Pages/About/About";
import Contact from "../Components/Pages/Contact/Contact";
import News from "../Components/Pages/News/News";
import NewsDetailPage from "../Components/Pages/News/NewsDetailPage";
import Tires from "../Components/Pages/Tires/Tires";
import PcrSubTiresPage from "../Components/Pages/Tires/PcrSubTiresPage";
import TbrTiresPage from "../Components/Pages/Tires/TbrTiresPage";
import OtrTiresPage from "../Components/Pages/Tires/OtrTiresPage";
import TireDetailPage from "../Components/Pages/Tires/TireDetailPage";
import TireSizeDetailPage from "../Components/Pages/Tires/TireSizeDetailPage";
import NotFoundPage from "../Components/Pages/NotFound/NotFoundPage";
import TermsPage from "../Components/Pages/Legal/TermsPage";
import PrivacyPage from "../Components/Pages/Legal/PrivacyPage";
import WarrantyPage from "../Components/Pages/Legal/WarrantyPage";

import { AuthProvider } from "../admin/auth/AuthProvider";
import { ProtectedRoute } from "../admin/auth/ProtectedRoute";
import AdminLayout from "../admin/layout/AdminLayout";
import LoginPage from "../admin/auth/LoginPage";
import SignupPage from "../admin/auth/SignupPage";
import DashboardPage from "../admin/pages/DashboardPage";
import UsersPage from "../admin/pages/UsersPage";
import TiresListPage from "../admin/pages/TiresListPage";
import TireEditorPage from "../admin/pages/tire-editor/TireEditorPage";
import CategoriesPage from "../admin/pages/CategoriesPage";
import ImportPage from "../admin/pages/ImportPage";
import MediaLibraryPage from "../admin/pages/MediaLibraryPage";
import Exhibation from "@/Components/Pages/Exhibation/Exhibation";
import CommingSoon from "@/Components/Shared/CommingSoon";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <NotFoundPage />,
    children: [
      {
        index: true, // same as path: "/"
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "news/:newsId",
        element: <NewsDetailPage />,
      },
      {
        path: "tires",
        element: <Tires />,
      },
      {
        path: "tires/pcr-sub-tires",
        element: <PcrSubTiresPage />,
      },
      {
        path: "tires/tbr-tires",
        element: <TbrTiresPage />,
      },
      {
        path: "tires/otr-tires",
        element: <OtrTiresPage />,
      },
      {
        path: "/exhibiting-at-road-transport-expo",
        element: <Exhibation />,
      },
      {
        path: "tires/:tireId",
        element: <TireDetailPage />,
      },
      {
        path: "tires/:tireId/:sizeKey",
        element: <TireSizeDetailPage />,
      },
      {
        path: "terms",
        element: <TermsPage />,
      },
      {
        path: "privacy",
        element: <PrivacyPage />,
      },
      {
        path: "warranty",
        element: <WarrantyPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
      {
        path: "comming-soon",
        element: <CommingSoon/>
      }
    ],
  },

  {
    path: "/admin",
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      {
        element: (
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <DashboardPage /> },
          { path: "tires", element: <TiresListPage /> },
          { path: "tires/new", element: <TireEditorPage /> },
          { path: "tires/:id/edit", element: <TireEditorPage /> },
          { path: "categories", element: <CategoriesPage /> },
          { path: "import", element: <ImportPage /> },
          { path: "media", element: <MediaLibraryPage /> },
          { path: "users", element: <UsersPage /> },
        ],
      },
    ],
  },
]);
