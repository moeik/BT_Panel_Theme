//关闭面板
function ClosePanel(){
	layer.confirm(lan.config.close_panel_msg,{title:lan.config.close_panel_title,closeBtn:2,icon:13,cancel:function(){
		$("#closePl").prop("checked",false);
	}}, function() {
		$.post('/config?action=ClosePanel','',function(rdata){
			layer.msg(rdata.msg,{icon:rdata.status?1:2});
			setTimeout(function(){window.location.reload();},1000);
		});
	},function(){
		$("#closePl").prop("checked",false);
	});
}

//设置自动更新
function SetPanelAutoUpload(){
	loadT = layer.msg(lan.public.config,{icon:16,time:0});
	$.post('/config?action=AutoUpdatePanel','',function(rdata){
		layer.close(loadT);
		layer.msg(rdata.msg,{icon:rdata.status?1:2});
	});
}


$(".set-submit").click(function(){
	var data = $("#set-Config").serialize();
	layer.msg(lan.config.config_save,{icon:16,time:0,shade: [0.3, '#000']});
	$.post('/config?action=setPanel',data,function(rdata){
		layer.closeAll();
		layer.msg(rdata.msg,{icon:rdata.status?1:2});
		if(rdata.status){
			setTimeout(function(){
				window.location.href = ((window.location.protocol.indexOf('https') != -1)?'https://':'http://') + rdata.host + window.location.pathname;
			},1500);
		}
	});
	
});


function syncDate(){
	var loadT = layer.msg(lan.config.config_sync,{icon:16,time:0,shade: [0.3, '#000']});
	$.post('/config?action=syncDate','',function(rdata){
		layer.close(loadT);
		layer.msg(rdata.msg,{icon:1});
		setTimeout(function(){
				window.location.reload();
			},1500);
	});
}

//PHP守护程序
function Set502(){
	var loadT = layer.msg(lan.public.the,{icon:16,time:0,shade: [0.3, '#000']});
	$.post('/config?action=Set502','',function(rdata){
		layer.close(loadT);
		layer.msg(rdata.msg,{icon:rdata.status?1:2});
	});	
}

//绑定修改宝塔账号
function bindBTName(a,type){
	var titleName = lan.config.config_user_binding;
	if(type == "b"){
		btn = "<button type='button' class='btn btn-success btn-sm' onclick=\"bindBTName(1,'b')\">"+lan.config.binding+"</button>";
	}
	else{
		titleName = lan.config.config_user_edit;
		btn = "<button type='button' class='btn btn-success btn-sm' onclick=\"bindBTName(1,'c')\">"+lan.public.edit+"</button>";
	}
	if(a == 1) {
		p1 = $("#p1").val();
		p2 = $("#p2").val();
		var loadT = layer.msg(lan.config.token_get,{icon:16,time:0,shade: [0.3, '#000']});
		$.post(" /ssl?action=GetToken", "username=" + p1 + "&password=" + p2, function(b){
			layer.close(loadT);
			layer.msg(b.msg, {icon: b.status?1:2});
			if(b.status) {
				window.location.reload();
				$("input[name='btusername']").val(p1);
			}
		});
		return
	}
	layer.open({
		type: 1,
		area: "290px",
		title: titleName,
		closeBtn: 2,
		shift: 5,
		shadeClose: false,
		content: "<div class='bt-form pd20 pb70'><div class='line'><span class='tname'>"+lan.public.user+"</span><div class='info-r'><input class='bt-input-text' type='text' name='username' id='p1' value='' placeholder='"+lan.config.user_bt+"' style='width:100%'/></div></div><div class='line'><span class='tname'>"+lan.public.pass+"</span><div class='info-r'><input class='bt-input-text' type='password' name='password' id='p2' value='' placeholder='"+lan.config.pass_bt+"' style='width:100%'/></div></div><div class='bt-form-submit-btn'><button type='button' class='btn btn-danger btn-sm' onclick=\"layer.closeAll()\">"+lan.public.cancel+"</button> "+btn+"</div></div>"
	})
}
//解除绑定宝塔账号
function UnboundBt(){
	var name = $("input[name='btusername']").val();
	layer.confirm(lan.config.binding_un_msg,{closeBtn:2,icon:3,title:lan.config.binding_un},function(){
		$.get("/ssl?action=DelToken",function(b){
			layer.msg(b.msg,{icon:b.status? 1:2})
			$("input[name='btusername']").val('');
		})
	})
}
$.get("/ssl?action=GetUserInfo",function(b){
	if(b.status){
		$("input[name='btusername']").val(b.data.username);
		$("input[name='btusername']").next().text(lan.public.edit).attr("onclick","bindBTName(2,'c')").css({"margin-left":"-82px"});
		$("input[name='btusername']").next().after('<span class="btn btn-xs btn-success" onclick="UnboundBt()" style="vertical-align: 0px;">'+lan.config.binding_un+'</span>');
	}
	else{
		$("input[name='btusername']").next().text(lan.config.binding).attr("onclick","bindBTName(2,'b')").removeAttr("style");
	}
});

