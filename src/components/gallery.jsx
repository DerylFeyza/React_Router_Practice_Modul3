import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
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
	const [showModal, setShowModal] = useState(false);

	const Add = () => {
		setShowModal(true);
		setJudul("");
		setPenulis("");
		setPenerbit("");
		setCover("");
		setHarga(0);
		setIsbn(Math.floor(Math.random() * 900000) + 100000);
		setAction("insert");
	};

	const Edit = (item) => {
		setShowModal(true);
		setIsbn(item.isbn);
		setJudul(item.judul);
		setPenulis(item.penulis);
		setPenerbit(item.penerbit);
		setCover(item.cover);
		setHarga(item.harga);
		setAction("update");
		setSelectedItem(item);
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

	const handleSave = (e) => {
		e.preventDefault();
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
				...tempBuku[index],
				isbn,
				judul,
				penulis,
				penerbit,
				cover,
				harga,
			};
		}

		setBuku(tempBuku);
		setFilterBuku(tempBuku);
		setShowModal(false);
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

				<Modal show={showModal}>
					<Modal.Header>
						<Modal.Title>Data Buku</Modal.Title>
					</Modal.Header>
					<Form onSubmit={(e) => handleSave(e)}>
						<Modal.Body>
							<Form.Group className="mb-3" controlId="isbn">
								<Form.Label>ISBN</Form.Label>
								<Form.Control
									type="text"
									name="isbn"
									readOnly
									value={isbn}
									onChange={(ev) => setIsbn(ev.target.value)}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="judul">
								<Form.Label>Judul</Form.Label>
								<Form.Control
									type="text"
									name="judul"
									placeholder="masukkan judul"
									value={judul}
									onChange={(ev) => setJudul(ev.target.value)}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="penulis">
								<Form.Label>Penulis</Form.Label>
								<Form.Control
									type="text"
									name="penulis"
									placeholder="masukkan penulis"
									value={penulis}
									onChange={(ev) => setPenulis(ev.target.value)}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="penerbit">
								<Form.Label>Penerbit</Form.Label>
								<Form.Control
									type="text"
									name="penerbit"
									placeholder="masukkan penerbit"
									value={penerbit}
									onChange={(ev) => setPenerbit(ev.target.value)}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="harga">
								<Form.Label>Harga</Form.Label>
								<Form.Control
									type="number"
									name="harga"
									placeholder="masukkan harga"
									value={harga}
									onChange={(ev) => setHarga(ev.target.value)}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="cover">
								<Form.Label>Cover</Form.Label>
								<Form.Control
									type="url"
									name="cover"
									placeholder="masukkan link cover"
									value={cover}
									onChange={(ev) => setCover(ev.target.value)}
								/>
							</Form.Group>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={() => setShowModal(false)}>
								Close
							</Button>

							<Button variant="primary" type="submit">
								Save
							</Button>
						</Modal.Footer>
					</Form>
				</Modal>
			</div>
		</>
	);
};

export default Gallery;
