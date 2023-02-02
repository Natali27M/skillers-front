export default function vacancyTimeDisplay(startTime, en) {
    const dateAndTimeLondon = new Date().toLocaleString('uk-UK', {timeZone: 'Europe/London'});

    const yesterday = new Date(Date.now() - 86400000).toLocaleString('uk-UK', {timeZone: 'Europe/London'});

    const yesterdayTimeArray = yesterday.split(',')[0].split('.');

    let startTimeArray = startTime.split('T')[0].split('-');

    [startTimeArray[0], startTimeArray[2]] = [startTimeArray[2], startTimeArray[0]];

    const nowTimeArray = dateAndTimeLondon.split(',')[0].split('.');

    if (JSON.stringify(startTimeArray) === JSON.stringify(nowTimeArray)) {
        return en ? 'today' : 'сьогодні';
    } else if (JSON.stringify(startTimeArray) === JSON.stringify(yesterdayTimeArray)) {
        return en ? 'yesterday' : 'вчора';
    }

    return startTimeArray.join('.');
}
