#include "TC78B011FTG.h"

char* numToBin(uint8_t num){
    char* bin = new char[8];
    bin[0] = ((num >> 7) & 1) | 0x30;
    bin[1] = ((num >> 6) & 1) | 0x30;
    bin[2] = ((num >> 5) & 1) | 0x30;
    bin[3] = ((num >> 4) & 1) | 0x30;
    bin[4] = ((num >> 3) & 1) | 0x30;
    bin[5] = ((num >> 2) & 1) | 0x30;
    bin[6] = ((num >> 1) & 1) | 0x30;
    bin[7] = (num & 1) | 0x30;
    return bin;
}

int strToInt(char* str){
    int len = strlen(str);
    if (len <= 0){
        throw new std::invalid_argument("empty string");
    }
    int num = 0;
    int i = 0;
    if (str[0] == '-'){
        i++;
    }
    for (; i < len; i++){
        switch (str[i]){
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                num += (int)pow(10, len - i - 1) * (0x07 & ((uint8_t)str[i]));
                break;
            default:
                throw new std::invalid_argument("invalid character");
        }
    }
    if (str[0] == '-'){
        return -num;
    }
    return num;
}

int main (int argc, char* argv[]){
    TC78B011FTG motor0 = TC78B011FTG(1, 0x29);
    TC78B011FTG motor1 = TC78B011FTG(1, 0x32);
    int speedval = 0;
    int motor = 0;
    for (int i = 0; i < argc; i++){
        if (strcmp(argv[i], "-s") == 0 && i < argc - 1){
            speedval = strToInt(argv[i+1]);
        }
        if (strcmp(argv[i], "-m") == 0 && i < argc - 1){
            motor = strToInt(argv[i+1]);
        }
    }
    if (speedval > 1023 || speedval < 0){
        std::cout << "speed must be in the range 0:1023" << std::endl;
        return -1;
    }
    switch (motor){
        case 0:
            motor0.setSpeed(speedval);
            break;
        case 1:
            motor1.setSpeed(speedval);
            break;
        default:
            throw new std::invalid_argument("motor number not recognised");
    }
    //std::cout << motorTest() << std::endl;
    return 0;
}

