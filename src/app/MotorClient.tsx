"use client"

import * as React from 'react'
import Slider from '@mui/material/Slider'
import Switch from '@mui/material/Switch'
import { UpdateParam } from './MotorControl'
import { Grid2, Box } from '@mui/material'

export function asPercentage(value: number):string{
    return Math.round(value * 1000) / 10 + "%"
}


export function ChargePumpState({motorNumber}: {motorNumber: number}){
    return (
        "Good"
    )
}
export function TemperatureState({motorNumber}: {motorNumber: number}){
    return (
        "Good"
    )
}

export function CurrentState({motorNumber}: {motorNumber: number}){
    return (
        "Good"
    )
}

export function RotationState({motorNumber}: {motorNumber: number}){
    return (
        "Within Limits"
    )
}

export function StartupState({motorNumber}: {motorNumber: number}){
    return (
        "Successful"
    )
}

// NOSTOP
export function NoStopSwitch ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: boolean, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<boolean>(initialState)
    const switchText = () => {
        if (!value){
            return "Full Speed below StopDuty"
        }
        return "Off below StopDuty"
    }
    return (                                    
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingRight: 2}}>
                <Switch 
                    checked={!value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setValue(!checked)        
                        UpdateParam(motorNumber, 'NOSTOP', checked)
                    }}
                /> 
                {
                    switchText()    
                }
            </Box>
        </Grid2>
    )
}

// STOPDUTY
export function MotorOffSpeedSlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const switchText = () => {
        return value
    }
    const sliderScale = (value: number) => { return value/256 }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Motor Off Input Value: {asPercentage(sliderScale(switchText()))}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={127}
                    step={1}
                    scale={sliderScale}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, 'STOPDUTY', newValue)
                        }
                    }}
                    valueLabelFormat={asPercentage}
                /> 
            </Box>
        </Grid2>
    )
}

//STARTDUTY
export function MotorStartDutySlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const switchText = () => {
        return value
    }
    const sliderScale = (value: number) => { return (value/512) }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Motor Start Input Value: {asPercentage(sliderScale(switchText()))}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={255}
                    step={1}
                    scale={sliderScale}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, 'STARTDUTY', newValue)
                        }
                    }}
                    valueLabelFormat={asPercentage}
                /> 
            </Box>
        </Grid2>
    )
}

// CHANGEDUTY
export function MotorChangeDutySlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const switchText = () => {
        return value
    }
    const sliderScale = (value: number) => { return ((value * 2)/512) }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Motor Slope Inflection Point: {asPercentage(sliderScale(switchText()))}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={255}
                    step={1}
                    scale={sliderScale}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, 'CHANGEDUTY', newValue)
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
            </Box>
        </Grid2>
    )
}

// MAXDUTY
export function MotorMaxDutySlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const switchText = () => {
        return value
    }
    const sliderScale = (value: number) => { return ((value + 257)/512) }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Motor Max Input Value: {asPercentage(sliderScale(switchText()))}
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
                            UpdateParam(motorNumber, 'MAXDUTY', newValue)
                        }
                    }}
                    valueLabelFormat={asPercentage}
                /> 
            </Box>
        </Grid2>
    )
}

// STARTRPM
export function MotorStartRPMSlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const switchText = () => {
        return value
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                RPM At Start Duty: {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={4095}
                    step={1}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, 'STARTRPM', newValue)
                        }
                    }}
                /> 
            </Box>
        </Grid2>
    )
}

export function MaxDutyHysteresisSlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const switchText = () => {
        return value
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Hysteresis at Max Duty: {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={15}
                    step={1}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, 'MAXDUTYHYS', newValue)
                        }
                    }}
                />
            </Box>
        </Grid2>
    )
}

// SPEEDSLOP
export function MotorSpeedSlopeSlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const switchText = () => {
        return value
    }
    const sliderScale = (value: number) => { return value * 0.08 }
    const sliderFormat = (value: number) => {
        return Math.round(value * 100) / 100 + " RPM/%"
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Speed Slope Below Inflection Point: {sliderFormat(sliderScale(switchText()))}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={16383}
                    step={1}
                    scale={sliderScale}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, 'SPEEDSLOP', newValue)
                        }
                    }}
                    valueLabelFormat={sliderFormat}
                /> 
            </Box>
        </Grid2>
    )
}

