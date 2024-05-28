import { useEffect, useState } from 'react';
import { CartItem } from '../App';  // Ensure this import is correct
import axios from 'axios';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
}

function Cart(props: { cart: CartItem[] }) {
    const [products, setProducts] = useState<Product[]>([]);


    const fetchProducts = async () => {
        const productRequests = props.cart.map(cartItem =>
            axios.get<Product>(`https://fakestoreapi.com/products/${cartItem.id}`)
        );
        const responses = await Promise.all(productRequests);
        setProducts(responses.map(response => response.data));

    };
    useEffect(() => {
        fetchProducts();
    })

    return (
        <div>
            <h1>Cart</h1>
            {props.cart.length === 0 ? (
                <p>Your Cart is empty</p>
            ) : (
                <>
                    {props.cart.map(cartItem => {
                        const product = products.find(p => p.id === cartItem.id);
                        return product ? (
                            <div key={product.id} className='cartCards'>
                                <div style={{ display: 'flex' }}>
                                    <img src={product.image} alt={product.title} />
                                    <h3>{product.title}</h3>
                                </div>
                                <div style={{ marginTop: '5px' }}>
                                    <p>Price: ${product.price}</p>
                                </div>
                            </div>
                        ) : (
                            <p key={cartItem.id}>Loading...</p>
                        );
                    })}
                </>
            )
            }
        </div >
    );
}

export default Cart;
