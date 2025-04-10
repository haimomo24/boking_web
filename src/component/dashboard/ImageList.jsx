"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const ImageList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Thêm state cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/imagebooking');
        setProducts(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        await axios.delete(`/api/imagebooking/${id}`);
        setProducts(products.filter(product => product.id !== id));
      } catch (err) {
        console.error('Error deleting product:', err);
        alert('Không thể xóa sản phẩm. Vui lòng thử lại sau.');
      }
    }
  };

  // Tính toán các sản phẩm hiển thị cho trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Tính tổng số trang
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Hàm thay đổi trang
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

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Danh sách hình ảnh </h1>
        <Link href="/dashboard/add-product" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
          Thêm Sản Phẩm Mới
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-gray-600">Chưa có sản phẩm nào. Hãy thêm sản phẩm mới!</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">ID</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Hình Ảnh</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Tiêu Đề</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Mô Tả</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-900">{product.id}</td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <img 
                        src={product.images} 
                        alt={product.title} 
                        className="h-16 w-16 object-cover rounded-md"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/placeholder-image.jpg'; // Đường dẫn đến ảnh mặc định
                        }}
                      />
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-900">{product.title}</td>
                    <td className="py-4 px-4 text-sm text-gray-900">
                      {product.description.length > 100 
                        ? `${product.description.substring(0, 100)}...` 
                        : product.description}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link 
                          href={`/dashboard/imagebooking/${product.id}`}
                          className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded-md"
                        >
                          Sửa
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded-md"
                        >
                          Xóa
                        </button>
                        <Link 
                          href={`/product/${product.id}`}
                          className="text-green-600 hover:text-green-900 bg-green-50 px-3 py-1 rounded-md"
                          target="_blank"
                        >
                          Xem
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Phân trang */}
          <div className="flex justify-center items-center mt-6">
            <nav className="flex items-center">
              <button 
                onClick={goToPreviousPage} 
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md mr-2 ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
               
              </button>
              
              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-3 py-1 rounded-md ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {number}
                  </button>
                ))}
              </div>
              
              <button 
                onClick={goToNextPage} 
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ml-2 ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
              >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
          
          <div className="text-center mt-2 text-sm text-gray-600">
            Hiển thị {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, products.length)} trên tổng số {products.length} sản phẩm
          </div>
        </>
      )}
    </div>
  );
};

export default ImageList;
