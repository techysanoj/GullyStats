// all variables
let team1Name = '';
let team2Name = '';
let overs = 0;
let overCount = 0;
let bowlCount = 0;
let team1Runs = 0;
let team1Wkt = 0;
let team2Wkt = 0;
let team2Runs = 0;
let countTurn = 0;
let team1Added = false;
let team2Added = false;
let overAdded = false;
let matchOver = false;

// all elements

// team - 1
let team1NameInput = document.getElementById('input-team-1-name');
let team1NameBtn = document.getElementById('add-team-1-btn');
// team - 2
let team2NameInput = document.getElementById('input-team-2-name');
let team2NameBtn = document.getElementById('add-team-2-btn');
let team1Detail = document.querySelector('#input-team-1');
let team2Detail = document.querySelector('#input-team-2');

let team1NameScorecard = document.getElementById('team-1-score-name');
let team2NameScorecard = document.getElementById('team-2-score-name');


team1NameBtn.addEventListener('click', addTeam1Name);
team2NameBtn.addEventListener('click', addTeam2Name);

// function to add team names
function addTeam1Name() {
    team1Name = team1NameInput.value;
    team1Added = true;
    if(team1Name) {
        team1Detail.innerHTML = `<h1>${team1Name}</h1>`;
        team1Detail.classList.add('team-head');
        team1NameScorecard.textContent = `${team1Name}`;
        
    }
}

function addTeam2Name() {
    team2Name = team2NameInput.value;
    team2Added = true;
    if(team2Name) {
        team2Detail.innerHTML = `<h1>${team2Name}</h1>`;
        team2Detail.classList.add('team-head');
        team2NameScorecard.textContent = `${team2Name}`;
        
    }
}


// adding over details
let overInput = document.querySelector('#enter-no-over');
let overBtn = document.getElementById('add-over-btn');
let showOver = document.querySelector('#input-overs');
overBtn.addEventListener('click', addOvers);

// function to add Overs
function addOvers() {
    overs = overInput.value;
    showOver.innerHTML = `<h1 style = "font-size: 2rem; margin-bottom: -20px; margin-top: -20px">Total Overs: ${overs}</h1>`;
    overAdded = true;
    teamPlaying();
}

// innings ended functionality
let changeInningEnd = document.querySelector('#changing-team');

let changeInningEndName = document.querySelector('#team-innings-ended');



let turn = false; // means team - 1 turn
// adding all over functionality
let wktBtn = document.querySelector('#wicket');
let nbBtn = document.querySelector('#no-ball');
let wdBtn = document.querySelector('#wide-ball');
let zeroBtn = document.querySelector('#zero-run');
let singleBtn = document.querySelector('#single-run');
let doubleBtn = document.querySelector('#double-run');
let tripleBtn = document.querySelector('#triple-run');
let boundaryBtn = document.querySelector('#boundary');
let sixBtn = document.querySelector('#six-run');

// getting score of both teams details
let team1Score = document.getElementById('team-1-score-run');
let team2Score = document.getElementById('team-2-score-run');

let teamPlayingCheck = document.getElementById('team-playing');

// let overDetailOuterDiv = document.getElementById('over-details-outer');
// let teamWithOverDetails = document.getElementById('teams-with-overs');
// let matchResultOuterDiv = document.getElementById('match-result-outer-div');
function teamPlaying() {
    if(team1Added && team2Added && overAdded) {
        // teamWithOverDetails.classList.add('hidden');
        // overDetailOuterDiv.classList.remove('hidden');
        // matchResultOuterDiv.classList.remove('hidden');
        console.log(team1Added + team2Added + overAdded + turn);
        if(turn == false) {
            teamPlayingCheck.textContent = team1Name;
        }
        else {
            teamPlayingCheck.textContent = team2Name;
        }
    }
}


let scoreCard = document.querySelector('#score-details')

function showScoreCard() {
    if(matchOver || countTurn > 1) {
        alert('Match Over :(');
        return;
    }
    else if(turn == false) {
        scoreCard.textContent = `${team1Runs} / ${team1Wkt}`;
        team1Score.textContent = `${team1Runs}`;
    }
    else {
        scoreCard.textContent = `${team2Runs} / ${team2Wkt}`;
        team2Score.textContent = `${team2Runs}`;
    }
    
}

// function changes innings
function inningsChanged() {
    // if(matchOver || countTurn > 1) {
    //     // alert('Match Over :(');
    //     return;
    // }
    if(turn == false) {
        changeInningEndName.innerHTML = `
                                            ${team1Name} Innings Ended
                                            <div id="cross-div">X</div>`;
    }
    else {
        changeInningEndName.innerHTML = `
                                            ${team2Name} Innings Ended
                                            <div id="cross-div">X</div>`;
    }
    
    changeInningEnd.classList.remove('hidden');
    let changeInningEndBtn = document.querySelector('#cross-div');
    changeInningEndBtn.addEventListener('click', function() {
        changeInningEnd.classList.add('hidden');
    });
    turn = !turn;
    countTurn++;
    bowlCount = 0;
    overCount = 0;
    scoreCard.innerHTML = `<div id="score-details" style = "font-size: 2rem;
                                margin-bottom: 20px;">0/0</div>`;
}


