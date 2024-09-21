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
let atBatTeam1 = 0;
let atBatTeam2 = 0;
let base1Occupied = false;
let base2Occupied = false;
let base3Occupied = false;
let team1Hits = 0;
let team2Hits = 0;
let inning = 1;
let outs = 0;
let team1RunsForCurrentInning = 0;
let team1RunsTotal = 0;
let team2RunsForCurrentInning = 0;
let team2RunsTotal = 0;
let turn = 0;
let strikes = 0;
let swingType;
let whichTeamAtBat = 2;

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

swingOptionsDiv.style.display = "none";
questionsDiv.style.display = "none";
// hide the Swing Options and Questions divs by default (i.e., when first loading up the app)

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

teamNamesSaveButton.addEventListener("click", () => {
    const team1Name = document.getElementById("team1-name-input").value;
    const team2Name = document.getElementById("team2-name-input").value;
    if ( team1Name && team2Name ) {
        document.getElementById("team1-name").innerHTML = team1Name.toUpperCase();
        document.getElementById("team2-name").innerHTML = team2Name.toUpperCase();
        teamNameInputsDisappear();
        playBall();
    } else {
        alert("You must enter a name for both teams!");
    }
    
});
// save the team names after they have been typed in and the "Save" button has been clicked

const playBall = () => {
    console.log("Play ball!");
    teamNamesChosen = true;
    updateAtBatCount();
    console.log("the updateAtBatCount in const playBall() just got called");
    updateTurn();
    setTotals();
    swingOptionsAppear();
}
// after team names have been chosen, make the Question Options div appear

const setTotals = () => {
    document.getElementById("team1-runs").innerHTML = team1RunsTotal;
    document.getElementById("team1-hits").innerHTML = team1Hits;
    document.getElementById("team2-runs").innerHTML = team2RunsTotal;
    document.getElementById("team2-hits").innerHTML = team2Hits;
    document.getElementById("strikes-counter").innerHTML = 0;
    document.getElementById("outs-counter").innerHTML = 0;
    console.log("setTotals function just got triggered, and I the app think that whichTeamAtBat is " + whichTeamAtBat + " and inning is " + inning);
    document.getElementById(`team${whichTeamAtBat}-inning${inning}`).innerHTML = 0;
    if ( whichTeamAtBat === 1 ) {
        document.getElementById("at-bat-counter").innerHTML = atBatTeam1;
    } else if ( whichTeamAtBat === 2 ) {
        document.getElementById("at-bat-counter").innerHTML = atBatTeam2;
    }
}
// set Strikes, Outs, and current inning's runs to zero at the beginning of each inning

singleButton.addEventListener("click", () => {
    takeASwing(single);
    swingType = "single";
});
doubleButton.addEventListener("click", () => {
    takeASwing(double);
    swingType = "double";
});
tripleButton.addEventListener("click", () => {
    takeASwing(triple)
    swingType = "triple";
});
homerunButton.addEventListener("click", () => {
    takeASwing(homerun);
    swingType = "homerun";
});
// event listeners for different types of hit attempts (single, double, triple, or home run)

const questionsDivDisappear = () => {
    questionsDiv.style.display = "none";
}
// function to make the Questions div disappear

const questionsDivAppear = () => {
    questionsDiv.style.display = "block"
}
// function to make the Questions div appear

function getValueByIndex(data, rowIndex, columnIndex) {
    if (rowIndex < data.length && columnIndex < Object.keys(data[0]).length) { // Check if the rowIndex and columnIndex are within bounds
        const row = data[rowIndex];
        const columnName = Object.keys(row)[columnIndex]; // Get the column name from the index
        return row[columnName]; // Return the value at the specified row and column
    }
    return null; // Return null if indices are out of bounds
}
// function to get a certain question-and-answer set (i.e., a certain row) from the CSV data

