export default function StaffView({ patientData = {}, isActive = false }) {
    // Define the fields we want to display
    const fields = {
      firstName: 'First Name',
      middleName: 'Middle Name',
      lastName: 'Last Name',
      dateOfBirth: 'Date of Birth',
      gender: 'Gender',
      phoneNumber: 'Phone Number',
      email: 'Email',
      address: 'Address',
      preferredLanguage: 'Preferred Language',
      nationality: 'Nationality',
      emergencyContactName: 'Emergency Contact',
      emergencyContactRelation: 'Emergency Contact Relation',
      religion: 'Religion'
    };
  
    const formatField = (value) => {
      if (value === undefined || value === null || value === '') return '...';
      return value;
    };
  
    return (
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Patient Form Status</h2>
          <span className={`px-3 py-1 rounded-full text-white text-sm ${
            isActive ? 'bg-green-500' : 'bg-gray-500'
          }`}>
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(fields).map(([key, label]) => (
            <div key={key} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-sm font-medium text-gray-500">
                {label}
              </h3>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {formatField(patientData[key])}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
};