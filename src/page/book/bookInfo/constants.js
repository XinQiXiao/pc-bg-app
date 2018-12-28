/**
 * create at 12/28/18
 */
const columnConst = [
	{
		title: 'ID',
		dataIndex: 'id',
		width: 140,
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
		width: 180,
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
	columnConst
}