var trueTruthQuestions = [];
var truthQuestions = [];
var dares = [];

let histroy = "";
let tempTruthArray = [];
let current = [];
let alowedArray = [];
let idCount = [];
let count = 0;

let lorR = ["left", "right"];
let number = ["1st", "2nd", "3rd", "4th", "5th"];
let social = ["Snapchat", "Instagram", "Messenger"];
let pic = ["foot picture", "face picture", "floor picture", "animal picture"];
let bPart = ["foot", "face", "back", "arm", "stomach"];
let drawPart = ["foot", "hand", "mouth"];
let marker = ["marker"];
let exercise = ["100", "50", "30", "20", "10"];

let removeDirections = false;
let removeSexualTruth = false;
let removeAlcoDares = false;
let extraAction = false;

let lazyHistory1 = "";
let lazyHistory2 = "";

function togglePack(pack, checkboxState) {
	truthQuestions = [];
	if (alowedArray.includes(pack)) {
		alowedArray = alowedArray.filter(e => e !== pack);
	} else {
		alowedArray.push(pack);
	}
	trueTruthQuestions.forEach(question => {
		if (!idCount.includes(question.ID) && alowedArray.includes(question.Pack_Name))
			truthQuestions.push(question);
	})
	tempTruthArray = truthQuestions;
	console.log(pack, checkboxState);
	console.log(truthQuestions)
}

function setup() {
	//Get questions from online database 
	fetch(
		"https://opensheet.elk.sh/1x2XTfl7N_mYvOYELSsf2KlGOjVFfWKMYKWIIVGcbM0Q/Dare"
	)
		.then((res) => res.json())
		.then((data) => {

			dares = data;

		});


	fetch(
		"https://opensheet.elk.sh/1x2XTfl7N_mYvOYELSsf2KlGOjVFfWKMYKWIIVGcbM0Q/Truth"
	)
		.then((res) => res.json())
		.then((data) => {

			let tempArray = [];
			data.forEach((row) => {
				if (!tempArray.includes(row.Pack_Name) && row.Pack_Name.length > 2) {
					//Add checkbox packs
					tempArray.push(row.Pack_Name);
				}
			});
			tempArray.sort(function (a, b) {
				var nameA = a.toLowerCase(), nameB = b.toLowerCase();
				if (nameA < nameB) //sort string ascending
					return -1;
				if (nameA > nameB)
					return 1;
				return 0; //default return value (no sorting)
			});

			tempArray.forEach(element => {
				document.getElementById('packs-checks').insertAdjacentHTML("beforebegin", `<input type="checkbox" id="${element}" name="${element}" value="${element}"><label for="${element}" style="display: inline;"> - ${element}</label><br>`)
				document.getElementById(element).checked = true;
				document.getElementById(element).onclick = function () { togglePack(`${element}`, this.checked) };
			});

			trueTruthQuestions = data;
			truthQuestions = trueTruthQuestions;
		});

	//Shows the js has loaded
	document.getElementById('historyTEXT').innerHTML = "History will show bellow";
	document.getElementById('truthText2').innerHTML = "Click Next Question To Start";
	document.getElementById('dareText').innerHTML = "Click Next Question To Start";

	//Setup checkbox functionality (this was done lazy)
	document.getElementById('removeAlcoDares').onclick = function () { removeAlcoDares = this.innerText; };
	document.getElementById('removeSexualTruth').onclick = function () { removeSexualTruth = this.checked; };
	document.getElementById('removeDirections').onclick = function () { removeDirections = this.checked; };
	document.getElementById('resetIdCounter').onclick = function () { document.getElementById("resetLable").innerHTML = " - Reset Question Counter 💚"; idCount = []; document.getElementById("resetIdCounter").checked = false; };
	document.getElementById("removeAlcoDares").checked = false;
	document.getElementById("removeSexualTruth").checked = false;
	document.getElementById("removeDirections").checked = false;
}

function addHistory(addme) { lazyHistory2 = lazyHistory1; lazyHistory1 = addme; }