//设置API
function apiSetup(){
	var loadT = layer.msg(lan.config.token_get,{icon:16,time:0,shade: [0.3, '#000']});
	$.get('/api?action=GetToken',function(rdata){
		layer.close(loadT);
		
	});
}


//设置模板
function setTemplate(){
	var template = $("select[name='template']").val();
	var loadT = layer.msg(lan.public.the,{icon:16,time:0,shade: [0.3, '#000']});
	$.post('/config?action=SetTemplates','templates='+template,function(rdata){
		layer.close(loadT);
		layer.msg(rdata.msg,{icon:rdata.status?1:5});
		if(rdata.status === true){
			$.get('/system?action=ReWeb',function(){});
			setTimeout(function(){
				window.location.reload();
			},3000);
		}
	});
}

//设置面板SSL
function setPanelSSL(){
	var status = $("#sshswitch").prop("checked")==true?1:0;
	var msg = $("#panelSSL").attr('checked')?lan.config.ssl_close_msg:'<a style="font-weight: bolder;font-size: 16px;">'+lan.config.ssl_open_ps+'</a><li style="margin-top: 12px;color:red;">'+lan.config.ssl_open_ps_1+'</li><li>'+lan.config.ssl_open_ps_2+'</li><li>'+lan.config.ssl_open_ps_3+'</li><p style="margin-top: 10px;"><input type="checkbox" id="checkSSL" /><label style="font-weight: 400;margin: 3px 5px 0px;" for="checkSSL">'+lan.config.ssl_open_ps_4+'</label><a target="_blank" class="btlink" href="https://www.bt.cn/bbs/thread-4689-1-1.html" style="float: right;">'+lan.config.ssl_open_ps_5+'</a></p>';
	layer.confirm(msg,{title:lan.config.ssl_title,closeBtn:2,icon:3,area:'550px',cancel:function(){
		if(status == 0){
			$("#panelSSL").prop("checked",false);
		}
		else{
			$("#panelSSL").prop("checked",true);
		}
	}},function(){
		if(window.location.protocol.indexOf('https') == -1){
			if(!$("#checkSSL").prop('checked')){
				layer.msg(lan.config.ssl_ps,{icon:2});
				return false;
			}
		}
		var loadT = layer.msg(lan.config.ssl_msg,{icon:16,time:0,shade: [0.3, '#000']});
		$.post('/config?action=SetPanelSSL','',function(rdata){
			layer.close(loadT);
			layer.msg(rdata.msg,{icon:rdata.status?1:5});
			if(rdata.status === true){
				$.get('/system?action=ReWeb',function(){});
				setTimeout(function(){
					window.location.href = ((window.location.protocol.indexOf('https') != -1)?'http://':'https://') + window.location.host + window.location.pathname;
				},1500);
			}
		});
	},function(){
		if(status == 0){
			$("#panelSSL").prop("checked",false);
		}
		else{
			$("#panelSSL").prop("checked",true);
		}
	});
}

function GetPanelSSL(){
	var loadT = layer.msg('正在获取证书信息...',{icon:16,time:0,shade: [0.3, '#000']});
	$.post('/config?action=GetPanelSSL',{},function(cert){
		layer.close(loadT);
		var certBody = '<div class="tab-con">\
			<div class="myKeyCon ptb15">\
				<div class="ssl-con-key pull-left mr20">密钥(KEY)<br>\
					<textarea id="key" class="bt-input-text">'+cert.privateKey+'</textarea>\
				</div>\
				<div class="ssl-con-key pull-left">证书(PEM格式)<br>\
					<textarea id="csr" class="bt-input-text">'+cert.certPem+'</textarea>\
				</div>\
				<div class="ssl-btn pull-left mtb15" style="width:100%">\
					<button class="btn btn-success btn-sm" onclick="SavePanelSSL()">保存</button>\
				</div>\
			</div>\
			<ul class="help-info-text c7 pull-left">\
				<li>粘贴您的*.key以及*.pem内容，然后保存即可<a href="http://www.bt.cn/bbs/thread-704-1-1.html" class="btlink" target="_blank">[帮助]</a>。</li>\
				<li>如果浏览器提示证书链不完整,请检查是否正确拼接PEM证书</li><li>PEM格式证书 = 域名证书.crt + 根证书(root_bundle).crt</li>\
			</ul>\
		</div>'
		layer.open({
			type: 1,
			area: "600px",
			title: '自定义面板证书',
			closeBtn: 2,
			shift: 5,
			shadeClose: false,
			content:certBody
		});
	});
}

function SavePanelSSL(){
	var data = {
		privateKey:$("#key").val(),
		certPem:$("#csr").val()
	}
	var loadT = layer.msg(lan.config.ssl_msg,{icon:16,time:0,shade: [0.3, '#000']});
	$.post('/config?action=SavePanelSSL',data,function(rdata){
		layer.close(loadT);
		if(rdata.status){
			layer.closeAll();
		}
		layer.msg(rdata.msg,{icon:rdata.status?1:2});
	});
}

if(window.location.protocol.indexOf('https') != -1){
	$("#panelSSL").attr('checked',true);
}

