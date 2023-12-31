export default function pagination(allPages, currentPage) {
    let pagesArray = [];

    if (allPages > 4) {
        for (let i = currentPage; i <= currentPage + 3 && i <= allPages; i++) {
            pagesArray.push(i);
        }
        if (pagesArray.length < 4) {
            const count = 4 - pagesArray.length;
            for (let i = 1; i <= count; i++) {
                let firsElement = pagesArray[0];
                pagesArray.unshift(firsElement - 1);
            }
        }
    } else {
        for (let i = 1; i <= allPages; i++) {
            pagesArray.push(i);
        }
    }

    return pagesArray;
}
