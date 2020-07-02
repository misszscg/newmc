/**
 * author: Lqy
 * create date: 2019/10/03
 * 统一前端调用后台接口的方式，开发按模块配置每个接口的请求的url，请求方式和参数。
 * 请求的方式分为GET 和 POST, POST是在GET的基础上增加了Request Body部分：
 * GET方式：createUrl函数处理生成最终url
 *     1- url/{param1}/{params2}/.../{param_n}
 *        以此形式出现的参数都是必要参数，忽略params中的required字段，如果会进行类型检查
 *     2- url?key1=value&key2=value...&key_n=value
 *        参数定义在配置对象的 query属性中
 *     3- url/{param1}/{params2}/.../{param_n}?key1=value&key2=value...&key_n=value
 *        两种方式组合使用的情况
 * POST方式：在GET基础上增加了对body数据的处理， dataHandler函数处理请求的body data：
 *     1- data的形式有两种：JSON Object、 JSON Array：
 *        a) JSON Object 作为 data的处理，校验必要性和类型，剔除params中未定义的对象， 参数配置在params中
 *        b) JSON Array 为了向下兼容增加 params_array配置属性，当有params_array配置时，忽略params配置
 *           i)  参数对应的数据类型必须是数组
 *           ii) 参数对应的数组不能是空数组，至少有一个成员
 *           iii) 配置中若有多个参数定义，默认取第一个作为参数定义进行处理。
 * ====================================================================================================================
 * response的统一处理： 未定
 */


import axios from "axios";


const _services = {
   
    // ...common,
 
};


// 请求拦截器，判断请求合法性
axios.interceptors.request.use(
    config => {
        // 每次请求都判断localstorage.token是否存在
        const tokenStr = window.localStorage.getItem("token");
        let isNotLogin=window.isNotLogin
        if(!isNotLogin){
            if (!tokenStr) {
                // 跳转登录页面
                window.location.href = 'static/login.html';
                return;
            }
            let tokenObj = JSON.parse(tokenStr);
            let token = tokenObj.tokenHead + ' ' + tokenObj.token;
            // 存在，在header中添加token
            config.headers.Authorization = token;
        }

        return config;
    },
    error => {

    }
)

// 响应拦截器
axios.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 错误处理:
    error => {
        if (error.response.data.code) {
            console.log(error);
            switch (error.response.data.code) {
                case 'C0301':
                    window.location.href = 'static/login.html';
                    break;
            }
            return Promise.reject(error.response);
        }
    }
);

/**
 * 反向代理
 * @type {{prod: string, dev: string}}
 * @private
 */
const _DOMAIN = {
    dev: "/newapi/",
    uit: '/newapi/',
    prod: "/newapi/"
};




/**
 * 请求为POST时，过滤掉参数配置中position为url的属性
 * 如果过滤后的参数只有一个，并且类型为Array时，返回数组本身
 * @param options 配置属性
 * @param data
 * @return {*}
 */
function filterData(options, data) {
    if (!data) {
        return {};
    }
    let params = options.params;
    return data;
}

/**
 * 校验输入参数是否满足接口定义的要求：
 * 1- 必要参数是否提供
 * 2- 提供的参数类型是否与定义一致
 * @param serviceName
 * @param params
 * @param data
 * @return {boolean} 校验成功返回 true， 失败返回false
 */
function isParamsValid(serviceName, params, data) {
    // 从参数定义中找到所有required属性为true的参数
    const mustParams = _.filter(params, {
        required: true
    });
    // 遍历必要参数，从data中查找是否都已经按定义提供：
    for (const p of mustParams) {
        if (data[p.name] === undefined || data[p.name] === null) {
            log.err(
                "调用服务[" +
                    serviceName +
                    "]失败：必要参数[" +
                    p.name +
                    "]没有提供:",
                data[name]
            );
            log.err(data);
            return false;
        }
    }

    const keys = _.keys(data);
    // 遍历data，从参数定义中判断类型是否符合要求,
    for (let i in keys) {
        const k = keys[i];
        const v = data[k];
        const param = _.find(params, {
            name: k
        });
        if (!param) {
            //    提交的数据项没有在接口中定义，忽略
            continue;
        }

        if (!type) {
            continue;
        }
        const type = _.lowerCase(param.type);
        let isValid = true;
        // 拼接出函数调用字符串: _.is(XXXX):
        const validFuncName = "_.is" + _.upperFirst(type);

        if (!eval(validFuncName + "(v)")) {
            log.err(
                "参数[" +
                    k +
                    "]的值类型[" +
                    typeof v +
                    "]与定义[" +
                    param.type +
                    "]不符"
            );
            return false;
        }
    }
    return true;
}

