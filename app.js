const chargeSFX = new Audio("./sfx/charge.mp3");
const errorSFX = new Audio("./sfx/error.wav");
const hitSFX = new Audio("./sfx/hit.wav");
const outSFX = new Audio("./sfx/out.wav");
const pitchSFX = new Audio("./sfx/pitch.wav");
const runSFX = new Audio("./sfx/run.mp3");
const strikeSFX = new Audio("./sfx/strike.wav");

const availableTeammates = [
    "./sprites/Brent front.png", // position 0
    "./sprites/Drew front.png", // position 1
    "./sprites/Jack front.png", // position 2
    "./sprites/Jake front.png", // position 3
    "./sprites/Jim front.png", // position 4
    "./sprites/John front.png", // position 5
    "./sprites/Josiah front.png", // position 6
    "./sprites/Kelly front.png", // position 7
    "./sprites/Lauren front.png", // position 8
    "./sprites/Mike front.png", // position 9
    "./sprites/Robin front.png" // position 10
];
const playerImages = {};
let team2RosterReady = false;
let rosters = [];
let rosterTeam1 = [];
let rosterTeam2 = [];
const rosterSaveButton = document.getElementById("confirm-selection");
var team1Name;
var team2Name;
let teamNamesChosen = false;

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
let dontCallSwingOptionsAppear = false;
const imgHeightResize = 70;
const imgWidthResize = 70;
let inning = 0;
let maxTurns = 5;
var modifier = 0;
let outs = 0;
const runSpeed = 1500;
let strikes = 0;
var team1Hits = 0;
var team2Hits = 0;
var team1RunsForCurrentInning = 0;
var team1RunsTotal = 0;
var team2RunsForCurrentInning = 0;
var team2RunsTotal = 0;
let turn = 0;
var whichBatterAtBat = 0;
var whichTeamAtBat = 1;

var chosenCsvDataArray;
let csvRow;
let csvCol;
let csvDataArray1 = [];
const csvData1 = `
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
"Which of these is NOT a popular digitized newspapers website?","JournalDex.com","Newspapers.com","NewspaperArchive.com","GenealogyBank.com"
"Which of these is NOT a website where you go to find Jewish genealogy sources?","Archion","Shul Records America","Yad Vashem","JewishGen.org"
"In what year did St. Louis host the World's Fair?","1904","1900","1894","1901"
"Which county is directly south of St. Louis County?","Jefferson","Warren","Franklin","St. Charles"
"Which county is entirely to the west of St. Louis?","Franklin","St. Charles","Jefferson","Ste. Genevieve"
"What is the maximum number of pages SLCL H&G can scan out of a book for a patron?","30 pages","3 chapters","100 pages","3 pages"
"What letter in front of a call number designates that a book is a reference copy that must stay within the library?","R","L","Q","C"
"Which of these companies does NOT sell direct-to-consumer DNA tests?","GEDmatch","Ancestry","23andMe","MyHeritage"
"How do St. Louis directories typically sort businesses?","By type of business, then alphabetically by name","Just alphabetically by name","By type of business, then alphabetically by street name","Just alphabetically by street name"
"What does 'do.' generally mean in old records","Ditto","Date of","Doubted information","Daughter of"
"What year did the US Civil War begin?","1861","1865","1859","1857"
"What was the last year that the US census included a slave schedule?","1860","1870","1840","1850"
"Which of these is NOT a website that provides free, full-length copies of books that are no longer copyrighted?","Abe Books","Hathi Trust","Project Gutenberg","Archive.org"
"What does the Latin term 'anno' mean in English?","year","month","century","hour"
"What does the Latin term 'nativitas' mean in English?","birth","marriage","death","burial"
"What does the Latin term 'baptizatio' mean in English?","baptism","marriage","burial","birth"
"What does the Latin term 'conjugium' mean in English?","marriage","death","burial","birth"	
"What does the Latin term 'defunctis' mean in English?","death","burial","birth","marriage"
"What does the Latin term 'filia' mean in English","daughter","son","mother","father"
"What does the Latin term 'filius' mean in English","son","mother","father","daughter"
"What does the Latin term 'pater' mean in English","father","daughter","son","mother"
"What does the Latin term 'mater' mean in English","mother","father","daughter","son"
"Which government never administered St. Louis?","Britain","United States","France","Spain"
"What was the primary language spoken by inhabitants of St. Louis in the 1700s?","French","English","Spanish","Portuguese"
"Which of these are NOT generally considered to be usable genealogical sources?","Seance revelations","Vital records","Oral history","Newspapers"
"What is the most preferable way to store and preserve a large, flat document?","In a cylindrical tube","Rolled up and rubber banded","Carefully folded and taped","Carefully folded and paper clipped"
"Which of these genealogy websites is totally free and accessible to anyone?","FamilySearch","Ancestry","MyHeritage","Fold3"
"Which if the following observations in a user-created family tree is most believable?","A son being called 'Jr.' even though he has a different middle name than his father","A child with a birthdate only 10 years after the mother's birthdate","An 18th-century individual purportedly buried 500 miles away from their place of death","A child with a birthdate only 5 months after a biological sibling's birthdate"
"Which European empire kept administrative records for India and Pakistan until 1947?","Britain","France","Spain","Germany"
"What was Missouri's first capital city?","St. Charles","Ste. Genevieve","St. Louis","Hannibal"
"What is the name of the St. Louis area museum that showcases boats, planes, trains, and automobiles?","National Museum of Transportation","Transport Heritage Hall","The Motive Museum of the Midwest","The Candy-Martin Museum of Stubbville"
"Which genealogy website specializes in military records?","Fold3","FindAGrave","Archion","FindMyPast"
"What is the best book to see which historical/genealogical sources are available for a given area within America?","The Red Book","The Green Book","The Blue Book","The Yellow Pages"
"What does 'the Confluence' refer to?","The point where the Missouri River flows into the Mississippi River","The two-year period during WW2 when St. Louis City merged back into St. Louis County","A large Ponzi scheme perpetrated by several social media influencers","The meeting in which the French settlers of St. Louis made peace with the nearby Native Americans"
"Which of these are NOT one of the things patrons can reserve from the SLCL H&G Department?","Memory Kits","Oral History Kits","Scanning Kits","Genealogy Guide Books"
"Which of these cataloguing systems is used by SLCL H&G?","Dewey Decimal","Library of Congress System","BISAC","Duncan Decimal"
"Illiterate individuals would often sign documents with their:","mark","stroke","seal","nose"
"Which community is the St. Louis County Courthouse located in?","Clayton","Creve Coeur","Hazelwood","Chesterfield"
"Which historical event in France directly led to the establishment of the first systematic civil registry?","The Napoleonic reforms","The Treaty of Versailles","Conscription for the Anglo-French War","The Fall of the Bastille"
"A horizontally oriented family tree chart is called what kind of style?","pedigree","scroll","fork","filigree"
"Your cousin's child would be how many generations removed from you?","once removed","twice removed","thrice removed","no generations removed"
"Your cousin's grandchild would be how many generations removed from you?","twice removed","thrice removed","no generations removed","once removed"
"Second cousins would share what type of ancestor in common?","Great grandparents","Great great grandparents","Great great great grandparents","Trick question--they would only be related by marriage, not by ancestry"
"How is the term for family history research spelled?","Genealogy","Geneology","Geology","Gynecology"
"Which U.S. Supreme Court decision denied citizenship to Black Americans of African descent?","Dred Scott v. Sandford","Brown v. Board of Education","Commonwealth v. Aves","Virginia v. John Brown"
"What is the capital of the state of Missouri?","Jefferson City","St. Louis","Kansas City","Branson"
"Who is the only U.S. president to have been born in Missouri?","Harry S Truman","Theodore Roosevelt","Ulysses S. Grant","Herbert Hoover"
"Generally speaking, in what order did record-keeping institutions historically start keeping vital records?","Churches, then large cities, then counties, then state governments","State governments, then counties, then large cities, then churches","Large cities, then counties, then state governments, then churches","Churches, then state governments, then counties, then large cities"
"Jean Baptiste Point du Sable, who spent the latter part of his life in St Charles, Missouri, is regarded as the founder of which city?","Chicago","St. Louis","Mobile","New Orleans"
"Which feature of FamilySearch.org allows you to see scanned images of historical records that have not yet been indexed or transcribed?","The Catalog","The Family Tree","Memories","The Research Wiki"
"Which of these is NOT one of the theorized causes of disease before the development of germ theory in the 1860s?","Microorganisms","Miasma/'bad air'","Backed-up blood or other clogged fluids","Unbalanced humors"
"Who generally decided what biographical information went onto a civil death certificate?","An informant (usually a family member)","The undertaker","The attending physician","The decedent themselves would fill it out in their final moments of life"
"Which of these is not one of the services SLCL H&G provides?","Poster-sized family tree printing","Book-A-Genealogist appointments","Lookups and record retrievals","Scanning and digitization appointments"
"Which of these is NOT a community in St. Louis County?","Carondelet","Glendale","Jennings","Sappington"
"Which of these is NOT a good way to find peripheral relatives of an ancestor?","Read probate records appearing immediately before or after their probate records in court records","Look at who served as their wedding witness(es)","See who is living next door or with them in censuses","Check who served as baptism sponsor(s) for their children"
"What do you call a written or oral statement made under oath?","affidavit","admonition","power of attorney","relict"
"Which of these terms means 'before the U.S. Civil War'?","antebellum","antediluvian","postbellum","antimatter"
"Which of these terms means 'to grant a property, legal right, benefit, or privilege to another person?","assign","authenticate","bond","consort"
"Which of these terms means 'to prove that a document is not a forgery'?","authenticate","bequeath","testate","relict"
"Which of these terms means 'a person from whom you descend'?","ancestor","descendant","marital relative","assignee"
"Which of these terms means 'a person who descends from you'?","descendant","ancestor","forebear","progenitor"
"Which of these terms means 'to leave or give property to another person or organization'?","bequeath","authenticate","testate","relict"
"Which of these terms means 'a written, binding agreement to perform something as specified'?","bond","natus","issue","tithe"
"Which of these terms means 'land promised as a reward for military services'?","bounty","bond","tithe","probate"
"What does the abbreviation 'ca.' generally mean on historical documents?","circa (about, around, approximately)","cemetery administration","common ancestor","Confederate Army"
"What does the term 'Christian name' mean?","first name and any middle names","first name only","nickname","last name"
"Which of these is a historical term meaning 'spouse, mate, or companion'?","consort","reeve","testator","yeoman"
"Which of these terms does NOT refer to the same war?","The Great War","The Civil War","The War of the Rebellion","The War Between the States"
"What does the abbreviation dec'd mean?","deceased","descendant","declared","decided"
"Which of these terms means 'a document transferring ownership and title of a property'?","deed","bond","extract","abstract"
"What is a document that organizes genealogical information about a nuclear family called?","family group sheet","pedigree","family tree","biography"
"What does the term 'inventory' mean in the context of probate records?","A list of all a deceased person's property","All of an estate's heirs as a collective group","All of the residual income that will come into a person's estate after their death","A list of lenders who can make a claim against an estate"
"What does the archaic name abbreviation 'Jno.' stand for?","John","Junior","Joaquin","Jnostopher"
"Which calendar came first? The Julian Calendar or the Gregorian Calendar?","Julian Calendar","Gregorian Calendar","Trick question--they were both created the same year","Trick question--there is no such thing as a 'Gregorian Calendar'"
"What is the meaning of the archaic term 'knave'?","servant boy","servant girl","a tool for cutting leather","a tool for cutting cloth"
"What does the term 'late' mean in historical documents?","deceased","having emigrated","being of advanced age","having died without a will"
"What is the meaning of 'lessor'?","Owner leasing property to a tenant","Tenant leasing property from an owner","One who owes money to an estate","One who is owed money by an estate"
"What is the meaning of 'lessee'?","Tenant leasing property from an owner","Owner leasing property to a tenant","One who is owed money by an estate","One who owes money to an estate"
"Which of these terms means 'a claim placed on property by a person who is owed money'?","lien","lis pendens","bond","letters testamentary"
"What does the term 'manumission' mean?","Being released from slavery or indentured servitude","Closing out an estate after settling all debts and claims","Transmitting a manuscript","Being on a mission to get yourself a man"
"What does the term 'nee' mean?","A woman's birth surname (a.k.a. 'maiden name')","A German or Scandinavian family's farm name","A baby's Christian name","The sound a horse makes"
"What does SSDI stand for?","Social Security Death Index","Social Security Data Information","Statewide Surname Directory Index","Standardized Sibling Documentation Initiative"
"What is a writ of summons?","Document ordering a person to appear in court","Court order that begins a probate case","Book recording all of the summons issued by a court in a given year","Magic spell that summons a dead ancestor for genealogical interrogation"
`;
Papa.parse(csvData1, {
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
        csvDataArray1 = results.data;
        console.log('Parsed CSV Data:', results.data);
    },
    error: function(error) {
        console.error('Error parsing CSV:', error);
    }
});
// Link the "Single" Difficulty-Level Questions and Answers CSV data to this app

