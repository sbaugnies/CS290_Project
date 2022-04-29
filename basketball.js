function searchForPlayer(id) {
    var player = document.getElementById(id).value;
    const Http = new XMLHttpRequest();
    const url='https://www.balldontlie.io/api/v1/players?search=' + player;
    Http.open("GET", url);
    Http.send();

    const correspondingOutputId = id === "player1Name" ? "Player1Results" : "Player2Results"

    Http.onload = (e) => {
        console.log("Response Code: " + Http.status);
        var season = document.getElementById("seasons").value;
        if (Http.status === 200) {
            var allPlayers = JSON.parse(Http.response);
            if (allPlayers.data.length > 0) {
                var mostLikelyPlayerID = allPlayers.data[0].id; 
                showSpecificPlayer('https://www.balldontlie.io/api/v1/season_averages?season=' + season + '&player_ids[]=' + mostLikelyPlayerID, correspondingOutputId);
            } else {
                player += " ------- Search returned 0 results.";
            }
            document.getElementById(correspondingOutputId).innerHTML = "Results for " + player + "<br />";
        } else {
            document.getElementById(correspondingOutputId).innerHTML = "Results for " + player + "<br />Error: " + Http.status;
        }
    }
}

function showSpecificPlayer(url, id) {
    const Http = new XMLHttpRequest();
    Http.open("GET", url);
    Http.send();

    Http.onload = (e) => {
        console.log("Response Code: " + Http.status);
        if (Http.status === 200) {
            var ULelement = "<ul>";
            var responseJSON = JSON.parse(Http.response); 
            Object.entries(responseJSON.data[0]).forEach(([key, value]) => {
                ULelement += "<li>" + key + ": " + value + "</li>";
            });
            ULelement += "</ul>";
            document.getElementById(id).innerHTML += ULelement;
        } else {

        }
    }
}