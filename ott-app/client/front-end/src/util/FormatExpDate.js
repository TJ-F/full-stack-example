function formatExpDate(exp){
    if (typeof exp === 'string' && exp.length === 5 && exp.includes('/')) {
        return exp.replace('/', '');
    }
    return exp;
}
export default formatExpDate;