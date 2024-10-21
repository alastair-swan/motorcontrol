"use client"

import { switchComponentProps } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { SPDINV } from "./Register"

// SPDINV
export function SpeedInputInversionSwitch ({ motorNumber, state, setState, frameStyle = componentStyle }: switchComponentProps){
    const switchText = () => { return state.SPDINV ? "Inverted" : "Normal"}
    return (
        <Box sx={ frameStyle }>
            <Switch  
                checked={ state.SPDINV }
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        SPDINV: checked
                    })  
                    UpdateParam(motorNumber, SPDINV, checked)
                }}
            />
            Analog Speed Control { switchText() }
        </Box>
    )
}