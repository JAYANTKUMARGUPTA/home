import React from "react";
import Layout from "../../components/Layout";
import { jsPDF } from "jspdf";

const ReportsPage = () => {
  const generatePDF = (reportName) => {
    const doc = new jsPDF();
    doc.text(`${reportName} Report`, 20, 20);
    doc.text(`This is a report for the ${reportName} module.`, 20, 30);
    doc.save(`${reportName}_Report.pdf`);
  };

  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-4">Reports</h2>
      <p className="mb-4">Here you can view and generate reports for all modules.</p>
      <div className="grid gap-4">
        {["Property", "Units", "Owners", "Committee", "Budgets"].map((item, i) => (
          <div key={i} className="bg-white p-4 shadow rounded flex justify-between items-center">
            <span>{item} Report</span>
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => generatePDF(item)}
            >
              Generate PDF
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ReportsPage;
