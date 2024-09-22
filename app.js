const chargeSFX = new Audio("./sfx/charge.mp3");
const errorSFX = new Audio("./sfx/error.wav");
const hitSFX = new Audio("./sfx/hit.wav");
const outSFX = new Audio("./sfx/out.wav");
const pitchSFX = new Audio("./sfx/pitch.wav");
const runSFX = new Audio("./sfx/run.mp3");
const strikeSFX = new Audio("./sfx/strike.wav");

let teamNamesChosen = false;
const teamNamesSaveButton = document.getElementById("team-names-save");
const teamNameInputsDiv = document.getElementById("team-name-inputs");
const swingOptionsDiv = document.getElementById("swing-options");
const singleButton = document.getElementById("single");
const doubleButton = document.getElementById("double");
const tripleButton = document.getElementById("triple");
const homerunButton = document.getElementById("homerun");
const questionsDiv = document.getElementById("questions-and-answers");
const answerButton = document.getElementById("answer-button");

let atBat = 0;
var atBatTeam1 = 0;
var atBatTeam2 = 0;
let base1Occupied = false;
let base2Occupied = false;
let base3Occupied = false;
let baseChange;
var team1Hits = 0;
var team2Hits = 0;
let inning = 0;
let maxTurns = 5;
let outs = 0;
var team1RunsForCurrentInning = 0;
var team1RunsTotal = 0;
var team2RunsForCurrentInning = 0;
var team2RunsTotal = 0;
let turn = 0;
let strikes = 0;
var whichTeamAtBat = 1;

let csvRow;
let csvCol;
let csvDataArray = [];
const csvData = `
question,correct,incorrect1,incorrect2,incorrect3
"SINGLE Questions","Correct Answers","Incorrect Answer 1","Incorrect Answer 2","Incorrect Answer 3"
"Genealogy is the study of what?","Family relationships","Rocks","Reproductive health","Genies"
"Which of these is NOT a popular genealogy website?","RootsBase","FamilySearch","MyHeritage","Ancestry"
"Which of these is NOT a popular DNA testing service?","SalivaSling","AncestryDNA","23andMe","FamilyTreeDNA"
"City and county directories primarily tell you what about a historical person?","Their address","Their age","Their gender","Their parents' names"
"Assuming no endogamy, every person has how many biological great grandparents?","8","2","4","16"
"The enumeration of all a country's inhabitants is called the:","Census","Directory","Big Count","Vital Record"
"Which of the following is NOT an example of a vital record?","Immigration Record","Death Record","Birth Record","Marriage Record"
"What is a newspaper article about a deceased person's life and/or funeral arrangements called?","Obituary","Eulogy","Death Blurb","Farm Purchase Notice"
"Which of these is NOT a primary source in genealogy?","Family tree posted online","Birth certificate","Naturalization document","Warranty deed"
"Which of these would be a direct ancestor?","Great grandmother","Great uncle","First cousin","Daughter"
"Who would be most likely to leave behind a last will and testament?","A father","A wife with surviving husband","An adoptee","A person who died intestate"
"Which of these is not a type of organization known for studying genealogy or history?","Literary society","Historical society","Lineage society","Genealogical society"
"Which of these are NOT useful for helping someone organize their genealogical information?","A daguerreotype","A timeline","A family group sheet","A family tree chart"
"Which is NOT a common type of Christian church record that is useful for genealogy?","Bris record","Baptism record","Confirmation record","Marriage record"
"DOUBLE Questions","Correct Answers","Incorrect Answer 1","Incorrect Answer 2","Incorrect Answer 3"
"Which of these pieces of information are birth records most likely to list?","Parents' names","Attending physician","Godparents' names","Hour of birth"
"Which of these German names do NOT typically anglicize to 'John'?","Jurgen","Johann","Hans","Johannes"
"What does it mean to die intestate?","To die without a written will","To die outside of one's state of residence","To die with at least one heir","To die suddenly"
"When a deceased person's estate was probated, a notice was often posted in the:","Newspaper","Church bulletin","Family Bible","County Recorder's office"
"Which of these is NOT an immigration-related record?","Quit claim","Declaration of intention","Naturalization certificate","Passenger manifest"
"What does 'probate' mean?","To legally prove a last will","A refund of court costs for naturalization","To verify one's eligibility to join a lineage society","A confirmation of interment in a cemetery"
"What is the call number for books containing histories of individual families?","929.2","977.8","369.5","922.9"
"Which of the following databases do NOT contain public info on living individuals?","FamilyTreeDNA","Ancestry","FamilySearch","Intelius"
"TRIPLE Questions","Correct Answers","Incorrect Answer 1","Incorrect Answer 2","Incorrect Answer 3"
"What is the name of the website that specializes in German Protestant church records?","Archion","Matricula","Die Maus","MeyersGaz.org"
"What is the name of the website that specializes in German Catholic church records?","Matricula","MeyersGaz.org","Archion","Die Maus"
"After how many years do organizations like churches celebrate a Golden Jubilee?","50","25","100","10"
"After how many years do organizations like churches celebrate a Silver Jubilee?","25","100","50","10"
"The German name 'Ludwig' typically anglicized to which name?","Louis","Luke","Larry","Levi"
"HOME RUN Questions","Correct Answers","Incorrect Answer 1","Incorrect Answer 2","Incorrect Answer 3"
"Which of these is NOT a Jewish genealogical source?","Chametz","Ketubah","Get","Hesped"
"What is the Arabic term for a genealogy or family history?","Ilm Al Ansab","Rukhsat Alzawaj","Shakwaa","Tasrih Aldafn"
"What does SNP stand for in genetic genealogy?","Single nucleotide polymorphism","Substituted nucleic profile","Standard nuclear pairing","Standard nucleotide polysaccharide"
"In genetic genealogy, what is the mutation marker that DNA tests look for?","SNP","STP","SNO","SPN"
`;
Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
        csvDataArray = results.data;
        console.log('Parsed CSV Data:', results.data);
    },
    error: function(error) {
        console.error('Error parsing CSV:', error);
    }
});
// Link the Questions and Answers CSV data to this app

