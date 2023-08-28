import React from 'react';
import NumberInput from '../../Input/NumberInput';

const CartProduct = ({imgSrc, name, colorSrc, gender, age, price }) => {
    return (
        <tr>
            <td><input type="checkbox"/></td>
            <td><img src={imgSrc} alt="" /></td>
            <td><p>{name}</p></td>
            <td><img src={colorSrc} alt="" /></td>
            <td><p>{gender}</p></td>
            <td><p>{age}</p></td>
            <td><NumberInput/></td>
            <td><p>{price}</p></td>
            <td><p>Delete</p></td>
        </tr>
    );
};

export default CartProduct;