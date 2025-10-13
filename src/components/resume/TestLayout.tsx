import { ResumeData } from "@/types/resume";

interface TestLayoutProps {
  data: ResumeData;
}

export const TestLayout = ({ data }: TestLayoutProps) => {
  return (
    <div className="bg-red-100 border-4 border-red-500 p-4" style={{ width: '210mm', minHeight: '297mm' }}>
      <h1 className="text-2xl font-bold text-red-800">TEST TEMPLATE</h1>
      <p className="text-red-700">This is a test template to verify template switching works.</p>
      <p className="text-red-700">Current template: {data.templateLayout}</p>
      <p className="text-red-700">Name: {data.personalInfo.fullName || 'No name'}</p>
    </div>
  );
};
