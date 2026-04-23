import './App.css'
import { Show, SignInButton, SignOutButton, SignUpButton, UserButton } from '@clerk/react'

function App() {
  return (
    <>
    <section id="center">
      <header>
        <h1>Welcome to CodeMeet</h1>
        <br />
        <Show when="signed-out">
          <SignInButton />
        </Show>
        <Show when="signed-in">
          <SignOutButton />
        </Show>
        <UserButton />
      </header>
    </section>
      
    </>
  )
}

export default App
