"use client"

import { useEffect, useState } from "react"
import { sliderComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'
import { asPercentage } from "./helper"


export const PWMModeList = [
    [ 23400,  23400,  23400,  23400,  23400,  23400],
    [ 46900,  46900,  46900,  46900,  46900,  46900],
    [ 93700,  93700,  93700,  93700,  93700,  93700],
    [187500, 187500, 187500, 187500, 187500, 187500],
    [ 46900,  46900,  93700,  93700,  93700, 187500],
    [ 23400,  46900,  93700,  93700,  93700,  93700],
    [ 23400,  23400,  46900,  46900,  93700,  93700],
    [ 23400,  46900,  93700,  93700, 187500, 187500],
] as Array<Array<number>>

// FPWM
export function OutputPWMSlider ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: sliderComponentProps){
    const switchText = () => {
        return (
            <Grid2 container columns={7}>
                <Grid2 overflow={"auto"} size={1} gridRow={0} borderLeft={1} borderTop={1} paddingLeft={0.5} whiteSpace={"nowrap"}>Duty Up</Grid2>
                <Grid2 overflow={"auto"} size={1} gridRow={0} borderLeft={1} borderTop={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{'<'} 200Hz</Grid2>
                <Grid2 overflow={"auto"} size={1} gridRow={0} borderLeft={1} borderTop={1} paddingLeft={0.5} whiteSpace={"nowrap"}>200Hz - 400Hz</Grid2>
                <Grid2 overflow={"auto"} size={1} gridRow={0} borderLeft={1} borderTop={1} paddingLeft={0.5} whiteSpace={"nowrap"}>400Hz - 600Hz</Grid2>
                <Grid2 overflow={"auto"} size={1} gridRow={0} borderLeft={1} borderTop={1} paddingLeft={0.5} whiteSpace={"nowrap"}>600Hz - 800Hz</Grid2>
                <Grid2 overflow={"auto"} size={1} gridRow={0} borderLeft={1} borderTop={1} paddingLeft={0.5} whiteSpace={"nowrap"}>800Hz - 1kHz</Grid2>
                <Grid2 overflow={"auto"} size={1} gridRow={0} borderLeft={1} borderTop={1} borderRight={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{'>'} 1kHz</Grid2>
                
                <Grid2 overflow={"auto"} size={1} gridRow={0} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>Duty Down</Grid2>
                <Grid2 overflow={"auto"} size={1} gridRow={0} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{'<'} 100Hz</Grid2>
                <Grid2 overflow={"auto"} size={1} gridRow={0} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>100Hz - 300Hz</Grid2>
                <Grid2 overflow={"auto"} size={1} gridRow={0} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>300Hz - 500Hz</Grid2>
                <Grid2 overflow={"auto"} size={1} gridRow={0} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>500Hz - 700Hz</Grid2>
                <Grid2 overflow={"auto"} size={1} gridRow={0} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>500Hz - 700Hz</Grid2>
                <Grid2 overflow={"auto"} size={1} gridRow={0} borderLeft={1} borderBottom={1} borderRight={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{'>'} 900Hz</Grid2>

                <Grid2 overflow={"auto"} size={1} gridRow={0} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>PWM Frequency</Grid2>
                <Grid2 overflow={"auto"} size={1} gridRow={0} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{((PWMModeList[state.FPWM] as Array<number>) [0] as number / 1000)}kHz</Grid2>
                <Grid2 overflow={"auto"} size={1} gridRow={0} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{((PWMModeList[state.FPWM] as Array<number>) [1] as number / 1000)}kHz</Grid2>
                <Grid2 overflow={"auto"} size={1} gridRow={0} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{((PWMModeList[state.FPWM] as Array<number>) [2] as number / 1000)}kHz</Grid2>
                <Grid2 overflow={"auto"} size={1} gridRow={0} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{((PWMModeList[state.FPWM] as Array<number>) [3] as number / 1000)}kHz</Grid2>
                <Grid2 overflow={"auto"} size={1} gridRow={0} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{((PWMModeList[state.FPWM] as Array<number>) [4] as number / 1000)}kHz</Grid2>
                <Grid2 overflow={"auto"} size={1} gridRow={0} borderLeft={1} borderRight={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{((PWMModeList[state.FPWM] as Array<number>) [5] as number / 1000)}kHz</Grid2>
            </Grid2>
        )
    }
    return (
        <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
            Output PWM Frequency Mode: {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.FPWM }
                min={0} 
                max={7}
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            FPWM: newValue
                        })
                        UpdateParam(motorNumber, RegisterList.FPWM.command, newValue)
                    }
                }}
            />
        </Box>
    )
}
