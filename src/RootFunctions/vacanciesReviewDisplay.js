export default function vacanciesReviewDisplay (reviwes, en) {
    if (!reviwes || reviwes === '0' || reviwes === 0) {
        return en ? 'no reviews' : 'немає відгуків';
    }

    if (reviwes === 1 || reviwes === '1') {
        return en ? '1 review' : '1 відгук';
    }

    if (en) {
        return `${reviwes} reviews`;
    }

    const ending = reviwes.toString().split('').splice(-1)[0];

    const preEnding = reviwes.toString().split('').splice(-2)[0];

    if (+ending === 0 || +preEnding === 1 || +ending > 4) {
        return `${reviwes} відгуків`;
    }

    if (ending === '1') {
        return `${reviwes} відгук`;
    }

    return `${reviwes} відгуки`;
}
