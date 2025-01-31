﻿declare module Exchange.Extensions {
    interface Observable {
        changed: boolean;
        addChangedListener(eventFn: (changed: any) => void): any;
        removeChangedListener(eventFn: (changed: any) => void): any;
    }
    class ObservableBase<T> implements Observable {
        private _changed;
        private _changedListeners;
        constructor();
        public changed : boolean;
        public addChangedListener(eventFn: (changed: T) => void): void;
        public removeChangedListener(eventFn: (changed: T) => void): void;
    }
    class ObservableCollection<T extends Observable> extends ObservableBase<ObservableCollection<T>> {
        private _array;
        private _changedListener;
        constructor(...items: T[]);
        public item(n: number): T;
        /**
        * Removes the last element from an array and returns it.
        */
        public pop(): T;
        /**
        * Removes the first element from an array and returns it.
        */
        public shift(): T;
        /**
        * Appends new elements to an array, and returns the new length of the array.
        * @param items New elements of the Array.
        */
        public push(...items: T[]): number;
        /**
        * Removes elements from an array, returning the deleted elements.
        * @param start The zero-based location in the array from which to start removing elements.
        * @param deleteCount The number of elements to remove.
        * @param items Elements to insert into the array in place of the deleted elements.
        */
        public splice(start: number, deleteCount: number): T[];
        /**
        * Inserts new elements at the start of an array.
        * @param items  Elements to insert at the start of the Array.
        */
        public unshift(...items: T[]): number;
        /**
        * Performs the specified action for each element in an array.
        * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
        * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
        */
        public forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
        /**
        * Calls a defined callback function on each element of an array, and returns an array that contains the results.
        * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
        * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
        */
        public map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
        /**
        * Returns the elements of an array that meet the condition specified in a callback function.
        * @param callbackfn A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array.
        * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
        */
        public filter(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): T[];
        /**
        * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
        * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
        * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
        */
        public reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
        /**
        * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
        * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
        * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
        */
        public reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
        /**
        * Gets or sets the length of the array. This is a number one higher than the highest element defined in an array.
        */
        public length : number;
    }
    class Request {
        public requestUri: string;
        public headers: {
            [name: string]: string;
        };
        public method: string;
        public data: any;
        public disableCache: boolean;
        constructor(requestUri: string);
    }
    class DataContext {
        private _getAccessTokenFn;
        private _extraQueryParameters;
        private _serviceRootUri;
        private _noCache;
        private _disableCache;
        private _disableCacheOverride;
        constructor(serviceRootUri: string, extraQueryParameters?: string, getAccessTokenFn?: () => Microsoft.Utility.IPromise<string>);
        public serviceRootUri : string;
        public extraQueryParameters : string;
        public disableCache : boolean;
        public disableCacheOverride : boolean;
        private ajax(request);
        public read(path: string): Microsoft.Utility.IPromise<string>;
        public readUrl(url: string): Microsoft.Utility.IPromise<string>;
        public request(request: Request): Microsoft.Utility.IPromise<string>;
        private augmentRequest(request);
    }
    class PagedCollection<T> {
        private _path;
        private _context;
        private _resultFn;
        private _data;
        constructor(context: DataContext, path: string, resultFn: (dataContext: DataContext, data: any) => T[], data?: T[]);
        public path : string;
        public context : DataContext;
        public currentPage : T[];
        public getNextPage(): Microsoft.Utility.IPromise<PagedCollection<T>>;
    }
    class CollectionQuery<T> {
        private _path;
        private _context;
        private _resultFn;
        private _query;
        constructor(context: DataContext, path: string, resultFn: (dataContext: DataContext, data: any) => T[]);
        public path : string;
        public context : DataContext;
        public filter(filter: string): CollectionQuery<T>;
        public select(selection: any): CollectionQuery<T>;
        public expand(expand: any): CollectionQuery<T>;
        public orderBy(orderBy: any): CollectionQuery<T>;
        public top(top: number): CollectionQuery<T>;
        public skip(skip: number): CollectionQuery<T>;
        public addQuery(query: string): CollectionQuery<T>;
        public query : string;
        public fetch(): Microsoft.Utility.IPromise<PagedCollection<T>>;
        public fetchAll(maxItems: number): Microsoft.Utility.IPromise<T[]>;
    }
    class QueryableSet<T> {
        private _context;
        private _entity;
        private _path;
        constructor(context: DataContext, path: string, entity?: any);
        public context : DataContext;
        public entity : any;
        public path : string;
        public getPath(prop: string): string;
    }
    class RestShallowObjectFetcher {
        private _context;
        private _path;
        constructor(context: DataContext, path: string);
        public context : DataContext;
        public path : string;
        public getPath(prop: string): string;
    }
    class ComplexTypeBase extends ObservableBase<ComplexTypeBase> {
        constructor();
    }
    class EntityBase extends ObservableBase<EntityBase> {
        private _context;
        private _path;
        constructor(context?: DataContext, path?: string);
        public context : DataContext;
        public path : string;
        public getPath(prop: string): string;
    }
    function isUndefined(v: any): boolean;
}
declare module Exchange {
    class Client {
        private _context;
        public context : Extensions.DataContext;
        private getPath(prop);
        constructor(serviceRootUri: string, getAccessTokenFn: () => Microsoft.Utility.IPromise<string>);
        public users : Users;
        private _Users;
        public me : UserFetcher;
        private _Me;
    }
    interface IRecipients {
        value: IRecipient[];
    }
    interface IRecipient {
        Name: string;
        Address: string;
    }
    class Recipient extends Extensions.ComplexTypeBase {
        constructor(data?: IRecipient);
        public _odataType: string;
        public name : string;
        private _Name;
        public nameChanged : boolean;
        private _NameChanged;
        public address : string;
        private _Address;
        public addressChanged : boolean;
        private _AddressChanged;
        static parseRecipient(data: IRecipient): Recipient;
        static parseRecipients(data: IRecipient[]): Extensions.ObservableCollection<Recipient>;
        public getRequestBody(): IRecipient;
    }
    interface IAttendees {
        value: IAttendee[];
    }
    interface IAttendee extends IRecipient {
        Status: IResponseStatus;
        Type: string;
    }
    class Attendee extends Recipient {
        constructor(data?: IAttendee);
        public _odataType: string;
        public status : ResponseStatus;
        private _Status;
        public statusChanged : boolean;
        private _StatusChanged;
        private _StatusChangedListener;
        public type : AttendeeType;
        private _Type;
        public typeChanged : boolean;
        private _TypeChanged;
        static parseAttendee(data: IAttendee): Attendee;
        static parseAttendees(data: IAttendee[]): Extensions.ObservableCollection<Attendee>;
        public getRequestBody(): IAttendee;
    }
    interface IItemBodies {
        value: IItemBody[];
    }
    interface IItemBody {
        ContentType: string;
        Content: string;
    }
    class ItemBody extends Extensions.ComplexTypeBase {
        constructor(data?: IItemBody);
        public _odataType: string;
        public contentType : BodyType;
        private _ContentType;
        public contentTypeChanged : boolean;
        private _ContentTypeChanged;
        public content : string;
        private _Content;
        public contentChanged : boolean;
        private _ContentChanged;
        static parseItemBody(data: IItemBody): ItemBody;
        static parseItemBodies(data: IItemBody[]): Extensions.ObservableCollection<ItemBody>;
        public getRequestBody(): IItemBody;
    }
    interface ILocations {
        value: ILocation[];
    }
    interface ILocation {
        DisplayName: string;
    }
    class Location extends Extensions.ComplexTypeBase {
        constructor(data?: ILocation);
        public _odataType: string;
        public displayName : string;
        private _DisplayName;
        public displayNameChanged : boolean;
        private _DisplayNameChanged;
        static parseLocation(data: ILocation): Location;
        static parseLocations(data: ILocation[]): Extensions.ObservableCollection<Location>;
        public getRequestBody(): ILocation;
    }
    interface IResponseStatuses {
        value: IResponseStatus[];
    }
    interface IResponseStatus extends IRecipient {
        Response: string;
        Time: string;
    }
    class ResponseStatus extends Recipient {
        constructor(data?: IResponseStatus);
        public _odataType: string;
        public response : ResponseType;
        private _Response;
        public responseChanged : boolean;
        private _ResponseChanged;
        public time : Date;
        private _Time;
        public timeChanged : boolean;
        private _TimeChanged;
        static parseResponseStatus(data: IResponseStatus): ResponseStatus;
        static parseResponseStatuses(data: IResponseStatus[]): Extensions.ObservableCollection<ResponseStatus>;
        public getRequestBody(): IResponseStatus;
    }
    interface IRecurrencePatterns {
        value: IRecurrencePattern[];
    }
    interface IRecurrencePattern {
        Type: string;
        Interval: number;
        DayOfMonth: number;
        Month: number;
        DaysOfWeek: System.DayOfWeek[];
        FirstDayOfWeek: string;
        Index: string;
    }
    class RecurrencePattern extends Extensions.ComplexTypeBase {
        constructor(data?: IRecurrencePattern);
        public _odataType: string;
        public type : RecurrencePatternType;
        private _Type;
        public typeChanged : boolean;
        private _TypeChanged;
        public interval : number;
        private _Interval;
        public intervalChanged : boolean;
        private _IntervalChanged;
        public dayOfMonth : number;
        private _DayOfMonth;
        public dayOfMonthChanged : boolean;
        private _DayOfMonthChanged;
        public month : number;
        private _Month;
        public monthChanged : boolean;
        private _MonthChanged;
        public daysOfWeek : System.DayOfWeek[];
        private _DaysOfWeek;
        public daysOfWeekChanged : boolean;
        private _DaysOfWeekChanged;
        public firstDayOfWeek : System.DayOfWeek;
        private _FirstDayOfWeek;
        public firstDayOfWeekChanged : boolean;
        private _FirstDayOfWeekChanged;
        public index : WeekIndex;
        private _Index;
        public indexChanged : boolean;
        private _IndexChanged;
        static parseRecurrencePattern(data: IRecurrencePattern): RecurrencePattern;
        static parseRecurrencePatterns(data: IRecurrencePattern[]): Extensions.ObservableCollection<RecurrencePattern>;
        public getRequestBody(): IRecurrencePattern;
    }
    interface IRecurrenceRanges {
        value: IRecurrenceRange[];
    }
    interface IRecurrenceRange {
        Type: string;
        StartDate: string;
        EndDate: string;
        NumberOfOccurrences: number;
    }
    class RecurrenceRange extends Extensions.ComplexTypeBase {
        constructor(data?: IRecurrenceRange);
        public _odataType: string;
        public type : RecurrenceRangeType;
        private _Type;
        public typeChanged : boolean;
        private _TypeChanged;
        public startDate : Date;
        private _StartDate;
        public startDateChanged : boolean;
        private _StartDateChanged;
        public endDate : Date;
        private _EndDate;
        public endDateChanged : boolean;
        private _EndDateChanged;
        public numberOfOccurrences : number;
        private _NumberOfOccurrences;
        public numberOfOccurrencesChanged : boolean;
        private _NumberOfOccurrencesChanged;
        static parseRecurrenceRange(data: IRecurrenceRange): RecurrenceRange;
        static parseRecurrenceRanges(data: IRecurrenceRange[]): Extensions.ObservableCollection<RecurrenceRange>;
        public getRequestBody(): IRecurrenceRange;
    }
    interface IPatternedRecurrences {
        value: IPatternedRecurrence[];
    }
    interface IPatternedRecurrence {
        Pattern: IRecurrencePattern;
        Range: IRecurrenceRange;
    }
    class PatternedRecurrence extends Extensions.ComplexTypeBase {
        constructor(data?: IPatternedRecurrence);
        public _odataType: string;
        public pattern : RecurrencePattern;
        private _Pattern;
        public patternChanged : boolean;
        private _PatternChanged;
        private _PatternChangedListener;
        public range : RecurrenceRange;
        private _Range;
        public rangeChanged : boolean;
        private _RangeChanged;
        private _RangeChangedListener;
        static parsePatternedRecurrence(data: IPatternedRecurrence): PatternedRecurrence;
        static parsePatternedRecurrences(data: IPatternedRecurrence[]): Extensions.ObservableCollection<PatternedRecurrence>;
        public getRequestBody(): IPatternedRecurrence;
    }
    class EntityFetcher extends Extensions.RestShallowObjectFetcher {
        constructor(context: Extensions.DataContext, path: string);
    }
    interface IEntities {
        value: IEntity[];
    }
    interface IEntity {
        Id: string;
    }
    class Entity extends Extensions.EntityBase {
        constructor(context?: Extensions.DataContext, path?: string, data?: IEntity);
        public _odataType: string;
        public id : string;
        private _Id;
        public idChanged : boolean;
        private _IdChanged;
        public update(): Microsoft.Utility.IPromise<Entity>;
        public delete(): Microsoft.Utility.IPromise<void>;
        static parseEntity(context: Extensions.DataContext, path: string, data: IEntity): Entity;
        static parseEntities(context: Extensions.DataContext, pathFn: (data: IEntity) => string, data: IEntity[]): Entity[];
        public getRequestBody(): IEntity;
    }
    class UserFetcher extends EntityFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public folders : Folders;
        private _Folders;
        public messages : Messages;
        private _Messages;
        public rootFolder : FolderFetcher;
        public update_rootFolder(value: Folder): Microsoft.Utility.IPromise<void>;
        private _RootFolder;
        public inbox : FolderFetcher;
        public update_inbox(value: Folder): Microsoft.Utility.IPromise<void>;
        private _Inbox;
        public drafts : FolderFetcher;
        public update_drafts(value: Folder): Microsoft.Utility.IPromise<void>;
        private _Drafts;
        public sentItems : FolderFetcher;
        public update_sentItems(value: Folder): Microsoft.Utility.IPromise<void>;
        private _SentItems;
        public deletedItems : FolderFetcher;
        public update_deletedItems(value: Folder): Microsoft.Utility.IPromise<void>;
        private _DeletedItems;
        public calendars : Calendars;
        private _Calendars;
        public calendar : CalendarFetcher;
        public update_calendar(value: Calendar): Microsoft.Utility.IPromise<void>;
        private _Calendar;
        public calendarGroups : CalendarGroups;
        private _CalendarGroups;
        public events : Events;
        private _Events;
        public contacts : Contacts;
        private _Contacts;
        public contactFolders : ContactFolders;
        private _ContactFolders;
        public fetch(): Microsoft.Utility.IPromise<User>;
    }
    interface IUsers {
        value: IUser[];
    }
    interface IUser extends IEntity {
        DisplayName: string;
        Alias: string;
        MailboxGuid: string;
    }
    class User extends Entity {
        constructor(context?: Extensions.DataContext, path?: string, data?: IUser);
        public _odataType: string;
        public displayName : string;
        private _DisplayName;
        public displayNameChanged : boolean;
        private _DisplayNameChanged;
        public alias : string;
        private _Alias;
        public aliasChanged : boolean;
        private _AliasChanged;
        public mailboxGuid : string;
        private _MailboxGuid;
        public mailboxGuidChanged : boolean;
        private _MailboxGuidChanged;
        public folders : Folders;
        private _Folders;
        public messages : Messages;
        private _Messages;
        public rootFolder : FolderFetcher;
        public update_rootFolder(value: Folder): Microsoft.Utility.IPromise<void>;
        private _RootFolder;
        public inbox : FolderFetcher;
        public update_inbox(value: Folder): Microsoft.Utility.IPromise<void>;
        private _Inbox;
        public drafts : FolderFetcher;
        public update_drafts(value: Folder): Microsoft.Utility.IPromise<void>;
        private _Drafts;
        public sentItems : FolderFetcher;
        public update_sentItems(value: Folder): Microsoft.Utility.IPromise<void>;
        private _SentItems;
        public deletedItems : FolderFetcher;
        public update_deletedItems(value: Folder): Microsoft.Utility.IPromise<void>;
        private _DeletedItems;
        public calendars : Calendars;
        private _Calendars;
        public calendar : CalendarFetcher;
        public update_calendar(value: Calendar): Microsoft.Utility.IPromise<void>;
        private _Calendar;
        public calendarGroups : CalendarGroups;
        private _CalendarGroups;
        public events : Events;
        private _Events;
        public contacts : Contacts;
        private _Contacts;
        public contactFolders : ContactFolders;
        private _ContactFolders;
        public update(): Microsoft.Utility.IPromise<User>;
        public delete(): Microsoft.Utility.IPromise<void>;
        static parseUser(context: Extensions.DataContext, path: string, data: IUser): User;
        static parseUsers(context: Extensions.DataContext, pathFn: (data: IUser) => string, data: IUser[]): User[];
        public getRequestBody(): IUser;
    }
    class FolderFetcher extends EntityFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public childFolders : Folders;
        private _ChildFolders;
        public messages : Messages;
        private _Messages;
        public fetch(): Microsoft.Utility.IPromise<Folder>;
        public copy(DestinationId: string): Microsoft.Utility.IPromise<Folder>;
        public move(DestinationId: string): Microsoft.Utility.IPromise<Folder>;
    }
    interface IFolders {
        value: IFolder[];
    }
    interface IFolder extends IEntity {
        ParentFolderId: string;
        DisplayName: string;
        ClassName: string;
        TotalCount: number;
        ChildFolderCount: number;
        UnreadItemCount: number;
    }
    class Folder extends Entity {
        constructor(context?: Extensions.DataContext, path?: string, data?: IFolder);
        public _odataType: string;
        public parentFolderId : string;
        private _ParentFolderId;
        public parentFolderIdChanged : boolean;
        private _ParentFolderIdChanged;
        public displayName : string;
        private _DisplayName;
        public displayNameChanged : boolean;
        private _DisplayNameChanged;
        public className : string;
        private _ClassName;
        public classNameChanged : boolean;
        private _ClassNameChanged;
        public totalCount : number;
        private _TotalCount;
        public totalCountChanged : boolean;
        private _TotalCountChanged;
        public childFolderCount : number;
        private _ChildFolderCount;
        public childFolderCountChanged : boolean;
        private _ChildFolderCountChanged;
        public unreadItemCount : number;
        private _UnreadItemCount;
        public unreadItemCountChanged : boolean;
        private _UnreadItemCountChanged;
        public childFolders : Folders;
        private _ChildFolders;
        public messages : Messages;
        private _Messages;
        public copy(DestinationId: string): Microsoft.Utility.IPromise<Folder>;
        public move(DestinationId: string): Microsoft.Utility.IPromise<Folder>;
        public update(): Microsoft.Utility.IPromise<Folder>;
        public delete(): Microsoft.Utility.IPromise<void>;
        static parseFolder(context: Extensions.DataContext, path: string, data: IFolder): Folder;
        static parseFolders(context: Extensions.DataContext, pathFn: (data: IFolder) => string, data: IFolder[]): Folder[];
        public getRequestBody(): IFolder;
    }
    class ItemFetcher extends EntityFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public attachments : Attachments;
        private _Attachments;
    }
    interface IItems {
        value: IItem[];
    }
    interface IItem extends IEntity {
        ChangeKey: string;
        ClassName: string;
        Subject: string;
        Body: IItemBody;
        BodyPreview: string;
        Importance: string;
        Categories: string[];
        HasAttachments: boolean;
    }
    class Item extends Entity {
        constructor(context?: Extensions.DataContext, path?: string, data?: IItem);
        public _odataType: string;
        public changeKey : string;
        private _ChangeKey;
        public changeKeyChanged : boolean;
        private _ChangeKeyChanged;
        public className : string;
        private _ClassName;
        public classNameChanged : boolean;
        private _ClassNameChanged;
        public subject : string;
        private _Subject;
        public subjectChanged : boolean;
        private _SubjectChanged;
        public body : ItemBody;
        private _Body;
        public bodyChanged : boolean;
        private _BodyChanged;
        private _BodyChangedListener;
        public bodyPreview : string;
        private _BodyPreview;
        public bodyPreviewChanged : boolean;
        private _BodyPreviewChanged;
        public importance : Importance;
        private _Importance;
        public importanceChanged : boolean;
        private _ImportanceChanged;
        public categories : string[];
        private _Categories;
        public categoriesChanged : boolean;
        private _CategoriesChanged;
        public hasAttachments : boolean;
        private _HasAttachments;
        public hasAttachmentsChanged : boolean;
        private _HasAttachmentsChanged;
        public attachments : Attachments;
        private _Attachments;
        public update(): Microsoft.Utility.IPromise<Item>;
        public delete(): Microsoft.Utility.IPromise<void>;
        static parseItem(context: Extensions.DataContext, path: string, data: IItem): Item;
        static parseItems(context: Extensions.DataContext, pathFn: (data: IItem) => string, data: IItem[]): Item[];
        public getRequestBody(): IItem;
    }
    class MessageFetcher extends ItemFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public fetch(): Microsoft.Utility.IPromise<Message>;
        public copy(DestinationId: string): Microsoft.Utility.IPromise<Message>;
        public move(DestinationId: string): Microsoft.Utility.IPromise<Message>;
        public createReply(): Microsoft.Utility.IPromise<Message>;
        public createReplyAll(): Microsoft.Utility.IPromise<Message>;
        public createForward(): Microsoft.Utility.IPromise<Message>;
        public reply(Comment: string): Microsoft.Utility.IPromise<void>;
        public replyAll(Comment: string): Microsoft.Utility.IPromise<void>;
        public forward(Comment: string, ToRecipients: Recipient[]): Microsoft.Utility.IPromise<void>;
        public send(): Microsoft.Utility.IPromise<void>;
    }
    interface IMessages {
        value: IMessage[];
    }
    interface IMessage extends IItem {
        ParentFolderId: string;
        From: IRecipient;
        Sender: IRecipient;
        ToRecipients: IRecipient[];
        CcRecipients: IRecipient[];
        BccRecipients: IRecipient[];
        ReplyTo: IRecipient[];
        ConversationId: string;
        UniqueBody: IItemBody;
        DateTimeReceived: string;
        DateTimeSent: string;
        IsDeliveryReceiptRequested: boolean;
        IsReadReceiptRequested: boolean;
        IsDraft: boolean;
        IsRead: boolean;
        EventId: string;
        MeetingMessageType: string;
        DateTimeCreated: string;
        LastModifiedTime: string;
    }
    class Message extends Item {
        constructor(context?: Extensions.DataContext, path?: string, data?: IMessage);
        public _odataType: string;
        public parentFolderId : string;
        private _ParentFolderId;
        public parentFolderIdChanged : boolean;
        private _ParentFolderIdChanged;
        public from : Recipient;
        private _From;
        public fromChanged : boolean;
        private _FromChanged;
        private _FromChangedListener;
        public sender : Recipient;
        private _Sender;
        public senderChanged : boolean;
        private _SenderChanged;
        private _SenderChangedListener;
        public toRecipients : Extensions.ObservableCollection<Recipient>;
        private _ToRecipients;
        public toRecipientsChanged : boolean;
        private _ToRecipientsChanged;
        private _ToRecipientsChangedListener;
        public ccRecipients : Extensions.ObservableCollection<Recipient>;
        private _CcRecipients;
        public ccRecipientsChanged : boolean;
        private _CcRecipientsChanged;
        private _CcRecipientsChangedListener;
        public bccRecipients : Extensions.ObservableCollection<Recipient>;
        private _BccRecipients;
        public bccRecipientsChanged : boolean;
        private _BccRecipientsChanged;
        private _BccRecipientsChangedListener;
        public replyTo : Extensions.ObservableCollection<Recipient>;
        private _ReplyTo;
        public replyToChanged : boolean;
        private _ReplyToChanged;
        private _ReplyToChangedListener;
        public conversationId : string;
        private _ConversationId;
        public conversationIdChanged : boolean;
        private _ConversationIdChanged;
        public uniqueBody : ItemBody;
        private _UniqueBody;
        public uniqueBodyChanged : boolean;
        private _UniqueBodyChanged;
        private _UniqueBodyChangedListener;
        public dateTimeReceived : Date;
        private _DateTimeReceived;
        public dateTimeReceivedChanged : boolean;
        private _DateTimeReceivedChanged;
        public dateTimeSent : Date;
        private _DateTimeSent;
        public dateTimeSentChanged : boolean;
        private _DateTimeSentChanged;
        public isDeliveryReceiptRequested : boolean;
        private _IsDeliveryReceiptRequested;
        public isDeliveryReceiptRequestedChanged : boolean;
        private _IsDeliveryReceiptRequestedChanged;
        public isReadReceiptRequested : boolean;
        private _IsReadReceiptRequested;
        public isReadReceiptRequestedChanged : boolean;
        private _IsReadReceiptRequestedChanged;
        public isDraft : boolean;
        private _IsDraft;
        public isDraftChanged : boolean;
        private _IsDraftChanged;
        public isRead : boolean;
        private _IsRead;
        public isReadChanged : boolean;
        private _IsReadChanged;
        public eventId : string;
        private _EventId;
        public eventIdChanged : boolean;
        private _EventIdChanged;
        public meetingMessageType : MeetingMessageType;
        private _MeetingMessageType;
        public meetingMessageTypeChanged : boolean;
        private _MeetingMessageTypeChanged;
        public dateTimeCreated : Date;
        private _DateTimeCreated;
        public dateTimeCreatedChanged : boolean;
        private _DateTimeCreatedChanged;
        public lastModifiedTime : Date;
        private _LastModifiedTime;
        public lastModifiedTimeChanged : boolean;
        private _LastModifiedTimeChanged;
        public copy(DestinationId: string): Microsoft.Utility.IPromise<Message>;
        public move(DestinationId: string): Microsoft.Utility.IPromise<Message>;
        public createReply(): Microsoft.Utility.IPromise<Message>;
        public createReplyAll(): Microsoft.Utility.IPromise<Message>;
        public createForward(): Microsoft.Utility.IPromise<Message>;
        public reply(Comment: string): Microsoft.Utility.IPromise<void>;
        public replyAll(Comment: string): Microsoft.Utility.IPromise<void>;
        public forward(Comment: string, ToRecipients: Recipient[]): Microsoft.Utility.IPromise<void>;
        public send(): Microsoft.Utility.IPromise<void>;
        public update(): Microsoft.Utility.IPromise<Message>;
        public delete(): Microsoft.Utility.IPromise<void>;
        static parseMessage(context: Extensions.DataContext, path: string, data: IMessage): Message;
        static parseMessages(context: Extensions.DataContext, pathFn: (data: IMessage) => string, data: IMessage[]): Message[];
        public getRequestBody(): IMessage;
    }
    class AttachmentFetcher extends EntityFetcher {
        constructor(context: Extensions.DataContext, path: string);
    }
    interface IAttachments {
        value: IAttachment[];
    }
    interface IAttachment extends IEntity {
        Name: string;
        ContentType: string;
        Size: number;
        IsInline: boolean;
        LastModifiedTime: string;
    }
    class Attachment extends Entity {
        constructor(context?: Extensions.DataContext, path?: string, data?: IAttachment);
        public _odataType: string;
        public name : string;
        private _Name;
        public nameChanged : boolean;
        private _NameChanged;
        public contentType : string;
        private _ContentType;
        public contentTypeChanged : boolean;
        private _ContentTypeChanged;
        public size : number;
        private _Size;
        public sizeChanged : boolean;
        private _SizeChanged;
        public isInline : boolean;
        private _IsInline;
        public isInlineChanged : boolean;
        private _IsInlineChanged;
        public lastModifiedTime : Date;
        private _LastModifiedTime;
        public lastModifiedTimeChanged : boolean;
        private _LastModifiedTimeChanged;
        public update(): Microsoft.Utility.IPromise<Attachment>;
        public delete(): Microsoft.Utility.IPromise<void>;
        static parseAttachment(context: Extensions.DataContext, path: string, data: IAttachment): Attachment;
        static parseAttachments(context: Extensions.DataContext, pathFn: (data: IAttachment) => string, data: IAttachment[]): Attachment[];
        public getRequestBody(): IAttachment;
    }
    class FileAttachmentFetcher extends AttachmentFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public fetch(): Microsoft.Utility.IPromise<FileAttachment>;
    }
    interface IFileAttachments {
        value: IFileAttachment[];
    }
    interface IFileAttachment extends IAttachment {
        ContentId: string;
        ContentLocation: string;
        IsContactPhoto: boolean;
        ContentBytes: string;
    }
    class FileAttachment extends Attachment {
        constructor(context?: Extensions.DataContext, path?: string, data?: IFileAttachment);
        public _odataType: string;
        public contentId : string;
        private _ContentId;
        public contentIdChanged : boolean;
        private _ContentIdChanged;
        public contentLocation : string;
        private _ContentLocation;
        public contentLocationChanged : boolean;
        private _ContentLocationChanged;
        public isContactPhoto : boolean;
        private _IsContactPhoto;
        public isContactPhotoChanged : boolean;
        private _IsContactPhotoChanged;
        public contentBytes : string;
        private _ContentBytes;
        public contentBytesChanged : boolean;
        private _ContentBytesChanged;
        public update(): Microsoft.Utility.IPromise<FileAttachment>;
        public delete(): Microsoft.Utility.IPromise<void>;
        static parseFileAttachment(context: Extensions.DataContext, path: string, data: IFileAttachment): FileAttachment;
        static parseFileAttachments(context: Extensions.DataContext, pathFn: (data: IFileAttachment) => string, data: IFileAttachment[]): FileAttachment[];
        public getRequestBody(): IFileAttachment;
    }
    class ItemAttachmentFetcher extends AttachmentFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public item : ItemFetcher;
        public update_item(value: Item): Microsoft.Utility.IPromise<void>;
        private _Item;
        public fetch(): Microsoft.Utility.IPromise<ItemAttachment>;
    }
    interface IItemAttachments {
        value: IItemAttachment[];
    }
    interface IItemAttachment extends IAttachment {
    }
    class ItemAttachment extends Attachment {
        constructor(context?: Extensions.DataContext, path?: string, data?: IItemAttachment);
        public _odataType: string;
        public item : ItemFetcher;
        public update_item(value: Item): Microsoft.Utility.IPromise<void>;
        private _Item;
        public update(): Microsoft.Utility.IPromise<ItemAttachment>;
        public delete(): Microsoft.Utility.IPromise<void>;
        static parseItemAttachment(context: Extensions.DataContext, path: string, data: IItemAttachment): ItemAttachment;
        static parseItemAttachments(context: Extensions.DataContext, pathFn: (data: IItemAttachment) => string, data: IItemAttachment[]): ItemAttachment[];
        public getRequestBody(): IItemAttachment;
    }
    class CalendarFetcher extends EntityFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public events : Events;
        private _Events;
        public fetch(): Microsoft.Utility.IPromise<Calendar>;
    }
    interface ICalendars {
        value: ICalendar[];
    }
    interface ICalendar extends IEntity {
        Name: string;
        ChangeKey: string;
    }
    class Calendar extends Entity {
        constructor(context?: Extensions.DataContext, path?: string, data?: ICalendar);
        public _odataType: string;
        public name : string;
        private _Name;
        public nameChanged : boolean;
        private _NameChanged;
        public changeKey : string;
        private _ChangeKey;
        public changeKeyChanged : boolean;
        private _ChangeKeyChanged;
        public events : Events;
        private _Events;
        public update(): Microsoft.Utility.IPromise<Calendar>;
        public delete(): Microsoft.Utility.IPromise<void>;
        static parseCalendar(context: Extensions.DataContext, path: string, data: ICalendar): Calendar;
        static parseCalendars(context: Extensions.DataContext, pathFn: (data: ICalendar) => string, data: ICalendar[]): Calendar[];
        public getRequestBody(): ICalendar;
    }
    class CalendarGroupFetcher extends EntityFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public calendars : Calendars;
        private _Calendars;
        public fetch(): Microsoft.Utility.IPromise<CalendarGroup>;
    }
    interface ICalendarGroups {
        value: ICalendarGroup[];
    }
    interface ICalendarGroup extends IEntity {
        Name: string;
        ChangeKey: string;
        ClassId: string;
    }
    class CalendarGroup extends Entity {
        constructor(context?: Extensions.DataContext, path?: string, data?: ICalendarGroup);
        public _odataType: string;
        public name : string;
        private _Name;
        public nameChanged : boolean;
        private _NameChanged;
        public changeKey : string;
        private _ChangeKey;
        public changeKeyChanged : boolean;
        private _ChangeKeyChanged;
        public classId : string;
        private _ClassId;
        public classIdChanged : boolean;
        private _ClassIdChanged;
        public calendars : Calendars;
        private _Calendars;
        public update(): Microsoft.Utility.IPromise<CalendarGroup>;
        public delete(): Microsoft.Utility.IPromise<void>;
        static parseCalendarGroup(context: Extensions.DataContext, path: string, data: ICalendarGroup): CalendarGroup;
        static parseCalendarGroups(context: Extensions.DataContext, pathFn: (data: ICalendarGroup) => string, data: ICalendarGroup[]): CalendarGroup[];
        public getRequestBody(): ICalendarGroup;
    }
    class EventFetcher extends ItemFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public calendar : CalendarFetcher;
        public update_calendar(value: Calendar): Microsoft.Utility.IPromise<void>;
        private _Calendar;
        public fetch(): Microsoft.Utility.IPromise<Event>;
        public accept(Comment: string): Microsoft.Utility.IPromise<void>;
        public decline(Comment: string): Microsoft.Utility.IPromise<void>;
        public tentativelyAccept(Comment: string): Microsoft.Utility.IPromise<void>;
    }
    interface IEvents {
        value: IEvent[];
    }
    interface IEvent extends IItem {
        Start: string;
        End: string;
        Location: ILocation;
        ShowAs: string;
        IsAllDay: boolean;
        IsCancelled: boolean;
        IsOrganizer: boolean;
        ResponseRequested: boolean;
        Type: string;
        SeriesId: string;
        Attendees: IAttendee[];
        Recurrence: IPatternedRecurrence;
    }
    class Event extends Item {
        constructor(context?: Extensions.DataContext, path?: string, data?: IEvent);
        public _odataType: string;
        public start : Date;
        private _Start;
        public startChanged : boolean;
        private _StartChanged;
        public end : Date;
        private _End;
        public endChanged : boolean;
        private _EndChanged;
        public location : Location;
        private _Location;
        public locationChanged : boolean;
        private _LocationChanged;
        private _LocationChangedListener;
        public showAs : FreeBusyStatus;
        private _ShowAs;
        public showAsChanged : boolean;
        private _ShowAsChanged;
        public isAllDay : boolean;
        private _IsAllDay;
        public isAllDayChanged : boolean;
        private _IsAllDayChanged;
        public isCancelled : boolean;
        private _IsCancelled;
        public isCancelledChanged : boolean;
        private _IsCancelledChanged;
        public isOrganizer : boolean;
        private _IsOrganizer;
        public isOrganizerChanged : boolean;
        private _IsOrganizerChanged;
        public responseRequested : boolean;
        private _ResponseRequested;
        public responseRequestedChanged : boolean;
        private _ResponseRequestedChanged;
        public type : EventType;
        private _Type;
        public typeChanged : boolean;
        private _TypeChanged;
        public seriesId : string;
        private _SeriesId;
        public seriesIdChanged : boolean;
        private _SeriesIdChanged;
        public attendees : Extensions.ObservableCollection<Attendee>;
        private _Attendees;
        public attendeesChanged : boolean;
        private _AttendeesChanged;
        private _AttendeesChangedListener;
        public recurrence : PatternedRecurrence;
        private _Recurrence;
        public recurrenceChanged : boolean;
        private _RecurrenceChanged;
        private _RecurrenceChangedListener;
        public calendar : CalendarFetcher;
        public update_calendar(value: Calendar): Microsoft.Utility.IPromise<void>;
        private _Calendar;
        public accept(Comment: string): Microsoft.Utility.IPromise<void>;
        public decline(Comment: string): Microsoft.Utility.IPromise<void>;
        public tentativelyAccept(Comment: string): Microsoft.Utility.IPromise<void>;
        public update(): Microsoft.Utility.IPromise<Event>;
        public delete(): Microsoft.Utility.IPromise<void>;
        static parseEvent(context: Extensions.DataContext, path: string, data: IEvent): Event;
        static parseEvents(context: Extensions.DataContext, pathFn: (data: IEvent) => string, data: IEvent[]): Event[];
        public getRequestBody(): IEvent;
    }
    class ContactFetcher extends ItemFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public fetch(): Microsoft.Utility.IPromise<Contact>;
    }
    interface IContacts {
        value: IContact[];
    }
    interface IContact extends IItem {
        ParentFolderId: string;
        Birthday: string;
        FileAs: string;
        DisplayName: string;
        GivenName: string;
        Initials: string;
        MiddleName: string;
        NickName: string;
        Surname: string;
        Title: string;
        Generation: string;
        EmailAddress1: string;
        EmailAddress2: string;
        EmailAddress3: string;
        ImAddress1: string;
        ImAddress2: string;
        ImAddress3: string;
        JobTitle: string;
        CompanyName: string;
        Department: string;
        OfficeLocation: string;
        Profession: string;
        BusinessHomePage: string;
        AssistantName: string;
        Manager: string;
        HomePhone1: string;
        HomePhone2: string;
        BusinessPhone1: string;
        BusinessPhone2: string;
        MobilePhone1: string;
        OtherPhone: string;
        DateTimeCreated: string;
        LastModifiedTime: string;
    }
    class Contact extends Item {
        constructor(context?: Extensions.DataContext, path?: string, data?: IContact);
        public _odataType: string;
        public parentFolderId : string;
        private _ParentFolderId;
        public parentFolderIdChanged : boolean;
        private _ParentFolderIdChanged;
        public birthday : Date;
        private _Birthday;
        public birthdayChanged : boolean;
        private _BirthdayChanged;
        public fileAs : string;
        private _FileAs;
        public fileAsChanged : boolean;
        private _FileAsChanged;
        public displayName : string;
        private _DisplayName;
        public displayNameChanged : boolean;
        private _DisplayNameChanged;
        public givenName : string;
        private _GivenName;
        public givenNameChanged : boolean;
        private _GivenNameChanged;
        public initials : string;
        private _Initials;
        public initialsChanged : boolean;
        private _InitialsChanged;
        public middleName : string;
        private _MiddleName;
        public middleNameChanged : boolean;
        private _MiddleNameChanged;
        public nickName : string;
        private _NickName;
        public nickNameChanged : boolean;
        private _NickNameChanged;
        public surname : string;
        private _Surname;
        public surnameChanged : boolean;
        private _SurnameChanged;
        public title : string;
        private _Title;
        public titleChanged : boolean;
        private _TitleChanged;
        public generation : string;
        private _Generation;
        public generationChanged : boolean;
        private _GenerationChanged;
        public emailAddress1 : string;
        private _EmailAddress1;
        public emailAddress1Changed : boolean;
        private _EmailAddress1Changed;
        public emailAddress2 : string;
        private _EmailAddress2;
        public emailAddress2Changed : boolean;
        private _EmailAddress2Changed;
        public emailAddress3 : string;
        private _EmailAddress3;
        public emailAddress3Changed : boolean;
        private _EmailAddress3Changed;
        public imAddress1 : string;
        private _ImAddress1;
        public imAddress1Changed : boolean;
        private _ImAddress1Changed;
        public imAddress2 : string;
        private _ImAddress2;
        public imAddress2Changed : boolean;
        private _ImAddress2Changed;
        public imAddress3 : string;
        private _ImAddress3;
        public imAddress3Changed : boolean;
        private _ImAddress3Changed;
        public jobTitle : string;
        private _JobTitle;
        public jobTitleChanged : boolean;
        private _JobTitleChanged;
        public companyName : string;
        private _CompanyName;
        public companyNameChanged : boolean;
        private _CompanyNameChanged;
        public department : string;
        private _Department;
        public departmentChanged : boolean;
        private _DepartmentChanged;
        public officeLocation : string;
        private _OfficeLocation;
        public officeLocationChanged : boolean;
        private _OfficeLocationChanged;
        public profession : string;
        private _Profession;
        public professionChanged : boolean;
        private _ProfessionChanged;
        public businessHomePage : string;
        private _BusinessHomePage;
        public businessHomePageChanged : boolean;
        private _BusinessHomePageChanged;
        public assistantName : string;
        private _AssistantName;
        public assistantNameChanged : boolean;
        private _AssistantNameChanged;
        public manager : string;
        private _Manager;
        public managerChanged : boolean;
        private _ManagerChanged;
        public homePhone1 : string;
        private _HomePhone1;
        public homePhone1Changed : boolean;
        private _HomePhone1Changed;
        public homePhone2 : string;
        private _HomePhone2;
        public homePhone2Changed : boolean;
        private _HomePhone2Changed;
        public businessPhone1 : string;
        private _BusinessPhone1;
        public businessPhone1Changed : boolean;
        private _BusinessPhone1Changed;
        public businessPhone2 : string;
        private _BusinessPhone2;
        public businessPhone2Changed : boolean;
        private _BusinessPhone2Changed;
        public mobilePhone1 : string;
        private _MobilePhone1;
        public mobilePhone1Changed : boolean;
        private _MobilePhone1Changed;
        public otherPhone : string;
        private _OtherPhone;
        public otherPhoneChanged : boolean;
        private _OtherPhoneChanged;
        public dateTimeCreated : Date;
        private _DateTimeCreated;
        public dateTimeCreatedChanged : boolean;
        private _DateTimeCreatedChanged;
        public lastModifiedTime : Date;
        private _LastModifiedTime;
        public lastModifiedTimeChanged : boolean;
        private _LastModifiedTimeChanged;
        public update(): Microsoft.Utility.IPromise<Contact>;
        public delete(): Microsoft.Utility.IPromise<void>;
        static parseContact(context: Extensions.DataContext, path: string, data: IContact): Contact;
        static parseContacts(context: Extensions.DataContext, pathFn: (data: IContact) => string, data: IContact[]): Contact[];
        public getRequestBody(): IContact;
    }
    class ContactFolderFetcher extends EntityFetcher {
        constructor(context: Extensions.DataContext, path: string);
        public contacts : Contacts;
        private _Contacts;
        public childFolders : ContactFolders;
        private _ChildFolders;
        public fetch(): Microsoft.Utility.IPromise<ContactFolder>;
    }
    interface IContactFolders {
        value: IContactFolder[];
    }
    interface IContactFolder extends IEntity {
        ParentFolderId: string;
        DisplayName: string;
    }
    class ContactFolder extends Entity {
        constructor(context?: Extensions.DataContext, path?: string, data?: IContactFolder);
        public _odataType: string;
        public parentFolderId : string;
        private _ParentFolderId;
        public parentFolderIdChanged : boolean;
        private _ParentFolderIdChanged;
        public displayName : string;
        private _DisplayName;
        public displayNameChanged : boolean;
        private _DisplayNameChanged;
        public contacts : Contacts;
        private _Contacts;
        public childFolders : ContactFolders;
        private _ChildFolders;
        public update(): Microsoft.Utility.IPromise<ContactFolder>;
        public delete(): Microsoft.Utility.IPromise<void>;
        static parseContactFolder(context: Extensions.DataContext, path: string, data: IContactFolder): ContactFolder;
        static parseContactFolders(context: Extensions.DataContext, pathFn: (data: IContactFolder) => string, data: IContactFolder[]): ContactFolder[];
        public getRequestBody(): IContactFolder;
    }
    enum BodyType {
        Text = 0,
        HTML = 1,
    }
    enum Importance {
        Normal = 0,
        Low = 1,
        High = 2,
    }
    enum AttendeeType {
        Required = 0,
        Optional = 1,
        Resource = 2,
    }
    enum ResponseType {
        None = 0,
        Organizer = 1,
        TentativelyAccepted = 2,
        Accepted = 3,
        Declined = 4,
        NotResponded = 5,
    }
    enum EventType {
        SingleInstance = 0,
        Occurrence = 1,
        Exception = 2,
        SeriesMaster = 3,
    }
    enum FreeBusyStatus {
        Unknown = 0,
        Free = 1,
        Tentative = 2,
        Busy = 3,
        Oof = 4,
        WorkingElsewhere = 5,
    }
    enum MeetingMessageType {
        None = 0,
        MeetingRequest = 1,
        MeetingCancelled = 2,
        MeetingAccepted = 3,
        MeetingTenativelyAccepted = 4,
        MeetingDeclined = 5,
    }
    enum RecurrencePatternType {
        Daily = 0,
        Weekly = 1,
        AbsoluteMonthly = 2,
        RelativeMonthly = 3,
        AbsoluteYearly = 4,
        RelativeYearly = 5,
    }
    enum RecurrenceRangeType {
        EndDate = 0,
        NoEnd = 1,
        Numbered = 2,
    }
    enum WeekIndex {
        First = 0,
        Second = 1,
        Third = 2,
        Fourth = 3,
        Last = 4,
    }
    class Users extends Extensions.QueryableSet<IUser> {
        private _parseCollectionFn;
        constructor(context: Extensions.DataContext, path: string, entity?: any);
        public getUser(Id: any): UserFetcher;
        public getUsers(): Extensions.CollectionQuery<User>;
        public addUser(item: User): Microsoft.Utility.IPromise<User>;
    }
    class Folders extends Extensions.QueryableSet<IFolder> {
        private _parseCollectionFn;
        constructor(context: Extensions.DataContext, path: string, entity?: any);
        public getFolder(Id: any): FolderFetcher;
        public getFolders(): Extensions.CollectionQuery<Folder>;
        public addFolder(item: Folder): Microsoft.Utility.IPromise<Folder>;
    }
    class Messages extends Extensions.QueryableSet<IMessage> {
        private _parseCollectionFn;
        constructor(context: Extensions.DataContext, path: string, entity?: any);
        public getMessage(Id: any): MessageFetcher;
        public getMessages(): Extensions.CollectionQuery<Message>;
        public addMessage(item: Message): Microsoft.Utility.IPromise<Message>;
    }
    class Calendars extends Extensions.QueryableSet<ICalendar> {
        private _parseCollectionFn;
        constructor(context: Extensions.DataContext, path: string, entity?: any);
        public getCalendar(Id: any): CalendarFetcher;
        public getCalendars(): Extensions.CollectionQuery<Calendar>;
        public addCalendar(item: Calendar): Microsoft.Utility.IPromise<Calendar>;
    }
    class CalendarGroups extends Extensions.QueryableSet<ICalendarGroup> {
        private _parseCollectionFn;
        constructor(context: Extensions.DataContext, path: string, entity?: any);
        public getCalendarGroup(Id: any): CalendarGroupFetcher;
        public getCalendarGroups(): Extensions.CollectionQuery<CalendarGroup>;
        public addCalendarGroup(item: CalendarGroup): Microsoft.Utility.IPromise<CalendarGroup>;
    }
    class Events extends Extensions.QueryableSet<IEvent> {
        private _parseCollectionFn;
        constructor(context: Extensions.DataContext, path: string, entity?: any);
        public getEvent(Id: any): EventFetcher;
        public getEvents(): Extensions.CollectionQuery<Event>;
        public addEvent(item: Event): Microsoft.Utility.IPromise<Event>;
    }
    class Contacts extends Extensions.QueryableSet<IContact> {
        private _parseCollectionFn;
        constructor(context: Extensions.DataContext, path: string, entity?: any);
        public getContact(Id: any): ContactFetcher;
        public getContacts(): Extensions.CollectionQuery<Contact>;
        public addContact(item: Contact): Microsoft.Utility.IPromise<Contact>;
    }
    class ContactFolders extends Extensions.QueryableSet<IContactFolder> {
        private _parseCollectionFn;
        constructor(context: Extensions.DataContext, path: string, entity?: any);
        public getContactFolder(Id: any): ContactFolderFetcher;
        public getContactFolders(): Extensions.CollectionQuery<ContactFolder>;
        public addContactFolder(item: ContactFolder): Microsoft.Utility.IPromise<ContactFolder>;
    }
    class Attachments extends Extensions.QueryableSet<IAttachment> {
        private _parseCollectionFn;
        constructor(context: Extensions.DataContext, path: string, entity?: any);
        public getAttachment(Id: any): AttachmentFetcher;
        public getAttachments(): Extensions.CollectionQuery<Attachment>;
        public addAttachment(item: Attachment): Microsoft.Utility.IPromise<Attachment>;
        public asFileAttachments(): Extensions.CollectionQuery<FileAttachment>;
        public asItemAttachments(): Extensions.CollectionQuery<ItemAttachment>;
    }
}
declare module System {
    enum DayOfWeek {
        Sunday = 0,
        Monday = 1,
        Tuesday = 2,
        Wednesday = 3,
        Thursday = 4,
        Friday = 5,
        Saturday = 6,
    }
}
