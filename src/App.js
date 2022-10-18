import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Appbar from "./components/AppBar/Appbar";
import BoardBar from "./components/BoardBar/BoardBar";
import BoardContent from "./components/BoardContent/BoardContent";
import FacebookLogin from "react-facebook-login";
import './App.scss';

function App() {
  const [user, setUser] = useState(false);

  const handleCallbackResponse = (response) => {
    const userObject = jwt_decode(response.credential);
    setUser(userObject);
    document.getElementById("signInDivGoogle").hidden = true;
    document.getElementById("signInDivFacebook").hidden = true;
  };

  const handleSignOut = () => {
    setUser(false);
    document.getElementById("signInDivGoogle").hidden = false;
    document.getElementById("signInDivFacebook").hidden = false;
  };

  const responseFacebook = (respuesta) => {
    var userObjet = respuesta;
    var newObject = {};
    newObject.name = userObjet.name;
    newObject.picture = userObjet.picture.data.url;
    console.log("prueba2", newObject);
    setUser(newObject);
    document.getElementById("signInDivGoogle").hidden = true;
    document.getElementById("signInDivFacebook").hidden = true;
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "382008796710-bd71hkgqho8mbdtk3jqclceum4u2vtsv.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDivGoogle"),
      {
        theme: "filled_blue",
        size: "large",
      }
    );
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <div id="signInDivGoogle"></div>
        <div id="signInDivFacebook">
          <FacebookLogin
            appId="434079471986516"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
          />
        </div>
      </div>
      {user && (
        <div>
          <div className="trello-master">
            <BoardBar
              image={user.picture}
              user={user}
              onClose={handleSignOut}
            />
            <Appbar />
            <BoardContent />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
