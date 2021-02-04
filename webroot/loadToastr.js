function loadToastrNotif(settings) {
  loadToastrOptions();

  // TODO: read dynamic updates
  // toastr["warning"]("Session 1 is now at 12:20pm", "Session time changed!");
  // toastr["info"]("Session 1 is now at 11:45pm", "Session time changed!");
}
function loadToastrOptions() {
  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-left",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "60000",
    "extendedTimeOut": "60000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
}