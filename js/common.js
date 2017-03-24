/**
 * Created by Jamter on 17/2/7.
 */
/**
 * @desc 对敏感字符逗号、尖括号进行转义,防止js注入
 * @param v {string} <script>alert("1")</script> 
 * */
function escapeValue(v) {
    var  entry = { "'": "&apos;", '"': '&quot;', '<': '&lt;', '>': '&gt;' };
    v = v.replace(/(['")-><&\\\/\.])/g, function ($0) { return entry[$0] || $0; });
    return v;
}