import React, { useState } from 'react'

const productos = [
  { 
    id: 1, 
    nombre: 'iPhone 15 Pro', 
    precio: 999, 
    imagen: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
    categoria: 'Electrónicos',
    descripcion: 'El último iPhone con chip A17 Pro y cámara de 48MP'
  },
  { 
    id: 2, 
    nombre: 'MacBook Air M2', 
    precio: 1199, 
    imagen: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    categoria: 'Computadoras',
    descripcion: 'Laptop ultradelgada con chip M2 y pantalla Retina'
  },
  { 
    id: 3, 
    nombre: 'AirPods Pro 2', 
    precio: 249, 
    imagen: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400',
    categoria: 'Audio',
    descripcion: 'Auriculares inalámbricos con cancelación de ruido'
  },
  { 
    id: 4, 
    nombre: 'iPad Pro 12.9"', 
    precio: 1099, 
    imagen: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
    categoria: 'Tabletas',
    descripcion: 'Tableta profesional con chip M2 y pantalla Liquid Retina'
  },
  { 
    id: 5, 
    nombre: 'Apple Watch Series 9', 
    precio: 399, 
    imagen: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
    categoria: 'Wearables',
    descripcion: 'Smartwatch con GPS y monitoreo de salud avanzado'
  },
  { 
    id: 6, 
    nombre: 'iMac 24"', 
    precio: 1299, 
    imagen: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
    categoria: 'Computadoras',
    descripcion: 'Computadora todo en uno con chip M3 y pantalla 4.5K'
  }
];

export default function Home() {
  const [filtroCategoria, setFiltroCategoria] = useState('Todos')
  const [ordenamiento, setOrdenamiento] = useState('nombre')

  const categorias = ['Todos', ...new Set(productos.map(p => p.categoria))]

  const productosFiltrados = productos
    .filter(p => filtroCategoria === 'Todos' || p.categoria === filtroCategoria)
    .sort((a, b) => {
      if (ordenamiento === 'precio') return a.precio - b.precio
      if (ordenamiento === 'precioDesc') return b.precio - a.precio
      return a.nombre.localeCompare(b.nombre)
    })

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
              {categorias.map(categoria => (
                <button
                  key={categoria}
                  onClick={() => setFiltroCategoria(categoria)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filtroCategoria === categoria
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {categoria}
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
          {productosFiltrados.map(producto => (
            <div key={producto.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {producto.categoria}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {producto.nombre}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {producto.descripcion}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-blue-600">
                    ${producto.precio}
                  </span>
                  <div className="flex gap-2">
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 001 1h8a1 1 0 001-1v-6m-9 0h10" />
                      </svg>
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
