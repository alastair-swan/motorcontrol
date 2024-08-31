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

class TC78B011FTG{ 
    public:
        const int DEFAULT_NOSTOP = 0;         // register 2[7]            // 0: disable, 1: enable
        const int DEFAULT_STOPDUTY = 0;      // register 2[6:0]          // STOPDUTY * 2 / 512
        const int DEFAULT_STARTDUTY = 1;     // register 3[7:0]          // STARTDUTY / 512
        const int DEFAULT_CHANGEDUTY = 120;   // register 4[7:0]          // CHANGEDUTY * 2 / 512
        const int DEFAULT_MAXDUTY = 255;      // register 5[7:0]          // (MAXDUTY + 257) / 512
        const int DEFAULT_STARTRPM = 857;     // register 6[7:0]7[7:4]
        const int DEFAULT_MAXDUTYHYS = 3;     // register 7[3:0]
        const int DEFAULT_SPEEDSLOP = 815;    // register 8[7:0]9[7:2]
        const int DEFAULT_MAXOPEN = 0;        // register 9[1]
        const int DEFAULT_MAXOFF = 0;         // register 9[0]
        const int DEFAULT_SPEEDSLOP2 = 1795;  // register 10[7:0]11[7:2]
        const int DEFAULT_VCP_MASK = 0;       // register 11[1]
        const int DEFAULT_OPENLOOP = 1;       // register 11[0]
        const int DEFAULT_KIX = 0;            // register 12[7]
        const int DEFAULT_KI = 40;            // register 12[6:0]
        const int DEFAULT_KPX = 0;            // register 13[7]
        const int DEFAULT_KP = 30;            // register 13[6:0]
        const int DEFAULT_STBY_MODE = 0;      // register 14[7]
        const int DEFAULT_DIR = 1;            // register 14[6]
        const int DEFAULT_POLEPAIR = 1;       // register 14[5:3]
        const int DEFAULT_MAXSPEED = 0;       // register 14[2:1]
        const int DEFAULT_FG_ON = 0;          // register 14[0]
        const int DEFAULT_FGSEL = 0;          // register 15[7:5]
        const int DEFAULT_TSPSEL = 0;         // register 15[4]
        const int DEFAULT_SPDINV = 0;         // register 15[3]
        const int DEFAULT_LATCH = 0;          // register 15[2]
        const int DEFAULT_OCPMASK = 0;        // register 15[1:0]
        const int DEFAULT_LOCKDIS = 0;        // register 16[7]
        const int DEFAULT_DUTYCHGLIMIT = 3;   // register 16[6:4]
        const int DEFAULT_STARTCURRENT = 2;   // register 16[3:1]
        const int DEFAULT_OCPDIS = 0;         // register 16[0]
        const int DEFAULT_SS_ADD_SEL = 1;     // register 17[7:6]
        const int DEFAULT_SS_UP_SEL = 1;      // register 17[5:4]
        const int DEFAULT_SS_DUTYCHGLIMIT = 2;// register 17[3:1]
        const int DEFAULT_DUTY_UP_TIME = 0;   // register 17[0]
        const int DEFAULT_RPMLIMIT = 2;       // register 18[7:5]
        const int DEFAULT_BRK_INV = 0;        // register 18[4]
        const int DEFAULT_ISD_MASK = 0;       // register 18[3]
        const int DEFAULT_RS_SEL = 0;         // register 18[2:1]
        const int DEFAULT_ANTITHROUGH = 0;    // register 18[0]
        const int DEFAULT_WAIT_TIME = 2;      // register 19[7:5]
        const int DEFAULT_WAIT_MODE = 0;      // register 19[4]
        const int DEFAULT_WAIT_CON = 0;       // register 19[3]
        const int DEFAULT_LOCK_BRK = 0;       // register 19[2]
        const int DEFAULT_ALERT_INV = 1;      // register 19[1]
        const int DEFAULT_TSD_MASK = 0;       // register 19[0]
        const int DEFAULT_TRE = 1;            // register 20[7:5]
        const int DEFAULT_PRE_TIP = 2;        // register 20[4:3]
        const int DEFAULT_TIP = 3;            // register 20[2:0]
        const int DEFAULT_LA = 12;            // register 21[7:4]
        const int DEFAULT_FMAX = 0;           // register 21[3:2]
        const int DEFAULT_FST = 0;            // register 21[1:0]
        const int DEFAULT_FPWM = 7;           // register 22[4:2]
        const int DEFAULT_DEADTIME = 1;       // register 22[1:0]
        const int DEFAULT_ISD_LVL = 1;        // register 23[7]
        const int DEFAULT_OCP_LVL = 1;        // register 23[6]
        const int DEFAULT_SOURCE = 0;         // register 23[5:3]
        const int DEFAULT_SINK = 0;           // register 23[2:0]
        const int DEFAULT_COMP_HYS = 1;       // register 24[7:6]