TC78B011FTG::TC78B011FTG(int i2cBus, int address)
    :   i2cBusNumber(i2cBus),
        i2cAddress(address)
{
    NOSTOP          = DEFAULT_NOSTOP;
    STOPDUTY        = DEFAULT_STOPDUTY;
    CHANGEDUTY      = DEFAULT_CHANGEDUTY;
    MAXDUTY         = DEFAULT_MAXDUTY;
    STARTRPM        = DEFAULT_STARTRPM;
    SPEEDSLOP       = DEFAULT_SPEEDSLOP;
    SPEEDSLOP2      = DEFAULT_SPEEDSLOP2;
    KIX_REG         = DEFAULT_KIX;
    KI_REG          = DEFAULT_KI;
    KPX_REG         = DEFAULT_KPX;
    KP_REG          = DEFAULT_KP;
    STBY_MODE       = DEFAULT_STBY_MODE;
    DIR             = DEFAULT_DIR;
    POLEPAIR        = DEFAULT_POLEPAIR;
    MAXSPEED        = DEFAULT_MAXSPEED;
    FG_ON           = DEFAULT_FG_ON;
    FGSEL           = DEFAULT_FGSEL;
    TSPSEL          = DEFAULT_TSPSEL;
    SPDINV          = DEFAULT_SPDINV;
    LATCH           = DEFAULT_LATCH;
    OCPMASK         = DEFAULT_OCPMASK;
    LOCKDIS         = DEFAULT_LOCKDIS;
    DUTYCHGLIMIT    = DEFAULT_DUTYCHGLIMIT;
    STARTCURRENT    = DEFAULT_STARTCURRENT;
    OCPDIS          = DEFAULT_OCPDIS;
    SS_ADD_SEL      = DEFAULT_SS_ADD_SEL;
    SS_UP_SEL       = DEFAULT_SS_UP_SEL;
    SS_DUTYCHGLIMIT = DEFAULT_SS_DUTYCHGLIMIT;
    DUTY_UP_TIME    = DEFAULT_DUTY_UP_TIME;
    RPMLIMIT        = DEFAULT_RPMLIMIT;
    BRK_INV         = DEFAULT_BRK_INV;
    ISD_MASK        = DEFAULT_ISD_MASK;
    RS_SEL          = DEFAULT_RS_SEL;
    ANTITHROUGH     = DEFAULT_ANTITHROUGH;
    WAIT_TIME       = DEFAULT_WAIT_TIME;
    WAIT_CON        = DEFAULT_WAIT_CON;
    LOCK_BRK        = DEFAULT_LOCK_BRK;
    ALERT_INV       = DEFAULT_ALERT_INV;
    TSD_MASK        = DEFAULT_TSD_MASK;
    TRE             = DEFAULT_TRE;
    PRE_TIP         = DEFAULT_PRE_TIP;
    TIP             = DEFAULT_TIP;
    LA              = DEFAULT_LA;
    FMAX            = DEFAULT_FMAX;
    FST             = DEFAULT_FST;
    FPWM            = DEFAULT_FPWM;
    DEADTIME        = DEFAULT_DEADTIME;
    ISD_LVL         = DEFAULT_ISD_LVL;
    OCP_LVL         = DEFAULT_OCP_LVL;
    SOURCE          = DEFAULT_SOURCE;
    SINK            = DEFAULT_SINK;
    COMP_HYS        = DEFAULT_COMP_HYS;
    
    i2cWrite(2,     (uint8_t)(0xFF & (((NOSTOP & 0x01) << 7) & (STOPDUTY & 0x7F))));
    i2cWrite(3,     (uint8_t)(0xFF & STARTDUTY));
    i2cWrite(4,     (uint8_t)(0xFF & CHANGEDUTY));
    i2cWrite(5,     (uint8_t)(0xFF & MAXDUTY));
    i2cWrite(6,     (uint8_t)(0xFF & (STARTRPM >> 4)));
    i2cWrite(7,     (uint8_t)(0xFF & (((STARTRPM & 0x0F) << 4) & (0x0F & MAXDUTYHYS))));
    i2cWrite(8,     (uint8_t)(0xFF & (SPEEDSLOP >> 6)));
    i2cWrite(9,     (uint8_t)(0xFF & ((SPEEDSLOP & 0x3F) << 2) & ((MAXOPEN & 0x01) << 1) & (MAXOFF & 0x01)));
    i2cWrite(10,    (uint8_t)(0xFF & (SPEEDSLOP2 >> 6)));
    i2cWrite(11,    (uint8_t)(0xFF & ((SPEEDSLOP2 & 0x3F) << 2) & ((VCP_MASK & 0x01) << 1) & (OPENLOOP & 0x01)));
    i2cWrite(12,    (uint8_t)(0xFF & (((KIX_REG & 0x01) << 7) & (KI_REG & 0x7F))));
    i2cWrite(13,    (uint8_t)(0xFF & (((KPX_REG & 0x01) << 7) & (KP_REG & 0x7F))));
    i2cWrite(14,    (uint8_t)(0xFF & (((STBY_MODE & 0x01) << 7) & ((DIR & 0x01) << 6) & ((POLEPAIR & 0x07) << 3) & ((MAXSPEED & 0x03) << 1) & (FG_ON & 0x01))));
    i2cWrite(15,    (uint8_t)(0xFF & (((FGSEL & 0x07) << 5) & ((TSPSEL & 0x01) << 4) & ((SPDINV & 0x01) << 3) & ((LATCH & 0x01) << 2) & (OCPMASK & 0x03))));
    i2cWrite(16,    (uint8_t)(0xFF & (((LOCKDIS & 0x01) << 7) & ((DUTYCHGLIMIT & 0x07) << 4) & ((STARTCURRENT & 0x07) << 1) & (OCPDIS & 0x01))));
    i2cWrite(17,    (uint8_t)(0xFF & (((SS_ADD_SEL & 0x03) << 6) & ((SS_UP_SEL & 0x03) << 4) & ((SS_DUTYCHGLIMIT & 0x07) << 1) & (DUTY_UP_TIME & 0x01))));
    i2cWrite(18,    (uint8_t)(0xFF & (((RPMLIMIT & 0x07) << 5) & ((BRK_INV & 0x01) << 4) & ((ISD_MASK & 0x01) << 3) & ((RS_SEL & 0x03) << 1) & (ANTITHROUGH & 0x01))));
    i2cWrite(19,    (uint8_t)(0xFF & (((WAIT_TIME & 0x07) << 5) & ((WAIT_MODE & 0x01) << 4) & ((WAIT_CON & 0x01) << 3) & ((LOCK_BRK & 0x01) << 2) & ((ALERT_INV & 0x01) << 1) & (TSD_MASK & 0x01))));
    i2cWrite(20,    (uint8_t)(0xFF & (((TRE & 0x07) << 5) & ((PRE_TIP & 0x03) << 3) & (TIP & 0x07))));
    i2cWrite(21,    (uint8_t)(0xFF & (((LA & 0x0F) << 4) & ((FMAX & 0x03) << 2) & (FST & 0x03))));
    i2cWrite(22,    (uint8_t)(0xFF & (((FPWM & 0x07) << 2) & (DEADTIME & 0x03))));
    i2cWrite(23,    (uint8_t)(0xFF & (((ISD_LVL & 0x01) << 7) & ((OCP_LVL & 0x01) << 6) & ((SOURCE & 0x07) << 3) & (SINK & 0x07))));
    i2cWrite(24,    (uint8_t)(0xFF & (((COMP_HYS & 0x03) << 6))));
    
}

