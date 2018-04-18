/* eslint-disable */
describe('App', () => {
    let leftArea, rightArea, leftButton, rightButton, swapButton;
    beforeEach(() => {
        leftArea = document.querySelector('#leftArea');
        leftArea.value = 'Testing123 from left';
        rightArea = document.querySelector('#rightArea');
        rightArea.value = 'Testing456 from right';
        leftButton = document.getElementById('leftButton');
        rightButton = document.getElementById('rightButton');
        swapButton = document.getElementById('swapButton');
    });
    describe('left button', () => {
        it('should send text to left area', () => {
            leftButton.click();
            expect(leftArea.value).toEqual(
                'Testing456 from right\nTesting123 from left'
            );
        });
    });
    describe('right button', () => {
        it('should send text to right area', () => {
            rightButton.click();
            expect(rightArea.value).toEqual(
                'Testing123 from left\nTesting456 from right'
            );
        });
    });
    describe('swap button', () => {
        let leftContent, rightContent;
        beforeEach(() => {
            leftContent = {
                before: leftArea.value
            };
            rightContent = {
                before: rightArea.value
            };
        });
        it('should swap right area', () => {
            swapButton.click();
            rightContent.after = rightArea.value;
            expect(leftContent.before).toEqual(rightContent.after);

        });
        it('should swap left area', () => {
            swapButton.click();
            leftContent.after = leftArea.value;
            expect(rightContent.before).toEqual(leftContent.after);
        });
    })
});