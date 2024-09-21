"use client"

import * as React from 'react'
import Slider from '@mui/material/Slider'
import Switch from '@mui/material/Switch'
import { UpdateParam } from './MotorControl'

function asPercentage(value: number):string{
    return Math.round(value * 1000) / 10 + "%"
}

// NOSTOP
export function ClientNoStopSwitch (props: any){
    const [value, setValue] = React.useState<number>(props.initialState);
    return (
        <Switch 
            onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                setValue(value)        
                UpdateParam(props.motorNumber, 'NOSTOP', checked)
            }}
        /> 
    )
}

// STOPDUTY
export function ClientMotorOffSpeedSlider (props: any){
    const [value, setValue] = React.useState<number>(props.initialState);
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

//STARTDUTY
export function ClientMotorStartDutySlider (props: any){
    const [value, setValue] = React.useState<number>(props.initialState);
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

// CHANGEDUTY
export function ClientMotorChangeDutySlider (props: any){
    const [value, setValue] = React.useState<number>(props.initialState);
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

// MAXDUTY
export function ClientMotorMaxDutySlider (props: any){
    const [value, setValue] = React.useState<number>(props.initialState);
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

// STARTRPM
export function ClientMotorStartRPMSlider (props: any){
    const [value, setValue] = React.useState<number>(props.initialState);
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

export function ClientMaxDutyHysteresisSlider (props: any){
    const [value, setValue] = React.useState<number>(props.initialState);
    return (
        <Slider 
            valueLabelDisplay='auto' 
            value={value}
            min={0} 
            max={15}
            step={1}
            onChange={(event: Event, newValue: number | number[]) => {
                if (typeof newValue === 'number'){
                    setValue(newValue)
                    UpdateParam(props.motorNumber, 'MAXDUTYHYS', newValue)
                }
            }}
        /> 
    )
}

// SPEEDSLOP
export function ClientMotorSpeedSlopeSlider (props: any){
    const [value, setValue] = React.useState<number>(props.initialState);
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

// MAXOPEN
export function ClientMaxOpenSwitch (props: any){
    const [value, setValue] = React.useState<number>(props.initialState);
    return (
        <Switch 
            onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                setValue(value)        
                UpdateParam(props.motorNumber, 'MAXOPEN', checked)
            }}
        /> 
    )
}

// MAXOFF
export function ClientMaxOffSwitch (props: any){
    const [value, setValue] = React.useState<number>(props.initialState);
    return (
        <Switch 
            onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                setValue(value)
                UpdateParam(props.motorNumber, 'MAXOFF', checked)
            }}
        /> 
    )
}

// SPEEDSLOP2
export function ClientMotorSpeedSlope2Slider (props: any){
    const [value, setValue] = React.useState<number>(props.initialState);
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
                    UpdateParam(props.motorNumber, 'SPEEDSLOP2', newValue)
                }
            }}
            valueLabelFormat={(value: number) => {
                return Math.round(value * 100) / 100 + " RPM per Duty %"
            }}
        /> 
    )
}

// VCP_MASK
export function ClientChargePumpStateMonitoringSwitch (props: any){
    const [value, setValue] = React.useState<number>(props.initialState);
    return (
        <Switch 
            onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                setValue(value)
                UpdateParam(props.motorNumber, 'VCP_MASK', checked)
            }}
        /> 
    )
}

// VCP_MASK
export function ClientOpenLoopSwitch (props: any){
    const [value, setValue] = React.useState<number>(props.initialState);
    return (
        <Switch 
            onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                setValue(value)
                UpdateParam(props.motorNumber, 'OPENLOOP', checked)
            }}
        /> 
    )
}

// KIX
export function ClientKIXSwitch (props: any){
    const [value, setValue] = React.useState<number>(props.initialState);
    return (
        <Switch 
            onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                setValue(value)
                UpdateParam(props.motorNumber, 'KIX', checked)
            }}
        /> 
    )
}

// KI
export function ClientKISlider (props: any){
    const [value, setValue] = React.useState<number>(props.initialState);

    return (
        <Slider 
            valueLabelDisplay='auto' 
            value={value}
            min={0} 
            max={127}
            step={1}
            scale={(value: number) => { return value * 0.08 }}
            onChange={(event: Event, newValue: number | number[]) => {
                if (typeof newValue === 'number'){
                    setValue(newValue)
                    UpdateParam(props.motorNumber, 'KI', newValue)
                }
            }}
        /> 
    )
}

// KPX
export function ClientKPXSwitch (props: any){
    const [value, setValue] = React.useState<number>(props.initialState);
    return (
        <Switch 
            onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                setValue(value)
                UpdateParam(props.motorNumber, 'KPX', checked)
            }}
        /> 
    )
}

