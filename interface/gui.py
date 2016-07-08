from Tkinter import *
import sys

master = Tk()
label = Label(master, text = "Wheel Number")
label.pack()
wheel = Entry(master, bd = 10) #Wheel Number
wheel.pack()
actuator = Entry(master, bd = 10) #Actuator Letter
actuator.pack()
distance = Entry(master, bd = 10) #Actuator Extension/Retraction Distance
distance.pack()


def receive():
    wh = wheel.get()
    act = actuator.get()
    dist = distance.get()
    if(wh == "Exit"):
        sys.exit()
    else:
        print("Wheel " + wh + ", Actuator " + act + ", Distance of " + dist + " mm.")


button = Button(master, text="Send Command", command = receive)
button.pack()

master.mainloop()