int TC78B011FTG::i2cWrite(int reg, uint8_t data){
    char filename[20];
    int i2cBus;
    sprintf(filename,"/dev/i2c-%d", i2cBusNumber);
    if ((i2cBus = open(filename, O_RDWR)) < 0)
        return -1;

    if (ioctl(i2cBus,I2C_SLAVE,i2cAddress) < 0)
        return -2;
    
    uint8_t databuffer[2];
    databuffer[0] = (uint8_t)(reg & 255);
    databuffer[1] = data;

    if (write(i2cBus, databuffer, 2) != 3){
        std::cout << "i2cWrite error: " << errno << " on write of " << data << " to " << reg << std::endl;
        return -3;
    }
    close(i2cBus);
    return 0;
}

int TC78B011FTG::i2cRead(int reg){
    char filename[20];
    int i2cBus;
    sprintf(filename,"/dev/i2c-%d", i2cBusNumber);
    if ((i2cBus = open(filename, O_RDWR)) < 0)
        return -1;

    if (ioctl(i2cBus,I2C_SLAVE,i2cAddress) < 0)
        return -2;

    uint8_t outbuf[] = {(uint8_t)reg};
    if (write(i2cBus, outbuf, 1) != 3){
        std::cout << "i2cRead error: " << errno << " on read of reg: " << reg << std::endl;
        return -4;
    }

    uint8_t buf[20];
    if (read(i2cBus, buf, 1) != 1) {
        close(i2cBus);
        return -3;
    } else {
        close(i2cBus);
        return buf[0];
    }
}

int TC78B011FTG::setNoStop(bool nostop)
{
    NOSTOP = (int)nostop;
    return i2cWrite(2, (uint8_t)(0xFF & (((NOSTOP & 0x01) << 7) & (STOPDUTY & 0x7F))));
}

int TC78B011FTG::setStopDuty(int stopduty)
{
    if ((stopduty & 127) != stopduty){
        return -10;
    }
    STOPDUTY = stopduty;
    return i2cWrite(2, (uint8_t)(0xFF & (((NOSTOP & 0x01) << 7) & (STOPDUTY & 0x7F))));
}

int TC78B011FTG::setStartDuty(int startduty)
{
    if ((startduty & 255) != startduty){
        return -10;
    }
    STARTDUTY = startduty;
    return i2cWrite(3, (uint8_t)(0xFF & STARTDUTY));
}

int TC78B011FTG::setChangeDuty(int changeduty)
{
    if ((changeduty & 255) != changeduty){
        return -10;
    }
    CHANGEDUTY = changeduty;
    return i2cWrite(4, (uint8_t)(0xFF & CHANGEDUTY));
}

int TC78B011FTG::setMaxDuty(int maxduty)
{
    if ((maxduty & 255) != maxduty){
        return -10;
    }
    MAXDUTY = maxduty;
    return i2cWrite(5, (uint8_t)(0xFF & MAXDUTY));
}

int TC78B011FTG::setStartRPM(int startRPM)
{
    if ((startRPM & 4095) != startRPM){
        return -10;
    }
    STARTRPM = startRPM;
    int status1 = i2cWrite(6, (uint8_t)(0xFF & (STARTRPM >> 4)));
    int status2 = i2cWrite(7, (uint8_t)(0xFF & (((STARTRPM & 0x0F) << 4) & (0x0F & MAXDUTYHYS))));
    return status1 < 0 ? status1 : status2 < 0 ? status2 : 0;
}

