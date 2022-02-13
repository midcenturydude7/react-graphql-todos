import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

// list todos
const GET_TODOS = gql`
  query getTodos {
    todos {
      done
      id
      text
    }
  }
`

// toggle todos
const TOGGLE_TODO = gql`
  mutation toggleTodo($id: uuid!, $done: Boolean!) {
    update_todos(where: {id: {_eq: $id}}, _set: {done: $done}) {
      returning {
        done
        id
        text
      }
    }
  }
`

// add todos

// delete todos

function App() {
  const { data, loading, error } = useQuery(GET_TODOS);
  const [toggleTodo] = useMutation(TOGGLE_TODO);

  if (loading) return <div>Loading todos, yo!...</div>
  if (error) return <div>Error fetching todos, yo!</div>

  async function handleToggleTodo({ id, done}) {
    const data = await toggleTodo({ variables: { id, done: !done } })
    console.log(data)
  }

  return (
    <div className="vh-100 code flex flex-column items-center bg-purple white pa3 fl1">
      <h1 className="f2-1">GraphQL Todo Checklist<span role="img" aria-label="Checkmark"> ✅</span></h1>      
      {/* Todo Form */}
      <form className="mb">
        <input className="pa2 f4 b--dashed"
          type="text"
          placeholder="Write your todo"
        />
        <button className="pa2 f4 bg-green b--dashed" type="submit">Create</button>
      </form>
      {/* Todo List */}
      <div className="flex items-center justify-center flex-column">
        {data.todos.map(todo => (
          <p onDoubleClick={() => handleToggleTodo(todo)} key={todo.id}>
            <span className={`pointer list pa1 f3 ${todo.done && 'strike'} `}>
              {todo.text}
            </span>
            <button className="bg-transparent bn f4"><span className="red">&times;</span></button>
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
