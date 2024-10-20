// // import React, { useEffect, useState } from 'react';
// // import AttributeButton from '../components/Admin/AttributeButton';
// // import OperatorButton from '../components/Admin/OperatorButton';
// // import InteractiveCanvas from '../components/Admin/InteractiveCanvas';
// // import TextBasedEditor from '../components/Admin/TextBasedEditor';
// // import EditRuleModal from '../components/Admin/EditRuleModal';
// // import api from '../api';
// // import { motion } from 'framer-motion';
// // import ErrorBoundary from '../components/Shared/ErrorBoundary';

// // const AdminPage = () => {
// //   const [rules, setRules] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [editingRule, setEditingRule] = useState(null);
// //   const [activeTab, setActiveTab] = useState('canvas'); // 'canvas' or 'text'

// //   useEffect(() => {
// //     fetchRules();
// //   }, []);

// //   const fetchRules = async () => {
// //     try {
// //       const response = await api.get('/rules');
// //       if (Array.isArray(response.data)) {
// //         setRules(response.data);
// //       } else {
// //         console.error('Rules data is not an array:', response.data);
// //         setError('Failed to fetch rules. Invalid data format.');
// //       }
// //     } catch (err) {
// //       console.error('Error fetching rules:', err);
// //       setError('Failed to fetch rules.');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const toggleRuleActive = async (rule_id, currentStatus) => {
// //     // Optimistically update the rule's active status in the state
// //     setRules((prevRules) =>
// //       prevRules.map((rule) =>
// //         rule.rule_id === rule_id ? { ...rule, active: !currentStatus } : rule
// //       )
// //     );
  
// //     try {
// //       // Send the PATCH request to the backend to persist the change
// //       await api.patch(`/rules/${rule_id}/toggle`, {
// //         active: !currentStatus,
// //       });
// //     } catch (err) {
// //       console.error('Error toggling rule status:', err);
// //       alert('Failed to toggle rule status.');
  
// //       // Revert the state if the request fails
// //       setRules((prevRules) =>
// //         prevRules.map((rule) =>
// //           rule.rule_id === rule_id ? { ...rule, active: currentStatus } : rule
// //         )
// //       );
// //     }
// //   };
  
  

// //   const handleRuleCreated = (newRule) => {
// //     setRules((prevRules) => [...prevRules, newRule]);
// //   };

// //   const handleRuleUpdated = (updatedRule) => {
// //     setRules((prevRules) =>
// //       prevRules.map((rule) =>
// //         rule.rule_id === updatedRule.rule_id ? updatedRule : rule
// //       )
// //     );
// //     setEditingRule(null); // Close the edit modal
// //   };

// //   const handleEditRule = (rule) => {
// //     setEditingRule(rule);
// //   };

// //   const handleTabSwitch = (tab) => {
// //     setActiveTab(tab);
// //   };

// //   const handleDeleteRule = async (rule_id) => {
// //     const confirmed = window.confirm('Are you sure you want to delete this rule?');
// //     if (!confirmed) return;

// //     try {
// //       await api.delete(`/rules/${rule_id}`);
// //       setRules((prevRules) => prevRules.filter((rule) => rule.rule_id !== rule_id));
// //       alert('Rule deleted successfully!');
// //     } catch (err) {
// //       console.error('Error deleting rule:', err);
// //       alert('Failed to delete rule.');
// //     }
// //   };

// //   return (
// //     <ErrorBoundary>
// //       <motion.div
// //         className="container mx-auto p-4"
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 1 }}
// //       >
// //         <h1 className="text-2xl font-bold mb-4">Admin Portal - Rule Management</h1>
//         // {/* Tab Buttons */}
//         // <div className="flex mb-4">
//         //   <button
//         //     onClick={() => handleTabSwitch('canvas')}
//         //     className={`flex-1 px-4 py-2 ${
//         //       activeTab === 'canvas'
//         //         ? 'bg-blue-500 text-white'
//         //         : 'bg-gray-200 text-gray-700'
//         //     } rounded-l`}
//         //   >
//         //     Use Interactive Canvas
//         //   </button>
//         //   <button
//         //     onClick={() => handleTabSwitch('text')}
//         //     className={`flex-1 px-4 py-2 ${
//         //       activeTab === 'text'
//         //         ? 'bg-blue-500 text-white'
//         //         : 'bg-gray-200 text-gray-700'
//         //     } rounded-r`}
//         //   >
//         //     Use Text-Based Input
//         //   </button>
//         // </div>

