# 什么是Redux？
JS 应用的状态容器，提供可预测的状态管理。
![](https://itlab1024-1256529903.cos.ap-beijing.myqcloud.com/202211271008152.png)
# 工作原理
![](https://itlab1024-1256529903.cos.ap-beijing.myqcloud.com/202211271119878.png)
Redux的工作原理如上图。
* 用户需要定义store。store中也定义了Reducer。在Reducer中有方法。用户在界面中使用Dispatch调用Redux中定义的方法即可。
# Redux ToolKit
Redux封装的工具，方便用户使用，据说以前的Redux不好用。没用过，不清楚。 Redux ToolKit提供了方便的API。
常用api：
Redux Toolkit 包含：

`configureStore()`：封装了createStore，简化配置项，提供一些现成的默认配置项。它可以自动组合 slice 的 reducer，可以添加任何 Redux 中间件，默认情况下包含 redux-thunk，并开启了 Redux DevTools 扩展。
`createReducer()` 帮你将 action type 映射到 reducer 函数，而不是编写 switch...case 语句。另外，它会自动使用 immer 库来让你使用普通的 mutable 代码编写更简单的 immutable 更新，例如 state.todos[3].completed = true。
`createAction()` 生成给定 action type 字符串的 action creator 函数。该函数本身已定义了 toString()，因此可以代替常量类型使用。
`createSlice()` 接收一组 reducer 函数的对象，一个 slice 切片名和初始状态 initial state，并自动生成具有相应 action creator 和 action type 的 slice reducer。
`createAsyncThunk`: 接收一个 action type 字符串和一个返回值为 promise 的函数, 并生成一个 thunk 函数，这个 thunk 函数可以基于之前那个 promise ，dispatch 一组 type 为 pending/fulfilled/rejected 的 action。
`createEntityAdapter`: 生成一系列可复用的 reducer 和 selector，从而管理 store 中的规范化数据。
`createSelector` 来源于 Reselect 库，重新 export 出来以方便使用。
# 使用
如果是一个新的项目，可以使用如下指令通过模板生成项目
```shell
# Redux + Plain JS template
npx create-react-app my-app --template redux

# Redux + TypeScript template
npx create-react-app my-app --template redux-typescript
```
如果是一个老的项目，可以直接直接安装redux toolkit以来
```shell
npm install @reduxjs/toolkit
```
我使用template创建的项目。
创建完的项目如下图所示。
![](https://itlab1024-1256529903.cos.ap-beijing.myqcloud.com/202211271757977.png)
这里redux-toolkit给我们初始化了一个样例代码。在app和features文件夹下。是一个计数的组件。
运行后可以看到界面如下：
![](https://itlab1024-1256529903.cos.ap-beijing.myqcloud.com/202211271759022.png)
## 实战
首先我将框架默认生成的代码删掉。结构我就保持redux推荐的。
针对redux我会创建两个文件。一个是app/store.js，一个是features/book/BookSlice.js。
![](https://itlab1024-1256529903.cos.ap-beijing.myqcloud.com/202211272102107.png)
具体代码如下：
store.js:
```js
import {configureStore} from '@reduxjs/toolkit';
import bookReducer from "../features/book/BookSlice";

export const store = configureStore({
    reducer: {
        // book的reducer
        bookReducer
    },
})
```
一个项目中只有一个redux的store。这里配置了不同模块的store，比如我上面的bookReducer就是书籍列表的reducer定义。
另一个文件是BookSlice.js，该文件主要定义actions和reducer信息。包括操作的具体方法定义等。
```js
import {createSlice} from "@reduxjs/toolkit";

// 初始化state
const initialState = {
    // 书籍列表{id,name,time}
    books: [{"id": new Date().getTime(), "name": "数据结构与算法(初始化)", time: new Date().toLocaleString()}]
}

export const bookSlice = createSlice({
    // slice的名字，名称空间的意思，他被用于初始化action的type。
    name: "book",
    // 初始化的state
    initialState,
    // 定义了具体的操作。
    reducers: {
        // 定义reducer更新状态的函数，在组件中dispatch需要传递具体的函数名，比如dispatch(add())
        add: (state) => {
            const book = {"id": new Date().getTime(), "name": "书籍" + Math.random(), time: new Date().toLocaleString()}
            state.books.push(book)
        }
    },
})

export const {add} = bookSlice.actions
export default bookSlice.reducer
```
代码中我加了一些注释。不再一一讲解。
接下来需要在组件中使用`userSelector`,和`useDispatch` api了。
App.js:
```js
import React, {Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import './App.css';
import {add} from "./features/book/BookSlice";

function App() {
    // 使用useDispatch api
    const dispatch = useDispatch()
    // 使用useSelector 查询store中的state。进行解构赋值得到books数组。特别注意：bookReducer是store.js中reducer里的key。
    const {books} = useSelector(state => state.bookReducer);

    // 该方法主要是用于组装一个table。
    function getTable(books) {
        const ele = books.map((item, i) => {
            return <tr key={i}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.time}</td>
            </tr>
        });
        return (<table border="1" cellPadding="0">
            <thead>
            <tr>
                <td>ID</td>
                <td>书籍名称</td>
                <td>创建时间</td>
            </tr>
            </thead>
            <tbody>
            {ele}
            </tbody>
        </table>)
    }

    return (
        <Fragment>
            {getTable(books)}
            <hr/>
            {/*使用dispatch调用slice中的函数。*/}
            <button onClick={() => {
                dispatch(add())
            }}>添加书籍
            </button>
        </Fragment>
    );
}

export default App;

```
此时还为完成。
接下来需要在index.js中使用`<Provider store={store}>`包裹根组件，这里的store，就是store.js
index.js代码如下：
```js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

接下来我通过redux tool看下。
打开页面：
![](https://itlab1024-1256529903.cos.ap-beijing.myqcloud.com/202211272109246.png)
可以看到页面正常读取到了redux中的state的books数据，并展示到了页面上，右侧红色部分是redux tool展示出来的初始化的数据。
当我点击添加书籍的时候
![](https://itlab1024-1256529903.cos.ap-beijing.myqcloud.com/202211272118733.png)
1处就新增了一条数据，2出展示了action。调用了book/add这里需要说明下。这个名字是redux自动生成的。但是确实根据我们指定的名称和函数名生成的，
book就是BookSlice中的createSlice的name值，而add就是reducers下的add函数名。
3处展示了state的值，可以看到最终state也是增加了一条，也正是其变化了，才使界面重新渲染。

---
还有几个api没有使用，今天比较晚了，改天再学再说。