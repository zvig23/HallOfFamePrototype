import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { db, storage } from "../../App";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Popup from "reactjs-popup";
import { Input } from "@mui/material";
import { Slide } from 'react-slideshow-image';

export interface GalleryProps {
	collectionName: string;
	createItem: Function;
	presentItem: ReactNode;
}

export const Gallery = ({ collectionName, createItem, presentItem }: GalleryProps) => {
	const [file, setFile] = useState<File>();
	const [uploadProgress, setUploadProgress] = useState(0);
	const [images, setImages] = useState<Array<string>>([]);
	const [loading, setLoading] = useState(false);
	const [uploaded, setUploaded] = useState(false);

	const [open, setOpen] = useState(false);
	const closeModal = () => setOpen(false);
	const openModal = () => setOpen(true);

	useEffect(() => {
		loadAllImages();
	}, []);

	useEffect(() => {
		if (!open) {
			setUploaded(false);
		}
	}, [open]);

	const loadAllImages = async () => {
		setLoading(true);
		const querySnapshot = await getDocs(collection(db, collectionName));
		let currImages: Array<string> = [];
		querySnapshot.forEach((doc) => {
			currImages = [...currImages, doc.data().imageUrl];
		});
		setImages(currImages);
		setLoading(false);
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

		const files = event.target.files;
		if (files != null) {
			setFile(files[0]);
		}

	};

	const handleUpload = () => {
		if (file != null) {
			const storageRef = ref(storage, `${collectionName}/${file.name}`);

			const uploadTask = uploadBytesResumable(storageRef, file);

			setUploaded(false);

			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					setUploadProgress(progress);
				},
				(error) => {
					alert(error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						const imageStoreRef = doc(db, "images", file.name);
						setDoc(imageStoreRef, {
							imageUrl: downloadURL,
						});
					});
					setUploaded(true);
				}
			);


		}
		else {
			alert("Please add the file");
		}


	};

	return (
		<div className="images-collection">
			{loading && <p>Loading gallery...</p>}
			{images &&
				<Slide>
					{images.map((imageUrl,index) => {
						return (
							<div key={index} className="image-container">
								<img src={imageUrl} />
							</div>
						);
					})}
				</Slide>
			}
			<button onClick={openModal}>Upload an Image</button>

			<Popup open={open} onClose={closeModal}>
				<Input type="file" onChange={handleChange} />
				<button onClick={handleUpload}>Save</button>
				{uploaded ? (
					<p className="success-msg">Image was uploaded successfully</p>
				) :
					<><br />{uploadProgress}</>}
			</Popup>
		</div>
	);

};