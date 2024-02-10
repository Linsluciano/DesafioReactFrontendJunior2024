import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import Data from '../db.json'
import type { AppState } from './datastructure'
import { recoilState, LocalStorageKey } from './datastructure'


import NewTodoTextInput from './components/TodoInput' 
import { Layout } from './style'
import TodoList from './components/TodoList'
import UnderBar from './components/TodoUnderBar'

const TodoAPP: React.FC = () => {
  const appState = useRecoilValue<AppState>(recoilState)

  useEffect((): void => {
    window.localStorage.setItem(
      LocalStorageKey.APP_STATE,
      JSON.stringify(appState), 
    )
  }, [appState])

  return (
    <Layout>
      <section className="todoapp">
          <NewTodoTextInput />
          {appState.todoList.length ? (
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
