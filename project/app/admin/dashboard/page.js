'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useSupport } from '@/contexts/SupportContext';
import { Users, Package, ShoppingCart, MessageCircle, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { tickets, updateTicketStatus, addMessage } = useSupport();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    pendingSellers: 0
  });
  const [pendingSellers, setPendingSellers] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    if (user.role !== 'admin') {
      router.push('/');
      return;
    }

    // Load mock data
    setStats({
      totalUsers: 1247,
      totalProducts: 3456,
      totalOrders: 892,
      pendingSellers: 12
    });

    // Mock pending sellers
    setPendingSellers([
      {
        id: '1',
        name: 'Priya Ceramics',
        email: 'priya@ceramics.com',
        businessName: 'Priya\'s Pottery Studio',
        city: 'Mumbai',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Raj Woodworks',
        email: 'raj@woodworks.com',
        businessName: 'Traditional Wood Crafts',
        city: 'Jaipur',
        createdAt: new Date().toISOString()
      }
    ]);
  }, [user, router]);

  const handleApproveSeller = (sellerId) => {
    setPendingSellers(prev => prev.filter(s => s.id !== sellerId));
    // In a real app, this would send an approval email
    alert('Seller approved! Verification email sent.');
  };

  const handleRejectSeller = (sellerId) => {
    setPendingSellers(prev => prev.filter(s => s.id !== sellerId));
    alert('Seller rejected.');
  };

  const handleReplyToTicket = (ticketId) => {
    if (replyMessage.trim()) {
      addMessage(ticketId, replyMessage, 'admin');
      updateTicketStatus(ticketId, 'in-progress');
      setReplyMessage('');
      setSelectedTicket(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-amber-800">Zaryah Admin</h1>
              <span className="text-gray-500">|</span>
              <span className="text-gray-700">Welcome, {user.name}</span>
            </div>
            <button
              onClick={logout}
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
              <Package className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Support Tickets</p>
                <p className="text-2xl font-bold text-gray-900">{tickets.length}</p>
              </div>
              <MessageCircle className="w-8 h-8 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Sellers */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-amber-600" />
                Pending Seller Approvals
              </h2>
            </div>
            <div className="p-6">
              {pendingSellers.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No pending approvals</p>
              ) : (
                <div className="space-y-4">
                  {pendingSellers.map((seller) => (
                    <div key={seller.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{seller.name}</h3>
                          <p className="text-sm text-gray-600">{seller.email}</p>
                          <p className="text-sm text-gray-600">{seller.businessName}</p>
                          <p className="text-sm text-gray-500">{seller.city}</p>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() => handleApproveSeller(seller.id)}
                            className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => handleRejectSeller(seller.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Support Tickets */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-amber-600" />
                Recent Support Tickets
              </h2>
            </div>
            <div className="p-6">
              {tickets.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No support tickets</p>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {tickets.slice(0, 10).map((ticket) => (
                    <div key={ticket.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">#{ticket.id.slice(-6)}</h3>
                          <p className="text-sm text-gray-600">{ticket.subject}</p>
                          <p className="text-xs text-gray-500">by {ticket.userName}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedTicket(ticket)}
                          className="text-sm text-amber-600 hover:text-amber-700"
                        >
                          Reply
                        </button>
                        <button
                          onClick={() => updateTicketStatus(ticket.id, 'resolved')}
                          className="text-sm text-green-600 hover:text-green-700"
                        >
                          Resolve
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reply Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Reply to Ticket #{selectedTicket.id.slice(-6)}</h3>
              <p className="text-sm text-gray-600 mb-4">{selectedTicket.subject}</p>
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Type your reply..."
              />
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => handleReplyToTicket(selectedTicket.id)}
                  className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700"
                >
                  Send Reply
                </button>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;