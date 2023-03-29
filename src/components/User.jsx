import './../style/style.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteUser, editUser, singleUser } from '../redux/actions/userActions';
import { Modal } from 'react-bootstrap';
function User(props) {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [web, setWeb] = useState("");
    const [Err, setErr] = useState(false);
    const [tmp, setTmp] = useState(false);
    const handleClose = () => {
        setEmail("");
        setName("");
        setPhone("");
        setWeb("");
        setShow(false);
        setTmp(false);
    };
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.allusers.users);
    const singleData = useSelector((state) => state.allusers.single[0]);
    const [like, setLike] = useState([]);
    useEffect(() => {
        fetchAllUsers();
    }, []);
    if (singleData) {
        if (email == '') {
            setEmail(singleData.email);
        }
        if (phone == '') {
            setPhone(singleData.phone);
        }
        if (name == '') {
            setName(singleData.name);
        }
        if (web == '') {
            setWeb(singleData.website);
        }
        
    }
    const fetchAllUsers = async () => {
        let response = await fetch(' https://jsonplaceholder.typicode.com/users');
        let data = await response.json();
        props.userDataHandler(data);
    }
    const getSingleData = (id) => {
        dispatch(singleUser(id));
        setTmp(true);
        handleShow();
    }
    const FormHandler = (e, id) => {
        e.preventDefault();
        if (name == '') {
            setErr(true);
        } else if (email == '') {
            setErr(true);
        } else if (phone == '') {
            setErr(true);
        } else if (web == '') {
            setErr(true);
        } else {
            setErr(false);
            dispatch(editUser({ id, name, email, phone, website: web }));
            handleClose();
        }

    }
    const likeHandler=(id)=>{
        if(!like.includes(id)){
            setLike(like.concat(id));
        }else{
            setLike(like.filter((item)=>item!=id));
        }
    }
    const deleteHandler = (id) => {
        dispatch(deleteUser(id));
    }
    return (
        <>
            <section>
                <div className="container-fluid">
                    <div className="row py-5 px-3">
                        {
                            userData.length == 0 ? <div className='col-12 loading-effect d-flex justify-content-center align-items-center'><img src="./../images/loading-loading-gif.gif" alt="loading effect" /></div> :
                                userData.map((user, index) => {
                                    return (
                                        <div key={index} className='col-3 mb-5'>
                                            <div className="card">
                                                <div className='avtar-bg d-flex justify-content-center'>
                                                    <img src={`https://avatars.dicebear.com/v2/avataaars/${user.name}.svg?options[mood][]=happy`} className="w-50 card-img-top" alt="..." />
                                                </div>
                                                <div className="card-body pb-0">
                                                    <h6 className="mb-3 card-title">{user.name}</h6>
                                                    <p className="card-text"><FontAwesomeIcon icon="envelope" color='rgba(0,0,0,.65)' />  {user.email}</p>
                                                    <p className="card-text"><FontAwesomeIcon icon="phone" color='rgba(0,0,0,.65)' />   {user.phone}</p>
                                                    <p className="card-text"><FontAwesomeIcon icon="globe" color='rgba(0,0,0,.65)' />  {user.website}</p>
                                                    <div className="crud-footer py-3 card-footer row">
                                                        <div className="col-4 d-flex justify-content-center" style={{ cursor: "pointer" }}><FontAwesomeIcon onClick={() => likeHandler(user.id)} icon="heart" color={like.includes(user.id) ? "red" : "rgba(0,0,0,.65)"} /></div>
                                                        <div className="col-4 d-flex justify-content-center" style={{ cursor: "pointer" }}><FontAwesomeIcon onClick={() => getSingleData(user.id)} icon="pen-to-square" color='rgba(0,0,0,.65)' /></div>
                                                        <div className="col-4 d-flex justify-content-center" style={{ cursor: "pointer" }}><FontAwesomeIcon onClick={() => deleteHandler(user.id)} icon="trash" color='rgba(0,0,0,.65)' /></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </div>
                </div>
            </section>
            {
                singleData ? <>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Edit User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="container">
                                <form onSubmit={(e) => FormHandler(e, singleData.id)} className="row">
                                    <div className="d-flex align-items-start pb-4 col-12">
                                        <label htmlFor="">Name :</label>
                                        <div className='w-75'>
                                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-75 ms-3 form-control" />
                                            {Err && !name && <p className='ms-3 p-0 m-0 text-danger'>Name is required</p>}
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center pb-4 col-12">
                                        <label htmlFor="">Email :</label>
                                        <div className='w-75'>
                                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="w-75 ms-3 form-control" />
                                            {Err && !email && <p className='ms-3 p-0 m-0 text-danger'>Email is required</p>}
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center pb-4 col-12">
                                        <label htmlFor="">Phone:</label>
                                        <div className='w-75'>
                                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-75 ms-3 form-control" />
                                            {Err && !phone && <p className='ms-3 p-0 m-0 text-danger'>Phone is required</p>}
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center pb-4  col-12">
                                        <label htmlFor="">Website :</label>
                                        <div className='w-75'>
                                            <input type="text" value={web} onChange={(e) => setWeb(e.target.value)} className="w-75 ms-3 form-control" />
                                            {Err && !web && <p className='ms-3 p-0 m-0 text-danger'>Phone is required</p>}
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end col-12">
                                        <button onClick={handleClose} type='button' className='me-3 btn btn-danger'>CANCEL</button>
                                        <button type='submit' className='btn btn-success'>SAVE</button>
                                    </div>
                                </form>
                            </div>
                        </Modal.Body>
                    </Modal>
                </> :
                    <></>
            }
        </>
    )
}

export default User;