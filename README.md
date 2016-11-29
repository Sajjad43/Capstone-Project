VisualCric(a data visualisation on cricket statistics)

Setup

----------------------------------------------------------
how to import the "database" folder(the exported database)-

Steps-

Create a folder(name it anything , suppose 'X'). Inside the folder, create a subfolder (name it "data).
Using cmd ,move to the newly created 'X',then run the command (mongod --dbpath=data)

start another cmd,run the command (mongorestore -d visualCric .../Capstone/database)
 visualCric is the name of the database and .../Capstone/database is the path correspond to exported Database folder located 
 inside Capstone(project) folder ,mentioned above

--------------------------------------------------------

The import of the database is done.Next run the database by going to the newly created 'X' folder and then run the command (mongod --dbpath=data)
using cmd

---------------------------------------------------------------

The database is running and the last thing left is to start the server.This is done by -

Open a cmd.Go to the Captone folder(project folder) using cmd and then run (node server.js).



Test case-

Team page

-Bangladesh 2006

-England 2008

Match page

-Bangladesh India 2014

-Pakistan Zimbabwe 2015

-South Africa England 2009

Player page

-Bangladesh 2006

-England 2008
