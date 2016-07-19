$("#component-move").click(function() {
	var numbers = $("#componentnumbers").val().split(",");
	var values  = $("#componentvalues").val().split(",");
	if (values.length != numbers.length) {
		Materialize.toast("No one-to-one mapping from components to values exists, try again.", 2000);
	}
	else {
		for(i = 0; i < numbers.length; i++) {
			var component = numbers[i];
			var value     = values[i];
			switch(component.substring(1,2)) {
				case "M":
					if (value.indexOf("_") == -1) {
						Materialize.toast("Motor" + component + " movement does not have appropriate values.", 2000);
					}
					else {
						value = value.split("_");
						if (parseFloat(value[0]) === value[0] && parseFloat(value[0]) === value[1]) {
							spin_motor(component, value[0], value[1]);
							api_spin_motor(component, value[0], value[1]);
						}
						else {
							Materialize.toast("Values invalid for motor" + component + " control, try again.", 2000);
						}
					}
				case "A":
					if (parseFloat(value) === value) {
						set_actuator(component, value);
						api_set_actuator(component, value);
					}
					else {
						Materialize.toast("Value invalid for actuator" + component + " control, try again.", 2000);
					}
			}
		}
	}
});

function api_spin_motor(motor_name, speed, degrees) {
	//TODO implement using AJAX JQuery
}

function api_set_actuator(actuator_label, amount) {
	//TODO implement using AJAX JQuery
}