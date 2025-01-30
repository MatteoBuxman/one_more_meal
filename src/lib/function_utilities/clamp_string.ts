//Clamps a string and appends an ellipses
export function clampString(str : string | undefined | null, length: number) {

    if(!str){
        return "";
    }

    else if (length > str.length){
        return str;
    }

    else if (str.length > length) {
        return str.substring(0, length) + "...";
    }
    return str;
}