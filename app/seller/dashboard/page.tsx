"use client"

import { SellerDashboardLayout } from '@/components/seller-dashboard-layout';
import { useState, useEffect } from 'react';

export default function SellerDashboard() {
  const [section, setSection] = useState('overview');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', category: '', image: '', collection: '', subcollection: '' });
  const [orders, setOrders] = useState<any[]>([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const [editProduct, setEditProduct] = useState<any | null>(null);
  const [search, setSearch] = useState('');
  const [services, setServices] = useState<any[]>([]);
  const [serviceLoading, setServiceLoading] = useState(false);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [showEditServiceModal, setShowEditServiceModal] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    type: '',
    description: '',
    steps: [],
  });
  const [editService, setEditService] = useState<any | null>(null);

  const serviceTypes = [
    'Time slot Booking with specific date',
    'Date range Booking',
    'Subscription',
    'Request a Quote',
  ];

  const stepTypes = [
    'Text',
    'Text area',
    'Heading',
    'Paragraph',
    'Select',
    'Dropdown',
    'Radio Button',
    'Checkbox',
    'Number',
    'Phone',
    'Email',
    'Datetime',
    'File Upload',
    'Image Dropdown',
    'Image Swatch',
    'Color Dropdown',
    'Color Picker',
    'Color Swatch',
    'Font Picker',
    'Range Slider',
    'Tabs',
    'Switch',
    'Button',
    'Divider',
    'Spacing',
    'Pop-up Modal',
    'Size chart',
    'Product Links',
    'Hidden Field',
    'HTML',
  ];

  useEffect(() => {
    if (section === 'products') fetchProducts();
    if (section === 'orders') fetchOrders();
    if (section === 'services') fetchServices();
    // eslint-disable-next-line
  }, [section]);

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data.products || []);
    setLoading(false);
  };

  const fetchOrders = async () => {
    setOrderLoading(true);
    const res = await fetch('/api/orders');
    const data = await res.json();
    setOrders(data.orders || []);
    setOrderLoading(false);
  };

  const fetchServices = async () => {
    setServiceLoading(true);
    const res = await fetch('/api/services');
    const data = await res.json();
    setServices(data.services || []);
    setServiceLoading(false);
  };

  const handleAddProduct = async () => {
    setLoading(true);
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });
    setShowAddModal(false);
    setNewProduct({ name: '', price: '', description: '', category: '', image: '', collection: '', subcollection: '' });
    fetchProducts();
    setLoading(false);
  };

  const handleDeleteProduct = async (id: string) => {
    setLoading(true);
    await fetch('/api/products', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchProducts();
    setLoading(false);
  };

  const handleUpdateProduct = async () => {
    if (!editProduct.name || !editProduct.price) {
      alert('Name and price are required');
      return;
    }
    setLoading(true);
    await fetch('/api/products', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editProduct),
    });
    setEditProduct(null);
    fetchProducts();
    setLoading(false);
  };

  const handleAddService = async () => {
    setServiceLoading(true);
    await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newService),
    });
    setShowAddServiceModal(false);
    setNewService({ name: '', type: '', description: '', steps: [] });
    fetchServices();
    setServiceLoading(false);
  };

  const handleEditService = async () => {
    setServiceLoading(true);
    await fetch('/api/services', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editService),
    });
    setShowEditServiceModal(false);
    setEditService(null);
    fetchServices();
    setServiceLoading(false);
  };

  const handleDeleteService = async (id: string) => {
    setServiceLoading(true);
    await fetch('/api/services', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchServices();
    setServiceLoading(false);
  };

  // Add step to service (for add/edit modals)
  const addStep = (service: any, setService: any) => {
    setService({
      ...service,
      steps: [
        ...service.steps,
        { label: '', type: 'text', options: [], impactsPricing: false, priceAddon: '' },
      ],
    });
  };

  // Remove step
  const removeStep = (service: any, setService: any, idx: number) => {
    setService({
      ...service,
      steps: service.steps.filter((_: any, i: number) => i !== idx),
    });
  };

  // Update step
  const updateStep = (service: any, setService: any, idx: number, field: string, value: any) => {
    const steps = [...service.steps];
    steps[idx][field] = value;
    setService({ ...service, steps });
  };

  return (
    <SellerDashboardLayout>
      <nav className="mb-6 flex space-x-6 border-b pb-2">
        <button className={section === 'overview' ? 'font-bold' : ''} onClick={() => setSection('overview')}>Overview</button>
        <button className={section === 'products' ? 'font-bold' : ''} onClick={() => setSection('products')}>Products</button>
        <button className={section === 'services' ? 'font-bold' : ''} onClick={() => setSection('services')}>Services</button>
        <button className={section === 'orders' ? 'font-bold' : ''} onClick={() => setSection('orders')}>Orders</button>
        <button className={section === 'profile' ? 'font-bold' : ''} onClick={() => setSection('profile')}>Profile</button>
      </nav>
      {section === 'overview' && (
        <>
          <h1 className="text-2xl font-bold mb-4">Welcome to your Seller Dashboard</h1>
          <p>This is your post-login portal. Here you will see your sales, products, and more.</p>
        </>
      )}
      {section === 'products' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Products</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setShowAddModal(true)}>
              Add Product
            </button>
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="mb-4 px-3 py-2 border rounded w-full max-w-xs"
          />
          {loading ? (
            <div>Loading...</div>
          ) : (
            <table className="min-w-full border">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Description</th>
                  <th className="border px-4 py-2">Category</th>
                  <th className="border px-4 py-2">Image</th>
                  <th className="border px-4 py-2">Collection</th>
                  <th className="border px-4 py-2">Subcollection</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map((product) => (
                  <tr key={product.id}>
                    <td className="border px-4 py-2">{product.name}</td>
                    <td className="border px-4 py-2">{product.price}</td>
                    <td className="border px-4 py-2">{product.description || '-'}</td>
                    <td className="border px-4 py-2">{product.category || '-'}</td>
                    <td className="border px-4 py-2">{product.image ? <img src={product.image} alt="" className="w-12 h-12 object-cover" /> : '-'}</td>
                    <td className="border px-4 py-2">{product.collection || '-'}</td>
                    <td className="border px-4 py-2">{product.subcollection || '-'}</td>
                    <td className="border px-4 py-2 space-x-2">
                      <button
                        className="bg-green-600 text-white px-2 py-1 rounded"
                        onClick={() => setEditProduct(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {/* Add Product Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
                <h3 className="text-lg font-bold mb-4">Add Product</h3>
                <input
                  type="text"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full mb-2 px-3 py-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="w-full mb-2 px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newProduct.description || ''}
                  onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full mb-2 px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={newProduct.category || ''}
                  onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full mb-2 px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newProduct.image || ''}
                  onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full mb-4 px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Collection"
                  value={newProduct.collection}
                  onChange={e => setNewProduct({ ...newProduct, collection: e.target.value })}
                  className="w-full mb-2 px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Subcollection"
                  value={newProduct.subcollection}
                  onChange={e => setNewProduct({ ...newProduct, subcollection: e.target.value })}
                  className="w-full mb-2 px-3 py-2 border rounded"
                />
                <div className="flex justify-end space-x-2">
                  <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                    onClick={async () => {
                      if (!newProduct.name || !newProduct.price) {
                        alert('Name and price are required');
                        return;
                      }
                      await handleAddProduct();
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Edit Product Modal */}
          {editProduct && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
                <h3 className="text-lg font-bold mb-4">Edit Product</h3>
                <input
                  type="text"
                  placeholder="Product Name"
                  value={editProduct.name}
                  onChange={e => setEditProduct({ ...editProduct, name: e.target.value })}
                  className="w-full mb-2 px-3 py-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={editProduct.price}
                  onChange={e => setEditProduct({ ...editProduct, price: e.target.value })}
                  className="w-full mb-2 px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={editProduct.description || ''}
                  onChange={e => setEditProduct({ ...editProduct, description: e.target.value })}
                  className="w-full mb-2 px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={editProduct.category || ''}
                  onChange={e => setEditProduct({ ...editProduct, category: e.target.value })}
                  className="w-full mb-2 px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={editProduct.image || ''}
                  onChange={e => setEditProduct({ ...editProduct, image: e.target.value })}
                  className="w-full mb-4 px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Collection"
                  value={editProduct.collection}
                  onChange={e => setEditProduct({ ...editProduct, collection: e.target.value })}
                  className="w-full mb-2 px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Subcollection"
                  value={editProduct.subcollection}
                  onChange={e => setEditProduct({ ...editProduct, subcollection: e.target.value })}
                  className="w-full mb-2 px-3 py-2 border rounded"
                />
                <div className="flex justify-end space-x-2">
                  <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setEditProduct(null)}>
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                    onClick={handleUpdateProduct}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {section === 'services' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Services</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setShowAddServiceModal(true)}>
              Add Service
            </button>
          </div>
          {serviceLoading ? (
            <div>Loading...</div>
          ) : (
            <table className="min-w-full border">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Type</th>
                  <th className="border px-4 py-2">Description</th>
                  <th className="border px-4 py-2">Steps</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id}>
                    <td className="border px-4 py-2">{service.name}</td>
                    <td className="border px-4 py-2">{service.type}</td>
                    <td className="border px-4 py-2">{service.description}</td>
                    <td className="border px-4 py-2">{service.steps?.length || 0}</td>
                    <td className="border px-4 py-2 space-x-2">
                      <button
                        className="bg-green-600 text-white px-2 py-1 rounded"
                        onClick={() => { setEditService(service); setShowEditServiceModal(true); }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {/* Add Service Modal */}
          {showAddServiceModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
                <h3 className="text-lg font-bold mb-4">Add Service</h3>
                <input
                  type="text"
                  placeholder="Service Name"
                  value={newService.name}
                  onChange={e => setNewService({ ...newService, name: e.target.value })}
                  className="w-full mb-2 px-3 py-2 border rounded"
                />
                <select
                  value={newService.type}
                  onChange={e => setNewService({ ...newService, type: e.target.value })}
                  className="w-full mb-2 px-3 py-2 border rounded"
                >
                  <option value="">Select Service Type</option>
                  {serviceTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
                <textarea
                  placeholder="Description"
                  value={newService.description}
                  onChange={e => setNewService({ ...newService, description: e.target.value })}
                  className="w-full mb-2 px-3 py-2 border rounded"
                />
                <div className="mb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold">Booking Steps</span>
                    <button className="text-blue-600" onClick={() => addStep(newService, setNewService)}>+ Add Step</button>
                  </div>
                  {newService.steps.map((step: any, idx: number) => (
                    <div key={idx} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        placeholder="Step Label"
                        value={step.label}
                        onChange={e => updateStep(newService, setNewService, idx, 'label', e.target.value)}
                        className="px-2 py-1 border rounded"
                      />
                      <select
                        value={step.type}
                        onChange={e => updateStep(newService, setNewService, idx, 'type', e.target.value)}
                        className="px-2 py-1 border rounded"
                      >
                        <option value="">Select Type</option>
                        {stepTypes.map(type => <option key={type} value={type}>{type}</option>)}
                      </select>
                      {step.type === 'select' && (
                        <input
                          type="text"
                          placeholder="Comma-separated options"
                          value={step.options?.join(',') || ''}
                          onChange={e => updateStep(newService, setNewService, idx, 'options', e.target.value.split(','))}
                          className="px-2 py-1 border rounded"
                        />
                      )}
                      <label className="flex items-center space-x-1">
                        <input
                          type="checkbox"
                          checked={!!step.impactsPricing}
                          onChange={e => updateStep(newService, setNewService, idx, 'impactsPricing', e.target.checked)}
                        />
                        <span className="text-xs">Impacts Pricing</span>
                      </label>
                      {step.impactsPricing && (
                        <input
                          type="number"
                          placeholder="Price Add-on"
                          value={step.priceAddon || ''}
                          onChange={e => updateStep(newService, setNewService, idx, 'priceAddon', e.target.value)}
                          className="w-24 px-2 py-1 border rounded"
                        />
                      )}
                      <button className="text-red-600" onClick={() => removeStep(newService, setNewService, idx)}>Remove</button>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end space-x-2">
                  <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setShowAddServiceModal(false)}>
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleAddService}>
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Edit Service Modal */}
          {showEditServiceModal && editService && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
                <h3 className="text-lg font-bold mb-4">Edit Service</h3>
                <input
                  type="text"
                  placeholder="Service Name"
                  value={editService.name}
                  onChange={e => setEditService({ ...editService, name: e.target.value })}
                  className="w-full mb-2 px-3 py-2 border rounded"
                />
                <select
                  value={editService.type}
                  onChange={e => setEditService({ ...editService, type: e.target.value })}
                  className="w-full mb-2 px-3 py-2 border rounded"
                >
                  <option value="">Select Service Type</option>
                  {serviceTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
                <textarea
                  placeholder="Description"
                  value={editService.description}
                  onChange={e => setEditService({ ...editService, description: e.target.value })}
                  className="w-full mb-2 px-3 py-2 border rounded"
                />
                <div className="mb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold">Booking Steps</span>
                    <button className="text-blue-600" onClick={() => addStep(editService, setEditService)}>+ Add Step</button>
                  </div>
                  {editService.steps.map((step: any, idx: number) => (
                    <div key={idx} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        placeholder="Step Label"
                        value={step.label}
                        onChange={e => updateStep(editService, setEditService, idx, 'label', e.target.value)}
                        className="px-2 py-1 border rounded"
                      />
                      <select
                        value={step.type}
                        onChange={e => updateStep(editService, setEditService, idx, 'type', e.target.value)}
                        className="px-2 py-1 border rounded"
                      >
                        <option value="">Select Type</option>
                        {stepTypes.map(type => <option key={type} value={type}>{type}</option>)}
                      </select>
                      {step.type === 'select' && (
                        <input
                          type="text"
                          placeholder="Comma-separated options"
                          value={step.options?.join(',') || ''}
                          onChange={e => updateStep(editService, setEditService, idx, 'options', e.target.value.split(','))}
                          className="px-2 py-1 border rounded"
                        />
                      )}
                      <label className="flex items-center space-x-1">
                        <input
                          type="checkbox"
                          checked={!!step.impactsPricing}
                          onChange={e => updateStep(editService, setEditService, idx, 'impactsPricing', e.target.checked)}
                        />
                        <span className="text-xs">Impacts Pricing</span>
                      </label>
                      {step.impactsPricing && (
                        <input
                          type="number"
                          placeholder="Price Add-on"
                          value={step.priceAddon || ''}
                          onChange={e => updateStep(editService, setEditService, idx, 'priceAddon', e.target.value)}
                          className="w-24 px-2 py-1 border rounded"
                        />
                      )}
                      <button className="text-red-600" onClick={() => removeStep(editService, setEditService, idx)}>Remove</button>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end space-x-2">
                  <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => { setShowEditServiceModal(false); setEditService(null); }}>
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleEditService}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {section === 'orders' && (
        <div>
          <h2 className="text-xl font-bold mb-2">Orders</h2>
          {orderLoading ? (
            <div>Loading...</div>
          ) : (
            <table className="min-w-full border">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Order ID</th>
                  <th className="border px-4 py-2">Product</th>
                  <th className="border px-4 py-2">Buyer</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="border px-4 py-2">{order.id}</td>
                    <td className="border px-4 py-2">{order.productName || '-'}</td>
                    <td className="border px-4 py-2">{order.buyerName || '-'}</td>
                    <td className="border px-4 py-2">{order.status || '-'}</td>
                    <td className="border px-4 py-2">{order.date ? new Date(order.date).toLocaleDateString() : '-'}</td>
                    <td className="border px-4 py-2">
                      <button className="bg-blue-600 text-white px-2 py-1 rounded">Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
      {section === 'profile' && <div><h2 className="text-xl font-bold mb-2">Profile</h2><p>Profile editing coming soon.</p></div>}
    </SellerDashboardLayout>
  );
}