import React, { useState } from "react";
import Layout from "../../components/Layout";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const OwnersPage = () => {
  const [owners, setOwners] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    renter: "",
    address: "",
    phone: "",
    email: "",
    bankAccount: "",
    unitType: "",
    titleNo: ""
  });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId !== null) {
      setOwners(owners.map(owner =>
        owner.id === editingId ? { ...owner, ...formData } : owner
      ));
      setEditingId(null);
    } else {
      setOwners([...owners, { id: Date.now(), ...formData }]);
    }
    setFormData({
      fullName: "",
      renter: "",
      address: "",
      phone: "",
      email: "",
      bankAccount: "",
      unitType: "",
      titleNo: ""
    });
  };

  const handleEdit = (id) => {
    const owner = owners.find((o) => o.id === id);
    if (owner) {
      setFormData(owner);
      setEditingId(id);
    }
  };

  const handleDelete = (id) => {
    setOwners(owners.filter((o) => o.id !== id));
  };

  const handleDuplicate = (id) => {
    const original = owners.find((o) => o.id === id);
    if (original) {
      setOwners([
        ...owners,
        { ...original, id: Date.now(), fullName: original.fullName + " (Copy)" }
      ]);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Owners List", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Full Name", "Renter", "Address", "Phone", "Email", "Bank Acc.", "Unit Type", "Title No."]],
      body: owners.map(owner => [
        owner.fullName,
        owner.renter,
        owner.address,
        owner.phone,
        owner.email,
        owner.bankAccount,
        owner.unitType,
        owner.titleNo
      ]),
    });

    doc.save("owners-list.pdf");
  };

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Owners List</h2>
        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-white p-4 rounded shadow">
          <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="p-2 border rounded" required />
          <input name="renter" value={formData.renter} onChange={handleChange} placeholder="Renter (Yes/No)" className="p-2 border rounded" />
          <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="p-2 border rounded" />
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="p-2 border rounded" />
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="p-2 border rounded" />
          <input name="bankAccount" value={formData.bankAccount} onChange={handleChange} placeholder="Bank Account No." className="p-2 border rounded" />
          <input name="unitType" value={formData.unitType} onChange={handleChange} placeholder="Unit Type" className="p-2 border rounded" />
          <input name="titleNo" value={formData.titleNo} onChange={handleChange} placeholder="Ownership Title No." className="p-2 border rounded" />
          <div className="col-span-2 flex gap-4 mt-2 justify-end">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              {editingId !== null ? "Update Owner" : "Save Owner"}
            </button>
            <button type="button" onClick={generatePDF} className="bg-green-600 text-white px-4 py-2 rounded">
              Generate PDF
            </button>
          </div>
        </form>

        {owners.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Full Name</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Renter</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Unit Type</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {owners.map((owner) => (
                  <tr key={owner.id} className="border-t">
                    <td className="px-4 py-2 text-gray-700">{owner.fullName}</td>
                    <td className="px-4 py-2 text-gray-700">{owner.renter}</td>
                    <td className="px-4 py-2 text-gray-700">{owner.unitType}</td>
                    <td className="px-4 py-2">
                      <button onClick={() => handleEdit(owner.id)} className="text-blue-600 hover:underline mr-3">Edit</button>
                      <button onClick={() => handleDelete(owner.id)} className="text-red-600 hover:underline mr-3">Delete</button>
                      <button onClick={() => handleDuplicate(owner.id)} className="text-purple-600 hover:underline">Duplicate</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OwnersPage;
