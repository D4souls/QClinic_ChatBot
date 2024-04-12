import { logBannedQuery } from "./logBannedQuery.js";

export async function filterQuery(iaPrompt, userPrompt){
    const bannedRegEx = /^(DROP|TRUNCATE|CREATE|ALTER)/i;
    if (bannedRegEx.test(iaPrompt)) {
        await logBannedQuery(iaPrompt, userPrompt);
        return true;
    }
}