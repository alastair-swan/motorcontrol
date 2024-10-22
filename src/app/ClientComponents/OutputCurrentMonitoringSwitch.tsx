"use client"

import { switchComponentProps } from "."
import { UpdateParam } from "../MotorControlClient"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { OCPDIS } from "./Register"

// OCPDIS
export function OutputCurrentMonitoringSwitch ({ motorNumber, state, setState, frameStyle = componentStyle }: switchComponentProps){
    return (
        <Box sx={ frameStyle }>
            <Switch  
                checked={ state.OCPDIS }
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        OCPDIS: checked
                    })  
                    UpdateParam(motorNumber, OCPDIS, checked)
                }}
            />
            Monitor Current
        </Box>
    )
}