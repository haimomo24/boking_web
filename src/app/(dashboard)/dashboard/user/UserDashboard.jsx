"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();
  
  // Thêm state cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8); // Hiển thị 10 tài khoản mỗi trang

  // Kiểm tra quyền truy cập khi component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Lấy thông tin người dùng từ localStorage
        const userInfoString = localStorage.getItem('user');
        
        // Log để debug
        console.log("User info string:", userInfoString);
        
        if (!userInfoString) {
          console.log("No user info found in localStorage");
          setError('Bạn cần đăng nhập để truy cập trang này');
          setLoading(false);
          return;
        }
        
        // Parse thông tin người dùng
        let userInfo;
        try {
          userInfo = JSON.parse(userInfoString);
          console.log("Parsed user info:", userInfo);
        } catch (parseError) {
          console.error("Error parsing user info:", parseError);
          setError('Dữ liệu người dùng không hợp lệ');
          setLoading(false);
          return;
        }
        
        // Kiểm tra cấu trúc dữ liệu user
        console.log("Full user object:", userInfo);
        
        // Trích xuất level từ userInfo, xử lý nhiều trường hợp có thể có
        const userLevel = userInfo.level || 
                         (userInfo.user && userInfo.user.level) || 
                         '';
                         
        console.log("User level:", userLevel, "Type:", typeof userLevel);
        
        // Kiểm tra nhiều dạng level có thể có của admin
        const isAdmin = String(userLevel) === '10' || 
                       userLevel === 10 || 
                       String(userLevel).toLowerCase() === 'admin';
                       
        if (!isAdmin) {
          console.log("User is not admin");
          setError('Bạn không có quyền truy cập vào trang này');
          setLoading(false);
          return;
        }
        
        // Nếu là admin, cho phép truy cập và tải dữ liệu
        console.log("User is admin, granting access");
        setAuthorized(true);
        fetchUsers();
      } catch (err) {
        console.error('Auth check error:', err);
        setError('Có lỗi xảy ra khi kiểm tra quyền truy cập');
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      console.log("Fetched users:", response.data);
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Không thể tải danh sách người dùng. Vui lòng thử lại sau.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      try {
        await axios.delete(`/api/users/${id}`);
        setUsers(users.filter(user => user.id !== id));
      } catch (err) {
        console.error('Error deleting user:', err);
        alert('Không thể xóa người dùng. Vui lòng thử lại sau.');
      }
    }
  };

  const handleEdit = (id) => {
    router.push(`/dashboard/user/edit/${id}`);
  };

  // Hàm tạo avatar từ tên người dùng (dùng khi avatar không có hoặc lỗi)
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Hàm tạo màu ngẫu nhiên cho avatar dựa trên ID
  const getAvatarColor = (id) => {
    const colors = [
      'bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-yellow-500', 
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
    ];
    return colors[id % colors.length];
  };

  // Hàm kiểm tra xem người dùng có phải admin không
  const isAdmin = (level) => {
    return String(level) === '10' || 
           level === 10 || 
           String(level).toLowerCase() === 'admin';
  };

  // Hàm hiển thị cấp độ người dùng
  const displayUserLevel = (level) => {
    if (isAdmin(level)) {
      return 'Admin';
    }
    return 'User';
  };
  
  // Tính toán phân trang
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  
  // Tính tổng số trang
  const totalPages = Math.ceil(users.length / usersPerPage);
  
  // Hàm chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Hàm chuyển đến trang trước
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Hàm chuyển đến trang sau
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Hiển thị trạng thái không có quyền truy cập
  if (error && !authorized) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="bg-red-100 border-l-4 border-red-500 p-4 my-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-6">
          <button 
            onClick={() => router.push('/dashboard')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Quay lại Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Hiển thị trạng thái loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Hiển thị lỗi khác khi đã được xác thực
  if (error && authorized) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
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
        <div className="text-center mt-4">
          <button 
            onClick={() => fetchUsers()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  // Chỉ hiển thị nội dung khi đã được xác thực
  if (!authorized) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản Lý Người Dùng</h1>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          onClick={() => router.push('/register')}
        >
          Thêm Người Dùng Mới
        </button>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <p className="text-gray-600">Chưa có người dùng nào. Hãy thêm người dùng mới!</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">ID</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Avatar</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Tên Người Dùng</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Email</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Cấp Độ</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {user.avatar ? (
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                          <img 
                            src={user.avatar} 
                            alt={`Avatar của ${user.username}`}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.style.display = 'none';
                              e.target.parentNode.innerHTML = `
                                <div class="h-10 w-10 rounded-full ${getAvatarColor(user.id)} flex items-center justify-center text-white font-medium">
                                  ${getInitials(user.username)}
                                                              </div>
                              `;
                            }}
                          />
                        </div>
                      ) : (
                        <div className={`h-10 w-10 rounded-full ${getAvatarColor(user.id)} flex items-center justify-center text-white font-medium`}>
                          {getInitials(user.username)}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-900">{user.username}</td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        isAdmin(user.level) 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {displayUserLevel(user.level)}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(user.id)}
                          className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded-md"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className={`text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded-md ${
                            isAdmin(user.level) ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          disabled={isAdmin(user.level)} // Không cho phép xóa tài khoản admin
                          title={isAdmin(user.level) ? 'Không thể xóa tài khoản admin' : ''}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Thêm phân trang */}
          {users.length > usersPerPage && (
            <div className="mt-6 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  &laquo; 
                </button>
                
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === number
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  &raquo;
                </button>
              </nav>
            </div>
          )}
          
         
          
        </>
      )}
    </div>
  );
};

export default UserDashboard;

