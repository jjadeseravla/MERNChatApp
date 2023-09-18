import {
  useState, useEffect,
  useContext

} from "react";
import { Avatar } from './Avatar';
import { Logo } from './Logo';
import { UserContext } from "./UserContext";

export const Chat = () => {

  // eslint-disable-next-line no-unused-vars
  const [ws, setWs] = useState('null');
  const [onlinePeople, setOnlinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newMsgText, setNewMsgText] = useState('');
  const [msgs, setMsgs] = useState([]);
  const { id } = useContext(UserContext); 

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4040');
    setWs(ws);
    // add things here that should happen when we receive a message
    ws.addEventListener('message', handleMessage)
  }, []);

  function showOnlinePeople(peopleArray) {
    const people = {};
    peopleArray.forEach(({ userId, username }) => {
      people[userId] = username;
    });
    console.log('userId', people.userId)
    console.log('peeps', people);
    console.log('onlinePeople', onlinePeople)
    return setOnlinePeople(people);
  }

  function handleMessage(e) {
    try {
      const messageData = JSON.parse(e.data);
      console.log({ e, messageData });
      if ('online' in messageData) {
        showOnlinePeople(messageData.online);
      } else {
        //isOur, as in is it you messaging as the user or not
        setMsgs(prev => ([...prev, { text: messageData.text, isOur: false }]));
      }
    } catch (error) {
      // Handle non-JSON messages here
      console.error('Received a non-JSON message:', e.data);
    }
  }

  function sendMessage(e) {
    e.preventDefault();
    // send a msg and the userId we have selected to websocket server
    ws.send(JSON.stringify({
      message: {
        recipient: selectedUserId,
        text: newMsgText,
      }
    }));
    // after sending we clear the chat
    setNewMsgText('');
    // grab previous value and return it into the array of prev msg objs with text inside, and the new one in it
    setMsgs(prev => ([...prev, {text: newMsgText, isOur: true}]) )
  }

  console.log('selectedUserId', selectedUserId);
  
  //to ensure user whos logged in cant see themselves in the chat
  const onlinePeopleExclOurUser = { ...onlinePeople };
  delete onlinePeopleExclOurUser[id];
  // cant do it this way cos its not an arrya, onlinePeople is an obj
  //const onlinePeopleExclOurUser = onlinePeople.filter((person) => person.username !== username);
  
  // for (const key in onlinePeople) {
  //   if (onlinePeople[key] === username) {
  //     delete onlinePeople[key];
  //   }
  // }

  // console.log('new onlinePeople', onlinePeople, 'username', username)

  return (
    <div className="flex h-screen p-2">
      <div className="bg-white w-1/3 flex flex-col">
        <div className="flex-grow">
          <Logo />
          {Object.keys(onlinePeopleExclOurUser).map((userId) => (
            <div onClick={(userId) => setSelectedUserId(userId)}
              className={"border-b boder-gray-100 py-2 flex items-ceter gap-2 curser-pointer "+ (userId === selectedUserId ? 'bg-blue-50' : '')}
              key={userId}>
              {userId === selectedUserId && (
                <div className="w-1 bg-blue-500 h-12">
                  selected
                </div>
              )}
              <div className="flex gap-2 py-2 pl-4 items-center">
              <Avatar username={onlinePeople[userId]} userId={userId} online />
              <span className="text-gray-500">{onlinePeople[userId]}</span>
                </div>
            </div>
            ))}
        </div>
        <div className="p-2 text-center flex items-center justify-center">
          <span className="mr-2 text-sm text-gray-600 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>
            {/* {username} */}
          </span>
          <button
            // onClick={logout}
            className="text-sm bg-blue-100 py-1 px-2 text-gray-500 border rounded-sm">logout</button>
        </div>
      </div>
      <div className="flex flex-col bg-blue-50 w-2/3 p-2">
        <div className="flex-grow">
          {!selectedUserId && (
            <div className="flex h-full flex-grow tems-center justify-center">
              <div className="text-gray-300">&larr; no selected person</div>
            </div>
          )}
          {!!selectedUserId && (
            <div>
              {msgs.map(message => {
                <div>{message.text}</div>
              })}
            </div>
          )}
        </div>
        {!!selectedUserId && (
          <form className="flex gap-2" onSubmit={sendMessage}>
            <input type="text"
                   value={newMsgText}
                   onChange={ev => setNewMsgText(ev.target.value)}
                   placeholder="Type your message here"
                   className="bg-white flex-grow border rounded-sm p-2"/>
            <label className="bg-blue-200 p-2 text-gray-600 cursor-pointer rounded-sm border border-blue-200">
              {/* <input type="file" className="hidden" onChange={sendFile} /> */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z" clipRule="evenodd" />
              </svg>
            </label>
            <button type="submit" className="bg-blue-500 p-2 text-white rounded-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </form>
       )} 
      </div>
    </div>
  );
}

export default Chat;