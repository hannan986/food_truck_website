import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartFab() {
  const { cartCount, toast } = useCart()
  const navigate = useNavigate()
  return (
    <>
      <button className="cart-fab" onClick={() => navigate('/order')} aria-label="View cart">
        🛒
        <span className={`cart-fab-badge${cartCount > 0 ? ' show' : ''}`}>{cartCount}</span>
      </button>
      {toast && <div className={`toast${toast.type === 'error' ? ' error' : ''}`}>{toast.msg}</div>}
    </>
  )
}