function getValueByIndex(data, rowIndex, columnIndex) {
    if (rowIndex < data.length && columnIndex < Object.keys(data[0]).length) { // Check if the rowIndex and columnIndex are within bounds
        const row = data[rowIndex];
        const columnName = Object.keys(row)[columnIndex]; // Get the column name from the index
        return row[columnName]; // Return the value at the specified row and column
    }
    return null; // Return null if indices are out of bounds
}
// function to get a certain question-and-answer set (i.e., a certain row) from the CSV data

swingOptionsDiv.style.display = "none";
questionsDiv.style.display = "none";
// hide the Swing Options and Questions divs by default (i.e., when first loading up the app)

const questionsDivDisappear = () => {
    questionsDiv.style.display = "none";
}
// function to make the Questions div disappear
const questionsDivAppear = () => {
    pitchSFX.play();
    questionsDiv.style.display = "block"
}
// function to make the Questions div appear

const swingOptionsDisappear = () => {
    swingOptionsDiv.style.display = "none";
}
// function to make the Swing Options div disappear
const swingOptionsAppear = () => {
    swingOptionsDiv.style.display = "block";
}
// function to make the Swing Options div appear

const teamNameInputsDisappear = () => {
    teamNameInputsDiv.style.display = "none";
}
// function to make the Team Name Inputs div disappear
const teamNameInputsAppear = () => {
    teamNameInputsDiv.style.display = "block";
}
// function to make the Team Name Inputs div appear

const updateAtBatCount = () => {
    window[`atBatTeam${whichTeamAtBat}`]++; // increase the at-bat count of the current team by 1
    document.getElementById("at-bat-counter").innerHTML = window[`atBatTeam${whichTeamAtBat}`]; // apply the value of the current team's at-bat count to the appropriate div in the DOM
}

teamNamesSaveButton.addEventListener("click", () => {
    const team1Name = document.getElementById("team1-name-input").value;
    const team2Name = document.getElementById("team2-name-input").value;
    if ( team1Name && team2Name ) {
        document.getElementById("team1-name").innerHTML = team1Name.toUpperCase();
        document.getElementById("team2-name").innerHTML = team2Name.toUpperCase();
        teamNameInputsDisappear();
        teamNamesChosen = true;
        playBall();
    } else {
        alert("You must enter a name for both teams!");
    }
    
});
// save the team names after they have been typed in and the "Save" button has been clicked

const playBall = () => {
    console.log("Play ball!");
    document.getElementById("turns-max").innerHTML = maxTurns; // apply the value of maxTurns to the appropriate div in the DOM
    updateHalfInning();
    swingOptionsAppear();
}
// Make the swing options appear, and start a new half-inning to kick off the game

