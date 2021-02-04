function loadCards(data, roomCount) {
  if (!data) {
    return;
  }
  if (roomCount === undefined) {
    roomCount = toWords(getRoomCount(data));
  }
  divs = `<div class="ui ${roomCount} stackable cards">`;
  for (x in data) {
    var session = data[x];
    if (session.room_color === '') {
      continue;
    }
    var room_color = session.room_color ? session.room_color : '', // '&#160;',
      room_sponsor = session.room_sponsor ? session.room_sponsor : '&#160;',
      time = session.time ? session.time.replace(/am/ig, '').replace(/pm/ig, '').trim() : '&#160;',
      title = session.title ? session.title : '&#160;',
      description = session.description ? session.description : '&#160;',
      twitter = session.twitter ?
        '<a title="' + session.twitter + '" target="_blank" href="https://www.twitter.com/' +
        session.twitter + '"><i class="twitter icon"></i>' + session.speaker + '</a>' :
        undefined,
      speaker = twitter ?
        twitter :
        session.speaker ? session.speaker : '<i title="Anonymous Coward" class="user secret icon"></i>',
      tags = session.tags ? session.tags : 'N/A',
      image = session.image ? session.image : '',
      focus = session.focus ? session.focus : '&#160;',
      talk_link = session.talk_link ? session.talk_link : undefined,
      talk_link_style = session.talk_link ? 'visible' : 'hidden',
      level = session.level ? session.level : '&#160;',
      type = session.type ? session.type : '&#160;',
      av = session.av === 'AV' ?
        '<i title="Audio/Video" class="large file audio outline icon"></i>' :
        '<i title="Whiteboard only" class="large clipboard outline icon"></i>',
      capacity = session.capacity ? session.capacity : 'N/A',
      isFinished = "";
    // TODO: remove line above, add add line below to add back 'isFinished' status to sessions
    // isFinished =  getIsFinished(session.time) ? "finished" : "";

    var jsonSession = JSON.stringify(session).toString();
    var dataId = session['data-id'];
    var tagsHtml = buildTags(tags);
    // TODO: refactor into more modular/readable code
    var sessionSelect = '';
    var outline = 'outline';
    var cardSaved = localStorage.getItem('card' + dataId);
    if (cardSaved === 'true' || cardSaved === true) {
      sessionSelect = 'session-select';
      outline = '';
    }
    session['session-select'] = cardSaved;
    /*<img class="ui fluid image" src="${image}"/>*/
    if (speaker === '<i title="Anonymous Coward" class="user secret icon"></i>' && title === '&#160;' &&
      description === '&#160;' && room_color !== 'custom') {
      // divs += buildSingleEmptyCard(this);
      divs += `
        <div class="card ${isFinished} ${sessionSelect}" data-id="${dataId}">
          <div class="content">
            <h5 class="ui ${room_color} header">
              <span class="session-time-header">${time}</span>
              <span class="heart-right">
                <i title="Add to Calendar" class="${room_color} heart ${outline} icon add-to-call" onclick="addToCall('${dataId}', this)"></i>
              </span>
            </h5>
            <h4 style="text-align: center;">No Session</h4>
          </div>
          <div class="extra content">
            <span class="ui ${room_color} basic circular label">
              ${room_sponsor}
            </span>
            <span class="ui mini labels session-tags">
              ${tagsHtml}
            </span>
            <span title="Room Capacity: ${capacity}" class="ui circular basic  label no-border">
              ${capacity}
              <i class="icon users"></i>
            </span>
          </div>
        </div>
      `;
    } else if (room_color === 'custom') { // if `room_color` == custom - this is custom card (for example happy hour, lunch, etc)
      // this card is full width
      // divs += buildCustomCard();
      divs += `
        <div class="card ${isFinished} ${dataId} ${sessionSelect} full-width-card" data-id="${dataId}">
          <div class="content">
            <h5 class="ui ${room_color} header">
              <span class="session-time-header">${time}</span>
            </h5>
            <div class="left aligned card-header">
              ${title}
            </div>
            <div class="description">
              ${description}
            </div>
          </div>
          <div class="extra content">
            <span class="ui ${room_color} basic  circular label">
              ${room_sponsor}
            </span>
            <span class="ui mini labels session-tags">
              ${tagsHtml}
            </span>
            <span title="Room Capacity: ${capacity}" class="ui circular basic  label no-border">
              ${capacity}
              <i class="icon users"></i>
            </span>
            <div class="talk-link ${talk_link_style}">
              <button class="ui ${room_color} button" onclick = "window.open('${talk_link}',  '_blank')" data-toggle="tooltip" title="${talk_link}">
                <i class="external url icon"></i>Enter Room
              </button>
            </div>
          </div>
        </div>
      `;
    } else {
      divs += `
        <div class="card ${isFinished} ${dataId} ${sessionSelect}" data-id="${dataId}">
          <div class="content">
            <h5 class="ui ${room_color} header">
              <span class="session-time-header">${time}</span>
              <div class="ui basic label speaker-twitter">
                ${speaker}
              </div>
              <span class="heart-right">
                <i title="Add to Calendar" class="${room_color} heart ${outline} icon add-to-call" onclick="addToCall('${dataId}', this)"></i>
              </span>
            </h5>
            <div class="left aligned card-header">
              ${title}
            </div>
            <span class="ui basic tiny label">${level}</span>
            <span class="ui basic tiny label">${focus}</span>
            <span class="ui basic tiny label">${type}</span>

            <div class="talk-link ${talk_link_style}">
              <button class="ui ${room_color} button" onclick = "window.open('${talk_link}',  '_blank')" data-toggle="tooltip" title="${talk_link}">
                <i class="external url icon"></i>Enter Room
              </button>
            </div>

            <div class="description">
              ${description}
            </div>
            
          </div>
          <div class="extra content">
            <span class="ui ${room_color} basic  circular label">
            ${room_sponsor}
            </span>
            <span class="ui mini labels session-tags">
              ${tagsHtml}
            </span>
            <span title="Room Capacity: ${capacity}" class="ui circular basic  label no-border">
              ${capacity}
              <i class="icon users"></i>
            </span>
          </div>
        </div>
      `;
    }
  }

  divs += `</div>`;
  divs += `
    <button class="ui basic button built-by"
        title="https://www.linkedin.com/in/vitaliymatiyash/"
        onclick="window.open('https://www.linkedin.com/in/vitaliymatiyash/',  '_blank')">
      Built by Vitaliy Matiyash
    </button>
    `;
  document.getElementById("demo").innerHTML = divs;
  // $('.calendar.plus.outline.icon.right.floated')

  // scrollToCurrentSession();
  // showHideCurrentSessions();

  // trigger dropdown loading
  setTimeout(function () {
    $('.ui.dropdown').dropdown();
    setPastSessionsStatus();
  }, 500)
}

