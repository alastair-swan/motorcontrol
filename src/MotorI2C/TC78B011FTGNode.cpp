#include "TC78B011FTG.h"
#include <napi.h>

using namespace Napi;

TC78B011FTG motors[] = {TC78B011FTG(1, 0x29), TC78B011FTG(1, 0x32)};

Number motorRegisterGetter(const CallbackInfo &info){
    if (!info[0].IsNumber()){
        std::cout << "invalid motor value in position 0. Expected a number: " << info[0].As<String>().Utf8Value() << std::endl;
        return Number::New(info.Env(), -1);
    }
    int motorNumber = info[0].As<Number>().Int32Value();
    if (motorNumber < 0 || motorNumber > 1){
        std::cout << "invalid motor number in position 0. Expected a value in the range 0-1: " << motorNumber << std::endl;
        return Number::New(info.Env(), -2);
    }
    std::string paramName = info[1].As<String>().Utf8Value();
    if (paramName == "CP_LOW"){
        return Number::New(info.Env(), motors[motorNumber].getChargePumpErrorState());
    }
    if (paramName == "TSD"){
        return Number::New(info.Env(), motors[motorNumber].getTemperatureErrorState());
    }
    if (paramName == "ISD"){
        return Number::New(info.Env(), motors[motorNumber].getCurrentErrorState());
    }
    if (paramName == "OV_SPD"){
        return Number::New(info.Env(), motors[motorNumber].getOverspeedErrorState());   
    }
    if (paramName == "OU_SPD"){
        return Number::New(info.Env(), motors[motorNumber].getUnderspeedErrorState());  
    } 
    if (paramName == "ST_FAIL"){
        return Number::New(info.Env(), motors[motorNumber].getStartupErrorState());     
    } 
    if (paramName == "USERID"){
        return Number::New(info.Env(), motors[motorNumber].getUserID());                
    } 
    if (paramName == "NOSTOP"){
        return Number::New(info.Env(), motors[motorNumber].getNoStop());                
    } 
    if (paramName == "STOPDUTY"){
        return Number::New(info.Env(), motors[motorNumber].getStopDuty());              
    } 
    if (paramName == "STARTDUTY"){
        return Number::New(info.Env(), motors[motorNumber].getStartDuty());             
    } 
    if (paramName == "CHANGEDUTY"){
        return Number::New(info.Env(), motors[motorNumber].getChangeDuty());            
    } 
    if (paramName == "MAXDUTY"){
        return Number::New(info.Env(), motors[motorNumber].getMaxDuty());               
    } 
    if (paramName == "STARTRPM"){
        return Number::New(info.Env(), motors[motorNumber].getStartRPM());              
    } 
    if (paramName == "MAXDUTYHYS"){
        return Number::New(info.Env(), motors[motorNumber].getMaxDutyHysteresis());     
    } 
    if (paramName == "SPEEDSLOP"){
        return Number::New(info.Env(), motors[motorNumber].getSpeedSlope());            
    } 
    if (paramName == "MAXOPEN"){
        return Number::New(info.Env(), motors[motorNumber].getMaxOpen());               
    } 
    if (paramName == "MAXOFF"){
        return Number::New(info.Env(), motors[motorNumber].getMaxOff());                
    }
    if (paramName == "SPEEDSLOP2"){
        return Number::New(info.Env(), motors[motorNumber].getSpeedSlope2());           
    } 
    if (paramName == "VCP_MASK"){
        return Number::New(info.Env(), motors[motorNumber].getChargePumpVCP());         
    } 
    if (paramName == "OPENLOOP"){
        return Number::New(info.Env(), motors[motorNumber].getOpenLoop());              
    } 
    if (paramName == "KIX"){
        return Number::New(info.Env(), motors[motorNumber].getKIX());                   
    } 
    if (paramName == "KI"){
        return Number::New(info.Env(), motors[motorNumber].getKI());                    
    } 
    if (paramName == "KPX"){
        return Number::New(info.Env(), motors[motorNumber].getKPX());                   
    }
    if (paramName == "KP"){
        return Number::New(info.Env(), motors[motorNumber].getKP());                    
    }
    if (paramName == "STBY_MODE"){
        return Number::New(info.Env(), motors[motorNumber].getStandbyMode());
    }
    if (paramName == "DIR"){
        return Number::New(info.Env(), motors[motorNumber].getDIRMode());
    }
    if (paramName == "POLEPAIR"){
        return Number::New(info.Env(), motors[motorNumber].getPoles());
    }
    if (paramName == "MAXPSEED"){
        return Number::New(info.Env(), motors[motorNumber].getMaxSpeed());
    }
    if (paramName == "FG_ON"){
        return Number::New(info.Env(), motors[motorNumber].getSpeedOutputMode());
    }
    if (paramName == "TSPSEL"){
        return Number::New(info.Env(), motors[motorNumber].getSpeedControlMode());
    }
    if (paramName == "SPDINV"){
        return Number::New(info.Env(), motors[motorNumber].getSpeedInversion());
    }
    if (paramName == "LATCH"){
        return Number::New(info.Env(), motors[motorNumber].getAutoRecoveryMode());
    }
    if (paramName == "OCPMASK"){
        return Number::New(info.Env(), motors[motorNumber].getDigitalFiltering());
    }
    if (paramName == "LOCKDIS"){
        return Number::New(info.Env(), motors[motorNumber].getForcedComutationProtection());
    }
    if (paramName == "DUTYCHGLIMIT"){
        return Number::New(info.Env(), motors[motorNumber].getDutyChangeLimit());
    }
    if (paramName == "STARTCURRENT"){
        return Number::New(info.Env(), motors[motorNumber].getStartCurrentLimit());
    }
    if (paramName == "OCPDIS"){
        return Number::New(info.Env(), motors[motorNumber].getOCPDisable());
    }
    if (paramName == "SS_ADD_SEL"){
        return Number::New(info.Env(), motors[motorNumber].getSoftStartRange());
    }
    if (paramName == "SS_UP_SEL"){
        return Number::New(info.Env(), motors[motorNumber].getSoftStartStepSize());
    }
    if (paramName == "SS_DUTYCHGLIMIT"){
        return Number::New(info.Env(), motors[motorNumber].getSoftStartDutyChangeLimit());
    }
    if (paramName == "DUTY_UP_TIME"){
        return Number::New(info.Env(), motors[motorNumber].getDutyUpTime());
    }
    if (paramName == "RPMLIMIT"){
        return Number::New(info.Env(), motors[motorNumber].getRPMChangeLimit());
    }
    if (paramName == "BRK_INV"){
        return Number::New(info.Env(), motors[motorNumber].getBrakeInverted());
    }
    if (paramName == "ISD_MASK"){
        return Number::New(info.Env(), motors[motorNumber].getOvercurrentDetectionDisabled());
    }
    if (paramName == "RS_SEL"){
        return Number::New(info.Env(), motors[motorNumber].getRSAPinFiltering());
    }
    if (paramName == "ANTITHROUGH"){
        return Number::New(info.Env(), motors[motorNumber].getAutoDeadTimeControlDisabled());
    }
    if (paramName == "WAIT_TIME"){
        return Number::New(info.Env(), motors[motorNumber].getBrakeTime());
    }
    if (paramName == "WAIT_MODE"){
        return Number::New(info.Env(), motors[motorNumber].getBrakeMode());
    }
    if (paramName == "WAIT_CON"){
        return Number::New(info.Env(), motors[motorNumber].getBrakeReleaseMode());
    }
    if (paramName == "LOCK_BRK"){
        return Number::New(info.Env(), motors[motorNumber].getErrorBrakingMode());
    }
    if (paramName == "ALERTINV"){
        return Number::New(info.Env(), motors[motorNumber].getAlertInverted());
    }
    if (paramName == "TSD_MASK"){
        return Number::New(info.Env(), motors[motorNumber].getThermalShutdownDisable());
    }
    if (paramName == "TRE"){
        return Number::New(info.Env(), motors[motorNumber].getAutoRestartWaitTime());
    }
    if (paramName == "PRE_TIP"){
        return Number::New(info.Env(), motors[motorNumber].getFirstDCExcitationTime());
    }
    if (paramName == "TIP"){
        return Number::New(info.Env(), motors[motorNumber].getSecondDCExcitationTime());
    }
    if (paramName == "LA"){
        return Number::New(info.Env(), motors[motorNumber].getLeadAngle());
    }
    if (paramName == "FMAX"){
        return Number::New(info.Env(), motors[motorNumber].getMaxRPM());
    }
    if (paramName == "FST"){
        return Number::New(info.Env(), motors[motorNumber].getForcedComutationFrequency());
    }
    if (paramName == "FPWM"){
        return Number::New(info.Env(), motors[motorNumber].getOutputPWMFrequencyMode());
    }
    if (paramName == "DEADTIME"){
        return Number::New(info.Env(), motors[motorNumber].getDeadtime());
    }
    if (paramName == "ISD_LVL"){
        return Number::New(info.Env(), motors[motorNumber].getOvercurrentDetectionThreshold());
    }
    if (paramName == "OCP_LVL"){
        return Number::New(info.Env(), motors[motorNumber].getOvercurrentProtectionGain());
    }
    if (paramName == "SOURCE"){
        return Number::New(info.Env(), motors[motorNumber].getGateSourceCurrent());
    }
    if (paramName == "SINK"){
        return Number::New(info.Env(), motors[motorNumber].getGateSinkCurrent());
    }
    if (paramName == "COMP_HYS"){
        return Number::New(info.Env(), motors[motorNumber].getIdleModeHysteresisVoltage());
    }
    if (paramName == "SPD"){
        return Number::New(info.Env(), motors[motorNumber].getSpeedSetting());
    }
    if (paramName == "HZ_CNT"){
        return Number::New(info.Env(), motors[motorNumber].getRPM());
    }
// "HZ_CNT",           // 67
// "NVM_WR",           // 68
// "NVM_ST"            // 69
    return Number::New(info.Env(), -1);    
}

