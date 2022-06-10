import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const Products = (props) => {
    const { onAdd , onRemove} = props;
    const [open, setOpen] = React.useState(false);
    const [productData, setUser] = useState([]);

    const handleClickOpen = (product) => {
        setOpen(true);
        console.log(product, "Shaik Akram");
        let dataImage = product;
        setUser(dataImage);
        console.log(dataImage);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;
    //Fetching the data 
    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch("https://mocki.io/v1/b5eeb855-9bb6-4925-b12c-236fd1fa6348");
            if (componentMounted) {
                setData(await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
            }
            return () => {
                componentMounted = false;
            }
        }
        getProducts();
    }, []);

    const Loading = () => {
        return (
            <>
                <div className="col-md-3">
                    <Skeleton height={350} />
                    <Skeleton height={350} />
                    <Skeleton height={350} />
                </div>
            </>
        );
    }
    //Filter the products data
    const filterProduct = (element) => {
        const updatedList = data.filter((value) => value.category === element);
        setFilter(updatedList);
    }
    // Price Low To High
    const SortProduct = () => {
        data?.sort((a, b) => (a.price > b.price ? 1 : -1))
    }
    //Display the Products
    const ShowProducts = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-center mb-s pb-5">
                    <button className="btn btn-outline-info me-2" onClick={() => SortProduct(data)}>Sort By Price</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => setFilter(data)}>All</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("men's clothing")}>Men's Clothing</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("women's clothing")}>Women's Clothing</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("jewelery")}>Jewelery</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("electronics")}>Electronic</button>
                </div>
                {filter.map((product) => {
                    return (
                        <>
                            <div className="col-md-3 mb-4">
                                <div className="card h-100 text-center p-4" key={product.id}>
                                    <img src={product.image} className="card-img-top" alt={product.title} height="250px" />
                                    <div className="card-body">
                                        <h5 className="card-title mb-0">{product.title.substring(0, 12)}...</h5>
                                        <p className="card-text lead fw-bold my-4">
                                            Color:&nbsp;
                                            {product.colors[0]}</p>
                                        <p className="lead fw-bolder btn btn-danger">
                                            Rating &nbsp;
                                            {product.rating && product.rating.rate}&nbsp;
                                            <i className='fa fa-star'></i>&nbsp;
                                            <span>{product.rating.count}</span>
                                        </p>
                                        <p className="card-text lead fw-bold">Size: {product.size}</p>
                                        <p className="card-text lead fw-bold">Price INR: {product.price}</p>
                                        {/* <NavLink to={`/products/${product.id}`} className="btn btn-outline-dark">Buy Now</NavLink> */}

                                        <div>
                                            <Button variant="outlined"
                                                onClick={() => handleClickOpen(product)}>
                                                Buy Now
                                            </Button>
                                            {/* Modal Pop Up */}

                                            <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle id="alert-dialog-title">
                                                    {`${productData.title}`}
                                                </DialogTitle>
                                                <DialogContent>
                                                    <img src={productData.image} className="card-img-top" alt={productData.title} height="250px" width="250px" />
                                                    <DialogContentText id="alert-dialog-description">
                                                        {productData.description}
                                                    </DialogContentText>
                                                    <p className="lead fw-bolder">
                                                        Rating {productData.rating && productData.rating.rate}
                                                        <i className='fa fa-star'></i>
                                                    </p>
                                                    <h3 className="display-6 fw-bold my-4"> INR {productData.price}</h3>
                                                    <div className="col-2">
                                                        <button onClick={() => onRemove(productData)} className="btn btn-outline-danger">
                                                            -
                                                        </button>{' '}
                                                        <button onClick={() => onAdd(productData)} className="btn btn-outline-info">
                                                            +
                                                        </button>
                                                    </div>
                                                </DialogContent>
                                                <DialogActions>
                                                    <button className="btn btn-outline-dark px-4 py-2"
                                                        onClick={() => onAdd(productData)}
                                                    >Add to Cart</button>
                                                    <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2">Go to Cart</NavLink>

                                                    <Button onClick={handleClose} autoFocus>
                                                        Close
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </>
        )

    }

    return (

        <div>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
                        <hr />
                    </div>
                </div>
                <div className="row justify-content-center">
                    {loading ? <Loading /> : <ShowProducts />}

                </div>
            </div>
        </div>
    )
}

export default Products