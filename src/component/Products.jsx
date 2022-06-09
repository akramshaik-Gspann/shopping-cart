import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const Products = () => {

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
                                        <NavLink to={`/products/${product.id}`} className="btn btn-outline-dark">Buy Now</NavLink>
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