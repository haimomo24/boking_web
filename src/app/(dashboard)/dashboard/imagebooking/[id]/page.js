"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function EditProduct({ params }) {
  const router = useRouter();
  const { id } = params;
  
  const [product, setProduct] = useState({
    title: '',
    description: '',
    images: '',
    image2: '',
    image3: '',
    image4: '',
    description2: '',
    description3: '',
    description4: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageField, setImageField] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/imagebooking/${id}`);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Chỉ chấp nhận file hình ảnh (JPEG, PNG, GIF, WEBP)');
      return;
    }

    setImageField(fieldName);
    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setProduct(prev => ({
        ...prev,
        [fieldName]: response.data.url
      }));
    } catch (err) {
      console.error('Error uploading image:', err);
      alert('Không thể tải lên hình ảnh. Vui lòng thử lại sau.');
    } finally {
      setUploadingImage(false);
      setImageField('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      await axios.put(`/api/imagebooking/${id}`, product);
      router.push('/dashboard/listimage');
      alert('Cập nhật sản phẩm thành công');
    } catch (err) {
      console.error('Error updating product:', err);
      setError('Không thể cập nhật sản phẩm. Vui lòng thử lại sau.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Componente para el campo de imagen con carga de archivos
  const ImageUploadField = ({ label, name, value }) => (
    <div className="mb-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="relative">
          <input
            type="file"
            id={`${name}-upload`}
            onChange={(e) => handleImageUpload(e, name)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
          />
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            disabled={uploadingImage}
          >
            {uploadingImage && imageField === name ? 'Đang tải...' : 'Tải lên'}
          </button>
        </div>
      </div>
      {value && (
        <div className="mt-2">
          <p className="text-sm font-medium text-gray-700 mb-1">Xem trước:</p>
          <img 
            src={value} 
            alt={`Preview for ${name}`} 
            className="h-40 object-cover rounded-md"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/placeholder-image.jpg';
            }}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Chỉnh sửa sản phẩm</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tiêu đề */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
          <input
            type="text"
            id="title"
            name="title"
            value={product.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        {/* Phần 1: Hình ảnh chính và mô tả chính */}
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h2 className="text-lg font-medium text-gray-800 mb-3">Phần 1</h2>
          
          {/* Hình ảnh chính với tải lên */}
          <ImageUploadField 
            label="Hình ảnh chính" 
            name="images" 
            value={product.images} 
          />
          
          {/* Mô tả chính */}
          <div className="mb-4 mt-3">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Mô tả chính</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>
        </div>
        
        {/* Phần 2: Hình ảnh 2 và mô tả 2 */}
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h2 className="text-lg font-medium text-gray-800 mb-3">Phần 2</h2>
          
          {/* Hình ảnh 2 với tải lên */}
          <ImageUploadField 
            label="Hình ảnh 2" 
            name="image2" 
            value={product.image2} 
          />
          
          {/* Mô tả 2 */}
          <div className="mb-4 mt-3">
            <label htmlFor="description2" className="block text-sm font-medium text-gray-700 mb-1">Mô tả 2</label>
            <textarea
              id="description2"
              name="description2"
              value={product.description2}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
        </div>
        
        {/* Phần 3: Hình ảnh 3 và mô tả 3 */}
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h2 className="text-lg font-medium text-gray-800 mb-3">Phần 3</h2>
          
          {/* Hình ảnh 3 với tải lên */}
          <ImageUploadField 
            label="Hình ảnh 3" 
            name="image3" 
            value={product.image3} 
          />
          
          {/* Mô tả 3 */}
          <div className="mb-4 mt-3">
            <label htmlFor="description3" className="block text-sm font-medium text-gray-700 mb-1">Mô tả 3</label>
            <textarea
              id="description3"
              name="description3"
              value={product.description3}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
        </div>
        
        {/* Phần 4: Hình ảnh 4 và mô tả 4 */}
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h2 className="text-lg font-medium text-gray-800 mb-3">Phần 4</h2>
          
          {/* Hình ảnh 4 với tải lên */}
          <ImageUploadField 
            label="Hình ảnh 4" 
            name="image4" 
            value={product.image4} 
          />
          
          {/* Mô tả 4 */}
          <div className="mb-4 mt-3">
            <label htmlFor="description4" className="block text-sm font-medium text-gray-700 mb-1">Mô tả 4</label>
            <textarea
              id="description4"
              name="description4"
              value={product.description4}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push('/dashboard/listimage')}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={submitting || uploadingImage}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${(submitting || uploadingImage) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {submitting ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
        </div>
      </form>
    </div>
  );
}
