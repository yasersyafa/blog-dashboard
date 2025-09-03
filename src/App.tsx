import { createBrowserRouter, RouterProvider } from "react-router";
import DashboardLayout from "./layouts/dashboard-layout";
import DashboardPage from "./pages/admin/page";
import TagsPage from "./pages/admin/tags/page";
import CategoriesPage from "./pages/admin/categories/page";
import PostsPage from "./pages/admin/posts/page";
import CreatePostPage from "./pages/admin/posts/create";
import TextEditor from "./components/tiptap/editor";

export default function App() {
  const router = createBrowserRouter([
    {
      index: true,
      element: <TextEditor />,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <DashboardPage />,
        },
        {
          path: "/dashboard/posts",
          element: <PostsPage />,
        },
        {
          path: "/dashboard/posts/create",
          element: <CreatePostPage />,
        },
        {
          path: "/dashboard/tags",
          element: <TagsPage />,
        },
        {
          path: "/dashboard/categories",
          element: <CategoriesPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
