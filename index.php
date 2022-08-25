<script src="https://www.gstatic.com/firebasejs/6.6.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/6.6.1/firebase-database.js"></script>

<script>
const firebaseConfig = {
  apiKey: "AIzaSyCv3-EIabfdcc-weFc0UAhYjtBKoY-60FY",
  authDomain: "mytest-dfc4b.firebaseapp.com",
  databaseURL: "https://mytest-dfc4b-default-rtdb.firebaseio.com",
  projectId: "mytest-dfc4b",
  storageBucket: "mytest-dfc4b.appspot.com",
  messagingSenderId: "155246777046",
  appId: "1:155246777046:web:7df116185add2769aa2f77"
};

  firebase.initializeApp(firebaseConfig);

  var myName = prompt("Enter your name: ");

  function sendMessage(){

    var message = document.getElementById("messaage").value;

    firebase.database().ref("messages").push().set({
      "sender": myName,
      "message": message
    })

    return false;
  }

  firebase.database().ref("messages").on("child_added", function(snapshot) {
    var html = "";



    html += "<li id='message-" + snapshot.key + "'>";

    if (snapshot.val().sender == myName) {
      html += "<button data-id='" + snapshot.key + "'onclick='deleteMesssage(this);'>";
      html += "Delete";
      html += "</button>";
    }

      html += snapshot.val().sender + ": " + snapshot.val().message;
    html += "</li>";

    document.getElementById("messages").innerHTML += html;
  });

  function deleteMessage(self){
    var messageId = self.getAttribute("data-id");

    firebase.database().ref("messages").child(messageId).remove();
  }

  firebase.database().ref("messages").on("child_removed", function(snapshot) {
    document.getElementById("messages-" + snapshot.key).innerHTML = "This message has been removed";
  });

</script>

<form onsubmit="return sendMessage();">
  <input id="messaage" placeholder="Enter message" autocomplete="off">
  <input type="submit">
</form>

<ul id="messages"></ul>