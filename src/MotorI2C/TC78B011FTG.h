#include <linux/i2c-dev.h>
#include <cstdlib>
#include <fcntl.h>
#include <unistd.h>
#include <stdint.h>
#include <stdio.h>
#include <sys/ioctl.h>
#include <ostream>
#include <iostream>
#include <cmath>
#include <cstring>

#define ERR_CP_LOW_MASK 0x20
#define ERR_CP_LOW_OFFSET 5
#define ERR_CP_LOW_REGISTER 0

#define ERR_TSD_MASK 0x10
#define ERR_TSD_OFFSET 4
#define ERR_TSD_REGISTER 0

#define ERR_ISD_STATE_MASK 0x08
#define ERR_ISD_STATE_OFFSET 3
#define ERR_ISD_REGISTER 0

#define ERR_OV_SPD_MASK 0x04
#define ERR_OV_SPD_OFFSET 2
#define ERR_OV_SPD_REGISTER 0

#define ERR_UD_SPD_MASK 0x02
#define ERR_UD_SPD_OFFSET 1
#define ERR_UD_SPD_REGISTER 0

#define ERR_ST_FAIL_MASK 0x01
#define ERR_ST_FAIL_OFFSET 0
#define ERR_ST_FAIL_REGISTER 0

#define DEFAULT_NOSTOP 0         // register 2[7]            // 0: disable, 1: enable
#define NOSTOP_MASK 0x80
#define NOSTOP_OFFSET 7
#define NOSTOP_REGISTER 2

#define DEFAULT_STOPDUTY 0      // register 2[6:0]          // STOPDUTY * 2 / 512
#define STOPDUTY_MASK 0x7F
#define STOPDUTY_OFFSET 0
#define STOPDUTY_REGISTER 2

#define DEFAULT_STARTDUTY 1     // register 3[7:0]          // STARTDUTY / 512
#define STARTDUTY_MASK 0xFF
#define STARTDUTY_OFFSET 0
#define STARTDUTY_REGISTER 3

#define DEFAULT_CHANGEDUTY 120   // register 4[7:0]          // CHANGEDUTY * 2 / 512
#define CHANGEDUTY_MASK 0xFF
#define CHANGEDUTY_OFFSET 0
#define CHANGEDUTY_REGISTER 4

#define DEFAULT_MAXDUTY 255      // register 5[7:0]          // (MAXDUTY + 257) / 512
#define MAXDUTY_MASK 0xFF
#define MAXDUTY_OFFSET 0
#define MAXDUTY_REGISTER 5

#define DEFAULT_STARTRPM 857     // register 6[7:0]7[7:4]
#define STARTRPM_MASK 0xFFF0
#define STARTRPM_OFFSET 4
#define STARTRPM_REGISTER_H 6
#define STARTRPM_REGISTER_L 7

#define DEFAULT_MAXDUTYHYS 3     // register 7[3:0]
#define MAXDUTYHYS_MASK 0x0F
#define MAXDUTYHYS_OFFSET 0
#define MAXDUTYHYS_REGISTER 7

#define DEFAULT_SPEEDSLOP 815    // register 8[7:0]9[7:2]
#define SPEEDSLOP_MASK 0xFFFC
#define SPEEDSLOP_OFFSET 2
#define SPEEDSLOP_REGISTER_H 8
#define SPEEDSLOP_REGISTER_L 9

#define DEFAULT_MAXOPEN 0        // register 9[1]
#define MAXOPEN_MASK 0x02
#define MAXOPEN_OFFSET 1
#define MAXOPEN_REGISTER 9

#define DEFAULT_MAXOFF 0         // register 9[0]
#define MAXOFF_MASK 0x01
#define MAXOFF_OFFSET 0
#define MAXOFF_REGISTER 9

#define DEFAULT_SPEEDSLOP2 1795  // register 10[7:0]11[7:2]
#define SPEEDSLOP2_MASK 0xFFFC
#define SPEEDSLOP2_OFFSET 2
#define SPEEDSLOP2_REGISTER_H 10
#define SPEEDSLOP2_REGISTER_L 11

#define DEFAULT_VCP_MASK 0       // register 11[1]
#define VCP_MASK_MASK 0x02
#define VCP_MASK_OFFSET 1
#define VCP_MASK_REGISTER 11

#define DEFAULT_OPENLOOP 1       // register 11[0]
#define OPENLOOP_MASK 0x01
#define OPENLOOP_OFFSET 0
#define OPENLOOP_REGISTER 11

#define DEFAULT_KIX 0            // register 12[7]
#define KIX_MASK 0x80
#define KIX_OFFSET 7
#define KIX_REGISTER 12

#define DEFAULT_KI 40            // register 12[6:0]
#define KI_MASK 0x7F
#define KI_OFFSET 0
#define KI_REGISTER 12

#define DEFAULT_KPX 0            // register 13[7]
#define KPX_MASK 0x80
#define KPX_OFFSET 7
#define KPX_REGISTER 13

#define DEFAULT_KP 30            // register 13[6:0]
#define KP_MASK 0x7F
#define KP_OFFSET 0
#define KP_REGISTER 13

#define DEFAULT_STBY_MODE 0      // register 14[7]
#define STBY_MODE_MASK 0x80
#define STBY_MODE_OFFSET 7
#define STBY_MODE_REGISTER 14

#define DEFAULT_DIR 1            // register 14[6]
#define DIR_MASK 0x40
#define DIR_OFFSET 6
#define DIR_REGISTER 14