// MAXOPEN
export function MaxOpenSwitch ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: boolean, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<boolean>(initialState)
    const switchText = () => {
        if (!value){
            return "Speed Capped at Max Duty"
        }
        return "Extrapolate Past Max Duty"
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                <Switch 
                    checked={!value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setValue(!checked)        
                        UpdateParam(motorNumber, 'MAXOPEN', checked)
                    }}
                /> 
                { switchText() }
            </Box>
        </Grid2>
    )
}

// MAXOFF
export function MaxOffSwitch ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: boolean, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<boolean>(initialState)
    const switchText = () => {
        if (!value){
            return "Off above Max Duty"
        }
        return "On above Max Duty"
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                <Switch 
                    checked={!value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setValue(!checked)
                        UpdateParam(motorNumber, 'MAXOFF', checked)
                    }}
                />
                {switchText()}
            </Box>
        </Grid2>
    )
}

// SPEEDSLOP2
export function MotorSpeedSlope2Slider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const switchText = () => {
        return value
    }
    const sliderScale = (value: number) => { return value * 0.08 }
    const sliderFormat = (value: number) => {
        return Math.round(value * 100) / 100 + " RPM/%"
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Speed Slope Above Inflection Point: {sliderFormat(sliderScale(switchText()))}
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
                            UpdateParam(motorNumber, 'SPEEDSLOP2', newValue)
                        }
                    }}
                    valueLabelFormat={(value: number) => {
                        return Math.round(value * 100) / 100 + " RPM per Duty %"
                    }}
                /> 
            </Box>
        </Grid2>
    )
}

// VCP_MASK
export function ChargePumpStateMonitoringSwitch ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: boolean, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<boolean>(initialState)
    const switchText = () => {
        if (value){
            return "Enabled"
        }
        return "Disabled"
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch 
                    checked={!value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setValue(!checked)
                        UpdateParam(motorNumber, 'VCP_MASK', checked)
                    }}
                /> 
                Charge Pump Monitoring: {switchText()}
            </Box>
        </Grid2>
    )
}

// OPENLOOP
export function OpenLoopSwitch ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: boolean, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<boolean>(initialState)
    const switchText = () => {
        if (value){
            return "Open"
        }
        return "Closed"
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                <Switch 
                    checked={!value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setValue(!checked)
                        UpdateParam(motorNumber, 'OPENLOOP', checked)
                    }}
                /> 
                {switchText()} Loop Control
            </Box>
        </Grid2>
    )
}

// KIX
export function KIXSwitch ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: boolean, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<boolean>(initialState)
    const switchText = () => {
        if (!value){
            return "x8"
        }
        return "x1"
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                <Switch 
                    checked={!value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setValue(!checked)
                        UpdateParam(motorNumber, 'KIX', checked)
                    }}
                />
                I coefficient {switchText()} 
            </Box>
        </Grid2>
    )
}

// KI
export function KISlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const sliderScale = (value: number) => { return (value * 0.08) }
    const sliderFormat = (value: number) => {
        return value.toFixed(2)
    }
    const switchText = () => {
        return sliderFormat(sliderScale(value))
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                I coefficient: {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={127}
                    step={1}
                    scale={sliderScale}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, 'KI', newValue)
                        }
                    }}
                    valueLabelFormat={sliderFormat}
                />
            </Box>
        </Grid2>
    )
}

// KPX
export function KPXSwitch ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: boolean, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<boolean>(initialState)
    const switchText = () => {
        if (!value){
            return "x8"
        }
        return "x1"
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    checked={!value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setValue(!checked)
                        UpdateParam(motorNumber, 'KPX', checked)
                    }}
                />
                P coefficient {switchText()}
            </Box>
        </Grid2>
    )
}

// KP
export function KPSlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const sliderScale = (value: number) => { return (value * 0.08) }
    const sliderFormat = (value: number) => {
        return value.toFixed(2)
    }
    const switchText = () => {
        return sliderFormat(sliderScale(value))
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                P coefficient: {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={127}
                    step={1}
                    scale={sliderScale}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, 'KP', newValue)
                        }
                    }}
                    valueLabelFormat={sliderFormat}
                />
            </Box>
        </Grid2>
    )
}

