// pages/index.js

export async function getServerSideProps() {
  try {
    const ratesResponse = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=USD');
    if (!ratesResponse.ok) {
      throw new Error(`Error: ${ratesResponse.status} ${ratesResponse.statusText}`);
    }

    const ratesData = await ratesResponse.json();
    const eurResponse = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=EUR');
    if (!eurResponse.ok) {
      throw new Error(`Error: ${eurResponse.status} ${eurResponse.statusText}`);
    }

    const eurData = await eurResponse.json();
    const usdToEurRate = eurData.data.rates['USD'];

    const cryptoRatesInEur = {};
    for (const [currency, rate] of Object.entries(ratesData.data.rates)) {
      cryptoRatesInEur[currency] = (rate * usdToEurRate).toFixed(4);
    }

    return {
      props: {
        rates: cryptoRatesInEur,
      },
    };
  } catch (error) {
    return {
      props: {
        error: error.message,
      },
    };
  }
}

const HomePage = ({ rates, error }) => {
  return (
    <div className="container">
      <h1>Crypto Exchange Rates (EUR)</h1>
      {error && <div className="error">Error: {error}</div>}
      <ul className="rates-list">
        {Object.entries(rates).map(([currency, rate]) => (
          <li key={currency} className="rate-item">
            <img
              src={`/icons/${currency.toLowerCase()}.svg`} // Adjust icon filenames if necessary
              alt={`${currency} icon`}
              className="icon"
            />
            <span className="currency">{currency}/EUR:</span>
            <span className="value">{rate}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
