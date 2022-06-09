import React from 'react'

function About() {
    return (
        <div>
            <div className="container">
                <div className="row g-2 mt-5">
                    <div className="col-6">
                        <button className="p-3 btn btn-secondary w-75" data-bs-toggle="tooltip" data-bs-placement="top" title="Men's Clothing">Men's Clothing</button>
                    </div>
                    <div className="col-6">
                    <button className="p-3 btn btn-primary w-75" data-bs-toggle="tooltip" data-bs-placement="top" title="Women's Clothing">Women's Clothing</button>
                    </div>
                    <div className="col-6">
                    <button className="p-3 btn btn-success w-75" data-bs-toggle="tooltip" data-bs-placement="top" title="Jewlery">Jewlery</button>
                    </div>
                    <div className="col-6">
                    <button className="p-3 btn btn-warning w-75" data-bs-toggle="tooltip" data-bs-placement="top" title="Electronics">Electronics</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