const updateHalfInning = () => {
    if ( inning < 10 ) {
        baseChange = 5;
        updateBasesOccupied();
        if ( whichTeamAtBat === 1 ) {
            inning++; // if Team 1 was most recently at bat when a new half-inning starts, then increase the inning number by 1
            whichTeamAtBat = 2; // if Team 1 was most recently at bat when a new half-inning starts, then Team 2 goes up to bat
        } else {
            whichTeamAtBat = 1; // if Team 2 was most recently at bat when a new half-inning starts, then Team 1 goes up to bat
        }
        window[`team${whichTeamAtBat}RunsForCurrentInning`] = 0; // set current team's runs for current inning to 0
        document.getElementById(`team${whichTeamAtBat}-inning${inning}`).innerHTML = 0; // apply the current team's runs for the current inning to the appropriate div in the DOM
        turn = 0; // take the turn count down to 0 and then...
        if ( inning === 1 && whichTeamAtBat === 2 ) {
            console.log("Yes, the inning is 1 and whichTeamAtBat is 2");
            updateTurn();
        } else {
            updateTurn("skip updateAtBatCount"); // call updateTurn to increase the turn count to 1 for the new team taking the field...
        }
        outs = 0; // start each half-inning with 0 outs
        document.getElementById("outs-counter").innerHTML = outs; // apply the value of outs to the appropriate div in the DOM
        document.getElementById("at-bat-counter").innerHTML = window[`atBatTeam${whichTeamAtBat}`]; // apply the value of the current team's at-bats to the appropriate div in the DOM
        document.getElementById(`team${whichTeamAtBat}-runs`).innerHTML = window[`team${whichTeamAtBat}RunsTotal`]; // apply the value of the current team's total runs to the appropriate div in the DOM
        document.getElementById(`team${whichTeamAtBat}-hits`).innerHTML = window[`team${whichTeamAtBat}Hits`]; // apply the value of the current team's total hits to the appropriate value in the DOM
        swingOptionsAppear(); // make the 4 swing option buttons re-appear
    } else {
        alert("Good game!");
    }
}

singleButton.addEventListener("click", () => {
    takeASwing(single);
    baseChange = 1;
});
doubleButton.addEventListener("click", () => {
    takeASwing(double);
    baseChange = 2;
});
tripleButton.addEventListener("click", () => {
    takeASwing(triple)
    baseChange = 3;
});
homerunButton.addEventListener("click", () => {
    chargeSFX.play();
    takeASwing(homerun);
    baseChange = 4;
});
// event listeners for different types of hit attempts (single, double, triple, or home run)

const takeASwing = (power) => {
    swingOptionsDisappear();
    questionsDivAppear();
    if ( power === single ) {
        console.log("You swung for a single");

        pickARandomQuestion();
        answerOrderRandomizer();

    } else if ( power === double) {
        console.log("You swung for a double!");

        pickARandomQuestion();
        answerOrderRandomizer();

    } else if ( power === triple ) {
        console.log("You swung for a triple!");

        pickARandomQuestion();
        answerOrderRandomizer();

    } else if ( power === homerun ) {
        console.log("You swung for a home run!");

        pickARandomQuestion();
        answerOrderRandomizer();

    }
}
// based on the chosen hit power, ask a different category of question

const pickARandomQuestion = () => {
    csvRow = (Math.round(Math.random() * (csvDataArray.length - 1)));
    document.getElementById("question").textContent = getValueByIndex(csvDataArray, csvRow, 0);
}
// Count how many questions are in the CSV data, generate a random number within that range (1-to-max), get the question data (i.e., first column) from that row number in the CSV data

const answerOrderRandomizer = () => {
    let whichCol = Math.ceil(Math.random() * 4); // A random number between 1 and 4 is picked
    document.getElementById("answer-1-text").textContent = getValueByIndex(csvDataArray, csvRow, whichCol); // Which ever column (answer text) corresponds to that number goes into the answer-1-text <span>
    for ( let i = 2; i <= 4; i++ ) { // Start with the number 2, and iterate up through 4
        if ( whichCol === 1 ) { // If the answer in the 1st column (i.e., the 1st answer text) was chosen previously, then...
            whichCol = 4; // Get the answer in the 4th column...
            document.getElementById(`answer-${i}-text`).textContent = getValueByIndex(csvDataArray, csvRow, whichCol); // And put the 4th answer text into the current i value's <span>
        } else { // If the answer in the 1st column (i.e., the 1st answer text) was NOT chosen previously, then...
            whichCol -= 1; // Get the answer in the "previous-number-minus-one"th column...
            document.getElementById(`answer-${i}-text`).textContent = getValueByIndex(csvDataArray, csvRow, whichCol); // And put the answer text from that number's column into the current i value's <span>
        }
    }
}
// The above function puts the correct answer (i.e., the answer in the row's 1st column) into a random <span>, and then the 2nd column's answer goes into the next <span>, 
// and then the 3rd column's answer goes into the next <span>, and then the 4th column's answer goes into the next <span>.

