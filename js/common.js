/**
 * Created by Jamter on 17/2/7.
 */
/**
 * @desc 对敏感字符逗号、尖括号进行转义,防止js注入
 * @param v { String } <script>alert("1")</script> 
 * */
function escapeValue(value) {
    var  entry = { "'": "&apos;", '"': '&quot;', '<': '&lt;', '>': '&gt;' };
    value = value.replace(/(['")-><&\\\/\.])/g, function ($0) { return entry[$0] || $0; });
    return value;
}

/**
 * @desc 空字符串''、null和undefined，认为是空值，0和false不是
 * 
*/
export const isEmptyValue = (value) => {
    if (value === '' || value === null || value === undefined) {
        return true
    } else {
        return false
    }
}