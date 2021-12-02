var meetJsonArray=window.parent.meetJsonArray;

var nowTime=new Date().getTime()


$(function(){
    showSearchList();
});

function showSearchList(){
    $("#meetNotice").html("");
    $(".pagination-container").html("");
    var name=$("#name").val();
    for(var i=0;i<meetJsonArray.length;i++){
		var meet = meetJsonArray[i];
		if(meet!=undefined){
		var inShow = false;
		
		if(name!=""){
			if(meet.mname.indexOf(name)!=-1){
				inShow=true;
			}
		}else{
			inShow=true;
		}
		
		if(inShow){
            var strTime=new Date(Date.parse((meet.mstart).replace('/-/g','/'))).getTime();
			if(strTime>nowTime){
			var trStr = "<tr>"+
				"<td><input type='checkbox' name='id' value='"+meet.mid+"' /></td>"+
				"<td>"+meet.mname+"</td>"+
				"<td>"+meet.mroom+"</td>"+
                "<td>"+meet.mstart+"</td>"+
                "<td>"+meet.mend+"</td>"+
				"<td>"+meet.mtime+"</td>"+
                "<td>"+meet.mper+"</td>"+
				"<td><img onclick='showEditMeet("+meet.mid+")' src='../../img/update.gif' /></td>"+
				"</tr>";
			$("#meetNotice").append(trStr);
			}
        
		}
	}
	}
	setPage();
}




//使用分页插件，进行分页展现
function setPage(){
	$('.table tbody').paginathing({
	  perPage: 3,//每页展现条数
	  insertAfter: '.table',
	  pageNumbers: true
	});
}


function showEditMeet(mid){
    window.location.href="editMeet.html?mid="+mid;
}

var mid = getParam("mid");
var meetJsonArray=window.parent.meetJsonArray;

$(function(){
    for(var i=0;i<meetJsonArray.length;i++){
    var meet=meetJsonArray[i];
    if(meet.mid==mid){
        $("#name").val(meet.mname);
        $("#room").val(meet.mroom);
        $("#start").val(meet.mstart);
        $("#end").val(meet.mend);
        $("#time").val(meet.mtime);
        $("#per").val(meet.mper);

        break;
        }
    }
});

function updateDept(){
    var mname=$("#name").val();
    var mroom=$("#room").val();
    var mstart=$("#start").val();
    var mend=$("#end").val();
    var mtime=$("#time").val();
    var mper=$("#per").val();
    for (var i=0;i<meetJsonArray.length;i++){
        var meet=meetJsonArray[i];
        if(meet.mid==mid){
            meet.mname=mname;
            meet.mroom=mroom;
            meet.mstart=mstart;
            meet.mend=mend;
            meet.mtime=mtime;
            meet.mper=mper;
            alert("修改成功");
            window.location.href="meetRer.html";
        }
    }
}

function checkAll(){
	var isChecked = $("#checkAll").prop("checked");
	var checkboxes = $("input[name='id']");
	for(var i=0;i<checkboxes.length;i++){
		var idCheckbox = checkboxes[i];
		if($(idCheckbox).parent().parent("tr").css("display")=="table-row"){
			$(idCheckbox).prop("checked",isChecked);
		}
	}
}

function delChecked(){
	var checkeds = $("input[name='id']:checked");
	if(checkeds.length>0){
		var flag = window.confirm("确定要删除吗？");
		
		if(flag){
			//alert("用户点击了确定删除");
			//选中的部门一个个删掉
			for(var i=0; i<checkeds.length;i++){
				var thisChecked=checkeds[i];
				var delMid=$(thisChecked).val();
				delJson(delMid);
			}
			showSearchList();
		}
	}else{
		alert("请选择要删除的数据");
	}
	
}

//从Json数组中删除指定部门编号的部门信息
function delJson(delMid){
	for(var i=0;i<meetJsonArray.length;i++){
		var meet=meetJsonArray[i];
		if(meet!=undefined){
			if(meet.mid==delMid){
				delete meetJsonArray[i];
				return;
			}
		}
	}
}