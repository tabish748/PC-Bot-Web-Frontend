<h1 id="loginHeading">
Welcome to Login Screen
</h1>
<h2 id="authTokenExpired">
</h2>
<h2 id="createFailed">
</h2>
<p id="invalidData"></p>

<form id="myForm" method="POST" data-validate>
    <div>
      <label for="email">Email:</label>
      <input type="text" value="faiza@scalamed.com" id="email" name="email"  data-error="required,minLength:3,isEmail" >
    </div>
    <div>
      <label for="message">password:</label>
     <input type="password" value="Password123" id="password" data-error="required" name="password" >
    </div>
    <button type="submit">Submit</button>
  </form>
  