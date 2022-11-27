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
