import React from "react";
import { Routes, Route } from "react-router-dom";
import Beranda from "./beranda";
import TentangSaya from "./tentangsaya";
import Card from "./card";
import Kontak from "./kontak";
import Gallery from "./gallery";

const Utama = () => {
	return (
		<div>
			<Routes>
				<Route exact path="/" element={<Beranda />} />
				<Route path="/tentangsaya" element={<TentangSaya />} />
				<Route path="/card" element={<Card />} />
				<Route path="/kontak" element={<Kontak />} />
				<Route path="/gallery" element={<Gallery />} />
			</Routes>
		</div>
	);
};

export default Utama;
