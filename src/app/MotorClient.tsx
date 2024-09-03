"use client"

import * as React from 'react'
import Slider from '@mui/material/Slider'

function asPercentage(value: number):string{
    return Math.round(value * 1000) / 10 + "%"
}

export function ClientMotorOffSpeedSlider (){
    const [value, setValue] = React.useState<number>(10);

    return (
        <Slider 
            valueLabelDisplay='auto' 
            value={value}
            min={0} 
            max={127}
            step={1}
            scale={(value: number) => { return value/256 }}
            onChange={(event: Event, newValue: number | number[]) => {
                if (typeof newValue === 'number'){
                    setValue(newValue)
                }
            }}
            valueLabelFormat={asPercentage}
        /> 
    )
}

export function ClientMotorStartDutySlider (){
    const [value, setValue] = React.useState<number>(10);

    return (
        <Slider 
            valueLabelDisplay='auto' 
            value={value}
            min={0} 
            max={255}
            step={1}
            scale={(value: number) => { return (value/512) }}
            onChange={(event: Event, newValue: number | number[]) => {
                if (typeof newValue === 'number'){
                    setValue(newValue)
                }
            }}
            valueLabelFormat={asPercentage}
        /> 
    )
}

export function ClientMotorStartRPMSlider (){
    const [value, setValue] = React.useState<number>(10);

    return (
        <Slider 
            valueLabelDisplay='auto' 
            value={value}
            min={0} 
            max={4095}
            step={1}
            onChange={(event: Event, newValue: number | number[]) => {
                if (typeof newValue === 'number'){
                    setValue(newValue)
                }
            }}
        /> 
    )
}

export function ClientMotorSpeedSlopeSlider (){
    const [value, setValue] = React.useState<number>(10);

    return (
        <Slider 
            valueLabelDisplay='auto' 
            value={value}
            min={0} 
            max={16383}
            step={1}
            scale={(value: number) => { return value * 0.08 }}
            onChange={(event: Event, newValue: number | number[]) => {
                if (typeof newValue === 'number'){
                    setValue(newValue)
                }
            }}
            valueLabelFormat={(value: number) => {
                return Math.round(value * 100) / 100 + " RPM per Duty %"
            }}
        /> 
    )
}

export function ClientMotorMaxDutySlider (){
    const [value, setValue] = React.useState<number>(10);

    return (
        <Slider 
            valueLabelDisplay='auto' 
            value={value}
            min={0} 
            max={255}
            step={1}
            scale={(value: number) => { return ((value + 257)/512) }}
            onChange={(event: Event, newValue: number | number[]) => {
                if (typeof newValue === 'number'){
                    setValue(newValue)
                }
            }}
            valueLabelFormat={asPercentage}
        /> 
    )
}

export function ClientMotorDutyChangeSlider (){
    const [value, setValue] = React.useState<number>(10);

    return (
        <Slider 
            valueLabelDisplay='auto' 
            value={value}
            min={0} 
            max={255}
            step={1}
            scale={(value: number) => { return ((value * 2)/512) }}
            onChange={(event: Event, newValue: number | number[]) => {
                if (typeof newValue === 'number'){
                    setValue(newValue)
                }
            }}
            valueLabelFormat={(value: number) => {
                if (value != 0) { 
                    return asPercentage(value)
                }
                else { 
                    return "Not Used"
                }
            }}
        /> 
    )
}