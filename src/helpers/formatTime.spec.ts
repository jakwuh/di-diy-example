import {offsetCurrentTimeFactory, offsetToGMT} from './formatTime';

test('offsetToGMT', () => {
    expect(offsetToGMT(0)).toBe('+00:00');
    expect(offsetToGMT(-1)).toBe('-01:00');
    expect(offsetToGMT(-12)).toBe('-12:00');
    expect(offsetToGMT(10)).toBe('+10:00');
});

test('offsetCurrentTimeFactory', () => {
    const offsetTime = offsetCurrentTimeFactory(2);
    const date = new Date(2017, 4, 3, 4, 53, 44);

    expect(offsetTime(date)).toMatchSnapshot();
});
