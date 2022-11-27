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