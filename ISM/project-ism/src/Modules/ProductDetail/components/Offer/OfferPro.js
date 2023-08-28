import React from "react";
import OfferProduct from "./Product/OfferProduct";
import Product2 from '@src/assets/images/Product/Product2-Gallery1.png';
import Product3 from '@src/assets/images/Product/Product3-Gallery1.png';
import Product4 from '@src/assets/images/Product/Product4-Gallery1.png';
import Product5 from '@src/assets/images/Product/Product5-Gallery1.png';

const OfferPro = () => {
    const products = [
        {
            imgSrc: Product2,
            name: 'MO231 - Pomeranian White',
            gender: 'Male',
            age: '02 months',
            price: '6.900.000 VND'
        },
        {
            imgSrc: Product3,
            name: 'MO502 - Poodle Tiny Yellow',
            gender: 'Female',
            age: '02 months',
            price: '3.900.000 VND'
        },
        {
            imgSrc: Product4,
            name: 'MO102 - Poodle Tiny Sepia',
            gender: 'Male',
            age: '02 months',
            price: '4.000.000 VND'
        },
        {
            imgSrc: Product5,
            name: 'MO512 - Alaskan Malamute Grey',
            gender: 'Male',
            age: '02 months',
            price: '8.900.000 VND'
        }
    ];


    return(
        <div className="offer">
                <div className="small-container">
                    <h3>Whats new?</h3>
                    <h1>See More Puppies</h1>
                    <div className="frames-container">
                        {products.map((product, index) => (
                            <OfferProduct key={index} {...product} />
                        ))}
                    </div>
                </div>
            </div>
    );
};

export default OfferPro;