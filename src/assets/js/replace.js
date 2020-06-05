export default {
    is_Email(str){ //邮箱正则
        let reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        return reg.test(str);
    },    
    cookies: {
    //获取
    get(name) {
      let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if (arr = document.cookie.match(reg))
        return (arr[2]);
      else
        return null;
    },
    /**
     * 设置cookie
     * @param c_name 名称
     * @param value  值
     * @param time   时间，s30=30秒，h12=12小时，d7=7天
     * @param path   路径，默认 根 /
     */
    set(c_name, value, time, path = '/') {
      let exp = new Date();
      let strSec = getSec(time);
      exp.setTime(exp.getTime() + strSec * 1);
      document.cookie = c_name + "=" + escape(value) + (!time ? "" : ";expires=" + exp.toGMTString()) + ';path=' + path;
  
      function getSec(str) {
        let str1 = str.substring(1, str.length) * 1;
        let str2 = str.substring(0, 1);
        if (str2 === "s") {
          return str1 * 1000;
        } else if (str2 === "h") {
          return str1 * 60 * 60 * 1000;
        } else if (str2 === "d") {
          return str1 * 24 * 60 * 60 * 1000;
        }
      }
    }
    ,
    //删除
    del(name) {
      let exp = new Date();
      exp.setTime(exp.getTime() - 1);
      let cval = this.get(name);
      if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
  },
    //清除空格
    clearBank(txt) {
        if (typeof  txt === 'string') {
        return txt.replace(/\s/g, '')
        } else {
        console.log('请输入正确的类型')
        }
    },
      /**
   * 对Date的扩展，将 Date 转化为指定格式的String
   * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2018-01-12 08:09:04.423
   * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2018-01-12 8:9:4.18
   * @param fmt
   * @param obj Date对象
   * @returns {*}
   * @constructor
   */
  dateFormat(fmt, obj) { // author: meizz
    let o = {
      "M+": obj.getMonth() + 1, // 月份
      "d+": obj.getDate(), // 日
      "h+": obj.getHours(), // 小时
      "m+": obj.getMinutes(), // 分
      "s+": obj.getSeconds(), // 秒
      "q+": Math.floor((obj.getMonth() + 3) / 3), // 季度
      "S": obj.getMilliseconds(),
      // 毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (obj.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
  },
  /**
   * 检测一个值是否非空
   * @param val 要检测的值
   * @return boolean 检测结果
   */
  isEmpty(val) {
    if (typeof val === 'number') {
      return false
    }
    return (!val || val === undefined || typeof val === 'undefined' || val === null)
  },
   /**
   * 护照格式验证
   * @param value 护照格式字符串
   * @return boolean
   * */
  decidePossport(value) {
    value = value.toUpperCase();
    let dlReg = /^G[0-9]{8}$/; //大陆护照
    let eReg = /^E[0-9]{8}$/; //
    let nReg = /^1[45][0-9]{7}$/; //大陆护照
    let pReg = /^P[0-9]{7}$/; //
    let sReg = /^S[0-9]{7,8}$/; //
    let dReg = /^D[0-9]+$/; //
    let rtzReg = /^T[0-9]{8}$/; //入台证
    let LReg = /^L[0-9]{8}$/;
    return (dlReg.test(value) || eReg.test(value) || nReg.test(value) || pReg.test(value) || sReg.test(value) || dReg.test(value) || rtzReg.test(value) || LReg.test(value));
  },
    /**
   * 身份证格式验证
   * @param value 护照格式字符串
   * @return boolean
   * */
    decideIdcard(value) {
        if (value.length === 15) {
        let reg = /^[1-9][0-9]{5}[2-9][0-9](0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])[0-9]{3}$/;
        return reg.test(value);
        } else if (value.length === 18) {
        let xiaoYan = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
        let xiao = ["1", "0", "x", "9", "8", "7", "6", "5", "4", "3", "2"];
        let yuShu = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        let xiShu = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        let cardArray = value.split("");
        
        let sum = 0;
        for (let i = 0; i < cardArray.length - 1; i++) {
            sum += parseInt(cardArray[i]) * xiShu[i];
        }
        let yu = sum % 11;
        for (let i = 0; i < yuShu.length; i++) {
            if (yu === yuShu[i]) {
            if (value.substring(value.length - 1).toUpperCase() === xiaoYan[i]) {
                return true;
            }
            }
        }
        }
        return false;
    },
    /**
   * 手机验证
   * @param value 护照格式字符串
   * @return boolean
   * */
    decidePhone(value) {
        let reg = /^0?1[345789]\d{9}$/;
        return reg.test(value);
    },
    //获取当前时间
    getNowdate(){
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        return year+'-'+month+'-'+day+'- '+hour':'+minute+':'+second
    }

}