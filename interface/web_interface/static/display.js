function init() {
  var stage = new createjs.Stage("roverCanvas");
  var main_container = new createjs.Container();
  var movables = {
    "left" : {
      "members" : []
    },
    "right" : {
      "members" : []
    }
  };
  for (var side in movables) {

    var y           = (side == "left") ? 0 : 300;
    var side_abbrev = (side == "left") ? "L" : "R";
    var side_full   = (side == "left") ? "Left" : "Right";
    var offsetx = 50;
    var offsety = 50;
    var wheelradius = 100;

    var side_container = new createjs.Container();
    side_container.x = offsetx + wheelradius;
    side_container.y = offsety + wheelradius + y;
    side_container.regX = 0;
    side_container.regY = 0;

    titleText = new createjs.Text("Rover " + side_full + " Side", "20px Roboto", "#000000");
    titleText.x = -wheelradius;
    titleText.y = -offsety - wheelradius;
    movables[side]["members"].push({"titleText" : titleText});

    side_container.addChild(titleText);

    var change = 20;
    var wheeloffset = wheelradius * 4 + change;

    var frontwheel_container = new createjs.Container();
    frontwheel_container.x = 0;
    frontwheel_container.y = 0;
    frontwheel_container.regX = 0;
    frontwheel_container.regY = 0;
    frontwheel_container.rotation = 0;

    var backwheel_container = new createjs.Container();
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
    frontWheelText.text = "Wheel Motor " + side_abbrev + "1: 0 rpm";
    frontWheelText.x    = 0;
    frontWheelText.y    = wheelradius + 20;

    backWheel.graphics
      .setStrokeStyle(2)
      .beginStroke("black")
      .drawCircle(0,0,wheelradius);
    backWheelText.text = "Wheel Motor " + ((side == "left") ? "L" : "R") + "2: 0 rpm";
    backWheelText.x    = 0;
    backWheelText.y    = wheelradius + 20;

    frontwheel_container.addChild(frontWheel);
    frontwheel_container.addChild(frontWheelText);
    backwheel_container.addChild(backWheel);
    backwheel_container.addChild(backWheelText);
    movables[side]["members"].push({"frontWheel" : frontWheel});
    movables[side]["members"].push({"frontWheelText" : frontWheelText});
    movables[side]["members"].push({"backWheel" : backWheel});
    movables[side]["members"].push({"backWheelText" : backWheelText});

    connectorPiece = new createjs.Shape();
    connectorPieceWidth = 20;
    connectorPiece.graphics
      .setStrokeStyle(2)
      .beginStroke("black")
      .drawRect(wheelradius, - connectorPieceWidth / 2, wheelradius * 2 + change, connectorPieceWidth);
    side_container.addChild(connectorPiece);

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
      frontActuatorLabels[i].text = side_abbrev + "1" + (i + 1).toString();
      frontActuatorLabels[i].font = "12px Roboto";
      frontActuatorLabelAmounts.push(new createjs.Text());
      frontActuatorLabelAmounts[i].x = wheelradius * 1.1 * Math.cos(Math.PI / 3.0 * i);
      frontActuatorLabelAmounts[i].y = wheelradius * 1.1 * Math.sin(Math.PI / 3.0 * i);
      frontActuatorLabelAmounts[i].text = "0 mm";
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
      backActuatorLabels[i].text = side_abbrev + "1" + (i + 1).toString();
      backActuatorLabels[i].font = "12px Roboto";
      backActuatorLabelAmounts.push(new createjs.Text());
      backActuatorLabelAmounts[i].x = wheelradius * 1.1 * Math.cos(Math.PI / 3.0 * i);
      backActuatorLabelAmounts[i].y = wheelradius * 1.1 * Math.sin(Math.PI / 3.0 * i);
      backActuatorLabelAmounts[i].text = "0 mm";
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

    movables[side]["members"].push({"frontActuators" : frontActuators});
    movables[side]["members"].push({"frontActuatorLabels" : frontActuatorLabels});
    movables[side]["members"].push({"frontActuatorAmountLabels" : frontActuatorLabelAmounts});
    movables[side]["members"].push({"backActuators" : backActuators});
    movables[side]["members"].push({"backActuatorLabels" : backActuatorLabels});
    movables[side]["members"].push({"backActuatorAmountLabels" : backActuatorLabelAmounts});

    main_container.addChild(side_container);
  } 
  stage.addChild(main_container);
  stage.update();

  console.log(movables["left"]["members"][0]["frontWheel"].x);
  console.log(movables["left"]["members"][0]["frontWheel"].y);
  console.log(movables["left"]["members"][0]["frontWheel"].regX);
  console.log(movables["left"]["members"][0]["frontWheel"].regY);
}