var weChat = {
		settiming:'',
		relHeight:500,
		relWidth:500,
		userLength:'',
		init:function(){
			var _this = this;
			$('.layui-layer-page').css('display', 'none');
			$('.layui-layer-page').width(_this.relWidth);
			$('.layui-layer-page').height(_this.relHeight);
			$('.bt-w-menu').height((_this.relWidth - 1) - $('.layui-layer-title').height());
			var width = $(document).width();
			var height = $(document).height();
			var boxwidth =  (width / 2) - (_this.relWidth / 2);
			var boxheight =  (height / 2) - (_this.relHeight / 2);
			$('.layui-layer-page').css({
				'left':boxwidth +'px',
				'top':boxheight+'px'
			});
			$('.boxConter,.layui-layer-page').css('display', 'block');
			$('.layui-layer-close').click(function(event) {
				window.clearInterval(_this.settiming);
			});
			this.getUserDetails();
			$('.iconCode').hide();
			$('.personalDetails').show();
		},
		// 获取二维码
		getQRCode:function(){
			var _this = this;
			var qrLoading = layer.msg('正在获取二维码,请稍后...',{time:0,shade: [0.4,'#fff'],icon:16});
			$.get('/wxapp?action=blind_qrcode', function(res) {
				layer.close(qrLoading);
				if (res.status){
                	$('#QRcode').empty();
					$('#QRcode').qrcode({
					    render: "canvas", //也可以替换为table
					    width: 200,
					    height: 200,
					    text:res.msg
					});
					// $('.QRcode img').attr('src', res.msg);
					_this.settiming =  setInterval(function(){
						_this.verifyBdinding();
					},2000);
				}else{
					layer.msg('无法获取二维码，请稍后重试',{icon:2});
				}
			});
		},
		// 获取用户信息
		getUserDetails:function(type){
			var _this = this;
			var conter = '';
			$.get('/wxapp?action=get_user_info',function(res){
				clearInterval(_this.settiming);
				if (!res.status){
					layer.msg(res.msg,{icon:2,time:3000});
					$('.iconCode').hide();
					return false;
				}
				if (JSON.stringify(res.msg) =='{}'){
					if (type){
						layer.msg('当前绑定列表为空,请先绑定然后重试',{icon:2});
					}else{
						_this.getQRCode();
					}
					$('.iconCode').show();
					$('.personalDetails').hide();
					return false;
				}
				$('.iconCode').hide();
				$('.personalDetails').show();
				var datas = res.msg;
				for(var item in datas){
					conter += '<li class="item">\
								<div class="head_img"><img src="'+datas[item].avatarUrl+'" title="用户头像" /></div>\
								<div class="nick_name"><span>昵称:</span><span class="nick"></span>'+datas[item].nickName+'</div>\
								<div class="cancelBind">\
									<a href="javascript:;" class="btlink" title="取消当前微信小程序的绑定" onclick="weChat.cancelBdinding('+ item +')">取消绑定</a>\
								</div>\
							</li>'
				}
				conter += '<li class="item addweChat" style="height:45px;"><a href="javascript:;" class="btlink" onclick="weChat.addweChatView()"><span class="glyphicon glyphicon-plus"></span>添加绑定账号</a></li>'
				$('.userList').empty().append(conter);
			});
		},
		// 添加绑定视图
		addweChatView:function(){
			$('.iconCode').show();
			$('.personalDetails').hide();
			this.getQRCode();
		},
		// 取消当前绑定
		cancelBdinding:function(uid){
			var _this = this;
			var bdinding = layer.confirm('您确定要取消当前绑定吗？',{
				btn:['确认','取消'],
				icon:3,
				title:'取消绑定'
			},function(){
				$.get('/wxapp?action=blind_del',{uid:uid}, function(res) {
					layer.msg(res.msg,{icon:res.status?1:2});
					_this.getUserDetails();
				});
			},function(){
				layer.close(bdinding);
			});
		},
		// 监听是否绑定
		verifyBdinding:function(){
			var _this = this;
			$.get('/wxapp?action=blind_result',function(res){
				if(res){
					layer.msg('绑定成功',{icon:1});
					clearInterval(_this.settiming);
					_this.getUserDetails();
				}
			});
		},
	}
	
function open_wxapp(){
	var rhtml = '<div class="boxConter" style="display: none">\
					<div class="iconCode" >\
						<div class="box-conter">\
							<div id="QRcode"></div>\
							<div class="codeTip">\
								<ul>\
									<li>1、打开宝塔面板小程序<span class="btlink weChat">小程序二维码<div class="weChatSamll"><img src="https://app.bt.cn/static/app.png"></div></span></li>\
									<li>2、使用宝塔小程序扫描当前二维码，绑定该面板</li>\
								</ul>\
								<span><a href="javascript:;" title="返回面板绑定列表" class="btlink" style="margin: 0 auto" onclick="weChat.getUserDetails(true)">查看绑定列表</a></span>\
							</div>\
						</div>\
					</div>\
					<div class="personalDetails" style="display: none">\
						<ul class="userList"></ul>\
					</div>\
				</div>'
	
	layer.open({
		type: 1,
		title: "绑定微信",
		area: '500px',
		closeBtn: 2,
		shadeClose: false,
		content:rhtml
	});
	
	weChat.init();
}