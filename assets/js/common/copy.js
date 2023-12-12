export const copyToClipboard = (text) => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {                                                    // if not in https
        const input = document.createElement('input');
        document.body.appendChild(input);
        input.value = text;
        input.focus({preventScroll: true});
        input.select();
        document.execCommand('copy');
        input.remove();
    }
}