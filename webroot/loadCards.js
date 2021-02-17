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

    var sessionObj = getSession(session);
    var dataId = session['data-id'];

    // TODO: refactor into more modular/readable code
    var cardSaved = localStorage.getItem('card' + dataId);
    if (cardSaved === 'true' || cardSaved === true) {
      // add 'session-select' class to show 
      sessionObj.sessionSelect = 'session-select';
      sessionObj.outline = '';

    }
    session['session-select'] = cardSaved;
    if (sessionObj.speaker === '<i title="Anonymous Coward" class="user secret icon"></i>' &&
      sessionObj.title === '&#160;' &&
      sessionObj.description === '&#160;' &&
      sessionObj.room_color !== 'custom') {
      // THIS CARD IS EMPTY CARD
      divs += buildEmptyCardHtml(sessionObj);
    } else if (sessionObj.room_color === 'custom') {
      // if `room_color` == custom - this is custom card (for example happy hour, lunch, etc)
      // THIS CARD IS FULL WIDTH
      divs += buildFullWidthCardHtml(sessionObj);
    } else {
      // TODO: hide 'Room capacity if 'capacity' is blank
      // THIS CARD IS STANDARD INFO CARD
      divs += buildSessionInfoCardHtml(sessionObj);
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
