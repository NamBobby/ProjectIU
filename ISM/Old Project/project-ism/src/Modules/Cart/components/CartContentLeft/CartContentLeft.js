import React from "react";
import CartProduct from "./Product/CartProduct.js";
import Product1 from '@src/assets/images/Product/Product1-Gallery1.png';
import Product2 from '@src/assets/images/Product/Product2-Gallery1.png';
import colorProduct from '@src/Modules/Cart/assets/images/Color/color.png';

const CartContentLeft = () => {
    const products = [
        {
            imgSrc: Product1,
            name: 'MO231 - Pomeranian White',
            colorSrc: colorProduct,
            gender: 'Male',
            age: '02 months',
            price: '6.900.000 VND'
        },
        {
            imgSrc: Product2,
            name: 'MO502 - Poodle Tiny Yellow',
            colorSrc: colorProduct,
            gender: 'Female',
            age: '02 months',
            price: '3.900.000 VND'
        }
    ];

    return (
        <div className="cart-content-left">
            <table>
                <tbody>
                    <tr>
                        <th><input type="checkbox" /></th>
                        <th></th>
                        <th>Product</th>
                        <th>Color</th>
                        <th>Gene</th>
                        <th>Age</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Actions</th>

                    </tr>
                    {products.map((product, index) => (
                        <CartProduct key={index} {...product} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CartContentLeft;       