import { Dialog } from "primereact/dialog";
import React, { Children } from "react";

export default function PopUp({ title = 'Header', children, visible, setVisible }: { title?: string, children: React.ReactNode, visible: boolean, setVisible: (partialT: Partial<boolean>) => void }) {

    return (
        <Dialog header={title} visible={visible} onHide={() => { setVisible(false) }}
            style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                <div className="py-4">
            {children}
                </div>
        </Dialog>
    );
}