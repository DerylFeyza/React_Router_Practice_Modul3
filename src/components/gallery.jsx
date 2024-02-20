import React, { useState } from "react";
import $ from "jquery";
import Card from "../components/card";

const Gallery = () => {
	const [buku, setBuku] = useState([
		{
			isbn: "12345",
			judul: "Bulan",
			penulis: "Tere Liye",
			penerbit: "CV Harapan Kita",
			harga: 90000,
			cover:
				"https://leksikabookstore.com/uploads/63c1185df1f17_20230113153749-1.jpg",
		},
		{
			isbn: "12346",
			judul: "Anak Badai",
			penulis: "Tere Liye",
			penerbit: "CV Nusa Bangsa",
			harga: 80000,
			cover:
				"https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1565676381l/51497970.jpg",
		},
		{
			isbn: "54321",
			judul: "Bumi",
			penulis: "Tere Liye",
			penerbit: "CV Nusa Bangsa",
			harga: 70000,
			cover: "https://www.gramedia.com/blog/content/images/2021/04/bumi.jpg",
		},
	]);

	const [action, setAction] = useState("");
	const [isbn, setIsbn] = useState("");
	const [judul, setJudul] = useState("");
	const [penulis, setPenulis] = useState("");
	const [penerbit, setPenerbit] = useState("");
	const [harga, setHarga] = useState(0);
	const [cover, setCover] = useState("");
	const [keyword, setKeyword] = useState("");
	const [filterBuku, setFilterBuku] = useState(buku);
	const [selectedItem, setSelectedItem] = useState(null);

	const Add = () => {
		$("#modal_buku").modal("show");
		setJudul("");
		setPenulis("");
		setPenerbit("");
		setCover("");
		setHarga(0);
		setIsbn(Math.random().toString(36).substring(7));
		setAction("insert");
	};

	const Edit = (item) => {
		$("#modal_buku").modal("show");
		setIsbn(item.isbn);
		setJudul(item.judul);
		setPenulis(item.penulis);
		setPenerbit(item.penerbit);
		setCover(item.cover);
		setHarga(item.harga);
		setAction("update");
		setSelectedItem(item);
	};

	const Save = (event) => {
		event.preventDefault();
		let tempBuku = [...buku];

		if (action === "insert") {
			tempBuku.push({
				isbn,
				judul,
				penulis,
				penerbit,
				cover,
				harga,
			});
		} else if (action === "update") {
			let index = tempBuku.indexOf(selectedItem);
			tempBuku[index] = {
				isbn,
				judul,
				penulis,
				penerbit,
				cover,
				harga,
			};
		}

		setBuku(tempBuku);
		$("#modal_buku").modal("hide");
	};

	const Drop = (item) => {
		if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
			let tempBuku = [...buku];
			let index = tempBuku.indexOf(item);
			tempBuku.splice(index, 1);
			setBuku(tempBuku);
			setFilterBuku(tempBuku);
		}
	};

	const searching = (event) => {
		if (event.keyCode === 13) {
			// 13 adalah kode untuk tombol enter

			let keywords = keyword.toLowerCase();
			let tempBuku = [...buku];
			let result = tempBuku.filter((item) => {
				return (
					item.judul.toLowerCase().includes(keywords) ||
					item.penulis.toLowerCase().includes(keywords) ||
					item.penerbit.toLowerCase().includes(keywords)
				);
			});

			setFilterBuku(result);
		}
	};

	return (
		<>
			<input
				type="text"
				className="form-control my-2"
				placeholder="Pencarian"
				value={keyword}
				onChange={(ev) => setKeyword(ev.target.value)}
				onKeyDown={(ev) => searching(ev)}
			/>

			<div className="container">
				<div className="row">
					{filterBuku.map((props, index) => (
						<Card
							key={index}
							judul={props.judul}
							penulis={props.penulis}
							penerbit={props.penerbit}
							harga={props.harga}
							cover={props.cover}
							onEdit={() => Edit(props)}
							onDrop={() => Drop(props)}
						/>
					))}
					{console.log(filterBuku)}
					{console.log(keyword)}
				</div>

				<button className="btn btn-success" onClick={Add}>
					Tambah Data
				</button>

				<div className="modal" id="modal_buku">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">Form Buku</div>
							<div className="modal-body">
								<form onSubmit={Save}>
									<label>Judul Buku</label>
									<input
										type="text"
										className="form-control mb-2"
										value={judul}
										onChange={(ev) => setJudul(ev.target.value)}
										required
									/>
									<label>Penulis Buku</label>
									<input
										type="text"
										className="form-control mb-2"
										value={penulis}
										onChange={(ev) => setPenulis(ev.target.value)}
										required
									/>
									<label>Penerbit Buku</label>
									<input
										type="text"
										className="form-control mb-2"
										value={penerbit}
										onChange={(ev) => setPenerbit(ev.target.value)}
										required
									/>
									<label>Harga Buku</label>
									<input
										type="number"
										className="form-control mb-2"
										value={harga}
										onChange={(ev) => setHarga(ev.target.value)}
										required
									/>
									<label>Cover Buku</label>
									<input
										type="url"
										className="form-control mb-2"
										value={cover}
										onChange={(ev) => setCover(ev.target.value)}
										required
									/>
									<button className="btn btn-info btn-block" type="submit">
										Simpan
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Gallery;
