import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import getIcon from '../utils/iconUtils';

const MainFeature = () => {
  // Icons
  const CirclePlus = getIcon('CirclePlus');
  const UserCircle = getIcon('UserCircle');
  const Building = getIcon('Building');
  const DollarSign = getIcon('DollarSign');
  const Calendar = getIcon('Calendar');
  const Check = getIcon('Check');
  const Trash2 = getIcon('Trash2');
  const Edit = getIcon('Edit');
  const X = getIcon('X');
  const ArrowRight = getIcon('ArrowRight');
  const ArrowLeft = getIcon('ArrowLeft');
  const Briefcase = getIcon('Briefcase');
  const Search = getIcon('Search');

  // State for deals (our main feature is a sales pipeline)
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeStage, setActiveStage] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewDealForm, setShowNewDealForm] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);
  
  // New deal form state
  const [newDeal, setNewDeal] = useState({
    name: '',
    company: '',
    value: '',
    stage: 'lead',
    expectedCloseDate: format(new Date(), 'yyyy-MM-dd'),
    contact: ''
  });

  // Pipeline stages
  const stages = [
    { id: 'lead', name: 'Lead', color: 'bg-blue-500' },
    { id: 'qualified', name: 'Qualified', color: 'bg-purple-500' },
    { id: 'proposal', name: 'Proposal', color: 'bg-yellow-500' },
    { id: 'negotiation', name: 'Negotiation', color: 'bg-orange-500' },
    { id: 'closed', name: 'Closed Won', color: 'bg-green-500' },
    { id: 'lost', name: 'Closed Lost', color: 'bg-red-500' }
  ];

  // Simulate fetching deals
  useEffect(() => {
    const timer = setTimeout(() => {
      setDeals([
        { 
          id: '1', 
          name: 'Website Redesign', 
          company: 'Acme Corp', 
          value: 12500, 
          stage: 'lead',
          expectedCloseDate: '2023-12-30',
          contact: 'John Smith',
          createdAt: '2023-10-15'
        },
        { 
          id: '2', 
          name: 'CRM Implementation', 
          company: 'TechFlow Inc', 
          value: 45000, 
          stage: 'qualified',
          expectedCloseDate: '2023-11-15',
          contact: 'Sarah Johnson',
          createdAt: '2023-09-22'
        },
        { 
          id: '3', 
          name: 'Annual Maintenance', 
          company: 'Global Logistics', 
          value: 36000, 
          stage: 'proposal',
          expectedCloseDate: '2023-12-05',
          contact: 'Mike Chen',
          createdAt: '2023-10-03'
        },
        { 
          id: '4', 
          name: 'Mobile App Development', 
          company: 'NexGen Solutions', 
          value: 85000, 
          stage: 'negotiation',
          expectedCloseDate: '2024-01-30',
          contact: 'Lisa Wong',
          createdAt: '2023-08-17'
        },
        { 
          id: '5', 
          name: 'Software License Renewal', 
          company: 'DataSense Analytics', 
          value: 27500, 
          stage: 'closed',
          expectedCloseDate: '2023-11-01',
          contact: 'Alex Roberts',
          createdAt: '2023-09-10'
        }
      ]);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Filter deals by stage and search query
  const filteredDeals = deals.filter((deal) => {
    const matchesStage = activeStage === 'all' || deal.stage === activeStage;
    const matchesSearch = 
      deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.contact.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStage && matchesSearch;
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDeal({
      ...newDeal,
      [name]: value
    });
  };

  // Handle stage change
  const handleStageChange = (dealId, newStage) => {
    setDeals(deals.map(deal => 
      deal.id === dealId ? { ...deal, stage: newStage } : deal
    ));
    
    const dealName = deals.find(d => d.id === dealId)?.name;
    const stageName = stages.find(s => s.id === newStage)?.name;
    
    toast.success(`Moved "${dealName}" to ${stageName} stage`, {
      position: "bottom-right",
      autoClose: 3000
    });
  };

  // Add new deal
  const handleAddDeal = (e) => {
    e.preventDefault();
    
    if (!newDeal.name || !newDeal.company || !newDeal.value) {
      toast.error("Please fill in all required fields", {
        position: "bottom-right"
      });
      return;
    }

    const newDealObject = {
      id: Date.now().toString(),
      ...newDeal,
      value: parseFloat(newDeal.value),
      createdAt: format(new Date(), 'yyyy-MM-dd')
    };

    if (editingDeal) {
      // Update existing deal
      setDeals(deals.map(deal => 
        deal.id === editingDeal.id ? { ...deal, ...newDealObject, id: deal.id } : deal
      ));
      toast.success(`Deal "${newDeal.name}" updated successfully`, {
        position: "bottom-right"
      });
      setEditingDeal(null);
    } else {
      // Add new deal
      setDeals([...deals, newDealObject]);
      toast.success(`Deal "${newDeal.name}" added successfully`, {
        position: "bottom-right"
      });
    }

    // Reset form
    setNewDeal({
      name: '',
      company: '',
      value: '',
      stage: 'lead',
      expectedCloseDate: format(new Date(), 'yyyy-MM-dd'),
      contact: ''
    });
    setShowNewDealForm(false);
  };

  // Delete deal
  const handleDeleteDeal = (id) => {
    const dealToDelete = deals.find(deal => deal.id === id);
    setDeals(deals.filter(deal => deal.id !== id));
    toast.info(`Deal "${dealToDelete.name}" deleted`, {
      position: "bottom-right"
    });
  };

  // Edit deal
  const handleEditDeal = (deal) => {
    setEditingDeal(deal);
    setNewDeal({
      name: deal.name,
      company: deal.company,
      value: deal.value.toString(),
      stage: deal.stage,
      expectedCloseDate: deal.expectedCloseDate,
      contact: deal.contact
    });
    setShowNewDealForm(true);
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

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <section className="mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-surface-800 dark:text-surface-200 mb-4 md:mb-0">
          Sales Pipeline
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search deals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-64 rounded-lg border border-surface-300 dark:border-surface-700 bg-white dark:bg-surface-800 focus:ring-2 focus:ring-primary dark:focus:ring-primary-light transition-all"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500 w-4 h-4" />
          </div>
          
          {/* Add New Deal Button */}
          <button
            onClick={() => {
              setEditingDeal(null);
              setNewDeal({
                name: '',
                company: '',
                value: '',
                stage: 'lead',
                expectedCloseDate: format(new Date(), 'yyyy-MM-dd'),
                contact: ''
              });
              setShowNewDealForm(true);
            }}
            className="btn-primary flex items-center justify-center gap-2"
          >
            <CirclePlus className="w-5 h-5" />
            <span>Add Deal</span>
          </button>
        </div>
      </div>

      {/* Stage Filter */}
      <div className="mb-6 overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex space-x-2 min-w-max">
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeStage === 'all'
                ? 'bg-primary text-white shadow-soft'
                : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
            }`}
            onClick={() => setActiveStage('all')}
          >
            All Deals
          </button>
          
          {stages.map((stage) => (
            <button
              key={stage.id}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeStage === stage.id
                  ? 'bg-primary text-white shadow-soft'
                  : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
              }`}
              onClick={() => setActiveStage(stage.id)}
            >
              <span className={`inline-block w-2 h-2 rounded-full ${stage.color} mr-2`}></span>
              {stage.name}
            </button>
          ))}
        </div>
      </div>

      {/* New Deal Form */}
      <AnimatePresence>
        {showNewDealForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mb-8"
          >
            <div className="card border border-surface-300 dark:border-surface-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {editingDeal ? 'Edit Deal' : 'Add New Deal'}
                </h3>
                <button
                  onClick={() => setShowNewDealForm(false)}
                  className="p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
                >
                  <X className="w-5 h-5 text-surface-500" />
                </button>
              </div>
              
              <form onSubmit={handleAddDeal}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="input-group">
                    <label htmlFor="name" className="label">
                      Deal Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newDeal.name}
                      onChange={handleInputChange}
                      className="w-full"
                      placeholder="Enter deal name"
                      required
                    />
                  </div>
                  
                  <div className="input-group">
                    <label htmlFor="company" className="label">
                      Company Name*
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={newDeal.company}
                      onChange={handleInputChange}
                      className="w-full"
                      placeholder="Enter company name"
                      required
                    />
                  </div>
                  
                  <div className="input-group">
                    <label htmlFor="value" className="label">
                      Deal Value*
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500">
                        $
                      </span>
                      <input
                        type="number"
                        id="value"
                        name="value"
                        value={newDeal.value}
                        onChange={handleInputChange}
                        className="w-full pl-8"
                        placeholder="Enter deal value"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="input-group">
                    <label htmlFor="stage" className="label">
                      Stage
                    </label>
                    <select
                      id="stage"
                      name="stage"
                      value={newDeal.stage}
                      onChange={handleInputChange}
                      className="w-full"
                    >
                      {stages.map(stage => (
                        <option key={stage.id} value={stage.id}>
                          {stage.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="input-group">
                    <label htmlFor="expectedCloseDate" className="label">
                      Expected Close Date
                    </label>
                    <input
                      type="date"
                      id="expectedCloseDate"
                      name="expectedCloseDate"
                      value={newDeal.expectedCloseDate}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="input-group">
                    <label htmlFor="contact" className="label">
                      Primary Contact
                    </label>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
                      value={newDeal.contact}
                      onChange={handleInputChange}
                      className="w-full"
                      placeholder="Enter contact name"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => setShowNewDealForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    {editingDeal ? 'Update Deal' : 'Add Deal'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Deals List */}
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
      ) : filteredDeals.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {filteredDeals.map((deal) => {
            const stageInfo = stages.find(s => s.id === deal.stage);
            
            return (
              <motion.div
                key={deal.id}
                variants={itemVariants}
                className="card hover:shadow-soft border border-surface-200 dark:border-surface-700 transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg text-surface-900 dark:text-surface-100 mb-2 md:mb-0">
                    {deal.name}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${stageInfo.color}`}>
                      {stageInfo.name}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300">
                      {formatCurrency(deal.value)}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                  <div className="flex items-center text-sm text-surface-600 dark:text-surface-400">
                    <Building className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{deal.company}</span>
                  </div>
                  
                  {deal.contact && (
                    <div className="flex items-center text-sm text-surface-600 dark:text-surface-400">
                      <UserCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{deal.contact}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center text-sm text-surface-600 dark:text-surface-400">
                    <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>Close: {deal.expectedCloseDate}</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-surface-200 dark:border-surface-700 pt-3 gap-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditDeal(deal)}
                      className="p-2 rounded-lg text-surface-600 hover:text-primary hover:bg-surface-100 dark:text-surface-400 dark:hover:text-primary dark:hover:bg-surface-800 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => handleDeleteDeal(deal.id)}
                      className="p-2 rounded-lg text-surface-600 hover:text-red-500 hover:bg-surface-100 dark:text-surface-400 dark:hover:text-red-400 dark:hover:bg-surface-800 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex gap-1 w-full sm:w-auto overflow-x-auto scrollbar-hide pb-1">
                    {stages.map((stage, index) => {
                      // Don't show current stage or stages before it in the move options
                      if (stage.id === deal.stage) return null;
                      
                      // Get the current stage index
                      const currentStageIndex = stages.findIndex(s => s.id === deal.stage);
                      
                      // For stages right after the current one, show forward button
                      if (index === currentStageIndex + 1) {
                        return (
                          <button
                            key={stage.id}
                            onClick={() => handleStageChange(deal.id, stage.id)}
                            className="px-3 py-1 rounded bg-surface-100 hover:bg-surface-200 dark:bg-surface-800 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300 text-xs font-medium transition-colors whitespace-nowrap flex items-center gap-1"
                          >
                            <span>Move to {stage.name}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        );
                      }
                      
                      // For Won/Lost stages, show different button type
                      if (stage.id === 'closed' || stage.id === 'lost') {
                        const icon = stage.id === 'closed' ? Check : X;
                        const IconComponent = icon;
                        
                        return (
                          <button
                            key={stage.id}
                            onClick={() => handleStageChange(deal.id, stage.id)}
                            className={`px-3 py-1 rounded text-white text-xs font-medium transition-colors whitespace-nowrap flex items-center gap-1 ${
                              stage.id === 'closed' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                            }`}
                          >
                            <IconComponent className="w-3 h-3" />
                            <span>{stage.id === 'closed' ? 'Mark Won' : 'Mark Lost'}</span>
                          </button>
                        );
                      }
                      
                      return null;
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <div className="card text-center py-12">
          <div className="flex justify-center mb-4">
            <Briefcase className="w-16 h-16 text-surface-400 dark:text-surface-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-surface-800 dark:text-surface-200">
            No deals found
          </h3>
          <p className="text-surface-600 dark:text-surface-400 mb-6 max-w-md mx-auto">
            {searchQuery 
              ? `No deals match your search for "${searchQuery}". Try a different search term.` 
              : `No deals in the ${activeStage === 'all' ? 'pipeline' : stages.find(s => s.id === activeStage)?.name} stage yet.`}
          </p>
          <button
            onClick={() => {
              setEditingDeal(null);
              setNewDeal({
                name: '',
                company: '',
                value: '',
                stage: activeStage === 'all' ? 'lead' : activeStage,
                expectedCloseDate: format(new Date(), 'yyyy-MM-dd'),
                contact: ''
              });
              setShowNewDealForm(true);
            }}
            className="btn-primary inline-flex items-center gap-2"
          >
            <CirclePlus className="w-5 h-5" />
            <span>Add Your First Deal</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default MainFeature;