int TC78B011FTG::setMaxDutyHysteresis(int hysteresis)
{
    if ((hysteresis & 15) != hysteresis){
        return -10;
    }
    MAXDUTYHYS = hysteresis;
    return i2cWrite(7, (uint8_t)(0xFF & (((STARTRPM & 0x0F) << 4) & (0x0F & MAXDUTYHYS))));
}

int TC78B011FTG::setSpeedSlope(int speedslope)
{
    if ((speedslope & 16383) != speedslope){
        return -10;
    }
    SPEEDSLOP = speedslope;
    int status1 = i2cWrite(8, (uint8_t)(0xFF & (SPEEDSLOP >> 6)));
    int status2 = i2cWrite(9, (uint8_t)(0xFF & ((SPEEDSLOP & 0x3F) << 2) & ((MAXOPEN & 0x01) << 1) & (MAXOFF & 0x01)));
    return status1 < 0 ? status1 : status2 < 0 ? status2 : 0;
}

int TC78B011FTG::setMaxOpen(bool maxopen)
{
    MAXOPEN = (int)maxopen;
    return i2cWrite(9, (uint8_t)(0xFF & ((SPEEDSLOP & 0x3F) << 2) & ((MAXOPEN & 0x01) << 1) & (MAXOFF & 0x01)));
}

int TC78B011FTG::setMaxOff(bool maxoff)
{
    MAXOFF = (int)maxoff;
    return i2cWrite(9, (uint8_t)(0xFF & ((SPEEDSLOP & 0x3F) << 2) & ((MAXOPEN & 0x01) << 1) & (MAXOFF & 0x01)));
}

int TC78B011FTG::setSpeedSlope2(int speedslope2)
{
    if ((speedslope2 & 16383) != speedslope2){
        return -10;
    }
    SPEEDSLOP2 = speedslope2;
    int status1 = i2cWrite(10, (uint8_t)(0xFF & (SPEEDSLOP2 >> 6)));
    int status2 = i2cWrite(11, (uint8_t)(0xFF & ((SPEEDSLOP2 & 0x3F) << 2) & ((VCP_MASK & 0x01) << 1) & (OPENLOOP & 0x01)));
    return status1 < 0 ? status1 : status2 < 0 ? status2 : 0;
}

int TC78B011FTG::setChargePumpVCP(bool VCP)
{
    VCP_MASK = (int)VCP;
    return i2cWrite(11, (uint8_t)(0xFF & ((SPEEDSLOP2 & 0x3F) << 2) & ((VCP_MASK & 0x01) << 1) & (OPENLOOP & 0x01)));
}

int TC78B011FTG::setOpenLoop(bool openLoop)
{
    OPENLOOP = (int)openLoop;
    return i2cWrite(11, (uint8_t)(0xFF & ((SPEEDSLOP2 & 0x3F) << 2) & ((VCP_MASK & 0x01) << 1) & (OPENLOOP & 0x01)));
}

int TC78B011FTG::setPID(bool KIX, int KI, bool KPX, int KP)
{
    if (((KI & 127) != KI) | ((KP & 127) != KP)){
        return -10;
    }
    KIX_REG = (int)KIX;
    KI_REG = KI;
    KPX_REG = (int)KPX;
    KP_REG = KP;
    int status1 = i2cWrite(12, (uint8_t)(0xFF & (((KIX_REG & 0x01) << 7) & (KI_REG & 0x7F))));
    int status2 = i2cWrite(13, (uint8_t)(0xFF & (((KPX_REG & 0x01) << 7) & (KP_REG & 0x7F))));
    return status1 < 0 ? status1 : status2 < 0 ? status2 : 0;
}

int TC78B011FTG::setStandbyMode(bool standbymode)
{
    STBY_MODE = (int)standbymode;
    return i2cWrite(14, (uint8_t)(0xFF & (((STBY_MODE & 0x01) << 7) & ((DIR & 0x01) << 6) & ((POLEPAIR & 0x07) << 3) & ((MAXSPEED & 0x03) << 1) & (FG_ON & 0x01))));
}

int TC78B011FTG::setDIRMode(bool dirMode)
{
    DIR = (int)dirMode;
    return i2cWrite(14, (uint8_t)(0xFF & (((STBY_MODE & 0x01) << 7) & ((DIR & 0x01) << 6) & ((POLEPAIR & 0x07) << 3) & ((MAXSPEED & 0x03) << 1) & (FG_ON & 0x01))));
}

