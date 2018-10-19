#####
	branch and tag 

	### 
		t0.1.* 项目导入篇，基础依赖篇
		t0.1.0
			react app create.
		
		t0.1.1 搭建项目路由
			引入react-router react-router-dom插件
			simple app page 路由结构搭建

		t0.1.2 搭建项目简易栅格结构
			1.引入 antd , yarn add antd --save
			2.创建 AdminRouter 页面通用主路由
			3. 创建 navLeft 组件

		t0.1.3 项目支持less
			1.引入axios less-loader less 插件
			2. 执行 yarn eject 暴露webpack 配置
			3. webpack 配置 配置less

			仿造 css webpack 配置 resource/webpack/readCopy.md
				
		t0.1.4 加载antd 样式
			1. 引入antd 样式 
			2. 通过 babel-plugin-import 按需加载 
				参考链接: https://ant.design/docs/react/getting-started-cn#按需加载
				webpack 配置 resource/webpack/readCopy.md
			3. 改变主体颜色

			bugs
				1. Babel@7+ 后 “Options can't be an array in babel@7+, but you can add plugins with name to support multiple dependencies.”
				参考 https://github.com/ant-design/babel-plugin-import 相关
				2. less 报错， 降级 less 到2.7.3 
					yarn add less@2.7.3

		t0.1.5 less 练习
			less 概览
			参考： http://www.css88.com/doc/less/features/

		t0.2.* 几种基础路由页面配置 && antd 组件 && redux navLick 点击应用
		
			t0.2.1 AdminRouter 路由页面构建
				1. 补充，AdmindRouter 样式，补充缺失 less样式配置
					a.增加颜色等常量 default.less
				2.navLeft
				3.header
					a.timeUtil 创建  moment库引入
				4.footer

			t0.2.2 Admin Base页面 redux应用
				1. 导入redux react-redux redux-logger库
				2. 创建 reducer 创建store 
				3. root 组件用Provider 组件包装
				4. navMenu reducer 在NavLeft 和Header组件关联

			t0.2.3 commonRouter 补充  mainRouter 完善
				1.Home Error 页面补充
				2.CommonRouter 完成 
				3.MainRouter login

			t0.2.4 button && modals && Loading && Notification
				ui 上
				1. Button page
				2. Modal page
				3. Loading page
				4. Notification page

			t0.2.5 message && Tab && gallery && carousel
				ui 下
				1. message page
				2. tab page
				3. 图片画廊
				4. 轮播图

			t0.2.6 表单
				Form 表单
				1. LoginForm page
				2. RegisterForm page
					config constants 建立