import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);

  const addTransaction = () => {
    if (text.trim() === '' || isNaN(amount) || +amount === 0) {
      alert('Please enter valid text and amount.');
      return;
    }

    const newTransaction = {
      id: uuidv4(),
      text,
      amount: +amount,
    };

    setTransactions([...transactions, newTransaction]);
    setText('');
    setAmount(0);
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter((t) => t.id !== id);
    setTransactions(updatedTransactions);
  };

  const total = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

  return (
    <div className="App">
      <h1>Budget Tracker</h1>

      <div className="balance">
        <h2>Your Balance</h2>
        <h3>${total.toFixed(2)}</h3>
      </div>

      <div className="transactions">
        <h2>History</h2>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              <span>{transaction.text}</span>
              <span>{transaction.amount > 0 ? `+${transaction.amount}` : transaction.amount}</span>
              <button onClick={() => deleteTransaction(transaction.id)}>X</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="add-transaction">
        <h2>Add New Transaction</h2>
        <label>
          Text:
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <label>
          Amount:
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <button onClick={addTransaction}>Add Transaction</button>
      </div>
    </div>
  );
}

export default App;
