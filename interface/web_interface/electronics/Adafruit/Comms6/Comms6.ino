/*
 * Sketch to control the pins of Arduino via serial interface
 *
 * Commands implemented with examples:
 *
 * - 10:120 -> Extends actuator number 10 to 120mm
 */

#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

const int adaNum = 2;

Adafruit_PWMServoDriver ada[adaNum] = {Adafruit_PWMServoDriver(0x40), Adafruit_PWMServoDriver(0x41)};

char mode; //Holds mode (E for extend actuator)
int pin_number; // Holds the pin number
float value_to_write; // Holds the value that we want to write

int getAct(int num){ // 1 < num < 24
  //Convert pin number to adafruit port#
  //Front Left Wheel: 1   (1-6)   (Board 1: 0-5)
  //Front Right Wheel: 2  (7-12)  (Board 1: 6-11)
  //Back Left Wheel: 3    (13-18) (Board 2: 0-5)
  //Back Right Wheel: 4   (19-24) (Board 2: 6-11)
  return (num - 1)% 12;
}

void setup() {
    Serial.begin(9600); // Serial Port at 9600 baud
    Serial.setTimeout(100); // Instead of the default 1000ms, in order
                            // to speed up the Serial.parseInt() 
    for (int i = 0; i < adaNum; i++){
      ada[i].begin();
      ada[i].setPWMFreq(60);
    }
    yield();
}

void blinkN(int num){
  for (int i = 0; i < num; i++){
    digitalWrite(13, HIGH);
    delay(300);
    digitalWrite(13, LOW);
    delay(300);
  }
}

void loop() {
    // Check if characters available in the buffer
    if (Serial.available() > 0) {
        mode = Serial.read();
        pin_number = Serial.parseInt(); // Waits for an int to be transmitted
        if (Serial.read()==':'){
            value_to_write = Serial.parseInt(); // Collects the value to be written
        }
        switch (mode){
            case 'E': //Extend actuator
                ada[pin_number / 12].setPWM(getAct(pin_number), 0, map(value_to_write, 0, 140, 235, 475));
                break;
          //Can add more stuff
            default:
                break;
        }
    }
}
