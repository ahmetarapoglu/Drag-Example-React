import React, { useState, useEffect } from 'react';

const Drag = () => {
    const [x, setX] = useState<any>(0);
    const [y, setY] = useState<any>(0);
    const [rel, setRel] = useState<any>(null);
    const [dragging, setDragging] = useState<any>(false);

    const onMouseMove = (e: any) => {
        if (!dragging || !rel) return;
        const dialogElement = document.getElementById('node');

        if (dialogElement) {

            const dialogWidth = dialogElement.clientWidth;
            const dialogHeight = dialogElement.clientHeight;

            const containerWidth = 500;
            const containerHeight = 500;

            const newX = Math.min(
                Math.max(0, e.pageX - rel.x),
                containerWidth - dialogWidth
            );

            const newY = Math.min(
                Math.max(0, e.pageY - rel.y),
                containerHeight - dialogHeight
            );

            setX(newX);
            setY(newY);

            e.stopPropagation();
            e.preventDefault();
        }
    };


    const enableDragging = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.button !== 0) return;

        setDragging(true);
        setRel({
            x: e.pageX - x,
            y: e.pageY - y,
        });

        e.stopPropagation();
        e.preventDefault();
    };

    const disableDragging = (e: React.MouseEvent<HTMLDivElement>) => {
        setDragging(false);
        e.stopPropagation();
        e.preventDefault();
        console.log('disabled dragging');
    };


    useEffect(() => {

        if (dragging) {
            document.addEventListener('mousemove', onMouseMove);
        } else {
            document.removeEventListener('mousemove', onMouseMove);
        }

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
        };
    }, [dragging, rel]);

    useEffect(() => {
        console.info("X", x)
        console.info("Y", y)
    }, [x, y])

    return (

        <div
            style={{
                width: '500px',
                height: '500px',
                margin: "0 auto",
                border: '1px solid black',
                position: 'relative',
            }}
        >
            <div id="node" style={{ top: `${y}px`, left: `${x}px`, right: `${100}px` }}>
                <div
                    className="top-row"
                    onMouseDown={enableDragging}
                    onMouseUp={disableDragging}
                    onMouseMove={onMouseMove}
                >
                    DragMe
                </div>
            </div>
        </div>

    );
};

export default Drag;
