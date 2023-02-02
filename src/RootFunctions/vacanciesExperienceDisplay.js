export default function vacanciesExperienceDisplay(experience, en) {
    if (!experience || experience === '0' || experience === 0) {
        return en ? 'without experience' : 'без досвіду';
    }

    if (experience === 1 || experience === '1') {
        return en ? '1 year experience' : '1 рік досвіду';
    }

    if (en) {
        return `${experience} years experience`;
    }

    const ending = experience.toString().split('').splice(-1)[0];

    const preEnding = experience.toString().split('').splice(-2)[0];

    if (+ending === 0 || +preEnding === 1 || +ending > 4) {
        return `${experience} років досвіду`;
    }

    if (ending === '1') {
        return `${experience} рік досвіду`;
    }

    return `${experience} роки досвіду`;
}
