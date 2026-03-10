import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ChessElement from "./ChessElement"


export default function App() {
    return (
        <BrowserRouter>
             <Routes>
                 <Route path="/" element={<ChessElement />} />
             </Routes>
        </BrowserRouter>
    );
}