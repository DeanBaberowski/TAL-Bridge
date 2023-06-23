import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import './styles.scss'

function EmployeeDetail({ files, setFiles, removeFile }) {

    const uploadHandler = (event) => {
        const file = event.target.files[0];
        file.isUploading = true;
        setFiles([...files, file])

        //upload files
        const formData = new FormData();
        formData.append(
            file.name,
            file,
            file.name
        )

        axios.post('http://localhost:8081/uu', formData)
            .then(res => {
                file.isUploading = false;
                setFiles([...files, file])
            })
            .catch(err => {
                console.log(err)
                removeFile(file.name)
            });
    }


    const { id } = useParams();
    const navigate = useNavigate()
    const [customer, setCustomer] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/get/' + id)
            .then(res => setCustomer(res.data.Result[0]))
            .catch(err => console.log(err));
    })
    const handleLogout = () => {
        axios.get('http://localhost:8081/logout')
            .then(res => {
                navigate('/start')
            }).catch(err => console.log(err));
    }

    const [selectedFiles, setSelectedFiles] = useState([]);
    // const handleFileChange = (e) => {
    //     setSelectedFiles([...e.target.files]);
    // };
    // const handleUpload = async () => {
    //     if (selectedFiles.length === 0) {
    //         alert('Please select files first');
    //         return;
    //     }
    //     const formData = new FormData();
    //     selectedFiles.forEach((file) => {
    //         formData.append('files', file);
    //     });
    //     try {
    //         // Replace this URL with your server-side endpoint for handling file uploads
    //         const response = await fetch('http://localhost:8081/create', {
    //             method: 'POST',
    //             body: formData,
    //         });
    //         if (response.ok) {
    //             alert('Files uploaded successfully');
    //         } else {
    //             alert('Failed to upload the files');
    //         }
    //     } catch (error) {
    //         console.error('Error while uploading the files:', error);
    //         alert('Error occurred while uploading the files');
    //     }
    // };

    return (
        <>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <a href="/" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                                <span className="fs-5 fw-bolder d-none d-sm-inline">Customer Dashboard</span>
                            </a>
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                <li>
                                    <Link to="/" data-bs-toggle="collapse" className="nav-link text-white px-0 align-middle">
                                        <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span> </Link>
                                </li>
                                <li>
                                    <Link to="/customer" className="nav-link px-0 align-middle text-white">
                                        <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Manage Uploads</span> </Link>
                                </li>
                                <li>
                                    <Link to="profile" className="nav-link px-0 align-middle text-white">
                                        <i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Profile</span></Link>
                                </li>
                                <li onClick={handleLogout}>
                                    <a href="#" className="nav-link px-0 align-middle text-white">
                                        <i className="fs-4 bi-power"></i> <span className="ms-1 d-none d-sm-inline">Logout</span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col p-0 m-0">
                        <div className='p-2 d-flex justify-content-center shadow'>
                            <h4>Welcome {customer.name}</h4>
                        </div>
                        <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
                            <h2>Please Upload Your Files here</h2>
                            {/* <input type="file" multiple onChange={handleFileChange} />
                            <button className='btn btn-success btn-' onClick={handleUpload}>Upload</button> */}
                            <div className='file-card'>
                                <div className='file-inputs'>
                                    <input type="file" onChange={uploadHandler} />
                                    <button>
                                        <i class="bi bi-plus-square"></i>
                                        Upload
                                    </button>
                                </div>
                                <p className='main'>Supported Files</p>
                                <p className='info'>PDF, JPG, PNG</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployeeDetail