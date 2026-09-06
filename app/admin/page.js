'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, Search, Download, RefreshCw, CheckCircle2, Clock, XCircle, 
  TrendingUp, Globe, Plus, Trash2, Edit3, Eye, ShieldCheck, LogOut, 
  BarChart3, LayoutDashboard, Database, ArrowUpRight, Check
} from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('leads'); // 'leads', 'cms', 'analytics'
  
  // Leads State
  const [enquiries, setEnquiries] = useState([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedItinerary, setSelectedItinerary] = useState(null);

  // CMS State
  const [destinations, setDestinations] = useState([]);
  const [loadingCMS, setLoadingCMS] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDest, setEditingDest] = useState(null);
  const [destForm, setDestForm] = useState({
    title: '',
    category: 'India',
    location: '',
    price: '₹25,000 per person',
    duration: '5 Days',
    image: '',
    description: '',
    highlights: '',
  });

  useEffect(() => {
    // Auth check: if not authenticated, redirect to /admin/login
    if (!document.cookie.includes('admin_token=authenticated')) {
      router.push('/admin/login');
      return;
    }
    fetchLeads();
    fetchDestinations();
  }, [router]);

  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const res = await fetch('/api/enquiry');
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch enquiries:', err);
    } finally {
      setLoadingLeads(false);
    }
  };

  const fetchDestinations = async () => {
    setLoadingCMS(true);
    try {
      const res = await fetch('/api/admin/destinations');
      const data = await res.json();
      if (data.success) {
        setDestinations(data.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch destinations:', err);
    } finally {
      setLoadingCMS(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/enquiry/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries(enquiries.map((e) => (e._id === id ? { ...e, status: newStatus } : e)));
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDeleteEnquiry = async (id) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      const res = await fetch(`/api/enquiry/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setEnquiries(enquiries.filter((e) => e._id !== id));
      }
    } catch (err) {
      alert('Failed to delete lead');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  // CMS Actions
  const handleSaveDestination = async (e) => {
    e.preventDefault();
    try {
      const isEdit = !!editingDest;
      const url = '/api/admin/destinations';
      const method = isEdit ? 'PUT' : 'POST';
      const body = isEdit ? { ...destForm, id: editingDest._id } : destForm;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.success) {
        setShowAddModal(false);
        setEditingDest(null);
        setDestForm({
          title: '',
          category: 'India',
          location: '',
          price: '₹25,000 per person',
          duration: '5 Days',
          image: '',
          description: '',
          highlights: '',
        });
        fetchDestinations();
      } else {
        alert(data.message || 'Failed to save destination');
      }
    } catch (err) {
      alert('Error saving destination');
    }
  };

  const handleDeleteDestination = async (id) => {
    if (!confirm('Are you sure you want to remove this destination?')) return;
    try {
      const res = await fetch(`/api/admin/destinations?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setDestinations(destinations.filter((d) => d._id !== id));
      }
    } catch (err) {
      alert('Failed to delete destination');
    }
  };

  // Export CSV
  const exportToCSV = () => {
    if (enquiries.length === 0) return;
    const headers = ['Date', 'Full Name', 'Country Code', 'Contact Number', 'Email', 'Travel Date', 'Guests', 'Hotel Category', 'Status'];
    const rows = enquiries.map((e) => [
      new Date(e.createdAt).toLocaleDateString(),
      `"${e.fullName}"`,
      `"${e.countryCode}"`,
      `"${e.contactNumber}"`,
      `"${e.email}"`,
      new Date(e.dateOfTravel).toLocaleDateString(),
      e.numberOfPeople,
      `"${e.hotelCategory}"`,
      `"${e.status || 'New'}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `travel_unbounded_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Leads
  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      e.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.contactNumber?.includes(searchQuery);

    const matchesStatus = statusFilter === 'All' || (e.status || 'New') === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Analytics Metrics
  const totalLeads = enquiries.length;
  const newCount = enquiries.filter((e) => (e.status || 'New') === 'New').length;
  const contactedCount = enquiries.filter((e) => e.status === 'Contacted').length;
  const convertedCount = enquiries.filter((e) => e.status === 'Converted').length;
  const closedCount = enquiries.filter((e) => e.status === 'Closed').length;
  const conversionRate = totalLeads > 0 ? Math.round((convertedCount / totalLeads) * 100) : 0;
  const estPipelineRevenue = totalLeads * 45000;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      
      {/* Executive Header Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center font-extrabold text-sm shadow-sm">
              TU
            </div>
            <div>
              <h1 className="text-base font-extrabold text-slate-900 tracking-tight">Travel Unbounded Portal</h1>
              <p className="text-[11px] text-slate-500 font-medium">Executive Operations & Lead Management</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex border-t border-slate-100 text-xs font-bold">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-6 py-3.5 border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'leads'
                ? 'border-teal-700 text-teal-800 bg-teal-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4 text-teal-700" />
            Leads & Enquiries ({totalLeads})
          </button>

          <button
            onClick={() => setActiveTab('cms')}
            className={`px-6 py-3.5 border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'cms'
                ? 'border-teal-700 text-teal-800 bg-teal-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Database className="w-4 h-4 text-teal-700" />
            Website Catalog CMS ({destinations.length})
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-3.5 border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'analytics'
                ? 'border-teal-700 text-teal-800 bg-teal-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-teal-700" />
            Performance Analytics
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* TAB 1: LEADS & ENQUIRIES */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            
            {/* Executive Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Submissions</span>
                <p className="text-3xl font-extrabold text-slate-900">{totalLeads}</p>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-1">
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">New Action Required</span>
                <p className="text-3xl font-extrabold text-amber-600">{newCount}</p>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-1">
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">Successfully Converted</span>
                <p className="text-3xl font-extrabold text-emerald-700">{convertedCount}</p>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-1">
                <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider block">Conversion Rate</span>
                <p className="text-3xl font-extrabold text-teal-800">{conversionRate}%</p>
              </div>

            </div>

            {/* Filter & Export Bar */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search lead name, email, phone..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:border-teal-600 focus:bg-white outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs text-slate-500 font-bold whitespace-nowrap">Status Filter:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl px-3 py-2 outline-none focus:border-teal-600"
                  >
                    <option value="All">All Lead Statuses</option>
                    <option value="New">New Only</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Converted">Converted</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={fetchLeads}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200"
                  title="Refresh Leads"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={exportToCSV}
                  className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  Export Lead CSV
                </button>
              </div>
            </div>

            {/* Enquiries Data Table */}
            <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
              {loadingLeads ? (
                <div className="py-20 text-center space-y-3">
                  <LoadingSpinner />
                  <p className="text-xs text-slate-500 font-medium">Loading lead database...</p>
                </div>
              ) : filteredEnquiries.length === 0 ? (
                <div className="py-16 text-center text-slate-400 text-xs space-y-2">
                  <Users className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="font-semibold text-slate-600">No matching enquiry records found.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="p-4">Submission Date</th>
                        <th className="p-4">Traveler Name</th>
                        <th className="p-4">Contact Info</th>
                        <th className="p-4">Travel Date</th>
                        <th className="p-4">Party Size</th>
                        <th className="p-4">Hotel Tier</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {filteredEnquiries.map((e) => {
                        const currentStatus = e.status || 'New';
                        return (
                          <tr key={e._id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-4 whitespace-nowrap text-slate-500 font-mono">
                              {new Date(e.createdAt).toLocaleDateString()}
                            </td>

                            <td className="p-4 whitespace-nowrap font-bold text-slate-900">
                              {e.fullName}
                              {e.itineraryDetails && (
                                <span className="ml-2 px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 text-[10px] font-bold border border-teal-200">
                                  AI Itinerary
                                </span>
                              )}
                            </td>

                            <td className="p-4 whitespace-nowrap space-y-0.5">
                              <p className="font-semibold text-slate-800">{e.email}</p>
                              <p className="text-slate-500 text-[11px] font-mono">{e.countryCode} {e.contactNumber}</p>
                            </td>

                            <td className="p-4 whitespace-nowrap font-medium text-slate-700">
                              {new Date(e.dateOfTravel).toLocaleDateString()}
                            </td>

                            <td className="p-4 whitespace-nowrap font-semibold">
                              {e.numberOfPeople} Adults {e.numberOfChildren > 0 ? `, ${e.numberOfChildren} Kids` : ''}
                            </td>

                            <td className="p-4 whitespace-nowrap font-bold text-teal-800">
                              {e.hotelCategory}
                            </td>

                            <td className="p-4 whitespace-nowrap">
                              <select
                                value={currentStatus}
                                onChange={(ev) => handleStatusChange(e._id, ev.target.value)}
                                className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border outline-none ${
                                  currentStatus === 'New'
                                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                                    : currentStatus === 'Contacted'
                                    ? 'bg-blue-50 text-blue-800 border-blue-200'
                                    : currentStatus === 'Converted'
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                    : 'bg-slate-100 text-slate-600 border-slate-200'
                                }`}
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Converted">Converted</option>
                                <option value="Closed">Closed</option>
                              </select>
                            </td>

                            <td className="p-4 whitespace-nowrap text-right space-x-2">
                              {e.itineraryDetails && (
                                <button
                                  onClick={() => setSelectedItinerary(e.itineraryDetails)}
                                  className="p-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200"
                                  title="View Attached AI Itinerary"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteEnquiry(e._id)}
                                className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: WEBSITE CMS */}
        {activeTab === 'cms' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white border border-slate-200/90 p-4 rounded-2xl shadow-xs">
              <div>
                <h2 className="text-base font-extrabold text-slate-900">Destination Package Catalog</h2>
                <p className="text-xs text-slate-500 font-medium">Add, update pricing, or edit packages live on site without code</p>
              </div>
              <button
                onClick={() => {
                  setEditingDest(null);
                  setDestForm({
                    title: '',
                    category: 'India',
                    location: '',
                    price: '₹25,000 per person',
                    duration: '5 Days',
                    image: '',
                    description: '',
                    highlights: '',
                  });
                  setShowAddModal(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                Add New Destination
              </button>
            </div>

            {loadingCMS ? (
              <div className="py-20 text-center">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {destinations.map((d) => (
                  <div key={d._id} className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      <div className="relative h-44 w-full bg-slate-100">
                        <img src={d.image} alt={d.title} className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 text-white font-bold text-[10px] backdrop-blur-xs">
                          {d.category}
                        </span>
                      </div>

                      <div className="p-5 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold text-slate-900 text-base leading-snug">{d.title}</h3>
                          <span className="text-xs font-extrabold text-teal-800 whitespace-nowrap">{d.price}</span>
                        </div>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{d.description}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-semibold">{d.duration}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingDest(d);
                            setDestForm({
                              title: d.title,
                              category: d.category,
                              location: d.location,
                              price: d.price,
                              duration: d.duration,
                              image: d.image,
                              description: d.description,
                              highlights: Array.isArray(d.highlights) ? d.highlights.join(', ') : d.highlights,
                            });
                            setShowAddModal(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 font-semibold border border-slate-200 flex items-center gap-1 shadow-xs"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-teal-700" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteDestination(d._id)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: LEAD ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Estimated Pipeline Value</span>
                <p className="text-3xl font-extrabold text-emerald-700">₹{estPipelineRevenue.toLocaleString('en-IN')}</p>
                <p className="text-xs text-slate-500 font-light">Based on ₹45,000 average trip value estimate</p>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lead Conversion Rate</span>
                <p className="text-3xl font-extrabold text-teal-800">{conversionRate}%</p>
                <p className="text-xs text-slate-500 font-light">{convertedCount} out of {totalLeads} total submissions converted</p>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Catalog Count</span>
                <p className="text-3xl font-extrabold text-slate-900">{destinations.length}</p>
                <p className="text-xs text-slate-500 font-light">Active travel packages published on website</p>
              </div>

            </div>

            {/* Status Funnel Distribution Progress Bars */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="text-base font-extrabold text-slate-900">Lead Status Funnel</h3>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-amber-700">New Leads</span>
                    <span className="text-slate-600">{newCount} ({totalLeads ? Math.round((newCount/totalLeads)*100) : 0}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full transition-all" style={{ width: `${totalLeads ? (newCount/totalLeads)*100 : 0}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-blue-700">Contacted</span>
                    <span className="text-slate-600">{contactedCount} ({totalLeads ? Math.round((contactedCount/totalLeads)*100) : 0}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full transition-all" style={{ width: `${totalLeads ? (contactedCount/totalLeads)*100 : 0}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-emerald-700">Converted</span>
                    <span className="text-slate-600">{convertedCount} ({totalLeads ? Math.round((convertedCount/totalLeads)*100) : 0}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full transition-all" style={{ width: `${totalLeads ? (convertedCount/totalLeads)*100 : 0}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-slate-600">Closed</span>
                    <span className="text-slate-600">{closedCount} ({totalLeads ? Math.round((closedCount/totalLeads)*100) : 0}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-slate-400 h-full transition-all" style={{ width: `${totalLeads ? (closedCount/totalLeads)*100 : 0}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Add / Edit Destination Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white border border-slate-200 max-w-lg w-full rounded-3xl p-6 space-y-4 text-xs shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">
                {editingDest ? 'Edit Destination Package' : 'Add New Destination Package'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDestination} className="space-y-3">
              <div>
                <label className="text-slate-700 font-bold block mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={destForm.title}
                  onChange={(e) => setDestForm({ ...destForm, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:border-teal-600 focus:bg-white outline-none"
                  placeholder="e.g. Ranthambore Tiger Safari"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Category</label>
                  <select
                    value={destForm.category}
                    onChange={(e) => setDestForm({ ...destForm, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:border-teal-600 focus:bg-white outline-none"
                  >
                    <option value="India">India</option>
                    <option value="International">International</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Starting Price</label>
                  <input
                    type="text"
                    required
                    value={destForm.price}
                    onChange={(e) => setDestForm({ ...destForm, price: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:border-teal-600 focus:bg-white outline-none"
                    placeholder="e.g. ₹35,000 per person"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={destForm.location}
                    onChange={(e) => setDestForm({ ...destForm, location: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:border-teal-600 focus:bg-white outline-none"
                    placeholder="e.g. Rajasthan, India"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Duration</label>
                  <input
                    type="text"
                    required
                    value={destForm.duration}
                    onChange={(e) => setDestForm({ ...destForm, duration: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:border-teal-600 focus:bg-white outline-none"
                    placeholder="e.g. 5 Days / 4 Nights"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">Image Unsplash URL</label>
                <input
                  type="text"
                  required
                  value={destForm.image}
                  onChange={(e) => setDestForm({ ...destForm, image: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:border-teal-600 focus:bg-white outline-none"
                  placeholder="https://images.unsplash.com/photo-..."
                />
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">Description</label>
                <textarea
                  required
                  rows="3"
                  value={destForm.description}
                  onChange={(e) => setDestForm({ ...destForm, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:border-teal-600 focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">Highlights (Comma-separated)</label>
                <input
                  type="text"
                  value={destForm.highlights}
                  onChange={(e) => setDestForm({ ...destForm, highlights: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:border-teal-600 focus:bg-white outline-none"
                  placeholder="Tiger Safari, Luxury Camp, Fort Tour"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold"
                >
                  {editingDest ? 'Save Changes' : 'Create Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Attached AI Itinerary Modal */}
      {selectedItinerary && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 max-w-2xl w-full rounded-3xl p-6 space-y-4 max-h-[85vh] overflow-y-auto text-xs shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Attached AI Itinerary Details</h3>
              <button onClick={() => setSelectedItinerary(null)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-slate-700">
              <div className="bg-slate-50 p-4 rounded-xl space-y-1 border border-slate-200">
                <p className="text-teal-800 font-bold text-sm">{selectedItinerary.title}</p>
                <p className="text-slate-600">{selectedItinerary.summary}</p>
                <p className="text-emerald-700 font-bold pt-2">Estimated Price: {selectedItinerary.estimatedCost}</p>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-slate-900">Day-Wise Plan:</p>
                {selectedItinerary.dayWisePlan?.map((d) => (
                  <div key={d.day} className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                    <p className="font-bold text-teal-800">Day {d.day}: {d.title}</p>
                    <p className="text-slate-600"><strong>Morning:</strong> {d.morning}</p>
                    <p className="text-slate-600"><strong>Afternoon:</strong> {d.afternoon}</p>
                    <p className="text-slate-600"><strong>Evening:</strong> {d.evening}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
