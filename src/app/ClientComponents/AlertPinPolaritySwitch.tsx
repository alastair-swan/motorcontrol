"use client"

import { switchComponentProps } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { ALERTINV } from "./Register"

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
                    UpdateParam(motorNumber, ALERTINV, checked)
                }}
            /> 
            Alert Pin Polarity {state.ALERTINV ? "Inverted" : "Normal"}
        </Box>
    )
}