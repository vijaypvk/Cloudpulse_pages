

"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  ChevronDown,
  Plus,
  Archive,
  Database,
  FileText,
  Ghost,
  Leaf,
  CircleDot,
  Zap,
  Receipt,
} from 'lucide-react';

const DashboardHome = () => {
  const [selectedServices, setSelectedServices] = useState(new Set());

  const services = [
    { id: 'plausible', name: 'plausible', icon: <Archive className="w-5 h-5" />, createdAt: 'Created less than a minute ago', status: 'inactive' },
    { id: 'supabase', name: 'supabase', icon: <Database className="w-5 h-5" />, createdAt: 'Created less than a minute ago', status: 'inactive' },
    { id: 'appwrite', name: 'appwrite', icon: <FileText className="w-5 h-5" />, createdAt: 'Created 1 minute ago', status: 'active' },
    { id: 'ghost', name: 'ghost', icon: <Ghost className="w-5 h-5" />, createdAt: 'Created about 3 hours ago', status: 'active' },
    { id: 'mongo', name: 'mongo', icon: <Leaf className="w-5 h-5 text-green-500" />, createdAt: 'Created about 3 hours ago', status: 'active' },
    { id: 'odoo', name: 'odoo', icon: <CircleDot className="w-5 h-5" />, createdAt: 'Created 2 days ago', status: 'active' },
    { id: 'pg', name: 'pg', icon: <Zap className="w-5 h-5 text-blue-500" />, createdAt: 'Created 4 days ago', status: 'active' },
    { id: 'invoiceninja', name: 'invoiceninja', icon: <Receipt className="w-5 h-5" />, createdAt: 'Created about 1 month ago', status: 'inactive' },
  ];

  const handleSelectAll = () => {
    if (selectedServices.size === services.length) {
      setSelectedServices(new Set());
    } else {
      setSelectedServices(new Set(services.map((s) => s.id)));
    }
  };

  const handleSelectService = (serviceId) => {
    const newSelected = new Set(selectedServices);
    if (newSelected.has(serviceId)) {
      newSelected.delete(serviceId);
    } else {
      newSelected.add(serviceId);
    }
    setSelectedServices(newSelected);
  };

  const getStatusIndicator = (status) => (
    <div className={`w-2 h-2 rounded-full ${status === 'active' ? 'bg-green-500' : 'bg-gray-500'}`} />
  );

  return (
    <div className="bg-black text-gray-300 relative min-h-screen ml-64 ">

      <div className="text-sm text-gray-400 flex items-center space-x-2 mx-6 mt-7 mb-11">
        <span>Pages</span>
        
      </div>

      {/* Project Header */}
      <div className="bg-[#18181b] border border-[#2c2c2e] rounded-xl mx-6 mt-4 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
            <Archive className="w-4 h-4" />
          </div>
          <h1 className="text-xl font-medium text-white">Testing</h1>
        </div>

        <div className="flex items-center space-x-3">
          <button className="px-3 py-1.5 bg-[#a7a7aa] hover:bg-gray-700 rounded text-sm text-black hover:text-white">
            Project Environment
          </button>
          <Link href="/pages/gitconnect">

          <button
           className="px-3 py-1.5 bg-[#a7a7aa] text-black hover:bg-gray-100 rounded text-sm flex items-center space-x-2">
            <Plus className="w-4 h-4" />            
            <span>Create Service</span>
          </button>
          </Link>
        </div>
      </div>
      {/* Filter & Controls */}
      <div className="bg-[#18181b] border border-[#2c2c2e] rounded-xl mx-6 mt-4 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedServices.size === services.length}
                onChange={handleSelectAll}
                className="w-4 h-4 bg-gray-800 border-gray-600 rounded"
              />
              <span className="text-sm text-gray-400">Select All</span>
            </label>
            <button className="text-sm text-gray-400 hover:text-white">
              Bulk Actions
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Filter services..."
                className="pl-10 pr-4 py-2 bg-[#1f1f22] border border-gray-700 rounded text-sm w-64 focus:outline-none focus:border-gray-600"
              />
            </div>
            <button className="flex items-center space-x-2 px-3 py-2 bg-[#1f1f22] border border-gray-700 rounded text-sm hover:bg-gray-800 text-white">
              <span>Select types...</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      {/* </div> */}

      {/* Services Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="relative bg-[#18181b] border border-[#2c2c2e] rounded-xl p-6 transition-colors hover:border-gray-500"
            >
              {/* Status */}
              <div className="absolute top-4 right-4">
                {getStatusIndicator(service.status)}
              </div>

              {/* Icon */}
              <div className="absolute top-4 right-12">
                <div className="w-6 h-6 bg-[#1c1c1e] rounded flex items-center justify-center">
                  {service.icon}
                </div>
              </div>

              {/* Content */}
              <div className="pr-16">
                <h3 className="text-white font-medium mb-2">{service.name}</h3>
                <p className="text-gray-400 text-sm">{service.createdAt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