// STBY_MODE
export function StandbyModeSwitch ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: boolean, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<boolean>(initialState)
    const switchText = () => {
        if (!value){
            return "Only Pin Controls Standby"
        }
        return "Standby if motor is off"
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    checked={!value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setValue(!checked)
                        UpdateParam(motorNumber, 'STBY_MODE', checked)
                    }}
                /> 
                {switchText()}
            </Box>
        </Grid2>
    )
}

// DIR
export function DirectionSwitch ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: boolean, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<boolean>(initialState)
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    checked={!value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setValue(!checked)
                        UpdateParam(motorNumber, 'DIR', checked)
                    }}
                />
                Direction
            </Box>
        </Grid2>
    )
}

// POLEPAIR
export function PolesSlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const sliderFormat = (value: number) => {
        return (value + 1) * 2 + " Pole Motor"
    }
    const switchText = () => {
        return sliderFormat(value)
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={7}
                    step={1}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, 'POLEPAIR', newValue)
                        }
                    }}
                    valueLabelFormat={sliderFormat}
                />
            </Box>
        </Grid2>
    )
}

// MAXSPEED
export function MaxSpeedSlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const sliderFormat = (value: number) => {
        const speedList = [4096, 8192, 16384, 32768]
        return speedList[value] + " RPM"
    }
    const switchText = () => {
        return sliderFormat(value)
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Max RPM: {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={3}
                    step={1}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, 'MAXSPEED', newValue)
                        }
                    }}
                    valueLabelFormat={sliderFormat}
                /> 
            </Box>
        </Grid2>
    )
}

// FG_ON
export function SpeedOutputModeSwitch ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: boolean, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<boolean>(initialState)
    const switchText = () => {
        if (!value){
            return "FG stops without speed control command"
        }
        return "FG stops without speed control command"
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    checked={!value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setValue(!checked)
                        UpdateParam(motorNumber, 'FG_ON', checked)
                    }}
                />
                Continue Output when stopped
            </Box>
        </Grid2>
    )
}

// TSPSEL
export function SpeedInputModeSwitch ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: boolean, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<boolean>(initialState)
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    checked={!value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setValue(!checked)
                        UpdateParam(motorNumber, 'TSPSEL', checked)
                    }}
                />
                Analog Speed Control Mode
            </Box>
        </Grid2>
    )
}

// SPDINV
export function SpeedInputInversionSwitch ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: boolean, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<boolean>(initialState);
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    checked={!value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setValue(!checked)
                        UpdateParam(motorNumber, 'SPDINV', checked)
                    }}
                />
                Invert Analog Speed Control
            </Box>
        </Grid2>
    )
}

// LATCH
export function ErrorLatchSwitch ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: boolean, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<boolean>(initialState);
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    checked={!value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setValue(!checked)
                        UpdateParam(motorNumber, 'LATCH', checked)
                    }}
                />
                Latch Error State
            </Box>
        </Grid2>
    )
}

// OCPMASK
export function DigitalFilteringSlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const switchText = () => {
        return value
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Current Sense Digital Filtering: {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={3}
                    step={1}
                    scale={(value: number) => { return value }}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, 'OCPMASK', newValue)
                        }
                    }}
                    valueLabelFormat={(value: number) => {
                        const speedList = ['OCP: none, ISD: 83ns', 'OCP: 500ns, ISD: 583ns', 'OCP: 666ns, ISD: 750ns', 'OCP: 750ns, ISD: 833ns']
                        return speedList[value]
                    }}
                /> 
            </Box>
        </Grid2>
    )
}

// LOCKDIS
export function ForceForcedComutationSwitch ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: boolean, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<boolean>(initialState)
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    checked={!value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setValue(!checked)
                        UpdateParam(motorNumber, 'LOCKDIS', checked)
                    }}
                /> 
                Forced Comutation
            </Box>
        </Grid2>
    )
}

// DUTYCHGLIMIT
export function SpeedChangeLimitSlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const switchText = () => {
        return value
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Motor Speed Change Rate {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={7}
                    step={1}
                    scale={(value: number) => { return (value + 1) % 8 }}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, 'DUTYCHGLIMIT', newValue)
                        }
                    }}
                    valueLabelFormat={(value: number) => {
                        const speedList = ['0.17', '0.20', '0.55', '1.11', '1.84', '2.76', '3.69', '5.53']
                        return speedList[value]
                    }}
                /> 
            </Box>
        </Grid2>
    )
}

