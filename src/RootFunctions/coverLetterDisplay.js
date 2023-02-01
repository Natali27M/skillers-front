export default function coverLetterDisplay(text, full) {
    if (full) return text;
    let array = text.split(' ');
    return array.slice(0, 40).join(' ');
}
