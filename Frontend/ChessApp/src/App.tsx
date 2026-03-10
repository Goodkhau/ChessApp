import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./Homepage"
import ChessElement from "./ChessElement"


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/Chess/:modelName" element={<ChessElement />} />
            </Routes>
        </BrowserRouter>
    );
}