// KP
export function ClientKPSlider (props: any){
    const [value, setValue] = React.useState<number>(props.initialState);
    return (
        <Slider 
            valueLabelDisplay='auto' 
            value={value}
            min={0} 
            max={127}
            step={1}
            scale={(value: number) => { return value * 0.08 }}
            onChange={(event: Event, newValue: number | number[]) => {
                if (typeof newValue === 'number'){
                    setValue(newValue)
                    UpdateParam(props.motorNumber, 'KP', newValue)
                }
            }}
        /> 
    )
}

// STBY_MODE
export function ClientStandbyModeSwitch (props: any){
    const [value, setValue] = React.useState<number>(props.initialState);
    return (
        <Switch 
            onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                setValue(value)
                UpdateParam(props.motorNumber, 'STBY_MODE', checked)
            }}
        /> 
    )
}

// DIR
export function ClientDirectionSwitch (props: any){
    const [value, setValue] = React.useState<number>(props.initialState);
    return (
        <Switch 
            onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                setValue(value)
                UpdateParam(props.motorNumber, 'DIR', checked)
            }}
        /> 
    )
}

// POLEPAIR
export function ClientPolesSlider (props: any){
    const [value, setValue] = React.useState<number>(props.initialState);
    return (
        <Slider 
            valueLabelDisplay='auto' 
            value={value}
            min={0} 
            max={7}
            step={1}
            scale={(value: number) => { return value * 0.08 }}
            onChange={(event: Event, newValue: number | number[]) => {
                if (typeof newValue === 'number'){
                    setValue(newValue)
                    UpdateParam(props.motorNumber, 'POLEPAIR', newValue)
                }
            }}
            valueLabelFormat={(value: number) => {
                return (value + 1) * 2 + " Pole Motor"
            }}
        /> 
    )
}

// MAXSPEED
export function ClientMaxSpeedSlider (props: any){
    const [value, setValue] = React.useState<number>(props.initialState);
    return (
        <Slider 
            valueLabelDisplay='auto' 
            value={value}
            min={0} 
            max={3}
            step={1}
            scale={(value: number) => { return value * 0.08 }}
            onChange={(event: Event, newValue: number | number[]) => {
                if (typeof newValue === 'number'){
                    setValue(newValue)
                    UpdateParam(props.motorNumber, 'MAXSPEED', newValue)
                }
            }}
            valueLabelFormat={(value: number) => {
                const speedList = [4096, 8192, 16384, 32768]
                return speedList[value] + " RPM"
            }}
        /> 
    )
}

// FG_ON
export function ClientSpeedOutputModeSwitch (props: any){
    const [value, setValue] = React.useState<number>(props.initialState);
    return (
        <Switch 
            onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                setValue(value)
                UpdateParam(props.motorNumber, 'FG_ON', checked)
            }}
        /> 
    )
}

// TSPSEL
export function ClientSpeedInputModeSwitch (props: any){
    const [value, setValue] = React.useState<number>(props.initialState);
    return (
        <Switch 
            onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                setValue(value)
                UpdateParam(props.motorNumber, 'TSPSEL', checked)
            }}
        /> 
    )
}

// SPDINV
export function ClientSpeedInputInversionSwitch (props: any){
    const [value, setValue] = React.useState<number>(props.initialState);
    return (
        <Switch 
            onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                setValue(value)
                UpdateParam(props.motorNumber, 'SPDINV', checked)
            }}
        /> 
    )
}

// LATCH
export function ClientErrorLatchSwitch (props: any){
    const [value, setValue] = React.useState<number>(props.initialState);
    return (
        <Switch 
            onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                setValue(value)
                UpdateParam(props.motorNumber, 'LATCH', checked)
            }}
        /> 
    )
}

// OCPMASK
export function ClientDigitalFilteringSlider (props: any){
    const [value, setValue] = React.useState<number>(props.initialState);
    return (
        <Slider 
            valueLabelDisplay='auto' 
            value={value}
            min={0} 
            max={3}
            step={1}
            scale={(value: number) => { return value * 0.08 }}
            onChange={(event: Event, newValue: number | number[]) => {
                if (typeof newValue === 'number'){
                    setValue(newValue)
                    UpdateParam(props.motorNumber, 'OCPMASK', newValue)
                }
            }}
            valueLabelFormat={(value: number) => {
                const speedList = ['OCP: none, ISD: 83ns', 'OCP: 500ns, ISD: 583ns', 'OCP: 666ns, ISD: 750ns', 'OCP: 750ns, ISD: 833ns']
                return speedList[value]
            }}
        /> 
    )
}

// LOCKDIS
export function ClientForceForcedComutationSwitch (props: any){
    const [value, setValue] = React.useState<number>(props.initialState)
    return (
        <Switch 
            onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                setValue(value)
                UpdateParam(props.motorNumber, 'LOCKDIS', checked)
            }}
        /> 
    )
}


// SPD
export function ClientMotorSpeedSlider (props: any){ 
    const [value, setValue] = React.useState<number>(props.initialState);

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
