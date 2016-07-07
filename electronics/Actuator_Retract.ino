#include <Servo.h> 

Servo act;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  act.attach(10);
}

void loop() {
  // put your main code here, to run repeatedly:
  //45 = retract fully
  //135 = extend fully
  float pos;

  if (Serial.available() > 0){
    pos = Serial.parseInt();
    Serial.print("Extending to ");
    Serial.print(pos);
    Serial.println("mm");
    float out = 0.8996*pos + 0.5874;
    Serial.println(out);
    pos = 1.1109*pos - 0.6051;
//    act.write(map(pos, 0.5874, 126.53, 45, 135));
    act.write(map(pos, 0, 140, 45, 135));
//    act.write(90*((14*pos/9)-40)/140 + 45);
  }
}