// STARTCURRENT
export function StartupCurrentLimitSlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const switchText = () => {
        return value
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Startup Current Limit: {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={7}
                    step={1}
                    scale={(value: number) => { 
                        return (((8 - value) / 8) * VOC) / shuntResistor; 
                    }}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, 'STARTCURRENT', newValue)
                        }
                    }}
                    valueLabelFormat={(value: number) => {
                        return value + "A"
                    }}
                /> 
            </Box>
        </Grid2>
    )
}

// OCPDIS
export function OutputCurrentMonitoringSwitch ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: boolean, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<boolean>(initialState)
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    checked={!value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setValue(!checked)
                        UpdateParam(motorNumber, 'OCPDIS', checked)
                    }}
                />
                Monitor Current
            </Box>
        </Grid2>
    )
}

// SS_ADD_SEL
export function SoftStartCurrentLimitSlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const switchText = () => {
        return value
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Current Limit During Soft Start: {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={3}
                    step={1}
                    scale={(value: number) => {
                        const steps = (index: number) : number => { 
                            const stepValues = [0, 0.3, 0.4, 0.5] as number[]
                            return ((typeof(stepValues[index]) === 'number') ? stepValues[index] : 0) as number
                        }
                        return steps(value) * (VOC / shuntResistor) 
                    }}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, 'SS_ADD_SEL', newValue)
                        }
                    }}
                    valueLabelFormat={(value: number) => {
                        return value + 'A'
                    }}
                /> 
            </Box>
        </Grid2>
    )
}

// SS_UP_SEL
export function SoftStartCurrentStepSizeSlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const switchText = () => {
        return value
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Soft Start Current Step Size: {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={3}
                    step={1}
                    scale={(value: number) => {
                        const steps = (index: number) : number => { 
                            const stepValues = [0.01, 0.02, 0.05, 0.10] as number[]
                            return ((typeof(stepValues[index]) === 'number') ? stepValues[index] : 0) as number
                        }
                        return steps(value) * (VOC / shuntResistor) 
                    }}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, 'SS_UP_SEL', newValue)
                        }
                    }}
                    valueLabelFormat={(value: number) => {
                        return value + 'A'
                    }}
                /> 
            </Box>
        </Grid2>
    )
}

// SS_DUTYCHGLIMIT
export function SoftStartSpeedChangeLimitSlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const switchText = () => {
        return value
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Speed Change Rate during soft start {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={7}
                    step={1}
                    scale={(value: number) => { return (value + 1) % 8 }}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, 'SS_DUTYCHGLIMIT', newValue)
                        }
                    }}
                    valueLabelFormat={(value: number) => {
                        const speedList = ['0.17', '0.20', '0.55', '1.11', '1.84', '2.76', '3.69', '5.53']
                        return speedList[value]
                    }}
                /> 
            </Box>
        </Grid2>
    )
}

// DUTY_UP_TIME
export function DutyUpTimeSwitch ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: boolean, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<boolean>(initialState)
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    checked={!value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setValue(!checked)
                        UpdateParam(motorNumber, 'DUTY_UP_TIME', checked)
                    }}
                />
                Duty Up Time
            </Box>
        </Grid2>
    )
}

// RPMLIMIT
export function RPMLimitSlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const switchText = () => {
        return value
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Motor RPM Limit {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={7}
                    step={1}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, 'RPMLIMIT', newValue)
                        }
                    }}
                    valueLabelFormat={(value: number) => {
                        const speedList = ['unlimited', '512', '2200', '3800', '5400', '7000', '8600', '10240']
                        return speedList[value] + ' RPM'
                    }}
                /> 
            </Box>
        </Grid2>
    )
}

// BRK_INV
export function BrakePolaritySwitch ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: boolean, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<boolean>(initialState)
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    disabled
                    checked={!value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setValue(!checked)
                        UpdateParam(motorNumber, 'BRK_INV', checked)
                    }}
                />
                Brake Pin Inverted Input
            </Box>
        </Grid2>
    )
}

// ISD_MASK
export function OverCurrentDetectionSwitch ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: boolean, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<boolean>(initialState)
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    checked={!value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setValue(!checked)
                        UpdateParam(motorNumber, 'ISD_MASK', checked)
                    }}
                />
                Monitor Motor Current
            </Box>
        </Grid2>
    )
}

