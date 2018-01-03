import {addHours, format} from 'date-fns';

export const offsetToGMT = (offset: number) => {
    let sign = offset >= 0 ? '+' : '-';
    let absOffset = Math.abs(offset);
    let zero = absOffset > 9 ? '' : '0';

    return sign + zero + absOffset + ':00';
};


const getUTCDate = (date) => {
    return new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds(),
    );
};

export const offsetCurrentTimeFactory = (offset: number) => (currentTime: Date) => {
    const utc = getUTCDate(currentTime);

    return format(addHours(utc, offset), 'DD MMM, YYYY HH:mm:ss');
};
