"use client"

import { switchComponentProps } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { TSPSEL } from "./Register"

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
                    UpdateParam(motorNumber, TSPSEL, checked)
                }}
            />
            Analog speed control mode: { switchText() }
        </Box>
    )
}
