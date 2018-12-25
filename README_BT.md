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

		t0.2.* 组件篇
			几种基础路由页面配置 && antd 组件 && redux navLick 点击应用
		
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

			t0.2.7 表格
				Table 表格
				t0.2.7.1 表格1 
				1. 封装axios 
					导入 axios , yarn add axios
					public html补充 loading 组件 和其样式 loading.less
				2. Base Table
					基础表格-数据mock
				t0.2.7.2 表格2
				3. Base Table
					表格单选
					表格复选
					表格分页
						tableUtil 添加
				4. High Table
					头部固定
					左侧固定
					排序
					操作
				5. axios catch 捕获
			
			t0.2.8 富文本
				1. MainRouter 里增加 Redirect 设置，未定义路由跳回home 页面
				2. 富文本 
					引入依赖库 react-draft-wysiwyg draftjs-to-html

			t0.2.9 图表
				1. 安装插件 echarts-for-react echarts
					添加echarts 主题 echartTheme
				2. 柱状图
				3. 饼状图
				4. 折线图

		t0.3.* 业务篇
			
			t0.3.1城市管理
				1.timeUtil 丰富
				2.cityPage
					a.展示城市列表(复选框)
						调整表格通用样式 (class-common.less)content-wrap
					b.开通城市，删除城市
				3.头部筛选
			t0.3.2.1 项目工程化
				1.通用 FilterForm 
					引入 react props 检查库 prop-types
					城市管理 cityPage 中应用 FilterForm

			t0.3.2.2 项目工程化2
				1. 通用 CommonTable
					城市管理 cityPage 中应用 CommonTable
				  onchange && onRow区别
						onRow： onClick  点击行
						onchange 点击复选框列（一列）

			t0.3.3 车辆地图
				1.头部 筛选 
				2.地图
					1).地图插件的引入
						地图功能概览 https://www.jianshu.com/p/2ea9fbb195dd

						a.创建ak,加载百度地图SDK 
						加载： 在public index.html 文件 title 下引入地图 script
						参考： http://lbsyun.baidu.com/index.php?title=jspopular/guide/helloworld
						b.初始化地图
						注意点 BMap 需要挂载在window对象下
					2) 地图操作
						a.添加控件
						b.绘制车辆路线图
							添加车辆和起始点图标
						c.绘制服务区
						d.绘制车辆分布情况

			t0.3.4 员工管理
				1. 页面搭建
				2.filterForm 使用
				3. commonTable 使用
				4. handle modal 组件（TODO）[编辑、详情、移除]
					a.创建员工

			t0.3.5 测试本地 pc-bg-api
				页面 ApiDemo
				axios baseUrlType 参数增加
					增加headers 参数, 增加 body, (post 请求跨域问题)

			t0.3.6 测试 api 用例完善
				1.获取图书种类列表列表
				2. bug 兼容 table dataSource 数据里没有id 情况 警告 [Each record in table should have a unique `key` prop,or set `rowKey` to an unique primary key.]
				3.获取图书信息列表

			t0.3.7 api 功能测试
				1. axios res.code 4xx 错误 5xx错误提示优化
				2.修复 antd design 彩蛋问题
					https://github.com/ant-design/ant-design/issues/13848
				3.book info 增删改
					增加图书功能，修改图书功能，删除图书信息功能
					a. 增加图书 Modal 