#define DEFAULT_POLEPAIR 6       // register 14[5:3]
#define POLEPAIR_MASK 0x38
#define POLEPAIR_OFFSET 3
#define POLEPAIR_REGISTER 14

#define DEFAULT_MAXSPEED 0       // register 14[2:1]
#define MAXSPEED_MASK 0x06
#define MAXSPEED_OFFSET 1
#define MAXSPEED_REGISTER 14

#define DEFAULT_FG_ON 0          // register 14[0]
#define FG_ON_MASK 0x01 
#define FG_ON_OFFSET 0
#define FG_ON_REGISTER 14

#define DEFAULT_FGSEL 0          // register 15[7:5]
#define FGSEL_MASK 0xE0
#define FGSEL_OFFSET 5
#define FGSEL_REGISTER 15

#define DEFAULT_TSPSEL 0         // register 15[4]
#define TSPSEL_MASK 0x10
#define TSPSEL_OFFSET 4
#define TSPSEL_REGISTER 15

#define DEFAULT_SPDINV 0         // register 15[3]
#define SPDINV_MASK 0x08
#define SPDINV_OFFSET 3
#define SPDINV_REGISTER 15

#define DEFAULT_LATCH 0          // register 15[2]
#define LATCH_MASK 0x04
#define LATCH_OFFSET 2
#define LATCH_REGISTER 15

#define DEFAULT_OCPMASK 0        // register 15[1:0]
#define OCPMASK_MASK 0x03
#define OCPMASK_OFFSET 0
#define OCPMASK_REGISTER 15

#define DEFAULT_LOCKDIS 0        // register 16[7]
#define LOCKDIS_MASK 0x80
#define LOCKDIS_OFFSET 7
#define LOCKDIS_REGISTER 16

#define DEFAULT_DUTYCHGLIMIT 3  // register 16[6:4]
#define DUTYCHGLIMIT_MASK 0x70
#define DUTYCHGLIMIT_OFFSET 4
#define DUTYCHGLIMIT_REGISTER 16

#define DEFAULT_STARTCURRENT 2   // register 16[3:1]
#define STARTCURRENT_MASK 0x0E
#define STARTCURRENT_OFFSET 1
#define STARTCURRENT_REGISTER 16

#define DEFAULT_OCPDIS 0        // register 16[0]
#define OCPDIS_MASK 0x01
#define OCPDIS_OFFSET 0
#define OCPDIS_REGISTER 16

#define DEFAULT_SS_ADD_SEL 1     // register 17[7:6]
#define SS_ADD_SEL_MASK 0xC0
#define SS_ADD_SEL_OFFSET 6
#define SS_ADD_SEL_REGISTER 17

#define DEFAULT_SS_UP_SEL 1      // register 17[5:4]
#define SS_UP_SEL_MASK 0x30
#define SS_UP_SEL_OFFSET 4
#define SS_UP_SEL_REGISTER 17

#define DEFAULT_SS_DUTYCHGLIMIT 2// register 17[3:1]
#define SS_DUTYCHGLIMIT_MASK 0x0E
#define SS_DUTYCHGLIMIT_OFFSET 1
#define SS_DUTYCHGLIMIT_REGISTER 17

#define DEFAULT_DUTY_UP_TIME 0   // register 17[0]
#define DUTY_UP_TIME_MASK 0x01
#define DUTY_UP_TIME_OFFSET 0
#define DUTY_UP_TIME_REGISTER 17

#define DEFAULT_RPMLIMIT 2       // register 18[7:5]
#define RPMLIMIT_MASK 0xE0
#define RPMLIMIT_OFFSET 5
#define RPMLIMIT_REGISTER 18

#define DEFAULT_BRK_INV 0        // register 18[4]
#define BRK_INV_MASK 0x10
#define BRK_INV_OFFSET 4
#define BRK_INV_REGISTER 18

#define DEFAULT_ISD_MASK 0       // register 18[3]
#define ISD_MASK_MASK 0x80
#define ISD_MASK_OFFSET 3
#define ISD_MASK_REGISTER 18

#define DEFAULT_RS_SEL 0         // register 18[2:1]
#define RS_SEL_MASK 0x06
#define RS_SEL_OFFSET 1
#define RS_SEL_REGISTER 18

#define DEFAULT_ANTITHROUGH 0    // register 18[0]
#define ANTITHROUGH_MASK 0x01
#define ANTITHROUGH_OFFSET 0
#define ANTITHROUGH_REGISTER 18

#define DEFAULT_WAIT_TIME 2      // register 19[7:5]
#define WAIT_TIME_MASK 0xE0
#define WAIT_TIME_OFFSET 5
#define WAIT_TIME_REGISTER 19

#define DEFAULT_WAIT_MODE 0      // register 19[4]
#define WAIT_MODE_MASK 0x10
#define WAIT_MODE_OFFSET 4
#define WAIT_MODE_REGISTER 19

#define DEFAULT_WAIT_CON 0       // register 19[3]
#define WAIT_CON_MASK 0x08
#define WAIT_CON_OFFSET 3
#define WAIT_CON_REGISTER 19

#define DEFAULT_LOCK_BRK 0       // register 19[2]
#define LOCK_BRK_MASK 0x04
#define LOCK_BRK_OFFSET 2
#define LOCK_BRK_REGISTER 19

#define DEFAULT_ALERT_INV 1      // register 19[1]
#define ALERT_INV_MASK 0x02
#define ALERT_INV_OFFSET 1
#define ALERT_INV_REGISTER 19

