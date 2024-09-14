#include <napi.h>

using namespace Napi;

Function MotorSetParam(Env env);
Function MotorGetParam(Env env);

Object Init(Env env, Object exports)
{
  exports.Set("setParam", MotorSetParam(env));
  exports.Set("getParam", MotorGetParam(env));
  return exports;
}

NODE_API_MODULE(addon, Init);