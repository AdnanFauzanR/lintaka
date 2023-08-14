function subString(text, length) {
    if(text[length] === ".") {
        return text.substring(0, length);
    } else {
        return text.substring(0, length-3) + "...";
    }
}

export default subString;