#define DEFAULT_TSD_MASK 0       // register 19[0]
#define TSD_MASK_MASK 0x01
#define TSD_MASK_OFFSET 0
#define TSD_MASK_REGISTER 19

#define DEFAULT_TRE 1           // register 20[7:5]
#define TRE_MASK 0xE0
#define TRE_OFFSET 5
#define TRE_REGISTER 20

#define DEFAULT_PRE_TIP 2        // register 20[4:3]
#define PRE_TIP_MASK 0x18
#define PRE_TIP_OFFSET 3
#define PRE_TIP_REGISTER 20

#define DEFAULT_TIP 3            // register 20[2:0]
#define TIP_MASK 0x07
#define TIP_OFFSET 0
#define TIP_REGISTER 20

#define DEFAULT_LA 12           // register 21[7:4]
#define LA_MASK 0xF0
#define LA_OFFSET 4
#define LA_REGISTER 21

#define DEFAULT_FMAX 2           // register 21[3:2]
#define FMAX_MASK 0x0C
#define FMAX_OFFSET 2
#define FMAX_REGISTER 21

#define DEFAULT_FST 0            // register 21[1:0]
#define FST_MASK 0x03
#define FST_OFFSET 0
#define FST_REGISTER 21

#define DEFAULT_FPWM 7           // register 22[4:2]
#define FPWM_MASK 0x1C
#define FPWM_OFFSET 2
#define FPWM_REGISTER 22

#define DEFAULT_DEADTIME 1       // register 22[1:0]
#define DEADTIME_MASK 0x03
#define DEADTIME_OFFSET 0
#define DEADTIME_REGISTER 22

#define DEFAULT_ISD_LVL 1        // register 23[7]
#define ISD_LVL_MASK 0x80
#define ISD_LVL_OFFSET 7
#define ISD_LVL_REGISTER 23

#define DEFAULT_OCP_LVL 1        // register 23[6]
#define OCP_LVL_MASK 0x40
#define OCP_LVL_OFFSET 6
#define OCP_LVL_REGISTER 23

#define DEFAULT_SOURCE 0       // register 23[5:3]
#define SOURCE_MASK 0x38
#define SOURCE_OFFSET 3
#define SOURCE_REGISTER 23

#define DEFAULT_SINK 0         // register 23[2:0]
#define SINK_MASK 0x07
#define SINK_OFFSET 0
#define SINK_REGISTER 23

#define DEFAULT_COMP_HYS 1       // register 24[7:6]
#define COMP_HYS_MASK 0xC0
#define COMP_HYS_OFFSET 6
#define COMP_HYS_REGISTER 24

#define DEFAULT_SPD 0
#define SPD_MASK 0xFFC0
#define SPD_OFFSET 6
#define SPD_REGISTER_H 27
#define SPD_REGISTER_L 28

#define HZ_CNT_MASK 0xFFFF
#define HZ_CNT_OFFSET 0
#define HZ_CNT_REGISTER_H 29
#define HZ_CNT_REGISTER_L 30

#define NVM_RW_MASK 0x01
#define NVM_RW_OFFSET 0
#define NVM_RW_REGISTER 86

#define NVM_ST_MASK 0x01
#define NVM_ST_OFFSET 0
#define NVM_ST_REGISTER 87

class TC78B011FTG{ 
    public:
        int i2cBusNumber;
        int i2cAddress;

        TC78B011FTG(int i2cBus, int address);

        /// @brief Gets the charge pump error state, see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the CP_LOW register. returns a negative number on error.
        int getChargePumpErrorState();
        /// @brief Gets the temperature error state, see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the TSD register. returns a negative number on error.
        int getTemperatureErrorState();
        /// @brief Gets the current error state, see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the ISD register. returns a negative number on error.
        int getCurrentErrorState();
        /// @brief Gets the overspeed error state, see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the OV_SPD register. returns a negative number on error.
        int getOverspeedErrorState();
        /// @brief Gets the underspeed error state, see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the UD_SPD register. returns a negative number on error.
        int getUnderspeedErrorState();
        /// @brief Gets the startup error state, see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the ST_FAIL register. returns a negative number on error.
        int getStartupErrorState();

        /// @brief Sets the data stored in the USERID register, see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param UID 8 bit value to be stored. The chip does not use this register for anything
        /// @return returns a negative number on error.
        int setUserID(int UID);
        /// @brief Gets the UserID, see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the USERID register. returns a negative number on error.
        int getUserID();


        /// @brief Sets the NOSTOP behavior, see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param nostop false: disable, true: enable
        /// @return returns a negative number on error
        int setNoStop(bool nostop);
        /// @brief Gets the NOSTOP behavior, see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return returns the value stored in the NOSTOP register. returns a negative number on error
        int getNoStop();

        /// @brief Sets the STOPDUTY register, see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param stopduty only values in the range 0-127 are valid. this value sets the PWM duty cycle at which the motor stops when using PWM control, it is calculated as STOPDUTY × 2 / 512 to produce a value in the range of 0 to 49.6%
        /// @return returns a negative number on error
        int setStopDuty(int stopduty);
        /// @brief Gets the STOPDUTY register, see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return returns the value stored in the STOPDUTY register. returns a negative number on error
        int getStopDuty();

        /// @brief Sets the STARTDUTY register, see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param startduty only values in the range 0-255 are valid. this value sets the PWM duty cycle at which the motor starts when using PWM control, it is calculated as STOPDUTY / 512 to produce a value in the range of 0 to 49.8%
        /// @return returns a negative number on error
        int setStartDuty(int startduty);
        /// @brief Gets the STARTDUTY register, see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return returns the value stored in the STARTDUTY register. returns a negative number on error
        int getStartDuty();

