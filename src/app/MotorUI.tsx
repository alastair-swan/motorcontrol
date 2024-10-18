"use client"

import { Grid2, Box, Tabs, Tab } from "@mui/material";
import './ClientComponents/MotorDutyCurve'
import * as Client from './ClientComponents'
import { RegisterList } from "./ClientComponents";
import { useState } from "react";
import { MotorParams } from "./MotorControlClient";
const sectionbgColor = 'rgba(255,255,255,0.2)'
const itembgColor = 'rgba(255,255,255,0.2)'
const itembgHoverColor = 'rgba(255,255,255,0.4)'


function MotorNumberComponent({ motorNumber }: { motorNumber: number }){
    return (
        <Box sx={{ width: '100%', borderRadius: 4, borderWidth: 0, padding: 1, justifyContent: 'center', bgcolor: itembgColor}}>
            Motor { motorNumber }
        </Box>
    )
}



function MotorState({ motorNumber, state, setState }: { motorNumber: number, state: MotorParams, setState: (motorState: MotorParams) => void }){
    return (
        <Box sx={{ bgcolor: sectionbgColor, borderRadius: 4, borderWidth: 0}}>
            <Grid2 container columns={2} sx={{ borderWidth: 0, padding: 1 }}>
                <Grid2 gridColumn={0} sx={{height: '100%', bgcolor: itembgColor, borderRadius: 2, borderWidth: 0, padding: 1}}>
                    <Client.ChargePumpState state={state}/>
                    <Client.TemperatureState state={state}/>
                    <Client.CurrentState state={state}/>
                    <Client.RPMErrorState state={state}/>
                    <Client.StartupState state={state}/>
                    <Client.RotationState state={state}/>
                </Grid2>
                <Grid2 gridColumn={1}>
                    <Client.DutyCurve motorNumber={motorNumber} state={state} setState={setState}/>
                </Grid2>
            </Grid2>
        </Box>
    )
}



export default function Motor ({ motorNumber }: { motorNumber: number }){
    const [motorState, setMotorState] = useState<MotorParams>({
        CP_LOW: false,
        TSD: false,
        ISD: false,
        OV_SPD: false,
        UD_SPD: false,
        ST_FAIL: false,
        USERID: RegisterList.USERID.default,
        NOSTOP: RegisterList.NOSTOP.default,
        STOPDUTY: RegisterList.STOPDUTY.default,
        STARTDUTY: RegisterList.STARTDUTY.default,
        CHANGEDUTY: RegisterList.CHANGEDUTY.default,
        MAXDUTY: RegisterList.MAXDUTY.default,
        STARTRPM: RegisterList.STARTRPM.default,
        MAXDUTYHYS: RegisterList.MAXDUTYHYS.default,
        SPEEDSLOP: RegisterList.SPEEDSLOP.default,
        MAXOPEN: RegisterList.MAXOPEN.default,
        MAXOFF: RegisterList.MAXOFF.default,
        SPEEDSLOP2: RegisterList.SPEEDSLOP2.default,
        VCP_MASK: RegisterList.VCP_MASK.default,
        OPENLOOP: RegisterList.OPENLOOP.default,
        KIX: RegisterList.KIX.default,
        KI: RegisterList.KI.default,
        KPX: RegisterList.KPX.default,
        KP: RegisterList.KP.default,
        STBY_MODE: RegisterList.STBY_MODE.default,
        DIR: RegisterList.DIR.default,
        POLEPAIR: RegisterList.POLEPAIR.default,
        MAXSPEED: RegisterList.MAXSPEED.default,
        FG_ON: RegisterList.FG_ON.default,
        TSPSEL: RegisterList.TSPSEL.default,
        SPDINV: RegisterList.SPDINV.default,
        LATCH: RegisterList.LATCH.default,
        OCPMASK: RegisterList.OCPMASK.default,
        LOCKDIS: RegisterList.LOCKDIS.default,
        DUTYCHGLIMIT: RegisterList.DUTYCHGLIMIT.default,
        STARTCURRENT: RegisterList.STARTCURRENT.default,
        OCPDIS: RegisterList.OCPDIS.default,
        SS_ADD_SEL: RegisterList.SS_ADD_SEL.default,
        SS_UP_SEL: RegisterList.SS_UP_SEL.default,
        SS_DUTYCHGLIMIT: RegisterList.SS_DUTYCHGLIMIT.default,
        DUTY_UP_TIME: RegisterList.DUTY_UP_TIME.default,
        RPMLIMIT: RegisterList.RPMLIMIT.default,
        BRK_INV: RegisterList.BRK_INV.default,
        ISD_MASK: RegisterList.ISD_MASK.default,
        RS_SEL: RegisterList.RS_SEL.default,
        ANTITHROUGH: RegisterList.ANTITHROUGH.default,
        WAIT_TIME: RegisterList.WAIT_TIME.default,
        WAIT_MODE: RegisterList.WAIT_MODE.default,
        WAIT_CON: RegisterList.WAIT_CON.default,
        LOCK_BRK: RegisterList.LOCK_BRK.default,
        ALERTINV: RegisterList.ALERTINV.default,
        TSD_MASK: RegisterList.TSD_MASK.default,
        TRE: RegisterList.TRE.default,
        PRE_TIP: RegisterList.PRE_TIP.default,
        TIP: RegisterList.TIP.default,
        LA: RegisterList.LA.default,
        FMAX: RegisterList.FMAX.default,
        FST: RegisterList.FST.default,
        FPWM: RegisterList.FPWM.default,
        DEADTIME: RegisterList.DEADTIME.default,
        ISD_LVL: RegisterList.ISD_LVL.default,
        OCP_LVL: RegisterList.OCP_LVL.default,
        SOURCE: RegisterList.SOURCE.default,
        SINK: RegisterList.SINK.default,
        COMP_HYS: RegisterList.COMP_HYS.default,
        SLAVE_ADRS: RegisterList.SLAVE_ADRS.default[motorNumber] as number,
        SPD: RegisterList.SPD.default,
        hz_cnt: 0
    })

    const updateMotor = (motorState: MotorParams) => {
        setMotorState({...motorState})
    }

    return (
        <Box>
            <MotorNumberComponent motorNumber={motorNumber}/>
            <MotorState motorNumber={motorNumber} state={motorState} setState={updateMotor}/>
            <MotorControlSettings motorNumber={motorNumber} sectionbgColor={sectionbgColor} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={motorState} setState={updateMotor}/>
        </Box>
    )
}