let csvDataArray2 = [];
const csvData2 = `
question,correct,incorrect1,incorrect2,incorrect3
"DOUBLE Questions","Correct Answers","Incorrect Answer 1","Incorrect Answer 2","Incorrect Answer 3"
"Which of these pieces of information are birth records most likely to list?","Parents' names","Attending physician","Godparents' names","Hour of birth"
"Which of these German names do NOT typically anglicize to 'John'?","Jurgen","Johann","Hans","Johannes"
"What does it mean to die intestate?","To die without a written will","To die outside of one's state of residence","To die with at least one heir","To die suddenly"
"When a deceased person's estate was probated, a notice was often posted in the:","Newspaper","Church bulletin","Family Bible","County Recorder's office"
"Which of these is NOT an immigration-related record?","Quit claim","Declaration of intention","Naturalization certificate","Passenger manifest"
"What does 'probate' mean?","To legally prove a last will","A refund of court costs for naturalization","To verify one's eligibility to join a lineage society","A confirmation of interment in a cemetery"
"What is the call number for books containing histories of individual families?","929.2","977.8","369.5","922.9"
"Which of the following databases do NOT contain public info on living individuals?","FamilyTreeDNA","Ancestry","FamilySearch","Intelius"
"What is the call number for books about St. Louis, Missouri?","977.866","978.688","929.866","973.687"
"What is the name of the Evangelical theological seminary in St. Louis?","Eden","Immanuel","Concordia","Kenrick-Glennon"
"What is the term for a book containing historical and genealogical data about a Norwegian rural settlement?","Bygdebok","Ekteskapslisens","Lærebok","Fiskepasta"
"In which year did the U.S. census record both where each individual currently resided as well as where they had resided 5 years previously?","1940","1920","1930","1950"
"Which year's U.S. census was lost due to fire-related damages?","1890","1790","1880","1780"
"What year did Missouri become a state?","1821","1831","1811","1841"
"Which of these is NOT a port that immigrants often came in to the U.S. through?","Wilmington","San Francisco","New Orleans","Baltimore"
"What is another term for an immigrant's declaration of intention to become a U.S. citizen?","First papers","Second papers","Alien registration","Green card"
"What is the definition of 'chattel'?","Personal property","Holstein cows","A salon for social conversation","A legally-binding signature"
"What is the name of the important atlas of St. Louis City & County published in 1878?","Pitzman's","Gould's","Polk's","Chouteau's"
"What is the type of DNA that is only passed down from fathers to sons?","Y-DNA","mt-DNA","autosomal DNA","X-DNA"
"What is the type of DNA that children only receive from their mothers?","mt-DNA","autosomal DNA","nuclear DNA","Y-DNA"
"What is the type of DNA that a child receives from both their father and their mother?","autosomal DNA","Y-DNA","m-DNA","mitochondrial DNA"
"Which of these DNA databases are law enforcement allowed to use to solve cold cases?","GEDmatch","Ancestry","23andMe","MyHeritage"
"In the context of genetic genealogy, what is an NPE?","Non-Paternity Event","Non-Pedigree Error","Nucleic Polymorph Equation","Nexus of Parental Equivalence"
"Which of these is not one of the publishers of St. Louis area directory books?","Chester","Polk","Gould","Haines"
"What information about enslaved people was NOT recorded in the U.S. census slave schedules?","Their names","Their owners","Their ages","Their disabilities (if any)"
"Which US Civil War military source tended to include the most detailed biographical information?","Pension applications","Service record indexes","Muster rolls","Headstone applications"
"For the most part, were territories included in U.S. census population schedules before they became states?","Yes, and they listed individuals by name","Yes, but they only listed names with no other information","Yes, but they only tallied the number of inhabitants without naming them","No, U.S. censuses have never included territories"
"Which of these types of evidence is absolutely necessary to gain citizenship into a Native American tribal nation?","An ancestor who appears in the Dawes Rolls","An ancestor who lists 'Indian' as their race on a census","DNA result showing Native American ancestry","A family story about Native American ancestry passed down orally"
"Which of these types of records does Fold3 NOT have?","Military oral history recordings","Holocaust/concentration camp records","St Louis directories","Native American tribal enrollment applications"
"What was the name of the immigration center at the port of New York before Ellis Island existed?","Castle Garden","Washington Avenue","Locust Point","Algiers"
"If an immigrant named Ludwig Johannsen came to America and was known in subsequent records as Lewis Johnson, what does that indicate?","He decided to start going by a more English sounding name","His name was officially changed by an Ellis Island officer","He filed a legal change of name at the local courthouse","He was disguising his identity for nefarious reasons"
"For the most part, what documentation was required for immigrants to reside in the United States in the 19th century?","None","A declaration of intention","A naturalization certificate","A green card"
"From 1855 to 1890, approximately what percentage of immigrants to the United States arrived through New York?","Two thirds","Half","One third","One quarter"
"Which of these is NOT an African-American history museum in St. Louis?","DuSable Black History Museum","The Griot","George B. Vashon Museum","Scott Joplin House State Historic Site"
"Which of these individuals is NOT part of the same Clark family?","Bob Clark, founder of Clayco and namesake of Clark Family Branch library","Major General Robert Anderson, commander of Union forces at Ft. Sumter","William Clark, expeditionary partner of Meriwether Lewis","Brig. Gen. George Rogers Clark, military leader in the Revolutionary War"
"Which of these war names does NOT refer to the same conflict?","War of the League of Cambrai","War of the Conquest","Seven-Years' War","French and Indian War"
"What is the only genetic genealogy testing company that offers in-depth testing of the male Y chromosome?","FamilyTreeDNA","Ancestry","23andMe","MyHeritage"
"What organization uses ArcGIS to publish aerial-view maps of St. Louis County online?","St. Louis County Government","Missouri Historical Society","St. Louis Genealogical Society","State Historical Society of Missouri"
"What is a common way to translate German vowels with an umlaut into English (for instance, ä, ö, ü)?","add an e after the letter (for instance, ae, oe, ue)","add an o after the letter (for instance, ao, oo, uo)","add a ch after the letter (for instance, ach, och, uch)","add a v before the letter (for instance, va, vo, vu)"
"How is the German letter ß pronounced?","Ss","B","V","Sch"
"Which of these is NOT one of the German words for 'the'?","denn","der","die","das"
"For which conflict are U.S. military personnel records most easily and abundantly available online?","US Civil War","Spanish-American War","World War 1","World War 2"
"In Dewey Decimal call numbers, what do you call the segment near the end, which often comprises of a letter followed by three numbers?","Cutter number","Sharion's Segment","Conclusion code","Surname indicator"
"What kind of unit of society is a German Ortssippenbuch based around?","A community","A family unit","A military recruitment district","A farm"
"What is the unit of measurement used for DNA?","Centimorgans","Hexamorphs","Ribobases","Parsecs"
"What was the name for the series of laws passed in the South around the end of the Civil War that restricted the freedoms of African Americans?","Black Codes","The Code Noir","Jim Crow","Apartheid"
"Which denomination's church records are most useful for tracing African American ancestors in the American South?","African Methodist Episcopal","Roman Catholic","Southern Baptist","Evangelical Reformed"
"What is the French term for civil vital records?","état civil","registres d'église","documents ecclésiastiques","poutine"
"What institution holds civil vital records in England?","The General Register Office","The Queen's Archive","The Ministry of Vital Events","The Tower of London"
"What is the name of the historical record created in 1086 that gives detailed information about land-holdings in England?","The Domesday Book","The Chartulary of St. Alban's","The Hundred Rolls","The Magna Carta"
"Did Missouri have a Union or a Confederate state government during the US Civil War?","Trick question--both--it had dueling Union and Confederate state governments","Union","Confederate","Trick question--neither--Missouri was run as a utopian socialist commune"
"As of the 2020 US census, what group is now enumerated as the largest ethnic group in the US?","English-Americans","German-Americans","French-Americans","Spanish-Americans"
"What is the name of the tool on AncestryDNA that shows you other DNA test-takers who claim one of the same ancestors as you?","ThruLines","Ethnicity Estimates","Chromosome Painter","Communities"
"What monicker did Germans have for St. Louis in the 1800s?","The Rhineland of the West","The American Allemania","The Saarland on the Mississippi","The Second Vaterland"
"What was the system created in 1785 to parcel U.S. land up in a grid-like fashion?","Public Land Survey System","Plat Division System","The National Grid","The Matrix"
"What surveying system did the French and Spanish colonial administrations parcel land with, using rivers, trees, and marked stones to form boundaries?","metes and bounds","geodetic method","lots and blocks","imperial survey system"
"What is the name of the well-known genealogy theorist who wrote the book on how to cite various genealogical sources?","Elizabeth Shown Mills","Henry Louis Gates","CeCe Moore","Lisa Louise Cook"
"Who was the first female mayor of St. Louis?","Lyda Krewson","Tishaura Jones","Hazel Erby","Megan Green"
"What was the forerunner of modern civil death records called?","Bills of Mortality","Corpse Tickets","Death Receipts","Documents of Demise"
"What is the German term for 'widow'?","Wittwe","Hexe","Weberin","Ehefrau"
"Which of these is NOT one of the repositories that merged into the Library & Archives Canada?","The Queen's Vaults","The National Archives of Canada","The Public Archives of Canada","The National Library of Canada"
"Which of these is NOT a format for organizing genealogical information?","Elizabeth Shown Mills System","Ahnentafel System","New England Historic & Genealogical Society's Register System","NGS Quarterly System"
"How many days did it take Lewis and Clark to go from Missouri to the Pacific Coast?","535","100","365","997"
"What year was the first U.S. census?","1790","1776","1800","1812"
"Which of these websites can you NOT find digitized St. Louis-area directories on?","Cyndi's List","SLCL Digital Archive","FamilySearch.org","Fold3.com"
"Which of these was NOT a British colony at the time of the American Revolution?","Louisiana","Quebec","West Florida","Newfoundland"
"In which year did France cede Canada to Britain?","1763","1783","1777","1800"
"What was an alternative name for the 1904 St. Louis World's Fair?","The Louisiana Purchase Exposition","The Jefferson Memorial Event","The Westward Gateway Exhibition","Papa Imo's Extravaganza"
"What is the name of the major German genealogical handbook of bourgeois or patrician families?","Deutsches Geschlechterbuch","Genealogisches Handbuch des Adels","Almanach de Gotha","Nederland's Patriciaat"
"Which of these is an abbreviated version of a historical document that includes basic details like dates, names, relationships, and signatures?","abstract","transcript","facsimile","extract"
"Which of these is a specific portion or excerpt taken from a historical document?","extract","abstract","transcript","facsimile"
"Which of these is an exact copy of a historical document, maintaining all its formatting?","facsmile","transcript","extract","abstract"
"Which of these is a written or printed version of a historical document, which was originally presented in another medium?","transcript","extract","facsimile","abstract"
"What does the abbreviation 'admon.' mean in probate records?","letters of administration","admonished","in this case only","a Jamaican advertisement"
"What is the term for 'a public announcement of an intended marriage, generally made in a church'?","bann","bond","uxor","quit claim"
"Which of these is NOT a historical term for a child born out-of-wedlock?","in loco parentis","base-born","illegitimate","spurious"
"What term means 'the degree of relationship between persons who descend from a common ancestor'?","consanguinity","paternity","paleography","vestry"
"Which of these terms means 'a legal document by which the title to a property is transferred'?","conveyance","authentication","bond","affidavit"
"What is the difference between a 'devise' and a 'bequest'?","Devise distributes real estate, bequest distributes personal property (like money or objects)","Devise distributes personal property (like money or objects), bequest distributes real estate","Devise distributes via a will, bequest distributes via intestate estate","Bequest distributes via a will, devise distributes via intestate estate"
"What term means 'a distribution of real estate (like land or property), usually through a will'?","devise","affidavit","bond","tithe"
"In the context of genealogy, what does a 'double date' mean?","A Julian and a Gregorian calendar date given for the same event","Two brothers from one family and two sisters from another family courting each other","When a genealogist knows both the birth date and death date for an ancestor","A date when two or more vital events (e.g., a birth and a death) occurred on the same day"
"What is the difference between 'emigration' and 'immigration', respectively?","Leaving a country vs. entering a country","Entering a country vs. leaving a country","Entering a country temporarily vs. entering a country permanently","Entering a country illegally vs. entering a country legally"
"What does the abbreviation 'exor.' mean in the context of genealogy?","executor (of an estate)","and wife","exorcist","stricken-out words (on a historical document)"
"What is the term for a book that alphabetically names and describes places in a specific area?","gazetteer","almanac","plat map","residential directory"
"What does the abbreviation 'gdn.' mean in the context of probate documents?","guardian","grantee index","godparent","grandson"
"What is the name of the database that specializes in cataloguing articles from historical/genealogical society's journals?","PERSI","Missouri Digital Heritage","JSTOR","WorldCat"
"What does the term 'major' (lower-case 'm') mean in historical legal documents?","Person who has reached legal age","Military rank above Captain","Largest portion of an inheritance","Largest portion of a dower"
"What did the abbreviation 'Na.' designate on censuses?","Naturalized citizen","Natural-born citizen","Not a citizen","Naturist"
"Which of the following surnames is patronymic?","Johnson","Smith","Lovejoy","Washington"
"What does the abbreviation rec'd mean in historical legal documents?","received","recommend","recorded","receded"
"Up until what year is the Social Security Death Index currently accessible online?","2014","2017","2011","2007"
"What is the algorithm that searches for alternate spellings of a name, based on the way the components of the name are pronounced, called?","Soundex","Auditory Surname Algorithm","PronunSys","AlphaSim"
`;
Papa.parse(csvData2, {
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
        csvDataArray2 = results.data;
        console.log('Parsed CSV Data:', results.data);
    },
    error: function(error) {
        console.error('Error parsing CSV:', error);
    }
});
// Link the "Double" Difficulty-Level Questions and Answers CSV data to this app

