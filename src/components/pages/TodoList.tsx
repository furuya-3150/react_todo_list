import { Box, Button, Divider, Flex, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { ChangeEvent, FC, useState } from "react";
import { TodoItem } from "../molucules/TodoItem";
import { useMessage } from "../../hooks/useMessage";
import { v4 as uuid } from "uuid";

import { MAX_INPUT_CHAR_COUNT, MIN_INPUT_CHAR_COUNT } from "../../config/validation";

export const TodoList:FC = () => {
  type todoType = {
    id: string;
    item: string;
    isCompleted: boolean;
  }
  const [todos, setTodos] = useState<todoType[]>([]);
  const [inputedTodo, setInputedTodo] = useState('');
  const { showMessage } = useMessage();
  const totalTodosCount = todos.length;
  const completedTodoCount = todos.filter((todo) => todo.isCompleted).length;
  const incompleteTodoCount = totalTodosCount - completedTodoCount;

  const onClickAddTodo = () => {
    if (inputedTodo === '') {
      showMessage({ title: MIN_INPUT_CHAR_COUNT , status: "warning" });
      return;
    }

    setTodos((prevTodos) => [...prevTodos, {
      id: uuid(),
      item: inputedTodo,
      isCompleted: false,
    } ])
    setInputedTodo('');
  }

  const onClickDelete = (id: number) => {
    const isDeleteConfirmed = confirm("本当によろしいですか？");
    if (!isDeleteConfirmed) {
      return;
    }

    const newTodos = [...todos];
    newTodos.splice(id, 1);

    setTodos(newTodos);
  }

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length > 10) {
      showMessage({ title: MAX_INPUT_CHAR_COUNT, status: "warning" });
      return;
    }

    setInputedTodo(value);
  }

  const onClickCheck = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted

    setTodos(newTodos)
  }

  return (
  <Flex align="center" justify="center" height="100vh">
    <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
      <Heading as="h2" size="lg" textAlign="center" color={"gray.600"}>
        TodoList
      </Heading>
      <Divider my={4} />
      <Stack spacing={6} py={4} px={10}>
        <Flex gap={2}>
          <Input
            onChange={onChangeInput}
            value={inputedTodo}
            placeholder="タスク"
          />
          <Button
            colorScheme='teal'
            variant='solid'
            onClick={onClickAddTodo}
          >
            追加
          </Button>
        </Flex>
      </Stack>
      <Stack spacing={2} py={4} px={10} >
        { todos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            index={index}
            todoItem={todo.item}
            isCompleted={todo.isCompleted}
            onClickDelete={onClickDelete}
            onClickCheck={onClickCheck}
          />
        ))}
      </Stack>
      <Text fontSize="sm">{`total:${totalTodosCount} completed:${completedTodoCount} incomplete:${incompleteTodoCount}`}</Text>
    </Box>
  </Flex>
  )
}