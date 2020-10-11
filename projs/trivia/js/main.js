'use strict';
var gCurrQuestIdx = 0;
var gNextId = 0;
var gQuests = createQuests();
var gIsVictory = false;
var gElQuiz = document.querySelector('.quiz');
var gElVictory = document.querySelector('.victory');
var gElWrong = document.querySelector('.wrong');

function init() {
	gCurrQuestIdx = 0;
	gElWrong.style.display = 'none';
	gElQuiz.style.display = 'block';
	gElVictory.style.display = 'none';
	renderQuest(gCurrQuestIdx, gQuests);
}

function createQuests() {
	return [
		{
			id: gNextId++,
			opts: [ 'Maastricht', 'Amsterdam' ],
			correctOptIdx: 0
		},
		{
			id: gNextId++,
			opts: [ 'Amalfi', 'Lisbon' ],
			correctOptIdx: 1
		},
		{
			id: gNextId++,
			opts: [ 'Genova', 'Marseille' ],
			correctOptIdx: 0
		},
		{
			id: gNextId++,
			opts: [ 'Toronto', 'Eindhoven' ],
			correctOptIdx: 1
		},
		{
			id: gNextId++,
			opts: [ 'Napoli', 'Mumbai' ],
			correctOptIdx: 0
		}
	];
}

function renderQuest(questIdx, quests) {
	var htmlStr = '';
	var question = quests[questIdx];
	htmlStr +=
		'<h1>Do you recognize the city?</h1><img src="img/' +
		(questIdx + 1) +
		'.jpg" alt=""><br><button class="btn" onclick=checkAnswer(0)>' +
		question.opts[0] +
		'</button><br><button class="btn" onclick=checkAnswer(1)>' +
		question.opts[1] +
		'</button>';
	gElQuiz.innerHTML = htmlStr;
}

function checkAnswer(optIdx) {
	if (gQuests[gCurrQuestIdx].correctOptIdx === optIdx) {
		if (gCurrQuestIdx === gQuests.length - 1) {
			gElQuiz.style.display = 'none';
			gElVictory.style.display = 'block';
			gElWrong.style.display = 'none';
		} else {
			gElWrong.style.display = 'none';
			gCurrQuestIdx++;
			renderQuest(gCurrQuestIdx, gQuests);
		}
	} else {
		gElWrong.style.display = 'block';
	}
}

// משימה שניה: מערך עם מספרים ולמצוא איך לעשות לו שאפל או לעשות לו ספלייס רנדומלי עם גטרנדוםאינט, לולאה שרצה על שורש של מספר ועוד לולאה שרצה על שורש של מספר כדי לייתר טבלה