let csvDataArray3 = [];
const csvData3 = `
question,correct,incorrect1,incorrect2,incorrect3
"Which of these pieces of information are birth records most likely to list?","Parents' names","Attending physician","Godparents' names","Hour of birth"
"Which of these German names do NOT typically anglicize to 'John'?","Jurgen","Johann","Hans","Johannes"
"What does it mean to die intestate?","To die without a written will","To die outside of one's state of residence","To die with at least one heir","To die suddenly"
"When a deceased person's estate was probated, a notice was often posted in the:","Newspaper","Church bulletin","Family Bible","County Recorder's office"
"Which of these is NOT an immigration-related record?","Quit claim","Declaration of intention","Naturalization certificate","Passenger manifest"
"What does 'probate' mean?","To legally prove a last will","A refund of court costs for naturalization","To verify one's eligibility to join a lineage society","A confirmation of interment in a cemetery"
"What is the call number for books containing histories of individual families?","929.2","977.8","369.5","922.9"
"Which of the following databases do NOT contain public info on living individuals?","FamilyTreeDNA","Ancestry","FamilySearch","Intelius"
"Which of these terms is a synonym for the Reformed church?","Calvinist","Lutheran","Methodist","Anabaptist"
"Which church organization resulted from the merger of the Congregational and Evangelical/Reformed Church in 1957?","United Church of Christ","ECLA","Missouri Synod","Evangelical Synod of North America"
"What year did Germany become a unified country?","1871","1774","1900","1848"
"In what year did famine and political revolutions start sending large waves of migrants from Europe to the U.S.?","1848","1517","1776","1492"
"Which of these cities is NOT one of the corners of the 'German Triangle'?","Pittsburgh","Milwaukee","St. Louis","Cincinnati"
"In what year did U.S. censuses start recording the family relationships of the people in each household?","1880","1860","1870","1850"
"In what year did U.S. censuses start recording the names of every individual in a household (not just the head of household)?","1850","1870","1840","1860"
"In what year did U.S. censuses start recording occupations on the population schedules?","1850","1870","1840","1860"
"In which two years did U.S. censuses record the number of children birthed and the number of currently surviving children for each woman?","1900 and 1910","1910 and 1920","1880 and 1900","1920 and 1930"
"In which year did the U.S. census NOT indicate the approximate year when each married couple got married?","1920","1900","1910","1930"
"In what year did U.S. censuses start recording the birthplaces of each person's father and mother?","1880","1870","1890","1900"
"During which year range did U.S. censuses record the approximate year when each immigrant arrived in the U.S.?","1900-1930","1880-1920","1910-1940","1870-1910"
"In what year did U.S. censuses start recording the street address of each household?","1880","1870","1900","1890"
"Which of these German root words means 'birth'?","Geburt","Tauf","Trau","Tote"
"Which of these German root words means 'baptism'?","Tauf","Trau","Tote","Geburt"
"Which of these German root words means 'marriage'?","Trau","Tote","Geburt","Tauf"
"Which of these German root words means 'death'?","Tote","Geburt","Tauf","Trau"
"Which of these German root words means 'deceased'?","starb","geburt","invalide","unehelich"
"Which of these German words means 'buried'?","Beerdigt","Verheiratet","Getaufte","Hochzeit"
"Which of these German words means 'illegitimately born'?","unehelich","ehelich","verheiratet","unverheiratet"
"Which of these is NOT one of the St. Louis-area German-language newspapers that was once published?","Missouri Zeitung","Anzeiger des Westens","Westliche Post","Mississippi Blätter"
"Which of these is NOT a cemetery located in St. Louis?","Borromeo","Calvary","Chesed Shel Emeth","Holy Cross"
"What was the term for the legal doctrine that transferred a married woman's legal rights to her husband?","Couverture","Lex Loci","Usufruct","Ex Parte"
"In what year did U.S. naturalization documents begin to record detailed biographical information about the immigrant?","1906","1890","1900","1886"
"Historically speaking, what percentage of estates left behind by a deceased American adult had a will?","10-15%","25-30%","45-55%","65-75%"
"Statistically speaking, in which of these geographic areas are you most likely to find a written will for an ancestor?","Rural areas","Urban areas","The Midwest","The South"
"Which of these are NOT likely to be found in a deceased person's probate case files?","Death certificate","Letters of administration","Personal property inventory","Minute book"
"Historically speaking, what was the original duty of the sheriff?","Tax collector","Executioner","Military recruiter","Personal guard of the local lord"
"In what year did the 'Great Divorce,' the separation of St. Louis County and St. Louis City, take place?","1876","1874","1878","1872"
"Around which industry was St. Louis originally founded?","Fur trading","Logging","Mining","Farming"
"Approximately how many books were in the National Genealogical Society's collection donation to SLCL H&G in 2001?","20,000","10,000","1,000","40,000"
"What online database specializes in records of African Americans from 1865 to 1872?","Freedmen's Bureau Portal","Enoch Pratt Library Online","OurBlackHistory.com","Reconstruction Historical Database"
"What is the industry standard filetype for downloadable family tree files?","GEDCOM","Genotype","FHL-FT","TIFF"
"Which of these languages would genealogical records for a Sephardic Jewish family probably NOT be in?","German","Ladino","Spanish","Hebrew"
"What is the central repository for civil vital records in Ireland called?","General Register Office","Bureau of Vital Documents","Ministry of Registrations","Irish Ancestral Society"
"In what year was the first comprehensive census of Ireland conducted?","1821","1791","1848","1861"
"What was the name of the large-scale property tax survey conducted in Ireland in the mid-19th century?","Griffith's Valuation","Patrick's Enumeration","Neil's Estimation","Mullanphy's Numeration"
"In what year was the colony of New France established?","1608","1768","1492","1597"
"What is the name for the prominent collection of French-Canadian wills/probate records, property transactions, marriage contracts, etc.?","The Notarial Records","La Collection Vitale","The Legal Compilation","Les Dossiers Historiques"
"What year did the Californian Gold Rush begin?","1848","1849","1850","1851"
"The British-led force that attacked St. Louis during the American Revolution was made up mostly of:","Native Americans","French","Spaniards","Hessians"
"What was the term for pro-Confederate guerrilla fighters in the US Civil War?","Bushwhackers","Jayhawkers","Carpet baggers","Wide-awakes"
"What was the term for pro-Union guerrilla fighters in the US Civil War?","Jayhawkers","Quantrill's Raiders","Wide-awakes","Bushwhackers"
"Which of these is NOT one of the major trans-Atlantic passenger ship lines in the 19th century?","Bremerhaven Line","Red Star Line","Holland America Line","Hamburg America Line",
"Which of these is NOT one of the major Irish immigrant neighborhoods in St. Louis?","Kinloch","Kerry Patch","Dogtown","Cheltenham"
"What was the unit of land measurement that the French preferred to use, which was roughly equal to 0.85 acres?","arpent","morgen","meile","elle"
"What country ceded the Louisiana Territory to which country in the year 1800?","Spain to France","France to Spain","France to USA","Spain to USA"
"What year did the United States purchase the Louisiana Territory from France?","1803","1800","1812","1795"
"What year was the city of St. Louis founded?","1764","1725","1776","1701"
"What is the English translation of the German occupational title 'Taglöhner'?","Day laborer","Farmer","Banker","Soldier"
"What is the English translation of the German occupational title 'Arbeiter'?","Laborer","Shepherd","Lawyer","Pastor"
"Which of these is NOT one of the Native American groups who populated Missouri?","Cherokee","Osage","Chickasaw","Kickapoo"
"What is the organization creating an index of Missouri death records from 1968-2015?","Reclaim The Records","The Smithsonian Institution","State Historical Society of Missouri","MyHeritage"
"What is the newest area code that began to be used in the St. Louis area, starting in 2022?","557","517","514","315"
"What are the administrative divisions in France called?","departments","provinces","sectors","compartments"
"What year was the daguerreotype photograph invented?","1837","1851","1888","1814"
"What year were flash bulbs for photography invented?","1927","1948","1900","1888"
"Soon after which event did white wedding dresses gain widespread popularity?","World War 2","The Death of Queen Victoria","The U.S. Civil War","The invention of photography"
"What year was the Chinese Exclusion Act passed?","1882","1849","1900","1914"
"On a historical legal document, what does 'ad litem' mean?","in this case only","indefinitely","on the boundary of","literally"
"Which of these terms means 'a supplement or addition to a will'?","codicil","errata","extract","secondary source"
"What term means 'a line of non-immediate relatives who descend from a common ancestor as you, like cousins or (great) nephews/nieces'?","collateral line","common line","conveyed line","ancestral line"
"What is the meaning of 'dower'?","When a husband's estate provides real estate and financial support for his widow","Land/money/goods/property a bride brings into the marriage","The historical practice of using a forked rod to locate water underground","A rod for marking property lines"
"What is the meaning of 'dowry'?","Land/money/goods/property a bride brings into the marriage","When a husband's estate provides real estate and financial support for his widow","The historical practice of using a forked rod to locate water underground","A rod for marking property lines"
"What does the term 'et ux' or 'et uxor' mean?","and wife","and husband","and children","and parents"
"How long is a fortnight?","2 weeks","12 days","20 days","3 weeks"
"What does the word 'good' in front of a relation mean in historical documents (e.g., 'good brother', 'good sister', 'good son')?","in-law","step","full-blooded","half"
"What is the name of the online calculator where you can input the numerical amount of DNA you share with a match, and it will tell you what relationship that could possibly mean?","The Shared cM Project Tool","DNACalculator.com","The Relationship Matrix","The Phylogenetic Tree"
"What is a holograph?","A document signed in the document creator's own hand","A letter obtained from the government giving someone the right to dwell on and improve new land","Property or money bequeathed to someone in a will","A 3D projection of an ancestor's image"
"What does the term 'instant' mean in a historical document?","in this same month","in this same year","on this same day","scheduled to happen within the next week"
"What court document officially authorizes an executor named in a will to carry out his or her duty?","letters testamentary","manse","letters patent","quit claim"
"What does the historical term 'liber' mean?","Book of public records","Collection of wills","Letter emancipating an enslaved person","Hybrid of a lion and a tiger"
"Which term means 'notices of lawsuits awaiting litigation, usually in matters concerning land'?","lis pendens","liber","bann","relicta"
"'Old Dominion' is a nickname for which state?","Virginia","Pennsylvania","Ohio","New York"
"What is the study of old handwriting styles called?","paleography","archaeography","paleology","geriography"
"What is the term for a previously existing county out of which a new county is formed?","parent county","ancestral county","derivative county","paleocounty"
"What does the term 'primogeniture' mean?","The eldest son inherits the entire estate","The youngest son inherits the estate in exchange for caring for the parents","Each child gets an equal share of the estate","The church gets the largest share of the estate"
"Which of these terms means 'transfer of land or claim without guaranteeing clear title'?","Quitclaim deed","Quit rent","Reconveyance","Abeyance"
"What does the Latin-derived term 'relict' ('relicta' feminine, 'relictus' masculine) mean?","widow/widower","illegitimate daughter/son","grandmother/grandfather","woman/man relinquishing right to a property"
"What does it mean to die testate?","To die leaving behind a written will","To die without leaving behind any will","To die having left behind only an oral will","To die while still owing debts to lenders"
"What is a testator?","One who writes a valid will","One who manages a deceased person's estate","One who testifies to the accuracy/validity of a will","The judge overseeing a probate case"
"What does the Latin term 'ultimo' mean?","the previous month","the previous year","the same day","the current year"
"What does the Latin term 'virgo' mean in English and some other European records?","an unmarried woman","an unmarried man","a widow","a widower"
"What is a warranty deed?","A guarantee of a clear property title from the seller to the buyer","A guarantee of sufficient purchasing resources from the buyer to the seller","A deed composed as part of a sheriff's sale","A special legal dispensation for an otherwise illegal property transfer"
"Which of these is NOT a valid definition of the term 'yeoman'?","Tax collector for a city/town council","Farmer","Petty clerical officer in a navy","Servant in a noble household"
`;
Papa.parse(csvData3, {
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
        csvDataArray3 = results.data;
        console.log('Parsed CSV Data:', results.data);
    },
    error: function(error) {
        console.error('Error parsing CSV:', error);
    }
});
// Link the "Triple" Difficulty-Level Questions and Answers CSV data to this app

