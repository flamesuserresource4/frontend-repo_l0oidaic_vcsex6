import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/products?trending=true&limit=24`)
        if (!res.ok) throw new Error('Failed to load products')
        const data = await res.json()
        setProducts(Array.isArray(data) ? data : [])
      } catch (e) {
        // Fallback demo items for first-time experience
        setProducts([
          {
            title: 'Self-Cleaning Water Bottle',
            description: 'UV-C purification keeps your water fresh at the touch of a button.',
            price: 49.99,
            category: 'Lifestyle',
            in_stock: true,
            image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=1200&auto=format&fit=crop',
            rating: 4.8,
            tags: ['health', 'gadget'],
            trending: true,
          },
          {
            title: 'Mini Portable Blender',
            description: 'Blend on the go with USB-C charging and easy clean design.',
            price: 39.99,
            category: 'Kitchen',
            in_stock: true,
            image: 'https://images.unsplash.com/photo-1514986888952-8cd320577b68?q=80&w=1200&auto=format&fit=crop',
            rating: 4.6,
            tags: ['fitness', 'portable'],
            trending: true,
          },
          {
            title: 'Sunset Lamp Projector',
            description: 'Create cozy moods and viral-worthy photos with ambient gradients.',
            price: 24.99,
            category: 'Home',
            in_stock: true,
            image: 'https://images.unsplash.com/photo-1644802719646-eecf3e1d146f?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxTdW5zZXQlMjBMYW1wJTIwUHJvamVjdG9yfGVufDB8MHx8fDE3NjMzNTU1MTB8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
            rating: 4.7,
            tags: ['decor', 'cozy'],
            trending: true,
          },
        ])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    if (!query) return products
    const q = query.toLowerCase()
    return products.filter(
      (p) => p.title.toLowerCase().includes(q) || (p.tags || []).some((t) => t.toLowerCase().includes(q))
    )
  }, [products, query])

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.title === product.title)
      if (existing) {
        return prev.map((i) => (i.title === product.title ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { product_id: product._id || product.id, title: product.title, price: product.price, quantity: 1, image: product.image }]
    })
    setCartOpen(true)
  }

  const checkout = async () => {
    const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0)
    const payload = {
      items: cart,
      subtotal,
      shipping: 0,
      total: subtotal,
      customer: {
        name: 'Guest',
        email: 'guest@example.com',
        address_line1: '123 Demo St',
        city: 'Demo City',
        state: 'CA',
        postal_code: '90001',
        country: 'US',
      },
    }
    try {
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      alert(data?.status ? 'Order placed successfully!' : 'Order received in demo mode!')
      setCart([])
      setCartOpen(false)
    } catch (e) {
      alert('Checkout failed. Please try again later.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50">
      <Navbar onCartToggle={() => setCartOpen(true)} cartCount={cart.reduce((s, i) => s + i.quantity, 0)} onSearch={setQuery} />
      <Hero />

      <section id="catalog" className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Trending now</h2>
          <a href="#about" className="text-rose-600 hover:text-rose-700">Our promise</a>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading products...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-600">No products match your search.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <ProductCard key={p.id || p.title + i} product={p} onAdd={addToCart} />
            ))}
          </div>
        )}
      </section>

      <section id="about" className="bg-white/70">
        <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-6">
          {[{
            title: 'Transparent pricing',
            desc: 'Fair prices with no surprises. Clear shipping and easy returns.'
          }, {
            title: 'Curated quality',
            desc: 'We test and review every item. Only the best make the list.'
          }, {
            title: 'Friendly support',
            desc: 'Real people ready to help by email or chat, 7 days a week.'
          }].map(card => (
            <div key={card.title} className="p-6 rounded-xl border border-gray-100 bg-white shadow-sm">
              <h3 className="font-semibold text-gray-900">{card.title}</h3>
              <p className="text-gray-600 mt-2">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onCheckout={checkout} />

      <footer className="text-center text-sm text-gray-500 py-8">© {new Date().getFullYear()} Viral Finds — All rights reserved.</footer>
    </div>
  )
}

export default App