// making over functions
// no ball
function incRunsByOne() {
    if(team1Added == false || team2Added == false || overAdded == false) {
        // console.log(team1Added + " : " + team2Added + " : " + overAdded);
        alert('Please add all required input details : Happy Playing');
    }
    else if(turn) {
        if(matchOver || countTurn > 1) {
            alert('Match Over :(');
            return;
        }
        team2Runs++;
        showScoreCard();
    }
    else {
        team1Runs++;
        showScoreCard();
    }
}

// wicket
function incWkt() {
    if(team1Added == false || team2Added == false || overAdded == false) {
        alert('Please add all required input details : Happy Playing');
    }
    else if(turn) {
        if(matchOver || countTurn > 1) {
            alert('Match Over :(');
            return;
        }
        bowlCount++;
        if(team2Wkt < 10) {
            team2Wkt++;
            showScoreCard();
            if(team2Wkt == 10) {
                if(countTurn >= 1) {
                    matchOver = true;
                    showScoreCard();
                    return;
                }
                else {
                    if(countTurn >= 1) {
                        matchOver = true;
                        showScoreCard();
                        return;
                    }
                    inningsChanged();
                }
            }
            else if(bowlCount == 6) {
                overCount++;
                bowlCount = 0;
                if(overCount >= overs) {
                    if(countTurn >= 1) {
                        matchOver = true;
                        showScoreCard();
                        return;
                    }
                    inningsChanged();
                }
            }
            
        }
    }
    else {
        bowlCount++;
        
        if(team1Wkt < 10) {
            team1Wkt++;
            showScoreCard();
            if(team1Wkt == 10) {
                if(countTurn >= 1) {
                    matchOver = true;
                    showScoreCard();
                    return;
                }
                else {
                    if(countTurn >= 1) {
                        matchOver = true;
                        showScoreCard();
                        return;
                    }
                    inningsChanged();
                }
            }
            else if(bowlCount == 6) {
                overCount++;
                bowlCount = 0;
                showScoreCard();
                if(overCount >= overs) {
                    if(countTurn >= 1) {
                        matchOver = true;
                        showScoreCard();
                        return;
                    }
                    inningsChanged();
                }
            }
        }   
    }
    // showScoreCard();
}

// zero run
function zeroRunsByOne() {
    if(team1Added == false || team2Added == false || overAdded == false) {
        alert('Please add all required input details : Happy Playing');
    }
    else if(turn) {
        if(matchOver || countTurn > 1) {
            alert('Match Over :(');
            return;
        }
        // team2Runs++;
        team2Score.textContent = `${team2Runs}`;
        bowlCount++;
        showScoreCard();
        if(bowlCount == 6) {
            overCount++;
            bowlCount = 0;
            if(overCount >= overs) {
                if(countTurn >= 1) {
                    matchOver = true;
                    showScoreCard();
                    return;
                }
                inningsChanged();
            }
        }
    }
    else {
        // team1Runs++;
        team1Score.textContent = `${team1Runs}`;
        bowlCount++;
        showScoreCard();
        if(bowlCount == 6) {
            overCount++;
            bowlCount = 0;
            if(overCount >= overs) {
                if(countTurn >= 1) {
                    matchOver = true;
                    showScoreCard();
                    return;
                }
                inningsChanged();
            }
        }
    }
}

// single run
function incRunsByOneBall() {
    if(team1Added == false || team2Added == false || overAdded == false) {
        alert('Please add all required input details : Happy Playing');
    }
    else if(turn) {
        if(matchOver || countTurn > 1) {
            alert('Match Over :(');
            return;
        }
        team2Runs++;
        team2Score.textContent = `${team2Runs}`;
        bowlCount++;
        showScoreCard();
        if(bowlCount == 6) {
            overCount++;
            bowlCount = 0;
            if(overCount >= overs) {
                if(countTurn >= 1) {
                    matchOver = true;
                    showScoreCard();
                    return;
                }
                inningsChanged();
            }
        }
    }
    else {
        team1Runs++;
        team1Score.textContent = `${team1Runs}`;
        bowlCount++;
        showScoreCard();
        if(bowlCount == 6) {
            overCount++;
            bowlCount = 0;
            if(overCount >= overs) {
                if(countTurn >= 1) {
                    matchOver = true;
                    showScoreCard();
                    return;
                }
                inningsChanged();
            }
        }
    }
}

