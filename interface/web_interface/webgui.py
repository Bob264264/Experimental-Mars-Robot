from flask import Flask, render_template, request, url_for
import json

app = Flask(__name__)

from api import RobotController
rc = RobotController()

@app.route("/", methods=["GET"])
def controlpage():
    return render_template("webinterface.html")

def res(result):
	return json.dumps({"success": result})

@app.route("/api", methods=["POST"])
def controlapi():
	movement_type = request.form.get("movement_type")
	component_id  = request.form.get("component_id")
	if movement_type == "actuator":
		amount = int(request.form.get("amount"))
		#decode component_id
		orientation = 0 if component_id[0] == "L" else 12
		wheelnum    = 0 if component_id[2] == "1" else 6
		actuatornum = int(component_id[3])

		realactuatornum = actuatornum + wheelnum + orientation
		#if rc.moveactuator(realactuatornum, amount):
		return res("success")
		#else:
		#	return res("failure")

	elif movement_type == "wheelmotor":
		degrees = request.form.get("degrees")
		speed   = request.form.get("speed")
		return res("success")

if __name__ == "__main__":
    app.run()