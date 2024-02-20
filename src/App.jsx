import React from "react";
import Utama from "./components/utama";
import { Link } from "react-router-dom";

function App() {
	return (
		<div>
			<Link to="/" className="btn btn-primary mr-2">
				Beranda
			</Link>
			<Link to="/tentangsaya" className="btn btn-primary mr-2">
				Tentang Saya
			</Link>
			<Link to="/card" className="btn btn-primary mr-2">
				Cards
			</Link>
			<Link to="/kontak" className="btn btn-primary">
				Kontak
			</Link>
			<Link to="/gallery" className="btn btn-primary">
				galer
			</Link>
			<hr />
			<p>
				<Utama />
			</p>
		</div>
	);
}

export default App;
