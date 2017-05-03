# P5 Maps API web page

The project regards the implementation of a single page web app that exploits the google maps API functionalities.
The map marks all the places in Berlin where I had an interview without being selected.
The project is implemented using knockout.js MVVM models.

files:

- maps.html - Single page HTML
- main.js - Google API handling with knockout.js
- main.css - CSS style


execution:
To run the program correctly a Google Maps API key is required.
The key has to be added in the bottom of maps.html file. Substitute the KEY related to the key value in the following line of code:


<script async defer
src=
"https://maps.googleapis.com/maps/api/js?libraries=places,geometry,drawing&key=KEY&v=3&callback=initMap">


Open maps.html file in a browser and explore the map.