// RS_SEL
export function CurrentSenseFilteringSlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const switchText = () => {
        return value
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Current Sense analog filtering {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={3}
                    step={1}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, 'RS_SEL', newValue)
                        }
                    }}
                    valueLabelFormat={(value: number) => {
                        const speedList = ['unfiltered', '200kHz', '100kHz', '50kHz']
                        return speedList[value]
                    }}
                />
            </Box>
        </Grid2>
    )
}

// ANTITHROUGH
export function AutodeadtimeSwitch ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: boolean, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<boolean>(initialState)
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    checked={!value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setValue(!checked)
                        UpdateParam(motorNumber, 'ANTITHROUGH', checked)
                    }}
                /> 
                Autodeadtime
            </Box>
        </Grid2>
    )
}

// WAIT_TIME
export function BrakeTimeSlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const switchText = () => {
        return value
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Brake Time {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={3}
                    step={1}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, 'WAIT_TIME', newValue)
                        }
                    }}
                    valueLabelFormat={(value: number) => {
                        return value + " seconds"
                    }}
                />
            </Box>
        </Grid2> 
    )
}

// WAIT_MODE
export function BrakingModeSwitch ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: boolean, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<boolean>(initialState)
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    checked={!value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setValue(!checked)
                        UpdateParam(motorNumber, 'WAIT_MODE', checked)
                    }}
                />
                Brake Mode
            </Box>
        </Grid2>
    )
}

// WAIT_CON
export function PostBrakingActionSwitch ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: boolean, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<boolean>(initialState)
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    checked={!value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setValue(!checked)
                        UpdateParam(motorNumber, 'WAIT_CON', checked)
                    }}
                /> 
                Post Braking Action
            </Box>
        </Grid2>
    )
}

// LOCK_BRK
export function ErrorBrakingModeSwitch ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: boolean, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<boolean>(initialState)
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    checked={!value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setValue(!checked)
                        UpdateParam(motorNumber, 'LOCK_BRK', checked)
                    }}
                /> 
                Error Braking Mode
            </Box>
        </Grid2>
    )
}

// ALERTINV
export function AlertPinPolaritySwitch ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: boolean, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<boolean>(initialState)
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    checked={!value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setValue(!checked)
                        UpdateParam(motorNumber, 'ALERTINV', checked)
                    }}
                /> 
                Alert Pin Polarity Inverted
            </Box>
        </Grid2>
    )
}

// TSD_MASK
export function ThermalShutdownInhibitSwitch ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: boolean, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<boolean>(initialState)
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    checked={!value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setValue(!checked)
                        UpdateParam(motorNumber, 'TSD_MASK', checked)
                    }}
                />
                Thermal Shutdown Enabled
            </Box>
        </Grid2>
    )
}

// TRE
export function RestartTimeSlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const switchText = () => {
        return value
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Auto Restart Time {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={7}
                    step={1}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, 'TRE', newValue)
                        }
                    }}
                    valueLabelFormat={(value: number) => {
                        const time = [0, 0.5, 1, 1.5, 2, 4, 7, 10]
                        return time[value] + " seconds"
                    }}
                /> 
            </Box>
        </Grid2>
    )
}

// PreTIP
export function FirstDCExcitationTimeSlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const switchText = () => {
        return value
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                First DC Excitation Time {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={3}
                    step={1}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, 'PRE_TIP', newValue)
                        }
                    }}
                    valueLabelFormat={(value: number) => {
                        const time = [0, 0.2, 0.5, 1]
                        return time[value] + " seconds"
                    }}
                />
            </Box>
        </Grid2>
    )
}

// TIP
export function SecondDCExcitationTimeSlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const switchText = () => {
        return value
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Second DC Excitation Time {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={7}
                    step={1}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, 'TIP', newValue)
                        }
                    }}
                    valueLabelFormat={(value: number) => {
                        const time = [0.1, 0.2, 0.4, 0.6, 0.8, 1, 1.5, 2]
                        return time[value] + " seconds"
                    }}
                />
            </Box>
        </Grid2>
    )
}

// LA
export function LeadAngleSlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const switchText = () => {
        return value
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Lead Angle Mode {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={15}
                    step={1}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, 'LA', newValue)
                        }
                    }}
                /> 
            </Box>
        </Grid2>
    )
}

