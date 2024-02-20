import React from "react";

const Card = (props) => {
	return (
		<div className="col-lg-6 col-sm-12 p-2">
			<div className="card">
				<div className="card-body row">
					{/* Displaying Image / Cover */}
					<div className="col-5">
						<img
							src={props.cover}
							className="img"
							height="200"
							alt="Book Cover"
						/>
					</div>

					{/* Displaying description */}
					<div className="col-7">
						<h5 className="text-info">{props.judul}</h5>
						<h6 className="text-dark">Penulis: {props.penulis}</h6>
						<h6 className="text-dark">Penerbit: {props.penerbit}</h6>
						<h6 className="text-danger">Harga: Rp {props.harga}</h6>

						{/* Button to edit */}
						<button
							className="btn btn-sm btn-primary m-1"
							onClick={props.onEdit}
						>
							Edit
						</button>

						{/* Button to delete */}
						<button
							className="btn btn-sm btn-danger m-1"
							onClick={props.onDrop}
						>
							Hapus
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
