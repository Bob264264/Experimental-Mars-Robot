$("#component-move").click(function() {
	var numbers = $("[name=componentnumbers]").val().split(",");
	var values  = $("[name=componentvalues]").val().split(",");
	if (values.length != numbers.length) {
		Materialize.toast("No one-to-one mapping from components to values exists, try again.", 2000);
	}
	else {
		for(i = 0; i < numbers.length; i++) {
			var component = numbers[i];
			var value     = values[i];
			switch(component.substring(1,2)) {
				case "M": //wheel motor
					if (value.indexOf("_") == -1) {
						Materialize.toast("Motor " + component + " movement does not have appropriate values.", 2000);
						break;
					}

					value = value.split("_");
					api_spin_motor(component, value[0], value[1]);
					//Materialize.toast("Values invalid for motor " + component + " control, try again.", 2000);
					break;
				case "A": //actuator
					if (parseFloat(value) <= 120 && parseFloat(value) >= 0) {
						api_set_actuator(component, value);
					}
					else {
						Materialize.toast("Value invalid for actuator " + component + " control, try again.", 2000);
					}
					break;
				case "P": //pulley
					break;
				case "R": //arrrrrm
			}
		}
	}
});

function component_error(component_name) {
	Materialize.toast("There was an error performing the requested action for component " + component_name, 2000);
}

function api_spin_motor(motor_name, speed, degrees) {
	$.ajax({
		method: "POST",
		data  : {
			movement_type : "wheelmotor",
			component_id  : motor_name,
			speed         : speed,
			degrees       : degrees,
		},
		url : "/api",
		success: function(data) {
			try {
				data = JSON.parse(data);
				if (data.success == "success") {
					animation_spin_motor(motor_name, speed, degrees);
				}
				else {
					throw new Exception();
				}
			}
			catch(e) {
				component_error(motor_name);
			}
		}
	});
}

function api_set_actuator(actuator_label, amount) {
		$.ajax({
		method: "POST",
		data  : {
			movement_type : "actuator",
			component_id  : actuator_label,
			amount        : amount
		},
		url : "/api",
		success: function(data) {
			try {
				data = JSON.parse(data);
				if (data.success == "success") {
					animation_set_actuator(actuator_label, amount);
				}
				else {
					throw new Exception();
				}
			}
			catch(e) {
				console.log(e);
				component_error(actuator_label);
			}
		}
	});
}