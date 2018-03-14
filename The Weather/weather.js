//函数：把数据填入ＤＯＭ中
function updateWeather([now, today, todayIndex, future]) {
    var getTextSelection = function (selector) {
        return document.querySelector(selector);
    }
    var getAllTextSelection = function (selector) {
        return document.querySelectorAll(selector);
    }
    var nowSelector = [
        "#now-time",
        "#now-temp"
    ];
    var todaySelector = [
        "#today-week",
        "#today-weather-words",
        "#today-weather-temp",
        "#today-weather-wind",
        "#today-weather-dry ",
    ];
    var todayIndexSelection = getAllTextSelection("#today-weather-index span");
    var futureSelction = [
        ".future-temp",
        ".future-weather",
        ".future-week",
        ".future-date"
    ].map(function (val) {
       return getAllTextSelection(val);
    });
    var updateWithSelector = function (selector, date) {
        for (var i = 0; i < selector.length; i++) {
            getTextSelection(selector[i]).textContent = date[i];
        }
    };
    var updateWithSelection = function (selection ,date)  {
        for (var i = 0; i < selection.length; i++) {
            selection[i].textContent = date[i];
        }
    };
    updateWithSelector(nowSelector, now);//更新及时信息
    updateWithSelector(todaySelector, today);//更新今日信息
    updateWithSelection(todayIndexSelection, todayIndex);//更新未来信息
    for (var i = 0; i < futureSelction.length; i++) {
        updateWithSelection(futureSelction[i], future[i]);
    }
}

//函数: 获取本机坐标
function getGps() {
    var gpsLocation = navigator.geolocation.getCurrentPosition(function(pos) {
    return [pos.coords.latitude, pos.coords.longtitude]
    });
}
//函数：添加JSONP
function addJSONP(url) {
    var script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);
}

//过滤出本项目要用到的天气JSON数据,并把它转化为数组形式，得到数据后更新dom数据
function filterWeatherJson(response) {
    var response = JSON.parse(JSON.stringify(response));
    var result = response.result;
    var resultFuture = result.future;
    var now = [
        result.sk.time,//time
        result.sk.temp//currentTemp
    ];
    var today = [
        result.today.week, //week
        result.today.weather, //weather
        result.today.temperature, //temp
        result.today.wind, //wind
        result.sk.humidity //humidity
    ];
    var todayIndex = [
        result.today["dressing_index"], //dressingIn
        result.today["uv_index"], //uv
        result.today["wash_index"], //car
        result.today["travel_index"], //travel
        result.today["exercise_index"], //exercise
        result.today["dressing_advice"], //dressingAd
    ]
    //对象转数组，并改变数组顺序。把每个子对象的第n个属性添加巾第n的子对象中去
    function outputNewOrder(obj) {
        var prop = Object.keys(obj);
        var propLength = prop.length;
        var arr = [];
        var innerProp = Object.keys(obj[Object.keys(obj)[0]]);
        var innerPropLength = innerProp.length;
        while (arr.length < innerPropLength) 
            arr.push([]);
        for (var i = 0; i < propLength; i++) {
            var innerProp = Object.keys(obj[Object.keys(obj)[i]]);
            for (var j = 0; j < innerPropLength; j++) {
                arr[j].push(obj[prop[i]][innerProp[j]]);
            };
        }
        return arr;
    }
    var future = {};
    for (var key in resultFuture) {
        future[key] = {};
        //注意下面的取得对象值的写法，
        //[key]里面的key是变量，如果要设置的属性是变量，必须用[]这种形式
        //.key这样写的等价["key"]来取得或设置"key"的值
        for (var index in resultFuture[key]) {
            if (index === "date" || index === "week" || index === "weather" || index === "temperature") {
            //这里千万不能写成index === "temperature" || "weather"，因为===比||有更高的优先级
            future[key][index] = resultFuture[key][index];
            if (index === "date") future[key][index] = resultFuture[key][index].replace((new Date()).getFullYear().toString(), "");
            }
        }
    }
    var future = outputNewOrder(future);
    updateWeather([now, today, todayIndex, future]);
}
//使用jsonp向服务器请求原始json数据
function getWeatherDate(option_) {
    var option = {
        gps: ["", ""],
        ip: "",
        cityname: "北京",
        dtype: "json",
        format: 2,
    };
    for (var key in option_) {
        if (typeof option_[key] == "undefined") return false;
        option[key] = option_[key];
    }
    var mode = option.ip ? "ip" : "geo";
    var log = option.gps[0] ? "&log=" + option.gps[0] : "";
    var lat = option.gps[1] ? "&lat=" + option.gps[1] : "";
    var url = "http://v.juhe.cn/weather/"
        + mode
        + "?format=" + option.format 
        + log
        + lat
        + "&key=f8b7952e1e6464068c55ef74eaea3c59"
        + "&ip=" + option.ip
        + "&callback=filterWeatherJson";
    addJSONP(url)
}

