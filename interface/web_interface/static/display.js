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
    var offsetx = 100;
    var offsety = 150;
    var wheelradius = 100;

    var change = 50;
    var wheeloffset = wheelradius * 4 + change;

    var frontwheel_container = new createjs.Container();
    frontwheel_container.regX = offsetx;
    frontwheel_container.regY = offsety + y;
    var backwheel_container = new createjs.Container();
    backwheel_container.regX = offsetx + wheeloffset;
    backwheel_container.regY = offsety + y;

    var frontWheel     = new createjs.Shape();
    var frontWheelText = new createjs.Text();
    var backWheel      = new createjs.Shape();
    var backWheelText  = new createjs.Text();

    frontWheel.graphics
      .setStrokeStyle(2)
      .beginStroke("black")
      .drawCircle(offsetx,offsety + y,wheelradius);
    frontWheelText.font = "Roboto";
    frontWheelText.text = "Wheel Motor " + side_abbrev + "1: 0 rpm";
    frontWheelText.x    = offsetx - 10;
    frontWheelText.y    = offsety + y + wheelradius + 20;

    backWheel.graphics
      .setStrokeStyle(2)
      .beginStroke("black")
      .drawCircle(offsetx + wheeloffset,offsety + y,wheelradius);
    backWheelText.text = "Wheel Motor " + ((side == "left") ? "L" : "R") + "2: 0 rpm";
    backWheelText.x    = offsetx + wheeloffset - 10;
    backWheelText.y    = offsety + y + wheelradius + 20;

    frontwheel_container.addChild(frontWheel);
    main_container.addChild(frontWheelText);
    backwheel_container.addChild(backWheel);
    main_container.addChild(backWheelText);
    movables[side]["members"].push({"frontWheel" : frontWheel});
    movables[side]["members"].push({"frontWheelText" : frontWheelText});
    movables[side]["members"].push({"backWheel" : backWheel});
    movables[side]["members"].push({"backWheelText" : backWheelText});

    connectorPiece = new createjs.Shape();
    connectorPieceWidth = 20;
    connectorPiece.graphics
      .beginFill("black")
      .drawRect(offsetx + wheelradius, offsety + y - connectorPieceWidth / 2, wheelradius * 2 + change, connectorPieceWidth);
    main_container.addChild(connectorPiece);

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
        .moveTo(offsetx,y + offsety)
        .lineTo(offsetx + wheelradius * Math.cos(Math.PI / 3.0 * i), y + offsety + wheelradius * Math.sin(Math.PI / 3.0 * i));
      frontActuatorLabels.push(new createjs.Text());
      frontActuatorLabels[i].x = offsetx + wheelradius * Math.cos(Math.PI / 3.0 * i) / 2;
      frontActuatorLabels[i].y = y + offsety + wheelradius * Math.sin(Math.PI / 3.0 * i) / 2;
      frontActuatorLabels[i].text = side_abbrev + "1" + (i + 1).toString();
      frontActuatorLabels[i].font = "12px Roboto";
      frontActuatorLabelAmounts.push(new createjs.Text());
      frontActuatorLabelAmounts[i].x = offsetx + wheelradius * Math.cos(Math.PI / 3.0 * i);
      frontActuatorLabelAmounts[i].y = y + offsety + wheelradius * Math.sin(Math.PI / 3.0 * i);
      frontActuatorLabelAmounts[i].text = "0 mm";
      frontActuatorLabelAmounts[i].font = "12px Roboto";

      backActuators.push(new createjs.Shape());
      backActuators[i].graphics
        .setStrokeStyle(4)
        .beginStroke("red")
        .moveTo(wheeloffset + offsetx,y + offsety)
        .lineTo(wheeloffset + offsetx + wheelradius * Math.cos(Math.PI / 3.0 * i), y + offsety + wheelradius * Math.sin(Math.PI / 3.0 * i));
      backActuatorLabels.push(new createjs.Text());
      backActuatorLabels[i].x = wheeloffset + offsetx + wheelradius * Math.cos(Math.PI / 3.0 * i) / 2;
      backActuatorLabels[i].y = y + offsety + wheelradius * Math.sin(Math.PI / 3.0 * i) / 2;
      backActuatorLabels[i].text = side_abbrev + "1" + (i + 1).toString();
      backActuatorLabels[i].font = "12px Roboto";
      backActuatorLabelAmounts.push(new createjs.Text());
      backActuatorLabelAmounts[i].x = wheeloffset + offsetx + wheelradius * Math.cos(Math.PI / 3.0 * i);
      backActuatorLabelAmounts[i].y = y + offsety + wheelradius * Math.sin(Math.PI / 3.0 * i);
      backActuatorLabelAmounts[i].text = "0 mm";
      backActuatorLabelAmounts[i].font = "12px Roboto";

      frontwheel_container.addChild(frontActuators[i]);
      frontwheel_container.addChild(frontActuatorLabels[i]);
      frontwheel_container.addChild(frontActuatorLabelAmounts[i]);
      backwheel_container.addChild(backActuators[i]);
      backwheel_container.addChild(backActuatorLabels[i]);
      backwheel_container.addChild(backActuatorLabelAmounts[i]);
    }

    main_container.addChild(frontwheel_container);
    main_container.addChild(backwheel_container);

    leftText = new createjs.Text("Rover Left Side", "20px Roboto", "#000000");
    leftText.x = offsetx/2;
    leftText.y = 0;
    main_container.addChild(leftText);

    rightText = new createjs.Text("Rover Right Side", "20px Roboto", "#000000");
    rightText.x = offsetx/2;
    rightText.y = y;
    main_container.addChild(rightText);

    movables[side]["members"].push({"frontActuators" : frontActuators});
    movables[side]["members"].push({"frontActuatorLabels" : frontActuatorLabels});
    movables[side]["members"].push({"frontActuatorAmountLabels" : frontActuatorLabelAmounts});
    movables[side]["members"].push({"backActuators" : backActuators});
    movables[side]["members"].push({"backActuatorLabels" : backActuatorLabels});
    movables[side]["members"].push({"backActuatorAmountLabels" : backActuatorLabelAmounts});

    stage.addChild(main_container);
    stage.update();
  }
}