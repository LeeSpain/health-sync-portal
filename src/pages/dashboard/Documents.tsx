import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Plus, 
  FileText, 
  Download, 
  Share2, 
  Trash2, 
  FolderPlus, 
  File, 
  FileImage,
  FileType,
  Filter
} from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/animations/FadeIn';
import { Input } from '@/components/ui/input';
import { formatDistanceToNow } from 'date-fns';

// Mock data for documents
const documents = [
  {
    id: 1,
    name: 'Client Care Plan - Emma Thompson.pdf',
    type: 'pdf',
    size: '1.2 MB',
    createdAt: new Date('2023-12-05'),
    category: 'Care Plans'
  },
  {
    id: 2,
    name: 'Medical History - John Martinez.pdf',
    type: 'pdf',
    size: '2.8 MB',
    createdAt: new Date('2023-12-03'),
    category: 'Medical Records'
  },
  {
    id: 3,
    name: 'Blood Work Results - Lisa Chen.jpg',
    type: 'image',
    size: '4.5 MB',
    createdAt: new Date('2023-12-01'),
    category: 'Test Results'
  },
  {
    id: 4,
    name: 'Treatment Progress Notes - Q4 2023.docx',
    type: 'doc',
    size: '845 KB',
    createdAt: new Date('2023-11-25'),
    category: 'Progress Notes'
  },
  {
    id: 5,
    name: 'Medication Schedule - Robert Wilson.pdf',
    type: 'pdf',
    size: '1.7 MB',
    createdAt: new Date('2023-11-20'),
    category: 'Medications'
  },
  {
    id: 6,
    name: 'Client Feedback Form.docx',
    type: 'doc',
    size: '520 KB',
    createdAt: new Date('2023-11-15'),
    category: 'Forms'
  },
];

// Document categories
const categories = [
  'All Documents',
  'Care Plans',
  'Medical Records',
  'Test Results',
  'Progress Notes',
  'Medications',
  'Forms'
];

const Documents = () => {
  const [activeCategory, setActiveCategory] = useState('All Documents');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter documents based on category and search query
  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = activeCategory === 'All Documents' || doc.category === activeCategory;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileType className="h-5 w-5 text-red-500" />;
      case 'image':
        return <FileImage className="h-5 w-5 text-blue-500" />;
      case 'doc':
        return <FileText className="h-5 w-5 text-nurse-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Documents</h1>
              <p className="text-gray-600 dark:text-gray-300">Manage all your clinical documents</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Button variant="outline">
                <FolderPlus className="h-4 w-4 mr-2" />
                New Folder
              </Button>
              <Button className="bg-nurse-600 hover:bg-nurse-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </div>
          </div>
        </FadeIn>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <FadeIn delay={100} className="lg:col-span-3">
            <GlassCard>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h2>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                        activeCategory === category 
                          ? 'bg-nurse-50 text-nurse-600 dark:bg-nurse-900/30 dark:text-nurse-400 font-medium'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Storage</h2>
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                  <div className="bg-nurse-600 h-2 rounded-full w-[65%]"></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">6.5 GB</span> of 10 GB used
                </p>
              </div>
            </GlassCard>
          </FadeIn>
          
          {/* Main Content */}
          <FadeIn delay={150} className="lg:col-span-9">
            <GlassCard>
              {/* Search and Filter */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search documents..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
              
              {/* Documents List */}
              <div className="p-4">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  {filteredDocuments.length} {filteredDocuments.length === 1 ? 'document' : 'documents'} in {activeCategory}
                </div>
                
                <div className="space-y-2">
                  {filteredDocuments.map((document) => (
                    <div 
                      key={document.id}
                      className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center"
                    >
                      <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 mr-3">
                        {getFileIcon(document.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {document.name}
                        </h3>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <span className="mr-2">{document.size}</span>
                          <span>•</span>
                          <span className="ml-2">{formatDistanceToNow(document.createdAt, { addSuffix: true })}</span>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </FadeIn>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Documents;
