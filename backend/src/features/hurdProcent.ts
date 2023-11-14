/**
 * @principal Начальный капитал
 * @rate Годовая процентная ставка (в десятичных долях)
 * @time Время в годах
 * @frequency Частота начисления процентов в год (например, 1 для ежегодного, 12 для месячного)
 */

export interface ICompoundInterestInput {
    principal: number
    rate: number
    time: number
    frequency: number
}

/**
 * @futureValue Будущая стоимость
 */
export interface ICompoundInterestResult {
    futureValue: number;
}

/**
 * Пример использования
 * 
 * const calculator = new CompoundInterestCalculator();
 * const input: ICompoundInterestInput = {
 *   principal: 10000,
 *   rate: 0.05,
 *   time: 3,
 *   frequency: 1,
 * };

 * const result: ICompoundInterestResult = calculator.calculateCompoundInterest(input);
 * console.log(`Будущая стоимость: $${result.futureValue.toFixed(2)}`);
 */
export class CompoundInterestCalculator {
    calculateCompoundInterest(input: ICompoundInterestInput): ICompoundInterestResult {
        const { principal, rate, time, frequency } = input;
        const n = frequency;
        const t = time;

        const futureValue = principal * Math.pow(1 + rate / n, n * t);
        return { futureValue };
    }
}