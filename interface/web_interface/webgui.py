from flask import Flask, render_template
app = Flask(__name__)

@app.route("/", methods=["GET"])
def controlpage():
    return render_template("webinterface.html")

@app.route("/", methods=["POST"])
def controlapi():
	jsonrequest = request.form("jsonrequest")
	

if __name__ == "__main__":
    app.run()