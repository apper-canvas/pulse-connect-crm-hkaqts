import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import getIcon from '../utils/iconUtils';
import ContactForm from '../components/ContactForm';

const Contacts = () => {
  // Icons
  const UserPlus = getIcon('UserPlus');
  const Search = getIcon('Search');
  const Users = getIcon('Users');
  const Mail = getIcon('Mail');
  const Phone = getIcon('Phone');
  const Building = getIcon('Building');
  const Tag = getIcon('Tag');
  const Edit = getIcon('Edit');
  const Trash2 = getIcon('Trash2');
  const Filter = getIcon('Filter');
  const ChevronDown = getIcon('ChevronDown');
  
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  
  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Contacts' },
    { id: 'lead', name: 'Leads', color: 'bg-blue-500' },
    { id: 'customer', name: 'Customers', color: 'bg-green-500' },
    { id: 'partner', name: 'Partners', color: 'bg-purple-500' },
    { id: 'vendor', name: 'Vendors', color: 'bg-yellow-500' }
  ];
  
  // Simulate fetching contacts
  useEffect(() => {
    const timer = setTimeout(() => {
      setContacts([
        {
          id: '1',
          firstName: 'John',
          lastName: 'Smith',
          email: 'john.smith@example.com',
          phone: '(555) 123-4567',
          company: 'Acme Corp',
          position: 'Marketing Director',
          category: 'customer',
          status: 'active',
          dateAdded: '2023-10-15',
          notes: 'Key decision maker for the website redesign project.'
        },
        {
          id: '2',
          firstName: 'Sarah',
          lastName: 'Johnson',
          email: 'sarah.j@techflow.com',
          phone: '(555) 987-6543',
          company: 'TechFlow Inc',
          position: 'CTO',
          category: 'lead',
          status: 'prospect',
          dateAdded: '2023-11-05',
          notes: 'Interested in our enterprise solution.'
        },
        {
          id: '3',
          firstName: 'Michael',
          lastName: 'Chen',
          email: 'mchen@globallogistics.com',
          phone: '(555) 456-7890',
          company: 'Global Logistics',
          position: 'Operations Manager',
          category: 'customer',
          status: 'active',
          dateAdded: '2023-09-22',
          notes: 'Regular client - quarterly maintenance contract.'
        }
      ]);
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter contacts based on search and category
  const filteredContacts = contacts.filter(contact => {
    const matchesFilter = activeFilter === 'all' || contact.category === activeFilter;
    const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
    const matchesSearch = 
      fullName.includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });
  
  // Add or update contact
  const handleSaveContact = (contactData) => {
    if (contactData.id && contacts.some(c => c.id === contactData.id)) {
      // Update existing contact
      setContacts(prevContacts => 
        prevContacts.map(c => c.id === contactData.id ? contactData : c)
      );
    } else {
      // Add new contact
      setContacts(prevContacts => [...prevContacts, contactData]);
    }
    setEditingContact(null);
  };
  
  // Delete contact
  const handleDeleteContact = (id) => {
    const contactToDelete = contacts.find(c => c.id === id);
    
    if (window.confirm(`Are you sure you want to delete ${contactToDelete.firstName} ${contactToDelete.lastName}?`)) {
      setContacts(contacts.filter(c => c.id !== id));
      toast.success(`Contact deleted successfully`);
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };
  
  // Function to get category badge
  const getCategoryBadge = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return null;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${category.color}`}>
        {category.name.replace('s', '')}
      </span>
    );
  };
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-surface-100 mb-2">
              Contacts
            </h1>
            <p className="text-surface-600 dark:text-surface-400 max-w-2xl">
              Manage your network of clients, leads, and business relationships.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full sm:w-64 rounded-lg border border-surface-300 dark:border-surface-700 bg-white dark:bg-surface-800"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500 w-4 h-4" />
            </div>
            
            <button 
              className="btn-primary flex items-center gap-2"
              onClick={() => {
                setEditingContact(null);
                setShowForm(true);
              }}
            >
              <UserPlus className="w-5 h-5" />
              <span>New Contact</span>
            </button>
          </div>
        </div>
      </header>
      
      {/* Category Filter */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="md:hidden relative">
          <button 
            className="btn-outline flex items-center gap-2"
            onClick={() => setShowFilterMenu(!showFilterMenu)}
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {showFilterMenu && (
            <div className="absolute top-full left-0 mt-1 z-10 bg-white dark:bg-surface-800 rounded-lg shadow-soft border border-surface-200 dark:border-surface-700 py-2 min-w-[180px]">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-surface-100 dark:hover:bg-surface-700 ${
                    activeFilter === category.id ? 'bg-surface-100 dark:bg-surface-700 font-medium' : ''
                  }`}
                  onClick={() => {
                    setActiveFilter(category.id);
                    setShowFilterMenu(false);
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="hidden md:flex space-x-2">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeFilter === category.id
                  ? 'bg-primary text-white shadow-soft'
                  : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
              }`}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.id !== 'all' && (
                <span className={`inline-block w-2 h-2 rounded-full ${category.color} mr-2`}></span>
              )}
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Contacts List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="card animate-pulse">
              <div className="h-6 bg-surface-200 dark:bg-surface-700 rounded-md w-3/4 mb-4"></div>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded-md w-1/4"></div>
                <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded-md w-1/5"></div>
                <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded-md w-1/6"></div>
              </div>
              <div className="h-10 bg-surface-200 dark:bg-surface-700 rounded-md w-full"></div>
            </div>
          ))}
        </div>
      ) : filteredContacts.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {filteredContacts.map(contact => (
            <motion.div
              key={contact.id}
              variants={itemVariants}
              className="card hover:shadow-soft border border-surface-200 dark:border-surface-700 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-surface-900 dark:text-surface-100">
                    {contact.firstName} {contact.lastName}
                  </h3>
                  {contact.position && (
                    <p className="text-surface-600 dark:text-surface-400 text-sm">
                      {contact.position}
                    </p>
                  )}
                </div>
                {getCategoryBadge(contact.category)}
              </div>
              
              <div className="space-y-2 mb-4">
                {contact.company && (
                  <div className="flex items-center text-sm text-surface-600 dark:text-surface-400">
                    <Building className="w-4 h-4 mr-2 flex-shrink-0 text-surface-500" />
                    <span>{contact.company}</span>
                  </div>
                )}
                <div className="flex items-center text-sm text-surface-600 dark:text-surface-400">
                  <Mail className="w-4 h-4 mr-2 flex-shrink-0 text-surface-500" />
                  <a href={`mailto:${contact.email}`} className="text-primary hover:underline truncate">
                    {contact.email}
                  </a>
                </div>
                {contact.phone && (
                  <div className="flex items-center text-sm text-surface-600 dark:text-surface-400">
                    <Phone className="w-4 h-4 mr-2 flex-shrink-0 text-surface-500" />
                    <a href={`tel:${contact.phone}`} className="hover:text-primary">
                      {contact.phone}
                    </a>
                  </div>
                )}
              </div>
              
              {contact.notes && (
                <div className="mb-4 p-3 bg-surface-50 dark:bg-surface-700 rounded-lg text-sm text-surface-600 dark:text-surface-400">
                  <p className="line-clamp-2">{contact.notes}</p>
                </div>
              )}
              
              <div className="flex justify-between items-center border-t border-surface-200 dark:border-surface-700 pt-3 mt-auto">
                <span className="text-xs text-surface-500">
                  Added: {format(new Date(contact.dateAdded), 'MMM d, yyyy')}
                </span>
                
                <div className="flex space-x-1">
                  <button
                    onClick={() => {
                      setEditingContact(contact);
                      setShowForm(true);
                    }}
                    className="p-2 rounded-lg text-surface-600 hover:text-primary hover:bg-surface-100 dark:text-surface-400 dark:hover:text-primary dark:hover:bg-surface-800 transition-colors"
                    aria-label="Edit contact"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDeleteContact(contact.id)}
                    className="p-2 rounded-lg text-surface-600 hover:text-red-500 hover:bg-surface-100 dark:text-surface-400 dark:hover:text-red-400 dark:hover:bg-surface-800 transition-colors"
                    aria-label="Delete contact"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="card text-center py-12">
          <div className="flex justify-center mb-4">
            <Users className="w-16 h-16 text-surface-400 dark:text-surface-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-surface-800 dark:text-surface-200">
            No contacts found
          </h3>
          <p className="text-surface-600 dark:text-surface-400 mb-6 max-w-md mx-auto">
            {searchQuery 
              ? `No contacts match your search for "${searchQuery}". Try a different search term.` 
              : `No contacts in the ${activeFilter === 'all' ? 'system' : categories.find(c => c.id === activeFilter)?.name} yet.`}
          </p>
          <button
            onClick={() => {
              setEditingContact(null);
              setShowForm(true);
            }}
            className="btn-primary inline-flex items-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            <span>Add Your First Contact</span>
          </button>
        </div>
      )}
      
      {/* Contact Form Modal */}
      <AnimatePresence>
        {showForm && (
          <ContactForm
            isOpen={showForm}
            onClose={() => setShowForm(false)}
            editingContact={editingContact}
            onSave={handleSaveContact}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contacts;