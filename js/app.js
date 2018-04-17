/* global document */
(function main(d) {
  const leftArea = d.querySelector('#leftArea');
  const rightArea = d.querySelector('#rightArea');
  d.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      switch (button.id) {
        case 'leftButton':
          if (rightArea.value !== '') {
            leftArea.value = `${rightArea.value}\n${leftArea.value}`.trim();
            leftArea.focus();
            rightArea.value = '';
          }
          break;
        case 'rightButton':
          if (leftArea.value !== '') {
            rightArea.value = `${leftArea.value}\n${rightArea.value}`.trim();
            rightArea.focus();
            leftArea.value = '';
          }
          break;
        default: break;
      }
    });
  });
}(document));
