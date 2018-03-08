//函数：把数据填入ＤＯＭ中
function getTextContent(selection) {
    return document.querySelector(selection).textContent;
}
function getAllTextContent(selection) {
    return document.querySelectorAll(selection).map(function(val) {
        return val.textContent;
    })
}
function updateWeather([now, today, todayIndex, future]) {
    var nowSelection = [
        "#now-time",
        "#now-temp"
    ];
    var todaySelection = [
        "#today-week",
        "#today-weather-words",
        "#today-weather-temp",
        "#today-weather-wind",
        "#today-weather-dry ",
    ];
    var futureSelction = [
        "#future-date",
        "#future-week",
        "#future-weather",
        "#future-temp"
    ];
    
    var now = nowSelection.map(function(val) {
        return getTextContent(val);
    });
    var today = todaySelection.map(function(val) {
        return getTextContent(val);
    })
    var todayIndex = getAllTextContent("#today-weather-index span");
    var future = futureSelection.map(function(val) {
        return getAllTextContent(val)
    })//future = [[date, date, date, date], [week...], [weather...], [temp]]
    var image = document.querySelector("img").src;

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

//过滤出本项目要用到的天气JSON数据
var weather = [];
function filterWeatherJson(response) {
    var result = response.result;
    var resultFuture = result.future;
    var now = {
        time: result.sk.time,
        currentTemp: result.sk.temp
    };
    var today = {
        week: result.today.week,
        weather: result.today.weather,
        temp: result.today.temperature,
        wind: result.today.wind,
        humidity: result.sk.humidity;
    };
    var todayIndex = {
        dressingIn : result.today["dressing_index"],
        uv : result.today["uv_index"],
        car : result.today["wash_index"],
        travel : result.today["travel_index"],
        exercise : result.today["exercise_index"],
        dressingAd : result.today["dressing_advice"],
    }
    var future = {
        model: {
            date: "",
            temperature: "",
            weather: ""
        }
    };
    for (var key in resultFuture) {
        future[key] = {};
        //注意下面的取得对象值的写法，
        //[key]里面的key是变量，如果要设置的属性是变量，必须用[]这种形式
        //.key这样写的等价["key"]来取得或设置"key"的值
        for (var index in resultFuture[key]) {
            if (index === "date" || index === "week" || index === "weather" || index === "temperature") {//这里千万不能写成index === "temperature" || "weather"，因为===比||有更高的优先级
                future[key][index] = resultFuture[key][index];
            }
        }
    }
    return weather = [now, today, future];
}
//使用jsonp向服务器请求原始json数据
function getWeatherJson(option_) {
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
//优先根据gps获取天气，如果拒绝就用ip获取天气
function getIp(response) {
    alert(response.ip);
    var gps = getGps();
    if(gps) {
        getWeatherJson({
            ip: response.ip
        })   
    }else{
        getWeatherJson({
            ip: response.ip
    })

    }
    //注意，jsonp是异步加载，不支持同步调用，所以下一次jsonp必须在回调里面指定。
    getWeatherJson({
        ip: response.ip
    })
}
addJSONP("http://freegeoip.net/json/?callback=getIp");

// if (gps) {
// }else{
//     getWeatherJson({
//         gps: gps
//     })
// }
//所以接受回调函数的方法，想要同步执行，必须在回调的函数里面指定；
//本例中有地理位置的获取和jsonp都是这样的情况