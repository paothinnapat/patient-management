'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function PatientForm() {
  const router = useRouter();

  // Form state management
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    email: '',
    address: '',
    preferredLanguage: '',
    nationality: '',
    emergencyContactName: '',
    emergencyContactRelation: '',
    religion: ''
  });

  // Form validation state
  const [errors, setErrors] = useState({});
  
  // Form activity tracking
  // eslint-disable-next-line no-unused-vars
  const [isActive, setIsActive] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setLastActivity(Date.now());
    setIsActive(true);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setSubmitStatus('Please fix the errors before submitting.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('Submitting...');

    try {
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }
// eslint-disable-next-line no-unused-vars
      const data = await response.json();
      
      // Emit the complete submission
      if (socket) {
        socket.emit('formSubmitted', formData);
      }

      setSubmitStatus('Form submitted successfully!');
      
      // Navigate to confirmation page after successful submission
      router.push('/confirmation');
      
    } catch (error) {
      setSubmitStatus('Failed to submit form. Please try again.');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form validation logic
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number format';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (formData.gender === 'Selected gender') {
      newErrors.gender = 'Select any gender';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Activity timeout effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (Date.now() - lastActivity > 30000) { // 30 seconds
        setIsActive(false);
      }
    }, 30000);

    return () => clearTimeout(timeout);
  }, [lastActivity]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Patient Information Form</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Personal Information */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">{errors.firstName}</span>
            )}
          </div>

          <div>
            <label htmlFor="middleName" className="block text-sm font-medium text-gray-700 mb-1">
              Middle Name
            </label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              value={formData.middleName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm">{errors.lastName}</span>
            )}
          </div>

          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth *
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.dateOfBirth && (
              <span className="text-red-500 text-sm">{errors.dateOfBirth}</span>
            )}
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
              Gender *
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.gender ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <span className="text-red-500 text-sm">{errors.gender}</span>
            )}
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.phoneNumber && (
              <span className="text-red-500 text-sm">{errors.phoneNumber}</span>
            )}
          </div>

          <div className="col-span-full">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.address && (
              <span className="text-red-500 text-sm">{errors.address}</span>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>

          <div>
            <label htmlFor="preferredLanguage" className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Language *
            </label>
            <select
              id="preferredLanguage"
              name="preferredLanguage"
              value={formData.preferredLanguage}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select language</option>
              <option value="english">Thai</option>
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="emergencyContactName" className="block text-sm font-medium text-gray-700 mb-1">
              Emergency Contact (Optional)
            </label>
            <input
              type="text"
              id="emergencyContactName"
              name="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="emergencyContactRelation" className="block text-sm font-medium text-gray-700 mb-1">
              Emergency Contact Relationship (Optional)
            </label>
            <input
              type="text"
              id="emergencyContactRelation"
              name="emergencyContactRelation"
              value={formData.emergencyContactRelation}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="religion" className="block text-sm font-medium text-gray-700 mb-1">
              Religion (Optional)
            </label>
            <input
              type="text"
              id="religion"
              name="religion"
              value={formData.religion}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
