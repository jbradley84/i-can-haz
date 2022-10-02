

// import React, {useState} from "react";
// import Axios from "axios";
// // const url = "https://api.cloudinary.com/v1_1/dgbv72kqf/image/upload";
// const Upload = () => {
//     const [selectedImage, setSelectedImage] = useState('');
//     const [preveiwSrc, setPreviewSrc] = useState('');

//     const uploadImage = () => {
//         const formData = new FormData();
//         formData.append("file", selectedImage);
//         formData.append("upload_preset", "collectaur");
//         console.log(formData);

//         fetch(`https://api.cloudinary.com/v1_1/dgbv72kqf/image/upload`, {
//             method: 'POST',
//             body: formData,
//         })
//         .then((response)=> {
//             return response.json();
//         })
//     };
//     const uploadFile = async (e) => {
//         const files = e.target.files;
//         const data = new FormData();
//         data.append('file', files[0]);
//         data.append('upload_preset', 'collectaur');
//         const res = await fetch('https://api.cloudinary.com/v1_1/dgbv72kqf/image/upload', {
//           method: 'POST',
//           body: data
//         });
//         const file = await res.json();
//         console.log(file);
//         this.setState({
//           image: file.secure_url
//         })
//       }

//     const imagePreview = (selectedImage) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(selectedImage);
//         reader.onloadend = () => {
//             setPreviewSrc(reader.result);
//         }
//     };

//     const handleImageInputChange = (e) => {
//         const imageFile = e.target.files[0];
//         setSelectedImage(imageFile);
//         imagePreview(imageFile);
//         console.log(imageFile);
//         console.log(selectedImage);

//     };


//     return(
//         <div>
//             <form>
//                 <input type="file" onChange={(e) => {setSelectedImage(e.target.files[0])}}></input>
//                 <button onClick={uploadFile}>Upload Image</button>
//             </form>
//             {preveiwSrc && (
//                 <img src={preveiwSrc} alt="preview" ></img>
//                 )}
//         </div>
//     )
// };

// export default Upload;