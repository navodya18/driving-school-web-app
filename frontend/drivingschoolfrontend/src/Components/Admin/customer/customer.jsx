import { useState } from "react";
import { PencilLine, Trash, Check, X, UserPlus } from "lucide-react";
import { useTheme } from "@mui/material/styles";

const CustomerTable = () => {
    const theme = useTheme();
    const colors = theme.palette;

    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({
        name: "",
        nic: "",
        address: "",
        email: "",
        telephone: "",
        licenseType: "",
    });

    const [editIndex, setEditIndex] = useState(null);
    const [editCustomer, setEditCustomer] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
    };

    const handleEditChange = (e) => {
        setEditCustomer({ ...editCustomer, [e.target.name]: e.target.value });
    };

    // Add a new customer
    const handleAddCustomer = (e) => {
        e.preventDefault();
        if (!newCustomer.name || !newCustomer.nic) {
            alert("Name and NIC are required!");
            return;
        }
        setCustomers([...customers, newCustomer]);
        setNewCustomer({ name: "", nic: "", address: "", email: "", telephone: "", licenseType: "" });
    };

    // Delete a customer
    const handleDelete = (index) => {
        const updatedCustomers = customers.filter((_, i) => i !== index);
        setCustomers(updatedCustomers);
    };

    // Enable edit mode
    const handleEdit = (index) => {
        setEditIndex(index);
        setEditCustomer(customers[index]);
    };

    // Save edited customer
    const handleSaveEdit = () => {
        const updatedCustomers = [...customers];
        updatedCustomers[editIndex] = editCustomer;
        setCustomers(updatedCustomers);
        setEditIndex(null);
        setEditCustomer(null);
    };

    // Cancel edit mode
    const handleCancelEdit = () => {
        setEditIndex(null);
        setEditCustomer(null);
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-white or text-gray-200 mb-6">
                Customer Management
            </h1>

            {/* Add Customer Form */}
            <form onSubmit={handleAddCustomer} className="mb-6 bg-[--primary] p-6 shadow-md rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="name" value={newCustomer.name} onChange={handleChange}
                        placeholder="Name" className="border p-2 rounded-lg w-full bg-gray-800 text-white border-gray-600"
                        required />

                    <input type="text" name="nic" value={newCustomer.nic} onChange={handleChange}
                        placeholder="NIC" className="border p-2 rounded-lg w-full bg-gray-800 text-white border-gray-600"
                        required />

                    <input type="text" name="address" value={newCustomer.address} onChange={handleChange}
                        placeholder="Address" className="border p-2 rounded-lg w-full bg-gray-800 text-white border-gray-600" />

                    <input type="email" name="email" value={newCustomer.email} onChange={handleChange}
                        placeholder="Email" className="border p-2 rounded-lg w-full bg-gray-800 text-white border-gray-600" />

                    <input type="text" name="telephone" value={newCustomer.telephone} onChange={handleChange}
                        placeholder="Telephone" className="border p-2 rounded-lg w-full bg-gray-800 text-white border-gray-600" />

                    {/* License Type Dropdown */}
                    <select name="licenseType" value={newCustomer.licenseType} onChange={handleChange}
                        className="border p-2 rounded-lg w-full bg-gray-800 text-white border-gray-600" required>
                        <option value="">Select License Type</option>
                        <option value="Motorcycle">Motorcycle</option>
                        <option value="Light Vehicle">Light Vehicle</option>
                        <option value="Heavy Vehicle">Heavy Vehicle</option>
                    </select>
                </div>
                <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 flex justify-center items-center gap-2">
                    <UserPlus size={20} /> Add Customer
                </button>
            </form>

            {/* Customer Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-[--neutral-main] rounded-lg overflow-hidden shadow-lg">
                    <thead>
                        <tr className="bg-[--primary] text-white">
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">NIC</th>
                            <th className="p-2 border">Address</th>
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Telephone</th>
                            <th className="p-2 border">License Type</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-[--background-default] text-white">
                        {customers.map((customer, index) => (
                            <tr key={index} className="border">
                                {editIndex === index ? (
                                    <>
                                        <td className="p-2 border"><input type="text" name="name" value={editCustomer.name} onChange={handleEditChange} className="border p-1 w-full" /></td>
                                        <td className="p-2 border"><input type="text" name="nic" value={editCustomer.nic} onChange={handleEditChange} className="border p-1 w-full" /></td>
                                        <td className="p-2 border"><input type="text" name="address" value={editCustomer.address} onChange={handleEditChange} className="border p-1 w-full" /></td>
                                        <td className="p-2 border"><input type="email" name="email" value={editCustomer.email} onChange={handleEditChange} className="border p-1 w-full" /></td>
                                        <td className="p-2 border"><input type="text" name="telephone" value={editCustomer.telephone} onChange={handleEditChange} className="border p-1 w-full" /></td>
                                        {/* License Type Dropdown in Edit Mode */}
                                        <td className="p-2 border">
                                            <select name="licenseType" value={editCustomer.licenseType} onChange={handleEditChange} className="border p-1 w-full">
                                                <option value="Motorcycle">Motorcycle</option>
                                                <option value="Light Vehicle">Light Vehicle</option>
                                                <option value="Heavy Vehicle">Heavy Vehicle</option>
                                            </select>
                                        </td>
                                        <td className="p-2 border flex gap-2">
                                            <button onClick={handleSaveEdit} className="text-green-500"><Check size={20} /></button>
                                            <button onClick={handleCancelEdit} className="text-red-500"><X size={20} /></button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="p-2 border">{customer.name}</td>
                                        <td className="p-2 border">{customer.nic}</td>
                                        <td className="p-2 border">{customer.address}</td>
                                        <td className="p-2 border">{customer.email}</td>
                                        <td className="p-2 border">{customer.telephone}</td>
                                        <td className="p-2 border">{customer.licenseType}</td>
                                        <td className="p-2 border flex gap-2">
                                            <button onClick={() => handleEdit(index)} className="text-blue-500"><PencilLine size={20} /></button>
                                            <button onClick={() => handleDelete(index)} className="text-red-500"><Trash size={20} /></button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomerTable;