Number motorRegisterSetter(const CallbackInfo &info){
    if (!info[0].IsNumber()){
        std::cout << "invalid motor value in position 0. Expected a number: " << info[0].As<String>().Utf8Value() << std::endl;
        return Number::New(info.Env(), -1);
    }
    int motorNumber = info[0].As<Number>().Int32Value();
    if (motorNumber < 0 || motorNumber > 1){
        std::cout << "invalid motor number in position 0. Expected a value in the range 0-1: " << motorNumber << std::endl;
        return Number::New(info.Env(), -2);
    }
    std::string paramName = info[1].As<String>().Utf8Value();
    if (info[2].IsEmpty()){
        return Number::New(info.Env(), -3);
    }
    if (paramName == "USERID"){
        return Number::New(info.Env(), motors[motorNumber].setUserID((uint8_t)(info[2].As<Number>().Int32Value())));                
    } 
    if (paramName == "NOSTOP"){
        bool controlBit = false; 
        if (info[2].IsString()){
            std::string inputVal = info[2].As<String>().Utf8Value();
            if (inputVal == "on" || inputVal == "true" || inputVal == "enable" || inputVal == "enabled"){
                controlBit = true;
            }
            else if (inputVal == "off" || inputVal == "false" || inputVal == "disable" || inputVal == "disabled"){
                controlBit = false;
            }
            else{
                return Number::New(info.Env(), -11);
            }
        }
        else if (info[2].IsBoolean()){
            controlBit = info[2].As<Boolean>();
        }
        else{
            return Number::New(info.Env(), -11); 
        }
        return Number::New(info.Env(), motors[motorNumber].setNoStop(controlBit));                
    } 
    if (paramName == "STOPDUTY"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setStopDuty((uint8_t)(info[2].As<Number>().Int32Value())));
        }    
        else{
            return Number::New(info.Env(), -11); 
        }
    } 
    if (paramName == "STARTDUTY"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setStartDuty((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        }      
    } 
    if (paramName == "CHANGEDUTY"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setChangeDuty((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        }              
    } 
    if (paramName == "MAXDUTY"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setMaxDuty((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        }      
    } 
    if (paramName == "STARTRPM"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setStartRPM((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        }      
    } 
    if (paramName == "MAXDUTYHYS"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setMaxDutyHysteresis((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        }      
    } 
    if (paramName == "SPEEDSLOP"){
            if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setSpeedSlope((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        }      
    } 
    if (paramName == "MAXOPEN"){
        bool controlBit = false; 
        if (info[2].IsString()){
            std::string inputVal = info[2].As<String>().Utf8Value();
            if (inputVal == "on" || inputVal == "true" || inputVal == "enable" || inputVal == "enabled"){
                controlBit = true;
            }
            else if (inputVal == "off" || inputVal == "false" || inputVal == "disable" || inputVal == "disabled"){
                controlBit = false;
            }
            else{
                return Number::New(info.Env(), -11);
            }
        }
        else if (info[2].IsBoolean()){
            controlBit = info[2].As<Boolean>();
        }
        else{
            return Number::New(info.Env(), -11); 
        }
        return Number::New(info.Env(), motors[motorNumber].setMaxOpen(controlBit));               
    } 
    if (paramName == "MAXOFF"){
        bool controlBit = false; 
        if (info[2].IsString()){
            std::string inputVal = info[2].As<String>().Utf8Value();
            if (inputVal == "on" || inputVal == "true" || inputVal == "enable" || inputVal == "enabled"){
                controlBit = true;
            }
            else if (inputVal == "off" || inputVal == "false" || inputVal == "disable" || inputVal == "disabled"){
                controlBit = false;
            }
            else{
                return Number::New(info.Env(), -11);
            }
        }
        else if (info[2].IsBoolean()){
            controlBit = info[2].As<Boolean>();
        }
        else{
            return Number::New(info.Env(), -11); 
        }
        return Number::New(info.Env(), motors[motorNumber].setMaxOff(controlBit));                
    }
    if (paramName == "SPEEDSLOP2"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setSpeedSlope2((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        }      
    } 
    if (paramName == "VCP_MASK"){
        bool controlBit = false; 
        if (info[2].IsString()){
            std::string inputVal = info[2].As<String>().Utf8Value();
            if (inputVal == "on" || inputVal == "true" || inputVal == "enable" || inputVal == "enabled"){
                controlBit = true;
            }
            else if (inputVal == "off" || inputVal == "false" || inputVal == "disable" || inputVal == "disabled"){
                controlBit = false;
            }
            else{
                return Number::New(info.Env(), -11);
            }
        }
        else if (info[2].IsBoolean()){
            controlBit = info[2].As<Boolean>();
        }
        else{
            return Number::New(info.Env(), -11); 
        }
        return Number::New(info.Env(), motors[motorNumber].setChargePumpVCP(controlBit));         
    } 
    if (paramName == "OPENLOOP"){
        bool controlBit = false; 
        if (info[2].IsString()){
            std::string inputVal = info[2].As<String>().Utf8Value();
            if (inputVal == "on" || inputVal == "true" || inputVal == "enable" || inputVal == "enabled" || inputVal == "open loop"){
                controlBit = true;
            }
            else if (inputVal == "off" || inputVal == "false" || inputVal == "disable" || inputVal == "disabled" || inputVal == "closed loop"){
                controlBit = false;
            }
            else{
                return Number::New(info.Env(), -11);
            }
        }
        else if (info[2].IsBoolean()){
            controlBit = info[2].As<Boolean>();
        }
        else{
            return Number::New(info.Env(), -11); 
        }
        return Number::New(info.Env(), motors[motorNumber].setOpenLoop(controlBit));              
    } 
    if (paramName == "KIX"){
        bool controlBit = false; 
        if (info[2].IsString()){
            std::string inputVal = info[2].As<String>().Utf8Value();
            if (inputVal == "1x" || inputVal == "false" || inputVal == "1X"){
                controlBit = false;
            }
            else if (inputVal == "8x" || inputVal == "true" || inputVal == "8X"){
                controlBit = true;
            }
            else{
                return Number::New(info.Env(), -11);
            }
        }
        else if (info[2].IsBoolean()){
            controlBit = info[2].As<Boolean>();
        }
        else{
            return Number::New(info.Env(), -11); 
        }
        return Number::New(info.Env(), motors[motorNumber].setKIX(controlBit));                   
    } 
    if (paramName == "KI"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setKI((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        } 
    } 
    if (paramName == "KPX"){
        bool controlBit = false; 
        if (info[2].IsString()){
            std::string inputVal = info[2].As<String>().Utf8Value();
            if (inputVal == "1x" || inputVal == "false" || inputVal == "1X"){
                controlBit = false;
            }
            else if (inputVal == "8x" || inputVal == "true" || inputVal == "8X"){
                controlBit = true;
            }
            else{
                return Number::New(info.Env(), -11);
            }
        }
        else if (info[2].IsBoolean()){
            controlBit = info[2].As<Boolean>();
        }
        else{
            return Number::New(info.Env(), -11); 
        }
        return Number::New(info.Env(), motors[motorNumber].setKPX(controlBit));                   
    }
    if (paramName == "KP"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setKP((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        } 
    }
    if (paramName == "STBY_MODE"){
        bool controlBit = false; 
        if (info[2].IsString()){
            std::string inputVal = info[2].As<String>().Utf8Value();
            if (inputVal == "on" || inputVal == "true" || inputVal == "enable" || inputVal == "enabled"){
                controlBit = true;
            }
            else if (inputVal == "off" || inputVal == "false" || inputVal == "disable" || inputVal == "disabled"){
                controlBit = false;
            }
            else{
                return Number::New(info.Env(), -11);
            }
        }
        else if (info[2].IsBoolean()){
            controlBit = info[2].As<Boolean>();
        }
        else{
            return Number::New(info.Env(), -11); 
        }
        return Number::New(info.Env(), motors[motorNumber].setStandbyMode(controlBit));
    }
    if (paramName == "DIR"){
        bool controlBit = false; 
        if (info[2].IsString()){
            std::string inputVal = info[2].As<String>().Utf8Value();
            if (inputVal == "CW" || inputVal == "true" || inputVal == "positive"){
                controlBit = true;
            }
            else if (inputVal == "CCW" || inputVal == "false" || inputVal == "negative"){
                controlBit = false;
            }
            else{
                return Number::New(info.Env(), -11);
            }
        }
        else if (info[2].IsBoolean()){
            controlBit = info[2].As<Boolean>();
        }
        else{
            return Number::New(info.Env(), -11); 
        }
        return Number::New(info.Env(), motors[motorNumber].setDIRMode(controlBit));
    }
    if (paramName == "POLEPAIR"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setPoles((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        }      
    }
    if (paramName == "MAXPSEED"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setMaxSpeed((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        }      
    }
    if (paramName == "FG_ON"){
        bool controlBit = false; 
        if (info[2].IsString()){
            std::string inputVal = info[2].As<String>().Utf8Value();
            if (inputVal == "on" || inputVal == "true" || inputVal == "enable" || inputVal == "enabled"){
                controlBit = true;
            }
            else if (inputVal == "off" || inputVal == "false" || inputVal == "disable" || inputVal == "disabled"){
                controlBit = false;
            }
            else{
                return Number::New(info.Env(), -11);
            }
        }
        else if (info[2].IsBoolean()){
            controlBit = info[2].As<Boolean>();
        }
        else{
            return Number::New(info.Env(), -11); 
        }
        return Number::New(info.Env(), motors[motorNumber].setSpeedOutputMode(controlBit));
    }
    if (paramName == "TSPSEL"){
        bool controlBit = false; 
        if (info[2].IsString()){
            std::string inputVal = info[2].As<String>().Utf8Value();
            if (inputVal == "analog" || inputVal == "false" || inputVal == "unset"){
                controlBit = false;
            }
            else if (inputVal == "pwm" || inputVal == "PWM" || inputVal == "true" || inputVal == "unset"){
                controlBit = true;
            }
            else{
                return Number::New(info.Env(), -11);
            }
        }
        else if (info[2].IsBoolean()){
            controlBit = info[2].As<Boolean>();
        }
        else{
            return Number::New(info.Env(), -11); 
        }
        return Number::New(info.Env(), motors[motorNumber].setSpeedControlMode(controlBit));
    }
    if (paramName == "SPDINV"){
        bool controlBit = false; 
        if (info[2].IsString()){
            std::string inputVal = info[2].As<String>().Utf8Value();
            if (inputVal == "normal" || inputVal == "positive" || inputVal == "false" || inputVal == "disabled" || inputVal == "disable"){
                controlBit = false;
            }
            else if (inputVal == "inverted" || inputVal == "negative" || inputVal == "true" || inputVal == "enabled" || inputVal == "enable"){
                controlBit = true;
            }
            else{
                return Number::New(info.Env(), -11);
            }
        }
        else if (info[2].IsBoolean()){
            controlBit = !info[2].As<Boolean>();
        }
        else{
            return Number::New(info.Env(), -11); 
        }
        return Number::New(info.Env(), motors[motorNumber].setSpeedInversion(controlBit));
    }
    if (paramName == "LATCH"){
        bool controlBit = false; 
        if (info[2].IsString()){
            std::string inputVal = info[2].As<String>().Utf8Value();
            if (inputVal == "latch" || inputVal == "off" || inputVal == "disable" || inputVal == "disabled"){
                controlBit = true;
            }
            else if (inputVal == "on" || inputVal == "recover" || inputVal == "enable" || inputVal == "enabled"){
                controlBit = false;
            }
            else{
                return Number::New(info.Env(), -11);
            }
        }
        else if (info[2].IsBoolean()){
            controlBit = !info[2].As<Boolean>();
        }
        else{
            return Number::New(info.Env(), -11); 
        }
        return Number::New(info.Env(), motors[motorNumber].setAutoRecoveryMode(controlBit));
    }
    if (paramName == "OCPMASK"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setDigitalFiltering((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        }      
    }
    if (paramName == "LOCKDIS"){
        bool controlBit = false; 
        if (info[2].IsString()){
            std::string inputVal = info[2].As<String>().Utf8Value();
            if (inputVal == "on" || inputVal == "true" || inputVal == "enable" || inputVal == "enabled"){
                controlBit = false;
            }
            else if (inputVal == "off" || inputVal == "false" || inputVal == "disable" || inputVal == "disabled"){
                controlBit = true;
            }
            else{
                return Number::New(info.Env(), -11);
            }
        }
        else if (info[2].IsBoolean()){
            controlBit = !info[2].As<Boolean>();
        }
        else{
            return Number::New(info.Env(), -11); 
        }
        return Number::New(info.Env(), motors[motorNumber].setForcedComutationProtection(controlBit));
    }
    if (paramName == "DUTYCHGLIMIT"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setDutyChangeLimit((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        }      
    }
    if (paramName == "STARTCURRENT"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setStartCurrentLimit((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        }      
    }
    if (paramName == "OCPDIS"){
        bool controlBit = false; 
        if (info[2].IsString()){
            std::string inputVal = info[2].As<String>().Utf8Value();
            if (inputVal == "on" || inputVal == "false" || inputVal == "enable" || inputVal == "enabled"){
                controlBit = false;
            }
            else if (inputVal == "off" || inputVal == "true" || inputVal == "disable" || inputVal == "disabled"){
                controlBit = true;
            }
            else{
                return Number::New(info.Env(), -11);
            }
        }
        else if (info[2].IsBoolean()){
            controlBit = info[2].As<Boolean>();
        }
        else{
            return Number::New(info.Env(), -11); 
        }
        return Number::New(info.Env(), motors[motorNumber].setOCPDisable(controlBit));
    }
    if (paramName == "SS_ADD_SEL"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setSoftStartRange((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        }      
    }
    if (paramName == "SS_UP_SEL"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setSoftStartStepSize((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        }      
    }
    if (paramName == "SS_DUTYCHGLIMIT"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setSoftStartDutyChangeLimit((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        }      
    }
    if (paramName == "DUTY_UP_TIME"){
        bool controlBit = false; 
        if (info[2].IsString()){
            std::string inputVal = info[2].As<String>().Utf8Value();
            if (inputVal == "2.7" || inputVal == "false" || inputVal == "2.7ms"){
                controlBit = false;
            }
            else if (inputVal == "10.8" || inputVal == "true" || inputVal == "10.8ms"){
                controlBit = true;
            }
            else{
                return Number::New(info.Env(), -11);
            }
        }
        else if (info[2].IsBoolean()){
            controlBit = info[2].As<Boolean>();
        }
        else{
            return Number::New(info.Env(), -11); 
        }
        return Number::New(info.Env(), motors[motorNumber].setDutyUpTime(controlBit));
    }
    if (paramName == "RPMLIMIT"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setRPMChangeLimit((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        }      
    }
    if (paramName == "BRK_INV"){
        bool controlBit = false; 
        if (info[2].IsString()){
            std::string inputVal = info[2].As<String>().Utf8Value();
            if (inputVal == "on" || inputVal == "true" || inputVal == "enable" || inputVal == "enabled" || inputVal == "inverted" || inputVal == "invert"){
                controlBit = false;
            }
            else if (inputVal == "off" || inputVal == "false" || inputVal == "disable" || inputVal == "disabled"){
                controlBit = true;
            }
            else{
                return Number::New(info.Env(), -11);
            }
        }
        else if (info[2].IsBoolean()){
            controlBit = info[2].As<Boolean>();
        }
        else{
            return Number::New(info.Env(), -11); 
        }
        return Number::New(info.Env(), motors[motorNumber].setBrakeInverted(controlBit));
    }
    if (paramName == "ISD_MASK"){
        bool controlBit = false; 
        if (info[2].IsString()){
            std::string inputVal = info[2].As<String>().Utf8Value();
            if (inputVal == "on" || inputVal == "false" || inputVal == "enable" || inputVal == "enabled"){
                controlBit = false;
            }
            else if (inputVal == "off" || inputVal == "true" || inputVal == "disable" || inputVal == "disabled"){
                controlBit = true;
            }
            else{
                return Number::New(info.Env(), -11);
            }
        }
        else if (info[2].IsBoolean()){
            controlBit = info[2].As<Boolean>();
        }
        else{
            return Number::New(info.Env(), -11); 
        }
        return Number::New(info.Env(), motors[motorNumber].setOvercurrentDetectionDisabled(controlBit));
    }
    if (paramName == "RS_SEL"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setRSAPinFiltering((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        }      
    }
    if (paramName == "ANTITHROUGH"){
        bool controlBit = false; 
        if (info[2].IsString()){
            std::string inputVal = info[2].As<String>().Utf8Value();
            if (inputVal == "on" || inputVal == "false" || inputVal == "enable" || inputVal == "enabled"){
                controlBit = false;
            }
            else if (inputVal == "off" || inputVal == "true" || inputVal == "disable" || inputVal == "disabled"){
                controlBit = true;
            }
            else{
                return Number::New(info.Env(), -11);
            }
        }
        else if (info[2].IsBoolean()){
            controlBit = info[2].As<Boolean>();
        }
        else{
            return Number::New(info.Env(), -11); 
        }
        return Number::New(info.Env(), motors[motorNumber].setAutoDeadTimeControlDisabled(controlBit));
    }
    if (paramName == "WAIT_TIME"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setBrakeTime((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        }      
    }
    if (paramName == "WAIT_MODE"){
        bool controlBit = false; 
        if (info[2].IsString()){
            std::string inputVal = info[2].As<String>().Utf8Value();
            if (inputVal == "hiz" || inputVal == "false" || inputVal == "hi-z"){
                controlBit = false;
            }
            else if (inputVal == "short" || inputVal == "true" || inputVal == "shorted"){
                controlBit = true;
            }
            else{
                return Number::New(info.Env(), -11);
            }
        }
        else if (info[2].IsBoolean()){
            controlBit = info[2].As<Boolean>();
        }
        else{
            return Number::New(info.Env(), -11); 
        }
        return Number::New(info.Env(), motors[motorNumber].setBrakeMode(controlBit));
    }
    if (paramName == "WAIT_CON"){
        bool controlBit = false; 
        if (info[2].IsString()){
            std::string inputVal = info[2].As<String>().Utf8Value();
            if (inputVal == "idle" || inputVal == "false"){
                controlBit = false;
            }
            else if (inputVal == "brake" || inputVal == "true"){
                controlBit = true;
            }
            else{
                return Number::New(info.Env(), -11);
            }
        }
        else if (info[2].IsBoolean()){
            controlBit = info[2].As<Boolean>();
        }
        else{
            return Number::New(info.Env(), -11); 
        }
        return Number::New(info.Env(), motors[motorNumber].setBrakeReleaseMode(controlBit));
    }
    if (paramName == "LOCK_BRK"){
        bool controlBit = false; 
        if (info[2].IsString()){
            std::string inputVal = info[2].As<String>().Utf8Value();
            if (inputVal == "hiz" || inputVal == "false" || inputVal == "hi-z"){
                controlBit = false;
            }
            else if (inputVal == "short" || inputVal == "true" || inputVal == "shorted"){
                controlBit = true;
            }
            else{
                return Number::New(info.Env(), -11);
            }
        }
        else if (info[2].IsBoolean()){
            controlBit = info[2].As<Boolean>();
        }
        else{
            return Number::New(info.Env(), -11); 
        }
        return Number::New(info.Env(), motors[motorNumber].setErrorBrakingMode(controlBit));
    }
    if (paramName == "ALERTINV"){
        bool controlBit = false; 
        if (info[2].IsString()){
            std::string inputVal = info[2].As<String>().Utf8Value();
            if (inputVal == "active high" || inputVal == "false" || inputVal == "invert" || inputVal == "inverted"){
                controlBit = false;
            }
            else if (inputVal == "active low" || inputVal == "true" || inputVal == "normal"){
                controlBit = true;
            }
            else{
                return Number::New(info.Env(), -11);
            }
        }
        else if (info[2].IsBoolean()){
            controlBit = info[2].As<Boolean>();
        }
        else{
            return Number::New(info.Env(), -11); 
        }
        return Number::New(info.Env(), motors[motorNumber].setAlertInverted(controlBit));
    }
    if (paramName == "TSD_MASK"){
        bool controlBit = false; 
        if (info[2].IsString()){
            std::string inputVal = info[2].As<String>().Utf8Value();
            if (inputVal == "on" || inputVal == "false" || inputVal == "enable" || inputVal == "enabled"){
                controlBit = false;
            }
            else if (inputVal == "off" || inputVal == "true" || inputVal == "disable" || inputVal == "disabled"){
                controlBit = true;
            }
            else{
                return Number::New(info.Env(), -11);
            }
        }
        else if (info[2].IsBoolean()){
            controlBit = info[2].As<Boolean>();
        }
        else{
            return Number::New(info.Env(), -11); 
        }
        return Number::New(info.Env(), motors[motorNumber].setThermalShutdownDisable(controlBit));
    }
    if (paramName == "TRE"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setAutoRestartWaitTime((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        }      
    }
    if (paramName == "PRE_TIP"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setFirstDCExcitationTime((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        }      
    }
    if (paramName == "TIP"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setSecondDCExcitationTime((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        }      
    }
    if (paramName == "LA"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setLeadAngle((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        }      
    }
    if (paramName == "FMAX"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setMaxRPM((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        }      
    }
    if (paramName == "FST"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setForcedComutationFrequency((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        }      
    }
    if (paramName == "FPWM"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setOutputPWMFrequencyMode((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        }      
    }
    if (paramName == "DEADTIME"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setDeadtime((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        }      
    }
    if (paramName == "ISD_LVL"){
        bool controlBit = false; 
        if (info[2].IsString()){
            std::string inputVal = info[2].As<String>().Utf8Value();
            if (inputVal == "1" || inputVal == "false" || inputVal == "1V" || inputVal == "1v"){
                controlBit = false;
            }
            else if (inputVal == "0.5" || inputVal == "true" || inputVal == "0.5V" || inputVal == "0.5v"){
                controlBit = true;
            }
            else{
                return Number::New(info.Env(), -11);
            }
        }
        else if (info[2].IsBoolean()){
            controlBit = info[2].As<Boolean>();
        }
        else{
            return Number::New(info.Env(), -11); 
        }
        return Number::New(info.Env(), motors[motorNumber].setOvercurrentDetectionThreshold(controlBit));
    }
    if (paramName == "OCP_LVL"){
        bool controlBit = false; 
        if (info[2].IsString()){
            std::string inputVal = info[2].As<String>().Utf8Value();
            if (inputVal == "10x" || inputVal == "false" || inputVal == "10X" || inputVal == "10"){
                controlBit = false;
            }
            else if (inputVal == "20x" || inputVal == "true" || inputVal == "20X" || inputVal == "20"){
                controlBit = true;
            }
            else{
                return Number::New(info.Env(), -11);
            }
        }
        else if (info[2].IsBoolean()){
            controlBit = info[2].As<Boolean>();
        }
        else{
            return Number::New(info.Env(), -11); 
        }
        return Number::New(info.Env(), motors[motorNumber].setOvercurrentProtectionGain(controlBit));
    }
    if (paramName == "SOURCE"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setGateSourceCurrent((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        }      
    }
    if (paramName == "SINK"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setGateSinkCurrent((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        }      
    }
    if (paramName == "COMP_HYS"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setIdleModeHysteresisVoltage((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        }      
    }
    if (paramName == "SPD"){
        if (info[2].IsNumber()){
            return Number::New(info.Env(), motors[motorNumber].setSpeed((uint8_t)(info[2].As<Number>().Int32Value())));
        }
        else{
            return Number::New(info.Env(), -11); 
        }      
    }

// "HZ_CNT",           // 67
// "NVM_WR",           // 68
// "NVM_ST"            // 69
    return Number::New(info.Env(), -1);   
}

Function MotorGetParam(Env env){
    return Function::New(env, motorRegisterGetter);
}

Function MotorSetParam(Env env){
    return Function::New(env, motorRegisterSetter);
}