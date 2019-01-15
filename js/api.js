const URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

function getEarthquakes() {
    const req = new XMLHttpRequest();
    req.open('GET', URL, false);
    req.send(null);

    var earthquakes = undefined;

    if (req.status === 200) {
        earthquakes = JSON.parse(req.response);
        console.log(earthquakes);
    } else {
        console.error("Status de la réponse: %d (%s)", req.status, req.statusText);
    }

    return earthquakes;
}

getEarthquakes();