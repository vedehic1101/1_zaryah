'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useSupport } from '@/contexts/SupportContext';
import { MessageCircle, Send, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const SupportPage = () => {
  const { user } = useAuth();
  const { createTicket, getTicketsByUser } = useSupport();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    subject: '',
    category: 'general',
    priority: 'medium',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'order', label: 'Order Issue' },
    { value: 'payment', label: 'Payment Problem' },
    { value: 'product', label: 'Product Question' },
    { value: 'shipping', label: 'Shipping & Delivery' },
    { value: 'account', label: 'Account Support' },
    { value: 'technical', label: 'Technical Issue' },
    { value: 'seller', label: 'Seller Support' }
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'text-green-600' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'high', label: 'High', color: 'text-red-600' }
  ];

  const userTickets = user ? getTicketsByUser(user.id) : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      router.push('/auth/login');
      return;
    }

    setLoading(true);
    const result = await createTicket({
      ...formData,
      userId: user.id,
      userEmail: user.email,
      userName: user.name
    });

    if (result.success) {
      setFormData({
        subject: '',
        category: 'general',
        priority: 'medium',
        message: ''
      });
      setShowForm(false);
    }
    setLoading(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'in-progress':
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <MessageCircle className="w-8 h-8 text-amber-600" />
            <h1 className="text-3xl font-bold text-gray-900">Customer Support</h1>
          </div>
          <p className="text-gray-600">
            We're here to help! Get support for your orders, account, or any questions you have.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Support Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Submit a Support Request</h2>
                {!showForm && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    New Ticket
                  </button>
                )}
              </div>

              {showForm ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      >
                        {categories.map(cat => (
                          <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority
                      </label>
                      <select
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      >
                        {priorities.map(priority => (
                          <option key={priority.value} value={priority.value}>{priority.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Brief description of your issue"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Please provide detailed information about your issue..."
                      required
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center space-x-2 bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 disabled:opacity-50 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      <span>{loading ? 'Submitting...' : 'Submit Ticket'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-12">
                  <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Click "New Ticket" to submit a support request</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Help */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Help</h3>
              <div className="space-y-3">
                <a href="#" className="block text-sm text-amber-600 hover:text-amber-700">
                  Track Your Order
                </a>
                <a href="#" className="block text-sm text-amber-600 hover:text-amber-700">
                  Return & Refund Policy
                </a>
                <a href="#" className="block text-sm text-amber-600 hover:text-amber-700">
                  Shipping Information
                </a>
                <a href="#" className="block text-sm text-amber-600 hover:text-amber-700">
                  Payment Methods
                </a>
                <a href="#" className="block text-sm text-amber-600 hover:text-amber-700">
                  Size Guide
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p><strong>Email:</strong> support@zaryah.com</p>
                <p><strong>Phone:</strong> +91 98765 43210</p>
                <p><strong>Hours:</strong> Mon-Fri 9AM-6PM IST</p>
                <p><strong>Response Time:</strong> Within 24 hours</p>
              </div>
            </div>

            {/* Your Tickets */}
            {user && userTickets.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Your Recent Tickets</h3>
                <div className="space-y-3">
                  {userTickets.slice(0, 3).map(ticket => (
                    <div key={ticket.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">
                          #{ticket.id.slice(-6)}
                        </span>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(ticket.status)}
                          <span className="text-xs text-gray-500 capitalize">
                            {ticket.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{ticket.subject}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SupportPage;