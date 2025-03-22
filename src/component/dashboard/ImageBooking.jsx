"use client";

import React, { useState } from 'react';
import axios from 'axios';

const ImageBooking = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '', // Mô tả chính
    description2: '', // Mô tả cho ảnh 2
    description3: '', // Mô tả cho ảnh 3
    description4: '', // Mô tả cho ảnh 4
  });
  const [mainImage, setMainImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [preview, setPreview] = useState({
    main: null,
    image2: null,
    image3: null,
    image4: null
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e, imageType) => {
    const file = e.target.files[0];
    if (!file) return;

    // Kiểm tra loại file
    if (!file.type.includes('image/')) {
      setMessage({ text: 'Vui lòng chọn file hình ảnh', type: 'error' });
      return;
    }

    // Tạo URL preview
    const previewUrl = URL.createObjectURL(file);
    
    // Cập nhật state tương ứng
    switch(imageType) {
      case 'main':
        setMainImage(file);
        setPreview({...preview, main: previewUrl});
        break;
      case 'image2':
        setImage2(file);
        setPreview({...preview, image2: previewUrl});
        break;
      case 'image3':
        setImage3(file);
        setPreview({...preview, image3: previewUrl});
        break;
      case 'image4':
        setImage4(file);
        setPreview({...preview, image4: previewUrl});
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!mainImage || !formData.title || !formData.description) {
      setMessage({ text: 'Vui lòng điền đầy đủ thông tin và chọn ảnh chính', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('description2', formData.description2);
      data.append('description3', formData.description3);
      data.append('description4', formData.description4);
      data.append('mainImage', mainImage);
      
      if (image2) data.append('image2', image2);
      if (image3) data.append('image3', image3);
      if (image4) data.append('image4', image4);

      const response = await axios.post('/api/imagebooking/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 || response.status === 201) {
        setMessage({ text: 'Thêm sản phẩm thành công!', type: 'success' });
        // Reset form
        setFormData({ 
          title: '', 
          description: '',
          description2: '',
          description3: '',
          description4: ''
        });
        setMainImage(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setPreview({ main: null, image2: null, image3: null, image4: null });
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage({ 
        text: error.response?.data?.message || 'Đã xảy ra lỗi khi thêm sản phẩm', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Thêm Sản Phẩm Mới</h1>
      
      {message.text && (
        <div className={`p-4 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-6">
          <label className="block mb-2 font-medium">Tiêu đề</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Nhập tiêu đề sản phẩm"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Ảnh chính */}
          <div className="border p-4 rounded">
            <label className="block mb-2 font-medium">Ảnh chính <span className="text-red-500">*</span></label>
            <input
              type="file"
              onChange={(e) => handleImageChange(e, 'main')}
              className="w-full"
              accept="image/*"
            />
            {preview.main && (
              <div className="mt-2">
                <img src={preview.main} alt="Preview" className="h-40 w-auto object-cover" />
              </div>
            )}
            <div className="mt-2">
              <label className="block mb-1 text-sm font-medium">Mô tả chính <span className="text-red-500">*</span></label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                rows="3"
                placeholder="Nhập mô tả chính"
              ></textarea>
            </div>
          </div>
          
          {/* Ảnh phụ 2 */}
          <div className="border p-4 rounded">
            <label className="block mb-2 font-medium">Ảnh phụ 2</label>
            <input
              type="file"
              onChange={(e) => handleImageChange(e, 'image2')}
              className="w-full"
              accept="image/*"
            />
            {preview.image2 && (
              <div className="mt-2">
                <img src={preview.image2} alt="Preview" className="h-40 w-auto object-cover" />
              </div>
            )}
            <div className="mt-2">
              <label className="block mb-1 text-sm font-medium">Mô tả ảnh 2</label>
              <textarea
                name="description2"
                value={formData.description2}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                rows="3"
                placeholder="Nhập mô tả cho ảnh 2"
                disabled={!image2}
              ></textarea>
            </div>
          </div>
          
          {/* Ảnh phụ 3 */}
          <div className="border p-4 rounded">
            <label className="block mb-2 font-medium">Ảnh phụ 3</label>
            <input
              type="file"
              onChange={(e) => handleImageChange(e, 'image3')}
              className="w-full"
              accept="image/*"
            />
            {preview.image3 && (
              <div className="mt-2">
                <img src={preview.image3} alt="Preview" className="h-40 w-auto object-cover" />
              </div>
            )}
            <div className="mt-2">
              <label className="block mb-1 text-sm font-medium">Mô tả ảnh 3</label>
              <textarea
                name="description3"
                value={formData.description3}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                rows="3"
                placeholder="Nhập mô tả cho ảnh 3"
                disabled={!image3}
              ></textarea>
            </div>
          </div>
          
          {/* Ảnh phụ 4 */}
          <div className="border p-4 rounded">
            <label className="block mb-2 font-medium">Ảnh phụ 4</label>
            <input
              type="file"
              onChange={(e) => handleImageChange(e, 'image4')}
              className="w-full"
              accept="image/*"
            />
            {preview.image4 && (
              <div className="mt-2">
                <img src={preview.image4} alt="Preview" className="h-40 w-auto object-cover" />
              </div>
            )}
            <div className="mt-2">
              <label className="block mb-1 text-sm font-medium">Mô tả ảnh 4</label>
              <textarea
                name="description4"
                value={formData.description4}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                rows="3"
                placeholder="Nhập mô tả cho ảnh 4"
                disabled={!image4}
              ></textarea>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Đang xử lý...' : 'Thêm hình ảnh'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImageBooking;
