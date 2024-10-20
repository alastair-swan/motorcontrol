"use client"

import { switchComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"

// ALERTINV
export function AlertPinPolaritySwitch ({ motorNumber, state, setState, frameStyle = componentStyle }: switchComponentProps){
    return (
        <Box sx={ frameStyle }>
            <Switch  
                checked={state.ALERTINV}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        ALERTINV: checked
                    })
                    UpdateParam(motorNumber, RegisterList.ALERTINV.command, checked)
                }}
            /> 
            Alert Pin Polarity Inverted
        </Box>
    )
}