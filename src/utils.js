import {format, parseISO, isThisYear} from "date-fns";

export function formatDate(date){

    if (isThisYear(date)){
        return format(parseISO(date), "MMM d");
    }
    else{
        return format(parseISO(date), "MMM d, yyyy");
    }
}