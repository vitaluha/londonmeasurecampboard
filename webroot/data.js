function getShortDescription(desc, dataId) {
  var descDiv = '';
  var result = escape(desc);
  if (desc && desc.length > 300) {
    result = desc.substr(0, 300);
    result += '...';
  }
  descDiv = result;
  descDiv +=
    `<div style="display: flex; justify-content: center;     height: 3rem;    align-items: center;">
      <button class="ui grey button show-more" onclick="openFullDescription('${dataId}', this)">
        Show More...
      </button>
    </div>
    `;
  return descDiv;
}
function openFullDescription(dataId, val) {
  val.parentElement.parentElement.setAttribute('style', "display:none");
  val.parentElement.parentElement.nextElementSibling.setAttribute('style', "display:block");
  val.parentElement.parentElement.nextElementSibling.classList.add('animate')
}
function getSession(session) {
  var sessionObj = {};
  sessionObj.dataId = session['data-id'];
  sessionObj.room_color = session.room_color ? session.room_color : '';
  sessionObj.room_sponsor = session.room_sponsor ? session.room_sponsor : '&#160;';
  sessionObj.time = session.time ? session.time.replace(/am/ig, '').replace(/pm/ig, '').trim() : '&#160;';
  sessionObj.title = session.title ? session.title : '&#160;';
  sessionObj.description = session.description ? session.description : '&#160;';
  sessionObj.short_description = session.description.length > 300 ?
    getShortDescription(session.description, sessionObj.dataId) :
    sessionObj.description;
  sessionObj.twitter = session.twitter ?
    '<a title="' + session.twitter + '" target="_blank" onclick="onTwitterClick(\'' + sessionObj.dataId + '\')"><i class="twitter icon"></i>' + session.speaker + '</a>' :
    undefined;
  sessionObj.speaker = sessionObj.twitter ?
    sessionObj.twitter :
    session.speaker ? session.speaker : '<i title="Anonymous Coward" class="user secret icon"></i>';
  sessionObj.tags = session.tags ? session.tags : '&nbsp;';
  sessionObj.image = session.image ? session.image : '';
  sessionObj.focus = session.focus ? session.focus : '&#160;';
  sessionObj.talk_link = session.talk_link ? session.talk_link : undefined;
  sessionObj.link_text = session.link_text ? session.link_text : 'Enter Room';
  sessionObj.talk_link_style = session.talk_link ? 'visible' : 'hidden';
  sessionObj.level = session.level ? session.level : '&#160;';
  sessionObj.type = session.type ? session.type : '&#160;';
  sessionObj.av = session.av === 'AV' ?
    '<i title="Audio/Video" class="large file audio outline icon"></i>' :
    '<i title="Whiteboard only" class="large clipboard outline icon"></i>';
  sessionObj.capacity = session.capacity ? session.capacity : '&nbsp;';
  sessionObj.isFinished = "";
  sessionObj.sessionSelect = sessionObj.sessionSelect ? sessionObj.sessionSelect : '';
  sessionObj.tagsHtml = buildTags(sessionObj.tags);
  sessionObj.outline = sessionObj.outline === '' ? '' : 'outline';

  return sessionObj;
}

function buildEmptyCardHtml(sessionObj) {
  return `
    <div class="card ${sessionObj.isFinished} ${sessionObj.sessionSelect}" data-id="${sessionObj.dataId}">
      <div class="content">
        <h5 class="ui ${sessionObj.room_color} header">
          <span class="session-time-header">${sessionObj.time}</span>
          <span class="heart-right">
            <i title="Add to Calendar" class="${sessionObj.room_color} heart ${sessionObj.outline} icon add-to-call" onclick="addToCall('${sessionObj.dataId}', this)"></i>
          </span>
        </h5>
        <h4 style="text-align: center;">No Session</h4>
      </div>
      <div class="extra content">
        <span class="ui ${sessionObj.room_color} basic circular label">
          ${sessionObj.room_sponsor}
        </span>
        <span class="ui mini labels session-tags">
          ${sessionObj.tagsHtml}
        </span>
        <span title="Room Capacity: ${sessionObj.capacity}" class="ui circular basic  label no-border">
          ${sessionObj.capacity}
          <i class="icon users"></i>
        </span>
      </div>
    </div>
  `;
}

function buildFullWidthCardHtml(sessionObj) {
  return `
    <div class="card ${sessionObj.isFinished} ${sessionObj.sessionSelect} full-width-card" data-id="${sessionObj.dataId}">
      <div class="content">
        <h5 class="ui ${sessionObj.room_color} header">
          <span class="session-time-header">${sessionObj.time}</span>
        </h5>
        <div class="left aligned card-header">
          ${sessionObj.title}
        </div>
        <div class="description">
          ${sessionObj.description}
        </div>
      </div>
      <div class="extra content">
        <span class="ui ${sessionObj.room_color} basic  circular label">
          ${sessionObj.room_sponsor}
        </span>
        <span class="ui mini labels session-tags">
          ${sessionObj.tagsHtml}
        </span>
        <span title="Room Capacity: ${sessionObj.capacity}" class="ui circular basic  label no-border">
          ${sessionObj.capacity}
          <i class="icon users"></i>
        </span>
        <div class="talk-link ${sessionObj.talk_link_style}">
          <button class="ui ${sessionObj.room_color} button" onclick="onSessionClick('${sessionObj.dataId}')" data-toggle="tooltip" title="${sessionObj.talk_link}">
            <i class="external url icon"></i>${sessionObj.link_text}
          </button>
        </div>
      </div>
    </div>
  `;
}

function buildSessionInfoCardHtml(sessionObj) {
  return `
        <div class="card ${sessionObj.isFinished} ${sessionObj.sessionSelect}" data-id="${sessionObj.dataId}">
          <div class="content">
            <h5 class="ui ${sessionObj.room_color} header">
              <div class="session-time-header">${sessionObj.time}</div>
              <div class="ui basic label speaker-twitter ${sessionObj.room_color}">
                ${sessionObj.speaker}
              </div>
              <span class="heart-right">
                <i title="Add to Calendar" class="${sessionObj.room_color} heart ${sessionObj.outline} icon add-to-call" onclick="addToCall('${sessionObj.dataId}', this)"></i>
              </span>
            </h5>
            <div class="left aligned card-header">
              ${sessionObj.title}
            </div>
            <span class="ui basic tiny label session-label">Level: <strong>${sessionObj.level}</strong></span>
            <span class="ui basic tiny label session-label">Focus: <strong>${sessionObj.focus}</strong></span>
            <span class="ui basic tiny label session-label">Type:  <strong>${sessionObj.type}</strong></span>

            <div class="description">
              ${sessionObj.short_description}
            </div>
            <div class="description2" style="display:none;">
              ${sessionObj.description}
            </div>

            <div class="talk-link ${sessionObj.talk_link_style}">
              <button class="ui ${sessionObj.room_color} button" onclick="onSessionClick('${sessionObj.dataId}')" data-toggle="tooltip" title="${sessionObj.talk_link}">
                <i class="external url icon"></i>${sessionObj.link_text}
              </button>
            </div>
            
          </div>
          <div class="extra content">
            <span class="ui ${sessionObj.room_color} basic  circular label">
            ${sessionObj.room_sponsor}
            </span>
            <span class="ui mini labels session-tags">
              ${sessionObj.tagsHtml}
            </span>
            <span title="Room Capacity: ${sessionObj.capacity}" class="ui circular basic  label no-border">
              ${sessionObj.capacity}
              <i class="icon users"></i>
            </span>
          </div>
        </div>
      `;
}

// TODO: rethink 'add-to-calendar feature'
function addToCall(data, heart) {
  // var card = $('.card.'+data);
  var card = $('.card[data-id="' + data + '"]');

  var sessionItemIndex = sessions.findIndex(function (d) {
    return d['data-id'] === data
  });
  var sessionItem = sessions[sessionItemIndex];

  if (sessionItem['session-select'] === 'true' || sessionItem['session-select'] === true) {
    sessionItem['session-select'] = false;
    card.removeClass('session-select');
    heart.classList.add("outline");
    localStorage.setItem('card' + data, false);
  } else {
    sessionItem['session-select'] = true;
    card.addClass('session-select');
    heart.classList.remove("outline");
    localStorage.setItem('card' + data, true);
  }

  trackOnFavClicked(data);

  // OLD: Add to calendar
  /*var event = sessionItem;
  var description = buildEventDescription(event);
  var begin = '4/28/2018 ' + event.time.split('-')[0].trim();
  var end = '4/28/2018 ' + event.time.split('-')[1].trim();
  var beginF = new Date(begin.replace('am', ' am').replace('pm', ' pm'));
  var endF = new Date(end.replace('am', ' am').replace('pm', ' pm'));
  var cal = new ics();

  cal.addEvent(event.title, description, event.room_color + ' room', beginF, endF);
  cal.download(event.title);*/
}