        int i2cBusNumber;
        int i2cAddress;

        TC78B011FTG(int i2cBus, int address);

        /// @brief Sets the NOSTOP behavior, see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param nostop false: disable, true: enable
        /// @return returns a negative number on error
        int setNoStop(bool nostop);

        /// @brief Sets the STARTDUTY register, see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param stopduty only values in the range 0-127 are valid. this value sets the PWM duty cycle at which the motor stops when using PWM control, it is calculated as STOPDUTY × 2 / 512 to produce a value in the range of 0 to 49.6%
        /// @return returns a negative number on error
        int setStopDuty(int stopduty);
        
        /// @brief Sets the STARTDUTY register, see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param startduty only values in the range 0-255 are valid. this value sets the PWM duty cycle at which the motor starts when using PWM control, it is calculated as STOPDUTY / 512 to produce a value in the range of 0 to 49.8%
        /// @return returns a negative number on error
        int setStartDuty(int startduty);

        /// @brief Sets the CHANGEDUTY register, see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param changeduty only values in the range 0-255 are valid. this value sets the PWM duty cycle at which the motor transitions from the slope defined in SPEEDSLOP to the slope defined in SPEEDSLOPE2 when using PWM control, it is calculated as CHANGEDUTY × 2 / 512 to produce a value in the range of 0.4 to 99.6%. This value should be between STARTDUTY and MAXDUTY when used and should be 0 when not used.
        /// @return returns a negative number on error
        int setChangeDuty(int changeduty);
        
        /// @brief Sets the MAXDUTY register, see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param maxduty only values in the range 0-255 are valid. this value sets the PWM duty cycle at which the motor runs at full speed when using PWM control, it is calculated as (MAXDUTY + 257) / 512 to produce a value in the range of 50.2 to 100%
        /// @return returns a negative number on error
        int setMaxDuty(int maxduty);
        
        /// @brief Sets the STARTRPM register (6[7:0]7[7:4]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param startRPM only values in the range 0-4095 are valid. This is the speed at which the motor will spin when the Speed input duty cycle is lowered below STARTDUTY but above STOPDUTY
        /// @return returns a negative number on error
        int setStartRPM(int startRPM);

        /// @brief Sets the MAXDUTYHYS register (7[3:0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param hysteresis only values in the range 0-15 are valid. This value controls how the motor switches between open and closed loop control.
        /// @return returns a negative number on error
        int setMaxDutyHysteresis(int hysteresis);

        /// @brief Sets the SPEEDSLOP register (8[7:0]9[7:2]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param speedslope only values in the range 0-16383 are valid. When changduty is not used: 64 * (Max RPM - Start RPM) / (MAXDUTY – STARTDUTY + 257). When changeduty is used: 64 * (ChangeDutyRPM – StartRPM) / (CHANGEDUTY * 2 – STARTDUTY)
        /// @return returns a negative number on error
        int setSpeedSlope(int speedslope);
        
        /// @brief Sets the MAXOPEN register (9[1]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param maxopen Works in conjunction with NOSTOP and MAXOFF to control how target speed is affected by SPD Duty.
        /// @return returns a negative number on error
        int setMaxOpen(bool maxopen);
        