        /// @brief Sets the CHANGEDUTY register, see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param changeduty only values in the range 0-255 are valid. this value sets the PWM duty cycle at which the motor transitions from the slope defined in SPEEDSLOP to the slope defined in SPEEDSLOPE2 when using PWM control, it is calculated as CHANGEDUTY × 2 / 512 to produce a value in the range of 0.4 to 99.6%. This value should be between STARTDUTY and MAXDUTY when used and should be 0 when not used.
        /// @return returns a negative number on error
        int setChangeDuty(int changeduty);
        /// @brief Gets the CHANGEDUTY register, see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the CHANGEDUTY reglister. returns a negative number on error
        int getChangeDuty();

        /// @brief Sets the MAXDUTY register, see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param maxduty only values in the range 0-255 are valid. this value sets the PWM duty cycle at which the motor runs at full speed when using PWM control, it is calculated as (MAXDUTY + 257) / 512 to produce a value in the range of 50.2 to 100%
        /// @return returns a negative number on error
        int setMaxDuty(int maxduty);
        /// @brief Gets the MAXDUTY register, see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the MAXDUTY register. returns a negative number on error
        int getMaxDuty();

        /// @brief Sets the STARTRPM register (6[7:0]7[7:4]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param startRPM only values in the range 0-4095 are valid. This is the speed at which the motor will spin when the Speed input duty cycle is lowered below STARTDUTY but above STOPDUTY
        /// @return returns a negative number on error
        int setStartRPM(int startRPM);
        /// @brief Gets the STARTRPM register (6[7:0]7[7:4]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the STARTRPM register. returns a negative number on error
        int getStartRPM();

        /// @brief Sets the MAXDUTYHYS register (7[3:0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param hysteresis only values in the range 0-15 are valid. This value controls how the motor switches between open and closed loop control.
        /// @return returns a negative number on error
        int setMaxDutyHysteresis(int hysteresis);
        /// @brief Gets the MAXDUTYHYS register (7[3:0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the MAXDUTYHYS register. returns a negative number on error
        int getMaxDutyHysteresis();

        /// @brief Sets the SPEEDSLOP register (8[7:0]9[7:2]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param speedslope only values in the range 0-16383 are valid. When changduty is not used: 64 * (Max RPM - Start RPM) / (MAXDUTY – STARTDUTY + 257). When changeduty is used: 64 * (ChangeDutyRPM – StartRPM) / (CHANGEDUTY * 2 – STARTDUTY)
        /// @return returns a negative number on error
        int setSpeedSlope(int speedslope);
        /// @brief Gets the SPEEDSLOP register (8[7:0]9[7:2]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the SPEEDSLOP register. returns a negative number on error
        int getSpeedSlope();
        
        /// @brief Sets the MAXOPEN register (9[1]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param maxopen Works in conjunction with NOSTOP and MAXOFF to control how target speed is affected by SPD Duty.
        /// @return returns a negative number on error
        int setMaxOpen(bool maxopen);
        /// @brief Gets the MAXOPEN register (9[1]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the MAXOPEN register. returns a negative number on error
        int getMaxOpen();
        
        /// @brief Sets the MAXOFF register (9[0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param maxoff Works in conjunction with NOSTOP and MAXOPEN to control how target speed is affected by SDP Duty
        /// @return returns a negative number on error
        int setMaxOff(bool maxoff);
        /// @brief Gets the MAXOFF register (9[0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the MAXOFF register. returns a negative number on error
        int getMaxOff();
        
        /// @brief Sets the SPEEDSLOP2 register (10[7:0]11[7:2]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param speedslope2 only values in the range 0-16383 are valid. Only used in conjunction with changeduty: 1024 * (Max output Duty * 512 - Output duty at Change Duty) / (MAXDUTY - CHANGEDUTY * 2 + 257) 
        /// @return returns a negative number on error
        int setSpeedSlope2(int speedslope2);
        /// @brief Gets the SPEEDSLOP2 register (10[7:0]11[7:2]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the SPEEDSLOP2 register. returns a negative number on error
        int getSpeedSlope2();
        
        /// @brief Sets the VCP_MASK register (11[1]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param VCP enables or disables charge pump low voltage detection
        /// @return returns a negative number on error
        int setChargePumpVCP(bool VCP);
        /// @brief Gets the VCP_MASK register (11[1]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the VCP_MASK register. returns a negative number on error
        int getChargePumpVCP();
        
        /// @brief Sets the OPENLOOP register (11[0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param openloop true: openloop control, false: closedloop control.
        /// @return returns a negative number on error
        int setOpenLoop(bool openLoop);
        /// @brief Gets the OPENLOOP register (11[0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the OPENLOOP register. returns a negative number on error
        int getOpenLoop();
        
        /// @brief Sets the KIX, KI, KPX and KP registers (12[7], 12[6:0], 13[7], 13[6:0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param KIX false: KI * 1, true: KI * 8
        /// @param KI only values in the range 0-127 are valid 
        /// @param KPX false: KP * 1, true: KP * 8
        /// @param KP only values in the range 0-127 are valid 
        /// @return returns a negative number on error
        int setPID(bool KIX, int KI, bool KPX, int KP);
        /// @brief Gets the KIX register (12[7], 12[6:0], 13[7], 13[6:0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the KIX register. returns a negative number on error
        int getKIX();
        /// @brief Gets the KI register (12[7], 12[6:0], 13[7], 13[6:0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the KI register. returns a negative number on error
        int getKI();
        /// @brief Gets the KPX register (12[7], 12[6:0], 13[7], 13[6:0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the KPX register. returns a negative number on error
        int getKPX();
        /// @brief Gets the KP register (12[7], 12[6:0], 13[7], 13[6:0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the KP register. returns a negative number on error
        int getKP();

