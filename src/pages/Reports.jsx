import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import { format, subDays, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const Reports = () => {
  const [dateRange, setDateRange] = useState('last30days');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  // Icons
  const Calendar = getIcon('Calendar');
  const ArrowUp = getIcon('ArrowUp');
  const ArrowDown = getIcon('ArrowDown');
  const BarChart = getIcon('BarChart');
  const PieChart = getIcon('PieChart');
  const Users = getIcon('Users');
  const CheckCircle = getIcon('CheckCircle');
  const DollarSign = getIcon('DollarSign');

  // Simulate data loading
  useEffect(() => {
    setIsLoading(true);
    
    // This would be an API call in a real application
    setTimeout(() => {
      generateMockData(dateRange);
      setIsLoading(false);
      toast.success('Report data updated', {
        position: "bottom-right",
        autoClose: 2000
      });
    }, 800);
  }, [dateRange]);

  const generateMockData = (range) => {
    let salesData = [];
    let labels = [];
    let taskCompletionData = [];
    const today = new Date();
    
    let startDate;
    let endDate = today;
    let dataPoints = 0;
    
    // Configure date range
    switch (range) {
      case 'last7days':
        startDate = subDays(today, 7);
        dataPoints = 7;
        break;
      case 'last30days':
        startDate = subDays(today, 30);
        dataPoints = 30;
        break;
      case 'last3months':
        startDate = subMonths(today, 3);
        dataPoints = 12; // weekly data points
        break;
      case 'last12months':
        startDate = subMonths(today, 12);
        dataPoints = 12; // monthly data points
        break;
      case 'thisMonth':
        startDate = startOfMonth(today);
        endDate = endOfMonth(today);
        dataPoints = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        break;
      default:
        startDate = subDays(today, 30);
        dataPoints = 30;
    }

    // Generate sales data
    for (let i = 0; i < dataPoints; i++) {
      let date;
      if (range === 'last3months') {
        // Weekly data points
        date = format(subDays(today, i * 7), 'MMM dd');
      } else if (range === 'last12months') {
        // Monthly data points
        date = format(subMonths(today, i), 'MMM yyyy');
      } else {
        // Daily data points
        date = format(subDays(today, dataPoints - i - 1), 'MMM dd');
      }
      
      labels.push(date);
      salesData.push(Math.floor(Math.random() * 20000) + 5000);
      taskCompletionData.push(Math.floor(Math.random() * 50) + 10);
    }

    // Generate pie chart data for deal stages
    const dealStages = {
      labels: ['Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'],
      series: [25, 30, 15, 20, 10]
    };

    // Customer acquisition data
    const customerData = {
      labels: ['Direct', 'Referral', 'Organic Search', 'Social', 'Email'],
      series: [30, 25, 20, 15, 10]
    };

    // Generate KPI data
    const kpis = {
      totalRevenue: Math.floor(Math.random() * 1000000) + 500000,
      averageDealSize: Math.floor(Math.random() * 50000) + 10000,
      dealClosureRate: Math.floor(Math.random() * 30) + 20,
      totalCustomers: Math.floor(Math.random() * 1000) + 100,
      customerGrowth: Math.floor(Math.random() * 20) + 5,
      taskCompletion: Math.floor(Math.random() * 30) + 60,
    };

    setData({
      salesData,
      labels,
      taskCompletionData,
      dealStages,
      customerData,
      kpis
    });
  };

  // Configure chart options
  const salesChartOptions = {
    chart: {
      id: 'sales-chart',
      toolbar: {
        show: false
      },
      fontFamily: 'Inter, sans-serif',
    },
    xaxis: {
      categories: data?.labels || [],
      labels: {
        style: {
          colors: Array(30).fill('#64748b'), // surface-500
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => `$${value.toLocaleString()}`,
        style: {
          colors: ['#64748b'], // surface-500
          fontSize: '12px',
        },
      },
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (value) => `$${value.toLocaleString()}`,
      }
    },
    colors: ['#3b82f6'], // primary color
    grid: {
      borderColor: '#e2e8f0', // surface-200
      strokeDashArray: 5,
    },
    markers: {
      size: 5,
      colors: ['#3b82f6'], // primary color
      strokeColors: '#ffffff',
      strokeWidth: 2,
    },
  };

  // Configure task completion chart
  const taskChartOptions = {
    ...salesChartOptions,
    chart: {
      id: 'task-chart',
      toolbar: {
        show: false
      },
      fontFamily: 'Inter, sans-serif',
    },
    colors: ['#8b5cf6'], // secondary color
    markers: {
      size: 5,
      colors: ['#8b5cf6'], // secondary color
      strokeColors: '#ffffff',
      strokeWidth: 2,
    },
    yaxis: {
      labels: {
        formatter: (value) => `${value}`,
        style: {
          colors: ['#64748b'], // surface-500
          fontSize: '12px',
        },
      },
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (value) => `${value} tasks`,
      }
    },
  };

  // Pie chart options for deal stages
  const pieChartOptions = {
    labels: data?.dealStages?.labels || [],
    colors: ['#3b82f6', '#8b5cf6', '#f43f5e', '#22c55e', '#f59e0b'],
    legend: {
      position: 'bottom',
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
      labels: {
        colors: Array(5).fill('#64748b'), // surface-500
      },
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0 text-surface-800 dark:text-surface-100">
          <BarChart className="inline-block mr-2 h-7 w-7" /> Reports & Analytics
        </h1>
        <div className="flex items-center space-x-2 bg-white dark:bg-surface-800 p-2 rounded-lg shadow-sm">
          <Calendar className="h-4 w-4 text-surface-500 dark:text-surface-400" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-transparent border-none text-sm text-surface-700 dark:text-surface-300 focus:ring-0 p-0 cursor-pointer"
          >
            <option value="last7days">Last 7 days</option>
            <option value="last30days">Last 30 days</option>
            <option value="last3months">Last 3 months</option>
            <option value="last12months">Last 12 months</option>
            <option value="thisMonth">This month</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-16 w-16 bg-surface-200 dark:bg-surface-700 rounded-full mb-4"></div>
            <div className="h-4 w-32 bg-surface-200 dark:bg-surface-700 rounded mb-2"></div>
            <div className="h-3 w-24 bg-surface-200 dark:bg-surface-700 rounded"></div>
          </div>
        </div>
      ) : (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="card bg-gradient-to-br from-primary-light to-primary bg-opacity-90 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white text-opacity-80 font-medium mb-1">Total Revenue</p>
                  <h3 className="text-2xl font-bold">${data?.kpis?.totalRevenue.toLocaleString()}</h3>
                  <p className="text-sm mt-2 flex items-center">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    <span className="font-medium">{data?.kpis?.customerGrowth}% </span>
                    <span className="text-white text-opacity-80 ml-1">vs previous period</span>
                  </p>
                </div>
                <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-surface-500 dark:text-surface-400 font-medium mb-1">New Customers</p>
                  <h3 className="text-2xl font-bold text-surface-800 dark:text-surface-100">{data?.kpis?.totalCustomers}</h3>
                  <p className="text-sm mt-2 flex items-center">
                    <ArrowUp className="h-4 w-4 mr-1 text-green-500" />
                    <span className="font-medium text-green-500">{data?.kpis?.customerGrowth}% </span>
                    <span className="text-surface-500 dark:text-surface-400 ml-1">increase</span>
                  </p>
                </div>
                <div className="p-3 bg-surface-100 dark:bg-surface-700 rounded-lg">
                  <Users className="h-6 w-6 text-primary dark:text-primary-light" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-surface-500 dark:text-surface-400 font-medium mb-1">Task Completion Rate</p>
                  <h3 className="text-2xl font-bold text-surface-800 dark:text-surface-100">{data?.kpis?.taskCompletion}%</h3>
                  <p className="text-sm mt-2 flex items-center">
                    <ArrowDown className="h-4 w-4 mr-1 text-red-500" />
                    <span className="font-medium text-red-500">2% </span>
                    <span className="text-surface-500 dark:text-surface-400 ml-1">decrease</span>
                  </p>
                </div>
                <div className="p-3 bg-surface-100 dark:bg-surface-700 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-secondary dark:text-secondary-light" />
                </div>
              </div>
            </div>
          </div>

          {/* Sales Chart */}
          <div className="card mb-8">
            <h2 className="text-xl font-semibold mb-4 text-surface-800 dark:text-surface-100">Sales Performance</h2>
            <div className="h-80">
              <Chart
                options={salesChartOptions}
                series={[{ name: 'Revenue', data: data?.salesData || [] }]}
                type="area"
                height="100%"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Deal Stages Chart */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4 text-surface-800 dark:text-surface-100">Deal Stage Distribution</h2>
              <div className="h-64">
                <Chart
                  options={pieChartOptions}
                  series={data?.dealStages?.series || []}
                  type="pie"
                  height="100%"
                />
              </div>
            </div>

            {/* Customer Acquisition Chart */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4 text-surface-800 dark:text-surface-100">Customer Acquisition Channels</h2>
              <div className="h-64">
                <Chart
                  options={{
                    ...pieChartOptions,
                    labels: data?.customerData?.labels || [],
                  }}
                  series={data?.customerData?.series || []}
                  type="donut"
                  height="100%"
                />
              </div>
            </div>
          </div>

          {/* Task Completion Chart */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-surface-800 dark:text-surface-100">Task Completion Trends</h2>
            <div className="h-80">
              <Chart
                options={taskChartOptions}
                series={[{ name: 'Completed Tasks', data: data?.taskCompletionData || [] }]}
                type="bar"
                height="100%"
              />
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Reports;