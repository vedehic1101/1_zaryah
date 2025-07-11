'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Heart, Gift, Users, Calendar, Sparkles } from 'lucide-react';
import { dummyProducts } from '@/data/products';

const GiftSuggesterPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({
    recipient: '',
    relationship: '',
    occasion: '',
    interests: [],
    budget: '',
    personalityType: '',
    ageGroup: '',
    giftType: ''
  });

  const steps = [
    { id: 1, title: 'Who is it for?', icon: Users },
    { id: 2, title: 'What\'s the occasion?', icon: Calendar },
    { id: 3, title: 'Tell us more', icon: Heart },
    { id: 4, title: 'Get suggestions', icon: Sparkles }
  ];

  const recipients = [
    { value: 'mother', label: 'Mother' },
    { value: 'father', label: 'Father' },
    { value: 'spouse', label: 'Spouse/Partner' },
    { value: 'friend', label: 'Friend' },
    { value: 'colleague', label: 'Colleague' },
    { value: 'sibling', label: 'Sibling' },
    { value: 'child', label: 'Child' },
    { value: 'other', label: 'Other' }
  ];

  const occasions = [
    { value: 'birthday', label: 'Birthday' },
    { value: 'anniversary', label: 'Anniversary' },
    { value: 'wedding', label: 'Wedding' },
    { value: 'festival', label: 'Festival' },
    { value: 'graduation', label: 'Graduation' },
    { value: 'promotion', label: 'Promotion' },
    { value: 'justbecause', label: 'Just Because' },
    { value: 'other', label: 'Other' }
  ];

  const interests = [
    { value: 'art', label: 'Art & Crafts' },
    { value: 'books', label: 'Books & Reading' },
    { value: 'music', label: 'Music' },
    { value: 'sports', label: 'Sports & Fitness' },
    { value: 'travel', label: 'Travel' },
    { value: 'cooking', label: 'Cooking' },
    { value: 'gardening', label: 'Gardening' },
    { value: 'technology', label: 'Technology' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'wellness', label: 'Wellness & Self-care' }
  ];

  const budgetRanges = [
    { value: '0-500', label: 'Under ₹500' },
    { value: '500-1000', label: '₹500 - ₹1,000' },
    { value: '1000-2500', label: '₹1,000 - ₹2,500' },
    { value: '2500-5000', label: '₹2,500 - ₹5,000' },
    { value: '5000+', label: 'Above ₹5,000' }
  ];

  // Generate suggestions based on form data
  const generateSuggestions = () => {
    let suggestions = [...dummyProducts];
    
    // Filter by recipient/category
    if (formData.recipient && formData.recipient !== 'other') {
      const categoryMap = {
        'mother': 'for-her',
        'father': 'for-him',
        'spouse': 'for-her',
        'friend': 'for-her',
        'colleague': 'for-him',
        'sibling': 'for-him',
        'child': 'for-kids'
      };
      const targetCategory = categoryMap[formData.recipient];
      if (targetCategory) {
        suggestions = suggestions.filter(p => p.category === targetCategory);
      }
    }
    
    // Filter by occasion
    if (formData.occasion) {
      if (formData.occasion === 'wedding' || formData.occasion === 'anniversary') {
        suggestions = suggestions.filter(p => p.category === 'occasions' || p.category === 'for-her');
      }
    }
    
    // Add match reasons
    return suggestions.slice(0, 6).map(product => ({
      ...product,
      matchReason: `Perfect for ${formData.recipient || 'your recipient'} who loves ${formData.interests.join(', ') || 'thoughtful gifts'}`
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Generate suggestions
      setSuggestions(generateSuggestions());
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      recipient: '',
      relationship: '',
      occasion: '',
      interests: [],
      budget: '',
      personalityType: '',
      ageGroup: '',
      giftType: ''
    });
    setSuggestions([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Gift className="w-8 h-8 text-amber-600" />
            <h1 className="text-3xl font-bold text-gray-900">Gift Suggester</h1>
          </div>
          <p className="text-gray-600">
            Let us help you find the perfect gift that tells your story
          </p>
        </div>

        {suggestions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex items-center space-x-2 ${
                      currentStep >= step.id ? 'text-amber-600' : 'text-gray-400'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        currentStep >= step.id
                          ? 'bg-amber-600 text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      <step.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium hidden sm:block">{step.title}</span>
                  </div>
                ))}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Step Content */}
            <div className="space-y-6">
              {currentStep === 1 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Who are you buying for?</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {recipients.map((recipient) => (
                      <button
                        key={recipient.value}
                        onClick={() => handleInputChange('recipient', recipient.value)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          formData.recipient === recipient.value
                            ? 'border-amber-600 bg-amber-50'
                            : 'border-gray-200 hover:border-amber-300'
                        }`}
                      >
                        {recipient.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">What's the occasion?</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {occasions.map((occasion) => (
                      <button
                        key={occasion.value}
                        onClick={() => handleInputChange('occasion', occasion.value)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          formData.occasion === occasion.value
                            ? 'border-amber-600 bg-amber-50'
                            : 'border-gray-200 hover:border-amber-300'
                        }`}
                      >
                        {occasion.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">What are their interests?</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {interests.map((interest) => (
                        <button
                          key={interest.value}
                          onClick={() => handleInterestToggle(interest.value)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.interests.includes(interest.value)
                              ? 'border-amber-600 bg-amber-50'
                              : 'border-gray-200 hover:border-amber-300'
                          }`}
                        >
                          {interest.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">What's your budget?</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {budgetRanges.map((budget) => (
                        <button
                          key={budget.value}
                          onClick={() => handleInputChange('budget', budget.value)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.budget === budget.value
                              ? 'border-amber-600 bg-amber-50'
                              : 'border-gray-200 hover:border-amber-300'
                          }`}
                        >
                          {budget.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold mb-2">Finding perfect gifts for you...</h3>
                  <p className="text-gray-600">This will only take a moment</p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
              >
                {currentStep === 4 ? 'Get Suggestions' : 'Next'}
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Results Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Perfect Gifts for You
                  </h2>
                  <p className="text-gray-600">
                    Based on your preferences, here are our top recommendations
                  </p>
                </div>
                <button
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Start Over
                </button>
              </div>
            </div>

            {/* Suggestions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestions.map((product) => (
                <div key={product.id} className="space-y-4">
                  <ProductCard product={product} />
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <p className="text-sm text-amber-800 font-medium">
                      Why we recommend this:
                    </p>
                    <p className="text-sm text-amber-700 mt-1">
                      {product.matchReason}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default GiftSuggesterPage;