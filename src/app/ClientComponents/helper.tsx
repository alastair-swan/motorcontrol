export function asPercentage(value: number):string{
    return Math.round(value * 1000) / 10 + "%"
}

export const shuntResistor = 0.025