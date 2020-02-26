import * as React from "react";

export const Spinner = () => (
    <div className='container-fluid py-2 py-md-4'>
        <div className='row justify-content-center'>
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    </div>
);
