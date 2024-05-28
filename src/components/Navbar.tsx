import { Link } from 'react-router-dom'
import { CartItem } from '../App'




function Navbar(props: {
    cart: CartItem[]
}) {
    return (
        <div className='navbar'>
            <h3 style={{ fontWeight: 'normal', color: 'white' }}>My Shop Page</h3>
            <div>
                <Link className="link" to="/">Home Page</Link>
                <Link className="link" to="/cart">Cart items:</Link><span className="cart">{props.cart.length}</span>
            </div>
        </div >
    )
}

export default Navbar
