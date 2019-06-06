// Utility function for search bar to determine if search query is part of
// the ticker symbol id or the full name of the company 
export const contains = ({id, name}, search) => {
    const idLower = id.toLowerCase();
    const nameLower = name.toLowerCase();
    if (idLower.startsWith(search) || nameLower.startsWith(search)) {
        return true;
    }
    return false;
}