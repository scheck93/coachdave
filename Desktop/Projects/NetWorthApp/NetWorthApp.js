import React, { useState, useRef, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import NetWorth from './components/NetWorth';
import FinancialItem from './components/FinancialItem';
import AddAssetForm from './components/AddAssetForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [showAddAssetForm, setShowAddAssetForm] = useState(false);
  const dropdownRef = useRef(null);

  const handleShowAddOptions = () => setShowAddOptions(!showAddOptions);

  const handleAddAsset = () => {
    setShowAddOptions(false);
    setShowAddAssetForm(true);
  };

  const handleAddLiability = () => {
    console.log('Add liability clicked');
    setShowAddOptions(false);
  };

  const handleCloseAddAssetForm = () => {
    setShowAddAssetForm(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAddOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <Container className="px-3 px-md-4 px-lg-5">
        <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
          <h2 className="greeting fs-4 fw-normal">Good evening, Garet!</h2>
          <div className="position-relative" ref={dropdownRef}>
            <button 
              className="add-button btn btn-light rounded-circle p-0" 
              style={{width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
              onClick={handleShowAddOptions}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4V20M4 12H20" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            {showAddOptions && (
              <div className="add-options-dropdown">
                <button className="dropdown-item" onClick={handleAddAsset}>Add asset</button>
                <button className="dropdown-item" onClick={handleAddLiability}>Add liability</button>
              </div>
            )}
          </div>
        </div>
        <NetWorth />
        <FinancialItem 
          title="Total Debt/Liabilities" 
          amount={20000} 
          lastUpdated="June 8th"
        />
        <FinancialItem 
          title="Total Assets/Income" 
          amount={9044.21} 
          lastUpdated="June 23rd"
        />
      </Container>
      {showAddAssetForm && <AddAssetForm onClose={handleCloseAddAssetForm} />}
    </div>
  );
}

export default App;