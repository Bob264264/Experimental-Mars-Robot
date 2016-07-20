var stage = new createjs.Stage("roverCanvas");
var main_container = new createjs.Container();

side_types = {left : [], right : []};
for (var side in side_types) {

  var y           = (side == "left") ? 0 : 350;
  var side_abbrev = (side == "left") ? "L" : "R";
  var side_full   = (side == "left") ? "Left" : "Right";
  var offsetx = 50;
  var offsety = 50;
  var wheelradius = 110;

  var side_container = new createjs.Container();
  side_container.name = "Side:" + side_full;
  side_container.x = offsetx + wheelradius;
  side_container.y = offsety + wheelradius + y;
  side_container.regX = 0;
  side_container.regY = 0;

  titleText = new createjs.Text("Rover " + side_full + " Side", "20px Roboto", "#000000");
  titleText.x = -wheelradius;
  titleText.y = -offsety - wheelradius;

  side_container.addChild(titleText);

  var change = 20;
  var wheeloffset = 373;

  var frontwheel_container = new createjs.Container();
  frontwheel_container.name = "FrontWheel";
  frontwheel_container.x = 0;
  frontwheel_container.y = 0;
  frontwheel_container.regX = 0;
  frontwheel_container.regY = 0;

  var backwheel_container = new createjs.Container();
  backwheel_container.name = "BackWheel";
  backwheel_container.x = wheeloffset;
  backwheel_container.y = 0;
  backwheel_container.regX = 0;
  backwheel_container.regY = 0;


  var frontWheel     = new createjs.Shape();
  var frontWheelText = new createjs.Text();
  var backWheel      = new createjs.Shape();
  var backWheelText  = new createjs.Text();

  frontWheel.graphics
    .setStrokeStyle(2)
    .beginStroke("black")
    .drawCircle(0,0,wheelradius);
  frontWheelText.font = "Roboto";
  frontWheelText.name = "FrontWheelText";
  frontWheelText.text = "Wheel Motor " + side_abbrev + "M1: 0 rpm"
                        + "\n" + "Rotation: 0 deg";
  frontWheelText.x    = 0;
  frontWheelText.y    = wheelradius + 20;

  backWheel.graphics
    .setStrokeStyle(2)
    .beginStroke("black")
    .drawCircle(0,0,wheelradius);
  backWheelText.text = "Wheel Motor " + side_abbrev + "M2: 0 rpm"
                      + "\n" + "Rotation: 0 deg";
  backWheelText.name = "BackWheelText";
  backWheelText.x    = wheeloffset;
  backWheelText.y    = wheelradius + 20;

  frontwheel_container.addChild(frontWheel);
  backwheel_container.addChild(backWheel);

  side_container.addChild(frontWheelText);
  side_container.addChild(backWheelText);


  var frontActuators            = [];
  var frontActuatorLabels       = [];
  var frontActuatorLabelAmounts = [];
  var backActuators             = [];
  var backActuatorLabels        = [];
  var backActuatorLabelAmounts  = [];
  for(var i = 0; i < 6; i++) {
    frontActuators.push(new createjs.Shape());
    frontActuators[i].graphics
      .setStrokeStyle(4)
      .beginStroke("red")
      .moveTo(0,0)
      .lineTo(wheelradius * Math.cos(Math.PI / 3.0 * i), wheelradius * Math.sin(Math.PI / 3.0 * i));
    frontActuatorLabels.push(new createjs.Text());
    frontActuatorLabels[i].x = wheelradius * Math.cos(Math.PI / 3.0 * i) / 2;
    frontActuatorLabels[i].y = wheelradius * Math.sin(Math.PI / 3.0 * i) / 2;
    frontActuatorLabels[i].text = side_abbrev + "A1" + (i + 1).toString();
    frontActuatorLabels[i].font = "12px Roboto";
    frontActuatorLabelAmounts.push(new createjs.Text());
    frontActuatorLabelAmounts[i].name = frontActuatorLabels[i].text;
    frontActuatorLabelAmounts[i].x = wheelradius * 1.1 * Math.cos(Math.PI / 3.0 * i);
    frontActuatorLabelAmounts[i].y = wheelradius * 1.1 * Math.sin(Math.PI / 3.0 * i);
    frontActuatorLabelAmounts[i].extension = 0;
    frontActuatorLabelAmounts[i].text = frontActuatorLabelAmounts[i].extension + " mm";
    frontActuatorLabelAmounts[i].font = "12px Roboto";

    backActuators.push(new createjs.Shape());
    backActuators[i].graphics
      .setStrokeStyle(4)
      .beginStroke("red")
      .moveTo(0,0)
      .lineTo(wheelradius * Math.cos(Math.PI / 3.0 * i), wheelradius * Math.sin(Math.PI / 3.0 * i));
    backActuatorLabels.push(new createjs.Text());
    backActuatorLabels[i].x = wheelradius * Math.cos(Math.PI / 3.0 * i) / 2;
    backActuatorLabels[i].y = wheelradius * Math.sin(Math.PI / 3.0 * i) / 2;
    backActuatorLabels[i].text = side_abbrev + "A2" + (i + 1).toString();
    backActuatorLabels[i].font = "12px Roboto";
    backActuatorLabelAmounts.push(new createjs.Text());
    backActuatorLabelAmounts[i].name = backActuatorLabels[i].text;
    backActuatorLabelAmounts[i].x = wheelradius * 1.1 * Math.cos(Math.PI / 3.0 * i);
    backActuatorLabelAmounts[i].y = wheelradius * 1.1 * Math.sin(Math.PI / 3.0 * i);
    backActuatorLabelAmounts[i].extension = 0;
    backActuatorLabelAmounts[i].text = backActuatorLabelAmounts[i].extension + " mm";
    backActuatorLabelAmounts[i].font = "12px Roboto";

    frontwheel_container.addChild(frontActuators[i]);
    frontwheel_container.addChild(frontActuatorLabels[i]);
    frontwheel_container.addChild(frontActuatorLabelAmounts[i]);
    backwheel_container.addChild(backActuators[i]);
    backwheel_container.addChild(backActuatorLabels[i]);
    backwheel_container.addChild(backActuatorLabelAmounts[i]);
  }

  side_container.addChild(frontwheel_container);
  side_container.addChild(backwheel_container);

  main_container.addChild(side_container);
}

