"use client";

import React, { useState, useEffect } from 'react';

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Thêm state cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(8);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/contacts');
        if (!response.ok) {
          throw new Error('Lỗi khi lấy dữ liệu');
        }
        const data = await response.json();
        setContacts(data);
        setLoading(false);
      } catch (error) {
        console.error('Lỗi:', error);
        setError('Không thể lấy dữ liệu liên hệ');
        setLoading(false);
      }
    };
    
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa liên hệ này không?')) {
      try {
        const response = await fetch(`/api/contacts/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Lỗi khi xóa');
        }
        
        setContacts(contacts.filter(contact => contact.id !== id));
        alert('Xóa liên hệ thành công');
      } catch (error) {
        console.error('Lỗi:', error);
        alert('Không thể xóa liên hệ');
      }
    }
  };

  // Tính toán phân trang
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);
  
  // Tính tổng số trang
  const totalPages = Math.ceil(contacts.length / contactsPerPage);

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

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Đang tải dữ liệu...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="contact-container">
      <h1 className="page-title">Danh sách liên hệ</h1>
      
      <div className="table-responsive">
        <table className="contact-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              
            </tr>
          </thead>
          <tbody>
            {currentContacts.length > 0 ? (
              currentContacts.map(contact => (
                <tr key={contact.id}>
                  <td>{contact.id}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                 
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">Không tìm thấy liên hệ nào</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Thêm phần phân trang */}
      {contacts.length > 0 && (
        <div className="pagination">
          <button 
            onClick={goToPreviousPage} 
            disabled={currentPage === 1}
            className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
          >
            &laquo; 
          </button>
          
          <div className="pagination-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`pagination-number ${currentPage === number ? 'active' : ''}`}
              >
                {number}
              </button>
            ))}
          </div>
          
          <button 
            onClick={goToNextPage} 
            disabled={currentPage === totalPages}
            className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
          >
           &raquo;
          </button>
        </div>
      )}
      
      
      
      <style jsx>{`
        .contact-container {
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .page-title {
          color: #333;
          margin-bottom: 20px;
          font-size: 24px;
          border-bottom: 2px solid #3498db;
          padding-bottom: 10px;
        }
        
        .contact-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
          background-color: white;
        }
        
        .contact-table th, 
        .contact-table td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }
        
        .contact-table th {
          background-color: #3498db;
          color: white;
          font-weight: bold;
        }
        
        .contact-table tr:nth-child(even) {
          background-color: #f2f2f2;
        }
        
        .contact-table tr:hover {
          background-color: #e9f7fe;
        }
        
        .view-btn, .delete-btn {
          padding: 6px 12px;
          margin-right: 5px;
          cursor: pointer;
          border: none;
          border-radius: 4px;
          font-weight: bold;
          transition: all 0.3s;
        }
        
        .view-btn {
          background-color: #3498db;
          color: white;
        }
        
        .view-btn:hover {
          background-color: #2980b9;
        }
        
        .delete-btn {
          background-color: #e74c3c;
          color: white;
        }
        
        .delete-btn:hover {
          background-color: #c0392b;
        }
        
        .error-container {
          color: #721c24;
          background-color: #f8d7da;
          border: 1px solid #f5c6cb;
          padding: 15px;
          border-radius: 4px;
          margin: 20px 0;
          display: flex;
          align-items: center;
        }
        
        .error-icon {
          font-size: 24px;
          margin-right: 10px;
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px;
        }
        
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border-left-color: #3498db;
          animation: spin 1s linear infinite;
          margin-bottom: 10px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .no-data {
          text-align: center;
          color: #777;
          padding: 20px;
        }
        
        .action-buttons {
          display: flex;
          gap: 5px;
        }
        
        .table-responsive {
          overflow-x: auto;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          border-radius: 5px;
        }
        
        /* Thêm CSS cho phân trang */
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
          gap: 10px;
        }
        
        .pagination-button {
          padding: 8px 16px;
          background-color: #3498db;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .pagination-button:hover:not(.disabled) {
          background-color: #2980b9;
        }
        
        .pagination-button.disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        
        .pagination-numbers {
          display: flex;
          gap: 5px;
        }
        
        .pagination-number {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f2f2f2;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .pagination-number:hover:not(.active) {
          background-color: #e9f7fe;
        }
        
        .pagination-number.active {
          background-color: #3498db;
          color: white;
          border-color: #3498db;
        }
        
        .pagination-info {
          text-align: center;
          color: #666;
          margin-top: 10px;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default Contact;
