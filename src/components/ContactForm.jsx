import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const ContactForm = ({ isOpen, onClose, editingContact = null, onSave }) => {
  const X = getIcon('X');
  const User = getIcon('User');
  const Building = getIcon('Building');
  const AtSign = getIcon('AtSign');
  const Phone = getIcon('Phone');
  const MapPin = getIcon('MapPin');
  const Globe = getIcon('Globe');
  const Calendar = getIcon('Calendar');
  const Tag = getIcon('Tag');
  const Star = getIcon('Star');
  
  const initialContact = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    address: '',
    website: '',
    dateAdded: new Date().toISOString().split('T')[0],
    category: 'lead',
    notes: '',
    status: 'active'
  };
  
  const [contact, setContact] = useState(initialContact);
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    if (editingContact) {
      setContact({
        ...editingContact,
        dateAdded: editingContact.dateAdded || new Date().toISOString().split('T')[0]
      });
    } else {
      setContact(initialContact);
    }
  }, [editingContact, isOpen]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!contact.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!contact.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!contact.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(contact.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    const contactData = {
      ...contact,
      id: editingContact ? editingContact.id : Date.now().toString()
    };
    
    onSave(contactData);
    onClose();
    
    toast.success(`Contact ${editingContact ? 'updated' : 'added'} successfully!`);
  };
  
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-surface-800 rounded-xl shadow-soft w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="p-4 md:p-6 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-surface-900 dark:text-surface-100">
            {editingContact ? 'Edit Contact' : 'Add New Contact'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-surface-500" />
          </button>
        </div>
        
        <div className="overflow-y-auto p-4 md:p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Personal Information */}
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-surface-600 dark:text-surface-400 mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Personal Information
                </h3>
              </div>
              
              <div className="input-group">
                <label htmlFor="firstName" className="label">
                  First Name*
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={contact.firstName}
                  onChange={handleChange}
                  className={`w-full ${errors.firstName ? 'border-red-500 dark:border-red-400' : ''}`}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                )}
              </div>
              
              <div className="input-group">
                <label htmlFor="lastName" className="label">
                  Last Name*
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={contact.lastName}
                  onChange={handleChange}
                  className={`w-full ${errors.lastName ? 'border-red-500 dark:border-red-400' : ''}`}
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
              
              <div className="input-group">
                <label htmlFor="email" className="label">
                  Email Address*
                </label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500 w-4 h-4" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contact.email}
                    onChange={handleChange}
                    className={`w-full pl-10 ${errors.email ? 'border-red-500 dark:border-red-400' : ''}`}
                    placeholder="Enter email address"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              
              <div className="input-group">
                <label htmlFor="phone" className="label">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500 w-4 h-4" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={contact.phone}
                    onChange={handleChange}
                    className="w-full pl-10"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              
              {/* Company Information */}
              <div className="md:col-span-2 mt-2">
                <h3 className="text-sm font-medium text-surface-600 dark:text-surface-400 mb-3 flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Company Information
                </h3>
              </div>
              
              <div className="input-group">
                <label htmlFor="company" className="label">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={contact.company}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Enter company name"
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="position" className="label">
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={contact.position}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Enter job title"
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="category" className="label">
                  Category
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500 w-4 h-4" />
                  <select
                    id="category"
                    name="category"
                    value={contact.category}
                    onChange={handleChange}
                    className="w-full pl-10"
                  >
                    <option value="lead">Lead</option>
                    <option value="customer">Customer</option>
                    <option value="partner">Partner</option>
                    <option value="vendor">Vendor</option>
                  </select>
                </div>
              </div>
              
              <div className="input-group">
                <label htmlFor="status" className="label">
                  Status
                </label>
                <div className="relative">
                  <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500 w-4 h-4" />
                  <select
                    id="status"
                    name="status"
                    value={contact.status}
                    onChange={handleChange}
                    className="w-full pl-10"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="prospect">Prospect</option>
                  </select>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="notes" className="label">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={contact.notes}
                  onChange={handleChange}
                  className="w-full h-24 resize-none"
                  placeholder="Add any additional information about this contact"
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 border-t border-surface-200 dark:border-surface-700 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn-outline"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                {editingContact ? 'Update Contact' : 'Add Contact'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactForm;