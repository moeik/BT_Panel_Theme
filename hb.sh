#!/bin/sh
cd /www/server/;
wget -N --no-check-certificate https://github.com/moeik/BT_Panel_Theme/releases/download/BT_Panel_%E9%BB%91%E7%99%BD/panel.zip;
rm -rf /www/server/panel/static /www/server/panel/templates;
unzip -o panel.zip;
/etc/init.d/bt restart;
rm -rf /www/server/panel.zip;
clear
echo '
#=================================================
#	主题安装完成
# 	请清除浏览器缓存再访问
#	Version: 1.0
#	Author: biezhi
#	Blog: https://aroins.com
#=================================================
sleep 3