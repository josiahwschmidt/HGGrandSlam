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
let hits = 0;
let inning;
let outs = 0;
let strikes = 0;
let whichTeamAtBat;

let csvRow;
let csvCol;
let csvDataArray = [];
const csvData = `
question,correct,incorrect1,incorrect2,incorrect3
"What is the name of the website that specializes in German Protestant church records?","Archion","Matricula","Die Maus","MeyersGaz.org"
"Test question 2","Correct Answer","Incorrect Answer 1","Incorrect Answer 2","Incorrect Answer 3"
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
    document.getElementById("team1-name").innerHTML = team1Name.toUpperCase();
    document.getElementById("team2-name").innerHTML = team2Name.toUpperCase();
    teamNameInputsDisappear();
    playBall();
});
// save the team names after they have been typed in and the "Save" button has been clicked

const playBall = () => {
    console.log("Play ball!");
    teamNamesChosen = true;
    inning = 1;
    whichTeamAtBat = 2;
    updateAtBatCount();
    swingOptionsAppear();
}
// after team names have been chosen, make the Question Options div appear

singleButton.addEventListener("click", () => {
    takeASwing(single);
});
doubleButton.addEventListener("click", () => {
    takeASwing(double);
});
tripleButton.addEventListener("click", () => {
    takeASwing(triple)
});
homerunButton.addEventListener("click", () => {
    takeASwing(homerun);
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
    if ( inning === 1 && whichTeamAtBat === 2 ) {
        atBat++;
        document.getElementById("at-bat-counter").textContent = atBat;
    } else { 
        atBat++;
        document.getElementById("at-bat-counter").textContent = atBat;
    }
}

const takeASwing = (power) => {
    questionsDivAppear();

    if ( power === single ) {
        console.log("You swung for a single");

        swingOptionsDisappear();

        csvRow = (Math.round(Math.random() * (csvDataArray.length - 1)));

        document.getElementById("question").textContent = getValueByIndex(csvDataArray, csvRow, 0);
        answerOrderRandomizer();

    } else if ( power === double) {
        console.log("You swung for a double!");

    } else if ( power === triple ) {
        console.log("You swung for a triple!");

    } else if ( power === homerun ) {
        console.log("You swung for a home run!");

    }
}
// based on the chosen hit power, ask a different category of question

const pickARandomQuestion = () => {

}

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
    if (selectedRadio.nextElementSibling.textContent === getValueByIndex(csvDataArray, csvRow, 1)) {
        console.log("You chose correctly!");
        updateHitsCount();
    } else if (selectedRadio && selectedRadio.nextElementSibling.textContent !== getValueByIndex(csvDataArray, csvRow, 1)) {
        console.log("You chose the wrong answer");
        updateStrikesCount();
    } else if (!selectedRadio) {
        prompt("Please select an answer.");
    }
}
// Check which radio button the user had selected when they pressed "Submit Answer," and if the text content of that radio button's nextElementSibling equals
// the correct answer (in Column 1 of that row of the csvDataArray), let the user know they got the answer correct; or if it doesn't match then let the user
// know they got the answer wrong; or if there is no radio button selected when the user clicks "Submit Answer," let them know they need to make a selection

const updateHitsCount = () => {
    hits += 1;
    document.getElementById(`team${whichTeamAtBat}-hits`).innerHTML = hits;
}
// If user gets an answer correct (i.e., gets a hit), increase the current team's hits for the current inning by 1

const updateStrikesCount = () => {
    if ( strikes < 2 ) {
        strikes += 1;
    } else {
        updateOutsCount();
        strikes = 0;
    }
    document.getElementById("strikes-counter").innerHTML = strikes;
}
// If user gets an answer wrong (i.e., gets a strike), increase the current batter's strikes by 1

const updateOutsCount = () => {
    if ( whichTeamAtBat = 2 ) {
        whichTeamAtBat = 1;
    } else {
        whichTeamAtBat = 2;
    }

    updateAtBatCount();

    if ( outs < 2 ) {
        outs += 1;
    } else {
        updateInning();
        outs = 0;
    }
    document.getElementById("outs-counter").innerHTML = outs;
}
// If user gets a third strike, increase the current team's outs by 1

const updateInning = () => {
    if ( inning < 10 ) {

    } else {
        prompt("Good game!");
    }
}
// If user gets a third out, switch to the other team and update the inning