int TC78B011FTG::setPoles(int polesMode)
{
    if ((polesMode & 7) != polesMode){
        return -10;
    }
    POLEPAIR = polesMode;
    return i2cWrite(14, (uint8_t)(0xFF & (((STBY_MODE & 0x01) << 7) & ((DIR & 0x01) << 6) & ((POLEPAIR & 0x07) << 3) & ((MAXSPEED & 0x03) << 1) & (FG_ON & 0x01))));
}

int TC78B011FTG::setMaxSpeed(int maxSpeedMode)
{
    if ((maxSpeedMode & 3) != maxSpeedMode){
        return -10;
    }
    MAXSPEED = maxSpeedMode;
    return i2cWrite(14, (uint8_t)(0xFF & (((STBY_MODE & 0x01) << 7) & ((DIR & 0x01) << 6) & ((POLEPAIR & 0x07) << 3) & ((MAXSPEED & 0x03) << 1) & (FG_ON & 0x01))));
}

int TC78B011FTG::setSpeedOutputMode(bool outputMode)
{
    FG_ON = (int)outputMode;
    return i2cWrite(14, (uint8_t)(0xFF & (((STBY_MODE & 0x01) << 7) & ((DIR & 0x01) << 6) & ((POLEPAIR & 0x07) << 3) & ((MAXSPEED & 0x03) << 1) & (FG_ON & 0x01))));
}

int TC78B011FTG::setSpeedControlMode(bool mode)
{
    TSPSEL = (int)mode;
    return i2cWrite(15, (uint8_t)(0xFF & (((FGSEL & 0x07) << 5) & ((TSPSEL & 0x01) << 4) & ((SPDINV & 0x01) << 3) & ((LATCH & 0x01) << 2) & (OCPMASK & 0x03))));
}

int TC78B011FTG::setSpeedInversion(bool inverted)
{
    SPDINV = (int)inverted;
    return i2cWrite(15, (uint8_t)(0xFF & (((FGSEL & 0x07) << 5) & ((TSPSEL & 0x01) << 4) & ((SPDINV & 0x01) << 3) & ((LATCH & 0x01) << 2) & (OCPMASK & 0x03))));
}

int TC78B011FTG::setAutoRecoveryMode(bool autorecovery)
{
    LATCH = (int)autorecovery;
    return i2cWrite(15, (uint8_t)(0xFF & (((FGSEL & 0x07) << 5) & ((TSPSEL & 0x01) << 4) & ((SPDINV & 0x01) << 3) & ((LATCH & 0x01) << 2) & (OCPMASK & 0x03))));
}

int TC78B011FTG::setDigitalFiltering(int filter)
{
    if ((filter & 3) != filter){
        return -10;
    }
    OCPMASK = filter;
    return i2cWrite(15, (uint8_t)(0xFF & (((FGSEL & 0x07) << 5) & ((TSPSEL & 0x01) << 4) & ((SPDINV & 0x01) << 3) & ((LATCH & 0x01) << 2) & (OCPMASK & 0x03))));
}

int TC78B011FTG::setForcedComutationProtection(bool protectionDisable)
{
    LOCKDIS = (int)protectionDisable;
    return i2cWrite(16, (uint8_t)(0xFF & (((LOCKDIS & 0x01) << 7) & ((DUTYCHGLIMIT & 0x07) << 4) & ((STARTCURRENT & 0x07) << 1) & (OCPDIS & 0x01))));
}

int TC78B011FTG::setDutyChangeLimit(int dutyChange)
{
    if ((dutyChange & 7) != dutyChange){
        return -10;
    }
    DUTYCHGLIMIT = dutyChange;
    return i2cWrite(16, (uint8_t)(0xFF & (((LOCKDIS & 0x01) << 7) & ((DUTYCHGLIMIT & 0x07) << 4) & ((STARTCURRENT & 0x07) << 1) & (OCPDIS & 0x01))));
}

int TC78B011FTG::setStartCurrentLimit(int currentlimit)
{
    if ((currentlimit & 7) != currentlimit){
        return -10;
    }
    STARTCURRENT = currentlimit;
    return i2cWrite(16, (uint8_t)(0xFF & (((LOCKDIS & 0x01) << 7) & ((DUTYCHGLIMIT & 0x07) << 4) & ((STARTCURRENT & 0x07) << 1) & (OCPDIS & 0x01))));
}