answerButton.addEventListener("click", () => {
    correctOrIncorrect();
});
// Listen for the user to click the "Submit Answer" button, and--if they do--call the correctOrIncorrect() function

const correctOrIncorrect = () => {
    const selectedRadio = document.querySelector('input[name="answer-options"]:checked');
    if (!selectedRadio) {
        alert("Please select an answer."); // if no radio button is selected, alert the user to select a radio button
    } else if (selectedRadio.nextElementSibling.textContent === getValueByIndex(csvDataArray, csvRow, 1)) {
        console.log("You chose correctly!");
        hitSFX.play();
        updateBasesOccupied(); // make sure that the appropriate bases get occupied or vacated depending on which bases were currently occupied + the power of the hit
        updateHitsCount(); // if the text content next to the selected radio button matches the text content of column 1 in the current csvDataArray row, then call the updateHitsCount function
    } else if (selectedRadio && selectedRadio.nextElementSibling.textContent !== getValueByIndex(csvDataArray, csvRow, 1)) {
        console.log("You chose the wrong answer");
        strikeSFX.play();
        updateStrikesCount(); // if the text content next to the selected radio button does not match the text content of column 1 in the current csvDataArray, then call the updateStrikesCount function
    }
    selectedRadio.checked = false; // deselect all radio buttons
}
// Check which radio button the user had selected when they pressed "Submit Answer," and if the text content of that radio button's nextElementSibling equals
// the correct answer (in Column 1 of that row of the csvDataArray), let the user know they got the answer correct; or if it doesn't match then let the user
// know they got the answer wrong; or if there is no radio button selected when the user clicks "Submit Answer," let them know they need to make a selection

const updateHitsCount = () => {
    questionsDivDisappear(); // make the question text and answer buttons disappear
    window[`team${whichTeamAtBat}Hits`]++; // increments the current team's total hits by 1
    document.getElementById(`team${whichTeamAtBat}-hits`).innerHTML = window[`team${whichTeamAtBat}Hits`]; // displays the current team's updated total hits in the appropriate div in the DOM
    updateTurn(); // progress to the next turn
    swingOptionsAppear(); // make the 4 swing option buttons re-appear
}

const updateRuns = () => {
    runSFX.play();
    window[`team${whichTeamAtBat}RunsTotal`]++; // increase the current team's total runs by 1
    document.getElementById(`team${whichTeamAtBat}-runs`).innerHTML = window[`team${whichTeamAtBat}RunsTotal`]; // display the value of the current team's total runs in the appropriate div in the DOM
    window[`team${whichTeamAtBat}RunsForCurrentInning`]++; // increase the current team's runs for the current inning by 1
    document.getElementById(`team${whichTeamAtBat}-inning${inning}`).innerHTML = window[`team${whichTeamAtBat}RunsForCurrentInning`]; // display teh value of the current team's runs for the current inning in the appropraite div in the DOM
}

const updateStrikesCount = () => {
    questionsDivDisappear(); // make the question text and answer buttons disappear
    if ( strikes < 2 ) {
        strikes++; // increase the number of strikes by 1
        document.getElementById("strikes-counter").innerHTML = strikes; // display the current number of strikes in the appropriate div in the DOM
        swingOptionsAppear(); // make the 4 swing option buttons re-appear
    } else {
        updateOutsCount(); // if player is getting a 3rd strike, call function to increase outs by 1
    }
}

const updateOutsCount = () => {
    outSFX.play();
    if ( outs < 2 ) {
        outs++; // increase the number of outs by 1
        document.getElementById("outs-counter").innerHTML = outs; // display the current number of outs in the appropriate div in the DOM
        updateTurn();
        swingOptionsAppear(); // make the 4 swing option buttons re-appear
    } else {
        updateHalfInning(); // if the player gets a 3rd out, then update to the next half-inning
    }
}