        /// @brief Sets the MAXOFF register (9[0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param maxoff Works in conjunction with NOSTOP and MAXOPEN to control how target speed is affected by SDP Duty
        /// @return returns a negative number on error
        int setMaxOff(bool maxoff);
        
        /// @brief Sets the SPEEDSLOP2 register (10[7:0]11[7:2]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param speedslope2 only values in the range 0-16383 are valid. Only used in conjunction with changeduty: 1024 * (Max output Duty * 512 - Output duty at Change Duty) / (MAXDUTY - CHANGEDUTY * 2 + 257) 
        /// @return returns a negative number on error
        int setSpeedSlope2(int speedslope2);
        
        /// @brief Sets the VCP_MASK register (11[1]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param VCP enables or disables charge pump low voltage detection
        /// @return returns a negative number on error
        int setChargePumpVCP(bool VCP);
        
        /// @brief Sets the OPENLOOP register (11[0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param openloop true: openloop control, false: closedloop control.
        /// @return returns a negative number on error
        int setOpenLoop(bool openLoop);
        
        /// @brief Sets the KIX, KI, KPX and KP registers (12[7], 12[6:0], 13[7], 13[6:0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param KIX false: KI * 1, true: KI * 8
        /// @param KI only values in the range 0-127 are valid 
        /// @param KPX false: KP * 1, true: KP * 8
        /// @param KP only values in the range 0-127 are valid 
        /// @return returns a negative number on error
        int setPID(bool KIX, int KI, bool KPX, int KP);

        /// @brief Sets the STBY_MODE register (14[7]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param standbymode controls the behavior of the chip when the STBY pin is low. false: chip goes into standby when STBY is low, true: chip goes into standby when STBY is low and the speed is set to 0
        /// @return returns a negative number on error
        int setStandbyMode(bool standbymode);

        /// @brief Sets the DIR register (14[6]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param dirMode controls the polarity of the CWCCW pin.
        /// @return returns a negative number on error
        int setDIRMode(bool dirMode);

        /// @brief Sets the POLEPAIR register (14[5:3]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param polesMode sets the number of pole pairs used for calculating motor RPM. Valid only in the range 0-7. 
        /// @return returns a negative number on error
        int setPoles(int polesMode);

        /// @brief Sets the MAXSPEED register (14[2:1]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param polesMode sets the max speed of the motor. 0: 4096RPM, 1: 8192RPM, 2: 16384RPM, 3: 32768RPM. Other values are invalid 
        /// @return returns a negative number on error
        int setMaxSpeed(int maxSpeedMode);

        /// @brief Sets the FG_ON register (14[0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param outputMode controls if the FG pin continues to output when the motor is stopped. 
        /// @return returns a negative number on error
        int setSpeedOutputMode(bool outputMode);

        /// @brief Sets the TSPSEL register (15[4]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param mode sets the control mode when the SEL pin is low. true: PWM control, false: Analog Voltage Control
        /// @return returns a negative number on error
        int setSpeedControlMode(bool mode);

        /// @brief Sets the SPDINV register (15[3]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param inverted controls the polarity of the speed input when SEL is low. true: SPD is inverted, false: SPD is normal
        /// @return returns a negative number on error
        int setSpeedInversion(bool inverted);

        /// @brief Sets the LATCH register (15[2]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param autorecovery controls how the chip recovers after an error. false: autorecover from errors, true: latch is fault state
        /// @return returns a negative number on error
        int setAutoRecoveryMode(bool autorecovery);

        /// @brief Sets the OCPMASK register (15[1:0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param filter sets the digital filtering for Output Current Protection (OCP) and Overcurrent Detection (ISD). 0: no OCP filtering, 83ns ISD filtering, 1: 500ns OCP filtering, 583ns ISD filtering, 2: 666ns OCP filtering, 750ns ISD filtering, 3: 750ns OCP filtering, 833ns ISD filtering
        /// @return returns a negative number on error
        int setDigitalFiltering(int filter);

        /// @brief Sets the LOCKDIS register (16[7]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param protectionDisable controls if the motor will go into an error state if it fails to transition out of forced comutations within 4 rotations. true: error mode is inhibited, false: motor is allowed to go into error mode
        /// @return returns a negative number on error
        int setForcedComutationProtection(bool protectionDisable);

