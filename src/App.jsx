import './App.css'

function App() {

  return (
    <div>
      <h1>Recipe Sharing Website</h1>
      <form>
        <label>
          Recipe ID:
          <input type="text" name="id" />
        </label>
      </form>
      <form>
        <label>
          Recipe Name:
          <input type="text" name="name" />
        </label>
      </form>
    </div>
  )
}

export default App
