import UsersService from "./services/user.service.js";
import EmailService from "./services/email.service.js";

async function startApp() {
  await UsersService.start();
  await EmailService.start();

  try {
    const newUser = await UsersService.call("user.createUser", {
      username: "john",
      email: "john@email.com",
    });
    console.log("New user created: ", newUser);
    const users = await UsersService.call("user.getUsers");
    console.log("All users: ", users);

    const emailResult = await EmailService.call("email.sendEmail", {
      recipient: newUser.email,
      subject: "Welcome to our platform!",
      content: "Thank you for sign up!",
    });
    console.log(emailResult);
  } catch (error) {
    console.log("Error: ", error);
  } finally {
    await UsersService.stop();
    await EmailService.stop();
  }
}

startApp();