int TC78B011FTG::setOCPDisable(bool OCPDisable)
{
    OCPDIS = (int)OCPDisable;
    return i2cWrite(16, (uint8_t)(0xFF & (((LOCKDIS & 0x01) << 7) & ((DUTYCHGLIMIT & 0x07) << 4) & ((STARTCURRENT & 0x07) << 1) & (OCPDIS & 0x01))));
}

int TC78B011FTG::setSoftStartRange(int ssRange)
{
    if ((ssRange & 3) != ssRange){
        return -10;
    }
    SS_ADD_SEL = ssRange;
    return i2cWrite(17, (uint8_t)(0xFF & (((SS_ADD_SEL & 0x03) << 6) & ((SS_UP_SEL & 0x03) << 4) & ((SS_DUTYCHGLIMIT & 0x07) << 1) & (DUTY_UP_TIME & 0x01))));
}

int TC78B011FTG::setSoftStartStepSize(int ssStepSize)
{
    if ((ssStepSize & 3) != ssStepSize){
        return -10;
    }
    SS_UP_SEL = ssStepSize;
    return i2cWrite(17, (uint8_t)(0xFF & (((SS_ADD_SEL & 0x03) << 6) & ((SS_UP_SEL & 0x03) << 4) & ((SS_DUTYCHGLIMIT & 0x07) << 1) & (DUTY_UP_TIME & 0x01))));
}

int TC78B011FTG::setSoftStartDutyChangeLimit(int dutyChange)
{
    if ((dutyChange & 7) != dutyChange){
        return -10;
    }
    SS_DUTYCHGLIMIT = dutyChange;
    return i2cWrite(17, (uint8_t)(0xFF & (((SS_ADD_SEL & 0x03) << 6) & ((SS_UP_SEL & 0x03) << 4) & ((SS_DUTYCHGLIMIT & 0x07) << 1) & (DUTY_UP_TIME & 0x01))));
}

int TC78B011FTG::setDutyUpTime(bool dutyTimeMode)
{
    DUTY_UP_TIME = (int)dutyTimeMode;
    return i2cWrite(17, (uint8_t)(0xFF & (((SS_ADD_SEL & 0x03) << 6) & ((SS_UP_SEL & 0x03) << 4) & ((SS_DUTYCHGLIMIT & 0x07) << 1) & (DUTY_UP_TIME & 0x01))));
}

int TC78B011FTG::setRPMChangeLimit(int RPMLimit)
{
    if ((RPMLimit * 7) != RPMLimit){
        return -10;
    }
    RPMLIMIT = RPMLimit;
    return i2cWrite(18, (uint8_t)(0xFF & (((RPMLIMIT & 0x07) << 5) & ((BRK_INV & 0x01) << 4) & ((ISD_MASK & 0x01) << 3) & ((RS_SEL & 0x03) << 1) & (ANTITHROUGH & 0x01))));
}

int TC78B011FTG::setBrakeInverted(bool brakeInverted)
{
    BRK_INV = (int)brakeInverted;
    return i2cWrite(18, (uint8_t)(0xFF & (((RPMLIMIT & 0x07) << 5) & ((BRK_INV & 0x01) << 4) & ((ISD_MASK & 0x01) << 3) & ((RS_SEL & 0x03) << 1) & (ANTITHROUGH & 0x01))));
}

int TC78B011FTG::setOvercurrentDetectionDisabled(bool OCPDisabled)
{
    ISD_MASK = (int)OCPDisabled;
    return i2cWrite(18, (uint8_t)(0xFF & (((RPMLIMIT & 0x07) << 5) & ((BRK_INV & 0x01) << 4) & ((ISD_MASK & 0x01) << 3) & ((RS_SEL & 0x03) << 1) & (ANTITHROUGH & 0x01))));
}

int TC78B011FTG::setRSAPinFiltering(int filterMode)
{
    if ((filterMode & 3) != filterMode){
        return -10;
    }
    RS_SEL = filterMode;
    return i2cWrite(18, (uint8_t)(0xFF & (((RPMLIMIT & 0x07) << 5) & ((BRK_INV & 0x01) << 4) & ((ISD_MASK & 0x01) << 3) & ((RS_SEL & 0x03) << 1) & (ANTITHROUGH & 0x01))));
}

