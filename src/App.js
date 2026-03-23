import * as React from "react";
import gsap from "gsap";
import CustomToast from "./utils/CustomToast";
import SuspenseLoader from "./utils/SuspenseLoader";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppRouter } from "./routes";
import ErrorBoundary from "ErrorBoundary";
import useAppQueryClient from "Hook/useAppQueryClient";

function App() {
  const queryClient = useAppQueryClient();
  const [loaderDone, setLoaderDone] = React.useState(false);
  const pageRef = React.useRef(null);

  const router = createBrowserRouter(AppRouter);

  // Called by SuspenseLoader once the curtain exit finishes
  const handleLoaderComplete = React.useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (pageRef.current) {
          // Signal hero (and any other section) to start their entrance animations
          window.dispatchEvent(new Event('earthoffice:reveal'));
          // Fade the page in simultaneously
          gsap.to(pageRef.current, {
            opacity: 1,
            duration: 0.65,
            ease: 'power2.out',
            onComplete: () => setLoaderDone(true),
          });
        }
      });
    });
  }, []);

  // Handle network status changes
  React.useEffect(() => {
    console.clear();
    const handleOnline = () => {
      CustomToast("s", "Network connection restored!", "top-center");
      const activeQueries = queryClient.getQueryCache().findAll(query => query.state.isActive);
      activeQueries.forEach(query => {
        queryClient.setQueryData(query.queryKey, query.state.data, { staleTime: 0 });
        queryClient.refetchQueries(query.queryKey);
      });
    };
    const handleOffline = () => {
      CustomToast("w", "Network connection lost!", "top-center");
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <>
      {/* Loader sits on top (z-9999). Only unmounted after page fade-in completes. */}
      {!loaderDone && (
        <SuspenseLoader onComplete={handleLoaderComplete} />
      )}

      {/* Page is always mounted but starts invisible — prevents any white flash */}
      <div
        ref={pageRef}
        style={{ opacity: 0 }}
      >
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </div>
    </>
  );
}

export default App;