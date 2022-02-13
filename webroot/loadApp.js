//  TODO: Insert link to your Google Sheet below
// var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/19NhwtckaO9KfabuFPX9vlcNEnjOUXVy1OAq9kJgA5Rk/edit?usp=sharing';

var sheetReferenceUrl = getSheetReferenceUrl();

var settings;
var sessions = {};
var sheetsUrl = {};
var eventSettingsUrl;
var eventEventUrl;
var city = getCity();

window.addEventListener('DOMContentLoaded', initReference);

function loadSettingsAndEvents() {

  eventSettingsUrl = sheetsUrl[city]['Session Settings']
  if (eventSettingsUrl) {
    initEventSettings();
  }

  eventEventUrl = sheetsUrl[city]['Sessions Sheet'];
  if (eventEventUrl) {
    init();
  }
}

function initEventSettings() {
  Papa.parse(eventSettingsUrl, {
    download: true,
    header: true,
    complete: loadEventSettings
  })
}

function loadEventSettings(data) {
  settings = data.data;
  setSettings();
}

function setSettings() {
  loadLinks(settings);
  loadSponsors(settings);
  loadLogo(settings);
  loadToastrNotif(settings);
}

function init() {
  Papa.parse(eventEventUrl, {
    download: true,
    header: true,
    complete: showInfo
  })
}

function getSheetUrl() {
  // TODO: check gOptions.enabled is true to proceed
  var year = getYear();
  var yearLookupKey = 'google_sheet_url_' + year
  return gOptions[yearLookupKey];
}

function getCity() {
  const urlParams = new URLSearchParams(window.location.search)
  var city = 'Home';
  if (urlParams && urlParams.get('city')) {
    city = urlParams.get('city');
  }
  return city.toLowerCase();
}

function getYear() {
  var year = window.location.pathname;
  return year.replace('/', '');
}

function showInfo(data) {
  if (data === undefined) {
    return;
  }
  var cards;
  trackCity(city);
  
  cards = data.data;

  // TODO: remove this, and read from `session_id` property directly
  cards.forEach(function (d, i) {
    // Index every data row
    d['data-id'] = d['session_id'];
  });
  sessions = cards;

  // numToWords();

  // TODO: refactor here to handle arbitrary number of rooms
  var roomCount = getRoomCount(sessions);

  // buildRooms(roomCount)
  // main function to build session cards
  loadCards(sessions, toWords(roomCount));
  // buildSessionTimes(sessions);
  buildSessionFavs();
  search_sessions();
}

function buildRooms(roomCount) {
  var divs = `<div class="ui ${roomCount} labels session-rooms">`;
  var colors = getSponsors(sessions);

  for (var x in colors) {
    var color = colors[x].color,
      sponsor = colors[x].sponsor;
    divs += `
      <div data-id="${color}" class="ui ${color} label session-room" onclick="filterByRoomColor('${color}')">
        ${sponsor}
      </div>
    `;
  }

  divs += '</div>';
  document.getElementById("rooms").innerHTML = divs;
}

function buildTags(tags) {
  var arr = tags.split(',');
  var html = '';
  for (x in arr) {
    html += '<span class="ui mini basic label">' + arr[x] + '</span>';
  }
  return html;
}