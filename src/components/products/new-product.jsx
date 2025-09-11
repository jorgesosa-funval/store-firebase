import React from 'react'

export default function NewProduct({ title, actionButtonText, action = async () => { } }) {
    const [showModal, setShowModal] = React.useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const productData = Object.fromEntries(formData.entries());
        await action(productData);
        e.target.reset();
        setShowModal(false);
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    }

    return (
        <>
            <button
                onClick={toggleModal}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {actionButtonText}
            </button>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-screen overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {title}
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g., iPhone 15 Pro"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Category
                                    </label>
                                    <select
                                        name="category"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select category</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Computers">Computers</option>
                                        <option value="Audio">Audio</option>
                                        <option value="Tablets">Tablets</option>
                                        <option value="Wearables">Wearables</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Price ($)
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            required
                                            min="0"
                                            step="0.01"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="999.99"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Stock
                                        </label>
                                        <input
                                            type="number"
                                            name="stock"
                                            required
                                            min="0"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="50"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Product Image URL
                                    </label>
                                    <input
                                        type="text"
                                        name="image"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g., https://example.com/image.jpg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        required
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                        placeholder="Product description..."
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        Guardar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={toggleModal}
                                        className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

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