const updateTurn = (skipUpdateAtBatCountOrNot) => {
    strikes = 0; // start each new turn with 0 strikes
    document.getElementById("strikes-counter").innerHTML = strikes; // apply the value of strikes to the appropriate div in the DOM
    if ( skipUpdateAtBatCountOrNot !== "skip updateAtBatCount" ) {
        updateAtBatCount();
    }
    if ( turn < maxTurns ) {
        turn++; // increase the number of the current team's turns by 1
        document.getElementById("turns-counter").innerHTML = turn; // display the current team's turn number in the appropriate div in the DOM
    } else {
        updateHalfInning(); // if the number of turns is equal to the maximum number of allowable turns for a half-inning, then update to the next half-inning
    }
}

const updateBasesOccupied = () => {
    if ( baseChange === 1 ) { // if the player hits a single...
        if ( base3Occupied === true ) { // and if there is a runner on 3rd base...
            updateRuns(); // give the at-bat team an extra point...
            base3Occupied = false; // because the 3rd-base runner has been pushed to home...
        }
        if ( base2Occupied === true ) { // and if there is a runner on 2nd base...
            base3Occupied = true;
            base2Occupied = false; // push the 2nd-base runner to 3rd base...
        }
        if ( base1Occupied === true ) { // and if there is a runner on 1st base...
            base2Occupied = true; // push the 1st-base runner to 2nd base...
        }
        base1Occupied = true; // and put the new runner on 1st base...
    } else if ( baseChange === 2 ) { // if the player hits a double...
        if ( base3Occupied === true ) { // and if there is a runner on 3rd base...
            updateRuns(); // give the at-bat team an extra point...
            base3Occupied = false; // because the 3rd-base runner has been pushed to home...
        }
        if ( base2Occupied === true ) { // and if there is a runner on 2nd base...
            updateRuns(); // give the at-bat team an extra point...
            base2Occupied = false; // because the 2nd-base runner has been pushed to home...
        }
        if ( base1Occupied === true ) { // and if there is a runner on 1st base...
            base3Occupied = true;
            base1Occupied = false; // push the 1st-base runner to 3rd base...
        }
        base2Occupied = true; // and put the new runner on 2nd base...
    } else if ( baseChange === 3 ) { // if the player hits a triple...
        if ( base3Occupied === true ) { // and if there is a runner on 3rd base...
            updateRuns(); // give the at-bat team an extra point...
            base3Occupied = false; // because the 3rd-base runner has been pushed to home
        }
        if ( base2Occupied === true ) { // and if there is a runner on 2nd base...
            updateRuns(); // give the at-bat team an extra point...
            base2Occupied = false; // because the 2nd-base runner has been pushed to home...
        }
        if ( base1Occupied === true ) { // and if there is a runner on 1st base...
            updateRuns(); // give the at-bat team an extra point...
            base1Occupied = false; // because the 1st-base runner has been pushed to home...
        }
        base3Occupied = true; // and put the new runner on 3rd base...
    } else if ( baseChange === 4 ) { // if the player hits a home run...
        if ( base3Occupied === true ) { // and if there is a runner on 3rd base...
            updateRuns(); // give the at-bat team an extra point...
            base3Occupied = false; // because the 3rd-base runner has been pushed to home...
        }
        if ( base2Occupied === true ) { // and if there is a runner on 2nd base...
            updateRuns(); // give the at-bat team an extra point...
            base2Occupied = false; // because the 2nd-base runner has been pushed to home...
        }
        if ( base1Occupied === true ) { // and if there is a runner on 1st base...
            updateRuns(); // give the at-bat team an extra point...
            base1Occupied = false; // because the 1st-base runner has been pushed to home...
        }
        updateRuns(); // and give the at-bat team an extra point, because the new runner made it across home plate...
    } else if ( baseChange === 5 ) { // if the bases need to be vacated...
        base1Occupied = false; // any runner on 1st base leaves the field without scoring a run
        base2Occupied = false; // any runner on 2nd base leaves the field without scoring a run
        base3Occupied = false; // any runner on 3rd base leaves the field without scoring a run
    }
    console.log("First Base Occupied?: " + base1Occupied + ". Second Base Occupied?: " + base2Occupied + ". Third Base Occupied?: " + base3Occupied);
}