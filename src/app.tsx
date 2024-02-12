import React, { useEffect } from 'react'
import { useRecoilState} from 'recoil'
import { TodoListType, LocalStorageKey } from './datastructure'
import { recoilState } from './datastructure'
import NewTodoTextInput from './components/TodoInput' 
import { Layout } from './style'
import TodoList from './components/TodoList'
import UnderBar from './components/TodoUnderBar'
import axios from 'axios'

const TodoAPP: React.FC = () => {
  const [appState, setAppState] = useRecoilState<TodoListType>(recoilState)

  useEffect(():void =>{
    const fetchData = async ()=>{
      try {
        const responseApi = await axios.get('https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos');
        
        const uniqueApiData = responseApi.data.filter( () =>!appState.find(existingTask => existingTask.id === uniqueApiData.id));

        setAppState([...uniqueApiData, ...appState])
      } catch(error) {
        console.error ('Erro 404, os dados não foram recuperados:', error);
      }
    }
    
    fetchData();
  },[]);
  useEffect((): void => {
    window.localStorage.setItem(
      LocalStorageKey.APP_STATE,
      JSON.stringify(appState)  
    );
  });

  return (
    <Layout>
      <section className="todoapp">
          <NewTodoTextInput />
          {appState.length  ? (
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
