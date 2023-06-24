
// import config from "../Utils/Config";
// import authService from "./AuthService";
// import FollowModel from '../Models/FollowerModel';
// import { Socket, io } from "socket.io-client";
// import VacationModel from "../Models/VacationModel";
// import { vacationsStore } from "../Redux/VacationState";
// import AddVacation from "../Components/VacationsArea/AddVacation/AddVacation";
// import { followerStore } from "../Redux/FollowerState";



// class SocketIoServer {
//     private socket: Socket;

//     public connect(): void {

//         // Connect to socket server:
//         this.socket = io(config.socketServer);

//         if (authService.isAdmin()) return;
        

//         // Listen to adding a vacation by admin:
//         this.socket.on("admin-add-vacation", (vacation: VacationModel) => {
//             vacationsStore.dispatch(AddVacation(vacation));
//         });

//         // Listen to updating a vacation by admin:
//         this.socket.on("admin-update-vacation", (vacation: VacationModel) => {
//             vacationsStore.dispatch(UpdateVacation(vacation));
//             console.log("admin-update-vacation");
            
//         });

//         // Listen to deleting a vacation by admin:
//         this.socket.on("admin-delete-vacation", (id: number) => {
//             vacationsStore.dispatch(DeleteVacation(id));
//         });

//         // Listen to adding a vacation by user:
//         this.socket.on("user-add-follow", (follow: FollowModel) => {
//             followerStore.dispatch(AddFollower(follow));
//             console.log("user-add-follow");
            
//         });

//         // Listen to removing a vacation by user:
//         this.socket.on("user-remove-follow", (follow: FollowModel) => {
//             followStore.dispatch(deleteFollowAction(follow));

//         }
//         );

//         // Listen to followed vacations by user:
//         this.socket.on("user-followed-vacations", (vacation: VacationModel) => {
//             vacationsStore.dispatch(updateVacationAction(vacation));
//             console.log("user-followed-vacations");
//         });
        
//     }
//     // Listen to disconnection:
//     public disconnect(): void {
//         this.socket.disconnect();
//     }
// }

// const socketIoService = new SocketIoServer();

// export default socketIoService;