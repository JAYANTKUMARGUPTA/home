import React, { useState } from "react";
import Layout from "@/components/Layout";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const RegularBudgetPage = () => {
  const [year, setYear] = useState("2025");
  const [income, setIncome] = useState({});
  const [outcome, setOutcome] = useState({});

  // Mocked owners
  const allOwners = ["Alice", "Bob", "Charlie", "David"];
  const paidOwners = ["Alice", "Charlie"]; // mock paid list

  const unpaidOwners = allOwners.filter((o) => !paidOwners.includes(o));

  const handleInput = (type, month, value) => {
    const updater = type === "income" ? setIncome : setOutcome;
    const data = type === "income" ? income : outcome;
    updater({ ...data, [month]: parseFloat(value) || 0 });
  };

  const total = (data) => months.reduce((sum, m) => sum + (data[m] || 0), 0);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Regular Budget - ${year}`, 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Month", "Income", "Outcome", "Balance"]],
      body: months.map((m) => [
        m,
        income[m] || 0,
        outcome[m] || 0,
        (income[m] || 0) - (outcome[m] || 0),
      ]),
      foot: [["Total", total(income), total(outcome), total(income) - total(outcome)]]
    });

    doc.save(`Regular-Budget-${year}.pdf`);
  };

  const exportXLS = () => {
    const rows = months.map((m) => ({
      Month: m,
      Income: income[m] || 0,
      Outcome: outcome[m] || 0,
      Balance: (income[m] || 0) - (outcome[m] || 0),
    }));

    const sheet = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, `Budget_${year}`);
    XLSX.writeFile(wb, `Regular-Budget-${year}.xlsx`);
  };

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Regular Budget</h2>

        <div className="mb-4">
          <label className="font-medium">Year: </label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="p-2 border rounded ml-2"
          >
            {Array.from({ length: 6 }, (_, i) => 2025 + i).map((yr) => (
              <option key={yr} value={yr}>{yr}</option>
            ))}
          </select>
        </div>

        {/* Budget Table */}
        <div className="overflow-x-auto bg-white rounded shadow mb-6">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3">Month</th>
                <th className="p-3">Income ($)</th>
                <th className="p-3">Outcome ($)</th>
                <th className="p-3">Balance ($)</th>
              </tr>
            </thead>
            <tbody>
              {months.map((month) => (
                <tr key={month} className="border-t">
                  <td className="p-3">{month}</td>
                  <td className="p-3">
                    <input
                      type="number"
                      className="border p-1 w-24"
                      value={income[month] || ""}
                      onChange={(e) => handleInput("income", month, e.target.value)}
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      className="border p-1 w-24"
                      value={outcome[month] || ""}
                      onChange={(e) => handleInput("outcome", month, e.target.value)}
                    />
                  </td>
                  <td className="p-3 font-semibold">
                    {(income[month] || 0) - (outcome[month] || 0)}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-semibold">
                <td className="p-3">Total</td>
                <td className="p-3">{total(income)}</td>
                <td className="p-3">{total(outcome)}</td>
                <td className="p-3">{total(income) - total(outcome)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Export Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={generatePDF}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Generate PDF
          </button>
          <button
            onClick={exportXLS}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Export to XLS
          </button>
        </div>

        {/* In-App Notification */}
        {unpaidOwners.length > 0 && (
          <div className="bg-red-100 text-red-700 p-3 rounded">
            <strong>Unpaid Owners:</strong> {unpaidOwners.join(", ")}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RegularBudgetPage;