int TC78B011FTG::setAutoDeadTimeControlDisabled(bool autoDeadTimeDisabled)
{
    ANTITHROUGH = (int)autoDeadTimeDisabled;
    return i2cWrite(18, (uint8_t)(0xFF & (((RPMLIMIT & 0x07) << 5) & ((BRK_INV & 0x01) << 4) & ((ISD_MASK & 0x01) << 3) & ((RS_SEL & 0x03) << 1) & (ANTITHROUGH & 0x01))));
}

int TC78B011FTG::setBrakeTime(int time)
{
    if ((time & 7) != time){
        return -10;
    }
    WAIT_TIME = time;
    return i2cWrite(19, (uint8_t)(0xFF & (((WAIT_TIME & 0x07) << 5) & ((WAIT_MODE & 0x01) << 4) & ((WAIT_CON & 0x01) << 3) & ((LOCK_BRK & 0x01) << 2) & ((ALERT_INV & 0x01) << 1) & (TSD_MASK & 0x01))));
}

int TC78B011FTG::setBrakeMode(bool mode)
{
    WAIT_MODE = (int)mode;
    return i2cWrite(19, (uint8_t)(0xFF & (((WAIT_TIME & 0x07) << 5) & ((WAIT_MODE & 0x01) << 4) & ((WAIT_CON & 0x01) << 3) & ((LOCK_BRK & 0x01) << 2) & ((ALERT_INV & 0x01) << 1) & (TSD_MASK & 0x01))));
}

int TC78B011FTG::setBrakeReleaseMode(bool mode)
{
    WAIT_CON = (int)mode;
    return i2cWrite(19, (uint8_t)(0xFF & (((WAIT_TIME & 0x07) << 5) & ((WAIT_MODE & 0x01) << 4) & ((WAIT_CON & 0x01) << 3) & ((LOCK_BRK & 0x01) << 2) & ((ALERT_INV & 0x01) << 1) & (TSD_MASK & 0x01))));
}

int TC78B011FTG::setErrorBrakingMode(bool mode)
{
    LOCK_BRK = (int)mode;
    return i2cWrite(19, (uint8_t)(0xFF & (((WAIT_TIME & 0x07) << 5) & ((WAIT_MODE & 0x01) << 4) & ((WAIT_CON & 0x01) << 3) & ((LOCK_BRK & 0x01) << 2) & ((ALERT_INV & 0x01) << 1) & (TSD_MASK & 0x01))));
}

int TC78B011FTG::setAlertInverted(bool inverted)
{
    ALERT_INV = (int)inverted;
    return i2cWrite(19, (uint8_t)(0xFF & (((WAIT_TIME & 0x07) << 5) & ((WAIT_MODE & 0x01) << 4) & ((WAIT_CON & 0x01) << 3) & ((LOCK_BRK & 0x01) << 2) & ((ALERT_INV & 0x01) << 1) & (TSD_MASK & 0x01))));
}

int TC78B011FTG::setThermalShutdownDisable(bool disabled)
{
    TSD_MASK = (int)disabled;
    return i2cWrite(19, (uint8_t)(0xFF & (((WAIT_TIME & 0x07) << 5) & ((WAIT_MODE & 0x01) << 4) & ((WAIT_CON & 0x01) << 3) & ((LOCK_BRK & 0x01) << 2) & ((ALERT_INV & 0x01) << 1) & (TSD_MASK & 0x01))));
}

int TC78B011FTG::setAutoRestartWaitTime(int time)
{
    if ((time & 7) != time){
        return -10;
    }
    TRE = time;
    return i2cWrite(20, (uint8_t)(0xFF & (((TRE & 0x07) << 5) & ((PRE_TIP & 0x03) << 3) & (TIP & 0x07))));
}

int TC78B011FTG::setFirstDCExcitationTime(int time)
{
    if ((time & 3) != time){
        return -10;
    }
    PRE_TIP = time;
    return i2cWrite(20, (uint8_t)(0xFF & (((TRE & 0x07) << 5) & ((PRE_TIP & 0x03) << 3) & (TIP & 0x07))));
}

int TC78B011FTG::setSecondDCExcitationTime(int time)
{
    if ((time & 7) != time){
        return -10;
    }
    TIP = time;
    return i2cWrite(20, (uint8_t)(0xFF & (((TRE & 0x07) << 5) & ((PRE_TIP & 0x03) << 3) & (TIP & 0x07))));
}

