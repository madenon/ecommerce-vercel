const displayCurrency = (num) => {
  // const currency = "  FCFA";

  // return currency;
const formatter = new Intl.NumberFormat('de-De', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }); 
  return formatter.format(num)
};

export default displayCurrency;


