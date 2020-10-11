'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);

function init() {
  console.log('Started...');
  createQuestsTree();
}

function onStartGuessing() {
  $('.game-start').hide('slow');
  renderQuest();
  $('.quest').show('slow');
}

function renderQuest() {
  // TODO: select the <h2> inside quest and update
  var currQuest = getCurrQuest();
  $('.quest h2').text(`${currQuest.txt}`);
}



function onUserResponse(ev) {
  var res = ev.data.ans;
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      alert('Yes, I knew it!');
      // TODO: improve UX
    } else {
      // TODO: hide and show new-quest section
      alert('I dont know...teach me!');
      $('.quest').hide('slow');
      $('.new-quest').show('slow');
    }
  } else {
    // TODO: update the lastRes global var
    gLastRes = res;
    moveToNextQuest(res);
    renderQuest();
  }
}

function onAddGuess(ev) {
  ev.preventDefault();
  // TODO: Get the inputs' values
  // TODO: Call the service addGuess
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();
  addGuess(newGuess, newQuest, gLastRes);
  onRestartGame();
}


function onRestartGame() {
  $('.new-quest').hide();
  $('.game-start').show();
  gLastRes = null;
  init();
}
