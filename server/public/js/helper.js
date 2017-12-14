/*
 * @Author: meng 
 * @Date: 2017-12-11 10:52:02 
 * 对Date的扩展，将 Date 转化为指定格式的String
 * sage:
 * formatDate(new Date(),"yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
 */

export const formatDate=function(date,fmt){
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }

    return fmt;
}

/*
* 将mongodb的_id 转换成时间格式
* sage:
* 5a322ebdf6a74d32d0fa0081 => 2017-12-14T07:56:45.000Z
*/
export const objectIdToTimestamp = (_id) => {
    var timestamp = _id.toString().substring( 0, 8 );
    return new Date( parseInt( timestamp, 16 ) * 1000 );
}