// //         {activeTab === 'canvas' ? (
// //           <InteractiveCanvas onRuleCreated={handleRuleCreated} />
// //         ) : (
// //           <TextBasedEditor onRuleCreated={handleRuleCreated} />
// //         )}

// //         <h2 className="text-xl font-semibold mt-8 mb-4">Existing Rules</h2>

// //         {isLoading ? (
// //           <p>Loading rules...</p>
// //         ) : error ? (
// //           <p className="text-red-500">{error}</p>
// //         ) : rules.length === 0 ? (
// //           <p>No rules found.</p>
// //         ) : (
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             {rules.map((rule) => (
// //               <motion.div
// //                 key={rule.rule_id}
// //                 className="p-4 bg-white rounded shadow flex flex-col justify-between"
// //                 initial={{ opacity: 0 }}
// //                 animate={{ opacity: 1 }}
// //                 transition={{ duration: 0.3 }}
// //               >
// //                 <div>
// //                   <p className="text-gray-700">
// //                     <span className="font-semibold">Rule:</span> {rule.ruleString}
// //                   </p>
// //                   <p className="text-gray-500 text-sm mt-2">
// //                     <span className="font-semibold">Created At:</span>{' '}
// //                     {new Date(rule.created_at).toLocaleString()}
// //                   </p>
// //                 </div>
// //                 <div className="mt-4 flex justify-between items-center">
// //                   {/* Toggle Button */}

// //                  <label className="relative inline-flex items-center cursor-pointer">
// //   <input
// //     type="checkbox"
// //     checked={rule.active}
// //     onChange={() => toggleRuleActive(rule.rule_id, rule.active)}
// //     className="sr-only"
// //   />
// //   <div
// //     className={`w-11 h-6 rounded-full transition-all ${rule.active ? 'bg-green-500' : 'bg-gray-200'}`}
// //   >
// //     <div
// //       className={`absolute w-5 h-5 bg-white rounded-full transition-all transform ${rule.active ? 'translate-x-5' : 'translate-x-0'}`}
// //     />
// //   </div>
// //   <span className="ml-3 text-sm font-medium text-gray-700">
// //     {rule.active ? 'Active' : 'Inactive'}
// //   </span>
// // </label>

// //                   <button
// //                     onClick={() => handleEditRule(rule)}
// //                     className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
// //                   >
// //                     Edit
// //                   </button>
// //                   <button
// //                     onClick={() => handleDeleteRule(rule.rule_id)}
// //                     className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
// //                   >
// //                     Delete
// //                   </button>
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>
// //         )}

// //         {/* Edit Rule Modal */}
// //         {editingRule && (
// //           <EditRuleModal
// //             rule={editingRule}
// //             onClose={() => setEditingRule(null)}
// //             onRuleUpdated={handleRuleUpdated}
// //           />
// //         )}
// //       </motion.div>
// //     </ErrorBoundary>
// //   );
// // };

// // export default AdminPage;












// // import React, { useEffect, useState, useRef } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import AttributeButton from '../components/Admin/AttributeButton';
// // import OperatorButton from '../components/Admin/OperatorButton';
// // import InteractiveCanvas from '../components/Admin/InteractiveCanvas';
// // import TextBasedEditor from '../components/Admin/TextBasedEditor';
// // import EditRuleModal from '../components/Admin/EditRuleModal';
// // import api from '../api';
// // import ErrorBoundary from '../components/Shared/ErrorBoundary';

// // const AdminPage = () => {
// //   const navigate = useNavigate();
// //   const mainRef = useRef(null);
// //   const tabButtonRefs = useRef([]);
// //   const ruleCardRefs = useRef([]);

// //   const [rules, setRules] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [editingRule, setEditingRule] = useState(null);
// //   const [activeTab, setActiveTab] = useState('canvas'); // 'canvas' or 'text'

// //   useEffect(() => {
// //     fetchRules();
// //   }, []);

// //   const fetchRules = async () => {
// //     try {
// //       const response = await api.get('/rules');
// //       if (Array.isArray(response.data)) {
// //         setRules(response.data);
// //       } else {
// //         console.error('Rules data is not an array:', response.data);
// //         setError('Failed to fetch rules. Invalid data format.');
// //       }
// //     } catch (err) {
// //       console.error('Error fetching rules:', err);
// //       setError('Failed to fetch rules.');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const toggleRuleActive = async (rule_id, currentStatus) => {
// //     // Optimistically update the rule's active status in the state
// //     setRules((prevRules) =>
// //       prevRules.map((rule) =>
// //         rule.rule_id === rule_id ? { ...rule, active: !currentStatus } : rule
// //       )
// //     );

// //     try {
// //       // Send the PATCH request to the backend to persist the change
// //       await api.patch(`/rules/${rule_id}/toggle`, {
// //         active: !currentStatus,
// //       });
// //     } catch (err) {
// //       console.error('Error toggling rule status:', err);
// //       alert('Failed to toggle rule status.');

// //       // Revert the state if the request fails
// //       setRules((prevRules) =>
// //         prevRules.map((rule) =>
// //           rule.rule_id === rule_id ? { ...rule, active: currentStatus } : rule
// //         )
// //       );
// //     }
// //   };

// //   const handleRuleCreated = (newRule) => {
// //     setRules((prevRules) => [...prevRules, newRule]);
// //   };

// //   const handleRuleUpdated = (updatedRule) => {
// //     setRules((prevRules) =>
// //       prevRules.map((rule) =>
// //         rule.rule_id === updatedRule.rule_id ? updatedRule : rule
// //       )
// //     );
// //     setEditingRule(null); // Close the edit modal
// //   };

// //   const handleEditRule = (rule) => {
// //     setEditingRule(rule);
// //   };

// //   const handleTabSwitch = (tab) => {
// //     setActiveTab(tab);
// //   };

// //   const handleDeleteRule = async (rule_id) => {
// //     const confirmed = window.confirm('Are you sure you want to delete this rule?');
// //     if (!confirmed) return;

// //     try {
// //       await api.delete(`/rules/${rule_id}`);
// //       setRules((prevRules) => prevRules.filter((rule) => rule.rule_id !== rule_id));
// //       alert('Rule deleted successfully!');
// //     } catch (err) {
// //       console.error('Error deleting rule:', err);
// //       alert('Failed to delete rule.');
// //     }
// //   };

// //   return (
// //     <ErrorBoundary>
//       // <div
//       //   ref={mainRef}
//       //   className="container mx-auto p-6 bg-gray-900 min-h-screen relative overflow-x-hidden pt-20 text-gray-200"
//       // >
//       //   {/* Main Heading */}
//       //   <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-white">
//       //     Admin Portal - Rule Management
//       //   </h1>

//       //   {/* Tab Buttons */}
//       //   <div className="flex justify-center mb-6 space-x-2">
//       //     <button
//       //       ref={(el) => (tabButtonRefs.current[0] = el)}
//       //       onClick={() => handleTabSwitch('canvas')}
//       //       className={`px-6 py-2 rounded-l-full ${
//       //         activeTab === 'canvas'
//       //           ? 'bg-blue-600 text-white'
//       //           : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//       //       } transition duration-300`}
//       //     >
//       //       Use Interactive Canvas
//       //     </button>
//       //     <button
//       //       ref={(el) => (tabButtonRefs.current[1] = el)}
//       //       onClick={() => handleTabSwitch('text')}
//       //       className={`px-6 py-2 rounded-r-full ${
//       //         activeTab === 'text'
//       //           ? 'bg-blue-600 text-white'
//       //           : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//       //       } transition duration-300`}
//       //     >
//       //       Use Text-Based Input
//       //     </button>
//       //   </div>

// //         {/* Tab Content */}
// //         <div className="mb-8">
// //           {activeTab === 'canvas' ? (
// //             <InteractiveCanvas onRuleCreated={handleRuleCreated} />
// //           ) : (
// //             <TextBasedEditor onRuleCreated={handleRuleCreated} />
// //           )}
// //         </div>

// //         {/* Existing Rules Section */}
// //         <h2 className="text-2xl font-semibold mb-4 text-center text-white">Existing Rules</h2>

// //         {isLoading ? (
// //           <p className="text-center text-gray-400">Loading rules...</p>
// //         ) : error ? (
// //           <p className="text-center text-red-500">{error}</p>
// //         ) : rules.length === 0 ? (
// //           <p className="text-center text-gray-400">No rules found.</p>
// //         ) : (
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {rules.map((rule, index) => (
// //               <div
// //                 key={rule.rule_id}
// //                 ref={(el) => (ruleCardRefs.current[index] = el)}
// //                 className="p-6 bg-gray-800 rounded-lg shadow-md flex flex-col justify-between"
// //               >
// //                 <div>
// //                   <p className="text-gray-300 mb-2">
// //                     <span className="font-semibold text-white">Rule:</span> {rule.ruleString}
// //                   </p>
// //                   <p className="text-gray-500 text-sm">
// //                     <span className="font-semibold text-white">Created At:</span>{' '}
// //                     {new Date(rule.created_at).toLocaleString()}
// //                   </p>
// //                 </div>
// //                 <div className="mt-4 flex items-center justify-between">
// //                   {/* Toggle Button */}
// //                   <label className="relative inline-flex items-center cursor-pointer">
// //                     <input
// //                       type="checkbox"
// //                       checked={rule.active}
// //                       onChange={() => toggleRuleActive(rule.rule_id, rule.active)}
// //                       className="sr-only"
// //                     />
// //                     <div
// //                       className={`w-11 h-6 rounded-full transition-all ${
// //                         rule.active ? 'bg-green-500' : 'bg-gray-600'
// //                       }`}
// //                     >
// //                       <div
// //                         className={`absolute w-5 h-5 bg-white rounded-full transition-transform transform ${
// //                           rule.active ? 'translate-x-5' : 'translate-x-0'
// //                         }`}
// //                       />
// //                     </div>
// //                     <span className="ml-3 text-sm font-medium text-gray-300">
// //                       {rule.active ? 'Active' : 'Inactive'}
// //                     </span>
// //                   </label>

// //                   {/* Action Buttons */}
// //                   <div className="flex space-x-2">
// //                     <button
// //                       onClick={() => handleEditRule(rule)}
// //                       className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
// //                     >
// //                       Edit
// //                     </button>
// //                     <button
// //                       onClick={() => handleDeleteRule(rule.rule_id)}
// //                       className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
// //                     >
// //                       Delete
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}

// //         {/* Edit Rule Modal */}
// //         {editingRule && (
// //           <EditRuleModal
// //             rule={editingRule}
// //             onClose={() => setEditingRule(null)}
// //             onRuleUpdated={handleRuleUpdated}
// //           />
// //         )}

// //         {/* Decorative Circle */}
// //         <div
// //           className="fixed top-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full filter blur-3xl opacity-20 z-0"
// //           style={{ transform: 'translate(-50%, -50%)' }}
// //         ></div>
// //       </div>
// //     </ErrorBoundary>
// //   );
// // };

// // export default AdminPage;































import React, { useEffect, useState } from 'react';
import AttributeButton from '../components/Admin/AttributeButton';
import OperatorButton from '../components/Admin/OperatorButton';
import InteractiveCanvas from '../components/Admin/InteractiveCanvas';
import TextBasedEditor from '../components/Admin/TextBasedEditor';
import EditRuleModal from '../components/Admin/EditRuleModal';
import api from '../api';
import ErrorBoundary from '../components/Shared/ErrorBoundary';

const AdminPage = () => {
  const [rules, setRules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingRule, setEditingRule] = useState(null);
  const [activeTab, setActiveTab] = useState('canvas'); // 'canvas' or 'text'
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetchRules();
    // Check for user's system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      }
    }

    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setIsDarkMode(e.matches);
      if (e.matches) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    };
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const fetchRules = async () => {
    try {
      const response = await api.get('/rules');
      if (Array.isArray(response.data)) {
        setRules(response.data);
      } else {
        console.error('Rules data is not an array:', response.data);
        setError('Failed to fetch rules. Invalid data format.');
      }
    } catch (err) {
      console.error('Error fetching rules:', err);
      setError('Failed to fetch rules.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRuleActive = async (rule_id, currentStatus) => {
    // Optimistically update the rule's active status in the state
    setRules((prevRules) =>
      prevRules.map((rule) =>
        rule.rule_id === rule_id ? { ...rule, active: !currentStatus } : rule
      )
    );

    try {
      // Send the PATCH request to the backend to persist the change
      await api.patch(`/rules/${rule_id}/toggle`, {
        active: !currentStatus,
      });
    } catch (err) {
      console.error('Error toggling rule status:', err);
      alert('Failed to toggle rule status.');

      // Revert the state if the request fails
      setRules((prevRules) =>
        prevRules.map((rule) =>
          rule.rule_id === rule_id ? { ...rule, active: currentStatus } : rule
        )
      );
    }
  };

  const handleRuleCreated = (newRule) => {
    setRules((prevRules) => [...prevRules, newRule]);
  };

  const handleRuleUpdated = (updatedRule) => {
    setRules((prevRules) =>
      prevRules.map((rule) =>
        rule.rule_id === updatedRule.rule_id ? updatedRule : rule
      )
    );
    setEditingRule(null); // Close the edit modal
  };

  const handleEditRule = (rule) => {
    setEditingRule(rule);
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  const handleDeleteRule = async (rule_id) => {
    const confirmed = window.confirm('Are you sure you want to delete this rule?');
    if (!confirmed) return;

    try {
      await api.delete(`/rules/${rule_id}`);
      setRules((prevRules) => prevRules.filter((rule) => rule.rule_id !== rule_id));
      alert('Rule deleted successfully!');
    } catch (err) {
      console.error('Error deleting rule:', err);
      alert('Failed to delete rule.');
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  return (
    <ErrorBoundary>
      <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300`}>
        {/* Static Header */}
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="container mt-14 mx-auto px-4 py-4 flex items-center">
            {/* Left Spacer */}
            <div className="flex-1"></div>

            {/* Centered Title */}
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
              Admin Portal - Rule Management
            </h1>

            {/* Dark Mode Toggle */}
            <div className="flex-1 flex justify-end">
              <button
                onClick={toggleDarkMode}
                className="flex items-center bg-gray-200 dark:bg-gray-700 p-2 rounded-full focus:outline-none"
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? (
                  // Sun Icon for Light Mode
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.02 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z"
                    />
                  </svg>
                ) : (
                  // Moon Icon for Dark Mode
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">

{/* Enhanced Tab Buttons */}
<div className="flex justify-center mb-6 space-x-4">
  <button
    onClick={() => handleTabSwitch('canvas')}
    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ease-in-out focus:outline-none ${
      activeTab === 'canvas'
        ? 'bg-blue-600 text-white shadow-lg transform scale-105'
        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
    }`}
  >
    Interactive Canvas
  </button>
  
  <button
    onClick={() => handleTabSwitch('text')}
    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ease-in-out focus:outline-none ${
      activeTab === 'text'
        ? 'bg-blue-600 text-white shadow-lg transform scale-105'
        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
    }`}
  >
    Text-Based Input
  </button>
</div>

          {/* Content Based on Active Tab */}
          <div className="mb-8">
            {activeTab === 'canvas' ? (
              <InteractiveCanvas onRuleCreated={handleRuleCreated} />
            ) : (
              <TextBasedEditor onRuleCreated={handleRuleCreated} />
            )}
          </div>

          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Existing Rules</h2>

          {isLoading ? (
            <p className="text-gray-700 dark:text-gray-300">Loading rules...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : rules.length === 0 ? (
            <p className="text-gray-700 dark:text-gray-300">No rules found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rules.map((rule) => (
                <div
                  key={rule.rule_id}
                  className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col justify-between transition-colors duration-300"
                >
                  <div>
                    <p className="text-gray-800 dark:text-gray-200 mb-2">
                      <span className="font-semibold">Rule:</span> {rule.ruleString}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      <span className="font-semibold">Created At:</span>{' '}
                      {new Date(rule.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    {/* Toggle Button */}
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={rule.active}
                          onChange={() => toggleRuleActive(rule.rule_id, rule.active)}
                          className="sr-only"
                        />
                        <div className="w-10 h-4 bg-gray-400 dark:bg-gray-600 rounded-full shadow-inner"></div>
                        <div
                          className={`dot absolute w-6 h-6 bg-white dark:bg-gray-800 rounded-full shadow -left-1 -top-1 transition ${
                            rule.active
                              ? 'transform translate-x-full bg-green-500 dark:bg-green-600'
                              : ''
                          }`}
                        ></div>
                      </div>
                      <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                        {rule.active ? 'Active' : 'Inactive'}
                      </span>
                    </label>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditRule(rule)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteRule(rule.rule_id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Edit Rule Modal */}
          {editingRule && (
            <EditRuleModal
              rule={editingRule}
              onClose={() => setEditingRule(null)}
              onRuleUpdated={handleRuleUpdated}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 py-4 mt-auto">
          <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
};

export default AdminPage;