let csvDataArray4 = [];
const csvData4 = `
question,correct,incorrect1,incorrect2,incorrect3
"What is the name of the website that specializes in German Protestant church records?","Archion","Matricula","Die Maus","MeyersGaz.org"
"What is the name of the website that specializes in German Catholic church records?","Matricula","MeyersGaz.org","Archion","Die Maus"
"After how many years do organizations like churches celebrate a Golden Jubilee?","50","25","100","10"
"After how many years do organizations like churches celebrate a Silver Jubilee?","25","100","50","10"
"The German name 'Ludwig' typically anglicized to which name?","Louis","Luke","Larry","Levi"
"Which of these is NOT a Jewish genealogical source?","Chametz","Ketubah","Get","Hesped"
"What is the Arabic term for a genealogy or family history?","Ilm Al Ansab","Rukhsat Alzawaj","Shakwaa","Tasrih Aldafn"
"What does SNP stand for in genetic genealogy?","Single nucleotide polymorphism","Substituted nucleic profile","Standard nuclear pairing","Standard nucleotide polysaccharide"
"In genetic genealogy, what is the mutation marker that most DNA tests look for?","SNP","STP","SNO","SPN"
"Who was responsible for writing Norwegian bygdebøker?","Local history groups","Vital record registrars","Wealthy local families","The Norwegian census bureau"
"In which year did the U.S. census record if someone was currently sick at the time of the census, and list what their specific ailment was?","1880","1900","1870","1910"
"Which state census asked for the full birth-names of every individual's father and mother?","1925 Iowa census","1876 Missouri census","1865 Illinois census","1901 Indiana census"
"Which Norwegian bygdebøker tend to have the most specific genealogical information?","Books published after 1960","Books published before 1960","Books from rural areas","Books from urban areas"
"In what year did the St. Louis Evening Post merge with the St. Louis Dispatch to become the St. Louis Post-Dispatch?","1878","1890","1848","1865"
"What year did the St. Louis Globe-Democrat newspaper cease publication?","1986","1975","1991","1989"
"What was the early modern term for a Jewish person who converted to Christianity?","converso","morisco","Benjamite","Nazirite"
"Who was the first mayor of St. Louis?","William Carr Lane","Daniel Page","John Fletcher Darby","Pierre Laclede"
"Which Spanish lieutenant governor oversaw the building of St. Louis's Fort San Carlos during the American Revolution?","Fernando de Leyba","Bernardo de Galvez","Francisco Cruzat","Pedro Piernas"
"Which of these counties is NOT part of the St. Louis Catholic Archdiocese?","St. Clair","Ste. Genevieve","St. Francois","Warren"
"Which of these types of genetic mutations are the most precise and useful for a genealogist?","SNP","STR","Y-STR","APOE"
"Who became the first Black mayor of St. Louis in 1993?","Freeman Bosley Jr.","Clarence Harmon","James F. Conway","Alfonso Cervantes"
"Who was the first governor of the state of Missouri?","Alexander McNair","William Clark","Frederick Bates","Bernardo de Galvez"
"In which year did the U.S. Census Bureau have to redo its enumeration of St. Louis due to concerns of inaccuracy in the first attempt?","1880","1890","1870","1900"
"St. Louis's 1916 housing segregation law prohibited Black people from moving into neighborhoods that were at least what percentage White?","75%","90%","50%","67%"
"Which 5 indigenous American groups were referred to as 'the Five Civilized Tribes'?","Cherokee, Chickasaw, Choctaw, Creek, Seminole","Caddo, Cherokee, Hopi, Iroquois, Muscogee","Apache, Inuit, Seminole, Sioux, Yaqui","Cayuga, Mohawk, Onondoga, Seneca, Wampanoag"
"In what year did the US Census Bureau officially add 'Indian' as a racial category on the census?","1870","1860","1850","1840"
"During what years were Native Americans recorded in the Dawes Rolls?","1898-1914","1901-1920","1879-1898","1893-1898"
"What was the first year that the U.S. census enumerated Native Americans in the Indian Territory?","1900","1910","1890","1880"
"Which organization keeps all of the records of the Dawes Commission?","NARA","US Census Bureau","Bureau of Indian Affairs","Library of Congress"
"In what year did the current Ellis Island immigration center open?","1900","1902","1898","1904"
"In what year did women start being naturalized as US citizens separately from their husbands?","1922","1930","1911","1906"
"What year did West Virginia secede from the state of Virginia?","1863","1864","1865","1866"
"From what point onward are surviving German church records most commonly available?","1648, following the end of the Thirty Years' War","1748, following the end of the War of the Austrian Succession","1763, following the end of the Seven Years' War","1815, following the end of the Napoleonic Wars"
"Which of these Missouri medical record books are NOT included in SLCL H&G's collection?","Board of Physicians Disciplinary Minutes, 1890-1899","Examination and Registration of Nurses, 1910-1912","Roster of Registered Nurses, 1930-1949","Missouri Board of Pharmacy, 1911-1972"
"Which of the following software are necessary to perform the Leeds Method on one's DNA results?","Excel/Google Sheets","Adobe Acrobat","RootsMagic","DNAPainter"
"In which year was construction completed on the St. Louis Gateway Arch?","1965","1967","1968","1963"
"Which of these German occupational terms do not indicate someone who worked in farming?","Metzger","Bauer","Ackermann","Landwirt"
"Which of these is NOT a criteria for listing a site with the National Register of Historic Places?","A petition signed by 500 local residents","Must have historical, architectural, and cultural significance","Association with an important event, person, or historical period","Must closely resemble its original historical appearance"
"Which of these German scripts was the predominant handwritten German script before 1900?","Kurrent","Fraktur","Sütterlin","Offenbacher"
"Which language calls its handwritten cursive form 'ktav'?","Hebrew","Russian","Polish","Greek"
"When was soccer first played in St. Louis?","1870s","1880s","1860s","1890s"
"The earliest patents in the United States were lost in a fire in which year?","1836","1812","1864","1890"
"What was the name of the magazine that was published for St. Louis-area high school students from 1947 to 1973?","Prom Magazine","Homecoming Magazine","Sophomoric Magazine","Fling Magazine"
"What other event happened in St. Louis in the same year as the 'Great Divorce' of St. Louis City from St. Louis County?","The opening of Forest Park","The World's Fair and Summer Olympics","The founding of Washington University","The completion of Eads Bridge"
"Which institution offers an online database with maps of how each county boundary changed in the U.S. over the years?","Newberry Library","Huntington Library","Washington University in St. Louis","National Genealogical Society"
"In what year was slavery formally abolished in the United States?","1865","1866","1867","1864"
"Which U.S. Supreme Court case affirmed the right of Native American groups to govern themselves and regulate their own affairs?","Worcester v. Georgia","United States v. Kagama","Cherokee Nation v. Georgia","Montana v. United States"
"Which of these is a prominent historical society maintaining French-Canadian ancestral archives?","La Société Généalogique Canadienne-Française","La Grande Société Historique de France","Le Dépôt Central Franco-Canadien","Les Archives de la Généalogie Canadienne-Française"
"Which act established civil registration for vital events in England and Wales?","The Marriage Act of 1836","The Poor Law Amendment Act of 1834","The Education Act of 1870","The Marriage Act of 1753"
"In which year did Sweden begin keeping systematic church records?","1686","1706","1776","1646"
"In which year did Denmark begin keeping systematic church records?","1645","1699","1601","1723"
"What is the Danish term for a probate inventory?","skifte","fødsel","ægteskab","død"
"In what year did civil registration of vital events begin in the Netherlands?","1811","1894","1772","1640"
"Who was the Jesuit priest who helped build support for the American Revolutionary cause among the French inhabitants of St. Louis?","Pierre Gibault","Michel Baudouin","Hyacinthe d'Avrigny","Aloysius Bellecius"
"Which president came to St. Louis to become the first U.S. president ever to fly in an airplane?","Theodore Roosevelt","William McKinley","William Howard Taft","Calvin Coolidge"
"What is the series of books compiled from 1765-1804, which record land grants in Missouri made by the French and Spanish governments?","Livre Terrein","Archives Territoriales","Recueil des Concessions Foncières","Registre Foncier du Missouri"
"What unit of land measurement was equivalent to about 3 miles in English units, or 84 square arpents in French units?","a league","a fathom","a plat","a parcel"
"Who was the trading post proprietor who canoed hundreds of miles down the Mississippi River to warn St. Louis of the impending British attack during the Revolutionary War?","Madame Honoré","Jean Baptiste Point du Sable","Oliver Pollock","Henry Hastings Sibley"
"What year did the state of Missouri begin keeping state-level birth and death registers?","1910","1880","1905","1892"
"In German Protestant christenings prior to the late 1800s, a baby was almost always named after its:","Baptism sponsor(s)","Parent","Grandparent","Officiating pastor"
"What is the name of the database you can use to look up the cause of death corresponding to the numerical code on most 20th-century civil death certificates?","International Classification of Diseases","AMA Database","Repository of Causes of Death","Physicians' Codes Manual"
"What year is printed on the state seal of Missouri?","1820","1821","1865","1776"
"Why is 1820 printed on the state seal of Missouri?","It was the year Missouri adopted its first constitution","It was the year Missouri became a state","It was the year Missouri first submitted its petition for statehood","It was the year the United States acquired the land that would become Missouri"
"Which of these is NOT one of the small, ethnically-German countries that existed before Germany became a single, unified state?","Friesland","Hessen-Kassel","Grand Duchy of Baden","Sachsen-Weimar-Eisenach"
"What year were roll-film cameras invented?","1888","1900","1837","1851"
"What year were Collodion photographs invented, resulting in exposure times that only took 2-3 seconds?","1851","1888","1837","1864"
"Which U.S. censuses include extant mortality schedules, which inquired about persons who had died in the year immediately preceding the census?","1850, 1860, 1870, and 1880","1860, 1870, 1880, 1900","1840, 1850, 1860, 1870","1870, 1880, 1900, 1910"
"Which university is providing free digital access to the records of the Diocese of Louisiana and the Floridas?","University of Notre Dame","Washington University in St. Louis","University of Chicago","Tulane University"
"What was the first institution of higher education for African Americans in the state of Missouri?","Lincoln University","Harris-Stowe State University","Philander Smith College","Lane College"
"What term means 'a condition of undetermined ownership, as of an estate that has not yet been assigned'?","abeyance","lis pendens","manse","primogeniture"
"What does the term 'entail' mean, in the context of probate records?","To restrict inheritance to a specific group of heirs","To add an heir to an estate who is not related by blood","The land/property/goods a wife brought into the marriage","A debt left outstanding by the deceased person"
"Which term means 'an inheritance having no limitations or conditions in its use'?","fee simple","instant","nuncupative","holograph"
"If a DNA test-taker has a 3,500 centimorgan match with another test-taker, what relationship must that necessarily be?","parent/child","full siblings","grandparent/grandchild","half siblings"
"If a DNA test-taker shares 1,600 centimorgans of DNA with their sibling, what does that indicate?","They are actually half-siblings","They are indeed full siblings","They are actually uncle/aunt and nephew/niece","They are identical twins"
"In German, what is a 'Rufname'?","The name (whether first or middle) that a person chose to be called by","An inherited farmstead","A traveling clergyman who performed sacraments in under-served areas","A letter authorizing a peasant to relocate from one area to another"
"What is an oral will declared or dictated out loud by a dying person that is afterwards put into writing by witnesses?","nuncupative will","unsolemn will","holographic will","cupative will"
"What does the archaic term 'octoroon' indicate?","That someone had one Black great-grandparent","That someone had one Black grandparent","That someone had two Black grandparents","That someone had one Black great-great-grandparent"
"What is the English translation of the German term 'Pfalz'?","Palatinate","Falls","Pomerania","Franconia"
"What was a 'quit rent'?","An annual fee a Virginian would pay to the King for the right to reside on and farm property","A fee a Floridian enslaved person would pay to emancipate themselves","The final rent payment a Missourian would pay in a rent-to-own arrangement","A fee a Native American tribe paid to the Massachusetts government to maintain peace"
"What does the term 'quod vide' mean in historical books?","see another part of the book","this individual is still living","page missing","page inserted later, after publication"
"Which letters are NOT included (i.e., they are represented by zero) in the WPA Soundex system?","Vowels and H, W, Y","H, W, Y","Vowels","H, J, W, Y"
"Which one of these surnames could the Soundex code 'S530' possibly indicate?","Smith","Stanley","Jones","Harris"
"In the WPA Soundex system, what happens if there are two of the same consonant in a row (as in 'Bennett')?","Treat double letters as a single letter","Each letter gets its own number","First pair of double letters gets 2 numbers, subsequent pairs get 1 number","Double letters are represented by the letter X"
"How many characters long must a WPA Soundex code always be?","4","3","5","can be anywhere between 3-5"
"What number represents vowels, or the letters H, W, or Y, in the WPA Soundex system?","0","7","9","a decimal, not a number"
"In the WPA Soundex system, what do you do with consonants beyond the fourth consonant?","Ignore them","Add a decimal point and continue assigning numbers for those consonants","Add a dash and continue assigning numbers for those consonants","Add a letter X and then continue assigning numbers for those consonants"
"In the WPA Soundex system, what do you do with surnames that begin with 'Mc' or 'Mac'?","Represent the prefix as M2","Ignore the Mc/Mac","Represent the prefix as M5","Represent the prefix as C5"
"In the WPA Soundex system, the letters C, G, J, K, Q, S, X, and Z, all get assigned which number?","2","1","5","6"
"What does the archaic term 'white rent' mean?","Rent that must be paid in silver","Rent that could be paid in paper bank notes","A payment an enslaved person made toward their own emancipation","A payment a free white person made toward an enslaved person's emancipation"
"What is a writ of attachment?","Court order authorizing seizure of property to pay debts/costs","Court order introducing a newly discovered written will to a previous probate case","Court order adding a new heir to an inheritance case","Court order substituting a new administrator/executor for a deposed one in a probate case"
`;
Papa.parse(csvData4, {
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
        csvDataArray4 = results.data;
        console.log('Parsed CSV Data:', results.data);
    },
    error: function(error) {
        console.error('Error parsing CSV:', error);
    }
});
// Link the "Home Run" Difficulty-Level Questions and Answers CSV data to this app

