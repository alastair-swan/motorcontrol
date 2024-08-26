#include <linux/i2c-dev.h>
#include <cstdlib>
#include <fcntl.h>
#include <unistd.h>
#include <stdint.h>
#include <stdio.h>
#include <sys/ioctl.h>
#include <ostream>
#include <iostream>

class TC788011FTG{
    public:
        int NOSTOP = 0;         // register 2[7]            // 0: disable, 1: enable
        int STOPDUTY = 13;      // register 2[6:0]          // STOPDUTY * 2 / 512
        int STARTDUTY = 77;     // register 3[7:0]          // STARTDUTY / 512
        int CHANGEDUTY = 120;   // register 4[7:0]          // CHANGEDUTY * 2 / 512
        int MAXDUTY = 180;      // register 5[7:0]          // (MAXDUTY + 257) / 512
        int STARTRPM = 857;     // register 6[7:0]7[7:4]
        int MAXDUTYHYS = 3;     // register 7[3:0]
        int SPEEDSLOP = 815;    // register 8[7:0]9[7:2]
        int MAXOPEN = 0;        // register 9[1]
        int MAXOFF = 0;         // register 9[0]
        int SPEEDSLOP2 = 1795;  // register 10[7:0]11[7:2]
        int VCP_MASK = 0;       // register 11[1]
        int OPENLOOP = 1;       // register 11[0]
        int KIX = 0;            // register 12[7]
        int KI = 40;            // register 12[6:0]
        int KPX = 0;            // register 13[7]
        int KP = 30;            // register 13[6:0]
        int STBY_MODE = 0;      // register 14[7]
        int DIR = 0;            // register 14[6]
        int POLEPAIR = 1;       // register 14[5:3]
        int MAXSPEED = 0;       // register 14[2:1]
        int FG_ON = 0;          // register 14[0]
        int FGSEL = 0;          // register 15[7:5]
        int TSPSEL = 0;         // register 15[4]
        int SPDINV = 0;         // register 15[3]
        int LATCH = 0;          // register 15[2]
        int OCPMASK = 0;        // register 15[1:0]
        int LOCKDIS = 0;        // register 16[7]
        int DUTYCHGLIMIT = 3;   // register 16[6:4]
        int STARTCURRENT = 2;   // register 16[3:1]
        int OCPDIS = 0;         // register 16[0]
        int SS_ADD_SEL = 1;     // register 17[7:6]
        int SS_UP_SEL = 1;      // register 17[5:4]
        int SS_DUTYCHGLIMIT = 2;// register 17[3:1]
        int DUTY_UP_TIME = 0;   // register 17[0]
        int RPMLIMIT = 2;       // register 18[7:5]
        int BRK_INV = 0;        // register 18[4]
        int ISD_MASK = 0;       // register 18[3]
        int RS_SEL = 0;         // register 18[2:1]
        int ANTITHROUGH = 0;    // register 18[0]
        int WAIT_TIME = 2;      // register 19[7:5]
        int WAIT_MODE = 0;      // register 19[4]
        int WAIT_CON = 0;       // register 19[3]
        int LOCK_BRK = 0;       // register 19[2]
        int ALERT_INV = 1;      // register 19[1]
        int TDS_MASK = 0;       // register 19[0]
        int TRE = 1;            // register 20[7:5]
        int PRE_TIP = 2;        // register 20[4:3]
        int TIP = 3;            // register 20[2:0]
        int LA = 1;             // register 21[7:4]
        int FMAX = 0;           // register 21[3:2]
        int FST = 0;            // register 21[1:0]
        int FPWM = 0;           // register 22[4:2]
        int DEADTIME = 1;       // register 22[1:0]
        int ISD_LVL = 1;        // register 23[7]
        int OCP_LVL = 1;        // register 23[6]
        int SOURCE = 0;         // register 23[5:3]
        int SINK = 0;           // register 23[2:0]
        int COMP_HYS = 1;       // register 24[7:6]

        int address;

        TC788011FTG(int address);

        int setNoStop(bool nostop);
        int setStopDuty(int stopduty);
        int setStartDuty(int startduty);
        int setChangeDuty(int changeduty);
        int setMaxDuty(int maxduty);
        int setStartRPM(int startRPM);              // register 6[7:0]7[7:4]
        int setMacDutyHysteresis(int hysteresis);   // register 7[3:0]
        int setSpeedSlop(int speedslop);            // register 8[7:0]9[7:2]
        int setMaxOpen(int maxopen);                // register 9[1]
        int setMaxOff(int maxoff);                  // register 9[0]
        int setSpeedSlop2(int speedslop2);          // register 10[7:0]11[7:2]
        int VCP_MASK = 0;       // register 11[1]
        int OPENLOOP = 1;       // register 11[0]
        int KIX = 0;            // register 12[7]
        int KI = 40;            // register 12[6:0]
        int KPX = 0;            // register 13[7]
        int KP = 30;            // register 13[6:0]
        int STBY_MODE = 0;      // register 14[7]
        int DIR = 0;            // register 14[6]
        int POLEPAIR = 1;       // register 14[5:3]
        int MAXSPEED = 0;       // register 14[2:1]
        int FG_ON = 0;          // register 14[0]
        int FGSEL = 0;          // register 15[7:5]
        int TSPSEL = 0;         // register 15[4]
        int SPDINV = 0;         // register 15[3]
        int LATCH = 0;          // register 15[2]
        int OCPMASK = 0;        // register 15[1:0]
        int LOCKDIS = 0;        // register 16[7]
        int DUTYCHGLIMIT = 3;   // register 16[6:4]
        int STARTCURRENT = 2;   // register 16[3:1]
        int OCPDIS = 0;         // register 16[0]
        int SS_ADD_SEL = 1;     // register 17[7:6]
        int SS_UP_SEL = 1;      // register 17[5:4]
        int SS_DUTYCHGLIMIT = 2;// register 17[3:1]
        int DUTY_UP_TIME = 0;   // register 17[0]
        int RPMLIMIT = 2;       // register 18[7:5]
        int BRK_INV = 0;        // register 18[4]
        int ISD_MASK = 0;       // register 18[3]
        int RS_SEL = 0;         // register 18[2:1]
        int ANTITHROUGH = 0;    // register 18[0]
        int WAIT_TIME = 2;      // register 19[7:5]
        int WAIT_MODE = 0;      // register 19[4]
        int WAIT_CON = 0;       // register 19[3]
        int LOCK_BRK = 0;       // register 19[2]
        int ALERT_INV = 1;      // register 19[1]
        int TDS_MASK = 0;       // register 19[0]
        int TRE = 1;            // register 20[7:5]
        int PRE_TIP = 2;        // register 20[4:3]
        int TIP = 3;            // register 20[2:0]
        int LA = 1;             // register 21[7:4]
        int FMAX = 0;           // register 21[3:2]
        int FST = 0;            // register 21[1:0]
        int FPWM = 0;           // register 22[4:2]
        int DEADTIME = 1;       // register 22[1:0]
        int ISD_LVL = 1;        // register 23[7]
        int OCP_LVL = 1;        // register 23[6]
        int SOURCE = 0;         // register 23[5:3]
        int SINK = 0;           // register 23[2:0]
        int COMP_HYS = 1;       // register 24[7:6]

    private:
        int i2cWrite(int address, int reg, uint8_t data);
        int i2cRead(int address, int reg);
        int setup(int i2cAddress);

}