


//Connection schema 
POST - request/send/interested/:userId 
POST - request/send/ignored/:userId
POST - request/send/accepted/:requestId
POST - request/send/rejected/:requestId


##connectionRequestRouter
- POST /request/send/:status/:userId     //interested/ignored
- POST /request/review/:status/:requestId  // accepted, rejected



##  userRouter 

- GET  /user/requests/received
- GET  /user/connections