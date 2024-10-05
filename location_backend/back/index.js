const express = require("express");

const app = express ();
app.use(express.json());
const port = process.env.PORT || 3000;

// tmp data
let userLocations = [
    {
        "user": 0,
        "location": { "lon": 24.958675, "lat": 60.1806989 }
    },
    {
        "user": 1,
        "location": { "lon": 124.958675, "lat": 60.1806989 }
    },
    {
        "user": 2,
        "location": { "lon": 24.958675, "lat": 160.1806989 }
    },
    {
        "user": 3,
        "location": { "lon": 24.959675, "lat": 60.2806989 }
    },
    {
        "user": 4,
        "location": { "lon": 24.958675, "lat": 60.1806789 }
    }
]

app.post("/location", (request, response) => {
    request.body
    userLocations.push({"user": request.body.id, "location": {"lon": request.body.lon, "lat": request.body.lat}})

    console.log(userLocations[userLocations.length - 1]);
    response.send(200)
});

const maxDistance = .1

app.get("/get_nearby", (request, response) => {
    let tmp = []
    let loc =  {"lon": request.query.lon, "lat": request.query.lat}
    
    userLocations.map((user) => {
        let distance = Math.pow(loc.lat - user.location.lat, 2) + Math.pow(loc.lon - user.location.lon, 2)
        if (distance < maxDistance)
            tmp.push({"user": user.user, "distancesquare": distance})
    })
    response.send(tmp)
});

app.listen(port, () => {
    console.log("Server Listening on PORT:", port);
  });