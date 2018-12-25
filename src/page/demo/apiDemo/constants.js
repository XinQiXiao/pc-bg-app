/**
 * create at 12/21/18
 */

const categoryColumnsConst = [
	{
		title: '类别ID',
		dataIndex: 'category_id',
		width: 60,
	},
	{
		title: '图书类别',
		dataIndex: 'category',
		width: 100,
	},
	{
		title: '父类别ID',
		dataIndex: 'parent_id',
		width: 60,
	},
]

const bookColumnConst = [
	{
		title: 'ID',
		dataIndex: 'id',
		width: 120,
	},
	{
		title: '名称',
		dataIndex: 'book_name',
		width: 180,
	},
	{
		title: '作者',
		dataIndex: 'author',
		width: 180,
	},
	{
		title: '图书类别',
		dataIndex: 'book_category.category',
		width: 120,
	},
	{
		title: '类别ID',
		dataIndex: 'book_category.category_id',
		width: 80,
	},
	{
		title: '价格(元)',
		dataIndex: 'price',
		width: 100,
		render(price){
			return price
		}
	},
	{
		title: '出版社',
		dataIndex: 'press',
		width: 140,
	},
	{
		title: '出版时间',
		dataIndex: 'pubdate',
		width: 140,
	},
	{
		title: '库存',
		dataIndex: 'store',
		width: 80,
	},
]

export {
	categoryColumnsConst,
	bookColumnConst
}