        /// @brief Sets the STBY_MODE register (14[7]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param standbymode controls the behavior of the chip when the STBY pin is low. false: chip goes into standby when STBY is low, true: chip goes into standby when STBY is low and the speed is set to 0
        /// @return returns a negative number on error
        int setStandbyMode(bool standbymode);
        /// @brief Gets the STBY_MODE register (14[7]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the STBY_MODE register. returns a negative number on error
        int getStandbyMode();

        /// @brief Sets the DIR register (14[6]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param dirMode controls the polarity of the CWCCW pin.
        /// @return returns a negative number on error
        int setDIRMode(bool dirMode);
        /// @brief Gets the DIR register (14[6]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the DIR register. returns a negative number on error
        int getDIRMode();

        /// @brief Sets the POLEPAIR register (14[5:3]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param polesMode sets the number of pole pairs used for calculating motor RPM. Valid only in the range 0-7. 
        /// @return returns a negative number on error
        int setPoles(int polesMode);
        /// @brief Gets the POLEPAIR register (14[5:3]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the POLEPAIR register. returns a negative number on error
        int getPoles();

        /// @brief Sets the MAXSPEED register (14[2:1]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param polesMode sets the max speed of the motor. 0: 4096RPM, 1: 8192RPM, 2: 16384RPM, 3: 32768RPM. Other values are invalid 
        /// @return returns a negative number on error
        int setMaxSpeed(int maxSpeedMode);
        /// @brief Gets the MAXSPEED register (14[2:1]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the MAXSPEED register. returns a negative number on error
        int getMaxSpeed();

        /// @brief Sets the FG_ON register (14[0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param outputMode controls if the FG pin continues to output when the motor is stopped. 
        /// @return returns a negative number on error
        int setSpeedOutputMode(bool outputMode);
        /// @brief Gets the FG_ON register (14[0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the FG_ON register. returns a negative number on error
        int getSpeedOutputMode();

        /// @brief Sets the TSPSEL register (15[4]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param mode sets the control mode when the SEL pin is low. true: PWM control, false: Analog Voltage Control
        /// @return returns a negative number on error
        int setSpeedControlMode(bool mode);
        /// @brief Gets the TSPSEL register (15[4]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the TSPSEL register. returns a negative number on error
        int getSpeedControlMode();

        /// @brief Sets the SPDINV register (15[3]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param inverted controls the polarity of the speed input when SEL is low. true: SPD is inverted, false: SPD is normal
        /// @return returns a negative number on error
        int setSpeedInversion(bool inverted);
        /// @brief Gets the SPDINV register (15[3]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the SPDINV register. returns a negative number on error
        int getSpeedInversion();

        /// @brief Sets the LATCH register (15[2]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param autorecovery controls how the chip recovers after an error. false: autorecover from errors, true: latch is fault state
        /// @return returns a negative number on error
        int setAutoRecoveryMode(bool autorecovery);
        /// @brief Gets the LATCH register (15[2]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the LATCH register. returns a negative number on error
        int getAutoRecoveryMode();

        /// @brief Sets the OCPMASK register (15[1:0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param filter sets the digital filtering for Output Current Protection (OCP) and Overcurrent Detection (ISD). 0: no OCP filtering, 83ns ISD filtering, 1: 500ns OCP filtering, 583ns ISD filtering, 2: 666ns OCP filtering, 750ns ISD filtering, 3: 750ns OCP filtering, 833ns ISD filtering
        /// @return returns a negative number on error
        int setDigitalFiltering(int filter);
        /// @brief Gets the OCPMASK register (15[1:0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the OCPMASK register. returns a negative number on error
        int getDigitalFiltering();

        /// @brief Sets the LOCKDIS register (16[7]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param protectionDisable controls if the motor will go into an error state if it fails to transition out of forced comutations within 4 rotations. true: error mode is inhibited, false: motor is allowed to go into error mode
        /// @return returns a negative number on error
        int setForcedComutationProtection(bool protectionDisable);
        /// @brief Gets the LOCKDIS register (16[7]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the LOCKDIS register. returns a negative number on error
        int getForcedComutationProtection();

        /// @brief Sets the DUTYCHGLIMIT register (16[6:4]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param dutyChange sets how quickly the motor will adjust actual duty cycle to match desired duty cycle. When in open loop control 0 disables the limits. In closed loop control the 0-100% time in seconds is as follows: 0: 0.17, 1: 5.53, 2: 3.69, 3: 2.76, 4: 1.84, 5: 1.11, 6: 0.55, 7: 0.20
        /// @return returns a negative number on error
        int setDutyChangeLimit(int dutyChange);
        /// @brief Gets the DUTYCHGLIMIT register (16[6:4]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the DUTYCHGLIMIT register. returns a negative number on error
        int getDutyChangeLimit();
        
        /// @brief Sets the STARTCURRENT register (16[3:1]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param currentlimit sets the current limit that is applied during startup. Limit is 100% - (12.5% * currentlimit). Valid in the range of 0-7.
        /// @return returns a negative number on error
        int setStartCurrentLimit(int currentlimit);   // register 16[3:1]
        /// @brief Gets the STARTCURRENT register (16[3:1]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the STARTCURRENT register. returns a negative number on error
        int getStartCurrentLimit();   // register 16[3:1]

