# USAGE
# python detect_color.py --image pokemon_games.png

# import the necessary packages
import numpy as np
import argparse
import cv2

# construct the argument parse and parse the arguments
#ap = argparse.ArgumentParser()
#ap.add_argument("-i", "--image", help = "path to the image")
#args = vars(ap.parse_args())

# load the image
#image = cv2.imread(args["image"])

# define the list of boundaries

cap = cv2.VideoCapture(0)
cap.open(0)
print cap
while(True):
	ret, frame = cap.read(cap.grab())
	if frame.empty():
		break
	#boundaries = [
	#	([200, 200, 200], [255, 255, 255])
	#]

	# loop over the boundaries
	#for (lower, upper) in boundaries:
		# create NumPy arrays from the boundaries
	#	lower = np.array(lower, dtype = "uint8")
	#	upper = np.array(upper, dtype = "uint8")

		# find the colors within the specified boundaries and apply
		# the mask
	#	mask = cv2.inRange(image, lower, upper)
	#	output = cv2.bitwise_and(image, image, mask = mask)

		# show the images
	#	cv2.imshow("images", np.hstack([image, output]))
	#	cv2.waitKey(0)

	gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
	cv2.imshow('frame', gray)
	if cv2.waitKey(1) & 0xFF == ord('q'):
		break

cap.release()
cv2.destroyAllWindows()