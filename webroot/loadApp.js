//  TODO: Insert link to your Google Sheet below
// var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/19NhwtckaO9KfabuFPX9vlcNEnjOUXVy1OAq9kJgA5Rk/edit?usp=sharing';

var publicSpreadsheetUrl = gOptions.enabled ? gOptions.google_sheet_url : '';

var sessions = {};
function init() {
  showInfo();
  Tabletop.init( { key: publicSpreadsheetUrl,
    callback: showInfo,
    simpleSheet: true
  });

}
function showInfo(data, tabletop) {
  if (data === undefined) {
    return;
  }
  var cards = tabletop.sheets('Data').elements;

  // TODO: remove this, and read from `session_id` property directly
  cards.forEach(function(d, i) {
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

  var settings = tabletop.sheets('Settings').elements;
  loadLinks(settings);
  loadSponsors(settings);
  loadLogo(settings);
}
function buildTags(tags) {
  var arr = tags.split(',');
  var html = '';
  for (x in arr) {
    html += '<span class="ui mini basic label">' +  arr[x] + '</span>';
  }
  return html;
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

window.addEventListener('DOMContentLoaded', init);
// loadToastrNotif();