        /// @brief Sets the OCPDIS register (16[0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param OCPDisable true disables OCP protection
        /// @return returns a negative number on error
        int setOCPDisable(bool OCPDisable);
        /// @brief Gets the OCPDIS register (16[0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the OCPDIS register. returns a negative number on error
        int getOCPDisable();

        /// @brief Sets the SS_ADD_SEL register (17[7:6]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param ssRange Valid in the range 0-3. 
        /// @return returns a negative number on error
        int setSoftStartRange(int ssRange);
        /// @brief Gets the SS_ADD_SEL register (17[7:6]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the SS_ADD_SEL register. returns a negative number on error
        int getSoftStartRange();

        /// @brief Sets the SS_UP_SEL register (17[5:4]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param ssStepSize Valid in the range 0-3. 0: 1% steps, 1: 2% steps, 2: 5% steps, 3: 10% steps
        /// @return returns a negative number on error
        int setSoftStartStepSize(int ssStepSize);
        /// @brief Gets the SS_ADD_SEL register (17[5:4]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the SS_UP_SEL register. returns a negative number on error
        int getSoftStartStepSize();

        /// @brief Sets the SS_DUTYCHGLIMIT register (17[3:1]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param dutyChange sets how quickly the motor will adjust actual duty cycle to match desired duty cycle during SoftStart. The 0-100% time in seconds is as follows: 0: 0.17, 1: 5.53, 2: 3.69, 3: 2.76, 4: 1.84, 5: 1.11, 6: 0.55, 7: 0.20
        /// @return returns a negative number on error
        int setSoftStartDutyChangeLimit(int dutyChange);
        /// @brief Gets the SS_DUTYCHGLIMIT register (17[3:1]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the SS_DUTYCHGLIMIT register. returns a negative number on error
        int getSoftStartDutyChangeLimit();

        /// @brief Sets the DUTY_UP_TIME register (17[0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param dutyTimeMode true: 10.8ms, false: 2.7ms
        /// @return returns a negative number on error
        int setDutyUpTime(bool dutyTimeMode);
        /// @brief Gets the DUTY_UP_TIME register (17[0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the DUTY_UP_TIME register. returns a negative number on error
        int getDutyUpTime();
        
        /// @brief Sets the RPMLIMIT register (18[7:5]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param RPMLimit sets the limit for RPM change. 0: no limit, 1: 512RPM, 2: 2200RPM, 3: 3800RPM, 4: 5400RPM, 5: 7000RPM, 6: 8600RPM, 7: 10240RPM.
        /// @return returns a negative number on error
        int setRPMChangeLimit(int RPMLimit);
        /// @brief Gets the RPMLIMIT register (18[7:5]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the RPMLIMIT register. returns a negative number on error
        int getRPMChangeLimit();
        
        /// @brief Sets the BRK_INV register (18[4]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param brakeInverted true: brake pin is inverted, false: brake pin opperates normally.
        /// @return returns a negative number on error
        int setBrakeInverted(bool brakeInverted);
        /// @brief Gets the BRK_INV register (18[4]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the BRK_INV register. returns a negative number on error
        int getBrakeInverted();

        /// @brief Sets the ISD_MASK register (18[3]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param OCPDisabled true: inhibit detection of overcurrent detection, false: overcurrent detection opperates normally.
        /// @return returns a negative number on error
        int setOvercurrentDetectionDisabled(bool OCPDisabled);
        /// @brief Gets the ISD_MASK register (18[3]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the ISD_MASK register. returns a negative number on error
        int getOvercurrentDetectionDisabled();

        /// @brief Sets the RS_SEL register (18[2:1]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param filterMode sets the analog filtering for the RSA pin. 0: no filtering, 1: 200KHz, 2: 100KHz, 3: 50KHz
        /// @return returns a negative number on error
        int setRSAPinFiltering(int filterMode);
        /// @brief Gets the RS_SEL register (18[2:1]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the RS_SEL register. returns a negative number on error
        int getRSAPinFiltering();

        /// @brief Sets the ANTITHROUGH register (18[0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param autoDeadTimeDisabled true: disables auto dead time control. false, auto dead time control enabled.
        /// @return returns a negative number on error
        int setAutoDeadTimeControlDisabled(bool autoDeadTimeDisabled);
        /// @brief Gets the ANTITHROUGH register (18[0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the ANTITHROUGH register. returns a negative number on error
        int getAutoDeadTimeControlDisabled();

        /// @brief Sets the WAIT_TIME register (19[7:5]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param time time in seconds that braking should be applied during the brake sequence.
        /// @return returns a negative number on error
        int setBrakeTime(int time);
        /// @brief Gets the WAIT_TIME register (19[7:5]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the WAIT_TIME register. returns a negative number on error
        int getBrakeTime();

        /// @brief Sets the WAIT_MODE register (19[4]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param mode true: short phases for braking, false: all phases Hi-Z for braking.
        /// @return returns a negative number on error
        int setBrakeMode(bool mode);
        /// @brief Gets the WAIT_MODE register (19[4]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the WAIT_MODE register. returns a negative number on error
        int getBrakeMode();

        /// @brief Sets the WAIT_CON register (19[3]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param mode false: go into idle mode after braking, true: continue braking until speed command is set.
        /// @return returns a negative number on error
        int setBrakeReleaseMode(bool mode);
        /// @brief Gets the WAIT_CON register (19[3]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the WAIT_CON register. returns a negative number on error
        int getBrakeReleaseMode();

