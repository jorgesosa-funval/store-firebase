import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import ProductCard from '../components/products/product-card'; 

export default function Home() {
  const [products, setProducts] = useState([])
  const [filtroCategoria, setFiltroCategoria] = useState('Todos')
  const [ordenamiento, setOrdenamiento] = useState('nombre')

  const categorias = ['Todos', ...new Set(products.map(p => p.category))]

  const productosFiltrados = products
    .filter(p => filtroCategoria === 'Todos' || p.category === filtroCategoria)
    .sort((a, b) => {
      if (ordenamiento === 'precio') return a.price - b.price
      if (ordenamiento === 'precioDesc') return b.price - a.price
      return a.name.localeCompare(b.name)
    })

  useEffect(() => {
    const fetchProducts = async () => {
      const db = getFirestore();
      const productsSnapshot = await getDocs(collection(db, 'products'));
      console.log(productsSnapshot);
      const productsList = productsSnapshot.docs.map(doc =>
        ({ id: doc.id, ...doc.data() })
      );
      setProducts(productsList);
    }
    fetchProducts();
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Catálogo de Productos
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Descubre nuestra increíble selección de productos tecnológicos
            </p>
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full px-4 py-3 pl-12 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <svg className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros y Ordenamiento */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categorias.map(category => (
                <button
                  key={category}
                  onClick={() => setFiltroCategoria(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filtroCategoria === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Ordenar por:</label>
              <select
                value={ordenamiento}
                onChange={(e) => setOrdenamiento(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="nombre">Nombre</option>
                <option value="precio">Precio (menor a mayor)</option>
                <option value="precioDesc">Precio (mayor a menor)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productosFiltrados.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Sin resultados */}
        {productosFiltrados.length === 0 && (
          <div className="text-center py-16">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-1.256-5.674-3.271m0 0A7.962 7.962 0 016 12a8 8 0 018-8 8 8 0 018 8c0 1.314-.317 2.55-.897 3.729z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay productos</h3>
            <p className="mt-1 text-sm text-gray-500">No se encontraron productos con los filtros seleccionados.</p>
          </div>
        )}
      </div>
    </div>
  )
}
