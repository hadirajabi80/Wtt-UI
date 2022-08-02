export class Login{
    constructor(  public userName:string , public password :string ){}

}
export class Register{
    constructor(public fullName:string ,
         public userName:string ,
          public email:string ,
           public password?:string ,
           public roleId?:number,
           public parentId?:number
           ){}
}
export class Users{
    constructor(public id?:number, 
        public fullName?:string , 
        public userName?:string , 
        public email?:string , 
        public isActive?:boolean ,
        public password?:string , 
        public role?:string,
        public roleId?:number,
        public searchKey?:string,
        public pageNumber?:number,
        public pageSize?:number,
        ){}
}
export class EditUser{
    constructor(public id?:number, 
        public fullName?:string , 
        public userName?:string , 
        public email?:string , 
        public isActive?:boolean ,
        public password?:string , 
        public roleId?:number,

        ){}
}
export class ResUser{
    constructor(public rows:number , public users:Users[] ){}
}
export class ResPresence{
    constructor(public rows?:number , public userPresence?:Presence[] ){}
}
export class ResTask{
    constructor(public rows?:number , public userTasks?:UserTask[] ){}
}
export class ResMission{
    constructor(public rows?:number , public userMissions?:UserMission[]){}
}
export class ResVacation{
    constructor(public rows?:number , public userVacations?:UserVacation[]){}
}
export class UserTask{
    constructor(public id?:number,
        public userId?:number ,
        public text?:string  ,
        public description?:string,
        public timeWork?:number,
        public date?:Date,
        public confirmType?:number,
        public type?: number,
        public searchKey?:string,
        public pageNumber?:number,
        public pageSize?:number,
        public projectId?:number
        ){}
}
export class Tasks{
    constructor(public text:string ,
        public description:string,
         public timeWork:number ,
         public date:string ,
         public type:number,
         public projectId:number
         ){}
}
export class Presence{
    constructor( public startTime?:number ,
         public endTime?:number,
         public timeDifference?:number,
         public id?:number, 
         public isStarted?:boolean,
         public date?:Date,
         public pageNumber?:number,
         public pageSize?:number,
         public type?: string,
         public startDate?:number,
         public endDate?:number,
         ){}
}
export class AddLoginTime{
    constructor(public type:number){}
}
export class Roles{
    constructor(public name:string , public id:number , public userId:number){}
}
export class UserAddPresence{
    constructor( public startTime?:string , public endTime?:string,public date?:string){}
}
export enum FilterType {
    CURRENT_MONTH_TODAY="CURRENT_MONTH_TODAY",
    CURRENT_MONTH="CURRENT_MONTH", 
    PASSED_MONTH="PASSED_MONTH",
    CURRENT_WEEK="CURRENT_WEEK",
    CURRENT_YEAR="CURRENT_YEAR",
    PASSED_WEEK="PASSED_WEEK",
    TODAY="TODAY",
    YESTERDAY="YESTERDAY"

}
export enum FilterStatusType {
    CONFIRMED = "CONFIRMED",
    REJECTED = "REJECTED",
    PENDING = "PENDING",
    GETALL = "GETALL"
}
export enum FilterTaskLocation {
    COMPANY = "COMPANY",
    HOME = "HOME",
    GETALL = "GETALL"
}
export class FilterDate{
    constructor( public startDate?:Date , public endDate?:Date){}
}
export class UserAddMission{
    constructor( public title?:string , public location?:string, public description?:string ,public date?:string){}
}
export class UserMission{
    constructor(public id?:number,
        public userId?:number ,
        public title?:string  ,
        public location?:string,
        public description?:string,
        public date?:Date,
        public confirmType?:number,
        public searchKey?:string,
        public pageNumber?:number,
        public pageSize?:number,
        public type?: string
        ){}
}
export class UserAddVacation{
    constructor(public description?:string ,public date?:string){}
}
export class UserVacation{
    constructor(public id?:number,
        public userId?:number ,
        public description?:string,
        public date?:Date,
        public confirmType?:number,
        public searchKey?:string,
        public pageNumber?:number,
        public pageSize?:number,
        public type?: string
        ){}
}
export class Dashboard{
    constructor(
        public userId?:number ,
        public type?: string,
        public totalMissions?:number,
        public totalDay?:number,
        public totalPresenceTime?:number,
        public totalTask?:number,
        public totalVacations?:number,
        ){}
}
export class ResDashboard{
    constructor(        
        public totalMissions?:number,
        public totalDay?:number,
        public totalPresenceTime?:string,
        public totalTask?:string,
        public totalVacations?:number,
        public workDays?:string,
        public vacationSaved?:number,
        public overTime?:string,
        public companyHoliday?:number,
        public friday?:number,
        public holiday?:number,
        public efficiency?:string,
        public efficiencyInCompany?:string,
        public taskRemote?:string,
        public userName?:string,
        public personalWork?:string,
        public pieChart?:any,
        public barChart?:any

        ){}
}
export class TaskLocation
{
    constructor(public name:string , public id:number){}
}
export class Project
{
    constructor(public name:string , public id:number){}
}
export class Parents{
    constructor(public userId?:number , public parentId?:number){}
}
export class Childs{
    constructor(public parentId?:number , public child?:ChildInfo[]){}
}
export class ChildInfo{
    constructor(public id?:number , public childId?:number , public fullName?:string){}
}



