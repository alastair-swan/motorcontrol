export function asPercentage(value: number, decimal?: number):string{
    if (typeof(decimal) === 'undefined'){
        return Math.round(value * 1000) / 10 + "%"
    }
    else{
        return (Math.round(value * 1000) / 10).toFixed(decimal) + "%"
    }
}

export const shuntResistor = 0.025