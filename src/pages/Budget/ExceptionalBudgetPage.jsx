import React from "react";
import Layout from "@/components/Layout";


const ExceptionalBudgetPage = () => {
  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-4">Exceptional Budget</h2>
      <div className="mb-4">[Exceptional income/outcome tables will be here]</div>
      <div className="flex gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Generate PDF</button>
        <button className="bg-green-600 text-white px-4 py-2 rounded">Export to XLS</button>
      </div>
    </Layout>
  );
};

export default ExceptionalBudgetPage;