function setPastSessionsStatus() {
  var sessionsHidden = localStorage.getItem('pastSessionsHidden');
  if (sessionsHidden === 'true' || sessionsHidden === true) {
    $('.past-sessions').text('Hide Past Sessions');
  } else {
    $('.past-sessions').text('Show Past Sessions');
  }
  showHideCurrentSessions();
}

function scrollToCurrentSession() {
  // $('.card').not('.finished').first()
  $('html, body').animate({
    scrollTop: $('.card').not('.finished').first().offset().top - 5
  }, 650);
}

function showHideCurrentSessions() {
  var label = $('.past-sessions').text(),
    newLabel = '';
  if (label === 'Hide Past Sessions') {
    newLabel = 'Show Past Sessions';
    // $('.card.finished').hide();
    $('.card.finished').attr('style', 'display: none !important;')
    localStorage.setItem('pastSessionsHidden', true);
  } else {
    newLabel = 'Hide Past Sessions';
    // $('.card.finished').show();
    $('.card.finished').attr('style', 'display: block;')
    localStorage.setItem('pastSessionsHidden', false);
  }
  $('.past-sessions').text(newLabel);
}

// Build links in top left dropdown menu
// This reads from `Settings` Google Sheet
function loadLinks(links) {
  var div = '';
  div += `
  <div class="ui text menu">
    <div class="ui white-menu dropdown item">
      Links
      <i class="dropdown icon"></i>
      <div class="menu">` ;
  for (var link in links) {
    var item = links[link];
    if (item.name === 'Menu Item') {
      div += `
            <a class="white item" target="_blank" title="${item.value}" href="${item.href}">
              ${item.value}
            </a>
          `;
    }
  }
  div += `</div></div>`;
  document.getElementById("linksDropdown").innerHTML = div;
}

function loadSponsors(links) {
  var div = '';
  div += `
  <div class="ui text menu">
    <div class="ui white-menu dropdown item">
      Sponsors
      <i class="dropdown icon"></i>
      <div class="menu">` ;
  for (var link in links) {
    var item = links[link];
    if (item.name === 'Sponsor') {
      div += `
          <a class="white item" target="_blank" title="${item.value}" href="${item.href}">
            ${item.value}
          </a>
        `;
    }
  }
  div += `</div></div>`;
  document.getElementById("sponsorsDropdown").innerHTML = div;
}

function loadLogo(links) {
  var logo = '',
    logoHref = '',
    logoTitle = '';

  for (var link in links) {
    var item = links[link];
    if (item.name === 'Logo') {
      logo = item.href;
    }
    if (item.name === 'City') {
      logoHref = item.href;
      logoTitle = item.value;
    }
  }
  $('#measureCampLogo').attr('src', logo);
  $('#measureCampLogo').attr('style', 'display: inherit')

  $('#measureCampLogoLink').attr('href', logoHref);
  $('#measureCampLogoLink').attr('title', logoTitle);
}

function getIsFinished(time) {
  var endTime = time.split('-')[1].trim();
  var currentTime = moment().format("h:mma");
  return moment(endTime, "h:mma").isBefore();
}
