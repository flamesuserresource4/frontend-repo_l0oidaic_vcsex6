function Hero() {
  return (
    <section className="bg-gradient-to-br from-rose-50 via-amber-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">Trusted by 50k+ happy shoppers</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Discover viral products that people can’t stop talking about
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Curated hits, fair prices, and fast shipping. We hand-pick trending items with glowing reviews so you don’t have to scroll for hours.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#catalog" className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-3 rounded-md">Shop trending</a>
            <a href="#about" className="px-5 py-3 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">Why us</a>
          </div>
          <div className="mt-6 flex -space-x-2">
            {[1,2,3,4,5].map((i) => (
              <img key={i} src={`https://i.pravatar.cc/80?img=${i}`} alt="" className="w-9 h-9 rounded-full border-2 border-white" />
            ))}
            <span className="text-sm text-gray-600 ml-3">Warm support, hassle-free returns</span>
          </div>
        </div>
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop" alt="Hero" className="rounded-xl shadow-lg" />
          <div className="absolute -bottom-4 -left-4 bg-white shadow p-4 rounded-lg">
            <p className="text-sm text-gray-600">4.8/5 average rating</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