var left_arm_container = new createjs.Container();
left_arm_container.name = "LeftArmContainer";
left_arm_container.x = 20;
left_arm_container.y = wheeloffset + 800;
left_arm_container.regX = 0; //figure out rotation around a point
left_arm_container.regY = 0;

var titleText = new createjs.Text("Left Arm", "20px Roboto", "#000000");
titleText.x = 0;
titleText.y = -4 * wheelradius;

left_arm_container.addChild(titleText);

var left_arm            = new createjs.Shape();
var left_armText        = new createjs.Text();

left_arm.rotation = 90; //change with arduino measurement (angle of rotation on arm)
left_arm.name = "LeftArm";
left_arm.x = 500;
left_arm.y = 0;
left_arm.regX = -50 + wheeloffset;
left_arm.regY = -100;
left_arm.graphics
    .setStrokeStyle(2)
    .beginStroke("black")
    .drawRect(-50, -200, wheeloffset, 100)
    .beginStroke("red")
    .drawRect(100, -200, 50, 100); //change first argument with arduino measurement (distance along arm, range from -50 to 273)

left_armText.name = "LeftArmText";
left_armText.font = "Roboto";
left_armText.text = "Left Arm Rotation: " + left_arm.rotation + " deg";
left_armText.x = 0;
left_armText.y = -3 * wheelradius - 80;

left_arm_container.addChild(left_armText);
left_arm_container.addChild(left_arm);

//======================================================================================================================
var right_arm_container = new createjs.Container();
right_arm_container.name = "RightArmContainer";
right_arm_container.x = 20;
right_arm_container.y = wheeloffset + 1200;
right_arm_container.regX = 0; //figure out rotation around a point
right_arm_container.regY = 0;

var titleText2 = new createjs.Text("Right Arm", "20px Roboto", "#000000");
titleText2.x = 0;
titleText2.y = -4 * wheelradius;

right_arm_container.addChild(titleText2);

var right_arm            = new createjs.Shape();
var right_armText        = new createjs.Text();

