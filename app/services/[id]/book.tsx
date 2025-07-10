import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const FIELD_TYPES = [
  'Text', 'Text area', 'Heading', 'Paragraph', 'Select', 'Dropdown', 'Radio Button', 'Checkbox', 'Number', 'Phone', 'Email', 'Datetime', 'File Upload', 'Image Dropdown', 'Image Swatch', 'Color Dropdown', 'Color Picker', 'Color Swatch', 'Font Picker', 'Range Slider', 'Tabs', 'Switch', 'Button', 'Divider', 'Spacing', 'Pop-up Modal', 'Size chart', 'Product Links', 'Hidden Field', 'HTML'
];

export default function ServiceBookingPage() {
  const router = useRouter();
  const { id } = router.query;
  const [service, setService] = useState<any>(null);
  const [values, setValues] = useState<any>({});
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    fetch(`/api/services`)
      .then(res => res.json())
      .then(data => {
        const found = (data.services || []).find((s: any) => s.id === id);
        setService(found);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!service) return;
    let price = 0;
    service.steps?.forEach((step: any, idx: number) => {
      if (step.impactsPricing && values[`step_${idx}`]) {
        // For checkboxes, add price if checked; for select/radio, add price for selected option if priceAddon is set
        if (['Checkbox', 'Switch'].includes(step.type)) {
          if (values[`step_${idx}`]) price += Number(step.priceAddon || 0);
        } else if (['Select', 'Dropdown', 'Radio Button', 'Image Dropdown', 'Image Swatch', 'Color Dropdown', 'Color Swatch'].includes(step.type)) {
          // Optionally, support per-option priceAddon in future
          price += Number(step.priceAddon || 0);
        } else {
          price += Number(step.priceAddon || 0);
        }
      }
    });
    setTotal(price);
  }, [values, service]);

  if (loading) return <div>Loading...</div>;
  if (!service) return <div>Service not found.</div>;

  const handleChange = (idx: number, value: any) => {
    setValues((v: any) => ({ ...v, [`step_${idx}`]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // TODO: Submit booking
    alert('Booking submitted!');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">{service.name}</h1>
      <p className="mb-6 text-gray-700">{service.description}</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        {service.steps?.map((step: any, idx: number) => (
          <div key={idx} className="mb-4">
            {/* Render field based on type */}
            {['Heading'].includes(step.type) && <h2 className="text-xl font-semibold mb-2">{step.label}</h2>}
            {['Paragraph'].includes(step.type) && <p className="mb-2 text-gray-600">{step.label}</p>}
            {['Divider'].includes(step.type) && <hr className="my-4" />}
            {['Spacing'].includes(step.type) && <div style={{ height: 24 }} />}
            {['Text'].includes(step.type) && (
              <input type="text" className="w-full border px-3 py-2 rounded" placeholder={step.label} value={values[`step_${idx}`] || ''} onChange={e => handleChange(idx, e.target.value)} required />
            )}
            {['Text area'].includes(step.type) && (
              <textarea className="w-full border px-3 py-2 rounded" placeholder={step.label} value={values[`step_${idx}`] || ''} onChange={e => handleChange(idx, e.target.value)} required />
            )}
            {['Number'].includes(step.type) && (
              <input type="number" className="w-full border px-3 py-2 rounded" placeholder={step.label} value={values[`step_${idx}`] || ''} onChange={e => handleChange(idx, e.target.value)} required />
            )}
            {['Phone'].includes(step.type) && (
              <input type="tel" className="w-full border px-3 py-2 rounded" placeholder={step.label} value={values[`step_${idx}`] || ''} onChange={e => handleChange(idx, e.target.value)} required />
            )}
            {['Email'].includes(step.type) && (
              <input type="email" className="w-full border px-3 py-2 rounded" placeholder={step.label} value={values[`step_${idx}`] || ''} onChange={e => handleChange(idx, e.target.value)} required />
            )}
            {['Datetime'].includes(step.type) && (
              <input type="datetime-local" className="w-full border px-3 py-2 rounded" value={values[`step_${idx}`] || ''} onChange={e => handleChange(idx, e.target.value)} required />
            )}
            {['Checkbox'].includes(step.type) && (
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={!!values[`step_${idx}`]} onChange={e => handleChange(idx, e.target.checked)} />
                <span>{step.label}</span>
              </label>
            )}
            {['Switch'].includes(step.type) && (
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={!!values[`step_${idx}`]} onChange={e => handleChange(idx, e.target.checked)} />
                <span>{step.label}</span>
              </label>
            )}
            {['Select', 'Dropdown', 'Radio Button', 'Image Dropdown', 'Image Swatch', 'Color Dropdown', 'Color Swatch'].includes(step.type) && (
              <select className="w-full border px-3 py-2 rounded" value={values[`step_${idx}`] || ''} onChange={e => handleChange(idx, e.target.value)} required>
                <option value="">Select {step.label}</option>
                {(step.options || []).map((opt: string, i: number) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            )}
            {['File Upload'].includes(step.type) && (
              <input type="file" className="w-full" onChange={e => handleChange(idx, e.target.files?.[0])} required />
            )}
            {/* Add more field types as needed */}
            {step.impactsPricing && (
              <div className="text-sm text-blue-600 mt-1">+ ₹{step.priceAddon || 0} (Price Add-on)</div>
            )}
          </div>
        ))}
        <div className="border-t pt-4 mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Total Price</span>
            <span className="text-xl font-bold">₹{total}</span>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded mt-4">Book Now</button>
        </div>
      </form>
    </div>
  );
} 