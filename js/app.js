/* global document */
(function main() {
  const leftArea = document.querySelector('#leftArea');
  const rightArea = document.querySelector('#rightArea');
  document.querySelectorAll('button').forEach((button) => {
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
        case 'swapButton':
          [leftArea.value, rightArea.value] = [rightArea.value, leftArea.value];
          if (leftArea.value !== '') leftArea.focus(); else rightArea.focus();
          break;
        default: break;
      }
    });
  });
}());
