# slack-bot-test
This slack bot integrates with the NHTSA Vehicle API.
The slack bot responds to mentions and takes a string containing vehicle data in the form VIN,Make,Model,Year,Fuel Type. 
It takes this data and uses the VIN to get data from the NHTSA Vehicle API and compares the provided data against the returned API data.
The bot constructs a string containing the response from the NHTSA API, extra data from the API and a series of strings indicating if any data provided
does not match what was returned from the NHTSA API.

The general architecture follows the pattern I generally try to follow in my node projects. Separate folders for middleware and routers, and any extra folders 
specific to the project. In this case I added folders to contain the functionality related to slack and the NHTSA API.

# middleware
This folder includes higher level app wide middleware. In this case this includes a basic CORS policy and generic error handler for the app.

# routers
This contains two routers one is the main router which will be included in the server.js file and will point to the /api endpoint. From there
any additional routers will be imported and used in the main router with the appropriate endpoints. In this case there is only one extra router the events router. 
The event router has one post request and is the endpoint that listens for requests from slack so we can send messages to slack with the bot.

# slack
This folder contains the helper classes for containing the slack functionality. The base helper class is meant to be extended and used to add other slack helper classes.
In this case there is only one child helper class the slack event helper class. This class handles the message sent from the user and builds the response text 
to be sent to the user once the vehicle data has been processed. This folder also contains a middleware sub folder this folder contains slack specific middleware. 
This middleware is used to verify the request is coming from slack and to handle the slack challenge when setting the event URL.

# vehicles
This folder contains the classes that are used to help interpret and process the vehicle data. The base vehicle data is a parent class used to handle shared properties
between the vehicle data and vehicle response classes. The vehicle data class represents the data input from the user on slack. The vehicle response class represents the 
data parsed from the NHTSA API. Finally, the vehicle helper class handles getting and parsing data from the NHTSA API. It also constructs the vehicle response object for 
use when comparing the vehicle input data.
