function searchForPlayer(id) {
    var player = document.getElementById(id).value;
    const Http = new XMLHttpRequest();
    const url="http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='" + player + "%25'";
    Http.open("GET", url);
    Http.send();

    const correspondingOutputId = id === "player1Name" ? "Player1Results" : "Player2Results"
    
    document.getElementById(correspondingOutputId).innerHTML = "Results for " + player + "<br />Error: " + Http.status;

    Http.onload = (e) => {
        console.log("Response Code: " + Http.status);
        if (Http.status === 200) {
            var allPlayers = JSON.parse(Http.response);
            console.log(allPlayers);
            if (allPlayers.search_player_all.queryResults.totalSize > 1) {
                var mostLikelyPlayerID = allPlayers.search_player_all.queryResults.row[0].player_id; 
                showSpecificPlayer("http://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='2018'&player_id='" + mostLikelyPlayerID + "'", correspondingOutputId);
            } else if (allPlayers.search_player_all.queryResults.totalSize == 1){
                var mostLikelyPlayerID = allPlayers.search_player_all.queryResults.row.player_id; 
                showSpecificPlayer("http://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='2018'&player_id='" + mostLikelyPlayerID + "'", correspondingOutputId);   
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
            console.log(responseJSON);
            Object.entries(responseJSON.sport_hitting_tm.queryResults.row).forEach(([key, value]) => {
                ULelement += "<li>" + key + ": " + value + "</li>";
            });
            ULelement += "</ul>";
            document.getElementById(id).innerHTML += ULelement;
        } else {

        }
    }
}