        /// @brief Sets the DUTYCHGLIMIT register (16[6:4]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param dutyChange sets how quickly the motor will adjust actual duty cycle to match desired duty cycle. When in open loop control 0 disables the limits. In closed loop control the 0-100% time in seconds is as follows: 0: 0.17, 1: 5.53, 2: 3.69, 3: 2.76, 4: 1.84, 5: 1.11, 6: 0.55, 7: 0.20
        /// @return returns a negative number on error
        int setDutyChangeLimit(int dutyChange);
        
        /// @brief Sets the STARTCURRENT register (16[3:1]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param currentlimit sets the current limit that is applied during startup. Limit is 100% - (12.5% * currentlimit). Valid in the range of 0-7.
        /// @return returns a negative number on error
        int setStartCurrentLimit(int currentlimit);   // register 16[3:1]

        /// @brief Sets the OCPDIS register (16[0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param OCPDisable true disables OCP protection
        /// @return returns a negative number on error
        int setOCPDisable(bool OCPDisable);

        /// @brief Sets the SS_ADD_SEL register (17[7:6]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param ssRange Valid in the range 0-3. 
        /// @return returns a negative number on error
        int setSoftStartRange(int ssRange);

        /// @brief Sets the SS_ADD_SEL register (17[5:4]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param ssStepSize Valid in the range 0-3. 0: 1% steps, 1: 2% steps, 2: 5% steps, 3: 10% steps
        /// @return returns a negative number on error
        int setSoftStartStepSize(int ssStepSize);

        /// @brief Sets the SS_DUTYCHGLIMIT register (17[3:1]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param dutyChange sets how quickly the motor will adjust actual duty cycle to match desired duty cycle during SoftStart. The 0-100% time in seconds is as follows: 0: 0.17, 1: 5.53, 2: 3.69, 3: 2.76, 4: 1.84, 5: 1.11, 6: 0.55, 7: 0.20
        /// @return returns a negative number on error
        int setSoftStartDutyChangeLimit(int dutyChange);

        /// @brief Sets the DUTY_UP_TIME register (17[0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param dutyTimeMode true: 10.8ms, false: 2.7ms
        /// @return returns a negative number on error
        int setDutyUpTime(bool dutyTimeMode);
        
        /// @brief Sets the RPMLIMIT register (18[7:5]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param RPMLimit sets the limit for RPM change. 0: no limit, 1: 512RPM, 2: 2200RPM, 3: 3800RPM, 4: 5400RPM, 5: 7000RPM, 6: 8600RPM, 7: 10240RPM.
        /// @return returns a negative number on error
        int setRPMChangeLimit(int RPMLimit);
        
        /// @brief Sets the BRK_INV register (18[4]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param brakeInverted true: brake pin is inverted, false: brake pin opperates normally.
        /// @return returns a negative number on error
        int setBrakeInverted(bool brakeInverted);

        /// @brief Sets the ISD_MASK register (18[3]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param OCPDisabled true: inhibit detection of overcurrent detection, false: overcurrent detection opperates normally.
        /// @return returns a negative number on error
        int setOvercurrentDetectionDisabled(bool OCPDisabled);

        /// @brief Sets the RS_SEL register (18[2:1]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param filterMode sets the analog filtering for the RSA pin. 0: no filtering, 1: 200KHz, 2: 100KHz, 3: 50KHz
        /// @return returns a negative number on error
        int setRSAPinFiltering(int filterMode);

        /// @brief Sets the ANTITHROUGH register (18[0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param autoDeadTimeDisabled true: disables auto dead time control. false, auto dead time control enabled.
        /// @return returns a negative number on error
        int setAutoDeadTimeControlDisabled(bool autoDeadTimeDisabled);

        /// @brief Sets the WAIT_TIME register (19[7:5]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param time time in seconds that braking should be applied during the brake sequence.
        /// @return returns a negative number on error
        int setBrakeTime(int time);

        /// @brief Sets the WAIT_MODE register (19[4]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param mode true: short phases for braking, false: all phases Hi-Z for braking.
        /// @return returns a negative number on error
        int setBrakeMode(bool mode);

