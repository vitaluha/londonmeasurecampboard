function getRoomCount(data) {
  if (!data) {
    return 0;
  }
  var uniqueRooms = data.map(function (d) {
    if (d.room_color !== '' && d.room_color !== 'custom') {
      return d.room_color/* !== '' && d.room_color !== 'custom'*/;
    }
  });
  var rooms = new Set(uniqueRooms);
  rooms.delete(undefined);
  rooms.delete(null);
  // debugger;
  var roomCount = rooms.size;
  return roomCount;
}

/*function buildSessionTimes(data) {
  if (!data) {
    return;
  }
  var allTimes = data.map(function(d) {
    return(d.time.replace(/am/ig, '').replace(/pm/ig, '').trim())
  });
  var times = new Set(allTimes);
  var divs = `<div class="ui labels">`;
  divs += `<div class="ui grey basic tiny label session-time" onclick="filterBySessionTime('all')">All</div>`;
  times.forEach(function(d) {
    divs += `<div class="ui grey basic tiny label session-time" onclick="filterBySessionTime('${d}')">${d}</div>`;
  });
  divs += '</div>';

  document.getElementById("times").innerHTML = divs;
}*/
function getSessionTimes() {
  var allTimes = sessions.map(function (d) {
    return (d.time.replace(/am/ig, '').replace(/pm/ig, '').trim())
  });
  var times = new Set(allTimes);
  return times;
}
function buildSessionFavs() {
  var sessionTimes = getSessionTimes();

  var timesItems = `<a class="item" onclick="filterBySessionTime('all')">All</a>`;
  sessionTimes.forEach(function (d) {
    timesItems += `<a class="item" onclick="filterBySessionTime('${d}')">${d}</a>`;
  });

  // ui red basic bottom left pointing dropdown button

  /* BELOW - for 'Hide Past Sessions' button
    <button class="ui red basic button hide-past" onclick="showHideCurrentSessions()">
      <i title="Hide Past Sessions" class="hourglass icon"></i>
      <span class="mc-label-value past-sessions">Hide Past Sessions</span>
    </button> 
  */

  var divs = `
    <button class="ui red basic button session-favs" onclick="filterBySessionFav(this)">
      <i title="Show My Sessions" class="heart icon"></i>
      <span class="mc-label-value">My Sessions</span>
    </button>

    <div class="ui red basic bottom left pointing dropdown button session-time-filter">
      <i class="clock icon"></i>
      <div class="text"><span class="mc-label-value">Times</div></span>
      <div class="menu">` +
    timesItems +
    `</div>
    </div>

    <div class="ui icon input session-search">
      <input type="text" placeholder="Search..." id="search_sessions">
      <i class="search icon"></i>
    </div>
  `;

  /*var divs = `<div class="ui buttons">`;
  divs += `<div class="ui button active" onclick="filterBySessionFav('all')">All</div>`;
  divs += `<div class="ui button" onclick="filterBySessionFav('fav')">Fav</div>`;
  divs += '</div>';*/

  document.getElementById("favs").innerHTML = divs;
}

// TODO: improve event description card
/*function buildEventDescription(data) {
  var title = data.title ? data.title : ' ';
  var description = data.description ? data.description : ' ';
  var speaker = data.speaker ? data.speaker : ' ';
  var room_color = data.room_color ? data.room_color : ' ';
  var desc = `
    Topic: ${title}\\n
    Description: ${description}\\n
    Speaker: ${speaker}\\n
    Room: ${room_color}\\n
  `
  return desc;
}*/

function search_sessions() {
  $('#search_sessions').keyup(function (d) {
    var searchText = this.value;
    // if user types in 3 characters or more - match on 'description', 'title', 'speaker'
    //   to filter out correct events
    if (searchText && searchText.length > 0) {
      var trimmedText = searchText.trim().toLowerCase();
      data = sessions.filter(function (e) {
        return e.description.toLowerCase().indexOf(trimmedText) > -1 ||
          e.title.toLowerCase().indexOf(trimmedText) > -1 ||
          e.tags.toLowerCase().indexOf(trimmedText) > -1 ||
          e.speaker.toLowerCase().indexOf(trimmedText) > -1;
      });
      loadCards(data);
      // TODO: revisit 'highlighting' at some point
      // highlight(trimmedText)
      // $('.description').highlight(trimmedText);
    } else {
      loadCards(sessions); // return all events

    }
  });
}

// TODO: fix this method. it highlights text that is being searched
function highlight(text) {
  var src_str = $("#demo").html();
  var term = text;
  term = term.replace(/(\s+)/, "(<[^>]+>)*$1(<[^>]+>)*");
  var pattern = new RegExp("(" + term + ")", "gi");

  src_str = src_str.replace(pattern, "<mark>$1</mark>");
  src_str = src_str.replace(/(<mark>[^<>]*)((<[^>]+>)+)([^<>]*<\/mark>)/, "$1</mark>$2<mark>$4");

  $("#demo").html(src_str);
}

// TODO: refactor this to be more efficient
function getSponsors(data) {
  // create array of unique color/sponsor combo
  this.values = []
  this.colors = [];
  this.sponsors = []
  this.values.push({
    "color": "all",
    "sponsor": "all"
  });
  data.forEach(function (d) {
    if (this.colors.indexOf(d.room_color) === -1 &&
      this.sponsors.indexOf(d.room_sponsor) === -1) {
      this.colors.push(d.room_color);
      this.sponsors.push(d.room_sponsor);
      this.values.push({
        color: d.room_color,
        sponsor: d.room_sponsor
      });
    }
  });
  return this.values;
}
