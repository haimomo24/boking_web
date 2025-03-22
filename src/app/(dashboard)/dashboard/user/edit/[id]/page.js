"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const EditUser = ({ params }) => {
  const userId = params.id;
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    level: 'user',
  });
  
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        const userData = response.data;
        
        setFormData({
          username: userData.username,
          email: userData.email,
          password: '', // Không hiển thị mật khẩu hiện tại
          level: userData.level,
        });
        
        setAvatarPreview(userData.avatar || '');
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('Không thể tải thông tin người dùng. Vui lòng thử lại sau.');
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Kiểm tra loại file
    if (!file.type.includes('image/')) {
      setError('Vui lòng chọn file hình ảnh');
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage('');

    try {
      const data = new FormData();
      data.append('username', formData.username);
      data.append('email', formData.email);
      
      // Chỉ gửi mật khẩu nếu người dùng đã nhập
      if (formData.password) {
        data.append('password', formData.password);
      }
      
      data.append('level', formData.level);
      
      // Thêm avatar nếu có
      if (avatarFile) {
        data.append('avatar', avatarFile);
      }

      const response = await axios.put(`/api/users/${userId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setMessage('Cập nhật thông tin người dùng thành công!');
        // Chuyển về trang danh sách sau 2 giây
        setTimeout(() => {
          router.push('/dashboard/user');
        }, 2000);
      }
    } catch (err) {
      console.error('Error updating user:', err);
      setError(err.response?.data?.message || 'Đã xảy ra lỗi khi cập nhật thông tin người dùng');
    } finally {
      setLoading(false);
    }
  };

  // Hàm tạo avatar từ tên người dùng (dùng khi avatar không có)
  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Hàm tạo màu ngẫu nhiên cho avatar dựa trên ID
  const getAvatarColor = () => {
    const colors = [
      'bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-yellow-500', 
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => router.push('/dashboard/user')}
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Chỉnh Sửa Người Dùng</h1>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
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
      )}

      {message && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">{message}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar section */}
          <div className="w-full md:w-1/3">
            <label className="block mb-2 font-medium">Avatar</label>
            <div className="flex flex-col items-center">
              {avatarPreview ? (
                <div className="relative h-32 w-32 overflow-hidden rounded-full mb-4">
                  <img 
                    src={avatarPreview} 
                    alt="Avatar Preview" 
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      e.target.parentNode.innerHTML = `
                        <div class="h-32 w-32 rounded-full ${getAvatarColor()} flex items-center justify-center text-white font-medium text-2xl">
                          ${getInitials(formData.username)}
                        </div>
                      `;
                    }}
                  />
                </div>
              ) : (
                <div className={`h-32 w-32 rounded-full ${getAvatarColor()} flex items-center justify-center text-white font-medium text-2xl mb-4`}>
                  {getInitials(formData.username)}
                </div>
              )}
              
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thay đổi avatar
                </label>
                <input
                  type="file"
                  onChange={handleAvatarChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  accept="image/*"
                />
                <p className="mt-1 text-xs text-gray-500">
                  PNG, JPG, GIF tối đa 2MB
                </p>
              </div>
            </div>
          </div>

          {/* User info section */}
          <div className="w-full md:w-2/3 space-y-4">
            <div>
              <label className="block mb-2 font-medium">Tên người dùng</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            
            <div>
              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            
            <div>
              <label className="block mb-2 font-medium">
                Mật khẩu mới <span className="text-sm text-gray-500">(để trống nếu không thay đổi)</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block mb-2 font-medium">Cấp độ</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => router.push('/dashboard/user')}
            className="px-4 py-2 mr-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            disabled={loading}
          >
            Hủy
          </button>
          <button
            type="submit"
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Đang xử lý...' : 'Lưu thay đổi'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
