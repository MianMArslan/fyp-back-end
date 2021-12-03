export const isVerified = Object.freeze({
  NO: 'no',
  EMAIL: 'email'
})
export const users = {
  addingRole: 'An Error Occur While Adding Roles',
  notVerify: 'verification is not successful',
  status: 201,
  userUpdated: 'User Updated Successfully',
  data: null
}
export const auth = {
  inValid: 'Email or Password is inValid',
  notVerified:
    'Your Email is not verified. Kindly verify your email or generate new verification link',
  emailVerified:
    'Your Email is verified. Please wait for admin to verify your account',
  message: 'Login Successful!',
  subjectForgotPassword: 'Reset Your password',
  messageResetForgotPassword: 'link is send to your email',
  errorForgotPassword: 'An error occur while generating Link',
  errorReset: 'Error occur while updating password',
  messageReset: 'Password Reset Successfully',
  subjectResend: 'Resend Verification Link',
  messageResend:
    'Email is Successfully send kindly verify your email with in 15 minutes '
}
export const Email = {
  toAdmin: 'mian.m.arslan@hotmail.com',
  subjectToAdmin: 'New User Verification',
  sendToAdmin:
    'Request is Successfully send to admin please wait until admin approve your request',
  verification: 'An error occur while verification'
}

export const tokenTime = '86400s'
