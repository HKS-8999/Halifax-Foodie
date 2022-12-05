import { useNavigate } from "react-router-dom";
import db from "./Firebase";

const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const Cypher = () => {
  const email = localStorage.getItem("email");
  let navigate = useNavigate();

  async function validateText() {
    const form = document.forms[0];
    db.collection("auth-user-cipher")
      .doc(email)
      .get()
      .then((snapshot) => {
        const FirestoreData = snapshot.data();
        
        const cipher = [...FirestoreData.cipherText.plan_text]
          .map((char) => encrypt(char, FirestoreData.cipherText.shift))
          .join("");
        let sourceText = form.validateInput.value;
        if (cipher === sourceText) {
          alert("Your Cipher-text Is Validate");
          navigate("/welcome");
        } else {
          alert("Your Cipher-text Is Not Valid");
        }
      })
      .catch((e) => console.log(e));
  }

  //gets shift key number and encode into the cypher and stores into the database
  function encryptText() {
    const form = document.forms[0];

    let title = document.getElementById("titleId");

    title.innerHTML = "Encrypted text";

    let shift = Number(form.shift.value);

    let sourceText = form.sourceText.value;
    const cipher = [...sourceText].map((char) => encrypt(char, shift)).join("");
    console.log(cipher);
    let cipherText = {};
    cipherText["shift"] = shift;
    cipherText["plan_text"] = sourceText;
    //stores data into db
    db.collection("auth-user-cipher").doc(email).set(
      {
        cipherText,
      },
      { merge: true }
    );
    alert("YOUR CIPHER TEXT IS : " + cipher);
  }

  //converts plain text into the cypher
  function encrypt(char, shift) {
    let include = alphabet.includes(char.toUpperCase());

    if (include) {
      let position = alphabet.indexOf(char.toUpperCase());

      let newPosition = (position + shift) % alphabet.length;
      return alphabet[newPosition];
    } else return char;
  }

  return (
    <>
      <form>
        <center>
          <p id="titleId">Plain text</p>

          <div>
            <input name="sourceText" defaultValue=""></input>
          </div>

          <div>
            <label for="shift">Shift:</label>
            <select id="shift" name="shift">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </div>

          <div>
            <input
              type="button"
              id="decrypt"
              value="Encrypt And Store"
              onClick={encryptText}
            />
          </div>
          <br />
          <div>
            <label>Enter Your Cipher Text</label>
            <br />
            <input
              name="validateInput"
              id="validateInput"
              defaultValue=""
            ></input>
            <input
              type="button"
              id="validate"
              value="validate"
              onClick={validateText}
            />
          </div>
        </center>
      </form>
    </>
  );
};

export default Cypher;