right_arm.rotation = 90; //change with arduino measurement (angle of rotation on arm)
right_arm.x = 200;
right_arm.y = 0;
right_arm.name = "RightArm";
right_arm.regX = wheeloffset / 2 + 135;
right_arm.regY = -200;
right_arm.graphics
    .setStrokeStyle(2)
    .beginStroke("black")
    .drawRect(-50, -200, wheeloffset, 100)
    .beginStroke("red")
    .drawRect(100, -200, 50, 100); //change first argument with arduino measurement (distance along arm, range from -49 to -371)

right_armText.name = "RightArmText";
right_armText.font = "Roboto";
right_armText.text = "Right Arm Rotation: " + right_arm.rotation + " deg";
right_armText.x = 0;
right_armText.y = -3 * wheelradius - 80;

right_arm_container.addChild(right_armText);
right_arm_container.addChild(right_arm);

stage.addChild(main_container);
stage.addChild(left_arm_container);
stage.addChild(right_arm_container);

createjs.Ticker.addEventListener("tick", stage);

function animation_spin_motor(motor_name, speed, degrees) {

  var wheel;
  var side_container;
  var side_container_type = (motor_name.substring(0,1) == "L") ? "Left" : "Right";
  var wheelType           = (motor_name.substring(2,3) == "1") ? "Front" : "Back";

  if (side_container_type == "Left") {
    if (wheelType == "Front") {
      side_container = main_container.getChildByName("Side:Left");
      wheel          = side_container.getChildByName("FrontWheel");
    }
    else {
      side_container = main_container.getChildByName("Side:Left");
      wheel          = side_container.getChildByName("BackWheel");
    }
  }
  else {
    if (wheelType == "Front") {
      side_container = main_container.getChildByName("Side:Right");
      wheel          = side_container.getChildByName("FrontWheel");
    }
    else {
      side_container = main_container.getChildByName("Side:Right");
      wheel          = side_container.getChildByName("BackWheel");
    }
  }
  side_container.getChildByName(wheelType + "WheelText").text = "Wheel Motor " + motor_name + ": " + speed.toString() + " rpm" + "\n" + "Rotation: " + wheel.rotation + "deg";

  createjs.Tween.get(wheel, {override: true}).to({rotation: degrees}, 60.0 * degrees / speed).call(function() {
      side_container.getChildByName(wheelType + "WheelText").text = "Wheel Motor " + motor_name + ": 0 rpm" + "\n" + "Rotation: " + degrees.toString() + "deg";
      this.setPaused(true); 
  });
  createjs.Tween.update();
}

var ACTUATOR_EXTENSION_SPEED = 0.1; //Remains to be revised via trial and error
function animation_set_actuator(actuator_label, amount) {
  var side         = (actuator_label.substring(0,1) == "L") ? "Left" : "Right";
  var wheel        = (actuator_label.substring(2,3) == "1") ? "Front" : "Back";
  var actuator_num = actuator_label.substring(3,4);

  var actuator = main_container.getChildByName("Side:" + side).getChildByName(wheel + "Wheel").getChildByName(actuator_label);

  createjs.Tween.get(actuator, {override: true}).to({extension : amount}, amount / ACTUATOR_EXTENSION_SPEED).on("change", function (){
    actuator.text = actuator.extension.toString() + " mm";
  });
  createjs.Tween.update();
}

function animation_arm(side, speed, d) {
  var container;
  var degrees = 90;
  degrees += d;
  var arm;
  if(side == "Left") {
    degrees = 360 - degrees;
    container = stage.getChildByName("LeftArmContainer");
    arm = "LeftArm";
    container.getChildByName(side + "ArmText").text = "Arm Rotation: " + degrees + " deg";
    createjs.Tween.get(container.getChildByName(arm), {override: true}).to({rotation: degrees}, degrees / speed * 60, createjs.Ease.SineInOut).call(function() {
      container.getChildByName(side + "ArmText").text = "Arm Rotation: " + container.getChildByName(side + "ArmText").rotation + " deg";
    });
  }
  else if(side == "Right") {
    container = stage.getChildByName("RightArmContainer");
    arm = "RightArm";
    container.getChildByName(side + "ArmText").text = "Arm Rotation: " + degrees + " deg";
    createjs.Tween.get(container.getChildByName(arm), {override: true}).to({rotation: degrees}, degrees / speed * 60, createjs.Ease.SineInOut).call(function() {
      container.getChildByName(side + "ArmText").text = "Arm Rotation: " + container.getChildByName(side + "ArmText").rotation + " deg";
    });
  }
  createjs.Tween.update();
}
