<rx-layout>
    <div class="rx__section">
        
            <span class="icon__bg">
                <i class="icon-lock-1"></i>
            </span>
            <h1 class="mt-1" id="verifyYourIdentity"></h1>
            <p id="toDownloadPrescription"></p>

    <form method="post" id="dob_form" data-validate>
        <div class="pos__relative">
            <input type="text" name="" placeholder="Enter otp" maxlength="6"  data-error="required" id="otp_input">
            <div class="rx__section__time__container mt-2">
                <i class="icon-timer"></i><p class="text__center rx__section__left__seconds " id="remaining_seconds">  </p>
            </div>
            
        </div>
        <p id="resendNotification"></p>
        <div class="calendar__box" id="calendar_box">
            <input type="date" name="calendar_comp"  data-error="required" id="calendar_input">
            <i class="icon-calendar1"></i>
        </div>
        <button-action label-txt="Confirm" id="btn" type="submit" className="mt-1" w-100 primary ></button-action>
        
    </form>
    
    <a href="" data-link class="text__link text__center mt-2 d__block">Need help?</a>
    </div>
</rx-layout>
