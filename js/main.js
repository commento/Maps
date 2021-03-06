      var map;

      // Create a new blank array for all the listing markers.
      var markers = [];

      // This global polygon variable is to ensure only ONE polygon is rendered.
      var polygon = null;

      // Create placemarkers array to use in multiple functions to have control
      // over the number of places that show.
      var placeMarkers = [];

      var drawingManager = null;

      var defaultIcon = null;

      var clickedIcon = null;

      var largeInfowindow = null;

      var wiki = [];

      var fixedlocations = [
          {id: 0,title: 'deepstreamhub', description: 'Applied for Junior Fullstack Engineer', tag: 'Web_developer', location: {lat: 52.5057635, lng: 13.4213807}},
          {id: 1,title: 'Native Instruments', description: 'Applied for C++ Developer', tag: 'Software_developer', location: {lat: 52.4991342, lng: 13.4462062}},
          {id: 2,title: 'Splash App', description: 'Applied for Creative Coder', tag: 'Creative_coding', location: {lat: 52.5186107, lng: 13.3951823}},
          {id: 3,title: 'Factory/Soundcloud', description: 'Applied for C++ Developer', tag: 'Embedded_software', location: {lat: 52.5372122, lng: 13.3949587}},
          {id: 4,title: 'Formlabs', description: 'Applied for Technical Specialist', tag: 'Quality_assurance', location: {lat: 52.5319176, lng: 13.4269454}},
          {id: 5,title: 'think-cell', description: 'Applied for C++ Backend Developer', tag: 'Web_developer', location: {lat: 52.5284938, lng: 13.3852142}},
          {id: 6,title: 'HelloFresh', description: 'Applied for QA Engineer', tag: 'Quality_assurance', location: {lat: 52.5286397, lng: 13.4114451}},
          {id: 7,title: 'WATTx', description: 'Applied for Embedded System Engineer', tag: 'Embedded_software', location: {lat: 52.4986194, lng: 13.3853782}},
          {id: 8,title: 'Contentful', description: 'Applied for IT internship', tag: 'Quality_assurance', location: {lat: 52.5023285, lng: 13.4094984}},
          {id: 9,title: 'Sonic Geometry', description: 'Applied for Sound Engineer', tag: 'Audio_engineer', location: {lat: 52.5121479, lng: 13.3891572}},
          {id: 10,title: 'HERE', description: 'Applied for C++ developer', tag: 'Software_developer', location: {lat: 52.53035, lng: 13.3809536}},
          {id: 11,title: 'Quandoo', description: 'Applied for QA Engineer internship', tag: 'Quality_assurance', location: {lat: 52.5486449, lng: 13.4039589}},
          {id: 12,title: 'BridgeMaker', description: 'Applied for Junior Backend Engineer', tag: 'Web_developer', location: {lat: 52.530906, lng: 13.4046994}}
        ];

      var locations = [
          {id: 0,title: 'deepstreamhub', description: 'Applied for Junior Fullstack Engineer', tag: 'Web_developer', location: {lat: 52.5057635, lng: 13.4213807}},
          {id: 1,title: 'Native Instruments', description: 'Applied for C++ Developer', tag: 'Software_developer', location: {lat: 52.4991342, lng: 13.4462062}},
          {id: 2,title: 'Splash App', description: 'Applied for Creative Coder', tag: 'Creative_coding', location: {lat: 52.5186107, lng: 13.3951823}},
          {id: 3,title: 'Factory/Soundcloud', description: 'Applied for C++ Developer', tag: 'Embedded_software', location: {lat: 52.5372122, lng: 13.3949587}},
          {id: 4,title: 'Formlabs', description: 'Applied for Technical Specialist', tag: 'Quality_assurance', location: {lat: 52.5319176, lng: 13.4269454}},
          {id: 5,title: 'think-cell', description: 'Applied for C++ Backend Developer', tag: 'Web_developer', location: {lat: 52.5284938, lng: 13.3852142}},
          {id: 6,title: 'HelloFresh', description: 'Applied for QA Engineer', tag: 'Quality_assurance', location: {lat: 52.5286397, lng: 13.4114451}},
          {id: 7,title: 'WATTx', description: 'Applied for Embedded System Engineer', tag: 'Embedded_software', location: {lat: 52.4986194, lng: 13.3853782}},
          {id: 8,title: 'Contentful', description: 'Applied for IT internship', tag: 'Quality_assurance', location: {lat: 52.5023285, lng: 13.4094984}},
          {id: 9,title: 'Sonic Geometry', description: 'Applied for Sound Engineer', tag: 'Audio_engineer', location: {lat: 52.5121479, lng: 13.3891572}},
          {id: 10,title: 'HERE', description: 'Applied for C++ developer', tag: 'Software_developer', location: {lat: 52.53035, lng: 13.3809536}},
          {id: 11,title: 'Quandoo', description: 'Applied for QA Engineer internship', tag: 'Quality_assurance', location: {lat: 52.5486449, lng: 13.4039589}},
          {id: 12,title: 'BridgeMaker', description: 'Applied for Junior Backend Engineer', tag: 'Web_developer', location: {lat: 52.530906, lng: 13.4046994}}
        ];

      function initMap() {
        // Create a styles array to use with the map.


        // These are the real estate listings that will be shown to the user.
        // Normally we'd have these in a database instead.

        for(var i = 0; i < locations.length; i++){
          var playListURL = 'http://en.wikipedia.org/w/api.php?format=json&action=query&titles=' + locations[i].tag + '&prop=extracts&rvprop=content&callback=?';

          var cbSuccess = false;
          var index = 0;
          $.getJSON(playListURL ,(function(thisi) { return function(data) {
            cbSuccess = true;
            $.each(data.query.pages, function(j, item) {
              var wikiall = data.query.pages[j].extract.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
              wiki[thisi] = wikiall[0];
            });
          };
          }(i))
          ).fail(function(jqXHR, status, error){
            alert("Wikipedia API get failed");
          });

        }

        // Constructor creates a new map - only center and zoom are required.
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 52.5392463, lng: 13.403801},
          zoom: 13,
          
          mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain'] //,
                    //'styled_map']
          },
          mapTypeControl: false
        });

        // This autocomplete is for use in the search within time entry box.
        var timeAutocomplete = new google.maps.places.Autocomplete(
            document.getElementById('search-within-time-text'));
        // This autocomplete is for use in the geocoder entry box.
        var zoomAutocomplete = new google.maps.places.Autocomplete(
            document.getElementById('zoom-to-area-text'));
        // Bias the boundaries within the map for the zoom to area text.
        zoomAutocomplete.bindTo('bounds', map);
        // Create a searchbox in order to execute a places search
        var searchBox = new google.maps.places.SearchBox(
            document.getElementById('places-search'));
        // Bias the searchbox to within the bounds of the map.
        searchBox.setBounds(map.getBounds());

        largeInfowindow = new google.maps.InfoWindow();

        // Initialize the drawing manager.
        drawingManager = new google.maps.drawing.DrawingManager({
          drawingMode: google.maps.drawing.OverlayType.POLYGON,
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT,
            drawingModes: [
              google.maps.drawing.OverlayType.POLYGON
            ]
          }
        });

        // Style the markers a bit. This will be our listing marker icon.
        defaultIcon = makeMarkerIcon('0091ff');

        clickedIcon = makeMarkerIcon('FFFFFF');

        // The following group uses the location array to create an array of markers on initialize.
        for (var i = 0; i < locations.length; i++) {
          // Get the position from the location array.
          var position = locations[i].location;
          var title = locations[i].title;
          var description = locations[i].description;
          // Create a marker per location, and put into markers array.
          var marker = new google.maps.Marker({
            position: position,
            title: title,
            description: description,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon,
            id: i
          });
          // Push the marker to our array of markers.
          markers.push(marker);
          // Create an onclick event to open the large infowindow at each marker.
          marker.addListener('click', function() {
            for (var i = 0; i < markers.length; i++) {
              markers[i].setIcon(defaultIcon);
            }
            this.setIcon(clickedIcon);
            populateInfoWindow(this, largeInfowindow);
          });
        }

        showMarkers();

        // Listen for the event fired when the user selects a prediction from the
        // picklist and retrieve more details for that place.
        searchBox.addListener('places_changed', function() {
          searchBoxPlaces(this);
        });

        // Listen for the event fired when the user selects a prediction and clicks
        // "go" more details for that place.

        // Add an event listener so that the polygon is captured,  call the
        // searchWithinPolygon function. This will show the markers in the polygon,
        // and hide any outside of it.
        drawingManager.addListener('overlaycomplete', function(event) {
          // First, check if there is an existing polygon.
          // If there is, get rid of it and remove the markers
          if (polygon) {
            polygon.setMap(null);
            hideMarkers(markers);
          }
          // Switching the drawing mode to the HAND (i.e., no longer drawing).
          drawingManager.setDrawingMode(null);
          // Creating a new editable polygon from the overlay.
          polygon = event.overlay;
          polygon.setEditable(true);
          // Searching within the polygon.
          searchWithinPolygon(polygon);
          // Make sure the search is re-done if the poly is changed.
          polygon.getPath().addListener('set_at', searchWithinPolygon);
          polygon.getPath().addListener('insert_at', searchWithinPolygon);
        });
      }

      // This function populates the infowindow when the marker is clicked. We'll only allow
      // one infowindow which will open at the marker that is clicked, and populate based
      // on that markers position.
      function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          // Clear the infowindow content to give the streetview time to load.
          infowindow.setContent('');
          infowindow.marker = marker;
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
            marker.setIcon(defaultIcon);
          });
          var streetViewService = new google.maps.StreetViewService();
          var radius = 50;

          // In case the status is OK, which means the pano was found, compute the
          // position of the streetview image, then calculate the heading, then get a
          // panorama from that and set the options
          function getStreetView(data, status) {
            if (status == google.maps.StreetViewStatus.OK) {
              var nearStreetViewLocation = data.location.latLng;
              var heading = google.maps.geometry.spherical.computeHeading(
                nearStreetViewLocation, marker.position);
                infowindow.setContent('<div><b>' + marker.title + '</b></div><div>' + marker.description + '</div><div>' + wiki[marker.id] + '</div><div id="pano"></div>');
                var panoramaOptions = {
                  position: nearStreetViewLocation,
                  pov: {
                    heading: heading,
                    pitch: 30
                  }
                };
              var panorama = new google.maps.StreetViewPanorama(
                document.getElementById('pano'), panoramaOptions);
            } else {
              infowindow.setContent('<div><b>' + marker.title + '</b></div><div>' + marker.description + '</div>' +
                '<div>No Street View Found</div>');
            }
          }
          // Use streetview service to get the closest streetview image within
          // 50 meters of the markers position
          streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
          // Open the infowindow on the correct marker.
          infowindow.open(map, marker);
        }
      }

      // This function will loop through the markers array and display them all.
      var InformationPanelViewModel = function() {

        this.hasClickedShowButton = ko.observable(0);
        this.hasClickedHideButton = ko.observable(0);
        this.addressZoom = ko.observable("");
        this.addressTime = ko.observable("");
        this.locations = ko.observableArray(locations);
        this.query = ko.observable('');
        this.mode = ko.observable("DRIVING");
        this.maxDuration = ko.observable("10");

        this.search = function(value) {
          // remove all the current beers, which removes them from the view
          ViewModel.locations.removeAll();
          hideMarkers(markers);

          for(var i = 0; i < fixedlocations.length; i++) {

            if(fixedlocations[i].title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
              ViewModel.locations.push(fixedlocations[i]);
              showMarkerFilter(markers[fixedlocations[i].id]);
            }
          }
        };

        this.query.subscribe(this.search);


        this.showListings = function() {
          var bounds = new google.maps.LatLngBounds();
          // Extend the boundaries of the map for each marker and display the marker
          for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
            bounds.extend(markers[i].position);
            //markers[i].setIcon(defaultIcon);
          }
          map.fitBounds(bounds);

          this.hasClickedShowButton(1);
          this.hasClickedHideButton(0);

          this.showMap();

        };

        this.hideListings = function() {
          hideMarkers(markers);
          this.hasClickedShowButton(0);
          this.hasClickedHideButton(1);

          this.showMap();

        };

        this.textSearchPlaces = function() {
          textSearchPlaces();
          this.showMap();
        }

        this.selectedOptions = ko.computed(function() {
          return this.hasClickedShowButton() == 1;
        }, this);
        this.hasClickedShow = ko.computed(function() {
          return this.hasClickedShowButton() == 1;
        }, this);

        this.hasClickedHide = ko.computed(function() {
          return this.hasClickedHideButton() == 1;
        }, this);

        // This shows and hides (respectively) the drawing options.
        this.toggleDrawing = function() {
          if (drawingManager.map) {
            drawingManager.setMap(null);
            // In case the user drew anything, get rid of the polygon
            if (polygon !== null) {
              polygon.setMap(null);
            }
          } else {
            drawingManager.setMap(map);
          }
        };

        // This function takes the input value in the find nearby area text input
        // locates it, and then zooms into that area. This is so that the user can
        // show all listings, then decide to focus on one area of the map.
        this.zoomToArea = function() {
          //var zoomToAreaText 
          var geocoder = new google.maps.Geocoder();
          // Get the address or place that the user entered.
          var address = this.addressZoom();
          // Make sure the address isn't blank.
          if (address == '') {
            window.alert('You must enter an area, or address.');
          } else {
            // Geocode the address/area entered to get the center. Then, center the map
            // on it and zoom in
            geocoder.geocode(
              { address: address,
                componentRestrictions: {locality: 'Berlin'}
              }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                  map.setCenter(results[0].geometry.location);
                  map.setZoom(15);
                } else {
                  window.alert('We could not find that location - try entering a more' +
                      ' specific place.');
                }
              });
            }

            this.showMap();
        };


        this.showOptionBox = function() {          
          document.getElementById("map").style.visibility = "hidden";
        };

        this.showMap = function() {
          document.getElementById("map").style.visibility = "visible";
        } ;

        this.showMark = function(location) {

          markers[location.id].setIcon(clickedIcon);
          populateInfoWindow(markers[location.id], largeInfowindow);
          showMarker(markers[location.id]);

        } ;

        // This function allows the user to input a desired travel time, in
        // minutes, and a travel mode, and a location - and only show the listings
        // that are within that travel time (via that travel mode) of the location
        this.searchWithinTime = function() {
          // Initialize the distance matrix service.
          var distanceMatrixService = new google.maps.DistanceMatrixService;
          var address = this.addressTime();
          // Check to make sure the place entered isn't blank.
          if (address == '') {
            window.alert('You must enter an address.');
          } else {
            hideMarkers(markers);
            // Use the distance matrix service to calculate the duration of the
            // routes between all our markers, and the destination address entered
            // by the user. Then put all the origins into an origin matrix.
            var origins = [];
            for (var i = 0; i < markers.length; i++) {
              origins[i] = markers[i].position;
            }
            var destination = address;
            var mode = this.mode();

            // Now that both the origins and destination are defined, get all the
            // info for the distances between them.
            distanceMatrixService.getDistanceMatrix({
              origins: origins,
              destinations: [destination],
              travelMode: google.maps.TravelMode[mode],
              unitSystem: google.maps.UnitSystem.IMPERIAL,
            }, function(response, status) {
              if (status !== google.maps.DistanceMatrixStatus.OK) {
                window.alert('Error was: ' + status);
              } else {
                displayMarkersWithinTime(response);
              }
            });
          }
          this.showMap();
        };

      };

      // This function will loop through the listings and hide them all.
      function hideMarkers(markers) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
      }

      function showMarkers() {
        var bounds = new google.maps.LatLngBounds();
        // Extend the boundaries of the map for each marker and display the marker
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
          bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);
      }

      function showMarker(marker) {
        var bounds = new google.maps.LatLngBounds();
        // Extend the boundaries of the map for each marker and display the marker

        marker.setMap(map);
        document.getElementById("map").style.visibility = "visible";
      }

      function showMarkerFilter(marker) {
        var bounds = new google.maps.LatLngBounds();
        // Extend the boundaries of the map for each marker and display the marker

        marker.setMap(map);
      }

      // This function takes in a COLOR, and then creates a new marker
      // icon of that color. The icon will be 21 px wide by 34 high, have an origin
      // of 0, 0 and be anchored at 10, 34).
      function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;
      }

      // This function hides all markers outside the polygon,
      // and shows only the ones within it. This is so that the
      // user can specify an exact area of search.
      function searchWithinPolygon() {
        for (var i = 0; i < markers.length; i++) {
          if (google.maps.geometry.poly.containsLocation(markers[i].position, polygon)) {
            markers[i].setMap(map);
          } else {
            markers[i].setMap(null);
          }
        }
      }

      // This function will go through each of the results, and,
      // if the distance is LESS than the value in the picker, show it on the map.
      function displayMarkersWithinTime(response) {
        var maxDuration = ViewModel.maxDuration();
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;
        // Parse through the results, and get the distance and duration of each.
        // Because there might be  multiple origins and destinations we have a nested loop
        // Then, make sure at least 1 result was found.
        var atLeastOne = false;
        for (var i = 0; i < origins.length; i++) {
          var results = response.rows[i].elements;
          for (var j = 0; j < results.length; j++) {
            var element = results[j];
            if (element.status === "OK") {
              // The distance is returned in feet, but the TEXT is in miles. If we wanted to switch
              // the function to show markers within a user-entered DISTANCE, we would need the
              // value for distance, but for now we only need the text.
              var distanceText = element.distance.text;
              // Duration value is given in seconds so we make it MINUTES. We need both the value
              // and the text.
              var duration = element.duration.value / 60;
              var durationText = element.duration.text;
              if (duration <= maxDuration) {
                //the origin [i] should = the markers[i]
                markers[i].setMap(map);
                atLeastOne = true;
                // Create a mini infowindow to open immediately and contain the
                // distance and duration
                var infowindow = new google.maps.InfoWindow({
                  content: durationText + ' away, ' + distanceText +
                    '<div><input type=\"button\" value=\"View Route\" onclick =' +
                    '\"displayDirections(&quot;' + origins[i] + '&quot;);\"></input></div>'
                });
                infowindow.open(map, markers[i]);
                // Put this in so that this small window closes if the user clicks
                // the marker, when the big infowindow opens
                markers[i].infowindow = infowindow;
                google.maps.event.addListener(markers[i], 'click', function() {
                  this.infowindow.close();
                });
              }
            }
          }
        }
        if (!atLeastOne) {
          window.alert('We could not find any locations within that distance!');
        }
      }

      // This function is in response to the user selecting "show route" on one
      // of the markers within the calculated distance. This will display the route
      // on the map.
      function displayDirections(origin) {
        hideMarkers(markers);
        var directionsService = new google.maps.DirectionsService;
        // Get the destination address from the user entered value.
        var destinationAddress =
            ViewModel.addressTime();
        // Get mode again from the user entered value.
        var mode = ViewModel.mode();
        directionsService.route({
          // The origin is the passed in marker's position.
          origin: origin,
          // The destination is user entered address.
          destination: destinationAddress,
          travelMode: google.maps.TravelMode[mode]
        }, function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            var directionsDisplay = new google.maps.DirectionsRenderer({
              map: map,
              directions: response,
              draggable: true,
              polylineOptions: {
                strokeColor: 'green'
              }
            });
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

      // This function fires when the user selects a searchbox picklist item.
      // It will do a nearby search using the selected query string or place.
      function searchBoxPlaces(searchBox) {
        hideMarkers(placeMarkers);
        var places = searchBox.getPlaces();
        if (places.length == 0) {
          window.alert('We did not find any places matching that search!');
        } else {
        // For each place, get the icon, name and location.
          createMarkersForPlaces(places);
        }
      }

      // This function firest when the user select "go" on the places search.
      // It will do a nearby search using the entered query string or place.
      function textSearchPlaces() {
        var bounds = map.getBounds();
        hideMarkers(placeMarkers);
        var placesService = new google.maps.places.PlacesService(map);
        placesService.textSearch({
          query: document.getElementById('places-search').value,
          bounds: bounds
        }, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            createMarkersForPlaces(results);
          }
          else
          {
            alert("Google Maps Places API get failed");
          }
        });
      }

      // This function creates markers for each place found in either places search.
      function createMarkersForPlaces(places) {
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < places.length; i++) {
          var place = places[i];
          var icon = {
            url: place.icon,
            size: new google.maps.Size(35, 35),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(15, 34),
            scaledSize: new google.maps.Size(25, 25)
          };
          // Create a marker for each place.
          var marker = new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location,
            id: place.place_id
          });
          // Create a single infowindow to be used with the place details information
          // so that only one is open at once.
          var placeInfoWindow = new google.maps.InfoWindow();
          // If a marker is clicked, do a place details search on it in the next function.
          marker.addListener('click', function() {
            if (placeInfoWindow.marker == this) {
              console.log("This infowindow already is on this marker!");
            } else {
              getPlacesDetails(this, placeInfoWindow);
            }
          });
          placeMarkers.push(marker);
          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        }

        map.fitBounds(bounds);

      }

    // This is the PLACE DETAILS search - it's the most detailed so it's only
    // executed when a marker is selected, indicating the user wants more
    // details about that place.
    function getPlacesDetails(marker, infowindow) {
      var service = new google.maps.places.PlacesService(map);
      service.getDetails({
        placeId: marker.id
      }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // Set the marker property on this infowindow so it isn't created again.
          infowindow.marker = marker;
          var innerHTML = '<div>';
          if (place.name) {
            innerHTML += '<strong>' + place.name + '</strong>';
          }
          if (place.formatted_address) {
            innerHTML += '<br>' + place.formatted_address;
          }
          if (place.formatted_phone_number) {
            innerHTML += '<br>' + place.formatted_phone_number;
          }
          if (place.opening_hours) {
            innerHTML += '<br><br><strong>Hours:</strong><br>' +
                place.opening_hours.weekday_text[0] + '<br>' +
                place.opening_hours.weekday_text[1] + '<br>' +
                place.opening_hours.weekday_text[2] + '<br>' +
                place.opening_hours.weekday_text[3] + '<br>' +
                place.opening_hours.weekday_text[4] + '<br>' +
                place.opening_hours.weekday_text[5] + '<br>' +
                place.opening_hours.weekday_text[6];
          }
          if (place.photos) {
            innerHTML += '<br><br><img src="' + place.photos[0].getUrl(
                {maxHeight: 100, maxWidth: 200}) + '">';
          }
          innerHTML += '</div>';
          infowindow.setContent(innerHTML);
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
        }
        else
        {
          alert("Google Maps Places API get failed");
        }
      });

    }

    var ViewModel = new InformationPanelViewModel();
      // Extend the boundaries of the map for each marker and display the marker
    ko.applyBindings(ViewModel);