        /// @brief Sets the LOCK_BRK register (19[2]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param mode false: Hi-Z braking, true: Short Braking.
        /// @return returns a negative number on error
        int setErrorBrakingMode(bool mode);
        /// @brief Gets the LOCK_BRK register (19[2]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the LOCK_BRK register. returns a negative number on error
        int getErrorBrakingMode();

        /// @brief Sets the ALERT_INV register (19[1]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param inverted false: alert is active high, true: alert is active low
        /// @return returns a negative number on error
        int setAlertInverted(bool inverted);
        /// @brief Gets the ALERT_INV register (19[1]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the ALERT_INV register. returns a negative number on error
        int getAlertInverted();

        /// @brief Sets the TSD_MASK register (19[0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param disabled true: inhibit thermal shutdown, false: thermal shutdown opperates normally.
        /// @return returns a negative number on error
        int setThermalShutdownDisable(bool disabled);
        /// @brief Gets the TSD_MASK register (19[0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the TSD_MASK register. returns a negative number on error
        int getThermalShutdownDisable();

        /// @brief Sets the TRE register (20[7:5]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param time time to wait prior to attempting autorecovery from fault. 0: no wait, 1: 0.5 seconds, 2: 1 second, 3: 1.5 seconds, 4: 2 seconds, 5: 4 seconds, 6: 7 seconds, 7: 10 seconds.
        /// @return returns a negative number on error
        int setAutoRestartWaitTime(int time);
        /// @brief Gets the TRE register (20[7:5]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the TRE register. returns a negative number on error
        int getAutoRestartWaitTime();

        /// @brief Sets the PRE_TIP register (20[4:3]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param time 1st DC Excitation time. 0: 0 seconds, 1: 0.2 seconds, 2: 0.5 seconds, 3: 1 seconds.
        /// @return returns a negative number on error
        int setFirstDCExcitationTime(int time);
        /// @brief Gets the PRE_TIP register (20[4:3]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the PRE_TIP register. returns a negative number on error
        int getFirstDCExcitationTime();

        /// @brief Sets the TIP register (20[2:0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param time 2nd DC Excitation time. 0: 0.1 seconds, 1: 0.2 seconds, 2: 0.4 seconds, 3: 0.6 seconds, 4: 0.8 seconds, 5: 1 second, 6: 1.5 seconds, 7: 2 seconds
        /// @return returns a negative number on error
        int setSecondDCExcitationTime(int time);
        /// @brief Gets the TIP register (20[2:0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the TIP register. returns a negative number on error
        int getSecondDCExcitationTime();

        /// @brief Sets the LA register (21[7:4]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param angleSetting Valid in range 0-15. Sets the lead angle based on Table 8.22 in the datasheet.
        /// @return returns a negative number on error
        int setLeadAngle(int angleSetting);
        /// @brief Gets the LA register (21[7:4]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the LA register. returns a negative number on error
        int getLeadAngle();

        /// @brief Sets the FMAX register (21[3:2]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param maxRPMMode sets the speed at which the motor goes into an error state. 0: 0.75kHz, 1: 1.5kHz, 2: 3.0kHz, 3: no limit.
        /// @return returns a negative number on error
        int setMaxRPM(int maxRPMMode);
        /// @brief Gets the FMAX register (21[3:2]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the FMAX register. returns a negative number on error
        int getMaxRPM();

        /// @brief Sets the FST register (21[1:0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param comutationMode sets the electrical angle frequency during forced comutation. 0: 1.6Hz, 1: 3.2Hz, 2: 6.4Hz, 3: 12.8Hz
        /// @return returns a negative number on error
        int setForcedComutationFrequency(int comutationMode);
        /// @brief Gets the FST register (21[1:0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the FST register. returns a negative number on error
        int getForcedComutationFrequency();

        /// @brief Sets the FPWM register (22[4:2]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param frequencyMode Valid in the range 0-7. Sets the output PWM frequency based on table 8.26 from the datasheet.
        /// @return returns a negative number on error
        int setOutputPWMFrequencyMode(int frequencyMode);   
        /// @brief Gets the FPWM register (22[4:2]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the FPWM register. returns a negative number on error
        int getOutputPWMFrequencyMode();   

        /// @brief Sets the DEADTIME register (22[1:0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param frequencyMode Valid in the range 0-3. Sets the phase deadtime when autodeadtime is disabled. 0: 250ns, 1: 500ns, 2: 1000ns, 3: 1500ns.
        /// @return returns a negative number on error
        int setDeadtime(int deadtimeMode);
        /// @brief Gets the DEADTIME register (22[1:0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the DEADTIME register. returns a negative number on error
        int getDeadtime();

        /// @brief Sets the ISD_LVL register (23[7]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param thresholdMode true: 0.5V, false: 1.0V.
        /// @return returns a negative number on error
        int setOvercurrentDetectionThreshold(bool thresholdMode);
        /// @brief Gets the ISD_LVL register (23[7]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the ISD_LVL register. returns a negative number on error
        int getOvercurrentDetectionThreshold();

        /// @brief Sets the OCP_LVL register (23[6]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param OCPGain true: 20x, false: 10x.
        /// @return returns a negative number on error
        int setOvercurrentProtectionGain(bool OCPGain);
        /// @brief Gets the OCP_LVL register (23[6]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the OCP_LVL register. returns a negative number on error
        int getOvercurrentProtectionGain();

