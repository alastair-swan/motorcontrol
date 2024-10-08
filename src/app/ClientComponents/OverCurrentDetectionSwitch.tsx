"use client"

import { useEffect, useState } from "react"
import { switchComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Switch } from '@mui/material'

// ISD_MASK
export function OverCurrentDetectionSwitch ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: switchComponentProps){
    const switchText = () => { return state.ISD_MASK ? "Disabled" : "Enabled"}
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    checked={ state.ISD_MASK }
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setState({
                            ...state,
                            ISD_MASK: checked
                        })  
                        UpdateParam(motorNumber, RegisterList.ISD_MASK.command, checked)
                    }}
                />
                Monitor Motor Current: { switchText() }
            </Box>
        </Grid2>
    )
}