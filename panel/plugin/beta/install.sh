#!/bin/bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH
install_tmp='/tmp/bt_install.pl'
download_Url=http://download.bt.cn

Install_Beta()
{
	mkdir -p /www/server/panel/plugin/beta
	f1=/www/server/panel/data/beta.pl
	if [ ! -f "$f1" ];then
		echo 'False' > $f1
	fi
	f2=/www/server/panel/plugin/beta/config.conf
	if [ ! -f "$f2" ];then
		echo 'False' > $f2
	fi
	echo '正在安装脚本文件...' > $install_tmp
	wget -O /www/server/panel/plugin/beta/beta_main.py $download_Url/install/lib/plugin/beta/beta_main.py -T 5
	wget -O /www/server/panel/plugin/beta/index.html $download_Url/install/lib/plugin/beta/index.html -T 5
	echo '安装完成' > $install_tmp
}

Uninstall_Beta()
{
	rm -rf /www/server/panel/plugin/beta
	rm -f /www/server/panel/data/beta.pl
}


action=$1
if [ "${1}" == 'install' ];then
	Install_Beta
else
	Uninstall_Beta
fi
