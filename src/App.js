import React, { useState } from 'react';

function App() {
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [transactionHash, setTransactionHash] = useState('');

  const createAccount = async () => {
    if (window.ethereum) {
      try {
        const newAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('New account created:', newAccounts[0]);
        setAccounts(newAccounts);
      } catch (error) {
        console.error('Error creating account:', error);
      }
    } else {
      console.error('MetaMask not installed');
    }
  };

  const sendTransaction = async () => {
    if (window.ethereum) {
      try {
        const newAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        const hash = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: newAccounts[0],
              to: toAddress,
              value: amount,
            },
          ],
        });
        console.log('Transaction sent. Transaction hash:', hash);
        setAccounts(newAccounts);
        setTransactionHash(hash);
      } catch (error) {
        console.error('Error sending transaction:', error);
      }
    } else {
      console.error('MetaMask not installed');
    }
  };

  const viewTransaction = () => {
    if (transactionHash) {
      window.open(`https://goerli.etherscan.io/${transactionHash}`, '_blank');
    } else {
      console.warn('No transaction hash available. Please send a transaction first.');
    }
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: 'auto',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#fff',
      }}
    >
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>MetaMask Interaction Test</h1>

      <button
        style={{
          backgroundColor: '#3498db',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
        onClick={createAccount}
      >
        Create Account
      </button>

      {accounts.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Logged-in Account:</h3>
          <p style={{ fontSize: '16px', marginBottom: '10px' }}>{accounts[0]}</p>
        </div>
      )}

      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Send Transaction</h2>
      <label htmlFor="toAddress" style={{ display: 'block', marginBottom: '10px' }}>
        To Address:
      </label>
      <input
        type="text"
        id="toAddress"
        placeholder="Enter recipient address"
        style={{
          border: '1px solid #ccc',
          borderRadius: '5px',
          padding: '8px',
          marginBottom: '15px',
          width: '100%',
        }}
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
      />

      <label htmlFor="amount" style={{ display: 'block', marginBottom: '10px' }}>
        Amount (in Wei):
      </label>
      <input
        type="text"
        id="amount"
        placeholder="Enter amount in Wei"
        style={{
          border: '1px solid #ccc',
          borderRadius: '5px',
          padding: '8px',
          marginBottom: '15px',
          width: '100%',
        }}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        style={{
          backgroundColor: '#2ecc71',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          marginRight: '10px',
        }}
        onClick={sendTransaction}
      >
        Send Transaction
      </button>
      <button
        style={{
          backgroundColor: '#7f8c8d',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={viewTransaction}
      >
        View Transaction
      </button>
    </div>
  );
}

export default App;
