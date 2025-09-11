import React from 'react'

export default function ProductCard({ product }) {
    const { id, name, category, description, image, price } = product
    return (
        <div key={id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {category}
                    </span>
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                    {description}
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-blue-600">
                        ${price}
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
    )
}