const updateAtBatCount = () => {
    console.log("updateAtBatCount called");
    if ( whichTeamAtBat === 1 ) {
        atBatTeam1++;
        document.getElementById("at-bat-counter").textContent = atBatTeam1;
    } else if ( whichTeamAtBat === 2) {
        atBatTeam2++;
        document.getElementById("at-bat-counter").textContent = atBatTeam2;
    }
}
// increase the At Bat counter by 1, based on variable atBatTeam1 or atBatTeam2 (depending on which team is up to bat)

const switchAtBatCount = () => {
    if ( whichTeamAtBat === 2 ) {
        document.getElementById("at-bat-counter").textContent = atBatTeam2;
    } else if ( whichTeamAtBat === 1 ) {
        document.getElementById("at-bat-counter").textContent = atBatTeam1;
    }
}

const takeASwing = (power) => {
    swingOptionsDisappear();
    questionsDivAppear();
    if ( atBatTeam1 === 0 && atBatTeam2 === 0) {
        updateAtBatCount();
        console.log("The updateAtBatCount in const takeASwing() just got called");
    } else if ( atBatTeam1 === 0 && whichTeamAtBat === 1 ) {
        updateAtBatCount();
        console.log("The updateAtBatCount in const takeASwing just got called");
    }
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
        alert("Please select an answer.");
    } else if (selectedRadio.nextElementSibling.textContent === getValueByIndex(csvDataArray, csvRow, 1)) {
        console.log("You chose correctly!");
        updateHitsCount();
    } else if (selectedRadio && selectedRadio.nextElementSibling.textContent !== getValueByIndex(csvDataArray, csvRow, 1)) {
        console.log("You chose the wrong answer");
        updateStrikesCount();
    }
    selectedRadio.checked = false;
}
// Check which radio button the user had selected when they pressed "Submit Answer," and if the text content of that radio button's nextElementSibling equals
// the correct answer (in Column 1 of that row of the csvDataArray), let the user know they got the answer correct; or if it doesn't match then let the user
// know they got the answer wrong; or if there is no radio button selected when the user clicks "Submit Answer," let them know they need to make a selection

const updateHitsCount = () => {
    questionsDivDisappear();
    swingOptionsAppear();
    if ( whichTeamAtBat === 1 ) {
        team1Hits += 1;
        document.getElementById("team1-hits").innerHTML = team1Hits;
    } else if ( whichTeamAtBat === 2 ) {
        team2Hits += 1;
        document.getElementById("team2-hits").innerHTML = team2Hits;
    }
    strikes = 0;
    document.getElementById("strikes-counter").innerHTML = strikes;
    updateAtBatCount();
    console.log("the updateAtBatCount in const updateHitsCount() just got called");
    updateBasesOccupied();
    updateTurn();
}
// If user gets an answer correct (i.e., gets a hit), increase the current team's hits for the current inning by 1

const updateTurn = () => {
    if ( turn < 5 ) {
        turn++;
        document.getElementById("turns-counter").innerHTML = turn;
    } else if (turn === 5) {
        turn = 1;
        document.getElementById("turns-counter").innerHTML = turn;
        outs = 4;
        updateOutsCount();
    } else if ( turn = 6 ) {
        console.log("Yep, cause of updateTurn this time was indeed a Team Switch Due To 3 Outs");
        turn = 1;
        document.getElementById("turns-counter").innerHTML = turn;
    }
}