function incRunsByTwoBall() {
    if(team1Added == false || team2Added == false || overAdded == false) {
        alert('Please add all required input details : Happy Playing');
    }
    else if(turn) {
        if(matchOver || countTurn > 1) {
            alert('Match Over :(');
            return;
        }
        team2Runs+=2;
        team2Score.textContent = `${team2Runs}`;
        bowlCount++;
        showScoreCard();
        if(bowlCount == 6) {
            overCount++;
            bowlCount = 0;
            if(overCount >= overs) {
                if(countTurn >= 1) {
                    matchOver = true;
                    showScoreCard();
                    return;
                }
                inningsChanged();
            }
        }
    }
    else {
        team1Runs+=2;
        team1Score.textContent = `${team1Runs}`;
        bowlCount++;
        showScoreCard();
        if(bowlCount == 6) {
            overCount++;
            bowlCount = 0;
            if(overCount >= overs) {
                if(countTurn >= 1) {
                    matchOver = true;
                    showScoreCard();
                    return;
                }
                inningsChanged();
            }
        }
    }
    
}

function incRunsByThreeBall() {
    if(team1Added == false || team2Added == false || overAdded == false) {
        alert('Please add all required input details : Happy Playing');
    }
    else if(turn) {
        if(matchOver || countTurn > 1) {
            alert('Match Over :(');
            return;
        }
        team2Runs+=3;
        team2Score.textContent = `${team2Runs}`;
        bowlCount++;
        showScoreCard();
        if(bowlCount == 6) {
            overCount++;
            bowlCount = 0;
            if(overCount >= overs) {
                if(countTurn >= 1) {
                    matchOver = true;
                    showScoreCard();
                    return;
                }
                inningsChanged();
            }
        }
    }
    else {
        team1Runs+=3;
        team1Score.textContent = `${team1Runs}`;
        bowlCount++;
        showScoreCard();
        if(bowlCount == 6) {
            overCount++;
            bowlCount = 0;
            if(overCount >= overs) {
                if(countTurn >= 1) {
                    matchOver = true;
                    showScoreCard();
                    return;
                }
                inningsChanged();
            }
        }
    }
    
}

function incRunsByFourBall() {
    if(team1Added == false || team2Added == false || overAdded == false) {
        alert('Please add all required input details : Happy Playing');
    }
    else if(turn) {
        if(matchOver || countTurn > 1) {
            alert('Match Over :(');
            return;
        }
        team2Runs+=4;
        team2Score.textContent = `${team2Runs}`;
        bowlCount++;
        showScoreCard();
        if(bowlCount == 6) {
            overCount++;
            bowlCount = 0;
            if(overCount >= overs) {
                if(countTurn >= 1) {
                    matchOver = true;
                    showScoreCard();
                    return;
                }
                inningsChanged();
            }
        }
    }
    else {
        team1Runs+=4;
        team1Score.textContent = `${team1Runs}`;
        bowlCount++;
        showScoreCard();
        if(bowlCount == 6) {
            overCount++;
            bowlCount = 0;
            if(overCount >= overs) {
                if(countTurn >= 1) {
                    matchOver = true;
                    showScoreCard();
                    return;
                }
                inningsChanged();
            }
        }
    }
    
}


function incRunsBySixBall() {
    if(team1Added == false || team2Added == false || overAdded == false) {
        alert('Please add all required input details : Happy Playing');
    }
    else if(turn) {
        if(matchOver || countTurn > 1) {
            alert('Match Over :(');
            return;
        }
        team2Runs+=6;
        team2Score.textContent = `${team2Runs}`;
        bowlCount++;
        showScoreCard();
        if(bowlCount == 6) {
            overCount++;
            bowlCount = 0;
            if(overCount >= overs) {
                if(countTurn >= 1) {
                    matchOver = true;
                    showScoreCard();
                    return;
                }
                inningsChanged();
            }
        }
    }
    else {
        team1Runs+=6;
        team1Score.textContent = `${team1Runs}`;
        bowlCount++;
        showScoreCard();
        if(bowlCount == 6) {
            overCount++;
            bowlCount = 0;
            if(overCount >= overs) {
                if(countTurn >= 1) {
                    matchOver = true;
                    showScoreCard();
                    return;
                }
                inningsChanged();
            }
        }
    }
    
}

wktBtn.addEventListener('click', incWkt);
nbBtn.addEventListener('click', incRunsByOne);
wdBtn.addEventListener('click', incRunsByOne);
zeroBtn.addEventListener('click', zeroRunsByOne);
singleBtn.addEventListener('click', incRunsByOneBall);
doubleBtn.addEventListener('click', incRunsByTwoBall);
tripleBtn.addEventListener('click', incRunsByThreeBall);
boundaryBtn.addEventListener('click', incRunsByFourBall);
sixBtn.addEventListener('click', incRunsBySixBall);