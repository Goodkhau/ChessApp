import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ChessElement from "./pages/ChessAI_ModelName/ChessElement.tsx";
import Homepage from "./pages/Homepage/Homepage.tsx";


const routes = [
    {
        path: "/",
        element: <Homepage />
    },
    {
        path: "/ChessAI/:ModelName",
        element: <ChessElement />
    }
];

export default function App() {
    return (
        <RouterProvider router={createBrowserRouter(routes)} />
    );
}