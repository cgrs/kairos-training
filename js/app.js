/* global jQuery */
(function main($) {
  $('button').on('click', (e) => {
    switch (e.target.id) {
      case 'leftButton':
        if ($('#rightArea').val() !== '') {
          $('#leftArea').val($('#rightArea').val());
          $('#rightArea').val('');
        }
        break;
      case 'rightButton':
        if ($('#leftArea').val() !== '') {
          $('#rightArea').val($('#leftArea').val());
          $('#leftArea').val('');
        }
        break;
      default:
        break;
    }
  });
}(jQuery));
