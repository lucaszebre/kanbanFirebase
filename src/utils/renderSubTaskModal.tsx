import React from 'react';
import Subtasks from '@/components/subTask';
import { Subtask } from '@/types';
import { toggleSubtaskCompletion } from '@/utils/ToggleSubtask';

interface RenderSubTaskProps {
    subtasks: Subtask[];
    currentBoardId: string;
    columnId: string;
    taskId: string;
    setIsMoving: (moving: boolean) => void;
    isMoving: boolean;
}

const RenderSubTask: React.FC<RenderSubTaskProps> = ({ subtasks, currentBoardId, columnId, taskId, setIsMoving, isMoving }) => {
    if (subtasks) {
        return (
            <>
                {subtasks.map((sub, index) => (
                    <Subtasks
                        key={index}
                        title={sub.title}
                        checked={sub.isCompleted}
                        onClick={() => {
                            toggleSubtaskCompletion(currentBoardId, columnId, taskId, sub.id);
                            setIsMoving(!isMoving);
                        }}
                    />
                ))}
            </>
        );
    } else {
        return null;
    }
};

export default RenderSubTask;