const updateBasesOccupied = () => {
    if ( swingType === "single" ) {
        if ( base3Occupied === true ) {
            updateRuns();
            base3Occupied = false;
        }
        if ( base2Occupied === true ) {
            base3Occupied = true;
            base2Occupied = false;
        }
        if ( base1Occupied === true ) {
            base2Occupied = true;
        }
        base1Occupied = true;
    } else if ( swingType === "double" ) {
        if ( base3Occupied === true ) {
            updateRuns();
            base3Occupied = false;
        }
        if ( base2Occupied === true ) {
            updateRuns();
            base2Occupied = false;
        }
        if ( base1Occupied === true ) {
            base3Occupied = true;
            base1Occupied = false;
        }
        base2Occupied = true;
    } else if ( swingType === "triple" ) {
        if ( base3Occupied === true ) {
            updateRuns();
            base3Occupied = false;
        }
        if ( base2Occupied === true ) {
            updateRuns();
            base2Occupied = false;
        }
        if ( base1Occupied === true ) {
            updateRuns();
            base1Occupied = false;
        }
        base3Occupied = true;
    } else if ( swingType === "homerun" ) {
        if ( base3Occupied === true ) {
            updateRuns();
            base3Occupied = false;
        }
        if ( base2Occupied === true ) {
            updateRuns();
            base2Occupied = false;
        }
        if ( base1Occupied === true ) {
            updateRuns();
            base1Occupied = false;
        }
        updateRuns();

    }
    console.log("First Base Occupied?: " + base1Occupied + ". Second Base Occupied?: " + base2Occupied + ". Third Base Occupied?: " + base3Occupied);
}

const updateRuns = () => {
    if ( whichTeamAtBat === 1 ) {
        team1RunsForCurrentInning += 1;
        team1RunsTotal += 1;
        document.getElementById("team1-runs").innerHTML = team1RunsTotal;
        document.getElementById(`team1-inning${inning}`).innerHTML = team1RunsForCurrentInning;
    } else if ( whichTeamAtBat === 2 ) {
        team2RunsForCurrentInning += 1;
        team2RunsTotal += 1;
        document.getElementById("team2-runs").innerHTML = team2RunsTotal;
        document.getElementById(`team2-inning${inning}`).innerHTML = team2RunsForCurrentInning;
    }
}

const updateStrikesCount = () => {
    questionsDivDisappear();
    swingOptionsAppear();
    if ( strikes < 2 ) {
        strikes += 1;
    } else {
        updateOutsCount();
        strikes = 0;
        updateAtBatCount();
        console.log("the updateAtBatCount() in const updateStrikesCount just got called");
    }
    document.getElementById("strikes-counter").innerHTML = strikes;
}
// If user gets an answer wrong (i.e., gets a strike), increase the current batter's strikes by 1

const updateOutsCount = () => {
    if ( outs < 2 ) {
        outs += 1;
        updateTurn();
    } else if ( outs === 2 ) {
        console.log("Yeah, there are 3 outs now.");
        turn = 6;
        updateTurn();
        updateInning();
    } else if ( outs === 4 ) {
        updateInning();
    }
    document.getElementById("outs-counter").innerHTML = outs;
}
// If user gets a third strike, increase the current team's outs by 1

const updateInning = () => {
    console.log("updateInning called");
    base1Occupied = false;
    base2Occupied = false;
    base3Occupied = false;
    outs = 0;
    if ( whichTeamAtBat === 2 ) {
        whichTeamAtBat = 1;
        console.log("whichTeamAtBat has been switched from 2 to " + whichTeamAtBat);
    } else if ( whichTeamAtBat === 1 ) {
        whichTeamAtBat = 2;
        console.log("whichTeamAtBat has been switched from 1 to " + whichTeamAtBat);
    }
    console.log("The inning is currently " + inning);
    switchAtBatCount();
    if ( inning < 10 ) {
        if ( whichTeamAtBat === 2 ) {
            inning++;
            console.log("Now the inning is " + inning);
            team1RunsForCurrentInning = 0;
            team2RunsForCurrentInning = 0;
            setTotals();
        } else if ( whichTeamAtBat === 1 ) {
            console.log("Now the inning is " + inning);
            team1RunsForCurrentInning = 0;
            team2RunsForCurrentInning = 0;
            setTotals();
        }
    } else {
        alert("Good game!");
    }
}
// Switch to the other team and update the inning, or (if the 10th inning has just been played) end the game