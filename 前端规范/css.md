
# CSS规范
@author: caijiantao  
@date: 20180211  
@updateTime: 20180211  
@desc: 主要适用于sass、less等CSS预编译语言
## 1. CSS选择器
### 1.1. 命名规范
##### 1. class选择器使用中横线命名法  
规范要求：强制

##### 2. 坚持以字母开头命名选择器  
规范要求：强制  
好处：这样可保证定义的css选择器被所有浏览器解释  

##### 3. 可译的英文单词禁止使用中文拼音  
规范要求：强制 

##### 4. 在保证单词语义的前提下，尽量使用缩写  
规范要求：建议

### 1.2. 使用规范
##### 1. 使用class选择器替代id选择器设置样式（或id选择器仅作为样式版本切换）  
规范要求：强制  
原因：元素的id属性，作为JS的专用hook，不与CSS选择器共享  

##### 2. CSS代码要模块化（与html的模块化保持一致，层层嵌套）  
规范要求：强制  
好处：方便复用、重构（整体迁移或删除）  

##### 3. 慎用元素选择器（p、div、a、span等）  
规范要求：强制  
原因：
1. 语义化弱
2. 元素选择器作用范围过大，会污染到未来加入的元素（除非是为了修改某个标签元素的全局样式，否则尽量少使用元素选择器，要使用的话也要结合上下文选择器、子元素选择器和类选择器，严格控制元素选择器的作用范围）

### 1.3. 注释规范
##### 1. 注释前换一行

## 1.2. CSS属性
### 1.2.1. 使用规范
##### 1. 属性编写顺序  
规范要求：强制  
一般顺序：布局属性>尺寸属性>内容属性>其它属性  
好处：有分类有顺序，位置固定，方便定位修改  
举例：  

```
.element {

	/* 布局属性（元素类型 ＋ 浮动 ＋ 定位 ＋ 行内垂直对齐方式） */
	display: block;
	float: left;
	position: absolute;
	top: 0;
	right: 12px;
	bottom: 40p;
	left: 30px;
	vertical-align: top;
	
	/* 尺寸属性(盒模型从内到外) */
	background: green;
	width: 100px;
	heiht: 100px;
	line-height: 100px;
	padding: 20px;
	border: 1px solid black;
	border-radius: 4px;
	margin: 0 auto;
	
	/* 内容属性（先位置，后颜色，再尺寸） */
	text-align: center;
	color: #000;
	font-size: 20px;
	
	/* 其它 */
	opacity: 0.3
}  
```

##### 2. 使用CSS属性继承  
规范要求：强制  
好处：减少代码冗余  
举例：  

```
/* bad example */   
.element {  
	.paragraph-1 {
		color: #000;  
		font-size: 20px;  
	}  
	.parapraph-2 {
		color: #fff;  
		font-size: 20px;  
	}
}  

/* good example */  
.element {  
	font-size: 20px;  
	.paragraph-1 {
		color: #000;  
	}  
	.parapraph-2 {
		color: #fff;  
	}
}  
```

##### 3. 多个CSS选择器共用某些CSS属性时，注重这些CSS属性的抽离
规范要求： 强制  
好处：减少代码冗余

##### 4. 禁用!important  
规范要求：强制  
原因：做法粗暴，会扰乱样式的优先级（需要使用!important，往往意味着部分CSS选择器的作用域
没有控制好，导致出现样式泛滥，污染到了无关的元素，建议重构）  
建议：通过CSS选择器的权重和CSS属性的声明顺序来设置样式优先级  

##### 5. 禁用color keywords(name)  
规范要求：强制  
原因：低级版本浏览器可能不支持某些name  
举例:  

```
/* bad example */   
.element {  
	background: white;
}  

/* good example */  
.element {  
	background: #FFF;
}
```

##### 6. 可简写的属性设置多值时，尽量使用简写语法（padding、margin等）  
规范要求：建议  
好处：减少CSS代码量  
举例：  

```
/* bad example */   
.element {  
	margin-top: 20px;
	margin-right: 40px;
	margin-bottom: 20px;
	margin-left: 40px;
}  

/* good example */  
.element {  
	margin: 20px 40px;
}
```

##### 7. 可简写的属性设置单值时，尽量不使用简写语法  
规范要求：建议  
好处：增强代码的语义化

```
/* bad example */   
.element {  
	margin-top: 0 0 20px;
}  

/* good example */  
.element {  
	margin-bottom: 20px;
}
```

### 1.2.2. 注释规范
##### 1. 注释单独占一行时，前面换一行
##### 2. 在属性右侧注释时，不需要换行
