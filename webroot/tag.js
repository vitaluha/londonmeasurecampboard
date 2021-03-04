function trackEvent(eventName, category, action, label, customParams) {
  /* console.log('tracking:');
  console.log({
    event: eventName,
    eventCategory: category,
    eventAction: action,
    eventLabel: label,
    customParams
  }) */
  dataLayer.push({
    event: eventName,
    eventCategory: category,
    eventAction: action,
    eventLabel: label,
    customParams
  });
}