// ErrorBoundary.js
import { Watermark } from 'antd';
import React, { useTransition } from 'react';
// import { StaticImages } from 'utils/StaticImages';
import CustomButton from 'components/CustomButton';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { StaticImages } from 'utils/StaticImages';

// Fallback UI component
const ErrorFallback = ({ resetErrorBoundary, isPending, startTransition }) => {
    console.log("Rendering ErrorFallback");
    return (
        <Watermark
            className="min-h-screen flex justify-center items-center bg-red-50"
            height={80}
            image={StaticImages.LOGO.Logo}
        >
            <div className="text-center rounded p-10 bg-red-100 opacity-80 z-10">
                <h1 className="titleLarge text-red-900">Something went wrong.</h1>
                <CustomButton
                    type="text"
                    size="large"
                    onClick={() =>
                        startTransition(() => {
                            resetErrorBoundary(); // Resets the error boundary
                        })
                    }
                    loading={isPending}
                    className="commonButton text-white mt-16"
                >
                    Request Reload!
                </CustomButton>
            </div>
        </Watermark>
    );
};


// Main ErrorBoundary component
const ErrorBoundary = ({ children }) => {
    const { reset } = useQueryErrorResetBoundary();
    const [isPending, startTransition] = useTransition();

    return (
        <ReactErrorBoundary
            onReset={reset} // Reset function from react-query
            fallbackRender={({ resetErrorBoundary }) => (
                <ErrorFallback
                    resetErrorBoundary={resetErrorBoundary}
                    isPending={isPending}
                    startTransition={startTransition}
                />
            )}
        >
            {children}
        </ReactErrorBoundary>
    );
};

export default ErrorBoundary;
