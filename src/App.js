import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_TODOS = gql`
  query getTodos {
    todos {
      done
      id
      text
    }
  }
`

// list todos
// add todos
// toggle todos
// delete todos

function App() {
  const { data, loading, error } = useQuery(GET_TODOS)

  if (loading) return <div>Loading todos, yo!...</div>
  if (error) return <div>Error fetching todos, yo!</div>

  return (
    <div className="vh-100 code flex flex-column items-center bg-purple white pa3 fl1">
      <h1 className="f2-1">GraphQL Todo Checklist<span role="img" aria-label="Checkmark"> ✅</span></h1>      
      {/* Todo Form */}
      <form>
        <input 
          type="text"
          placeholder="Write your todo"
        />
        <button type="submit">Create</button>
      </form>
      {/* Todo List */}
      <div>
        {data.todos.map(todo => (
          <p key={todo.id}>
            <span>
              {todo.text}
            </span>
            <button>&times;</button>
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
