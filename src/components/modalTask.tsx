import React from 'react';
import { useContext } from 'react';
import styles from '../styles/ModalTask.module.css';
import Image from 'next/image';
import { Opencontext } from '@/contexts/contextopen';
import { Subtask } from '@/types';
import { DataContext } from '@/contexts/datacontext';
import ModalAboutTask from './modalAboutTask';
import DeleteThisTask from './DeletethisTask';
import EditTask from './editTask';
import { changeColumn } from '@/utils/changeColumn';
import renderSelect from '@/utils/renderselect';
import RenderSubTask from '@/utils/renderSubTaskModal';
import { useTheme } from '@/contexts/themecontext';

const ModalTask = (props:{
    id: string;
    title: string;
    description: string;
    columnId: string;
    subTask : Subtask[]
    Iscompleted:()=>number
}) => {
    // state 
    const { SubTasks, setSubTasks } = useContext(Opencontext); // state to toggle the display of Subtasks
    const [openModalAbout, setOpenModalAbout] = React.useState(false);// state to toggle th displat of the ModalAbout

    // state to manage the global Data 
    const { currentBoardId,isCompleted,setIsCompleted,columns,currentTaskId,ColId,setColId,setOpenedTask,SetIsMoving,isMoving } = useContext(DataContext);
    // state to know wich column id we are currently 
    const [selectedColumnId, setSelectedColumnId] = React.useState(props.columnId);

    const { theme, setTheme } = useTheme();

    React.useEffect(()=>{ // every mount we need to display none the ModalAbout 
        setOpenModalAbout(false)
    },[])

    React.useEffect(()=>{  // when the current board id change we set defaultly the col id to the first column 
        if(columns[0]){
            setColId(columns[0].id)
        }
    },[currentBoardId])

    React.useEffect(() => {  // when the column id change we change also the selectedColumnid 
        setSelectedColumnId(props.columnId);
    }, [props.columnId]);

    
    return (
        <>
        <EditTask columnId={props.columnId}   />
        <DeleteThisTask columnId={props.columnId} TaskTitle={props.title}  TaskId={props.id} />
            <div
                className={styles.ModalTaskWrapper}
                style={{
                    display: SubTasks ? 'flex' : 'none',
                }}
                onClick={async (e) => {
                console.log(selectedColumnId,props.columnId)
                if (e.target === e.currentTarget) {
                    setOpenedTask(null);
                    if (selectedColumnId && selectedColumnId !== props.columnId) {
                        await changeColumn(selectedColumnId,props.columnId,currentBoardId,currentTaskId);
                        }}}}>
            
                <div 
                className={`${styles.ModalTaskDiv} ${
                    theme === 'light' ? styles.light : styles.dark
                    }`}
                >

                <ModalAboutTask
                visible={openModalAbout}
                />
                    <div 
                    className={`${styles.ModalTaskHeader} ${
                        theme === 'light' ? styles.light : styles.dark
                        }`}
                    >
                        <h1>{props.title}</h1>
                        <Image
                            onClick={() => {
                                setOpenModalAbout(!openModalAbout);
                            }}
                            className={styles.ModalTaskEllipsis}
                            src="/assets/icon-vertical-ellipsis.svg"
                            alt="vertical-ellipsis"
                            width={4.62}
                            height={20}/>
                    </div>
                    <p className={styles.TaskDescription}>
                        {props.description}
                    </p>
                    <h2 className={styles.ModalTaskH2}>Subtasks ({props.Iscompleted()} of {props.subTask.length})</h2>
                    <RenderSubTask 
                        subtasks={props.subTask} 
                        currentBoardId={currentBoardId}
                        columnId={props.columnId}
                        taskId={currentTaskId}
                        setIsMoving={SetIsMoving}
                        isMoving={isMoving}
                        />
                    <h2 className={`${styles.ModalTaskH2} ${
                        theme === 'light' ? styles.light : styles.dark
                        }`}
                    >Current Status</h2>
                    <select
                        value={selectedColumnId}
                        onChange={(e) => {
                            setSelectedColumnId(e.target.value);
                        }}
                        className={`${styles.SelectState} ${
                            theme === 'light' ? styles.light : styles.dark
                            }`}
                    >
                        {renderSelect(columns)}
                    </select>
                </div>
            </div>
        </>
    );
};

export default ModalTask;
