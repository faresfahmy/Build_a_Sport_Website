
//`https://apiv3.apifootball.com/?action=get_teams&team_id=${query}&APIkey=4e788224f37e81ee00f4d6c34cd30e36bb761e33c2e489d777e91575c6abcb42`

// Selectors Elements
let btnSearch = document.querySelector("header nav .search button");
let boxSearch = document.querySelector("header nav .search input");
let mainElementInformationTeam = document.querySelector("main");
let divElementPlayers = document.querySelector(".players");
let titleHeading = document.querySelector(".players .title-heading");
let containerPlayersBox = document.querySelector(".players .container");

//Click on Button Search
btnSearch.addEventListener("click",(e)=>{
    e.preventDefault();
    titleHeading.textContent = ""; 
    if(Number.isInteger(Number.parseInt(boxSearch.value))){
        boxSearch.style.border= "#00b618 solid 1px";
        checkInternetConnection().then(online=>{
            if(online){
                fetchDataTeams(boxSearch.value);//Function Fetch Data
                mainElementInformationTeam.innerHTML =`<h3 class="heading-Searching">Searching ...</h3>`;
                 mainElementInformationTeam.style.color = "#00b618";
            }
            else{
                mainElementInformationTeam.innerHTML =`<h3 class="heading-Searching">Check your internet connection</h3>`;  
                mainElementInformationTeam.style.color = "#b60018";
            }

        });
       }
    else{
        boxSearch.value = "";
        mainElementInformationTeam.innerHTML = ``;
        boxSearch.style.border= "#b60018 solid 1px"
    }
     containerPlayersBox.innerHTML = ``;
})


// Function check Internet Connection
async function checkInternetConnection() {
    try {
        await fetch("https://www.google.com", { mode: "no-cors" });
        return true;               
    }catch (error){
        return false;
    }
}
//Function Fetch Data
let fetchDataTeams = async (query)=>{
    let dataFetch = await fetch(`https://apiv3.apifootball.com/?action=get_teams&team_id=${query}&APIkey=4e788224f37e81ee00f4d6c34cd30e36bb761e33c2e489d777e91575c6abcb42`);
    let dataJson = await dataFetch.json();
    console.log(dataJson);
    createTeam(dataJson);
}

//Function Create Components Team And Players
let createTeam = (team)=>{
    // Elements Team
    team.forEach(t => {
        mainElementInformationTeam.innerHTML = `
        <h2 class="title-heading">Team</h2>
        <div class="container">
            <div class="details-team">
              <div class="image">
                  <img src=${t.team_badge} alt=${t.team_name}>
              </div>
              <div class="info-team">
                <div class="info">
                    <p>Team Key : <span>${t.team_key}</span></p>
                    <p>Team Name : <span>${t.team_name==""?"...":t.team_name}</span></p>
                    <p>Team Country : <span>${t.team_country==""?"...":t.team_country}</span></p>
                    <p>Team Founded : <span>${t.team_founded==""?"...":t.team_founded}</span></p>
                    <p>Estadio Name : <span>${t.venue.venue_name==""?"...":t.venue.venue_name}</span></p>
                    <p>Estadio Address : <span>${t.venue.venue_address==""?"...":t.venue.venue_address}</span></p>
                    <p>city : <span>${t.venue.venue_city==""?"...":t.venue.venue_city}</span></p>
                    <p>Coach Name : <span>${t.coaches.coach_name==""?"...":t.coaches[0].coach_name}</span></p>
                 </div>
              </div>
            </div>
        </div>
        `;
        titleHeading.textContent = "Players";
        // Elements Players
        t.players.forEach(p=>{
              let divBox = document.createElement("div");
              divBox.classList.add("box");
              divBox.innerHTML = `
               <img src=${p.player_image==''?'149211_d-coppola.jpg':p.player_image} onerror="this.onerror=null; this.src='149211_d-coppola.jpg';">
                  <div class="info-player">
                      <h1 class="name-player">${p.player_name}</h1>
                      <div class="info-add">
                          <p>Player Age : <span>${p.player_age==""?"...":p.player_age}</span></p>
                          <p>Player Birthdate : <span>${p.player_birthdate==""?"...":p.player_birthdate}</span></p>
                          <p>Player Assists : <span>${p.player_assists==""?"0":p.player_assists}</span></p>
                          <p>Player Number : <span>${p.player_number==""?"...":p.player_number}</span></p>
                          <p>Player Type : <span>${p.player_type==""?"...":p.player_type}</span></p>
                          <p>Player Goals : <span>${p.player_goals==""?"...":p.player_goals}</span></p>
                      </div>
                  </div>`;
              containerPlayersBox.append(divBox);
        })
    });
}
