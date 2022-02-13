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

