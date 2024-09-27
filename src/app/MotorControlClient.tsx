export type MotorParams = {
    CP_LOW: boolean,
    TSD: boolean,
    ISD: boolean,
    OV_SPD: boolean,
    UD_SPD: boolean,
    ST_FAIL: boolean,
    USERID: number,
    NOSTOP: boolean,
    STOPDUTY: number,
    STARTDUTY: number,
    CHANGEDUTY: number,
    MAXDUTY: number,
    STARTRPM: number,
    MAXDUTYHYS: number,
    SPEEDSLOP: number,
    MAXOPEN: boolean,
    MAXOFF: boolean,
    SPEEDSLOP2: number,
    VCP_MASK: boolean,
    OPENLOOP: boolean,
    KIX: boolean,
    KI: number,
    KPX: boolean,
    KP: number,
    STBY_MODE: boolean,
    DIR: boolean,
    POLEPAIR: number,
    MAXSPEED: number,
    FG_ON: boolean,
    TSPSEL: boolean,
    SPDINV: boolean,
    LATCH: boolean,
    OCPMASK: number,
    LOCKDIS: boolean,
    DUTYCHGLIMIT: number,
    STARTCURRENT: number,
    OCPDIS: boolean,
    SS_ADD_SEL: number,
    SS_UP_SEL: number,
    SS_DUTYCHGLIMIT: number,
    DUTY_UP_TIME: boolean,
    RPMLIMIT: number,
    BRK_INV: boolean,
    ISD_MASK: boolean,
    RS_SEL: number,
    ANTITHROUGH: boolean,
    WAIT_TIME: number,
    WAIT_MODE: boolean,
    WAIT_CON: boolean,
    LOCK_BRK: boolean,
    ALERTINV: boolean,
    TSD_MASK: boolean,
    TRE: number,
    PRE_TIP: number,
    TIP: number,
    LA: number,
    FMAX: number,
    FST: number,
    FPWM: number,
    DEADTIME: number,
    ISD_LVL: boolean,
    OCP_LVL: boolean,
    SOURCE: number,
    SINK: number,
    COMP_HYS: number,
    SLAVE_ADRS: number,
    SPD: number,
    hz_cnt: number
}