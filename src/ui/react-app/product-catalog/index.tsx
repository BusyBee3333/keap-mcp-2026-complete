import React, { useState } from 'react';
import { Package, DollarSign, Tag, Edit2 } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  status: 'Active' | 'Inactive';
  description: string;
}

export default function ProductCatalog() {
  const [products] = useState<Product[]>([
    { id: 1, name: 'Premium Plan', sku: 'PLAN-PREM-001', price: 99, status: 'Active', description: 'Full-featured premium subscription' },
    { id: 2, name: 'Starter Plan', sku: 'PLAN-START-001', price: 29, status: 'Active', description: 'Basic plan for startups' },
    { id: 3, name: 'Enterprise License', sku: 'LIC-ENT-001', price: 499, status: 'Active', description: 'Unlimited enterprise access' },
    { id: 4, name: 'Consulting Hours', sku: 'SERV-CONS-001', price: 150, status: 'Active', description: 'Per-hour consulting service' },
    { id: 5, name: 'Legacy Plan', sku: 'PLAN-LEG-001', price: 49, status: 'Inactive', description: 'Discontinued plan' },
  ]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Product Catalog</h1>
          <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            + Add Product
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <Package size={24} />
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  product.status === 'Active' ? 'bg-green-600' : 'bg-gray-600'
                }`}>
                  {product.status}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-sm text-gray-400 mb-4">{product.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Tag size={16} />
                  SKU: {product.sku}
                </div>
                <div className="flex items-center gap-2 text-2xl font-bold text-green-400">
                  <DollarSign size={20} />
                  {product.price}
                </div>
              </div>

              <button className="w-full py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition flex items-center justify-center gap-2">
                <Edit2 size={16} />
                Edit Product
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
