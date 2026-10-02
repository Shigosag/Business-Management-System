import { useEffect, useState, FormEvent } from "react";
import { api } from "../api/Client";
import { Customer } from "../types";
import Modal from "../components/Modal";
import { useToast } from "../components/Toast";

export default function Customers() {
  const { showToast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  // Modal States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [deletingCustomerId, setDeletingCustomerId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await api.get<{ data: Customer[] }>("/customers");
      setCustomers(res.data.data || (res.data as any) || []);
    } catch (err: any) {
      showToast(err.message || "Failed to load customers", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleOpenCreate = () => {
    setFormData({ name: "", email: "", phone: "" });
    setIsCreateOpen(true);
  };

  const handleOpenEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email || "",
      phone: customer.phone || "",
    });
  };

  const handleSaveCustomer = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast("Customer name is required", "error");
      return;
    }

    try {
      setIsSubmitting(true);
      if (editingCustomer) {
        const res = await api.put<Customer>(`/customers/${editingCustomer.id}`, formData);
        setCustomers((prev) =>
          prev.map((c) => (c.id === editingCustomer.id ? res.data : c))
        );
        showToast("Customer updated successfully", "success");
        setEditingCustomer(null);
      } else {
        const res = await api.post<Customer>("/customers", formData);
        setCustomers((prev) => [res.data, ...prev]);
        showToast("Customer created successfully", "success");
        setIsCreateOpen(false);
      }
    } catch (err: any) {
      showToast(err.message || "Failed to save customer", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deletingCustomerId) return;
    try {
      setIsSubmitting(true);
      await api.delete(`/customers/${deletingCustomerId}`);
      setCustomers((prev) => prev.filter((c) => c.id !== deletingCustomerId));
      showToast("Customer deleted successfully", "success");
      setDeletingCustomerId(null);
    } catch (err: any) {
      showToast(err.message || "Failed to delete customer", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.email && c.email.toLowerCase().includes(search.toLowerCase())) ||
      (c.phone && c.phone.includes(search));
    const matchesStatus =
      filterStatus === "ALL" || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Customer Directory
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your client profiles, contact points, and account status.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-md transition-colors"
        >
          + Add Customer
        </button>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="ALL">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      {/* CUSTOMER LIST / TABLE */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-20 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : filteredCustomers.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-base">
            No customers found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {filteredCustomers.map((c) => (
            <div
              key={c.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition hover:shadow-md"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-gray-900 dark:text-white text-base">
                    {c.name}
                  </h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      c.status === "ACTIVE"
                        ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {c.email && <span>📧 {c.email}</span>}
                  {c.phone && <span>📞 {c.phone}</span>}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleOpenEdit(c)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeletingCustomerId(c.id)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 hover:bg-red-200 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT CUSTOMER MODAL */}
      <Modal
        isOpen={isCreateOpen || editingCustomer !== null}
        onClose={() => {
          setIsCreateOpen(false);
          setEditingCustomer(null);
        }}
        title={editingCustomer ? "Edit Customer" : "Create New Customer"}
      >
        <form onSubmit={handleSaveCustomer} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-3">
            <button
              type="button"
              onClick={() => {
                setIsCreateOpen(false);
                setEditingCustomer(null);
              }}
              className="px-4 py-2 text-sm font-semibold rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-sm font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-md disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Customer"}
            </button>
          </div>
        </form>
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal
        isOpen={deletingCustomerId !== null}
        onClose={() => setDeletingCustomerId(null)}
        title="Confirm Deletion"
      >
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-5">
          Are you sure you want to delete this customer? This action will archive their record in the database.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setDeletingCustomerId(null)}
            className="px-4 py-2 text-sm font-semibold rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            disabled={isSubmitting}
            className="px-5 py-2 text-sm font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-md disabled:opacity-50"
          >
            {isSubmitting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
