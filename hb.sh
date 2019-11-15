#!/bin/sh
cd /www/server/;
rm -rf /www/server/panel/static /www/server/panel/templates;
wget -N --no-check-certificate https://github.com/moeik/BT_Panel_Theme/releases/download/BT_Panel_%E9%BB%91%E7%99%BD/panel.zip;
unzip -o panel.zip;
/etc/init.d/nginx restart;
rm -rf /www/server/panel.zip;
echo '
#=================================================
#	主题安装完成
# 	请清除浏览器缓存再访问
#	Version: 1.0
#	Author: biezhi
#	Blog: https://aroins.com