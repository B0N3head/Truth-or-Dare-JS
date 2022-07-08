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
let pic = ["foot", "face", "floor", "animal"];
let bPart = ["foot", "face", "back", "arm", "stomach"];
let drawPart = ["foot", "hand", "mouth"];
let exercise = ["100", "50", "30", "20", "10"];

let removeDirections = false;
let desktopText = false;
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
}

function setup() {
	//Get questions from online database 
	fetch("https://opensheet.elk.sh/1x2XTfl7N_mYvOYELSsf2KlGOjVFfWKMYKWIIVGcbM0Q/Dare").then((res) => res.json()).then((data) => { dares = data; });


	fetch("https://opensheet.elk.sh/1x2XTfl7N_mYvOYELSsf2KlGOjVFfWKMYKWIIVGcbM0Q/NewTruth")
		.then((res) => res.json())
		.then((data) => {
			let total = 0;
			data.forEach((row) => {
				total++;
			});
			document.getElementById('pack-lists').insertAdjacentHTML("beforebegin", `<label style="display: inline;">Loaded ${total} questions</label>`)
			// let tempArray = [];
			// let total = 0;
			// data.forEach((row) => {
			// 	total++;
			// 	//Add checkbox pack data to lists
			// 	if (!tempArray.includes(row.Pack_Name) && row.Pack_Name.length > 2) { tempArray.push(row.Pack_Name); }
			// });

			// document.getElementById("qpack").innerText = `Question Packs (${total} Questions)`;
			// //Sort list alpha ascending
			// tempArray.sort(function (a, b) {
			// 	var nameA = a.toLowerCase(), nameB = b.toLowerCase();
			// 	if (nameA < nameB)
			// 		return -1;
			// 	if (nameA > nameB)
			// 		return 1;
			// 	return 0;
			// });

			// //Create checkboxes and set interactions
			// tempArray.forEach(element => {
			// 	let count = 0;
			// 	data.forEach((row) => {
			// 		if (row.Pack_Name == element) {
			// 			count++;
			// 		}
			// 	});
			// 	document.getElementById('pack-lists').insertAdjacentHTML("beforebegin", `<span class="nowrap"><input type="checkbox" title=${count} id="${element}" name="${element}" value="${element}"><label for="${element}" style="display: inline;"> - ${element}</label></span>  `)
			// 	document.getElementById(element).checked = false;
			// 	document.getElementById(element).onclick = function () { togglePack(`${element}`, this.checked) };
			// });

			trueTruthQuestions = data;
			truthQuestions = trueTruthQuestions;
		});

	//Shows the js has loaded
	inText('historyTEXT', "History will show bellow");
	inText('truthText2', "Click Next Question To Start");
	inText('dareText', "Click Next Question To Start");

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
function closeForm(className) {
	document.getElementsByClassName(className)[0].style.display = "none";
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
	var exerciseNumber = Math.floor(Math.random() * exercise.length);

	if (tempTruthArray.length < 1) {
		tempTruthArray.push.apply(tempTruthArray, trueTruthQuestions);
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

		while (foundTruth == false) {
			chosenTruth = Math.floor(Math.random() * tempTruthArray.length);
			removedE = tempTruthArray.splice(chosenTruth, 1);
			sexual = !(removedE[0].sexual == "0");
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


		let randBaseText = "Tell everyone"
		if (removeDirections == false) {
			randBaseText = ["Tell everyone", "Tell the person to your left", "Tell the person to your right", "Tell the person opposite to you"][Math.floor(Math.random() * 4)];

		}

		//Add id to the list
		idCount.push(current.id);

		//Setup the string for the dare and question
		let finalDare = dares[chosenDare].Dares.replace("%LorR", lorR[lorRNumber]).replace("%number", number[numberNumber]).replace("%social", social[socialNumber]).replace("%pic", pic[picNumber] + "picture").replace("%bPart", bPart[bPartNumber]).replace("%drawPart", drawPart[drawPartNumber]).replace("%exercise", exercise[exerciseNumber]);
		let finalQuestion = randBaseText + " " + current.prompt;

		if (current.prompt[0] == ",")
			finalQuestion = randBaseText.trim() + current.prompt;

		document.getElementById("dareText").innerText = finalDare;
		document.getElementById("truthText").innerText = finalQuestion;
		document.getElementById("dareText2").innerText = finalDare;
		document.getElementById("truthText2").innerText = finalQuestion;
		document.getElementById("historyTEXT").innerHTML = lazyHistory1 + lazyHistory2;
		addHistory("\nPrompt: " + count + "\n\tTruth:\n\t\t" + finalQuestion + "\n\tDare:\n\t\t" + finalDare + "\n");

		//Do we show the action?
		// let random100 = Math.floor(Math.random() * 100);
		// if (removedE[0].pAction == ".") { random100 = 101; }
		// if (removedE[0].pAction < random100) {
		// 	alert(removedE[0].Action);
		// 	document.getElementById("nextText2").innerText = removedE[0].Action;
		// 	document.getElementById("nextText").innerText = removedE[0].Action;
		// 	extraAction = true;
		// }
		// else {
		// 	document.getElementById("nextText2").innerText = "Next";
		// 	document.getElementById("nextText").innerText = "Next";
		// }
	}
}

function inText(id, text) { document.getElementById(id).innerText = text; }

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
	if (current.quote == ".")
		alert("Sorry chief you're on your own for this one");
	else
		alert(current.quote);
}
