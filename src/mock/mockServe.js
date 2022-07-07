//引入mockjs模块
import Mock from 'mockjs'
//引入json文件
import banner from './banner.json'
import floor from './floor.json'

//模拟数据:.mock(请求的地址，请求的数据)
//模拟轮播图数据
Mock.mock("/mock/banner",{code:100,data:banner});
//模拟floor模块数据
Mock.mock('/mock/floor',{code:200,data:floor})
//此时未执行需要在入口文件处引入