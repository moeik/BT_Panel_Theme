#!/bin/sh
cd /www/server/
rm -rf /www/server/panel/static /www/server/panel/templates
wget -N --no-check-certificate https://github.com/moeik/BT_Panel_Theme/releases/download/BT_Panel_%E7%BC%A4%E7%BA%B7/panel.zip
unzip -o panel.zip
cd
/etc/init.d/nginx restart
rm -rf /www/server/panel.zip
echo '
#=================================================
#	主题安装完成
# 	请清除浏览器缓存再访问
#	Version: 1.0
#	Author: biezhi
#	Blog: https://aroins.com
#=================================================
'
