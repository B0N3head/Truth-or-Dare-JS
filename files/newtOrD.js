var trueTruthQuestions = [];
var truthQuestions = [];
var dares = [];

let tempTruthArray = [];
let current = [];
let allowedArray = [];
let idCount = [];
let count = 0;

let lorR = ["left", "right"];
let number = ["1st", "2nd", "3rd", "4th", "5th"];
let social = ["Snapchat", "Instagram", "Messenger"];
let bPart = ["foot", "face", "back", "arm", "stomach"];
let drawPart = ["foot", "hand", "mouth"];
let exercise = ["100", "50", "30", "20", "10"];

let removeDirections = false;
let desktopText = false;
let removeSexualTruth = false;
let removeAlcoDares = false;

let lazyHistory1 = "";
let lazyHistory2 = "";

function togglePack(pack, checkboxState) {
	truthQuestions = [];
	if (allowedArray.includes(pack)) {
		allowedArray = allowedArray.filter(e => e !== pack);
	} else {
		allowedArray.push(pack);
	}
	trueTruthQuestions.forEach(question => {
		if (!idCount.includes(question.ID) && allowedArray.includes(question.Pack_Name))
			truthQuestions.push(question);
	})
	tempTruthArray = truthQuestions;
}

function setup() {
	//Get questions from online database
	fetch("https://opensheet.elk.sh/1x2XTfl7N_mYvOYELSsf2KlGOjVFfWKMYKWIIVGcbM0Q/NewDares").then((res) => res.json()).then((data) => { dares = data; });


	fetch("https://opensheet.elk.sh/1x2XTfl7N_mYvOYELSsf2KlGOjVFfWKMYKWIIVGcbM0Q/NewTruth")
		.then((res) => res.json())
		.then((data) => {
			
			let tempArray = [];
			let total = 0;

			data.forEach((row) => {
				total++;
				//Add checkbox pack data to lists
				if (!tempArray.includes(row.group) && row.group.length > 2) {
					tempArray.push(row.group);
				}
			});

			setText("qpack", `Question Packs (${total} Questions)`);

			//Sort list alpha ascending
			tempArray.sort(function (a, b) {
				var nameA = a.toLowerCase(), nameB = b.toLowerCase();
				if (nameA < nameB)
					return -1;
				if (nameA > nameB)
					return 1;
				return 0;
			});

			//Create checkboxes and set interactions
			tempArray.forEach(element => {
				let aCount = 0;
				data.forEach((row) => {
					if (row.group == element) {
						aCount++;
					}
				});
				document.getElementById('pack-lists').insertAdjacentHTML("beforebegin", `<span class="nowrap"><input type="checkbox" title=${count} id="${element}" name="${element}" value="${element}"><label for="${element}" style="display: inline;"> - ${element}</label></span>  `)
				document.getElementById(element).checked = false;
				document.getElementById(element).onclick = function () { togglePack(`${element}`, this.checked) };
			});

			trueTruthQuestions = data;
			truthQuestions = trueTruthQuestions;
		});

	//Shows the js has loaded
	setText('historyTEXT', "History will show bellow");
	setMultiText(['truthText', 'dareText', 'truthText2', 'dareText2'], "Click \"Next\" to Start");

	//Setup checkbox functionality (this was done lazy)
	document.getElementById('desktopText').onclick = function () { desktopText = !desktopText; if (desktopText) { displayForm("desktopText"); closeForm("mobileText"); } else { closeForm("desktopText"); displayForm("mobileText"); } };
	document.getElementById('removeAlcoDares').onclick = function () { removeAlcoDares = this.innerText; };
	document.getElementById('removeSexualTruth').onclick = function () { removeSexualTruth = this.checked; };
	document.getElementById('removeDirections').onclick = function () { removeDirections = this.checked; };
	document.getElementById('resetIdCounter').onclick = function () { document.getElementById("resetLable").innerHTML = " - Reset Question Counter 💚"; idCount = []; document.getElementById("resetIdCounter").checked = false; };
	document.getElementById("removeAlcoDares").checked = false;
	document.getElementById("removeSexualTruth").checked = false;
	document.getElementById("removeDirections").checked = false;
}

function displayForm(className) {
	document.getElementsByClassName(className)[0].style.display = "inherit";
}

function setMultiText(id, string) {
	id.forEach(element => {
		setText(element, string);
	});
}

function closeForm(className) {
	document.getElementsByClassName(className)[0].style.display = "none";
}

function addHistory(addMe) { lazyHistory2 = lazyHistory1; lazyHistory1 = addMe; }

function getQuestionData() {

	document.getElementById("resetLable").innerHTML = " - Reset Question Counter 🔴";

	if (tempTruthArray.length < 1) {
		tempTruthArray.push.apply(tempTruthArray, truthQuestions);
		console.log("Reset");
	}


	if (tempTruthArray.length > 0) {
		count++;

		let foundTruth = false;
		let chosenTruth = null;
		let removedE = null;
		let sexual = null;
		while (foundTruth == false) {
			chosenTruth = Math.floor(Math.random() * tempTruthArray.length);
			removedE = tempTruthArray.splice(chosenTruth, 1);
			sexual = removedE[0].sexual == 1;
			current = removedE[0];

			//if true then don't allow
			if ((sexual == true && removeSexualTruth == false) || sexual == false) { foundTruth = true; }
		}

		let foundDare = false;
		let alcohol = null;
		let chosenDare = null;
		while (foundDare == false) {
			chosenDare = Math.floor(Math.random() * dares.length);
			alcohol = dares[chosenDare].isAlcohol == 1;
			sexual = dares[chosenDare].isLewd == 1;
			if (((alcohol == true && removeAlcoDares == false) || alcohol == false) && (sexual == true && removeSexualTruth == false) || sexual == false) { foundDare = true; }
		}

		let randBaseText = "Tell everyone"
		if (removeDirections == false) {
			randBaseText = ["Tell everyone", "Tell the person to your left", "Tell the person to your right", "Tell the person opposite to you"][Math.floor(Math.random() * 4)];
		}

		//Add id to the list
		idCount.push(removedE[0].ID);

		//Setup the string for the dare and question
		let finalDare = dares[chosenDare].Dares
			.replace("%LorR", lorR[Math.floor(Math.random() * lorR.length)])
			.replace("%number", number[Math.floor(Math.random() * number.length)])
			.replace("%social", social[Math.floor(Math.random() * social.length)])
			.replace("%bPart", bPart[Math.floor(Math.random() * bPart.length)])
			.replace("%drawPart", drawPart[Math.floor(Math.random() * drawPart.length)])
			.replace("%exercise", exercise[Math.floor(Math.random() * exercise.length)]);

		let finalQuestion = randBaseText + " " + removedE[0].prompt;

		if (removedE[0].prompt[0] == ",")
			finalQuestion = randBaseText + removedE[0].prompt;

		setMultiText(['dareText', 'dareText2'], finalDare);
		setMultiText(['truthText', 'truthText2'], finalQuestion);
		setText("historyTEXT", lazyHistory1 + lazyHistory2);

		addHistory(`\nPrompt: ${count}\n\tTruth:\n\t\t${finalQuestion}\n\tDare:\n\t\t${finalDare}\n`);
	}
}

function setText(id, text) { 
	document.getElementById(id).innerText = text; 
}

function randInRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function run() {
	getQuestionData();
}

function help() {
	if (current.quote == ".")
		alert("Sorry chief you're on your own for this one");
	else
		alert(current.quote);
}
