"use client"

import { useEffect, useState } from "react"
import { switchComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Switch } from '@mui/material'

// KIX
export function KIXSwitch ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: switchComponentProps){
    const switchText = () => {
        if (!state.KIX){
            return "x8"
        }
        return "x1"
    }
    return (
        <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
            <Switch 
                checked={state.KIX}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        KIX: checked
                    })  
                    UpdateParam(motorNumber, RegisterList.KIX.command, checked)
                }}
            />
            I coefficient {switchText()} 
        </Box>
    )
}