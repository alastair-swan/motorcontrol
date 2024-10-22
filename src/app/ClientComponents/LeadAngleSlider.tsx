"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControlClient"
import { Box, Slider, Grid2 } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { LA } from "./Register"

const LAModeList = LA.valuemap as Array<Array<any>>

// LA
export function LeadAngleSlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const switchText = () => {
        return (
            <Box>
                Motor Phase Lead Angle: 
                <Grid2 container columns={7} flexShrink={1}>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderTop={1} paddingLeft={0.5} whiteSpace={"nowrap"}>Duty Up</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderTop={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{'<'} {state.FST === 0 ? "100Hz" : "200Hz" }</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderTop={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{state.FST === 0 ? "100Hz - 200Hz" : "200Hz - 400Hz" }</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderTop={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{state.FST === 0 ? "200Hz - 300Hz" : "400Hz - 600Hz" }</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderTop={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{state.FST === 0 ? "300Hz - 400Hz" : "600Hz - 800Hz" }</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderTop={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{state.FST === 0 ? "400Hz - 500Hz" : "800Hz - 1kHz" }</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderTop={1} borderRight={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{'>'} {state.FST === 0 ? "500Hz" : "1kHz" }</Grid2>
                    
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>Duty Down</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{'<'} {state.FST === 0 ? "50Hz" : "100Hz" }</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{state.FST === 0 ? "50Hz - 150Hz" : "100Hz - 300Hz" }</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{state.FST === 0 ? "150Hz - 250Hz" : "300Hz - 500Hz" }</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{state.FST === 0 ? "250Hz - 350Hz" : "500Hz - 700Hz" }</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{state.FST === 0 ? "350Hz - 450Hz" : "700Hz - 900Hz" }</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderBottom={1} borderRight={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{'>'} {state.FST === 0 ? "450Hz" : "900kHz" }</Grid2>

                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>Lead Angle</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{((LAModeList[state.LA] as Array<any>) [0])}°</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{((LAModeList[state.LA] as Array<any>) [1])}°</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{((LAModeList[state.LA] as Array<any>) [2])}°</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{((LAModeList[state.LA] as Array<any>) [3])}°</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{((LAModeList[state.LA] as Array<any>) [4])}°</Grid2>
                    <Grid2 size={1} gridRow={0} flexShrink={1} borderLeft={1} borderRight={1} borderBottom={1} paddingLeft={0.5} whiteSpace={"nowrap"}>{((LAModeList[state.LA] as Array<any>) [5])}°</Grid2>
                </Grid2>
            </Box>
        )
    }
    return (
        <Box sx={ frameStyle }>
            {switchText()}
            <Slider 
                valueLabelDisplay='auto' 
                value={ state.LA }
                min={ LA.min } 
                max={ LA.max }
                step={1}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            LA: newValue
                        })  
                        UpdateParam(motorNumber, LA, newValue)
                    }
                }}
            /> 
        </Box>
    )
}
