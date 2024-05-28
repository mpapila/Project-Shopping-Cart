import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
}
function API(props: {
    addToCart: (id: number) => void
}) {
    const [products, setProducts] = useState<Product[]>([]);
    const Main_URL = "https://fakestoreapi.com/products"

    const getAllProducts = async () => {
        const response = await axios.get<Product[]>(Main_URL)
        setProducts(response.data)
    }
    useEffect(() => {
        getAllProducts();
    }, [])
    const productButtons = products.map(product => {
        function addProduct() {
            props.addToCart(product.id)
        };
        return (
            <div className='card' key={product.id}>
                <img src={product.image} />
                <h3>{product.title}</h3>
                <p>Price: ${product.price}</p>
                <Link className='link' to={`product/${product.id}`}>Detail</Link>
                <p><button onClick={addProduct}>Add To Cart</button></p>
            </div>
        )
    })
    return (
        <>
            <div className='container'>{productButtons}</div>
        </>
    )
}

export default API
