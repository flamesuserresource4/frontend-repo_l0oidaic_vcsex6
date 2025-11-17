import { Star } from 'lucide-react'

function ProductCard({ product, onAdd }) {
  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100">
      {product.image && (
        <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-gray-800 line-clamp-2">{product.title}</h3>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm">{product.rating ?? 4.7}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">${product.price?.toFixed(2)}</span>
          <button
            onClick={() => onAdd(product)}
            className="bg-rose-600 hover:bg-rose-700 text-white text-sm px-3 py-2 rounded-md"
          >
            Add to cart
          </button>
        </div>
        {product.tags && product.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {product.tags.slice(0, 3).map((t) => (
              <span key={t} className="text-xs bg-rose-50 text-rose-700 px-2 py-1 rounded-full">{t}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCard
