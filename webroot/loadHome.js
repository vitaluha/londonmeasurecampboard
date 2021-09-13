function sheetReferenceLoaded(data, tabletop) {
  divs = '';
  divs +=
    `
    <section class="center-image">
      <img style="height: 100vh;" src="images/unconference.jpeg">
    </section>
    `;
  divs +=
    `
    <h1 class="ui center aligned header">Upcoming MeasureCamp Events:</h1>
    `
  var EVENTS_KEY = 'events';
  var eventsData = tabletop.sheets(EVENTS_KEY).elements;

  divs +=
    `
    <div class="ui grid">
    `;

  // build events (loop)
  for (mcEvent in eventsData) {
    /* 
      {
      Date: "13-Jun-2020"
      Email Address: "europe@measurecamp.org"
      Event: "Europe"
      Sessions sheet: "https://docs.google.com/spreadsheets/d/1DYrv4z8MI00NVuPhJ4jzrjkY2K5EeBhdWYdpny8c1eY/edit#gid=314554634"
      Website: "https://europe.measurecamp.org/"
      }
     */
    var event = eventsData[mcEvent]
    console.log(event)
    divs += getMCEventCard(event);
  }


  divs += `</div>`;
  document.getElementById("demo").innerHTML = divs;
}

function getMCEventCard(event) {
  var div =
    `
      <div class="four wide column">
        <div class="card">
          <div class="content">
            <h5 class="ui red header">
              ${event.Event}
            </h5>
            <div class="ui basic tiny label session-label">
              ${event.Date}
            </div>
            <button class="ui basic red button" onclick="onMcEventClick('${event.Website}')">
              ${event.Website}
            </button>
          </div>
        </div>
      </div>
    `
  return div;
}

