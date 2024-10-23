import { Route, Routes } from "react-router-dom"
import { TodoList } from "../components/pages/TodoList"
import { Page404 } from "../components/pages/Page404"

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<TodoList />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}