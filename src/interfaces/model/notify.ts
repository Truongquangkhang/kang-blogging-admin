export enum NotifyType {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info',
    WARNING = 'warning',
}

export interface INotify {
    title: string;
    description: string;
    mustShow: boolean
    type?: NotifyType
}
