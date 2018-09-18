function filterBySessionFav(fav) {
  $('#search_sessions').val('');
  if (fav.innerHTML == 'All') {
    // Show ALL sessions
    data = sessions.filter(function(d, i) {
      fav.innerHTML = '<i title="Show My Sessions" class="heart icon"></i><span class="mc-label-value">My Sessions</span>';
      return true;
    });
    loadCards(sessions);
  } else {
    data = sessions.filter(function(d, i) {
      // Show only 'Fav' sessions
      fav.innerHTML = 'All';
      return d['session-select'] === 'true' || d['session-select'] === true;
    });
    loadCards(data);
    // Temporary remove 'selected/faved' class
    $('.card').removeClass('session-select');
  }
}

// TODO: when toggling filter between 'ALL' and 'My Sessions' - clear 'time' value
function filterBySessionTime(time) {
  console.log(time)
  $('#search_sessions').val('');
  data = sessions.filter(function(d) {
    if (time == 'all') {
      return true;
    }
    return d.time.replace(/am/ig, '').replace(/pm/ig, '').trim() == time.replace(/am/ig, '').replace(/pm/ig, '').trim();
  });
  loadCards(data);

  x = $('.session-time').filter(function(d, i ){
    return i.innerHTML == time;
  })
  console.log(x)
  x.removeClass('grey')
  // x.removeClass('basic')
  x.addClass('red')
  // x.css('background', 'red !important')
}

function filterByRoomColor(room_color) {
  $('#search_sessions').val('');
  data = sessions.filter(function(d) {
    if (room_color == 'all') {
      return true;
    }
    return d.room_color == room_color;
  });
  loadCards(data);
}
