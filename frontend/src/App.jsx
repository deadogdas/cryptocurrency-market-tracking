import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import CryptocurrencyCard from './components/CryptocurrencyCard';

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [currencyId, setCurrencyId] = useState(null);
  const [currencyData, setCurrencyData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCurrencies = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/crypto_currencies');
      const currenciesResponse = response.data;
      
      const menuItems = [
        {
          key: 'g1',
          label: 'Список криптовалют',
          type: 'group',
          children: currenciesResponse.map(c => ({
            label: c.name, 
            key: c.id.toString() 
          }))
        }
      ];
      
      setCurrencies(menuItems);
      
      if (currenciesResponse.length > 0 && !currencyId) {
        setCurrencyId(currenciesResponse[0].id.toString());
      }
    } catch (error) {
      console.error('Error fetching currencies:', error);
    }
  };

  const fetchCurrency = async () => {
    if (!currencyId) return;
    
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/crypto_currencies/${currencyId}`);
      setCurrencyData(response.data);
    } catch (error) {
      console.error('Error fetching currency data:', error);
      setCurrencyData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    fetchCurrency();
  }, [currencyId]);

  const onClick = (e) => {
    setCurrencyId(e.key);
  };

  return (
    <div className='flex'>
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={currencyId ? [currencyId] : []}
        mode="inline"
        items={currencies}
        className='h-screen overflow-auto'
      />
      <div className='mx-auto my-auto'>
        {loading ? (
          <div>Загрузка...</div>
        ) : currencyData ? (
          <CryptocurrencyCard currency={currencyData}/>
        ) : (
          <div>Выберите криптовалюту</div>
        )}
      </div>
    </div>
  );
};

export default App;