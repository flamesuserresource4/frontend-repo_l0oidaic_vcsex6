import { ShoppingCart, Search, Store } from 'lucide-react'

function Navbar({ onCartToggle, cartCount, onSearch }) {
  return (
    <header className="sticky top-0 z-30 bg-white/70 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2 text-rose-600">
          <Store className="w-6 h-6" />
          <span className="font-semibold text-lg">Viral Finds</span>
        </div>

        <div className="flex-1 max-w-xl mx-auto hidden sm:flex">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search trending products..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-200"
            />
          </div>
        </div>

        <button
          onClick={onCartToggle}
          className="relative ml-auto flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-3 py-2 rounded-md transition-colors"
       >
          <ShoppingCart className="w-5 h-5" />
          <span className="hidden sm:inline">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-rose-600 text-xs font-bold rounded-full w-5 h-5 grid place-items-center shadow">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}

export default Navbar
