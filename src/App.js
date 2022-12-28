function App() {
  return (
    <div className="chat-bar-collapsible">
      {" "}
      <button id="chat-button" type="button" className="collapsible">
        Chat with us!
        {/* <i
          id="chat-icon"
          style="color: #fff;"
          class="fa fa-fw fa-comments-o"
        ></i> */}
      </button>
      <div className="content">
        <div className="full-chat-block">
          <div className="outer-container">
            <div className="chat-container">
              <div id="chatbox">
                <h5 id="chat-timestamp"></h5>
                <p id="botStarterMessage" className="botText">
                  <span>Loading...</span>
                </p>
              </div>

              <div className="chat-bar-input-block">
                <div id="userInput">
                  <input
                    id="textInput"
                    className="input-box"
                    type="text"
                    name="msg"
                    placeholder="Tap 'Enter' to send a message"
                  />
                  <p></p>
                </div>

                <div className="chat-bar-icons"></div>
              </div>

              <div id="chat-bar-bottom">
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
