import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Mail, Target, CalendarDays, Search, RefreshCcw, Eye, Trash2, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function DashboardAdmin() {
    const [activeTab, setActiveTab] = useState('contacts');
    const [contacts, setContacts] = useState([]);
    const [demos, setDemos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [contactRes, demoRes] = await Promise.all([
                axios.get('http://localhost:5000/api/contact'),
                axios.get('http://localhost:5000/api/demo'),
            ]);
            setContacts(contactRes.data.data || []);
            setDemos(demoRes.data.data || []);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            toast.error("Failed to load data.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, type) => {
        if (!window.confirm("Are you sure you want to delete this record?")) return;

        try {
            if (type === 'contacts') {
                await axios.delete(`http://localhost:5000/api/contact/${id}`);
                setContacts(prev => prev.filter(item => item._id !== id));
            } else {
                await axios.delete(`http://localhost:5000/api/demo/${id}`);
                setDemos(prev => prev.filter(item => item._id !== id));
            }
            toast.success("Deleted successfully!");
        } catch (error) {
            console.error("Failed to delete:", error);
            toast.error("Failed to delete record.");
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit',
        });
    };

    const filteredContacts = contacts.filter(c =>
        `${c.firstName} ${c.lastName} ${c.email} ${c.phone}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredDemos = demos.filter(d =>
        `${d.companyName} ${d.firstName} ${d.lastName} ${d.email} ${d.phone}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = [
        { label: 'Total Contacts', value: contacts.length, icon: <Mail size={24} color="#ff4810" />, color: '#ff4810' },
        { label: 'Demo Requests', value: demos.length, icon: <Target size={24} color="#143d25" />, color: '#143d25' },
        { label: 'This Month', value: contacts.filter(c => new Date(c.createdAt).getMonth() === new Date().getMonth()).length + demos.filter(d => new Date(d.createdAt).getMonth() === new Date().getMonth()).length, icon: <CalendarDays size={24} color="#1f5c38" />, color: '#1f5c38' },
    ];

    return (
        <div className="min-h-screen bg-[var(--bg-color)]">

            {/* Sidebar */}
            <aside className="fixed top-0 left-0 w-[260px] h-screen flex flex-col z-50 admin-sidebar">
                <div className="px-6 py-7 border-b border-white/10">
                    <h1 className="text-white text-[22px] font-extrabold m-0 tracking-tight">
                        <span className="text-[var(--secondary-color)]">Markt</span> POS
                    </h1>
                    <p className="text-white/50 text-[11px] mt-1 uppercase tracking-widest font-semibold">Admin Panel</p>
                </div>

                <nav className="flex-1 px-3 py-5">
                    {[
                        { id: 'contacts', label: 'Contact Messages', icon: <Mail size={20} /> },
                        { id: 'demos', label: 'Demo Requests', icon: <Target size={20} /> },
                    ].map(tab => (
                        <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSearchTerm(''); }}
                            className={`admin-nav-btn flex items-center gap-3 w-full px-4 py-3.5 mb-1 rounded-xl border-none cursor-pointer text-sm font-semibold ${activeTab === tab.id ? 'active' : 'inactive'}`}
                        >
                            <span>{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </nav>

                <div className="px-6 py-5 border-t border-white/10">
                    <button onClick={fetchData} className="admin-refresh-btn flex items-center justify-center gap-2 w-full p-3 rounded-xl border border-white/15 text-white/70 cursor-pointer text-[13px] font-semibold bg-[rgba(255,255,255,0.05)] hover:text-white transition-colors">
                        <RefreshCcw size={16} /> Refresh Data
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-[260px] py-8 px-10">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-[28px] font-extrabold text-[var(--primary-color)] m-0 tracking-tight">
                            {activeTab === 'contacts' ? 'Contact Messages' : 'Demo Requests'}
                        </h2>
                        <p className="text-[var(--text-secondary)] text-sm mt-1 font-medium">
                            {activeTab === 'contacts' ? `${filteredContacts.length} messages received` : `${filteredDemos.length} demo requests`}
                        </p>
                    </div>
                    <div className="relative">
                        <input
                            type="text" placeholder="Search..." value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-[280px] py-3 pr-4 pl-10 rounded-xl border border-[var(--border-color)] bg-white text-sm outline-none font-medium text-[var(--primary-color)]"
                        />
                        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] opacity-50" />
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-5 mb-8">
                    {stats.map((stat, i) => (
                        <motion.div key={i}
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.4 }}
                            className="bg-white rounded-2xl px-7 py-6 border border-[var(--border-color)] shadow-sm"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-[var(--text-secondary)] text-[13px] font-semibold m-0 uppercase tracking-wide">{stat.label}</p>
                                    <p className="text-[var(--primary-color)] text-4xl font-extrabold mt-2 tracking-tighter">{stat.value}</p>
                                </div>
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}15` }}>
                                    {stat.icon}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Table */}
                {loading ? (
                    <div className="text-center py-20 text-[var(--text-secondary)] text-base font-semibold flex flex-col items-center">
                        <RefreshCcw size={40} className="animate-spin opacity-50 mb-4 text-[var(--primary-color)]" />
                        Loading data...
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="bg-white rounded-2xl border border-[var(--border-color)] overflow-hidden shadow-sm"
                    >
                        <div className="overflow-x-auto">
                            {activeTab === 'contacts' ? (
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-[var(--bg-light)]">
                                            {['#', 'Name', 'Email', 'Phone', 'Country', 'Date', 'Actions'].map(h => (
                                                <th key={h} className={`py-3.5 px-5 text-left text-[11px] font-bold text-[var(--primary-color)] uppercase tracking-wider border-b border-[var(--border-color)] ${h === 'Actions' ? 'text-right' : ''}`}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredContacts.length === 0 ? (
                                            <tr><td colSpan={7} className="text-center py-12 text-[var(--text-secondary)] text-sm">No contacts found.</td></tr>
                                        ) : filteredContacts.map((c, i) => (
                                            <tr key={c._id} className="admin-table-row cursor-default">
                                                <td className="py-3.5 px-5 text-[13px] text-[var(--text-secondary)] font-semibold">{i + 1}</td>
                                                <td className="py-3.5 px-5 text-sm font-semibold text-[var(--primary-color)]">{c.firstName} {c.lastName}</td>
                                                <td className="py-3.5 px-5 text-[13px] text-[var(--text-secondary)]">{c.email}</td>
                                                <td className="py-3.5 px-5 text-[13px] text-[var(--text-secondary)]">{c.phone}</td>
                                                <td className="py-3.5 px-5">
                                                    <span className="inline-block py-1 px-2.5 rounded-md bg-[#E8FAAA] text-[var(--primary-color)] text-[11px] font-bold uppercase">{c.country}</span>
                                                </td>
                                                <td className="py-3.5 px-5 text-xs text-[var(--text-secondary)]">{formatDate(c.createdAt)}</td>
                                                <td className="py-3.5 px-5 flex justify-end gap-2">
                                                    <button onClick={() => setSelectedMessage(c)}
                                                        className="admin-btn-view py-1.5 px-3 rounded-lg border border-[var(--border-color)] bg-white cursor-pointer flex items-center gap-1.5 text-xs font-semibold text-[var(--primary-color)]"
                                                    ><Eye size={14} /> View</button>
                                                    <button onClick={() => handleDelete(c._id, 'contacts')}
                                                        className="admin-btn-view py-1.5 px-3 rounded-lg border border-[var(--border-color)] bg-white cursor-pointer flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:!bg-red-50 hover:!border-red-200 transition-colors"
                                                    ><Trash2 size={14} /> Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-[var(--bg-light)]">
                                            {['#', 'Company', 'Name', 'Email', 'Phone', 'Country', 'Date', 'Actions'].map(h => (
                                                <th key={h} className={`py-3.5 px-5 text-left text-[11px] font-bold text-[var(--primary-color)] uppercase tracking-wider border-b border-[var(--border-color)] ${h === 'Actions' ? 'text-right' : ''}`}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredDemos.length === 0 ? (
                                            <tr><td colSpan={8} className="text-center py-12 text-[var(--text-secondary)] text-sm">No demo requests found.</td></tr>
                                        ) : filteredDemos.map((d, i) => (
                                            <tr key={d._id} className="admin-table-row cursor-default">
                                                <td className="py-3.5 px-5 text-[13px] text-[var(--text-secondary)] font-semibold">{i + 1}</td>
                                                <td className="py-3.5 px-5 text-sm font-bold text-[var(--primary-color)]">{d.companyName}</td>
                                                <td className="py-3.5 px-5 text-sm font-semibold text-[var(--primary-color)]">{d.firstName} {d.lastName}</td>
                                                <td className="py-3.5 px-5 text-[13px] text-[var(--text-secondary)]">{d.email}</td>
                                                <td className="py-3.5 px-5 text-[13px] text-[var(--text-secondary)]">{d.phone}</td>
                                                <td className="py-3.5 px-5">
                                                    <span className="inline-block py-1 px-2.5 rounded-md bg-[#E8FAAA] text-[var(--primary-color)] text-[11px] font-bold uppercase">{d.country}</span>
                                                </td>
                                                <td className="py-3.5 px-5 text-xs text-[var(--text-secondary)]">{formatDate(d.createdAt)}</td>
                                                <td className="py-3.5 px-5 flex justify-end gap-2">
                                                    <button onClick={() => handleDelete(d._id, 'demos')}
                                                        className="admin-btn-view py-1.5 px-3 rounded-lg border border-[var(--border-color)] bg-white cursor-pointer flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:!bg-red-50 hover:!border-red-200 transition-colors"
                                                    ><Trash2 size={14} /> Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </motion.div>
                )}
            </main>

            {/* Message Modal */}
            <AnimatePresence>
                {selectedMessage && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setSelectedMessage(null)}
                        className="fixed inset-0 bg-[rgba(10,31,18,0.6)] backdrop-blur-sm flex items-center justify-center z-[100] p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={e => e.stopPropagation()}
                            className="bg-white rounded-[20px] py-8 px-9 w-full max-w-[520px] shadow-2xl border border-[var(--border-color)] flex flex-col max-h-[90vh]"
                        >
                            <div className="flex justify-between items-center mb-5 shrink-0">
                                <h3 className="text-xl font-extrabold text-[var(--primary-color)] m-0">Message Details</h3>
                                <button onClick={() => setSelectedMessage(null)}
                                    className="w-8 h-8 rounded-lg border border-[var(--border-color)] bg-[var(--bg-light)] cursor-pointer text-[var(--primary-color)] flex items-center justify-center hover:bg-[var(--border-color)] transition-colors"
                                ><X size={18} /></button>
                            </div>

                            <div className="overflow-y-auto pr-3 flex-1">
                                <div className="mb-4">
                                    <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide m-0 mb-1">From</p>
                                    <p className="text-[15px] font-semibold text-[var(--primary-color)] m-0">{selectedMessage.firstName} {selectedMessage.lastName}</p>
                                </div>
                                <div className="pb-2">
                                    <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide m-0 mb-2">Message</p>
                                    <div className="bg-[var(--bg-color)] rounded-xl py-4 px-5 border border-[var(--border-color)] text-sm leading-relaxed text-[var(--primary-color)] font-medium whitespace-pre-wrap">
                                        {selectedMessage.message}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
