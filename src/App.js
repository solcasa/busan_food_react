import { Route, Routes } from "react-router-dom";
import Footer from "./pages/Footer";
import Header from "./pages/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import AllList from "./pages/AllList";
import GuList from "./pages/GuList";

import './css/style.scss';


const App = () => {
    const [Food, setFood] = useState([]);
    const [gu, setGu] = useState([]);
    const key = `nmPIjJ%2Bj0FufPiP6k4BLPlq3n%2B46QZN%2B6hgSINrrxqk3nNwnoHX2ynqX6Dlgr3xFeivGPus2vgmh6Ifx1vdu1g%3D%3D`
    const getData = async () => {
        const d = await axios.get(`https://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=${key}&pageNo=1&numOfRows=150&resultType=json`)
        const r = await d.data.getFoodKr.item;
        setFood(r);
        const g = r.map(it => it.GUGUN_NM);
        console.log(g);
        const gList = [...new Set(g)];
        setGu(gList);
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <Header gu={gu} />

            {
                console.log(Food)
            }
            {
                console.log()
            }
            {/* {
                Food.map(it => <li>{it.MAIN_TITLE}</li>)
            } */}


            <Routes>
                <Route path="/" element={<AllList Food={Food} />}></Route>
                <Route path="/:gu" element={<GuList Food={Food} />}></Route>
            </Routes>
            <Footer />
        </>
    )
}

export default App;