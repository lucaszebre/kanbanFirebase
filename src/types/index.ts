


export type BoardData = {
    boards: Board[];
}

export type Data = {
    boards: {
        name: string;
        id: string;
        columns: {
            name: string;
            id: string;
            tasks: {
            id: string;
            title: string;
            description: string;
            status: string;
            subtasks: {
                id: string;
                title: string;
                isCompleted: boolean;
            }[];
            }[];
        }[];
        }[];
    };




export type ColumnToRename = {
    id: string;
    name: string;
};

export type RequestBody = {
    boardId: string;
    boardName: string;
    columnsToAdd: ColumnToRename[];
    columnsToRename: ColumnToRename[];
    columnsToRemove: string[];
};



export type ResponseError = {
    message: string;
};


export type ColumnData = {
    id: string;
    name: string;
};

export type TaskData = {
    id: string;
    title: string;
    description: string;
    status: string;
    columnId: string;
    subtasks: Array<{
        title: string;
        isCompleted: boolean;
    }>;
};




export type Boards = {
    id: string;
    name: string;
};

export type AddBoardType = {
    BoardName: string;
};




export interface Board {
    id: string;
    name: string;
    userId: string;
    columns: Column[];
    }
    export interface ColumnAdd {
        id: string;
        name: string;
        boardId: string;
        tasks: Task[];
        add:boolean // Make sure it's 'tasks' instead of 'task'
    }

    export interface Column {
        id: string;
        name: string;
        boardId: string;
        tasks: Task[];
        add?:boolean // Make sure it's 'tasks' instead of 'task'
    }
    export interface Task {
        id: string;
        title: string;
        description: string;
        columnId: string;
        subTasks : Subtask[]
    }
    
    export interface Subtask {
        id?: string;
        title: string;
        isCompleted: boolean;
        taskId: string;
    }


export    type newSubtask= {
        id?: string;
        title: string;
        isCompleted: boolean;
        taskId: any;
        add?: boolean;
    }

  export   interface ListTaskProps {
        tasks: Task[];
        title: string;
        NbList: number;
        columnId:string
        data: any;
        }