//获取本机ip地址
//获取本机gps地址
function getIp(response) {
    // alert(response.ip);
    getWeatherDate({
        ip: response.ip
    });
    //注意，jsonp是异步加载，不支持同步调用，所以下一次jsonp必须在回调里面指定。
}
// addJSONP("http://freegeoip.net/json/?callback=getIp");
// filterWeatherJson({
//     "resultcode": "200",
//     "reason": "successed!",
//     "result": {
//         "sk": {
//             "temp": "4",
//             "wind_direction": "北风",
//             "wind_strength": "1级",
//             "humidity": "70%",
//             "time": "00:52"
//         },
//         "today": {
//             "temperature": "3℃~17℃",
//             "weather": "晴转多云",
//             "weather_id": {
//                 "fa": "00",
//                 "fb": "01"
//             },
//             "wind": "南风微风",
//             "week": "星期二",
//             "city": "北京",
//             "date_y": "2018年03月13日",
//             "dressing_index": "较舒适",
//             "dressing_advice": "建议着薄外套、开衫牛仔衫裤等服装。年老体弱者应适当添加衣物，宜着夹克衫、薄毛衣等。",
//             "uv_index": "中等",
//             "comfort_index": "",
//             "wash_index": "较适宜",
//             "travel_index": "较不宜",
//             "exercise_index": "较不宜",
//             "drying_index": ""
//         },
//         "future": [
//             {
//                 "temperature": "3℃~17℃",
//                 "weather": "晴转多云",
//                 "weather_id": {
//                     "fa": "00",
//                     "fb": "01"
//                 },
//                 "wind": "南风微风",
//                 "week": "星期二",
//                 "date": "20180313"
//             }, {
//                 "temperature": "5℃~15℃",
//                 "weather": "多云转阴",
//                 "weather_id": {
//                     "fa": "01",
//                     "fb": "02"
//                 },
//                 "wind": "南风微风",
//                 "week": "星期三",
//                 "date": "20180314"
//             }, {
//                 "temperature": "0℃~9℃",
//                 "weather": "多云转晴",
//                 "weather_id": {
//                     "fa": "01",
//                     "fb": "00"
//                 },
//                 "wind": "东北风3-5级",
//                 "week": "星期四",
//                 "date": "20180315"
//             }, {
//                 "temperature": "1℃~8℃",
//                 "weather": "多云转阴",
//                 "weather_id": {
//                     "fa": "01",
//                     "fb": "02"
//                 },
//                 "wind": "南风微风",
//                 "week": "星期五",
//                 "date": "20180316"
//             }, {
//                 "temperature": "1℃~9℃",
//                 "weather": "多云",
//                 "weather_id": {
//                     "fa": "01",
//                     "fb": "01"
//                 },
//                 "wind": "南风微风",
//                 "week": "星期六",
//                 "date": "20180317"
//             }, {
//                 "temperature": "5℃~15℃",
//                 "weather": "多云转阴",
//                 "weather_id": {
//                     "fa": "01",
//                     "fb": "02"
//                 },
//                 "wind": "南风微风",
//                 "week": "星期日",
//                 "date": "20180318"
//             }, {
//                 "temperature": "5℃~15℃",
//                 "weather": "多云转阴",
//                 "weather_id": {
//                     "fa": "01",
//                     "fb": "02"
//                 },
//                 "wind": "南风微风",
//                 "week": "星期一",
//                 "date": "20180319"
//             }
//         ]
//     },
//     "error_code": 0
// });

//所有接受回调函数的方法，想要同步执行，必须在回调的函数里面指定；
//本例中有地理位置的获取和jsonp都是这样的情况

//动画效果
function hideAndShow(hideSelector, eventSelector, event) {
    var hideEle = document.querySelector(hideSelector);
    var eventEle = document.querySelector(eventSelector);
    var isHidden = true;
    eventEle.addEventListener(event, function(e) {
        if(isHidden) {
            // hideEle.style.visibility = "visible";
            hideEle.style.opacity = 1;
            isHidden = false;
        }else{
            // hideEle.style.visibility = "hidden";
            hideEle.style.opacity = 0;
            isHidden = true;
        }
    })
}
hideAndShow("#today-weather-index", "#today-index", "click")