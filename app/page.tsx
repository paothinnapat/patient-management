import PatientForm from '@/app/ui/patients/PatientForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Patient Registration
        </h1>
        <PatientForm />
      </div>
    </div>
  );
}
