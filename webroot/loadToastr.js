function loadToastrNotif() {
  loadToastrOptions();
  toastr["info"]("Session 1 is now at 12:20pm", "Session time changed!");
  toastr["info"]("Session 1 is now at 11:45pm", "Session time changed!");
}
function loadToastrOptions() {
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "0",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
}