        /// @brief Sets the WAIT_CON register (19[3]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param mode false: go into idle mode after braking, true: continue braking until speed command is set.
        /// @return returns a negative number on error
        int setBrakeReleaseMode(bool mode);

        /// @brief Sets the LOCK_BRK register (19[2]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param mode false: Hi-Z braking, true: Short Braking.
        /// @return returns a negative number on error
        int setErrorBrakingMode(bool mode);

        /// @brief Sets the ALERT_INV register (19[1]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param inverted false: alert is active high, true: alert is active low
        /// @return returns a negative number on error
        int setAlertInverted(bool inverted);

        /// @brief Sets the TSD_MASK register (19[0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param disabled true: inhibit thermal shutdown, false: thermal shutdown opperates normally.
        /// @return returns a negative number on error
        int setThermalShutdownDisable(bool disabled);

        /// @brief Sets the TRE register (20[7:5]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param time time to wait prior to attempting autorecovery from fault. 0: no wait, 1: 0.5 seconds, 2: 1 second, 3: 1.5 seconds, 4: 2 seconds, 5: 4 seconds, 6: 7 seconds, 7: 10 seconds.
        /// @return returns a negative number on error
        int setAutoRestartWaitTime(int time);

        /// @brief Sets the PRE_TIP register (20[4:3]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param time 1st DC Excitation time. 0: 0 seconds, 1: 0.2 seconds, 2: 0.5 seconds, 3: 1 seconds.
        /// @return returns a negative number on error
        int setFirstDCExcitationTime(int time);

        /// @brief Sets the TIP register (20[2:0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param time 2nd DC Excitation time. 0: 0.1 seconds, 1: 0.2 seconds, 2: 0.4 seconds, 3: 0.6 seconds, 4: 0.8 seconds, 5: 1 second, 6: 1.5 seconds, 7: 2 seconds
        /// @return returns a negative number on error
        int setSecondDCExcitationTime(int time);

        /// @brief Sets the LA register (21[7:4]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param angleSetting Valid in range 0-15. Sets the lead angle based on Table 8.22 in the datasheet.
        /// @return returns a negative number on error
        int setLeadAngle(int angleSetting);

        /// @brief Sets the FMAX register (21[3:2]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param maxRPMMode sets the speed at which the motor goes into an error state. 0: 0.75kHz, 1: 1.5kHz, 2: 3.0kHz, 3: no limit.
        /// @return returns a negative number on error
        int setMaxRPM(int maxRPMMode);

        /// @brief Sets the FST register (21[1:0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param comutationMode sets the electrical angle frequency during forced comutation. 0: 1.6Hz, 1: 3.2Hz, 2: 6.4Hz, 3: 12.8Hz
        /// @return returns a negative number on error
        int setForcedComutationFrequency(int comutationMode);

        /// @brief Sets the FPWM register (22[4:2]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param frequencyMode Valid in the range 0-7. Sets the output PWM frequency based on table 8.26 from the datasheet.
        /// @return returns a negative number on error
        int setOutputPWMFrequencyMode(int frequencyMode);   

        /// @brief Sets the DEADTIME register (22[1:0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param frequencyMode Valid in the range 0-3. Sets the phase deadtime when autodeadtime is disabled. 0: 250ns, 1: 500ns, 2: 1000ns, 3: 1500ns.
        /// @return returns a negative number on error
        int setDeadtime(int deadtimeMode);

        /// @brief Sets the ISD_LVL register (23[7]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param thresholdMode true: 0.5V, false: 1.0V.
        /// @return returns a negative number on error
        int setOvercurrentDetectionThreshold(bool thresholdMode);

        /// @brief Sets the OCP_LVL register (23[6]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param OCPGain true: 20x, false: 10x.
        /// @return returns a negative number on error
        int setOvercurrentProtectionGain(bool OCPGain);

