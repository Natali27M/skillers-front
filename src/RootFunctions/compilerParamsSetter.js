export default function compilerParamsSetter(techId) {
    let languageId = 0;
    let editorLang = '';

    switch (techId) {
        case 3:
            languageId = 62;
            editorLang = 'java';
            break;
        case 4:
            languageId = 71;
            editorLang = 'py';
            break;
        case 5:
            languageId = 63;
            editorLang = 'js';
            break;
        case 6:
            languageId = 51;
            editorLang = 'cs';
            break;
        case 7:
            languageId = 53;
            editorLang = 'cpp';
            break;
    }


    return {languageId, editorLang};
}