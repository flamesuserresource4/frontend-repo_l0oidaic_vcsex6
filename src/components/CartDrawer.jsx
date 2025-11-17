import { X } from 'lucide-react'

function CartDrawer({ open, items, onClose, onCheckout }) {
  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0)

  return (
    <div className={`fixed inset-0 z-40 ${open ? '' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-200px)]">
          {items.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            items.map((it) => (
              <div key={it.id || it.product_id} className="flex gap-3 items-start">
                {it.image && <img src={it.image} alt={it.title} className="w-16 h-16 rounded object-cover" />}
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{it.title}</p>
                  <p className="text-sm text-gray-500">Qty {it.quantity}</p>
                </div>
                <div className="font-semibold">${(it.price * it.quantity).toFixed(2)}</div>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t space-y-3">
          <div className="flex justify-between text-gray-700"><span>Subtotal</span><span className="font-semibold">${subtotal.toFixed(2)}</span></div>
          <button
            onClick={onCheckout}
            disabled={items.length === 0}
            className="w-full bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white py-3 rounded-md"
          >
            Checkout
          </button>
        </div>
      </aside>
    </div>
  )
}

export default CartDrawer
