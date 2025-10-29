
import React from 'react';

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0V5.25A.75.75 0 019 4.5zm5.25 3a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0V7.5zM9 15a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 019 15zm5.25 3a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0V18zM4.5 9a.75.75 0 01.75.75h3.5a.75.75 0 010 1.5H5.25a.75.75 0 01-.75-.75zm10.5 0a.75.75 0 01.75.75h3.5a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75zM7.5 14.25a.75.75 0 000-1.5h3.5a.75.75 0 000 1.5H7.5zm5.25-1.5a.75.75 0 01.75.75h3.5a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
    </svg>
);

export default SparklesIcon;
