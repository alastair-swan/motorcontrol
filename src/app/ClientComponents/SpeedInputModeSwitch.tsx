"use client"

import { switchComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"

// TSPSEL
export function SpeedInputModeSwitch ({ motorNumber, state, setState, frameStyle = componentStyle }: switchComponentProps){
    const switchText = () => { return state.TSPSEL ? "PWM Duty" : "Analog Voltage" }
    return (
        <Box sx={ frameStyle }>
            <Switch  
                checked={ state.TSPSEL }
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        TSPSEL: checked
                    })
                    UpdateParam(motorNumber, RegisterList.TSPSEL.command, checked)
                }}
            />
            Analog speed control mode: { switchText() }
        </Box>
    )
}
