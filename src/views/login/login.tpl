<div class="login-container">
  <div class="login-container__logo-section">
      <img src="assets/images/logo.svg" alt="Logo" class="login-container__logo">
    
  </div>
  <div class="login-container__form-section">
    <h1 class="heading__buddy">Login</h1>
      <form class="login-form" id="login_form" method="post" data-validate>
          <div class="login-form__group">
            <label for="email" class="form-label white">Username</label>
              <input type="text" id="email" class="login-form__input form-input" placeholder="Username" value="admin@example.com" data-error="required,isEmail" >
              
          </div>
          <div class="login-form__group">
            <label for="password" class="form-label white">Password</label>
              <input type="password" id="password" class="login-form__input" placeholder="Password" data-error="required"  >
          </div>
          <div class="login-form__group">
            <button-action label-txt="Login" secondary className="mt-2" w-100 ></button-action>
          </div>
      </form>
  </div>
</div>















