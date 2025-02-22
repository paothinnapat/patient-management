'use client'

import { useEffect, useState } from 'react';
import StaffView from '@/app/ui/staff/StaffView';
import { getSocket } from '../lib/socket';

export default function Staff() {
    const [patientData, setPatientData] = useState({});
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const socket = getSocket();

    socket.on('formUpdated', (data) => {
      setPatientData(data.formData);
      setIsActive(data.isActive);
    });

    socket.on('formSubmitted', (data) => {
      // Handle form submission
      console.log('Form submitted:', data);
    });

    return () => {
      socket.off('formUpdated');
      socket.off('formSubmitted');
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Staff Dashboard
        </h1>
        <StaffView patientData={patientData} isActive={isActive} />
      </div>
    </div>
  );
};