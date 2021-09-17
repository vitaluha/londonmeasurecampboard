function getSheetReferenceUrl() {
  return gOptions['sheet_reference_url'];
}

function initReference() {
  Papa.parse(sheetReferenceUrl, {
    download: true,
    header: true,
    complete: loadReference
  })
}

function loadReference(data) {
  console.log('loadReference')
  if (data && data.data) {
    data.data.forEach(item => {
      sheetsUrl[item['Event'].toLowerCase()] = item;
    })

  }
  console.log(sheetsUrl);
  loadSettingsAndEvents();
}