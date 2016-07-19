from flask import Flask, render_template
app = Flask(__name__)

from api import RobotController
rc = RobotController()

@app.route("/", methods=["GET"])
def controlpage():
    return render_template("webinterface.html")

@app.route("/", methods=["POST"])
def controlapi():
	# try:
	# 	jsonrequest = json.loads(request.form("jsonrequest"))
	# 	if not jsonrequest["automanuever"]:
	# 		assert jsonrequest["actuators"]
	# 		assert jsonrequest["wheelmotors"]
	# 		assert jsonrequest["armmotors"]
	# 		assert jsonrequest["pulleymotors"]

	# 		#Pool is for asynchronous actuation
	# 		for actuator in jsonrequest["actuators"]:
	# 			Pool(processes=1).pool.apply_async(rc.moveactuator, [actuator[0], actuator[1]]) #Actuator number, actuator amount (float)
	# 		for wheelmotor in jsonrequest["wheelmotors"]:
	# 			Pool(processes=1).pool.apply_async(rc.rotatewheel, [wheelmotor[0], wheelmotor[1]])
	# 		for armmotor in jsonrequest["armmotors"]:
	# 			Pool(processes=1).pool.apply_async(rc.movearm, [armmotor[0], armmotor[1]])
	# 		for pulleymotor in jsonrequest["pulleymotors"]:
	# 			Pool(processes=1).pool.apply_async(rc.movemass, [pulleymotor[0], pulleymotor[1]])
	# 	else:
	# 		pass

	# 	return json.dumps(rc.read_state())
	# except:
	# 	return "invalid request"


	return "request completed"

if __name__ == "__main__":
    app.run()