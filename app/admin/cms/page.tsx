"use client"

import { useEffect, useState } from 'react';

export default function AdminCMS() {
  const [section, setSection] = useState('home');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line
  }, [section]);

  const fetchItems = async () => {
    setLoading(true);
    const res = await fetch(`/api/content?type=${section}`);
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  };

  const handleAddItem = async () => {
    setLoading(true);
    await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newItem, type: section }),
    });
    setShowAddModal(false);
    setNewItem({ title: '', content: '' });
    fetchItems();
    setLoading(false);
  };

  const handleDeleteItem = async (id: string) => {
    setLoading(true);
    await fetch('/api/content', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, type: section }),
    });
    fetchItems();
    setLoading(false);
  };

  const sectionTitles: Record<string, string> = {
    home: 'Home Content',
    faqs: 'FAQs',
    categories: 'Categories',
    pricing: 'Pricing Plans',
    collections: 'Collections',
    subcollections: 'Subcollections',
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <div className="font-bold text-xl">Aniyor Admin CMS</div>
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Logout</button>
      </header>
      <main className="p-8 max-w-5xl mx-auto w-full">
        <nav className="mb-6 flex space-x-6 border-b pb-2">
          <button className={section === 'home' ? 'font-bold' : ''} onClick={() => setSection('home')}>Home Content</button>
          <button className={section === 'faqs' ? 'font-bold' : ''} onClick={() => setSection('faqs')}>FAQs</button>
          <button className={section === 'categories' ? 'font-bold' : ''} onClick={() => setSection('categories')}>Categories</button>
          <button className={section === 'pricing' ? 'font-bold' : ''} onClick={() => setSection('pricing')}>Pricing Plans</button>
          <button className={section === 'collections' ? 'font-bold' : ''} onClick={() => setSection('collections')}>Collections</button>
          <button className={section === 'subcollections' ? 'font-bold' : ''} onClick={() => setSection('subcollections')}>Subcollections</button>
        </nav>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{sectionTitles[section]}</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setShowAddModal(true)}>
            Add
          </button>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Content</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{item.title}</td>
                  <td className="border px-4 py-2">{item.content}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/* Add Item Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
              <h3 className="text-lg font-bold mb-4">Add {sectionTitles[section]}</h3>
              <input
                type="text"
                placeholder="Title"
                value={newItem.title}
                onChange={e => setNewItem({ ...newItem, title: e.target.value })}
                className="w-full mb-2 px-3 py-2 border rounded"
              />
              <textarea
                placeholder="Content"
                value={newItem.content}
                onChange={e => setNewItem({ ...newItem, content: e.target.value })}
                className="w-full mb-4 px-3 py-2 border rounded"
              />
              <div className="flex justify-end space-x-2">
                <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleAddItem}>
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 