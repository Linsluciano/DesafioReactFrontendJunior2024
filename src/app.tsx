import React, { useEffect } from 'react'
import { useRecoilState} from 'recoil'
import type { TodoListType } from './datastructure'
import { recoilState } from './datastructure'
import NewTodoTextInput from './components/TodoInput' 
import { Layout } from './style'
import TodoList from './components/TodoList'
import UnderBar from './components/TodoUnderBar'
import axios from 'axios'

const TodoAPP: React.FC = () => {

  const [appState, setAppState] = useRecoilState<TodoListType>(recoilState)

  

  useEffect(()  => {
    const fetchData = async () => {
      try {
        const responseApi = await axios.get('https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos');
        setAppState([...appState, ...responseApi.data])
      } catch (error) {
        console.error('Erro ao recuperar dados do banco de dados:', error);
      }
    };
    fetchData();
  }, []);
  console.log(setAppState)
  return (
    <Layout>
      <section className="todoapp">
          <NewTodoTextInput />
          {setAppState.length ? (
          <>
            <TodoList />
            <UnderBar />
          </>
        ) : null}
      </section>
    </Layout>
  )
}

export default TodoAPP
