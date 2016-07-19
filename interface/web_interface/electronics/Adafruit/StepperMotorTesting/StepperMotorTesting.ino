#include <Wire.h>
#include <Adafruit_MotorShield.h>


Adafruit_MotorShield shield = Adafruit_MotorShield(0x60);
Adafruit_StepperMotor *motor = shield.getStepper(200,1);
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  shield.begin();

  motor -> setSpeed(10);
}

void loop() {
  // put your main code here, to run repeatedly:
/*  Serial.println("Single coil steps");
  motor->step(100, FORWARD, SINGLE); 
  motor->step(100, BACKWARD, SINGLE); 
  */
  Serial.println("Double coil steps");
  motor->step(100, FORWARD, DOUBLE); 
//  motor->step(100, BACKWARD, DOUBLE);
  /*
  Serial.println("Interleave coil steps");
  motor->step(100, FORWARD, INTERLEAVE); 
  motor->step(100, BACKWARD, INTERLEAVE); 
  *//*
  Serial.println("Microstep steps");
  motor->step(50, FORWARD, MICROSTEP); 
  motor->step(50, BACKWARD, MICROSTEP);
  */
}
