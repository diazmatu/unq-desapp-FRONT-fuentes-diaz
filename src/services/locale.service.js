const locale = localStorage.getItem("locale")

const dateLocale = (date) => {
    return new Intl.DateTimeFormat(locale).format(date);
}

const numLocale = (number) => {
    return new Intl.NumberFormat('locale', {minimumFractionDigits: 5} ).format(number);
}

const currencyLocale = (number) => {

    var result
    switch (locale) {
        case 'en-US':
            result = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
            break;
        case 'es-ES':
            result = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'ARS' }).format(number);
            break;
        default:
            //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
            break;
      }
    return result
}

const localeService = {
    dateLocale,
    numLocale,
    currencyLocale
  };
  
  export default localeService