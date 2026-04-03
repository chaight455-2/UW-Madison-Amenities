# University of Wisconsin Madison Utilities Map

### Team Members
Nolan Hegge, Charlie Haight, Aidan Schooff

### Final Proposal

We are proposing to create an interactive map that allows a user to see the utilities that are available to them on campus. These include, but are not limited to, microwaves, study spaces, fridges, etc.

TODO:
1. Persona/Scenario
    1. Persona
Our user persona is Bob. Bob is a freshman that just started at UW Madison. Bob has only been living in the dorms for a week now, so he doesn't know where any of the campus buildings are and what utilities they have in them. Bob knows where his classes are and he has a good idea of how campus is structured, but he hasn't been exposed to where the best study spaces are  or where you can get a refrigerator and a microwave or which places have individual bathrooms.
    2. Scenario
Our scenario revolves around Bob. Bob just got out of class. Bob went to qq's to get lunch, and he didn't finish all of it because qq's has very large portions. bob wants to find a place to study and then heat up his food. But Bob is a freshman on campus, so he doesn't know where any of the study spots are or where a refrigerator or a microwave is. Bob will open up our app, which has flexible css styling to be mobile friendly. The main screen of the app will be a map page which will show the buildings that are close to Bob's current location and it will show which buildings are currently open. Bob can filter by microwave, refrigerator  and study location for all the buildings nearest to him. He will then get to see a list of buildings and the buildings will change color on the map that fit his filtered criteria. Then he will be able to click on the buildings and see each building has those amenities that he requests and he can retrieve more exact locations of each amenity when he clicks on a building. He will then enjoy his amazing lunch of qq's and feel at home at UW.
2. Requirements Document
   1. Interactions and Representations
        1. **Filter** - Users will be able to filter the map based on their utility of interest, whether it be microwaves, refrigerators, study spaces, or bathrooms. This will be represented in the web map with a panel that has checkboxes next to each utility of interest, allowing users to overlay different layers of utilities on top of each building on campus. The filter’s result will show points on the map inside of each building polygon representing the individual utilities. These points can then be interacted with using the retrieve interaction.
        2. **Retrieve** - Users will be able to click on any individual utility point within a building and the building polygons themselves. Upon clicking an individual utility point, an information popup window will show information such as the floor it is on, what building it is inside, and which students may have special/restricted access to it. Upon clicking on any building polygon, a popup window will show information about the building’s hours and the count of each utility type within it.
        3. **Resymbolize Attributes** - Users will be able to resymbolize the map’s colors based on each building polygon’s distance to a point specified by the user. Upon use of this tool, embedded in a side panel of the web map, the user will be prompted to select a point on the map and a utility of interest. The map will then resymbolize: The building polygons that are closest to the user’s selected point and also contain the utility of interest will be shaded in darker colors, and the building polygons containing the utility that are further away from the selected point will be lighter colors. Buildings that do not contain the selected utility will be greyed out or not colored. This allows the user to identify the closest utility of interest to their location and any other possible options in case a building or floor has a special access key or restricted hours, which can be viewed with the retrieve click.
        4. **Sequence** - Users will be able to sequence through the hours of the day or the days of the week, which will then filter the map by time. Only the buildings that are open during the specified time or day of the week will be shown on the map, the others will be greyed out or not highlighted. This sequence operator will be embedded in a side panel of the map, and will be a small interface widget with forward and backward arrows. The timestamps for the time of day and week will be shown in sliders near the bottom of the map. 
        5. **Search** -  The users will be able to search for a building on campus in a small search bar near the top of the page. Upon searching, the map will zoom into the building of interest, showing each utility point inside that is overlaid using the filter tool. 
        6. **Zoom and Pan** - Users will have free zooming and panning capabilities down to the level of inside a small building, and up to the level of campus in its entirety

    2. Required Data
        1. Campus Boundaries (Madison Open Data portal)
        2. Campus Building GeoJSON (Madison Open Data portal)
        3. Base Layer (Open Street Maps)
        4. Team Collected Data (Finding the locations of microwaves, fridges, other utilities)
        5. Campus Building Hours Data (UW-Madison Facilities Website)


3. Wireframes:

The wireframes pictured below help show off some of the core functionality and operators of the campus utility map that our group plans to create.

Wireframe showing primary functionality such as filter, search, zoom/pan, and retreive, : 
![alt text](https://github.com/chaight455-2/webmapping_final_group_project/blob/project-proposal/img/PrimaryMap.jpg "Primary Map")

Wireframe showing the resymbolize feature using the point/utility selection to find buildings containing the utility nearset to the selected starting point: 
![alt text](https://github.com/chaight455-2/webmapping_final_group_project/blob/project-proposal/img/ResymbolizeMap.jpg "Resymbolize Map")

Wireframe showing the sequence feature which allows users to select the day and time to see open buildings: 
![alt text](https://github.com/chaight455-2/webmapping_final_group_project/blob/project-proposal/img/TimeSequenceMap.jpg "Time Map")

 