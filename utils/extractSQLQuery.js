export function extractSQLQuery(iaPrompt){

    const extractSQL = /```(sql)?(.*?)```/gs;
    let match = iaPrompt.match(extractSQL);
    if (match && match[1]){
        return { status: true, data: match[1].trim() }
    }

    return { status: false }

}

export function filterSQLBannedQuery(query){
    const bannedRegEx = /^(DROP|TRUNCATE|CREATE|ALTER)/i;
    if (bannedRegEx.test(query)) {
        return true;
    }

    return false;
}

export function filterSQLQuery(query){
    const bannedRegEx = /^(SELECT|INSERT|UPDATE|DELETE)/i;
    if (bannedRegEx.test(query)) {
        return true;
    }

    return false;
}