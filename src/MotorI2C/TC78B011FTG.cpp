#include <thread>
#include <chrono>
#include <linux/i2c-dev.h>
#include <cstdlib>
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>
#include <sys/ioctl.h>
#include <ostream>
#include <iostream>
#include <cmath>
#include <cstring>
#include "TC78B011FTG.h"

char *numToBin(uint8_t num)
{
    char *bin = new char[8];
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

int strToInt(char *str)
{
    int len = strlen(str);
    if (len <= 0)
    {
        throw new std::invalid_argument("empty string");
    }
    int num = 0;
    int i = 0;
    if (str[0] == '-')
    {
        i++;
    }
    for (; i < len; i++)
    {
        switch (str[i])
        {
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
            num += (int)pow(10, len - i - 1) * ((uint8_t)str[i] - (uint8_t)'0');
            break;
        default:
            throw new std::invalid_argument("invalid character");
        }
    }
    if (str[0] == '-')
    {
        return -num;
    }
    return num;
}

int main(int argc, char *argv[])
{
    TC78B011FTG motor0 = TC78B011FTG(1, 0x29);
    // TC78B011FTG motor1 = TC78B011FTG(1, 0x32);
    int speedval = 0;
    int motor = 0;
    for (int i = 0; i < argc; i++)
    {
        if (strcmp(argv[i], "-g") == 0)
        {
            std::cout << "Speed: " << motor0.getSpeedSetting(true) << std::endl;
            return 0;
        }
        if (strcmp(argv[i], "-s") == 0)
        {
            if (!(i < (argc - 1)))
            {
                std::cout << "-s option requires a value" << std::endl;
                return -1;
            }
            speedval = strToInt(argv[i + 1]);
        }
        if (strcmp(argv[i], "-m") == 0)
        {
            if (!(i < (argc - 1)))
            {
                std::cout << "-m option requires a value" << std::endl;
                return -1;
            }
            motor = strToInt(argv[i + 1]);
        }
    }
    if ((speedval > 1023) || (speedval < 0))
    {
        std::cout << "speed must be in the range 0:1023" << std::endl;
        return -1;
    }
    switch (motor)
    {
    case 0:
        motor0.setSpeed(speedval);
        break;
    // case 1:
    //     motor1.setSpeed(speedval);
    //     break;
    default:
        std::cout << "selected motor is not available" << std::endl;
        throw new std::invalid_argument("motor number not recognised");
    }
    // std::cout << motorTest() << std::endl;
    return 0;
}

TC78B011FTG::TC78B011FTG(int i2cBus, int address)
    : i2cBusNumber(i2cBus),
      i2cAddress(address)
{
    NOSTOP = DEFAULT_NOSTOP;
    STOPDUTY = DEFAULT_STOPDUTY;
    CHANGEDUTY = DEFAULT_CHANGEDUTY;
    MAXDUTY = DEFAULT_MAXDUTY;
    STARTRPM = DEFAULT_STARTRPM;
    SPEEDSLOP = DEFAULT_SPEEDSLOP;
    SPEEDSLOP2 = DEFAULT_SPEEDSLOP2;
    KIX_REG_VALUE = DEFAULT_KIX;
    KI_REG_VALUE = DEFAULT_KI;
    KPX_REG_VALUE = DEFAULT_KPX;
    KP_REG_VALUE = DEFAULT_KP;
    STBY_MODE = DEFAULT_STBY_MODE;
    DIR = DEFAULT_DIR;
    POLEPAIR = DEFAULT_POLEPAIR;
    MAXSPEED = DEFAULT_MAXSPEED;
    FG_ON = DEFAULT_FG_ON;
    FGSEL = DEFAULT_FGSEL;
    TSPSEL = DEFAULT_TSPSEL;
    SPDINV = DEFAULT_SPDINV;
    LATCH = DEFAULT_LATCH;
    OCPMASK = DEFAULT_OCPMASK;
    LOCKDIS = DEFAULT_LOCKDIS;
    DUTYCHGLIMIT = DEFAULT_DUTYCHGLIMIT;
    STARTCURRENT = DEFAULT_STARTCURRENT;
    OCPDIS = DEFAULT_OCPDIS;
    SS_ADD_SEL = DEFAULT_SS_ADD_SEL;
    SS_UP_SEL = DEFAULT_SS_UP_SEL;
    SS_DUTYCHGLIMIT = DEFAULT_SS_DUTYCHGLIMIT;
    DUTY_UP_TIME = DEFAULT_DUTY_UP_TIME;
    RPMLIMIT = DEFAULT_RPMLIMIT;
    BRK_INV = DEFAULT_BRK_INV;
    ISD_MASK = DEFAULT_ISD_MASK;
    RS_SEL = DEFAULT_RS_SEL;
    ANTITHROUGH = DEFAULT_ANTITHROUGH;
    WAIT_TIME = DEFAULT_WAIT_TIME;
    WAIT_CON = DEFAULT_WAIT_CON;
    LOCK_BRK = DEFAULT_LOCK_BRK;
    ALERT_INV = DEFAULT_ALERT_INV;
    TSD_MASK = DEFAULT_TSD_MASK;
    TRE = DEFAULT_TRE;
    PRE_TIP = DEFAULT_PRE_TIP;
    TIP = DEFAULT_TIP;
    LA = DEFAULT_LA;
    FMAX = DEFAULT_FMAX;
    FST = DEFAULT_FST;
    FPWM = DEFAULT_FPWM;
    DEADTIME = DEFAULT_DEADTIME;
    ISD_LVL = DEFAULT_ISD_LVL;
    OCP_LVL = DEFAULT_OCP_LVL;
    SOURCE = DEFAULT_SOURCE;
    SINK = DEFAULT_SINK;
    COMP_HYS = DEFAULT_COMP_HYS;

    i2cWrite(2, (uint8_t)(0xFF & (((NOSTOP << NOSTOP_OFFSET) & NOSTOP_MASK) |
                                  ((STOPDUTY << STOPDUTY_OFFSET) & STOPDUTY_MASK))));
    i2cWrite(3, (uint8_t)(0xFF & ((STARTDUTY << STARTDUTY_OFFSET) & STARTDUTY_MASK)));
    i2cWrite(4, (uint8_t)(0xFF & ((CHANGEDUTY << CHANGEDUTY_OFFSET) & CHANGEDUTY_MASK)));
    i2cWrite(5, (uint8_t)(0xFF & ((MAXDUTY << MAXDUTY_OFFSET) & MAXDUTY_MASK)));
    i2cWrite(6, (uint8_t)(0xFF & (((STARTRPM << STARTRPM_OFFSET) & STARTRPM_MASK) >> 8)));
    i2cWrite(7, (uint8_t)(0xFF & ((STARTRPM << STARTRPM_OFFSET) & STARTRPM_MASK)));
    i2cWrite(8, (uint8_t)(0xFF & (((SPEEDSLOP << SPEEDSLOP_OFFSET) & SPEEDSLOP_MASK) >> 8)));
    i2cWrite(9, (uint8_t)(0xFF & ((((SPEEDSLOP << SPEEDSLOP_OFFSET) & SPEEDSLOP_MASK) & 0xFF) |
                                  ((MAXOPEN << MAXOPEN_OFFSET) & MAXOPEN_MASK) |
                                  ((MAXOFF << MAXOFF_OFFSET) & MAXOFF_MASK))));
    i2cWrite(10, (uint8_t)(0xFF & (((SPEEDSLOP2 << SPEEDSLOP2_OFFSET) & SPEEDSLOP2_MASK) >> 8)));
    i2cWrite(11, (uint8_t)(0xFF & ((((SPEEDSLOP2 << SPEEDSLOP2_OFFSET) & SPEEDSLOP2_MASK) & 0xFF) |
                                   ((VCP_MASK << VCP_MASK_OFFSET) & VCP_MASK_MASK) |
                                   ((OPENLOOP << OPENLOOP_OFFSET) & OPENLOOP_MASK))));
    i2cWrite(12, (uint8_t)(0xFF & (((KIX_REG_VALUE << KIX_OFFSET) & KIX_MASK) |
                                   ((KI_REG_VALUE << KI_OFFSET) & KI_MASK))));
    i2cWrite(13, (uint8_t)(0xFF & (((KPX_REG_VALUE << KPX_OFFSET) & KPX_MASK) |
                                   ((KP_REG_VALUE << KP_OFFSET) & KP_MASK))));
    i2cWrite(14, (uint8_t)(0xFF & (((STBY_MODE << STBY_MODE_OFFSET) & STBY_MODE_MASK) |
                                   ((DIR << DIR_OFFSET) & DIR_MASK) |
                                   ((POLEPAIR << POLEPAIR_OFFSET) & POLEPAIR_MASK) |
                                   ((MAXSPEED << MAXSPEED_OFFSET) & MAXSPEED_MASK) |
                                   ((FG_ON << FG_ON_OFFSET) & FG_ON_MASK))));
    i2cWrite(15, (uint8_t)(0xFF & (((FGSEL << FGSEL_OFFSET) & FGSEL_MASK) |
                                   ((TSPSEL << TSPSEL_OFFSET) & TSPSEL_MASK) |
                                   ((SPDINV << SPDINV_OFFSET) & SPDINV_MASK) |
                                   ((LATCH << LATCH_OFFSET) & LATCH_MASK) |
                                   ((OCPMASK << OCPMASK_OFFSET) & OCPMASK_MASK))));
    i2cWrite(16, (uint8_t)(0xFF & (((LOCKDIS << LOCKDIS_OFFSET) & LOCKDIS_MASK) |
                                   ((DUTYCHGLIMIT << DUTYCHGLIMIT_OFFSET) & DUTYCHGLIMIT_MASK) |
                                   ((STARTCURRENT << STARTCURRENT_OFFSET) & STARTCURRENT_MASK) |
                                   ((OCPDIS << OCPDIS_OFFSET) & OCPDIS_MASK))));
    i2cWrite(17, (uint8_t)(0xFF & (((SS_ADD_SEL << SS_ADD_SEL_OFFSET) & SS_ADD_SEL_MASK) |
                                   ((SS_UP_SEL << SS_UP_SEL_OFFSET) & SS_UP_SEL_MASK) |
                                   ((SS_DUTYCHGLIMIT << SS_DUTYCHGLIMIT_OFFSET) & SS_DUTYCHGLIMIT_MASK) |
                                   ((DUTY_UP_TIME << DUTY_UP_TIME_OFFSET) & DUTY_UP_TIME_MASK))));
    i2cWrite(18, (uint8_t)(0xFF & (((RPMLIMIT << RPMLIMIT_OFFSET) & RPMLIMIT_MASK) |
                                   ((BRK_INV << BRK_INV_OFFSET) & BRK_INV_MASK) |
                                   ((ISD_MASK << ISD_MASK_OFFSET) & ISD_MASK_MASK) |
                                   ((RS_SEL << RS_SEL_OFFSET) & RS_SEL_MASK) |
                                   ((ANTITHROUGH << ANTITHROUGH_OFFSET) & ANTITHROUGH_MASK))));
    i2cWrite(19, (uint8_t)(0xFF & (((WAIT_TIME << WAIT_TIME_OFFSET) & WAIT_TIME_MASK) |
                                   ((WAIT_MODE << WAIT_MODE_OFFSET) & WAIT_MODE_MASK) |
                                   ((WAIT_CON << WAIT_CON_OFFSET) & WAIT_CON_MASK) |
                                   ((LOCK_BRK << LOCK_BRK_OFFSET) & LOCK_BRK_MASK) |
                                   ((ALERT_INV << ALERT_INV_OFFSET) & ALERT_INV_MASK) |
                                   ((TSD_MASK << TSD_MASK_OFFSET) & TSD_MASK_MASK))));
    i2cWrite(20, (uint8_t)(0xFF & (((TRE << TRE_OFFSET) & TRE_MASK) |
                                   ((PRE_TIP << PRE_TIP_OFFSET) & PRE_TIP_MASK) |
                                   ((TIP << TIP_OFFSET) & TIP_MASK))));
    i2cWrite(21, (uint8_t)(0xFF & (((LA << LA_OFFSET) & LA_MASK) |
                                   ((FMAX << FMAX_OFFSET) & FMAX_MASK) |
                                   ((FST << FST_OFFSET) & FST_MASK))));
    i2cWrite(22, (uint8_t)(0xFF & (((FPWM << FPWM_OFFSET) & FPWM_MASK) |
                                   ((DEADTIME << DEADTIME_OFFSET) & DEADTIME_MASK))));
    i2cWrite(23, (uint8_t)(0xFF & (((ISD_LVL << ISD_LVL_OFFSET) & ISD_LVL_MASK) |
                                   ((OCP_LVL << OCP_LVL_OFFSET) & OCP_LVL_MASK) |
                                   ((SOURCE << SOURCE_OFFSET) & SOURCE_MASK) |
                                   ((SINK << SINK_OFFSET) & SINK_MASK))));
    i2cWrite(24, (uint8_t)(0xFF & (((COMP_HYS << COMP_HYS_OFFSET) & COMP_HYS_MASK))));
}

int TC78B011FTG::i2cWrite(int reg, uint8_t data)
{
    char filename[20];
    int i2cBus;
    sprintf(filename, "/dev/i2c-%d", i2cBusNumber);
    if ((i2cBus = open(filename, O_RDWR)) < 0)
        return -1;

    if (ioctl(i2cBus, I2C_SLAVE, i2cAddress) < 0)
        return -2;

    uint8_t databuffer[2];
    databuffer[0] = (uint8_t)(reg & 255);
    databuffer[1] = data;

    int i2cWriteResult = write(i2cBus, databuffer, 2);
    if (i2cWriteResult != 2)
    {
        std::cout << "i2cWrite error: " << errno << " on write of " << numToBin(data) << " to " << reg << ". Write returned: " << i2cWriteResult << std::endl;
        return -3;
    }
    close(i2cBus);
    return 0;
}

int TC78B011FTG::i2cRead(int reg)
{
    char filename[20];
    int i2cBus;
    sprintf(filename, "/dev/i2c-%d", i2cBusNumber);
    if ((i2cBus = open(filename, O_RDWR)) < 0)
        return -1;

    if (ioctl(i2cBus, I2C_SLAVE, i2cAddress) < 0)
        return -2;

    uint8_t outbuf[] = {(uint8_t)reg};
    int i2cReadResult = write(i2cBus, outbuf, 1);
    if (i2cReadResult != 1)
    {
        std::cout << "i2cRead error: " << errno << " on read of reg: " << reg << ". Read returned: " << i2cReadResult << std::endl;
        return -4;
    }

    uint8_t buf[20];
    if (read(i2cBus, buf, 1) != 1)
    {
        close(i2cBus);
        return -3;
    }
    else
    {
        close(i2cBus);
        return buf[0];
    }
}

int TC78B011FTG::setNoStop(bool nostop)
{
    NOSTOP = (int)nostop;
    return i2cWrite(NOSTOP_REGISTER, (uint8_t)(0xFF & (((NOSTOP << NOSTOP_OFFSET) & NOSTOP_MASK) | ((STOPDUTY << STOPDUTY_OFFSET) & STOPDUTY_MASK))));
}

int TC78B011FTG::getNoStop(bool fromChip)
{
    if (!fromChip)
    {
        return NOSTOP;
    }
    int regVal = i2cRead(NOSTOP_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & NOSTOP_MASK) >> NOSTOP_OFFSET;
}

int TC78B011FTG::setStopDuty(int stopduty)
{
    if ((stopduty & (STOPDUTY_MASK >> STOPDUTY_OFFSET)) != stopduty)
    {
        return -10;
    }
    STOPDUTY = stopduty;
    return i2cWrite(STOPDUTY_REGISTER, (uint8_t)(0xFF & (((NOSTOP << NOSTOP_OFFSET) & NOSTOP_MASK) | ((STOPDUTY << STOPDUTY_OFFSET) & STOPDUTY_MASK))));
}

int TC78B011FTG::getStopDuty(bool fromChip)
{
    if (!fromChip)
    {
        return STOPDUTY;
    }
    int regVal = i2cRead(STOPDUTY_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & STOPDUTY_MASK) >> STOPDUTY_OFFSET;
}

int TC78B011FTG::setStartDuty(int startduty)
{
    if ((startduty & (STARTDUTY_MASK >> STARTDUTY_OFFSET)) != startduty)
    {
        return -10;
    }
    STARTDUTY = startduty;
    return i2cWrite(STARTDUTY_REGISTER, (uint8_t)(0xFF & ((STARTDUTY << STARTDUTY_OFFSET) & STARTDUTY_MASK)));
}

int TC78B011FTG::getStartDuty(bool fromChip)
{
    if (!fromChip)
    {
        return STARTDUTY;
    }
    int regVal = i2cRead(STARTDUTY_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal << STARTDUTY_OFFSET) & STARTDUTY_OFFSET;
}

int TC78B011FTG::setChangeDuty(int changeduty)
{
    if ((changeduty & (CHANGEDUTY_MASK >> CHANGEDUTY_OFFSET)) != changeduty)
    {
        return -10;
    }
    CHANGEDUTY = changeduty;
    return i2cWrite(CHANGEDUTY_REGISTER, (uint8_t)(0xFF & ((CHANGEDUTY << CHANGEDUTY_OFFSET) & CHANGEDUTY_MASK)));
}
int TC78B011FTG::getChangeDuty(bool fromChip)
{
    if (!fromChip)
    {
        return CHANGEDUTY;
    }
    int regVal = i2cRead(CHANGEDUTY_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & CHANGEDUTY_MASK) >> CHANGEDUTY_OFFSET;
}

int TC78B011FTG::setMaxDuty(int maxduty)
{
    if ((maxduty & (MAXDUTY_MASK >> MAXDUTY_OFFSET)) != maxduty)
    {
        return -10;
    }
    MAXDUTY = maxduty;
    return i2cWrite(MAXDUTY_REGISTER, (uint8_t)(0xFF & ((MAXDUTY << MAXDUTY_OFFSET) & MAXDUTY_MASK)));
}

int TC78B011FTG::getMaxDuty(bool fromChip)
{
    if (!fromChip)
    {
        return MAXDUTY;
    }
    int regVal = i2cRead(MAXDUTY_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & MAXDUTY_MASK) >> MAXDUTY_OFFSET;
}

int TC78B011FTG::setStartRPM(int startRPM)
{
    if ((startRPM & (STARTRPM_MASK >> STARTRPM_OFFSET)) != startRPM)
    {
        return -10;
    }
    STARTRPM = startRPM;
    int status1 = i2cWrite(STARTRPM_REGISTER_H, (uint8_t)(0xFF & (((STARTRPM << STARTRPM_OFFSET) & STARTRPM_MASK) >> 8)));
    int status2 = i2cWrite(STARTRPM_REGISTER_L, (uint8_t)(0xFF & (((STARTRPM << STARTRPM_OFFSET) & STARTRPM_MASK) | ((MAXDUTYHYS << MAXDUTYHYS_OFFSET) & MAXDUTYHYS_MASK))));
    return status1 < 0 ? status1 : status2 < 0 ? status2
                                               : 0;
}

int TC78B011FTG::getStartRPM(bool fromChip)
{
    if (!fromChip)
    {
        return STARTRPM;
    }
    int regValH = i2cRead(STARTRPM_REGISTER_H);
    if (regValH < 0)
    {
        return regValH;
    }
    int regValL = i2cRead(STARTRPM_REGISTER_L);
    if (regValL < 0)
    {
        return regValL;
    }
    int regVal = (regValH << 8) | regValL;
    return (regVal & STARTRPM_MASK) >> STARTRPM_OFFSET;
}

int TC78B011FTG::setMaxDutyHysteresis(int hysteresis)
{
    if ((hysteresis & (MAXDUTYHYS_MASK >> MAXDUTYHYS_OFFSET)) != hysteresis)
    {
        return -10;
    }
    MAXDUTYHYS = hysteresis;
    return i2cWrite(MAXDUTYHYS_REGISTER, (uint8_t)(0xFF & (((STARTRPM << STARTRPM_OFFSET) & STARTRPM_MASK) | ((MAXDUTYHYS << MAXDUTYHYS_OFFSET) & MAXDUTYHYS_MASK))));
}

int TC78B011FTG::getMaxDutyHysteresis(bool fromChip)
{
    if (!fromChip)
    {
        return MAXDUTYHYS;
    }
    int regVal = i2cRead(MAXDUTYHYS_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & MAXDUTYHYS_MASK) >> MAXDUTYHYS_OFFSET;
}

int TC78B011FTG::setSpeedSlope(int speedslope)
{
    std::cout << speedslope << std::endl;
    if ((speedslope & (SPEEDSLOP_MASK >> SPEEDSLOP_OFFSET)) != speedslope)
    {
        return -10;
    }
    SPEEDSLOP = speedslope;
    int status1 = i2cWrite(SPEEDSLOP_REGISTER_H, (uint8_t)(0xFF & (((SPEEDSLOP << SPEEDSLOP_OFFSET) & SPEEDSLOP_MASK) >> 8)));
    int status2 = i2cWrite(SPEEDSLOP_REGISTER_L, (uint8_t)(0xFF & (((SPEEDSLOP << SPEEDSLOP_OFFSET) & SPEEDSLOP_MASK) | ((MAXOPEN << MAXOPEN_OFFSET) & MAXOPEN_MASK) | ((MAXOFF << MAXOFF_OFFSET) & MAXOFF_MASK))));
    return status1 < 0 ? status1 : status2 < 0 ? status2
                                               : 0;
}
int TC78B011FTG::getSpeedSlope(bool fromChip)
{
    if (!fromChip)
    {
        return SPEEDSLOP;
    }
    int regValH = i2cRead(SPEEDSLOP_REGISTER_H);
    if (regValH < 0)
    {
        return regValH;
    }
    int regValL = i2cRead(SPEEDSLOP_REGISTER_L);
    if (regValL < 0)
    {
        return regValL;
    }
    int regVal = (regValH << 8) | regValL;
    return (regVal & SPEEDSLOP_MASK) >> SPEEDSLOP_OFFSET;
}

int TC78B011FTG::setMaxOpen(bool maxopen)
{
    MAXOPEN = (int)maxopen;
    return i2cWrite(MAXOPEN_REGISTER, (uint8_t)(0xFF & (((SPEEDSLOP << SPEEDSLOP_OFFSET) & SPEEDSLOP_MASK) | ((MAXOPEN << MAXOPEN_OFFSET) & MAXOPEN_MASK) | ((MAXOFF << MAXOFF_OFFSET) & MAXOFF_MASK))));
}

int TC78B011FTG::getMaxOpen(bool fromChip)
{
    if (!fromChip)
    {
        return MAXOPEN;
    }
    int regVal = i2cRead(MAXOPEN_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & MAXOPEN_MASK) >> MAXOPEN_OFFSET;
}

int TC78B011FTG::setMaxOff(bool maxoff)
{
    MAXOFF = (int)maxoff;
    return i2cWrite(MAXOFF_REGISTER, (uint8_t)(0xFF & (((SPEEDSLOP << SPEEDSLOP_OFFSET) & SPEEDSLOP_MASK) | ((MAXOPEN << MAXOPEN_OFFSET) & MAXOPEN_MASK) | ((MAXOFF << MAXOFF_OFFSET) & MAXOFF_MASK))));
}

int TC78B011FTG::getMaxOff(bool fromChip)
{
    if (!fromChip)
    {
        return MAXOFF;
    }
    int regVal = i2cRead(MAXOFF_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & MAXOFF_MASK) >> MAXOFF_OFFSET;
}

int TC78B011FTG::setSpeedSlope2(int speedslope2)
{
    if ((speedslope2 & (SPEEDSLOP2_MASK >> SPEEDSLOP2_OFFSET)) != speedslope2)
    {
        return -10;
    }
    SPEEDSLOP2 = speedslope2;
    int status1 = i2cWrite(SPEEDSLOP2_REGISTER_H, (uint8_t)(0xFF & (((SPEEDSLOP2 << SPEEDSLOP2_OFFSET) & SPEEDSLOP2_MASK) >> 8)));
    int status2 = i2cWrite(SPEEDSLOP2_REGISTER_L, (uint8_t)(0xFF & (((SPEEDSLOP2 << SPEEDSLOP2_OFFSET) & SPEEDSLOP2_MASK) | ((VCP_MASK << VCP_MASK_OFFSET) & VCP_MASK_MASK) | ((OPENLOOP << OPENLOOP_OFFSET) & OPENLOOP_MASK))));
    return status1 < 0 ? status1 : status2 < 0 ? status2
                                               : 0;
}
int TC78B011FTG::getSpeedSlope2(bool fromChip)
{
    if (!fromChip)
    {
        return SPEEDSLOP2;
    }
    int regValH = i2cRead(SPEEDSLOP2_REGISTER_H);
    if (regValH < 0)
    {
        return regValH;
    }
    int regValL = i2cRead(SPEEDSLOP2_REGISTER_L);
    if (regValL < 0)
    {
        return regValL;
    }
    int regVal = (regValH << 8) | regValL;
    return (regVal & SPEEDSLOP2_MASK) >> SPEEDSLOP2_OFFSET;
}

int TC78B011FTG::setChargePumpVCP(bool VCP)
{
    VCP_MASK = (int)VCP;
    return i2cWrite(VCP_MASK_REGISTER, (uint8_t)(0xFF & (((SPEEDSLOP2 << SPEEDSLOP2_OFFSET) & SPEEDSLOP2_MASK) | ((VCP_MASK << VCP_MASK_OFFSET) & VCP_MASK_MASK) | ((OPENLOOP << OPENLOOP_OFFSET) & OPENLOOP_MASK))));
}
int TC78B011FTG::getChargePumpVCP(bool fromChip)
{
    if (!fromChip)
    {
        return VCP_MASK;
    }
    int regVal = i2cRead(VCP_MASK_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & VCP_MASK_MASK) >> VCP_MASK_OFFSET;
}

int TC78B011FTG::setOpenLoop(bool openLoop)
{
    OPENLOOP = (int)openLoop;
    return i2cWrite(OPENLOOP_REGISTER, (uint8_t)(0xFF & (((SPEEDSLOP2 << SPEEDSLOP2_OFFSET) & SPEEDSLOP2_MASK) | ((VCP_MASK << VCP_MASK_OFFSET) & VCP_MASK_MASK) | ((OPENLOOP << OPENLOOP_OFFSET) & OPENLOOP_MASK))));
}
int TC78B011FTG::getOpenLoop(bool fromChip)
{
    if (!fromChip)
    {
        return OPENLOOP;
    }
    int regVal = i2cRead(OPENLOOP_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & OPENLOOP_MASK) >> OPENLOOP_OFFSET;
}

int TC78B011FTG::setPID(bool KIX, int KI, bool KPX, int KP)
{
    if (((KI & (KI_MASK >> KI_OFFSET)) != KI) || ((KP & (KP_MASK >> KP_OFFSET)) != KP))
    {
        return -10;
    }
    KIX_REG_VALUE = (int)KIX;
    KI_REG_VALUE = KI;
    KPX_REG_VALUE = (int)KPX;
    KP_REG_VALUE = KP;
    int status1 = i2cWrite(KI_REGISTER, (uint8_t)(0xFF & (((KIX_REG_VALUE << KIX_OFFSET) & KIX_MASK) | ((KI_REG_VALUE << KI_OFFSET) & KI_MASK))));
    int status2 = i2cWrite(KP_REGISTER, (uint8_t)(0xFF & (((KPX_REG_VALUE << KPX_OFFSET) & KPX_MASK) | ((KP_REG_VALUE << KP_OFFSET) & KI_MASK))));
    return status1 < 0 ? status1 : status2 < 0 ? status2
                                               : 0;
}
int TC78B011FTG::setKIX(bool KIX)
{
    KIX_REG_VALUE = (int)KIX;
    return i2cWrite(KIX_REGISTER, (uint8_t)(0xFF & (((KIX_REG_VALUE << KIX_OFFSET) & KIX_MASK) | ((KI_REG_VALUE << KI_OFFSET) & KI_MASK))));
}
int TC78B011FTG::setKI(int KI)
{
    if ((KI & (KI_MASK >> KI_OFFSET)) != KI)
    {
        return -10;
    }
    return i2cWrite(KI_REGISTER, (uint8_t)(0xFF & (((KIX_REG_VALUE << KIX_OFFSET) & KIX_MASK) | ((KI_REG_VALUE << KI_OFFSET) & KI_MASK))));
    ;
}
int TC78B011FTG::setKPX(bool KPX)
{
    KPX_REG_VALUE = (int)KPX;
    return i2cWrite(KPX_REGISTER, (uint8_t)(0xFF & (((KPX_REG_VALUE << KPX_OFFSET) & KPX_MASK) | ((KP_REG_VALUE << KP_OFFSET) & KI_MASK))));
    ;
}
int TC78B011FTG::setKP(int KP)
{
    if ((KP & (KP_MASK >> KP_OFFSET)) != KP)
    {
        return -10;
    }
    return i2cWrite(KP_REGISTER, (uint8_t)(0xFF & (((KPX_REG_VALUE << KPX_OFFSET) & KPX_MASK) | ((KP_REG_VALUE << KP_OFFSET) & KI_MASK))));
    ;
}
int TC78B011FTG::getKIX(bool fromChip)
{
    if (!fromChip)
    {
        return KIX_REG_VALUE;
    }
    int regVal = i2cRead(KIX_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & KIX_MASK) >> KIX_OFFSET;
}
int TC78B011FTG::getKI(bool fromChip)
{
    if (!fromChip)
    {
        return KI_REG_VALUE;
    }
    int regVal = i2cRead(KI_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & KI_MASK) >> KI_OFFSET;
}
int TC78B011FTG::getKPX(bool fromChip)
{
    if (!fromChip)
    {
        return KPX_REG_VALUE;
    }
    int regVal = i2cRead(KPX_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & KPX_MASK) >> KPX_OFFSET;
}
int TC78B011FTG::getKP(bool fromChip)
{
    if (!fromChip)
    {
        return KP_REG_VALUE;
    }
    int regVal = i2cRead(KP_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & KP_MASK) >> KP_OFFSET;
}

int TC78B011FTG::setStandbyMode(bool standbymode)
{
    STBY_MODE = (int)standbymode;
    return i2cWrite(STBY_MODE_REGISTER, (uint8_t)(0xFF & (((STBY_MODE << STBY_MODE_OFFSET) & STBY_MODE_MASK) | ((DIR << DIR_OFFSET) & DIR_MASK) | ((POLEPAIR << POLEPAIR_OFFSET) & POLEPAIR_MASK) | ((MAXSPEED << MAXSPEED_OFFSET) & MAXSPEED_MASK) | ((FG_ON << FG_ON_OFFSET) & FG_ON_MASK))));
}
int TC78B011FTG::getStandbyMode(bool fromChip)
{
    if (!fromChip)
    {
        return STBY_MODE;
    }
    int regVal = i2cRead(STBY_MODE_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & STBY_MODE_MASK) >> STBY_MODE_OFFSET;
}

int TC78B011FTG::setDIRMode(bool dirMode)
{
    DIR = (int)dirMode;
    return i2cWrite(DIR_REGISTER, (uint8_t)(0xFF & (((STBY_MODE << STBY_MODE_OFFSET) & STBY_MODE_MASK) | ((DIR << DIR_OFFSET) & DIR_MASK) | ((POLEPAIR << POLEPAIR_OFFSET) & POLEPAIR_MASK) | ((MAXSPEED << MAXSPEED_OFFSET) & MAXSPEED_MASK) | ((FG_ON << FG_ON_OFFSET) & FG_ON_MASK))));
}
int TC78B011FTG::getDIRMode(bool fromChip)
{
    if (!fromChip)
    {
        return DIR;
    }
    int regVal = i2cRead(DIR_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & DIR_MASK) >> DIR_OFFSET;
}

int TC78B011FTG::setPoles(int polesMode)
{
    if ((polesMode & (POLEPAIR_MASK >> POLEPAIR_OFFSET)) != polesMode)
    {
        return -10;
    }
    POLEPAIR = polesMode;
    return i2cWrite(POLEPAIR_REGISTER, (uint8_t)(0xFF & (((STBY_MODE << STBY_MODE_OFFSET) & STBY_MODE_MASK) | ((DIR << DIR_OFFSET) & DIR_MASK) | ((POLEPAIR << POLEPAIR_OFFSET) & POLEPAIR_MASK) | ((MAXSPEED << MAXSPEED_OFFSET) & MAXSPEED_MASK) | ((FG_ON << FG_ON_OFFSET) & FG_ON_MASK))));
}
int TC78B011FTG::getPoles(bool fromChip)
{
    if (!fromChip)
    {
        return POLEPAIR;
    }
    int regVal = i2cRead(POLEPAIR_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & POLEPAIR_MASK) >> POLEPAIR_OFFSET;
}

int TC78B011FTG::setMaxSpeed(int maxSpeedMode)
{
    if ((maxSpeedMode & (MAXSPEED_MASK >> MAXSPEED_OFFSET)) != maxSpeedMode)
    {
        return -10;
    }
    MAXSPEED = maxSpeedMode;
    return i2cWrite(MAXSPEED_REGISTER, (uint8_t)(0xFF & (((STBY_MODE << STBY_MODE_OFFSET) & STBY_MODE_MASK) | ((DIR << DIR_OFFSET) & DIR_MASK) | ((POLEPAIR << POLEPAIR_OFFSET) & POLEPAIR_MASK) | ((MAXSPEED << MAXSPEED_OFFSET) & MAXSPEED_MASK) | ((FG_ON << FG_ON_OFFSET) & FG_ON_MASK))));
}
int TC78B011FTG::getMaxSpeed(bool fromChip)
{
    if (!fromChip)
    {
        return MAXSPEED;
    }
    int regVal = i2cRead(MAXSPEED_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal * MAXSPEED_MASK) >> MAXSPEED_OFFSET;
}

int TC78B011FTG::setSpeedOutputMode(bool outputMode)
{
    FG_ON = (int)outputMode;
    return i2cWrite(FG_ON_REGISTER, (uint8_t)(0xFF & (((STBY_MODE << STBY_MODE_OFFSET) & STBY_MODE_MASK) | ((DIR << DIR_OFFSET) & DIR_MASK) | ((POLEPAIR << POLEPAIR_OFFSET) & POLEPAIR_MASK) | ((MAXSPEED << MAXSPEED_OFFSET) & MAXSPEED_MASK) | ((FG_ON << FG_ON_OFFSET) & FG_ON_MASK))));
}
int TC78B011FTG::getSpeedOutputMode(bool fromChip)
{
    if (!fromChip)
    {
        return FG_ON;
    }
    int regVal = i2cRead(FG_ON_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & FG_ON_MASK) >> FG_ON_OFFSET;
}

int TC78B011FTG::setSpeedControlMode(bool mode)
{
    TSPSEL = (int)mode;
    return i2cWrite(TSPSEL_REGISTER, (uint8_t)(0xFF & (((FGSEL << FGSEL_OFFSET) & FGSEL_MASK) | ((TSPSEL << TSPSEL_OFFSET) & TSPSEL_MASK) | ((SPDINV << SPDINV_OFFSET) & SPDINV_MASK) | ((LATCH << LATCH_OFFSET) & LATCH_MASK) | ((OCPMASK << OCPMASK_OFFSET) & OCPMASK_MASK))));
}
int TC78B011FTG::getSpeedControlMode(bool fromChip)
{
    if (!fromChip)
    {
        return TSPSEL;
    }
    int regVal = i2cRead(TSPSEL_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & TSPSEL_MASK) >> TSPSEL_OFFSET;
}

int TC78B011FTG::setSpeedInversion(bool inverted)
{
    SPDINV = (int)inverted;
    return i2cWrite(SPDINV_REGISTER, (uint8_t)(0xFF & (((FGSEL << FGSEL_OFFSET) & FGSEL_MASK) | ((TSPSEL << TSPSEL_OFFSET) & TSPSEL_MASK) | ((SPDINV << SPDINV_OFFSET) & SPDINV_MASK) | ((LATCH << LATCH_OFFSET) & LATCH_MASK) | ((OCPMASK << OCPMASK_OFFSET) & OCPMASK_MASK))));
}
int TC78B011FTG::getSpeedInversion(bool fromChip)
{
    if (!fromChip)
    {
        return SPDINV;
    }
    int regVal = i2cRead(SPDINV_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & SPDINV_MASK) >> SPDINV_OFFSET;
}

int TC78B011FTG::setAutoRecoveryMode(bool autorecovery)
{
    LATCH = (int)autorecovery;
    return i2cWrite(LATCH_REGISTER, (uint8_t)(0xFF & (((FGSEL << FGSEL_OFFSET) & FGSEL_MASK) | ((TSPSEL << TSPSEL_OFFSET) & TSPSEL_MASK) | ((SPDINV << SPDINV_OFFSET) & SPDINV_MASK) | ((LATCH << LATCH_OFFSET) & LATCH_MASK) | ((OCPMASK << OCPMASK_OFFSET) & OCPMASK_MASK))));
}
int TC78B011FTG::getAutoRecoveryMode(bool fromChip)
{
    if (!fromChip)
    {
        return LATCH;
    }
    int regVal = i2cRead(LATCH_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & LATCH_MASK) >> LATCH_OFFSET;
}

int TC78B011FTG::setDigitalFiltering(int filter)
{
    if ((filter & (OCPMASK_MASK >> OCPMASK_OFFSET)) != filter)
    {
        return -10;
    }
    OCPMASK = filter;
    return i2cWrite(15, (uint8_t)(0xFF & (((FGSEL << FGSEL_OFFSET) & FGSEL_MASK) | ((TSPSEL << TSPSEL_OFFSET) & TSPSEL_MASK) | ((SPDINV << SPDINV_OFFSET) & SPDINV_MASK) | ((LATCH << LATCH_OFFSET) & LATCH_MASK) | ((OCPMASK << OCPMASK_OFFSET) & OCPMASK_MASK))));
}
int TC78B011FTG::getDigitalFiltering(bool fromChip)
{
    if (!fromChip)
    {
        return OCPMASK;
    }
    int regVal = i2cRead(OCPMASK_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & OCPMASK_MASK) >> OCPMASK_OFFSET;
}

int TC78B011FTG::setForcedComutationProtection(bool protectionDisable)
{
    LOCKDIS = (int)protectionDisable;
    return i2cWrite(LOCKDIS_REGISTER, (uint8_t)(0xFF & (((LOCKDIS << LOCKDIS_OFFSET) & LOCKDIS_MASK) | ((DUTYCHGLIMIT << DUTYCHGLIMIT_OFFSET) & DUTYCHGLIMIT_MASK) | ((STARTCURRENT << STARTCURRENT_OFFSET) & STARTCURRENT_MASK) | ((OCPDIS << OCPDIS_OFFSET) & OCPDIS_MASK))));
}
int TC78B011FTG::getForcedComutationProtection(bool fromChip)
{
    if (!fromChip)
    {
        return LOCKDIS;
    }
    int regVal = i2cRead(LOCKDIS_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & LOCKDIS_MASK) >> LOCKDIS_OFFSET;
}

int TC78B011FTG::setDutyChangeLimit(int dutyChange)
{
    if ((dutyChange & (DUTYCHGLIMIT_MASK >> DUTYCHGLIMIT_OFFSET)) != dutyChange)
    {
        return -10;
    }
    DUTYCHGLIMIT = dutyChange;
    return i2cWrite(DUTYCHGLIMIT_REGISTER, (uint8_t)(0xFF & (((LOCKDIS << LOCKDIS_OFFSET) & LOCKDIS_MASK) | ((DUTYCHGLIMIT << DUTYCHGLIMIT_OFFSET) & DUTYCHGLIMIT_MASK) | ((STARTCURRENT << STARTCURRENT_OFFSET) & STARTCURRENT_MASK) | ((OCPDIS << OCPDIS_OFFSET) & OCPDIS_MASK))));
}
int TC78B011FTG::getDutyChangeLimit(bool fromChip)
{
    if (!fromChip)
    {
        return DUTYCHGLIMIT;
    }
    int regVal = i2cRead(DUTYCHGLIMIT_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & DUTYCHGLIMIT_MASK) >> DUTYCHGLIMIT_OFFSET;
}

int TC78B011FTG::setStartCurrentLimit(int currentlimit)
{
    if ((currentlimit & (STARTCURRENT_MASK >> STARTCURRENT_OFFSET)) != currentlimit)
    {
        return -10;
    }
    STARTCURRENT = currentlimit;
    return i2cWrite(STARTCURRENT_REGISTER, (uint8_t)(0xFF & (((LOCKDIS << LOCKDIS_OFFSET) & LOCKDIS_MASK) | ((DUTYCHGLIMIT << DUTYCHGLIMIT_OFFSET) & DUTYCHGLIMIT_MASK) | ((STARTCURRENT << STARTCURRENT_OFFSET) & STARTCURRENT_MASK) | ((OCPDIS << OCPDIS_OFFSET) & OCPDIS_MASK))));
}
int TC78B011FTG::getStartCurrentLimit(bool fromChip)
{
    if (!fromChip)
    {
        return STARTCURRENT;
    }
    int regVal = i2cRead(STARTCURRENT_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & STARTCURRENT_MASK) >> STARTCURRENT_OFFSET;
}

int TC78B011FTG::setOCPDisable(bool OCPDisable)
{
    OCPDIS = (int)OCPDisable;
    return i2cWrite(OCPDIS_REGISTER, (uint8_t)(0xFF & (((LOCKDIS << LOCKDIS_OFFSET) & LOCKDIS_MASK) | ((DUTYCHGLIMIT << DUTYCHGLIMIT_OFFSET) & DUTYCHGLIMIT_MASK) | ((STARTCURRENT << STARTCURRENT_OFFSET) & STARTCURRENT_MASK) | ((OCPDIS << OCPDIS_OFFSET) & OCPDIS_MASK))));
}
int TC78B011FTG::getOCPDisable(bool fromChip)
{
    if (!fromChip)
    {
        return OCPDIS;
    }
    int regVal = i2cRead(OCPDIS_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & OCPDIS_MASK) >> OCPDIS_OFFSET;
}

int TC78B011FTG::setSoftStartRange(int ssRange)
{
    if ((ssRange & (SS_ADD_SEL_MASK >> SS_ADD_SEL_OFFSET)) != ssRange)
    {
        return -10;
    }
    SS_ADD_SEL = ssRange;
    return i2cWrite(SS_ADD_SEL_REGISTER, (uint8_t)(0xFF & (((SS_ADD_SEL << SS_ADD_SEL_OFFSET) & SS_ADD_SEL_MASK) | ((SS_UP_SEL << SS_UP_SEL_OFFSET) & SS_UP_SEL_MASK) | ((SS_DUTYCHGLIMIT << SS_DUTYCHGLIMIT_OFFSET) & SS_DUTYCHGLIMIT_MASK) | ((DUTY_UP_TIME << DUTY_UP_TIME_OFFSET) & DUTY_UP_TIME_MASK))));
}
int TC78B011FTG::getSoftStartRange(bool fromChip)
{
    if (!fromChip)
    {
        return SS_ADD_SEL;
    }
    int regVal = i2cRead(SS_ADD_SEL_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & SS_ADD_SEL_MASK) >> SS_ADD_SEL_OFFSET;
}

int TC78B011FTG::setSoftStartStepSize(int ssStepSize)
{
    if ((ssStepSize & 3) != ssStepSize)
    {
        return -10;
    }
    SS_UP_SEL = ssStepSize;
    return i2cWrite(SS_UP_SEL_REGISTER, (uint8_t)(0xFF & (((SS_ADD_SEL << SS_ADD_SEL_OFFSET) & SS_ADD_SEL_MASK) | ((SS_UP_SEL << SS_UP_SEL_OFFSET) & SS_UP_SEL_MASK) | ((SS_DUTYCHGLIMIT << SS_DUTYCHGLIMIT_OFFSET) & SS_DUTYCHGLIMIT_MASK) | ((DUTY_UP_TIME << DUTY_UP_TIME_OFFSET) & DUTY_UP_TIME_MASK))));
}
int TC78B011FTG::getSoftStartStepSize(bool fromChip)
{
    if (!fromChip)
    {
        return SS_UP_SEL;
    }
    int regVal = i2cRead(SS_UP_SEL_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & SS_UP_SEL_MASK) >> SS_UP_SEL_OFFSET;
}

int TC78B011FTG::setSoftStartDutyChangeLimit(int dutyChange)
{
    if ((dutyChange & (SS_DUTYCHGLIMIT_MASK >> SS_DUTYCHGLIMIT_OFFSET)) != dutyChange)
    {
        return -10;
    }
    SS_DUTYCHGLIMIT = dutyChange;
    return i2cWrite(SS_DUTYCHGLIMIT_REGISTER, (uint8_t)(0xFF & (((SS_ADD_SEL << SS_ADD_SEL_OFFSET) & SS_ADD_SEL_MASK) | ((SS_UP_SEL << SS_UP_SEL_OFFSET) & SS_UP_SEL_MASK) | ((SS_DUTYCHGLIMIT << SS_DUTYCHGLIMIT_OFFSET) & SS_DUTYCHGLIMIT_MASK) | ((DUTY_UP_TIME << DUTY_UP_TIME_OFFSET) & DUTY_UP_TIME_MASK))));
}
int TC78B011FTG::getSoftStartDutyChangeLimit(bool fromChip)
{
    if (!fromChip)
    {
        return SS_DUTYCHGLIMIT;
    }
    int regVal = i2cRead(SS_DUTYCHGLIMIT_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & SS_DUTYCHGLIMIT_MASK) >> SS_DUTYCHGLIMIT_OFFSET;
}

int TC78B011FTG::setDutyUpTime(bool dutyTimeMode)
{
    DUTY_UP_TIME = (int)dutyTimeMode;
    return i2cWrite(DUTY_UP_TIME_REGISTER, (uint8_t)(0xFF & (((SS_ADD_SEL << SS_ADD_SEL_OFFSET) & SS_ADD_SEL_MASK) | ((SS_UP_SEL << SS_UP_SEL_OFFSET) & SS_UP_SEL_MASK) | ((SS_DUTYCHGLIMIT << SS_DUTYCHGLIMIT_OFFSET) & SS_DUTYCHGLIMIT_MASK) | ((DUTY_UP_TIME << DUTY_UP_TIME_OFFSET) & DUTY_UP_TIME_MASK))));
}
int TC78B011FTG::getDutyUpTime(bool fromChip)
{
    if (!fromChip)
    {
        return DUTY_UP_TIME;
    }
    int regVal = i2cRead(DUTY_UP_TIME_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & DUTY_UP_TIME_MASK) >> DUTY_UP_TIME_OFFSET;
}

int TC78B011FTG::setRPMChangeLimit(int RPMLimit)
{
    if ((RPMLimit & (RPMLIMIT_MASK >> RPMLIMIT_OFFSET)) != RPMLimit)
    {
        return -10;
    }
    RPMLIMIT = RPMLimit;
    return i2cWrite(RPMLIMIT_REGISTER, (uint8_t)(0xFF & (((RPMLIMIT << RPMLIMIT_OFFSET) & RPMLIMIT_MASK) | ((BRK_INV << BRK_INV_OFFSET) & BRK_INV_MASK) | ((ISD_MASK << ISD_MASK_OFFSET) & ISD_MASK_MASK) | ((RS_SEL << RS_SEL_OFFSET) & RS_SEL_MASK) | ((ANTITHROUGH << ANTITHROUGH_OFFSET) & ANTITHROUGH_MASK))));
}
int TC78B011FTG::getRPMChangeLimit(bool fromChip)
{
    if (!fromChip)
    {
        return RPMLIMIT;
    }
    int regVal = i2cRead(RPMLIMIT_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & RPMLIMIT_MASK) >> RPMLIMIT_OFFSET;
}

int TC78B011FTG::setBrakeInverted(bool brakeInverted)
{
    BRK_INV = (int)brakeInverted;
    return i2cWrite(BRK_INV_REGISTER, (uint8_t)(0xFF & (((RPMLIMIT << RPMLIMIT_OFFSET) & RPMLIMIT_MASK) | ((BRK_INV << BRK_INV_OFFSET) & BRK_INV_MASK) | ((ISD_MASK << ISD_MASK_OFFSET) & ISD_MASK_MASK) | ((RS_SEL << RS_SEL_OFFSET) & RS_SEL_MASK) | ((ANTITHROUGH << ANTITHROUGH_OFFSET) & ANTITHROUGH_MASK))));
}
int TC78B011FTG::getBrakeInverted(bool fromChip)
{
    if (!fromChip)
    {
        return BRK_INV;
    }
    int regVal = i2cRead(BRK_INV_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal * BRK_INV_MASK) >> BRK_INV_OFFSET;
}

int TC78B011FTG::setOvercurrentDetectionDisabled(bool OCPDisabled)
{
    ISD_MASK = (int)OCPDisabled;
    return i2cWrite(ISD_MASK_REGISTER, (uint8_t)(0xFF & (((RPMLIMIT << RPMLIMIT_OFFSET) & RPMLIMIT_MASK) | ((BRK_INV << BRK_INV_OFFSET) & BRK_INV_MASK) | ((ISD_MASK << ISD_MASK_OFFSET) & ISD_MASK_MASK) | ((RS_SEL << RS_SEL_OFFSET) & RS_SEL_MASK) | ((ANTITHROUGH << ANTITHROUGH_OFFSET) & ANTITHROUGH_MASK))));
}
int TC78B011FTG::getOvercurrentDetectionDisabled(bool fromChip)
{
    if (!fromChip)
    {
        return ISD_MASK;
    }
    int regVal = i2cRead(ISD_MASK_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & ISD_MASK_MASK) >> ISD_MASK_OFFSET;
}

int TC78B011FTG::setRSAPinFiltering(int filterMode)
{
    if ((filterMode & (RS_SEL_MASK >> RS_SEL_OFFSET)) != filterMode)
    {
        return -10;
    }
    RS_SEL = filterMode;
    return i2cWrite(RS_SEL_REGISTER, (uint8_t)(0xFF & (((RPMLIMIT << RPMLIMIT_OFFSET) & RPMLIMIT_MASK) | ((BRK_INV << BRK_INV_OFFSET) & BRK_INV_MASK) | ((ISD_MASK << ISD_MASK_OFFSET) & ISD_MASK_MASK) | ((RS_SEL << RS_SEL_OFFSET) & RS_SEL_MASK) | ((ANTITHROUGH << ANTITHROUGH_OFFSET) & ANTITHROUGH_MASK))));
}
int TC78B011FTG::getRSAPinFiltering(bool fromChip)
{
    if (!fromChip)
    {
        return RS_SEL;
    }
    int regVal = i2cRead(RS_SEL_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & RS_SEL_MASK) >> RS_SEL_OFFSET;
}

int TC78B011FTG::setAutoDeadTimeControlDisabled(bool autoDeadTimeDisabled)
{
    ANTITHROUGH = (int)autoDeadTimeDisabled;
    return i2cWrite(ANTITHROUGH_REGISTER, (uint8_t)(0xFF & (((RPMLIMIT << RPMLIMIT_OFFSET) & RPMLIMIT_MASK) | ((BRK_INV << BRK_INV_OFFSET) & BRK_INV_MASK) | ((ISD_MASK << ISD_MASK_OFFSET) & ISD_MASK_MASK) | ((RS_SEL << RS_SEL_OFFSET) & RS_SEL_MASK) | ((ANTITHROUGH << ANTITHROUGH_OFFSET) & ANTITHROUGH_MASK))));
}
int TC78B011FTG::getAutoDeadTimeControlDisabled(bool fromChip)
{
    if (!fromChip)
    {
        return ANTITHROUGH;
    }
    int regVal = i2cRead(ANTITHROUGH_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & ANTITHROUGH_MASK) >> ANTITHROUGH_OFFSET;
}

int TC78B011FTG::setBrakeTime(int time)
{
    if ((time & 7) != time)
    {
        return -10;
    }
    WAIT_TIME = time;
    return i2cWrite(WAIT_TIME_REGISTER, (uint8_t)(0xFF & (((WAIT_TIME << WAIT_TIME_OFFSET) & WAIT_TIME_MASK) | ((WAIT_MODE << WAIT_MODE_OFFSET) & WAIT_MODE_MASK) | ((WAIT_CON << WAIT_CON_OFFSET) * WAIT_CON_MASK) | ((LOCK_BRK << LOCK_BRK_OFFSET) & LOCK_BRK_MASK) | ((ALERT_INV << ALERT_INV_OFFSET) & ALERT_INV_MASK) | ((TSD_MASK < TSD_MASK_OFFSET) & TSD_MASK_MASK))));
}
int TC78B011FTG::getBrakeTime(bool fromChip)
{
    if (!fromChip)
    {
        return WAIT_TIME;
    }
    int regVal = i2cRead(WAIT_TIME_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & WAIT_TIME_MASK) >> WAIT_TIME_OFFSET;
}

int TC78B011FTG::setBrakeMode(bool mode)
{
    WAIT_MODE = (int)mode;
    return i2cWrite(WAIT_MODE_REGISTER, (uint8_t)(0xFF & (((WAIT_TIME << WAIT_TIME_OFFSET) & WAIT_TIME_MASK) | ((WAIT_MODE << WAIT_MODE_OFFSET) & WAIT_MODE_MASK) | ((WAIT_CON << WAIT_CON_OFFSET) * WAIT_CON_MASK) | ((LOCK_BRK << LOCK_BRK_OFFSET) & LOCK_BRK_MASK) | ((ALERT_INV << ALERT_INV_OFFSET) & ALERT_INV_MASK) | ((TSD_MASK < TSD_MASK_OFFSET) & TSD_MASK_MASK))));
}
int TC78B011FTG::getBrakeMode(bool fromChip)
{
    if (!fromChip)
    {
        return WAIT_MODE;
    }
    int regVal = i2cRead(WAIT_MODE_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & WAIT_MODE_MASK) >> WAIT_MODE_OFFSET;
}

int TC78B011FTG::setBrakeReleaseMode(bool mode)
{
    WAIT_CON = (int)mode;
    return i2cWrite(WAIT_CON_REGISTER, (uint8_t)(0xFF & (((WAIT_TIME << WAIT_TIME_OFFSET) & WAIT_TIME_MASK) | ((WAIT_MODE << WAIT_MODE_OFFSET) & WAIT_MODE_MASK) | ((WAIT_CON << WAIT_CON_OFFSET) * WAIT_CON_MASK) | ((LOCK_BRK << LOCK_BRK_OFFSET) & LOCK_BRK_MASK) | ((ALERT_INV << ALERT_INV_OFFSET) & ALERT_INV_MASK) | ((TSD_MASK < TSD_MASK_OFFSET) & TSD_MASK_MASK))));
}
int TC78B011FTG::getBrakeReleaseMode(bool fromChip)
{
    if (!fromChip)
    {
        return WAIT_CON;
    }
    int regVal = i2cRead(WAIT_CON_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & WAIT_CON_MASK) >> WAIT_CON_OFFSET;
}

int TC78B011FTG::setErrorBrakingMode(bool mode)
{
    LOCK_BRK = (int)mode;
    return i2cWrite(LOCK_BRK_REGISTER, (uint8_t)(0xFF & (((WAIT_TIME << WAIT_TIME_OFFSET) & WAIT_TIME_MASK) | ((WAIT_MODE << WAIT_MODE_OFFSET) & WAIT_MODE_MASK) | ((WAIT_CON << WAIT_CON_OFFSET) * WAIT_CON_MASK) | ((LOCK_BRK << LOCK_BRK_OFFSET) & LOCK_BRK_MASK) | ((ALERT_INV << ALERT_INV_OFFSET) & ALERT_INV_MASK) | ((TSD_MASK < TSD_MASK_OFFSET) & TSD_MASK_MASK))));
}
int TC78B011FTG::getErrorBrakingMode(bool fromChip)
{
    if (!fromChip)
    {
        return LOCK_BRK;
    }
    int regVal = i2cRead(LOCK_BRK_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & LOCK_BRK_MASK) >> LOCK_BRK_OFFSET;
}

int TC78B011FTG::setAlertInverted(bool inverted)
{
    ALERT_INV = (int)inverted;
    return i2cWrite(ALERT_INV_REGISTER, (uint8_t)(0xFF & (((WAIT_TIME << WAIT_TIME_OFFSET) & WAIT_TIME_MASK) | ((WAIT_MODE << WAIT_MODE_OFFSET) & WAIT_MODE_MASK) | ((WAIT_CON << WAIT_CON_OFFSET) * WAIT_CON_MASK) | ((LOCK_BRK << LOCK_BRK_OFFSET) & LOCK_BRK_MASK) | ((ALERT_INV << ALERT_INV_OFFSET) & ALERT_INV_MASK) | ((TSD_MASK < TSD_MASK_OFFSET) & TSD_MASK_MASK))));
}
int TC78B011FTG::getAlertInverted(bool fromChip)
{
    if (!fromChip)
    {
        return ALERT_INV;
    }
    int regVal = i2cRead(ALERT_INV_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & ALERT_INV_MASK) >> ALERT_INV_OFFSET;
}

int TC78B011FTG::setThermalShutdownDisable(bool disabled)
{
    TSD_MASK = (int)disabled;
    return i2cWrite(TSD_MASK_REGISTER, (uint8_t)(0xFF & (((WAIT_TIME << WAIT_TIME_OFFSET) & WAIT_TIME_MASK) | ((WAIT_MODE << WAIT_MODE_OFFSET) & WAIT_MODE_MASK) | ((WAIT_CON << WAIT_CON_OFFSET) * WAIT_CON_MASK) | ((LOCK_BRK << LOCK_BRK_OFFSET) & LOCK_BRK_MASK) | ((ALERT_INV << ALERT_INV_OFFSET) & ALERT_INV_MASK) | ((TSD_MASK < TSD_MASK_OFFSET) & TSD_MASK_MASK))));
}
int TC78B011FTG::getThermalShutdownDisable(bool fromChip)
{
    if (!fromChip)
    {
        return TSD_MASK;
    }
    int regVal = i2cRead(TSD_MASK_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & TSD_MASK_MASK) >> TSD_MASK_OFFSET;
}

int TC78B011FTG::setAutoRestartWaitTime(int time)
{
    if ((time & (TRE_MASK >> TRE_OFFSET)) != time)
    {
        return -10;
    }
    TRE = time;
    return i2cWrite(TRE_REGISTER, (uint8_t)(0xFF & (((TRE << TRE_OFFSET) & TRE_MASK) | ((PRE_TIP << PRE_TIP_OFFSET) & PRE_TIP_MASK) | ((TIP << TIP_OFFSET) & TIP_MASK))));
}
int TC78B011FTG::getAutoRestartWaitTime(bool fromChip)
{
    if (!fromChip)
    {
        return TRE;
    }
    int regVal = i2cRead(TRE_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & TRE_MASK) >> TRE_OFFSET;
}

int TC78B011FTG::setFirstDCExcitationTime(int time)
{
    if ((time & (PRE_TIP_MASK >> PRE_TIP_OFFSET)) != time)
    {
        return -10;
    }
    PRE_TIP = time;
    return i2cWrite(PRE_TIP_REGISTER, (uint8_t)(0xFF & (((TRE << TRE_OFFSET) & TRE_MASK) | ((PRE_TIP << PRE_TIP_OFFSET) & PRE_TIP_MASK) | ((TIP << TIP_OFFSET) & TIP_MASK))));
}
int TC78B011FTG::getFirstDCExcitationTime(bool fromChip)
{
    if (!fromChip)
    {
        return PRE_TIP;
    }
    int regVal = i2cRead(PRE_TIP_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & PRE_TIP_MASK) >> PRE_TIP_OFFSET;
}

int TC78B011FTG::setSecondDCExcitationTime(int time)
{
    if ((time & (TIP_MASK >> TIP_OFFSET)) != time)
    {
        return -10;
    }
    TIP = time;
    return i2cWrite(TIP_REGISTER, (uint8_t)(0xFF & (((TRE << TRE_OFFSET) & TRE_MASK) | ((PRE_TIP << PRE_TIP_OFFSET) & PRE_TIP_MASK) | ((TIP << TIP_OFFSET) & TIP_MASK))));
}
int TC78B011FTG::getSecondDCExcitationTime(bool fromChip)
{
    if (!fromChip)
    {
        return TIP;
    }
    int regVal = i2cRead(TIP_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & TIP_MASK) >> TIP_OFFSET;
}

int TC78B011FTG::setLeadAngle(int angleSetting)
{
    if ((angleSetting & (LA_MASK >> LA_OFFSET)) != angleSetting)
    {
        return -10;
    }
    LA = angleSetting;
    return i2cWrite(LA_REGISTER, (uint8_t)(0xFF & (((LA << LA_OFFSET) & LA_MASK) | ((FMAX << FMAX_OFFSET) & FMAX_MASK) | ((FST << FST_OFFSET) & FST_MASK))));
}
int TC78B011FTG::getLeadAngle(bool fromChip)
{
    if (!fromChip)
    {
        return LA;
    }
    int regVal = i2cRead(LA_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & LA_MASK) >> LA_OFFSET;
}

int TC78B011FTG::setMaxRPM(int maxRPMMode)
{
    if ((maxRPMMode & (FMAX_MASK >> FMAX_OFFSET)) != maxRPMMode)
    {
        return -10;
    }
    FMAX = maxRPMMode;
    return i2cWrite(FMAX_REGISTER, (uint8_t)(0xFF & (((LA << LA_OFFSET) & LA_MASK) | ((FMAX << FMAX_OFFSET) & FMAX_MASK) | ((FST << FST_OFFSET) & FST_MASK))));
}
int TC78B011FTG::getMaxRPM(bool fromChip)
{
    if (!fromChip)
    {
        return FMAX;
    }
    int regVal = i2cRead(FMAX_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & FMAX_MASK) >> FMAX_OFFSET;
}

int TC78B011FTG::setForcedComutationFrequency(int comutationMode)
{
    if ((comutationMode & (FST_MASK >> FST_OFFSET)) != comutationMode)
    {
        return -10;
    }
    FST = comutationMode;
    return i2cWrite(FST_REGISTER, (uint8_t)(0xFF & (((LA << LA_OFFSET) & LA_MASK) | ((FMAX << FMAX_OFFSET) & FMAX_MASK) | ((FST << FST_OFFSET) & FST_MASK))));
}
int TC78B011FTG::getForcedComutationFrequency(bool fromChip)
{
    if (!fromChip)
    {
        return FST;
    }
    int regVal = i2cRead(FST_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & FST_MASK) >> FST_OFFSET;
}

int TC78B011FTG::setOutputPWMFrequencyMode(int frequencyMode)
{
    if ((frequencyMode & (FPWM_MASK >> FPWM_OFFSET)) != frequencyMode)
    {
        return -10;
    }
    FPWM = frequencyMode;
    return i2cWrite(FPWM_REGISTER, (uint8_t)(0xFF & (((FPWM << FPWM_OFFSET) & FPWM_MASK) | ((DEADTIME << DEADTIME_OFFSET) & DEADTIME_MASK))));
}
int TC78B011FTG::getOutputPWMFrequencyMode(bool fromChip)
{
    if (!fromChip)
    {
        return FPWM;
    }
    int regVal = i2cRead(FPWM_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & FPWM_MASK) >> FPWM_OFFSET;
}

int TC78B011FTG::setDeadtime(int deadtimeMode)
{
    if ((deadtimeMode & (DEADTIME_MASK >> DEADTIME_OFFSET)) != deadtimeMode)
    {
        return -10;
    }
    DEADTIME = deadtimeMode;
    return i2cWrite(DEADTIME_REGISTER, (uint8_t)(0xFF & (((FPWM << FPWM_OFFSET) & FPWM_MASK) | ((DEADTIME << DEADTIME_OFFSET) & DEADTIME_MASK))));
}
int TC78B011FTG::getDeadtime(bool fromChip)
{
    if (!fromChip)
    {
        return DEADTIME;
    }
    int regVal = i2cRead(DEADTIME_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & DEADTIME_MASK) >> DEADTIME_OFFSET;
}

int TC78B011FTG::setOvercurrentDetectionThreshold(bool thresholdMode)
{
    ISD_LVL = (int)thresholdMode;
    return i2cWrite(ISD_LVL_REGISTER, (uint8_t)(0xFF & (((ISD_LVL << ISD_LVL_OFFSET) & DEADTIME_MASK) | ((OCP_LVL << OCP_LVL_OFFSET) & OCP_LVL_MASK) | ((SOURCE << SOURCE_OFFSET) & SOURCE_MASK) | ((SINK << SINK_OFFSET) & SINK_MASK))));
}
int TC78B011FTG::getOvercurrentDetectionThreshold(bool fromChip)
{
    if (!fromChip)
    {
        return ISD_LVL;
    }
    int regVal = i2cRead(ISD_LVL_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & ISD_LVL_MASK) >> ISD_LVL_OFFSET;
}

int TC78B011FTG::setOvercurrentProtectionGain(bool OCPGain)
{
    OCP_LVL = OCPGain;
    return i2cWrite(OCP_LVL_REGISTER, (uint8_t)(0xFF & (((ISD_LVL << ISD_LVL_OFFSET) & DEADTIME_MASK) | ((OCP_LVL << OCP_LVL_OFFSET) & OCP_LVL_MASK) | ((SOURCE << SOURCE_OFFSET) & SOURCE_MASK) | ((SINK << SINK_OFFSET) & SINK_MASK))));
}
int TC78B011FTG::getOvercurrentProtectionGain(bool fromChip)
{
    if (!fromChip)
    {
        return OCP_LVL;
    }
    int regVal = i2cRead(OCP_LVL_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & OCP_LVL_MASK) >> OCP_LVL_OFFSET;
}

int TC78B011FTG::setGateSourceCurrent(int currentMode)
{
    if ((currentMode & (SOURCE_MASK >> SOURCE_OFFSET)) != currentMode)
    {
        return -10;
    }
    SOURCE = currentMode;
    return i2cWrite(SOURCE_REGISTER, (uint8_t)(0xFF & (((ISD_LVL << ISD_LVL_OFFSET) & DEADTIME_MASK) | ((OCP_LVL << OCP_LVL_OFFSET) & OCP_LVL_MASK) | ((SOURCE << SOURCE_OFFSET) & SOURCE_MASK) | ((SINK << SINK_OFFSET) & SINK_MASK))));
}
int TC78B011FTG::getGateSourceCurrent(bool fromChip)
{
    if (!fromChip)
    {
        return SOURCE;
    }
    int regVal = i2cRead(SOURCE_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & SOURCE_MASK) >> SOURCE_OFFSET;
}

int TC78B011FTG::setGateSinkCurrent(int currentMode)
{
    if ((currentMode & (SINK_MASK >> SINK_OFFSET)) != currentMode)
    {
        return -10;
    }
    SINK = currentMode;
    return i2cWrite(SINK_REGISTER, (uint8_t)(0xFF & (((ISD_LVL << ISD_LVL_OFFSET) & DEADTIME_MASK) | ((OCP_LVL << OCP_LVL_OFFSET) & OCP_LVL_MASK) | ((SOURCE << SOURCE_OFFSET) & SOURCE_MASK) | ((SINK << SINK_OFFSET) & SINK_MASK))));
}
int TC78B011FTG::getGateSinkCurrent(bool fromChip)
{
    if (!fromChip)
    {
        return SINK;
    }
    int regVal = i2cRead(SINK_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & SINK_MASK) >> SINK_OFFSET;
}

int TC78B011FTG::setIdleModeHysteresisVoltage(int hysteresisMode)
{
    if ((hysteresisMode & (COMP_HYS_MASK >> COMP_HYS_OFFSET)) != hysteresisMode)
    {
        return -10;
    }
    COMP_HYS = hysteresisMode;
    return i2cWrite(COMP_HYS_REGISTER, (uint8_t)(0xFF & (((COMP_HYS << COMP_HYS_OFFSET) & COMP_HYS_MASK))));
}
int TC78B011FTG::getIdleModeHysteresisVoltage(bool fromChip)
{
    if (!fromChip)
    {
        return COMP_HYS;
    }
    int regVal = i2cRead(COMP_HYS_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & COMP_HYS_MASK) >> COMP_HYS_OFFSET;
}

int TC78B011FTG::setSpeed(int speed)
{
    if ((speed & (SPD_MASK >> SPD_OFFSET)) != speed)
    {
        return -10;
    }
    SPEED = speed;
    int status1 = 1; // i2cWrite(27, (uint8_t)0);
    int status2 = 1; // i2cWrite(28, (uint8_t)0);
    int status3 = i2cWrite(SPD_REGISTER_H, (uint8_t)(0xFF & (((SPEED << SPD_OFFSET) & SPD_MASK) >> 8)));
    int status4 = i2cWrite(SPD_REGISTER_L, (uint8_t)(0xFF & ((SPEED << SPD_OFFSET) & SPD_MASK)));
    return status1 < 0 ? status1 : status2 < 0 ? status2
                               : status3 < 0   ? status3
                               : status4 < 0   ? status4
                                               : 0;
}
int TC78B011FTG::getSpeedSetting(bool fromChip)
{
    if (!fromChip)
    {
        return SPEED;
    }
    int regValH = i2cRead(SPD_REGISTER_H);
    if (regValH < 0)
    {
        return regValH;
    }
    int regValL = i2cRead(SPD_REGISTER_L);
    if (regValL < 0)
    {
        return regValL;
    }
    int regVal = (regValH << 8) | regValL;
    return (regVal & SPD_MASK) >> SPD_OFFSET;
}

int TC78B011FTG::getRPM(bool fromChip)
{
    return 250000 / (((uint16_t)(i2cRead(HZ_CNT_REGISTER_H)) << 8) | (uint16_t)i2cRead(HZ_CNT_REGISTER_L)) * 60;
}

int TC78B011FTG::readNVM()
{
    using namespace std::chrono_literals;
    i2cWrite(NVM_RW_REGISTER, 0);
    i2cWrite(NVM_ST_REGISTER, 1);
    int waitTime = 0;
    std::this_thread::sleep_for(100ms);
    while (i2cRead(NVM_ST_REGISTER) != 0)
    {
        std::this_thread::sleep_for(100ms);
        waitTime++;
        if (waitTime > 10)
        {
            return -1;
        }
    }
    return 0;
}

int TC78B011FTG::writeNVM()
{
    using namespace std::chrono_literals;
    i2cWrite(NVM_RW_REGISTER, 1);
    i2cWrite(NVM_ST_REGISTER, 1);
    int waitTime = 0;
    std::this_thread::sleep_for(100ms);
    while (i2cRead(NVM_ST_REGISTER) != 0)
    {
        std::this_thread::sleep_for(100ms);
        waitTime++;
        if (waitTime > 10)
        {
            return -1;
        }
    }
    return 0;
}

int TC78B011FTG::getChargePumpErrorState(bool fromChip)
{
    int regVal = i2cRead(ERR_CP_LOW_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & ERR_CP_LOW_MASK) >> ERR_CP_LOW_OFFSET;
}

int TC78B011FTG::getTemperatureErrorState(bool fromChip)
{
    int regVal = i2cRead(ERR_TSD_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & ERR_TSD_MASK) >> ERR_TSD_OFFSET;
}

int TC78B011FTG::getCurrentErrorState(bool fromChip)
{
    int regVal = i2cRead(ERR_ISD_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & ERR_ISD_STATE_MASK) >> ERR_ISD_STATE_OFFSET;
}

int TC78B011FTG::getOverspeedErrorState(bool fromChip)
{
    int regVal = i2cRead(ERR_OV_SPD_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & ERR_OV_SPD_MASK) >> ERR_OV_SPD_OFFSET;
}

int TC78B011FTG::getUnderspeedErrorState(bool fromChip)
{
    int regVal = i2cRead(ERR_UD_SPD_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & ERR_UD_SPD_MASK) >> ERR_UD_SPD_OFFSET;
}

int TC78B011FTG::getStartupErrorState(bool fromChip)
{
    int regVal = i2cRead(ERR_ST_FAIL_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & ERR_ST_FAIL_MASK) >> ERR_ST_FAIL_OFFSET;
}

int TC78B011FTG::setUserID(int UID)
{
    if ((UID & (USERID_MASK >> USERID_OFFSET)) != UID)
    {
        return -10;
    }
    return i2cWrite(USERID_REGISTER, (uint8_t)UID);
}

int TC78B011FTG::getUserID(bool fromChip)
{
    int regVal = i2cRead(USERID_REGISTER);
    if (regVal < 0)
    {
        return regVal;
    }
    return (regVal & USERID_MASK) >> USERID_OFFSET;
}