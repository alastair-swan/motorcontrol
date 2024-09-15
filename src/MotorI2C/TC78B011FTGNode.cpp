#include "TC78B011FTG.h"
#include <napi.h>

using namespace Napi;

TC78B011FTG motors[] = {TC78B011FTG(1, 0x29), TC78B011FTG(1, 0x32)};

Number testGetter(const CallbackInfo &info){
    std::cout << "get test" << std::endl;
    return Number::New(info.Env(), (double)100);
}

void testSetter(const CallbackInfo &info){
    std::string data = info[0].As<String>().Utf8Value();
    std::string data2 = info[1].As<String>().Utf8Value();
    std::cout << data << std::endl;
    std::cout << data2 << std::endl;
}

Number setNoStop(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    bool param = info[1].As<Boolean>();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setNoStop(param));
}
Number setStopDuty(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    int param = info[1].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setStopDuty(param));
}
Number setStartDuty(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    int param = info[1].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setStartDuty(param));
}
Number setChangeDuty(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    int param = info[1].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setChangeDuty(param));
}
Number setMaxDuty(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    int param = info[1].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setMaxDuty(param));
}
Number setStartRPM(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    int param = info[1].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setStartRPM(param));
}
Number setMaxDutyHysteresis(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    int param = info[1].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setMaxDutyHysteresis(param));
}
Number setSpeedSlope(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    int param = info[1].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setSpeedSlope(param));
}
Number setMaxOpen(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    bool param = info[1].As<Boolean>();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setMaxOpen(param));
}
Number setMaxOff(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    bool param = info[1].As<Boolean>();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setMaxOff(param));
}
Number setSpeedSlope2(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    int param = info[1].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setSpeedSlope2(param));
}
Number setChargePumpVCP(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    bool param = info[1].As<Boolean>();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setStartDuty(param));
}
Number setOpenLoop(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    bool param = info[1].As<Boolean>();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setStartDuty(param));
}
Number setPID(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    int KIX = info[1].As<Boolean>();
    int KI = info[2].As<Number>().Int32Value();
    int KPX = info[3].As<Boolean>();
    int KP = info[4].As<Number>().Int32Value();

    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setPID(KIX, KI, KPX, KP));
}
Number setStandbyMode(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    bool param = info[1].As<Boolean>();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setStandbyMode(param));
}
Number setDirection(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    bool param = info[1].As<Boolean>();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setDIRMode(param));
}
Number setPoles(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    int param = info[1].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setPoles(param));
}
Number setMaxSpeed(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    int param = info[1].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setMaxSpeed(param));
}
Number setSpeedOutputMode(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    bool param = info[1].As<Boolean>();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setSpeedOutputMode(param));
}
Number setSpeedInversion(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    bool param = info[1].As<Boolean>();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setSpeedInversion(param));
}
Number setAutoRecoveryMode(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    bool param = info[1].As<Boolean>();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setAutoRecoveryMode(param));
}
Number setDigitalFiltering(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    int param = info[1].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setDigitalFiltering(param));
}
Number setForcedComutationProtection(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    bool param = info[1].As<Boolean>();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setForcedComutationProtection(param));
}
Number setDutyChangeLimit(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    int param = info[1].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setDutyChangeLimit(param));
}
Number setStartCurrentLimit(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    int param = info[1].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setStartCurrentLimit(param));
}
Number setOCPDisable(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    bool param = info[1].As<Boolean>();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setOCPDisable(param));
}
Number setSoftStartRange(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    int param = info[1].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setSoftStartRange(param));
}
Number setSoftStartStepSize(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    int param = info[1].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setSoftStartStepSize(param));
}
Number setSoftStartDutyChangeLimit(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    int param = info[1].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setSoftStartDutyChangeLimit(param));
}
Number setDutyUpTime(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    bool param = info[1].As<Boolean>();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setDutyUpTime(param));
}
Number setRPMChangeLimit(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    int param = info[1].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setRPMChangeLimit(param));
}
Number setBrakeInverted(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    bool param = info[1].As<Boolean>();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setBrakeInverted(param));
}
Number setOvercurrentProtectionDisabled(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    bool param = info[1].As<Boolean>();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setOvercurrentDetectionDisabled(param));
}
Number setRSAPinFiltering(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    int param = info[1].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setRSAPinFiltering(param));
}
Number setAutoDeadTimeControlDisabled(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    bool param = info[1].As<Boolean>();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setAutoDeadTimeControlDisabled(param));
}
Number setBrakeTime(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    int param = info[1].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setBrakeTime(param));
}
Number setBrakeMode(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    bool param = info[1].As<Boolean>();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setBrakeMode(param));
}
Number setBrakeReleaseMode(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    bool param = info[1].As<Boolean>();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setBrakeReleaseMode(param));
}
Number setErrorBrakingMode(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    bool param = info[1].As<Boolean>();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setErrorBrakingMode(param));
}
Number setAlertInverted(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    bool param = info[1].As<Boolean>();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setAlertInverted(param));
}
Number setThermalShutdownDisable(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    bool param = info[1].As<Boolean>();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setThermalShutdownDisable(param));
}
Number setAutoRestartWaitTime(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    int param = info[1].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setAutoRestartWaitTime(param));
}
Number setFirstDCExcitationTime(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    int param = info[1].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setFirstDCExcitationTime(param));
}
Number setLeadAngle(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    int param = info[1].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setLeadAngle(param));
}
Number setMaxRPM(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    int param = info[1].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setMaxRPM(param));
}
Number setForcedComutationFrequency(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    int param = info[1].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setForcedComutationFrequency(param));
}
Number setOutputPWMFrequencyMode(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    int param = info[1].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setOutputPWMFrequencyMode(param));
}
Number setDeadTime(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    int param = info[1].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setDeadtime(param));
}
Number setOvercurrentDetectionThreshold(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    bool param = info[1].As<Boolean>();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setOvercurrentDetectionThreshold(param));
}
Number setOvercurrentProtectionGain(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    bool param = info[1].As<Boolean>();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setOvercurrentProtectionGain(param));
}
Number setGateSourceCurrent(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    int param = info[1].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setGateSourceCurrent(param));
}
Number setGateSinkCurrent(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    int param = info[1].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setGateSinkCurrent(param));
}
Number setIdleModeHysteresisVoltage(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    int param = info[1].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setIdleModeHysteresisVoltage(param));
}
Number setSpeed(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    int param = info[1].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].setSpeed(param));
}

