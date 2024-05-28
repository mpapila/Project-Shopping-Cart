import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
}

function ProductDetailPage(props: {
    addToCart: (id: number) => void
}) {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const Main_URL = `https://fakestoreapi.com/products/${productId}`;

    const getProduct = async () => {
        const response = await axios.get<Product>(Main_URL);
        setProduct(response.data);
    }

    useEffect(() => {
        getProduct();
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    function addProduct() {
        if (product) {
            props.addToCart(product.id)
        }
    };
    return (
        <div style={{ display: 'flex', margin: '20px' }}>
            <div><img style={{ width: "350px" }} src={product.image} alt={product.title} /></div>
            <div style={{ marginLeft: '20px' }}>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p style={{ fontWeight: 'bold' }}>Price: ${product.price}</p>
                <p><button onClick={addProduct}>Add To Cart</button></p>
            </div>
        </div>
    )
}

export default ProductDetailPage;
