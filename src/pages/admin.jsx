import React, { useEffect, useState } from 'react'
import NewProduct from '../components/products/new-product'
import { collection, addDoc, getFirestore, deleteDoc, doc } from 'firebase/firestore'
import ProductTable from '../components/products/product-table'
export default function Admin() {
  const [searchTerm, setSearchTerm] = useState('')
  const [refreshKey, setRefreshKey] = useState(null)
 

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      const db = getFirestore();
      await deleteDoc(doc(db, "products", id));
      setRefreshKey(id);
    }
  }

  const addProduct = async (productData) => {
    const db = getFirestore();
    try {
      const docRef = await addDoc(collection(db, "products"), productData)
      setRefreshKey(docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
              <p className="text-gray-600 mt-2">Gestiona tu inventario de productos</p>
            </div>
            <NewProduct
              title="Agregar Nuevo Producto"
              actionButtonText="Agregar Producto"
              action={addProduct}
            />
          </div>
        </div> 

        {/* Barra de búsqueda */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar productos por nombre o categoría..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Tabla de productos */}
        <ProductTable 
          refreshKey={refreshKey}
          deleteProduct={handleDelete}
        />
      </div>
    </div>
  )
}