int TC78B011FTG::setLeadAngle(int angleSetting)
{
    if ((angleSetting & 15) != angleSetting){
        return -10;
    }
    LA = angleSetting;
    return i2cWrite(21, (uint8_t)(0xFF & (((LA & 0x0F) << 4) & ((FMAX & 0x03) << 2) & (FST & 0x03))));
}

int TC78B011FTG::setMaxRPM(int maxRPMMode)
{
    if ((maxRPMMode & 3) != maxRPMMode){
        return -10;
    }
    FMAX = maxRPMMode;
    return i2cWrite(21, (uint8_t)(0xFF & (((LA & 0x0F) << 4) & ((FMAX & 0x03) << 2) & (FST & 0x03))));
}

int TC78B011FTG::setForcedComutationFrequency(int comutationMode)
{
    if ((comutationMode & 3) != comutationMode){
        return -10;
    }
    FST = comutationMode;
    return i2cWrite(21, (uint8_t)(0xFF & (((LA & 0x0F) << 4) & ((FMAX & 0x03) << 2) & (FST & 0x03))));
}

int TC78B011FTG::setOutputPWMFrequencyMode(int frequencyMode)
{
    if ((frequencyMode & 7) != frequencyMode){
        return -10;
    }
    FPWM = frequencyMode;
    return i2cWrite(22, (uint8_t)(0xFF & (((FPWM & 0x07) << 2) & (DEADTIME & 0x03))));
}

int TC78B011FTG::setDeadtime(int deadtimeMode)
{
    if ((deadtimeMode & 3) != deadtimeMode){
        return -10;
    }
    DEADTIME = deadtimeMode;
    return i2cWrite(22, (uint8_t)(0xFF & (((FPWM & 0x07) << 2) & (DEADTIME & 0x03))));
}

int TC78B011FTG::setOvercurrentDetectionThreshold(bool thresholdMode)
{
    ISD_LVL = (int)thresholdMode;
    return i2cWrite(23, (uint8_t)(0xFF & (((ISD_LVL & 0x01) << 7) & ((OCP_LVL & 0x01) << 6) & ((SOURCE & 0x07) << 3) & (SINK & 0x07))));
}

int TC78B011FTG::setOvercurrentProtectionGain(bool OCPGain)
{
    OCP_LVL = OCPGain;
    return i2cWrite(23, (uint8_t)(0xFF & (((ISD_LVL & 0x01) << 7) & ((OCP_LVL & 0x01) << 6) & ((SOURCE & 0x07) << 3) & (SINK & 0x07))));
}

int TC78B011FTG::setGateSourceCurrent(int currentMode)
{
    if ((currentMode & 7) != currentMode){
        return -10;
    }
    SOURCE = currentMode;
    return i2cWrite(23, (uint8_t)(0xFF & (((ISD_LVL & 0x01) << 7) & ((OCP_LVL & 0x01) << 6) & ((SOURCE & 0x07) << 3) & (SINK & 0x07))));
}

int TC78B011FTG::setGateSinkCurrent(int currentMode)
{
    if ((currentMode & 7) != currentMode){
        return -10;
    }
    SINK = currentMode;
    return i2cWrite(23, (uint8_t)(0xFF & (((ISD_LVL & 0x01) << 7) & ((OCP_LVL & 0x01) << 6) & ((SOURCE & 0x07) << 3) & (SINK & 0x07))));

}

int TC78B011FTG::setIdleModeHysteresisVoltage(int hysteresisMode)
{
    if ((hysteresisMode & 3) != hysteresisMode){
        return -10;
    }
    return i2cWrite(24, (uint8_t)(0xFF & (((COMP_HYS & 0x03) << 6))));
}

int TC78B011FTG::setSpeed(int speed)
{
    if ((speed & 1023) != speed){
        return -10;
    }
    SPEED = speed;
    int status1 = i2cWrite(27, 0);
    int status2 = i2cWrite(28, 0);
    int status3 = i2cWrite(27, (uint8_t)(SPEED >> 2));
    int status4 = i2cWrite(28, (uint8_t)(SPEED << 6));
    return status1 < 0 ? status1 : status2 < 0 ? status2 : status3 < 0 ? status3 : status4 < 0 ? status4 : 0;
}

int TC78B011FTG::writeNVM()
{
    i2cWrite(86, 1);
    i2cWrite(87, 1);
    int waitTime = 0;
    // wait 100ms
    while (i2cRead(87) != 0){
        // wait 100ms
        waitTime++;
        if (waitTime > 10){
            return -1;
        }
    }
    return 0;
}
