var $openid = $('.openid');

if ($openid.val()=='loading') {

    jQuery.ajax({
            type  : "get",
            async : true,
            url : 'http://wechat.highsea90.com/api/index.php',
            dataType : "jsonp",
            jsonp : "callback",
            data : {
                sid:"0"
            },
            jsonpCallback : "dataList",
            success : function(dataList){
                var code = dataList.code,
                    mtime = dataList.mtime;
                $openid.html('');

                if (code==200||code==304) {
                    //写入 select option 数据
                    var d = dataList.data;
                    for (var i = 0; i < d.length; i++) {
                        var id = d[i].id,
                            cname = d[i].cname,
                            wname = d[i].wname,
                            //originid = d[i].originid,
                            imgid = d[i].imgid,
                            openid = d[i].openid,
                            //type = d[i].type,
                            introduction = d[i].introduction,

                            str = '<option data-wname="'+wname+'" data-intro="'+introduction+'" value="'+openid+'" name="'+openid+'" data-pubimg="'+imgid+'">'+cname+'</option>';
                            $openid.append(str);
                      };  
                      
                };
                

            },
            error : function(){

            }
        });
}else{
    searchNow();
    //console.log('执行搜索');
};


function addOpenid (object){

/*    console.log(getObjectKeys(object));
    console.log(getObjectValues(object));*/

    //$openid.append('<option value="'+getObjectValues(object)+'">'+getObjectKeys(object)+'</option>');


        var keys = [];
        for (var property in object)
          keys.push(property);
        return keys;
        console.log(keys.length);



        var values = [];
        for (var property in object)
          values.push(object[property]);
        return values;

    console.log(allId.length);

    
}

/*addOpenid(allId);*/

function sogou(str){
    alert(str);
}
sogou.weixin =function(str){
    alert(str);
}
sogou.weixin.gzhcb = function(str){

    var domList = $('.list'),
        result = $('.resultHead'),
        htmlStr;

    function cHtml(i){
        domList.append("<tr class='"+i+"'><td style='display:none'>xml源码：<textarea>"+decodeURI(htmlStr)+"</textarea></td></tr>");
        //console.log(a.data('xml'));
        var textXml = $("."+i).find('textarea').text();
        var xmlToDoc = $("."+i);
        var arrayAll = textXml.split('title');
        //console.log(xmlToDoc.text());
        //-----------------console.log(arrayAll);
        //console.log(arrayAll[4].split('<site><![CDATA[')[1].split(']]></site>')[0]);
        var newTitle = arrayAll[1].split(']]></')[0].split('><![CDATA[')[1],
            newUrl = arrayAll[2].split(']]></url><')[0].split('><url><![CDATA[')[1],
            newdate = arrayAll[4].split('<date><![CDATA[')[1].split(']]></date>')[0],
            content = arrayAll[4].split('<content168><![CDATA[')[1].split(']]></content168>')[0],
            imglink = arrayAll[4].split('<imglink><![CDATA[')[1].split(']]></imglink>')[0],
            //
            site_isV = arrayAll[4].split('</content168>')[1].split('<openid><![CDATA[')[0],
            site_regexp = new RegExp('site'),
            judge_result = site_regexp.test(site_isV),
            //
            originUrl = judge_result ? arrayAll[4].split('<site><![CDATA[')[1].split(']]></site>')[0] : '无',
            goOriginUrl = originUrl==='无' ? '无' : '<a href="'+originUrl+'" target="_blank">去看看</a>',
            tableStr = "<td class='col-sm-2 xuhao_"+i+"'><a href='"+imglink+"' target='_blank'><img src="+imglink+" class='img-thumbnail img-responsive'></a></td>"
                     + "<td class='col-sm-2'><a href='"+newUrl+"' target='_blank'>" + newTitle +"</a></td>"
                     + "<td class='col-sm-4'><em>"+content+"</em></td>"
                     + "<td class='col-sm-2'>"+goOriginUrl+"</td>"
                     + "<td class='col-sm-2'> " + newdate+"</td>";
                     //console.log(judge_result);
            //console.log(newdate);
        xmlToDoc.append(tableStr);

    }

/*function decodeXml(i){
    var b = $("."+i);
    var arrayAll = decodeURI(b.data('xml')).split('title');
    b.html('<textarea>'+decodeURI(b.data('xml'))+'</textarea>');
    console.log(arrayAll[2]);

}*/

    domList.html('');
    //result.find('b').html('');

    //公众号详细信息 
    var xmlDoc = (str.items),
        wenzhangAll = str.totalItems,
        pageAll = str.totalPages,
        gzhImgUrl = 'http://img03.sogoucdn.com/app/a/100520105/'; 
    //console.log(xmlDoc.length);
    //$('.ye').html(pageAll);
    //$('.wz').html(wenzhangAll);
    var thisPub = $("[name="+$('.openid').val()+"]")==undefined ? "未知" : $("[name="+$('.openid').val()+"]");
    var thisPubImg = thisPub.data("pubimg")==undefined ? "../images/undefined.jpg" :gzhImgUrl+thisPub.data("pubimg");
    var thisPunWname = thisPub.data("wname")==undefined ? "未知" : thisPub.data("wname");
    var thisPubIntro = thisPub.data("intro")==undefined ? '未知' : thisPub.data("intro");

    result.html('<div class="col-sm-6 bs-callout bs-callout-info"><h4>'+thisPub.text()+'</h4><p>其微信ID是：<b>'+thisPunWname+'</b> —— <i>'+thisPubIntro+'</i> <br>其共有文章<b>'+wenzhangAll+'</b>篇，分为<b>'+pageAll+'</b>页。</p></div><div class="col-sm-4"><img src="'+thisPubImg+'"</div>');


    //$(domList).append(encodeURI(xmlDoc));
    //console.log(xmlDoc);
    //console.log(typeof(xmlDoc));
    //alert(str.items);

    for (var i = 0; i < xmlDoc.length; i++) {
        var htmlStr = encodeURI(xmlDoc[i]);//encodeURI
        cHtml("xml_"+i);
        //decodeXml("xml_"+i);
        //setTimeout(cDocument("doc_"+i), 500);

    };
    
}

var otext = $("#submit");

otext.on('click',function(){
    searchNow();
});

function searchNow (){
    var page = $('.page').val(),
        t = '1415260390998',
        script,
        url='http://weixin.sogou.com/gzhjs?cb=sogou.weixin.gzhcb&openid='+$openid.val()+'&page='+page+'&t='+t;
        //url='http://w.sugg.sogou.com/sugg/ajaj_json.jsp?key='+ inputKey +'&type=wxpub&ori=yes&pr=web&abtestid=&ipn=';

        //if ($('.list').html()==''||$('.openid').val()!='oIWsFt5LBqZonLTOrdE6oMbmvzRU') {

            //$('.resultHead').find('b').html('');
            
            if(script){
                document.body.removeChild(script);
            }else{
                script=document.createElement('script');
                script.src = url;
                document.body.appendChild(script);
            }

        //};
}


