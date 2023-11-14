import axios from 'axios';

const API_KEY: string = '68ccaacb0e175f7ac7500bc6ec1b59cf' as string;
/**
 * Пример использования
 * const api = new CurrencyExchangeAPI('http://data.fixer.io');
 * const baseCurrency = 'USD';
 * const targetCurrencies = ['EUR', 'GBP', 'JPY'];
 
 * api.getCurrencyRates(baseCurrency, targetCurrencies).then(data => {console.log(data);}).catch(error => {console.error(error);});
*/
export class CurrencyExchangeAPI {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async getCurrencyRates(baseCurrency: string, targetCurrencies: string[]): Promise<any> {
    const url = `${this.apiUrl}/api/latest?access_key=${API_KEY}&base=${baseCurrency}&symbols=${targetCurrencies.join(',')}`//`;
    console.log(url);
    
    try {
      const response = await axios({
        method: 'GET',
        url: url,
      })      

      return response.data;
    } catch (error: any) {
      throw new Error(`Ошибка при получении данных о курсах валют: ${error.message}`);
    }
  }
}

