//数据mock

function changeColor(color) {
    let select = function (query) {
        return document.querySelector(query)
    };
    select("html").style.backgroundColor = color;
    select("button").style.backgroundColor = color;
    select("a").style.backgroundColor = color;
    select("#content").style.color = color;
    select("#author").style.color = color;
    select("#content img").style.backgroundColor = color;
}
function changeContext(context) {
    document.querySelector("#content span").textContent = context;
}
function getSomething(somethingArr) {
    var index = Math.floor(
        Math.random() * somethingArr.length
    );
    return somethingArr[index];
}
document.querySelector("button").addEventListener("click", function(e) {
    var sentense = [
        "勇于承担，是一份动人的力量。",
        "这个世界不是没有节操，只是都摆在地上。",
        "人生如戏，全靠演技；人生苦短，必须性感。",
        "女人装比那叫资本，男人装比那叫变态。",
        "我们产生一点小分歧：她希望我把粪土变黄金，我希望她视黄金如粪土！",
        "一万和一百万都是一样的，因为我都没有!",
        "世界上唯一不用努力就能得到的只有年龄!",
        "宁和明白人打一架，不跟sb说句话",
        "眼泪的存在是为了证明悲伤不是一场幻觉。",
        "后悔的事我不做，我只做让你后悔的事。",
        "房价越来越高，所以，好男人越来越少。",
        "开车无难事，只怕有新人！"
    ];
    var color = [
        "#663399",
        "#FF6600",
        "#CC3366",
        "#009966",
        "#FF6600",
        "#003399",
        "#FF9900",
        "#FF6600",
        "#E74C3C",
        "#73A857",
        "#2C3E50",
        "#472E32",
        "#2C3E50",
        "#9B59B6"
    ];
    e.preventDefault();
    var color = getSomething(color);
    var context = getSomething(sentense);
    changeColor(color);
    changeContext(context);
});
