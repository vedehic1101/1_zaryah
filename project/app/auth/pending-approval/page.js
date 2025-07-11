'use client';

import Link from 'next/link';
import { Clock, Mail, CheckCircle, Heart } from 'lucide-react';

const PendingApprovalPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Header */}
        <Link href="/" className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <span className="text-3xl font-bold text-amber-800">Zaryah</span>
        </Link>

        {/* Status Icon */}
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="w-10 h-10 text-amber-600" />
        </div>

        {/* Content */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Account Under Review
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Thank you for joining Zaryah as a seller! Your account is currently being reviewed by our team. 
          This process typically takes 24-48 hours.
        </p>

        {/* What happens next */}
        <div className="bg-amber-50 rounded-lg p-6 mb-6 text-left">
          <h3 className="font-semibold text-amber-800 mb-3 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            What happens next?
          </h3>
          <ul className="space-y-2 text-sm text-amber-700">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Our team will review your business information
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              You'll receive an email notification once approved
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Access to your seller dashboard will be activated
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-6">
          <Mail className="w-4 h-4" />
          <span>Questions? Contact us at support@zaryah.com</span>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-amber-600 text-white py-3 px-4 rounded-lg hover:bg-amber-700 transition-colors font-medium"
          >
            Continue Shopping
          </Link>
          <Link
            href="/auth/login"
            className="block w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Sign In Later
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PendingApprovalPage;