import { useState } from 'react'
import LogIn from "./components/LogIn.jsx";
import SignUp from "./components/SignUp.jsx";
import NoteList from "./components/note.jsx";
import StatusList from "./components/status.jsx";
import CommentList from "./components/comment.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
      <div>
          <h1>Notes + absent</h1>
          {!loggedIn ? (
              <>
              <SignUp />
              <LogIn onLogin={() => setLoggedIn(true)} />
              </>
          ) : (
              <>
                  <NoteList />
                  <CommentList />
                  <StatusList />
              </>
          )}
      </div>
  )
}

export default App