csvDataArraysArray = [csvDataArray1, csvDataArray2, csvDataArray3, csvDataArray4];
// Create an array of the four csvDataArray's

const playBall = () => {
    console.log("Play ball!");

    document.getElementById("turns-max").innerHTML = maxTurns; // apply the value of maxTurns to the appropriate div in the DOM
    updateHalfInning();
}
// Make the swing options appear, and start a new half-inning to kick off the game

swingOptionsDiv.style.display = "none";
questionsDiv.style.display = "none";
// hide the Swing Options and Questions divs by default (i.e., when first loading up the app)

for ( let i = 0; i < availableTeammates.length; i++ ) {
    if ( i > 0 && i % 5 === 0 ) { // do the following after every iteration that is divisible by 5, except for the first (0th) iteration
        document.getElementById("players-grid").innerHTML += `<br>`; // add a line break after every 5 iterations
    }
    document.getElementById("players-grid").innerHTML += `
        <div class="available-player" id="available-player-${i}">
            <img src="${availableTeammates[i]}" width="${imgWidthResize}px" height="${imgHeightResize}px"></img>
            <strong>${availableTeammates[i].match(/\w+(?=\s+front\.png)/)}</strong>
        </div>
    `
    // in the above .match method, the function is looking at the string inside of the current index position of the availableTeammates 
    // array, and is calling .match(/ /) on that string, and looking for the word (as denoted by "\w+") that comes before the
    // thing (as denoted by the parentheses "()") that includes a positive look-ahead (as denoted by "?=") to an empty space (as
    // denoted by "\s+") followed immeditely by "front.png" (as denoted by "front\.png" with the "\" escaping the ".")
}
// run through all of the sprite filepaths in the availableTeammates array and display them in rows of 5 in the players-grid div

