const env = require("../../config/config");

exports.verificationEmailTemplate = (user) => {
  return `<h4>Welcome to the Whatever Record-Store Corporation</h4>
    <p>Please verify your account using the following lonk link</p>
    <a target="_blank" href="${env.frontendOrigin}/users/verify/${user.emailVerificationToken}">${env.frontendOrigin}/users/verify/${user.emailVerificationToken}</a>`;
};
