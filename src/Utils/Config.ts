class AppConfig {
    socketServer(socketServer: any): import("socket.io-client").Socket<import("@socket.io/component-emitter").DefaultEventsMap, import("@socket.io/component-emitter").DefaultEventsMap> {
        throw new Error("Method not implemented.");
    }
    public vacationsUrl = `http://localhost:3001/api/vacations/`;
    public vacationImagesUrl = `http://localhost:3001/api/vacations/images/`;
    public followersUrl = `http://localhost:3001/api/followers/`;
    public thisFollower = `http://localhost:3001/api/this-follower/`;
    public followerByVacation = `http://localhost:3001/api/followers-on-vacation/`;
    public registerUrl = `http://localhost:3001/api/auth/register/`;
    public loginUrl = `http://localhost:3001/api/auth/login/`;
 public captchaUrl = `http://localhost:3001/api/auth/captcha/`;

}
const appConfig = new AppConfig()

export default appConfig