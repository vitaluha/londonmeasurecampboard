function trackEvent(
  eventName, category, action, label,
  session_author, session_author_twitter, session_title, session_time,
  session_level, session_focus, session_type, room_name) {
  dataLayer.push({
    event: eventName,
    eventCategory: category,
    eventAction: action,
    eventLabel: label,
    session_author,
    session_author_twitter,
    session_title,
    session_time,
    session_level,
    session_focus,
    session_type,
    room_name
  });
}

function trackCity(city) {
  var date = new Date();
  var dateStr =
    ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
    ("00" + date.getDate()).slice(-2) + "/" +
    date.getFullYear() + " " +
    ("00" + date.getHours()).slice(-2) + ":" +
    ("00" + date.getMinutes()).slice(-2) + ":" +
    ("00" + date.getSeconds()).slice(-2);
  // console.log(dateStr);
  dataLayer.push({
    event_city: city,
    event_date: dateStr
  });
}