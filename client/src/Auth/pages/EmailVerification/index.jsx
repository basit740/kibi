import React from "react";
import "styling/Auth/EmailVerification.css";
import AuthWrapper from "auth/components/AuthWrapper";
function EmailVerification() {
  return (
    <AuthWrapper title={"Email Verification"}>
      <div className="email-verification">
        <div className="verification-container">
          <p>
            We've sent a verification email to the address you provided. Please
            check your email to verify your account.
          </p>
          <p>
            <strong>Note:</strong> If you didn't receive the email, please check
            your spam folder or <a href="#">click here to resend the email</a>.
          </p>
        </div>
      </div>
    </AuthWrapper>
  );
}

export default EmailVerification;
