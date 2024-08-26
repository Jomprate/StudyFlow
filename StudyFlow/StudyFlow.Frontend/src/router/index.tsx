import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Countries from '../pages/Countries';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/countries" element={<Countries />} />
            </Routes>
        </BrowserRouter>
    )
};

export default Router;