Number getNostop(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getNoStop());
}
Number getStopDuty(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getStopDuty());
}
Number getStartDuty(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getStartDuty());
}
Number getChangeDuty(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getChangeDuty());
}
Number getMaxDuty(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getMaxDuty());
}
Number getStartRPM(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getStartRPM());
}
Number getMaxDutyHysteresis(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getMaxDutyHysteresis());
}
Number getSpeedSlope(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getSpeedSlope());
}
Number getMaxOpen(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getMaxOpen());
}
Number getMaxOff(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getMaxOff());
}
Number getSpeedSlope2(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getSpeedSlope2());
}
Number getChargePumpVCP(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getChargePumpVCP());
}
Number getOpenLoop(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getOpenLoop());
}
Number getKIX(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getKIX());
}
Number getKI(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getKI());
}
Number getKPX(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getKPX());
}
Number getKP(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getKP());
}
Number getStandbyMode(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getStandbyMode());
}
Number getDirection(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getDIRMode());
}
Number getPoles(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getPoles());
}
Number getMaxSpeed(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getMaxSpeed());
}
Number getSpeedOutputMode(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getSpeedOutputMode());
}
Number getSpeedInversion(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getSpeedInversion());
}
Number getAutoRecoveryMode(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getAutoRecoveryMode());
}
Number getDigitalFiltering(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getDigitalFiltering());
}
Number getForcedComutationProtection(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getForcedComutationProtection());
}
Number getDutyChangeLimit(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getDutyChangeLimit());
}
Number getStartCurrentLimit(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getStartCurrentLimit());
}
Number getOCPDisable(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getOCPDisable());
}
Number getSoftStartRange(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getSoftStartRange());
}
Number getSoftStartStepSize(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getSoftStartStepSize());
}
Number getSoftStartDutyChangeLimit(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getSoftStartDutyChangeLimit());
}
Number getDutyUpTime(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getDutyUpTime());
}
Number getRPMChangeLimit(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getRPMChangeLimit());
}
Number getBrakeInverted(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getBrakeInverted());
}
Number getOvercurrentProtectionDisabled(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getOvercurrentDetectionDisabled());
}
Number getRSAPinFiltering(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getRSAPinFiltering());
}
Number getAutoDeadTimeControlDisabled(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getAutoDeadTimeControlDisabled());
}
Number getBrakeTime(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getBrakeTime());
}
Number getBrakeMode(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getBrakeMode());
}
Number getBrakeReleaseMode(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getBrakeReleaseMode());
}
Number getErrorBrakingMode(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getErrorBrakingMode());
}
Number getAlertInverted(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getAlertInverted());
}
Number getThermalShutdownDisable(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getThermalShutdownDisable());
}
Number getAutoRestartWaitTime(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getAutoRestartWaitTime());
}
Number getFirstDCExcitationTime(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getFirstDCExcitationTime());
}
Number getLeadAngle(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getLeadAngle());
}
Number getMaxRPM(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getMaxRPM());
}
Number getForcedComutationFrequency(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getForcedComutationFrequency());
}
Number getOutputPWMFrequencyMode(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getOutputPWMFrequencyMode());
}
Number getDeadTime(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getDeadtime());
}
Number getOvercurrentDetectionThreshold(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getOvercurrentDetectionThreshold());
}
Number getOvercurrentProtectionGain(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getOvercurrentProtectionGain());
}
Number getGateSourceCurrent(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getGateSourceCurrent());
}
Number getGateSinkCurrent(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getGateSinkCurrent());
}
Number getIdleModeHysteresisVoltage(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getIdleModeHysteresisVoltage());
}
Number getSpeedSetting(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getSpeedSetting());
}
Number getRPM(const CallbackInfo &info){
    int motorNum = info[0].As<Number>().Int32Value();
    if (motorNum < 0 || motorNum > 1){ 
        return Number::New(info.Env(), -1);
    }
    return Number::New(info.Env(), motors[motorNum].getRPM());
}
/*
Function MotorGetParam(Env env){
    return Function::New(env, testGetter);
}

Function MotorSetParam(Env env){
    return Function::New(env, testSetter);
}
*/