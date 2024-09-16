"use client"

import * as React from 'react'
import Slider from '@mui/material/Slider'
import { UpdateParam } from './MotorControl'

function asPercentage(value: number):string{
    return Math.round(value * 1000) / 10 + "%"
}

export function ClientMotorSpeedSlider (props: any){
    const [value, setValue] = React.useState<number>(10);

    return (
        <Slider 
            valueLabelDisplay='auto' 
            value={value}
            min={0} 
            max={511}
            step={1}
            scale={(value: number) => { return value }}
            onChange={(event: Event, newValue: number | number[]) => {
                if (typeof newValue === 'number'){
                    setValue(newValue)
                    UpdateParam(props.motorNumber, 'SPD', newValue)
                }
            }}
        /> 
    )
}

export function ClientMotorOffSpeedSlider (props: any){
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
                    UpdateParam(props.motorNumber, 'STOPDUTY', newValue)
                }
            }}
            valueLabelFormat={asPercentage}
        /> 
    )
}

export function ClientMotorStartDutySlider (props: any){
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
                    UpdateParam(props.motorNumber, 'STARTDUTY', newValue)
                }
            }}
            valueLabelFormat={asPercentage}
        /> 
    )
}

export function ClientMotorStartRPMSlider (props: any){
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
                    UpdateParam(props.motorNumber, 'STARTRPM', newValue)
                }
            }}
        /> 
    )
}

export function ClientMotorSpeedSlopeSlider (props: any){
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
                    UpdateParam(props.motorNumber, 'SPEEDSLOP', newValue)
                }
            }}
            valueLabelFormat={(value: number) => {
                return Math.round(value * 100) / 100 + " RPM per Duty %"
            }}
        /> 
    )
}

export function ClientMotorMaxDutySlider (props: any){
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
                    UpdateParam(props.motorNumber, 'MAXDUTY', newValue)
                }
            }}
            valueLabelFormat={asPercentage}
        /> 
    )
}

export function ClientMotorChangeDutySlider (props: any){
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
                    UpdateParam(props.motorNumber, 'CHANGEDUTY', newValue)
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