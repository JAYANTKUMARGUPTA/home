import React, { useState } from "react";
import Layout from "@/components/Layout";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const ExceptionalBudgetPage = () => {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({ description: "", type: "income", amount: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;
    setEntries([
      ...entries,
      { ...formData, amount: parseFloat(formData.amount), id: Date.now() }
    ]);
    setFormData({ description: "", type: "income", amount: "" });
  };

  const handleDelete = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const getTotals = () => {
    const income = entries.filter(e => e.type === "income").reduce((sum, e) => sum + e.amount, 0);
    const outcome = entries.filter(e => e.type === "outcome").reduce((sum, e) => sum + e.amount, 0);
    return { income, outcome, balance: income - outcome };
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Exceptional Budget", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Type", "Description", "Amount"]],
      body: entries.map(e => [e.type, e.description, e.amount]),
      foot: [["Total", "", getTotals().balance]]
    });

    doc.save("exceptional-budget.pdf");
  };

  const exportXLS = () => {
    const data = entries.map(e => ({
      Type: e.type,
      Description: e.description,
      Amount: e.amount
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ExceptionalBudget");
    XLSX.writeFile(wb, "exceptional-budget.xlsx");
  };

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Exceptional Budget</h2>

        {/* Form to Add Entry */}
        <form onSubmit={handleAddEntry} className="flex flex-col md:flex-row gap-4 items-start mb-6">
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="p-2 border rounded w-full md:w-40"
          >
            <option value="income">Income</option>
            <option value="outcome">Outcome</option>
          </select>
          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="p-2 border rounded w-full"
          />
          <input
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            type="number"
            min="0"
            step="0.01"
            className="p-2 border rounded w-full md:w-40"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add
          </button>
        </form>

        {/* Table of Entries */}
        <div className="overflow-x-auto bg-white rounded shadow mb-6">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3">Type</th>
                <th className="p-3">Description</th>
                <th className="p-3">Amount ($)</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className="border-t">
                  <td className="p-3 capitalize">{entry.type}</td>
                  <td className="p-3">{entry.description}</td>
                  <td className="p-3">{entry.amount.toFixed(2)}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-semibold">
                <td className="p-3">Total</td>
                <td className="p-3"></td>
                <td className="p-3">{getTotals().balance.toFixed(2)}</td>
                <td className="p-3"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={generatePDF}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Generate PDF
          </button>
          <button
            onClick={exportXLS}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Export to XLS
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ExceptionalBudgetPage;