document.getElementById("players-grid").addEventListener("click", (event) => { // add an event listener on the element with the "players-grid" id
    if ( event.target.closest(".available-player") ) { // if the user clicks something with the class "available-player"...
        const playerDiv = event.target.closest('.available-player'); // then put that clicked thing into a constant called playerDiv
        console.log(`You clicked on: ${playerDiv.id}`); // see what the id number (array index number) of that particular player is
        let checkmark = playerDiv.querySelector(".checkmark"); // find the first element with the class "checkmark" within playerDiv and assign it to the variable checkmark (or null if not found)
        if ( checkmark ) { // if the checkmark variable is truthy (has something in it, and is not empty)...
            rosters = rosters.filter(playerId => playerId !== playerDiv.id); // then set the contents of the rosterTeam2 array to be a filtered version of itself in which each item in the array (the name "playerId" being an arbitrary name for each item in the array) is NOT equal to the id of the clicked playerDiv (in other words remove the item with that particular id from the rosterTeam2 array)
            playerDiv.removeChild(checkmark); // remove the checkmark as a "child" of the current playerDiv
            console.log("rosters contains " + rosters);
        } else {
            rosters.push(`${playerDiv.id}`); // add the clicked player to the end of the rosterTeam2 array
            checkmark = document.createElement("span"); // set checkmark to be a span element created in the document
            checkmark.classList.add("checkmark"); // add the class "checkmark" to checkmark
            checkmark.textContent = "✔"; // set the text content of checkmark to be ✔
            playerDiv.appendChild(checkmark); // append checkmark as a "child" of the current playerDiv
            checkmark.style.display = "block"; // make the checkmark visible
            console.log("rosters contains " + rosters);
        }
    }
});
// When the user clicks on a player, it adds them to the user's team and displays a checkmark over the player's sprite.
// If the user clicks an already checkmarked sprite, the player is removed from the user's team and the checkmark disappears.

