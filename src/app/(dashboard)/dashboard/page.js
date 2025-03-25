"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';

export default function DashboardPage() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [editedUser, setEditedUser] = useState(null);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [error, setError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const fileInputRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        // Kiểm tra xem người dùng đã đăng nhập chưa
        const userData = localStorage.getItem('user');
        if (!userData) {
            // Nếu chưa đăng nhập, chuyển hướng về trang login
            router.push('/login');
            return;
        }
        
        // Nếu đã đăng nhập, lưu thông tin người dùng vào state
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setEditedUser(parsedUser); // Khởi tạo dữ liệu chỉnh sửa
    }, [router]);

    // Bắt đầu chỉnh sửa
    const handleStartEdit = () => {
        setIsEditing(true);
        setAvatarPreview(null);
        setAvatarFile(null);
    };

    // Bắt đầu thay đổi mật khẩu
    const handleStartChangePassword = () => {
        setIsChangingPassword(true);
        setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
        setPasswordError(null);
    };

    // Hủy chỉnh sửa
    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedUser(user); // Reset về dữ liệu ban đầu
        setError(null);
        setAvatarPreview(null);
        setAvatarFile(null);
    };

    // Hủy thay đổi mật khẩu
    const handleCancelChangePassword = () => {
        setIsChangingPassword(false);
        setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
        setPasswordError(null);
    };

    // Cập nhật dữ liệu khi người dùng thay đổi input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({
            ...editedUser,
            [name]: value
        });
    };

    // Cập nhật dữ liệu mật khẩu khi người dùng thay đổi input
    const handlePasswordInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({
            ...passwordData,
            [name]: value
        });
    };

    // Xử lý khi người dùng chọn file avatar
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Kiểm tra loại file
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            setError('Chỉ chấp nhận file hình ảnh (JPEG, PNG, GIF, WEBP)');
            return;
        }

        // Kiểm tra kích thước file (giới hạn 2MB)
        if (file.size > 2 * 1024 * 1024) {
            setError('Kích thước file không được vượt quá 2MB');
            return;
        }

        setAvatarFile(file);
        
        // Tạo URL xem trước
        const previewUrl = URL.createObjectURL(file);
        setAvatarPreview(previewUrl);
    };

    // Xử lý khi người dùng click vào avatar để chọn file
    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    // Lưu thay đổi thông tin cá nhân
    const handleSaveChanges = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Kiểm tra dữ liệu đầu vào
            if (!editedUser.username || !editedUser.email) {
                setError('Tên người dùng và email không được để trống');
                setLoading(false);
                return;
            }
            
            // Tạo FormData để gửi dữ liệu và file
            const formData = new FormData();
            formData.append('username', editedUser.username);
            formData.append('email', editedUser.email);
            
            // Thêm avatar nếu có
            if (avatarFile) {
                formData.append('avatar', avatarFile);
            }
            
            // Gọi API để cập nhật thông tin người dùng
            const response = await axios.put(`/api/users/${user.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            // Cập nhật thông tin người dùng trong localStorage
            const updatedUser = { 
                ...user, 
                username: editedUser.username,
                email: editedUser.email
            };
            
            // Cập nhật avatar nếu API trả về URL mới
            if (response.data.avatar) {
                updatedUser.avatar = response.data.avatar;
            }
            
            localStorage.setItem('user', JSON.stringify(updatedUser));
            
            // Cập nhật state
            setUser(updatedUser);
            setIsEditing(false);
            setSuccessMessage('Cập nhật thông tin thành công');
            setAvatarPreview(null);
            setAvatarFile(null);
            
            // Xóa thông báo thành công sau 3 giây
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
            
        } catch (err) {
            console.error('Error updating user:', err);
            setError(err.response?.data?.message || 'Có lỗi xảy ra khi cập nhật thông tin');
        } finally {
            setLoading(false);
        }
    };

    // Lưu thay đổi mật khẩu
    const handleChangePassword = async () => {
        try {
            setPasswordLoading(true);
            setPasswordError(null);
            
            // Kiểm tra dữ liệu đầu vào
            if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
                setPasswordError('Vui lòng điền đầy đủ thông tin');
                setPasswordLoading(false);
                return;
            }
            
            // Kiểm tra mật khẩu mới và xác nhận mật khẩu
            if (passwordData.newPassword !== passwordData.confirmPassword) {
                setPasswordError('Mật khẩu mới và xác nhận mật khẩu không khớp');
                setPasswordLoading(false);
                return;
            }
            
            // Kiểm tra độ dài mật khẩu mới
            if (passwordData.newPassword.length < 6) {
                setPasswordError('Mật khẩu mới phải có ít nhất 6 ký tự');
                setPasswordLoading(false);
                return;
            }
            
            // Gọi API để thay đổi mật khẩu
            const response = await axios.post(`/api/users/${user.id}/change-password`, {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });
            
            // Đặt lại form
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            
            // Đóng form thay đổi mật khẩu
            setIsChangingPassword(false);
            
            // Hiển thị thông báo thành công
            setSuccessMessage('Thay đổi mật khẩu thành công');
            
            // Xóa thông báo thành công sau 3 giây
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
            
        } catch (err) {
            console.error('Error changing password:', err);
            setPasswordError(err.response?.data?.message || 'Có lỗi xảy ra khi thay đổi mật khẩu');
        } finally {
            setPasswordLoading(false);
        }
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

    // Hiển thị loading khi chưa lấy được thông tin người dùng
    if (!user) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Quản trị viên</h1>
            <p className="mb-4">Chào mừng <span className="font-semibold">{user.username}</span> đến với trang quản trị</p>
            
            {successMessage && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
                    <p>{successMessage}</p>
                </div>
            )}
            
            {/* Phần thông tin cá nhân */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">Thông tin tài khoản</h2>
                    {!isEditing ? (
                        <button 
                            onClick={handleStartEdit}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                        >
                            Chỉnh sửa
                        </button>
                    ) : (
                        <div className="flex space-x-2">
                            <button 
                                onClick={handleCancelEdit}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
                                disabled={loading}
                            >
                                Hủy
                            </button>
                            <button 
                                onClick={handleSaveChanges}
                                className={`bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                disabled={loading}
                            >
                                {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                            </button>
                        </div>
                    )}
                </div>
                
                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                        <p>{error}</p>
                    </div>
                )}
                
                <div className="flex flex-col md:flex-row md:space-x-6">
                    {/* Avatar section */}
                    <div className="mb-6 md:mb-0">
                        <div className="flex flex-col items-center">
                            {isEditing ? (
                                <>
                                    <div 
                                        onClick={handleAvatarClick}
                                        className="relative h-32 w-32 rounded-full overflow-hidden cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-500 flex items-center justify-center"
                                    >
                                        {avatarPreview ? (
                                            <img 
                                                src={avatarPreview} 
                                                alt="Avatar preview" 
                                                className="h-full w-full object-cover"
                                            />
                                        ) : user.avatar ? (
                                            <img 
                                                src={user.avatar} 
                                                alt={`Avatar của ${user.username}`}
                                                className="h-full w-full object-cover"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.style.display = 'none';
                                                    e.target.parentNode.innerHTML = `
                                                    <div class="h-full w-full rounded-full ${getAvatarColor(user.id)} flex items-center justify-center text-white font-medium text-2xl">
                                                        ${getInitials(user.username)}
                                                    </div>
                                                `;
                                            }}
                                        />
                                    ) : (
                                        <div className={`h-full w-full rounded-full ${getAvatarColor(user.id)} flex items-center justify-center text-white font-medium text-2xl`}>
                                            {getInitials(user.username)}
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                        <span className="text-white text-sm font-medium">Thay đổi ảnh</span>
                                    </div>
                                </div>
                                <input 
                                    type="file" 
                                    ref={fileInputRef}
                                    onChange={handleAvatarChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <p className="text-sm text-gray-500 mt-2">Click vào ảnh để thay đổi</p>
                            </>
                        ) : (
                            <div className="h-32 w-32 rounded-full overflow-hidden">
                                {user.avatar ? (
                                    <img 
                                        src={user.avatar} 
                                        alt={`Avatar của ${user.username}`}
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.style.display = 'none';
                                            e.target.parentNode.innerHTML = `
                                                <div class="h-full w-full rounded-full ${getAvatarColor(user.id)} flex items-center justify-center text-white font-medium text-2xl">
                                                    ${getInitials(user.username)}
                                                </div>
                                            `;
                                        }}
                                    />
                                ) : (
                                    <div className={`h-full w-full rounded-full ${getAvatarColor(user.id)} flex items-center justify-center text-white font-medium text-2xl`}>
                                        {getInitials(user.username)}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                
                {/* User info section */}
                <div className="flex-1">
                    {!isEditing ? (
                        <div className="space-y-2">
                            <p><span className="font-medium">Tên người dùng:</span> {user.username}</p>
                            <p><span className="font-medium">Email:</span> {user.email}</p>
                            <p><span className="font-medium">Cấp độ:</span> {user.level}</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                    Tên người dùng
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={editedUser.username}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={editedUser.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
                                    Cấp độ
                                </label>
                                <input
                                    type="text"
                                    id="level"
                                    name="level"
                                    value={editedUser.level}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                                />
                                <p className="text-xs text-gray-500 mt-1">Cấp độ người dùng không thể thay đổi</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        
        {/* Phần thay đổi mật khẩu */}
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Thay đổi mật khẩu</h2>
                {!isChangingPassword ? (
                    <button 
                        onClick={handleStartChangePassword}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        Thay đổi mật khẩu
                    </button>
                ) : (
                    <div className="flex space-x-2">
                        <button 
                            onClick={handleCancelChangePassword}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
                            disabled={passwordLoading}
                        >
                            Hủy
                        </button>
                        <button 
                            onClick={handleChangePassword}
                            className={`bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors ${passwordLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            disabled={passwordLoading}
                        >
                            {passwordLoading ? 'Đang xử lý...' : 'Lưu mật khẩu mới'}
                        </button>
                    </div>
                )}
            </div>
            
            {passwordError && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                    <p>{passwordError}</p>
                </div>
            )}
            
            {isChangingPassword && (
                <div className="space-y-4">
                    <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Mật khẩu hiện tại
                        </label>
                        <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Nhập mật khẩu hiện tại"
                        />
                    </div>
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Mật khẩu mới
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Xác nhận mật khẩu mới
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Nhập lại mật khẩu mới"
                        />
                    </div>
                    <div className="pt-2">
                        <p className="text-sm text-gray-500">
                            Lưu ý: Sau khi thay đổi mật khẩu, bạn sẽ cần đăng nhập lại với mật khẩu mới.
                        </p>
                    </div>
                </div>
            )}
            
            {!isChangingPassword && (
                <p className="text-sm text-gray-600">
                    Bạn có thể thay đổi mật khẩu của mình để tăng cường bảo mật tài khoản.
                </p>
            )}
        </div>
    </div>
);
}

