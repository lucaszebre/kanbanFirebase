import React from 'react';
import BoardColumn from '../boardColumn';  // get the board  column components 

type ColumnsRendererProps = {
    columnNames: string[];
    handleColumnTitleChange: (index: number, updatedTitle: string) => void;
    removeColumn: (index: number) => void;
    isMoving: boolean;
    columnErrors: boolean[];
};

export const ColumnsRenderer: React.FC<ColumnsRendererProps> = ({
    columnNames,
    handleColumnTitleChange,
    removeColumn,
    isMoving,
    columnErrors,
}) => {
    return (
        <>
        {columnNames.map((text, index) => (
            <BoardColumn
            key={index}
            title={text}
            Remove={() => removeColumn(index)}
            onChange={(updatedTitle:string) => handleColumnTitleChange(index, updatedTitle)}
            resetKey={isMoving}
            error={columnErrors[index] || false}
            />
        ))}
        </>
    );
    };

