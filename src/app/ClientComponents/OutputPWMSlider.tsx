"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControlClient"
import { Box, Slider, Grid2 } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { FPWM } from "./Register"

const PWMModeList = FPWM.valuemap as Array<Array<number | string>>

// FPWM
export function OutputPWMSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const switchText = () => {
        return (
            <Box>
                Output PWM Frequency Mode: 
                <Grid2 container columns={7} flexShrink={1}>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderTop={1} paddingLeft={0.5} whiteSpace={"nowrap"}>Duty Up</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderTop={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{'<'} 200Hz</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderTop={1} paddingLeft={0.5} whiteSpace={"nowrap"}>200Hz - 400Hz</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderTop={1} paddingLeft={0.5} whiteSpace={"nowrap"}>400Hz - 600Hz</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderTop={1} paddingLeft={0.5} whiteSpace={"nowrap"}>600Hz - 800Hz</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderTop={1} paddingLeft={0.5} whiteSpace={"nowrap"}>800Hz - 1kHz</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderTop={1} borderRight={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{'>'} 1kHz</Grid2>
                    
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>Duty Down</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{'<'} 100Hz</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>100Hz - 300Hz</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>300Hz - 500Hz</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>500Hz - 700Hz</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>500Hz - 700Hz</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderBottom={1} borderRight={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{'>'} 900Hz</Grid2>

                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>PWM Frequency</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{((PWMModeList[state.FPWM] as Array<number>) [0] as number / 1000)}kHz</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{((PWMModeList[state.FPWM] as Array<number>) [1] as number / 1000)}kHz</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{((PWMModeList[state.FPWM] as Array<number>) [2] as number / 1000)}kHz</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{((PWMModeList[state.FPWM] as Array<number>) [3] as number / 1000)}kHz</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{((PWMModeList[state.FPWM] as Array<number>) [4] as number / 1000)}kHz</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderRight={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{((PWMModeList[state.FPWM] as Array<number>) [5] as number / 1000)}kHz</Grid2>
                </Grid2>
            </Box>
        )
    }
    return (
        <Box sx={ frameStyle }>
            {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.FPWM }
                min={ FPWM.min } 
                max={ FPWM.max }
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            FPWM: newValue
                        })
                        UpdateParam(motorNumber, FPWM, newValue)
                    }
                }}
            />
        </Box>
    )
}