rosterSaveButton.addEventListener("click", () => {
    if ( team2RosterReady === false ) {
        team2Name = document.getElementById("team-name-input").value;
    } 
    if ( team2RosterReady === true ) {
        team1Name = document.getElementById("team-name-input").value;
    }

    if ( team2RosterReady === false && rosters.length === 5 && team2Name ) {
        document.getElementById("choose-players-message").textContent = "GREAT! NOW CHOOSE 5 PLAYERS FOR THE SECOND TEAM:";
        team2RosterReady = true;
        const pickedPlayers = document.querySelectorAll(".available-player .checkmark"); // Select all checkmarks
        pickedPlayers.forEach((eachCheckmark) => {
            const playerDiv = eachCheckmark.closest('.available-player'); // Find the closest playerDiv
            if (playerDiv) {
                playerDiv.remove(); // Remove the entire playerDiv
            }
        });
        
        document.getElementById("team-name-input").value = "";
    } else if ( team2RosterReady === false && rosters.length !== 5 && !team2Name ) {
        alert(`You have picked ${rosters.length} players. Your team should have 5 players. Also, don't forget to name the team.`);
    } else if ( team2RosterReady === false && rosters.length !== 5 && team2Name ) {
        alert(`You have picked ${rosters.length} players. Your team should have 5 players.`);
    } else if ( team2RosterReady === false && rosters.length === 5 && !team2Name ) {
        alert("You still need to name the team!"); 
    } else if ( team2RosterReady === true && rosters.length === 10 && team1Name ) {
        document.getElementById("noninteractive-display-div").style.display = "flex";
        document.getElementById("team1-name").innerHTML = team1Name.toUpperCase();
        document.getElementById("team2-name").innerHTML = team2Name.toUpperCase();
        teamNamesChosen = true;
        document.getElementById("choose-players").style.display = "none";
        playBall();
    } else if ( team2RosterReady === true && rosters.length !== 10 && !team1Name ) {
        alert(`You have picked ${rosters.length - 5} players. Your team should have 5 players. Also, don't forget to name the team.`);
    } else if ( team2RosterReady === true && rosters.length !== 10 && team1Name ) {
        alert(`You have picked ${rosters.length - 5} players. Your team should have 5 players.`);
    } else if ( team2RosterReady === true && rosters.length === 10 && !team1Name ) {
        alert("You still need to name the team!");
    }
});
// Check if the team rosters consist of 5 players each, and if they do, allow the game to proceed

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

const updateAtBatCount = () => {
    window[`atBatTeam${whichTeamAtBat}`]++; // increase the at-bat count of the current team by 1
    document.getElementById("at-bat-counter").innerHTML = window[`atBatTeam${whichTeamAtBat}`]; // apply the value of the current team's at-bat count to the appropriate div in the DOM
}

function getValueByIndex(data, rowIndex, columnIndex) {
    if (rowIndex < data.length && columnIndex < Object.keys(data[0]).length) { // Check if the rowIndex and columnIndex are within bounds
        const row = data[rowIndex];
        const columnName = Object.keys(row)[columnIndex]; // Get the column name from the index
        return row[columnName]; // Return the value at the specified row and column
    }
    return null; // Return null if indices are out of bounds
}
// function to get a certain question-and-answer set (i.e., a certain row) from the CSV data

function addImageAtPosition(x, y, imageUrl, width, height) {
    // Get the large div by its ID
    const largeDiv = document.getElementById("baseball-diamond");

    // Create an img element
    const img = document.createElement("img");
    img.src = imageUrl; // Set the image source (URL or relative path)
    img.alt = "Positioned Image"; // Add alt text

    // Set the style for positioning the image
    img.style.position = "absolute";
    img.style.left = `${x}px`; // X position (horizontal)
    img.style.top = `${y}px`;  // Y position (vertical)

    // Increase the size of the image
    img.style.width = `${width}px`;
    img.style.height = `${height}px`;

    // Append the image to the large div
    largeDiv.appendChild(img);

    return img;
}

