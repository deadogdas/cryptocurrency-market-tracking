import { Card } from 'antd';

function CryptocurrencyCard(props) {

  const{ currency } = props
  const price =Math.round(currency.quote.USD.price)
  const cap = Math.round(currency.quote.USD.market_cap)

  return  (
  <Card 
  title={
    <div className='flex item-centre gap-3 '>
      <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`}/>
      <span>{currency.name}</span>
    </div>
  }
  style={{ width: 350 }}>
      <p>Текущая цена:{price}$</p>
      <p>Текущая капитализация:{cap}$</p>
  </Card>
  )
}

export default CryptocurrencyCard;