export function MotorTuningSliders({ motorNumber, sectionbgColor, itembgHoverColor, itembgColor, state, setState }: 
    {motorNumber: number, sectionbgColor?: string, itembgHoverColor: string, itembgColor: string, state: MotorParams, setState: (motorState: MotorParams) => void }) {
    return (
        <Grid2 container spacing={1}>
            <Client.ChargePumpStateMonitoringSwitch motorNumber={motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.ThermalShutdownInhibitSwitch motorNumber={motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.OverCurrentDetectionSwitch motorNumber={motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.NoStopSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.OffDutySlider motorNumber = {motorNumber } itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.StartDutySlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.ChangeDutySlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.MaxDutySlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.StartRPMSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.MaxDutyHysteresisSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.SpeedSlopeSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.MaxOpenSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.MaxOffSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.SpeedSlope2Slider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.OpenLoopSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.KIXSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.KISlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.KPXSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.KPSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.StandbyModeSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.DirectionSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.PolesSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.MaxSpeedSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.SpeedOutputModeSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.SpeedInputModeSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.SpeedInputInversionSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.ErrorLatchSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.DigitalFilteringSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.ForcedComutationSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.SpeedChangeLimitSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.StartupCurrentLimitSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState}/>
            <Client.OutputCurrentMonitoringSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState}/>
            <Client.SoftStartCurrentLimitSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState}/>
            <Client.SoftStartCurrentStepSizeSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState}/>
            <Client.SoftStartSpeedChangeLimitSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.DutyUpTimeSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.RPMLimitSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.BrakePolaritySwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.OverCurrentDetectionSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.CurrentSenseFilteringSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.AutodeadtimeSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.BrakeTimeSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.BrakingModeSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.PostBrakingActionSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.ErrorBrakingModeSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.AlertPinPolaritySwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.ThermalShutdownInhibitSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.RestartTimeSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.FirstDCExcitationTimeSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.SecondDCExcitationTimeSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.LeadAngleSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.ElectricalAngleMaxFrequencySlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.ForcedComutationFrequencySlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.OutputPWMSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.DeadtimeSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.OvercurrentDetectionThresholdSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.CurrentSenseGainSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState}/>
            <Client.GateSourceCurrentSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.GateSinkCurrentSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.PositionDetectionHysteresisSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />                            
        </Grid2>
    )
}

export function MotorControlSliders({ motorNumber, sectionbgColor, itembgHoverColor, itembgColor, state, setState }: 
    {motorNumber: number, sectionbgColor?: string, itembgHoverColor: string, itembgColor: string, state: MotorParams, setState: (motorState: MotorParams) => void }) {
    return (
        <Grid2 container spacing={1}>
            <Client.MotorDutySlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
        </Grid2>
    )
}

export function MotorControlSettings({ motorNumber, sectionbgColor, itembgHoverColor, itembgColor, state, setState}: 
    {motorNumber: number, sectionbgColor: string, itembgHoverColor: string, itembgColor: string, state: MotorParams, setState: (motorState: MotorParams) => void }) {
        const [value, setValue] = useState(0);

        interface TabPanelProps {
            children?: React.ReactNode;
            index: number;
            value: number;
        }
          
        function TabPanel(props: TabPanelProps) {
            const { children, value, index, ...other } = props;
            
            return (
                <div
                    role="controltabpanel"
                    hidden={value !== index}
                    id={`control-tabpanel-${index}`}
                    aria-labelledby={`control-tab-${index}`}
                    {...other}
                >
                {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
                </div>
            );
        }
          
    function a11yProps(index: number) {
        return {
            id: `control-tab-${index}`,
            'aria-controls': `control-tabpanel-${index}`,
        };
    }
    
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', borderWidth: 0, padding: 1, bgcolor: sectionbgColor, borderRadius: 4}}>
            <Tabs value={value} onChange={handleChange}>
                <Tab label="Control" {...a11yProps(0)} />
                <Tab label="Tuning" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <MotorControlSliders motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <MotorTuningSliders motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState}/>
            </TabPanel>
        </Box>
    )
}