function moveImageOverTime(image, startX, startY, endX, endY, duration) {
    return new Promise((resolve) => {
        const startTime = performance.now(); // Get the start time

        function animate(time) {
            const elapsedTime = time - startTime;
            const progress = Math.min( elapsedTime / duration, 1 ) // Math.min returns whichever is smaller: the ratio of elapsedTime / duration (which could be as small as 0/5000 when the animation first starts, or as big as 5000/5000 or higher at the end of the animation), or the number 1 (which is equal to 5000/5000). This makes sure that the progress value of the animation never goes beyond 1 (which should be the end point for an animation).

            // the below calculates the current position of the img using linear interpolation
            const currentX = startX + (endX - startX) * progress; // This calculates the range from startX to endX (i.e., the number of pixels the img needs to traverse on the X axis), multiples that range by the current progress ratio, and then adds the number of pixels the img has so far traversed on the X axis to the absolute pixel position where the img started on the X axis -- this gives us the current absolute pixel position of the img on the X axis
            const currentY = startY + (endY - startY) * progress; // This does the same as the above line but for the Y axis

            // the below actually updates the image's displayed position
            image.style.left = `${currentX}px`;
            image.style.top = `${currentY}px`;

            // if the animation is not complete, the below requests the next animation frame
            if ( progress < 1 ) {
                requestAnimationFrame(animate);
            } else {
                resolve(); // Resolve the promise when the animation is complete
            }
        }

        // the below starts the animation from the beginning
        requestAnimationFrame(animate);
    });
}

/*
    // Call the function to place images at coordinates and increase the size
    addImageAtPosition(165, 110, `${availableTeammates[0]}`, 70, 70); // send defensive player to pitcher's mound
    addImageAtPosition(305, 100, `${availableTeammates[8]}`, 70, 70); // send defensive player to 1st base
    addImageAtPosition(165, -25, `${availableTeammates[6]}`, 70, 70); // send defensive player to 2nd base
    addImageAtPosition(70, 20, `${availableTeammates[5]}`, 70, 70); // send defensive player to short stop
    addImageAtPosition(25, 100, `${availableTeammates[7]}`, 70, 70); // send defensive player to 3rd base
    addImageAtPosition(135, 275, `${availableTeammates[4]}`, 70, 70); // send offensive player to home plate
    addImageAtPosition(290, 125, `${availableTeammates[3]}`, 70, 70); // send offensive player to 1st base
    addImageAtPosition(160, 0, `${availableTeammates[2]}`, 70, 70); // send offensive player to 2nd base
    addImageAtPosition(40, 125, `${availableTeammates[1]}`, 70, 70); // send offensive player to 3rd base
*/

const updateHalfInning = async () => {
    if ( inning < 10 || (inning === 10 && whichTeamAtBat === 2) ) {

        if ( inning !== 0 ) {
            await Promise.all([
                moveImageOverTime(playerImages.firstBaseman, 305, 100, -80, 400, runSpeed),
                moveImageOverTime(playerImages.pitcher, 165, 110, -100, 400, runSpeed),
                moveImageOverTime(playerImages.secondBaseman, 165, -25, -120, 400, runSpeed),
                moveImageOverTime(playerImages.shortstop, 70, 20, -140, 400, runSpeed),
                moveImageOverTime(playerImages.thirdBaseman, 25, 100, -160, 400, runSpeed)
            ]);

            // After the players have moved back to the "dugout" area, remove their images from the DOM
            playerImages.firstBaseman.remove();
            playerImages.pitcher.remove();
            playerImages.secondBaseman.remove();
            playerImages.shortstop.remove();
            playerImages.thirdBaseman.remove();
        }

        if ( whichTeamAtBat === 2 ) {
            modifier = 5; // if the second team is at bat and the first team is defending, send teammates 0-4 into defensive positions on the field
        } else if ( whichTeamAtBat === 1 ) {
            modifier = 0; // otherwise, if the first team is at bat and the second team is defending, send teammates 5-9 into defensive positions on the field
        }

        playerImages.firstBaseman = addImageAtPosition(-80, 400, `${availableTeammates[1 + modifier]}`, imgWidthResize, imgHeightResize);
        playerImages.pitcher = addImageAtPosition(-100, 400, `${availableTeammates[0 + modifier]}`, imgWidthResize, imgHeightResize);
        playerImages.secondBaseman = addImageAtPosition(-120, 400, `${availableTeammates[2 + modifier]}`, imgWidthResize, imgHeightResize);
        playerImages.shortstop = addImageAtPosition(-140, 400, `${availableTeammates[3 + modifier]}`, imgWidthResize, imgHeightResize);
        playerImages.thirdBaseman = addImageAtPosition(-160, 400, `${availableTeammates[4 + modifier]}`, imgWidthResize, imgHeightResize);
        // If player images have not been created yet, then create them at their starting (i.e. dugout) positions

        await Promise.all([
            moveImageOverTime(playerImages.firstBaseman, -80, 400, 305, 100, runSpeed),
            moveImageOverTime(playerImages.pitcher, -100, 400, 165, 110, runSpeed),
            moveImageOverTime(playerImages.secondBaseman, -120, 400, 165, -25, runSpeed),
            moveImageOverTime(playerImages.shortstop, -140, 400, 70, 20, runSpeed),
            moveImageOverTime(playerImages.thirdBaseman, -160, 400, 25, 100, runSpeed)
        ]);
        // Move the players to their field positions

        whichBatterAtBat = 5 - modifier;
        playerImages.batter = addImageAtPosition(-60, 400, `${availableTeammates[whichBatterAtBat]}`, imgWidthResize, imgHeightResize);
        await Promise.all([
            moveImageOverTime(playerImages.batter, -60, 400, 135, 275, runSpeed)
        ]);
        // Create an image for the new batter and then move them up to batting position

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
        dontCallSwingOptionsAppear = false;
        swingOptionsAppear(); // make the 4 swing option buttons re-appear
    } else if ( inning === 10 && whichTeamAtBat === 1 ) {
        document.getElementById("game-over").style.display = "block";
        if ( team1RunsTotal === team2RunsTotal ) {
            document.getElementById("game-results").textContent = "The game ended in a tie!";
        } else if ( team1RunsTotal > team2RunsTotal ) {
            document.getElementById("game-results").textContent = `${team1Name} won the game!`;
        } else if ( team2RunsTotal > team1RunsTotal ) {
            document.getElementById("game-results").textContent = `${team2Name} won the game!`;
        }
        
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

        pickARandomQuestion(1);
        answerOrderRandomizer(1);

    } else if ( power === double) {
        console.log("You swung for a double!");

        pickARandomQuestion(2);
        answerOrderRandomizer(2);

    } else if ( power === triple ) {
        console.log("You swung for a triple!");

        pickARandomQuestion(3);
        answerOrderRandomizer(3);

    } else if ( power === homerun ) {
        console.log("You swung for a home run!");

        pickARandomQuestion(4);
        answerOrderRandomizer(4);

    }
}
// based on the chosen hit power, ask a different category of question

const pickARandomQuestion = (swingStrength) => {
    chosenCsvDataArray = csvDataArraysArray[swingStrength - 1];
    csvRow = (Math.round(Math.random() * (chosenCsvDataArray.length - 1)));
    document.getElementById("question").textContent = getValueByIndex(chosenCsvDataArray, csvRow, 0);
}
// Count how many questions are in the CSV data, generate a random number within that range (1-to-max), get the question data (i.e., first column) from that row number in the CSV data

const answerOrderRandomizer = (swingStrength) => {
    chosenCsvDataArray = csvDataArraysArray[swingStrength - 1];
    let whichCol = Math.ceil(Math.random() * 4); // A random number between 1 and 4 is picked
    document.getElementById("answer-1-text").textContent = getValueByIndex(chosenCsvDataArray, csvRow, whichCol); // Which ever column (answer text) corresponds to that number goes into the answer-1-text <span>
    for ( let i = 2; i <= 4; i++ ) { // Start with the number 2, and iterate up through 4
        if ( whichCol === 1 ) { // If the answer in the 1st column (i.e., the 1st answer text) was chosen previously, then...
            whichCol = 4; // Get the answer in the 4th column...
            document.getElementById(`answer-${i}-text`).textContent = getValueByIndex(chosenCsvDataArray, csvRow, whichCol); // And put the 4th answer text into the current i value's <span>
        } else { // If the answer in the 1st column (i.e., the 1st answer text) was NOT chosen previously, then...
            whichCol -= 1; // Get the answer in the "previous-number-minus-one"th column...
            document.getElementById(`answer-${i}-text`).textContent = getValueByIndex(chosenCsvDataArray, csvRow, whichCol); // And put the answer text from that number's column into the current i value's <span>
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
    } else if (selectedRadio.nextElementSibling.textContent === getValueByIndex(chosenCsvDataArray, csvRow, 1)) {
        console.log("You chose correctly!");
        hitSFX.play();
        updateBasesOccupied(); // make sure that the appropriate bases get occupied or vacated depending on which bases were currently occupied + the power of the hit
        updateHitsCount(); // if the text content next to the selected radio button matches the text content of column 1 in the current csvDataArray row, then call the updateHitsCount function

        if ( dontCallSwingOptionsAppear === false ) {
            swingOptionsAppear();
        }
    } else if (selectedRadio && selectedRadio.nextElementSibling.textContent !== getValueByIndex(chosenCsvDataArray, csvRow, 1)) {
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
        alert("dontCallSwingOptionsAppear is getting set to true now");
        dontCallSwingOptionsAppear = true;
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