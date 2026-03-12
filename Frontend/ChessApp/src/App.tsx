import { BrowserRouter, Route, Routes } from "react-router-dom";

import ChessElement from "./ChessElement";
import Homepage from "./Homepage";


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