/**
 * 处理POST请求的request body，更多细节移步文件头
 * @param config
 * @param data
 */
function dataHandler(config, data) {
    // 判断配置中是否有 array_param, 并且配置类型必须是对象：
    if (config.array_param && _.isObject(config.array_param)){
        // 从 data中获取数据
        let {name, type} = config.array_param;
        let value = data[name];
        if (value && _.isArray(value)) {
            return value;
        } else {
            console.error('定义了数组作为Request body， 但数据对象中没有此参数或参数的类型不是数组');
            return {};
        }
    }
    // 没有array_param配置，将data中用于拼接url的数据剔除
    // 和params中未定义的数据从data中剔除：
    return _.omit(data, config.omits);
}
/**
 * 请求方法为‘GET'时，将参数按约定拼接到url之后：必要参数作为url的一部分
 * @param config 接口配置，包括params url query等
 * @param data
 * @return {string}
 */
function createUrl(config, data) {
    config.omits = []; //初始化 存放{} {} 中的参数名，用于之后的data过滤处理
    let oriUrl = config.url;
    let result = oriUrl;
    const regex = /{\w+}/g;
    let matches = oriUrl.matchAll(regex);
    for (let match of matches) {
        const placeholder = match[0];
        const paramName = placeholder.replace(/[{}]/g, "");
        config.omits.push(paramName);
        const value = data[paramName];
        if (!value) {
            console.error('createUrl failed: 没有提供必要参数{' + paramName + '}');
            return undefined;
        }
        result = result.replace(placeholder, value);
        // 构建到url上{}的参数，无须再出现在 request body中，因此将其从data中剔除
    }
    // 将query参数拼接到url最后，以？key=value的形式
    if (config.query) {
        result += '?';
        for (let o of config.query) {
            let key = o.name;
            let value = data[key];
            let queryStr = key + '=' + value + '&';
            result += queryStr;
        }
        // 去除最后一个&符号
        result = _.trimEnd(result, '&');
    }
    return result;
}

/**
 * 请求结果处理
 * @param serviceName
 * @param result
 */
function resultHandler(serviceName, result) {
    let options = _services[serviceName];
    result.then(res => {
        if (res.status !== 200) {
            console.error(utils.errorMessage(res.status));
        }
        const code = res.data.code;
        if (code && code !== 200 && code !== 0 && code !== "00000") {
            // 如果未定义错误信息，则按后端提供信息进行提示：
            if (options.needPrompt) {
                Notification.warning({
                    title: options.message[code + ""].title,
                    message: options.message[code + ""].message
                });
            } else {
                Notification.error({
                    title: "内部服务错误:",
                    message: res.data.msg
                });
            }
            return;
        }
        // 成功提醒，根据接口定义中
        if (options.needPrompt) {
            Notification.success({
                title: options.message[utils.SUCC_CODE].title,
                message: options.message[utils.SUCC_CODE].message
            });
        }
    });
}

export default async function(serviceName, data) {
    log.info("[" + serviceName + "] was called.");
    const options = _services[serviceName];
    if (!options) {
        const msg = "调用接口：[" + serviceName + "]未定义";
        log.err(msg);
        throw {
            code: 500,
            message: msg
        };
    }
    if (!isParamsValid(serviceName, options.params, data)) {
        log.err("参数无效");
        throw {
            code: 500,
            message: "参数无效"
        };
    }
    let config = {
        params: data
    };

    // 设置响应类型，针对下载做特殊处理，根据接口定义中的属性：responseType来设置
    if (options.responseType == "blob") {
        config.responseType = "blob";
    }
    let reqUrl = createUrl(options, data);
    reqUrl = _DOMAIN.dev + reqUrl;
    if (!reqUrl || reqUrl === "") {
        console.error("请求");
    }
    let result = null;
    if (options.type === "GET") {
        result = axios.get(reqUrl).catch(err => {
            console.log(err);

            Notification.error({
                title: "错误",
                message: "系统内部错误，请联系开发小哥哥"
            });
        });
    } else {
        // data = filterData(options, data);
        data = dataHandler(options, data);
        // 將data中，position指定為 url的屬性從data中剔除
        // 如果只有一個成員，并且是數組，那麽將data替換成數組。
        result = axios.post(reqUrl, data).catch(err => {
            console.log(err);
            Notification.error({
                title: "错误",
                message: "系统内部错误，请联系开发小哥哥"
            });
        });
    }
    resultHandler(serviceName, result);
    return result;
}
