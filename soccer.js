function searchForPlayer(id) {
    var player = document.getElementById(id).value;
    const Http = new XMLHttpRequest();
    const url="https://api-football-v1.p.rapidapi.com/v2/players/search/" + player;
    Http.open("GET", url);
    Http.setRequestHeader('x-rapidapi-key','e991552fcemsh8aca531a4889c32p12e5dajsnd2942b33e763')
    Http.send();

    const correspondingOutputId = id === "player1Name" ? "Player1Results" : "Player2Results"
    
    document.getElementById(correspondingOutputId).innerHTML = "Results for " + player + "<br />Error: " + Http.status;

    Http.onload = (e) => {
        console.log("Response Code: " + Http.status);
        if (Http.status === 200) {
            var allPlayers = JSON.parse(Http.response);
            console.log(allPlayers);
            if (allPlayers.api.results >= 1) {
                var mostLikelyPlayerID = allPlayers.api.players[0].player_id; 
                showSpecificPlayer("https://api-football-v1.p.rapidapi.com/v2/players/player/" + mostLikelyPlayerID, correspondingOutputId);
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
    Http.setRequestHeader('x-rapidapi-key','e991552fcemsh8aca531a4889c32p12e5dajsnd2942b33e763')
    Http.send();
    Http.onload = (e) => {
        console.log("Response Code: " + Http.status);
        if (Http.status === 200) {
            var ULelement = "<ul>";
            var responseJSON = JSON.parse(Http.response); 
            console.log(responseJSON);
            Object.entries(responseJSON.api.players[0]).forEach(([key, value]) => {
                if(value instanceof Object) {
                    Object.entries(value).forEach(([key2, value2]) => {
                            ULelement += "<li>  " + key + "-" + key2 + ": " + value2 + "</li>";
                    });
                }
                else {
                    ULelement += "<li>" + key + ": " + value + "</li>";
                }
            });
            ULelement += "</ul>";
            document.getElementById(id).innerHTML += ULelement;
        } else {

        }
    }
}