        /// @brief Sets the SOURCE register (23[5:3]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param currentMode Valid in the range 0-7. 0: 10mA, 1: 13.9mA, 2: 19.3mA, 3: 26.8mA, 4: 37.3mA, 5: 51.8mA, 6: 72mA, 7: 100mA.
        /// @return returns a negative number on error
        int setGateSourceCurrent(int currentMode);
        /// @brief Gets the SOURCE register (23[5:3]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the SOURCE register. returns a negative number on error
        int getGateSourceCurrent();

        /// @brief Sets the SINK register (23[2:0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param currentMode Valid in the range 0-7. 0: 20mA, 1: 27.8mA, 2: 38.6mA, 3: 53.7mA, 4: 74.6mA, 5: 103.6mA, 6: 143.9mA, 7: 200mA.
        /// @return returns a negative number on error
        int setGateSinkCurrent(int currentMode);        
        /// @brief Gets the SINK register (23[2:0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the SINK register. returns a negative number on error
        int getGateSinkCurrent();        

        /// @brief Sets the SINK register (24[7:6]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param currentMode Valid in the range 0-3. 0: no hysteresis, 1: ±100mV, 2: ±200mV, 3: ±300mV
        /// @return returns a negative number on error
        int setIdleModeHysteresisVoltage(int hysteresisMode);
        /// @brief Gets the SINK register (24[7:6]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the SINK register. returns a negative number on error
        int getIdleModeHysteresisVoltage();

        /// @brief Sets the SPD registers (27[7:0]28[7:6]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param speed Valid in the range 0-1023. Values from 512-1023 are full speed.
        /// @return returns a negative number on error
        int setSpeed(int speed);
        /// @brief Gets the SPD registers (27[7:0]28[7:6]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @return Returns the value stored in the SPD registers. returns a negative number on error
        int getSpeedSetting();

        /// @brief Gets the rotation frequency
        /// @return Returns the value stored in the HZ_CNT register. returns a negative number on error.
        int getRPM();

        /// @brief Writes the contents of the registers to the NVM. Note that the NVM is only rated for 10 write/erase cycles.
        /// @return returns a negative number on error
        int writeNVM();
        /// @brief reads the NVM into the chip registers. This is also automatically performed as part of the chip startup sequence.
        /// @return returns a negative number on error
        int readNVM();

    private:
        int NOSTOP;         // register 2[7]            // 0: disable, 1: enable
        int STOPDUTY;      // register 2[6:0]          // STOPDUTY * 2 / 512
        int STARTDUTY;     // register 3[7:0]          // STARTDUTY / 512
        int CHANGEDUTY;   // register 4[7:0]          // CHANGEDUTY * 2 / 512
        int MAXDUTY;      // register 5[7:0]          // (MAXDUTY + 257) / 512
        int STARTRPM;     // register 6[7:0]7[7:4]
        int MAXDUTYHYS;     // register 7[3:0]
        int SPEEDSLOP;    // register 8[7:0]9[7:2]
        int MAXOPEN;        // register 9[1]
        int MAXOFF;         // register 9[0]
        int SPEEDSLOP2;  // register 10[7:0]11[7:2]
        int VCP_MASK;       // register 11[1]
        int OPENLOOP;       // register 11[0]
        int KIX_REG;        // register 12[7]
        int KI_REG;        // register 12[6:0]
        int KPX_REG;        // register 13[7]
        int KP_REG;        // register 13[6:0]
        int STBY_MODE;      // register 14[7]
        int DIR;            // register 14[6]
        int POLEPAIR;       // register 14[5:3]
        int MAXSPEED;       // register 14[2:1]
        int FG_ON;          // register 14[0]
        int FGSEL;          // register 15[7:5]
        int TSPSEL;         // register 15[4]
        int SPDINV;         // register 15[3]
        int LATCH;          // register 15[2]
        int OCPMASK;        // register 15[1:0]
        int LOCKDIS;        // register 16[7]
        int DUTYCHGLIMIT;   // register 16[6:4]
        int STARTCURRENT;   // register 16[3:1]
        int OCPDIS;         // register 16[0]
        int SS_ADD_SEL;     // register 17[7:6]
        int SS_UP_SEL;      // register 17[5:4]
        int SS_DUTYCHGLIMIT;// register 17[3:1]
        int DUTY_UP_TIME;   // register 17[0]
        int RPMLIMIT;       // register 18[7:5]
        int BRK_INV;        // register 18[4]
        int ISD_MASK;       // register 18[3]
        int RS_SEL;         // register 18[2:1]
        int ANTITHROUGH;    // register 18[0]
        int WAIT_TIME;      // register 19[7:5]
        int WAIT_MODE;      // register 19[4]
        int WAIT_CON;       // register 19[3]
        int LOCK_BRK;       // register 19[2]
        int ALERT_INV;      // register 19[1]
        int TSD_MASK;       // register 19[0]
        int TRE;            // register 20[7:5]
        int PRE_TIP;        // register 20[4:3]
        int TIP;            // register 20[2:0]
        int LA;            // register 21[7:4]
        int FMAX;           // register 21[3:2]
        int FST;            // register 21[1:0]
        int FPWM;           // register 22[4:2]
        int DEADTIME;       // register 22[1:0]
        int ISD_LVL;        // register 23[7]
        int OCP_LVL;        // register 23[6]
        int SOURCE;         // register 23[5:3]
        int SINK;           // register 23[2:0]
        int COMP_HYS;       // register 24[7:6]
        int SPEED;          // register 27[7:0]28[7:6]

        int i2cWrite(int reg, uint8_t data);
        int i2cRead(int reg);
};