function getQuestionData() {
	document.getElementById("resetLable").innerHTML = " - Reset Question Counter 🔴";
	var lorRNumber = Math.floor(Math.random() * lorR.length);
	var numberNumber = Math.floor(Math.random() * number.length);
	var socialNumber = Math.floor(Math.random() * social.length);
	var picNumber = Math.floor(Math.random() * pic.length);
	var bPartNumber = Math.floor(Math.random() * bPart.length);
	var drawPartNumber = Math.floor(Math.random() * drawPart.length);
	var markerNuumber = Math.floor(Math.random() * marker.length);
	var exerciseNumber = Math.floor(Math.random() * exercise.length);

	if (tempTruthArray.length < 1) {
		tempTruthArray.push.apply(tempTruthArray, truthQuestions);
		console.log("Reset");
	}

	let chosenTruth = null;
	let removedE = null;
	let sexual = null;
	let chosenDare = null;
	let alcohol = null;

	if (tempTruthArray.length > 0) {
		count++;

		let foundTruth = false;
		let foundDare = false;
		let random100 = Math.floor(Math.random() * 100);

		while (foundTruth == false) {
			chosenTruth = Math.floor(Math.random() * tempTruthArray.length);
			removedE = tempTruthArray.splice(chosenTruth, 1);
			sexual = !(removedE[0].isSexual == ".");
			current = removedE[0];
			//if true then dont allow
			if ((sexual == true && removeSexualTruth == false) || sexual == false) { foundTruth = true; }
		}
		while (foundDare == false) {
			chosenDare = Math.floor(Math.random() * dares.length);
			alcohol = dares[chosenDare].isAlcohol == "y";
			sexual = dares[chosenDare].isSexual == "y";
			if (((alcohol == true && removeAlcoDares == false) || alcohol == false) && (sexual == true && removeSexualTruth == false) || sexual == false) { foundDare = true; }
		}

		if (removedE[0].pAction == ".") { random100 = 101; }

		let randBaseText = "Tell everyone"
		if (removeDirections == false) {
			let randBase = Math.floor(Math.random() * removedE[0].Type.split(",").length);
			randBaseText = removedE[0].Type.split(",")[randBase];
			if (randBaseText == null || randBaseText == "undefined") {
				console.log("Shit was null")
				randBaseText = "Tell everyone"
			}
		}

		idCount.push(removedE[0].ID);

		let finalDare = dares[chosenDare].Dares.replace("%LorR", lorR[lorRNumber]).replace("%number", number[numberNumber]).replace("%social", social[socialNumber]).replace("%pic", pic[picNumber]).replace("%bPart", bPart[bPartNumber]).replace("%drawPart", drawPart[drawPartNumber]).replace("%marker", marker[markerNuumber]).replace("%exercise", exercise[exerciseNumber]);
		let finalQuestion = randBaseText + " " + removedE[0].Base;
		if (removedE[0].Base[0] == ",")
			finalQuestion = randBaseText.trim() + removedE[0].Base;

		addHistory("\nPrompt: " + count + "\n\tTruth:\n\t\t" + finalQuestion + "\n\tDare:\n\t\t" + finalDare + "\n");
		document.getElementById("dareText").innerText = finalDare;
		document.getElementById("truthText2").innerText = finalQuestion;
		document.getElementById("historyTEXT").innerHTML = lazyHistory1 + lazyHistory2;

		if (removedE[0].pAction < random100) {
			alert(removedE[0].Action);
			document.getElementById("nextText").innerText = removedE[0].Action;
			extraAction = true;
		}
		else {
			document.getElementById("nextText").innerText = "Next Question";
		}
	}
}

function randInRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function run() {
	if (extraAction) {
		extraAction = false;
		document.getElementById("nextText").innerText = "Next Question";
	} else {
		getQuestionData();
	}
}
function help() {
	if (current.Description == "")
		alert("Sorry chief you're on your own for this one");
	else
		alert(current.Description);
}