// FMAX
export function ElectricalAngleMaxFrequencySlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const switchText = () => {
        return value
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Electrical Angle Frequency Mode {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={3}
                    step={1}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, 'FMAX', newValue)
                        }
                    }}
                    valueLabelFormat={(value: number) => {
                        const frequency = ['0.75kHz', '1.5kHz', '3kHz', 'unlimited']
                        return frequency[value]
                    }}
                /> 
            </Box>
        </Grid2>
    )
}

// FST
export function ForcedComutationFrequencySlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const switchText = () => {
        return value
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Forced Comutation Frequency {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={3}
                    step={1}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, 'FST', newValue)
                        }
                    }}
                    valueLabelFormat={(value: number) => {
                        const frequency = ['1.6Hz', '3.2Hz', '6.4Hz', '12.8Hz']
                        return frequency[value]
                    }}
                /> 
            </Box>
        </Grid2>
    )
}

// FPWM
export function OutputPWMSlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const switchText = () => {
        return value
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Output PWM Frequency Mode {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={15}
                    step={1}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, 'FPWM', newValue)
                        }
                    }}
                />
            </Box>
        </Grid2>
    )
}

// DEADTIME
export function DeadtimeSlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const switchText = () => {
        return value
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Dead Time Setting {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={3}
                    step={1}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, 'DEADTIME', newValue)
                        }
                    }}
                    valueLabelFormat={(value: number) => {
                        const time = ['250ns', '500ns', '1000ns', '1500ns']
                        return time[value]
                    }}
                /> 
            </Box>
        </Grid2>
    )
}

// ISD_LVL
export function OvercurrentDetectionThresholdSwitch ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: boolean, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<boolean>(initialState)
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    checked={!value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setValue(!checked)
                        UpdateParam(motorNumber, 'ISD_LVL', checked)
                    }}
                />
                Overcurrent Detection Threshold
            </Box>
        </Grid2>
    )
}

// OCP_LVL
let VOC = 0.125
const shuntResistor = 0.025
export function CurrentSenseGainSwitch ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: boolean, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<boolean>(initialState)
    VOC = value ? 0.25 : 0.125
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    checked={!value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        VOC = value ? 0.25 : 0.125
                        setValue(value)
                        UpdateParam(motorNumber, 'OCP_LVL', checked)
                    }}
                />
                Current Sense Gain
            </Box>
        </Grid2>
    )
}

// SOURCE
export function GateSourceCurrentSlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const switchText = () => {
        return value
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Transistor Gate Source Current {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={7}
                    step={1}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, 'SOURCE', newValue)
                        }
                    }}
                    valueLabelFormat={(value: number) => {
                        const frequency = [10, 13.9, 19.3, 26.8, 37.3, 51.8, 72, 100]
                        return frequency[value] + 'mA'
                    }}
                /> 
            </Box>
        </Grid2>
    )
}

// SINK
export function GateSinkCurrentSlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const switchText = () => {
        return value
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Transistor Gate Sink Current {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={7}
                    step={1}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, 'SINK', newValue)
                        }
                    }}
                    valueLabelFormat={(value: number) => {
                        const current = [20, 27.8, 38.6, 53.7, 74.6, 103.6, 143.9, 200]
                        return current[value] + 'mA'
                    }}
                />
            </Box>
        </Grid2>
    )
}

// COMP_HYS
export function PositionDetectionHysteresisSlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){
    const [value, setValue] = React.useState<number>(initialState);
    const switchText = () => {
        return value
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Position Detection Hysteresis Voltage {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={3}
                    step={1}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, 'COMP_HYS', newValue)
                        }
                    }}
                    valueLabelFormat={(value: number) => {
                        const voltage = ['none', '100mV', '200mV', '300mV']
                        return voltage[value]
                    }}
                /> 
            </Box>
        </Grid2>
    )
}

// SPD
export function MotorSpeedSlider ({ motorNumber, initialState, itembgColor, itembgHoverColor }: { motorNumber: number, initialState: number, itembgColor: string, itembgHoverColor: string }){ 
    const [value, setValue] = React.useState<number>(initialState);
    const switchText = () => {
        return value
    }

    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Motor Duty Setting {switchText()}
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
                            UpdateParam(motorNumber, 'SPD', newValue)
                        }
                    }}
                    valueLabelFormat={(value: number) => {
                        return asPercentage(value / 511)
                    }}
                />
            </Box>
        </Grid2>
    )
}
