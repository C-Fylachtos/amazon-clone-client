import React, { useEffect, useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

function LinProg() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          return 100;
        }
        const diff = 50;
        return oldProgress + diff / 28;
      });
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
}

export default LinProg;