        /// @brief Sets the SOURCE register (23[5:3]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param currentMode Valid in the range 0-7. 0: 10mA, 1: 13.9mA, 2: 19.3mA, 3: 26.8mA, 4: 37.3mA, 5: 51.8mA, 6: 72mA, 7: 100mA.
        /// @return returns a negative number on error
        int setGateSourceCurrent(int currentMode);

        /// @brief Sets the SINK register (23[2:0]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param currentMode Valid in the range 0-7. 0: 20mA, 1: 27.8mA, 2: 38.6mA, 3: 53.7mA, 4: 74.6mA, 5: 103.6mA, 6: 143.9mA, 7: 200mA.
        /// @return returns a negative number on error
        int setGateSinkCurrent(int currentMode);        

        /// @brief Sets the SINK register (24[7:6]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param currentMode Valid in the range 0-3. 0: no hysteresis, 1: ±100mV, 2: ±200mV, 3: ±300mV
        /// @return returns a negative number on error
        int setIdleModeHysteresisVoltage(int hysteresisMode);

        /// @brief Sets the SPD registers (27[7:0]28[7:6]), see https://toshiba.semicon-storage.com/info/TC78B011FTG_datasheet_en_20220810.pdf?did=140801&prodName=TC78B011FTG
        /// @param speed Valid in the range 0-1023. Values from 512-1023 are full speed.
        /// @return returns a negative number on error
        int setSpeed(int speed);

        int getSpeed();

        int writeNVM();

    private:
        int NOSTOP = DEFAULT_NOSTOP;         // register 2[7]            // 0: disable, 1: enable
        int STOPDUTY = DEFAULT_STOPDUTY;      // register 2[6:0]          // STOPDUTY * 2 / 512
        int STARTDUTY = DEFAULT_STARTDUTY;     // register 3[7:0]          // STARTDUTY / 512
        int CHANGEDUTY = DEFAULT_CHANGEDUTY;   // register 4[7:0]          // CHANGEDUTY * 2 / 512
        int MAXDUTY = DEFAULT_MAXDUTY;      // register 5[7:0]          // (MAXDUTY + 257) / 512
        int STARTRPM = DEFAULT_STARTRPM;     // register 6[7:0]7[7:4]
        int MAXDUTYHYS = DEFAULT_MAXDUTYHYS;     // register 7[3:0]
        int SPEEDSLOP = DEFAULT_SPEEDSLOP;    // register 8[7:0]9[7:2]
        int MAXOPEN = DEFAULT_MAXOPEN;        // register 9[1]
        int MAXOFF = DEFAULT_MAXOFF;         // register 9[0]
        int SPEEDSLOP2 = DEFAULT_SPEEDSLOP2;  // register 10[7:0]11[7:2]
        int VCP_MASK = DEFAULT_VCP_MASK;       // register 11[1]
        int OPENLOOP = DEFAULT_OPENLOOP;       // register 11[0]
        int KIX_REG = 0;        // register 12[7]
        int KI_REG = 40;        // register 12[6:0]
        int KPX_REG = 0;        // register 13[7]
        int KP_REG = 30;        // register 13[6:0]
        int STBY_MODE = 0;      // register 14[7]
        int DIR = 1;            // register 14[6]
        int POLEPAIR = 6;       // register 14[5:3]
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
        int ALERT_INV = 0;      // register 19[1]
        int TSD_MASK = 0;       // register 19[0]
        int TRE = 1;            // register 20[7:5]
        int PRE_TIP = 2;        // register 20[4:3]
        int TIP = 3;            // register 20[2:0]
        int LA = 12;            // register 21[7:4]
        int FMAX = 0;           // register 21[3:2]
        int FST = 0;            // register 21[1:0]
        int FPWM = 4;           // register 22[4:2]
        int DEADTIME = 1;       // register 22[1:0]
        int ISD_LVL = 1;        // register 23[7]
        int OCP_LVL = 1;        // register 23[6]
        int SOURCE = 0;         // register 23[5:3]
        int SINK = 0;           // register 23[2:0]
        int COMP_HYS = 1;       // register 24[7:6]
        int SPEED = 0;          // register 27[7:0]28[7:6]

        int i2cWrite(int reg, uint8_t data);
        int i2cRead(int reg);
        int setup();

};