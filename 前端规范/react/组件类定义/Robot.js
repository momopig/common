import React from 'react'
import { Link, hashHistory } from 'react-router'
import './index.scss'

class Robot extends React.Component {

  // 成员属性、状态的声明，均在构造函数内部
  constructor(props) {
    super(props)
    this.name = 'Peter'
    this.gender = 'male'
    this.height = '165CM'
    this.weight = '50KG'
    this.hairColor = 'black'
    this.skinColor = 'yellow'
    
    this.state = {
      turnOn: false,
      expression: 'sad' // 'smile'
    }
  }

  // 被调用者先声明：组件自定义方法，先于周期函数hook声明
  jump() {
    // ...
  }

  sayHello() {
      console.log('Hello! I am ' + this.name)
      this.jump()
  }
 
  sayGoodbye() {
    console.log('Goodbye~ see you next time!')
  }

  // 事件监听器命名，后面均使用handler后缀
  powderHandler() {
    if (this.state.turnOn) {
      this.setState({
        turnOn: false,
        expression: 'sad'
      })
      this.sayGoodbye()
    } else {
      this.setState({
        turnOn: true,
        expression: 'smile'
      })
      this.sayHello()
    }
  }

  // hook函数按生命周期的执行顺序依次声明，特别地，render函数放在最后面
  componentWillMount() {
    // ...
  }

  componentDidMount() {
    // ...
  }

  componentWillReceiveProps (nextProps) {
    // ...
  }

  render () {
    return (
      <div className='robot'>
        <div className='header'>
         <div className='face'>{this.state.expression}</div>
        </div>
        <div className='body'>
          <div className='btn-power' onClick={this.powderHandler.bind(this)}>Power</div>
        </div>
        <div className='footer'></div>
      </div>
    )
  }
}

export default Robot
